#!/usr/local/bin/racket
#lang racket

(define nginx-config "/usr/local/etc/nginx/nginx.conf")

(define (log-input input)
 (with-output-to-file "history"
  #:exists 'append
    (lambda ()
      (printf input)
      (newline))))

; TODO: Replace use of cat with ~open-input-file and create instead of touch
(define (system-cat arg)
  (string-split
    (with-output-to-string
      (lambda () (system (string-join (list "cat" arg)))))
    "\n"))

(define (system-touch arg)
  (system (string-join (list "touch" arg))))

(define (build-location-string dir)
  (string-append "\"        location /" dir " {}\""))

; Appends nginx location block into a nginx.conf.new file
(define (build-nginx-location location)
  (let ([pattern "/server_name/"]
        [filename nginx-config])
    (string-append
      "awk" " '" pattern " { print; print " (build-location-string location)
      ";next}1' " filename " > " filename ".new")))

; Changes nginx config
(define (serve location)
  (system (build-nginx-location (car location)))
  ;; XXX: Assumes everything went fine
  (system
    (string-append "cp " nginx-config " " nginx-config ".bak; "
                   "mv " nginx-config ".new " nginx-config))
  (system "service nginx reload")
  (string-append "echo serving " (car location) "\n"))

(define (open args)
  (system-touch (first args))
  (display "clear\n")
  (map (lambda (s) (display (string-join (list "append" s "\n"))))
       (system-cat (first args)))
  (string-join (list "edit" (first args) "\n")))

; XXX: Assumes we are saving a file.
(define (beginop args)
  (define out (open-output-file (cadr args) #:exists 'replace))
  (define (begin-inner)
    (define input (read-line))
    (when (not (endop? (string-split input)))
      (display input out)
      (newline out)
      (begin-inner)))
  (begin-inner)
  (close-output-port out) ; only here that is it saved/flushed
  (string-join (list "echo saved file" (cadr args) "\n")))
  
(define (shell args)
  (system (string-append (string-join args)))
  (string-join (list "echo ran" (string-join args) "\n")))

(define (ping? cmd) (equal? (car cmd) "ping"))
(define (open? cmd) (equal? (car cmd) "open"))
(define (serve? cmd) (equal? (car cmd) "serve"))
(define (beginop? cmd) (equal? (car cmd) "beginop"))
(define (endop? cmd)
  (if (< (length cmd) 2)
      #f
      (equal? (car cmd) "endop")))
(define (shell? cmd) (equal? (car cmd) "shell"))

(define (handle-command cmd)
  (cond [(= (length cmd) 0) "unknown\n"]
        [(ping? cmd) "pong\n"]
        [(= (length cmd) 1) "unknown\n"]
        [(open? cmd)  (open (cdr cmd))]
        [(serve? cmd)  (serve (cdr cmd))]
        [(beginop? cmd)  (beginop (cdr cmd))]
        [(shell? cmd) (shell (cdr cmd))]
        ["unknown\n"]))

(define (input-loop)
  (define input (read-line))
    (log-input input)
    (display (handle-command (string-split input)))
    (flush-output)
    (input-loop))

; Unauthenticated start
;(input-loop)

; TODO: Get env to work, this is just a temp pw for source control.
; Change this on the server
(define ticket "foobar")

; Super Poor man's auth
;(if (equal? (read-line) (getenv "TICKET"))
(if (equal? (read-line) ticket)
  (begin
    (display "AUTHENTICATED\n")
    (flush-output)
    (input-loop))
  (begin
    (display "UNAUTHENTICATED\n")
    (flush-output)))

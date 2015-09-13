# Netpowder

Netpowder is a mini-server in the browser. It allows you to host things you make
online, without ever having to bother with a server.

Netpowder is made up of *planets* which have *satellites*. Right now, there's
only one planet, called Neptune. As an end user, you have access to a single
satellite, such as Triton. This means that you can access
`triton.neptune.netpowder.com` and host public content from that domain.

If you wish to see a quick video demonstration, you can do so
[here](https://www.youtube.com/watch?v=9NqEpsFeKDg).

## Getting started

So you just got access to a satellite, what do you do now? Before starting to
use it, please keep the following things in mind:

1. **Feel free to ask for help and to give feedback**. You can open issues on
Github, or email/tweet/IRC me. If there's anything you are wondering about, or
anything you would like to see in in Netpowder, please do let me know.

2. **Be nice**. Don't use your satellite to host anything illegal, or otherwise
abuse it, such as hosting huge files or flooding the network.

3. **Remember that Netpowder is very new**. Don't use Netpowder for
security-sensitive applications, or to host things that you don't have a backup
of. Things will definitely break.

Because of current resource constraints, there are only 14 satellites available
initially. This means that if you don't actively use your satellite within a
rolling 72 hour window, you might lose access to the satellite and it will
become available to the next person in the queue.

With that said, how do you use it? Go to that satellite's URL and login using
your *access code*. You login by typing your *access code* in the *command
window* below the *editor*. If you see the message "AUTHENTICATED" in the *log*,
it means you successfully authenticated.

If you see the message "UNAUTHENTICATED" followed by the message "DISCONNECTED"
it means you entered the wrong code. Please refresh the code and try again. If
you see anything else, such as just the message "DISCONNECTED", please submit a
bug report.

See the section below for some basic example.  More example usages are coming
soon, but in the meantime experiment away and don't hesitate to ask questions :)

# Example: Hello World

In the command window, write `open hello`. This lets you edit the file `hello`
in the editor. Write "Hello World" in the editor, then go back to the command
window and type `save`. This saves the file `hello` with the content "Hello
World". If you open another file, or close your browser and come back later, the
content "Hello World" will persist in the file `hello`.

See the demonstration video for how to serve a publicly viewable URL.

## Example: Static content hosting

To host static content, such as html, css and js, perform the following steps.

```
shell mkdir hello
open hello/index.html // write html in the editor.
save
serve hello
```

Now open up `yoursatellite.neptune.netpowder.com/hello/` in a browser. See the
video demonstration. Note that this this hello-site will persist even if you
close your browser window.

## Example: finding and modifiying nginx.conf

If you want to manually modify nginx for some reason, you can do so as follows.
Be careful so you don't accidentally lock yourself out (nginx is responsible for
the client you are using too).

```
shell find / -name "nginx.conf"
open <location shown in the log> // change the config in the editor
save
shell service nginx reload // this reloads the changes you made
```

## Commands

Here's an incomplete list of commands. The goal is to mimick the IRC protocol in
terms of simplicty, while still allowing for more complex shell commands. There
are thus two types of commands: simple macros, and Unix commands that start with
`shell`.

If you want to see the implementation of the open/save/serve commands, have a
look in `server/handler.rkt`.

```
open <file> - opens the file specified
save - implicit saves the current file
save <file> - saves the content of editor to the specified file
serve <dir> - serves the specifed directory
shell <cmd> - executes cmd command in the shell, returns standard out
```

## FAQ

### When would I use it?

If you want to make things online and just get them up and running without
bothering with servers, and you are dissatisfied or unable to use current
solutions for that.

Netpowder is still very much a work in progress, so it remains to be seen what
it evolves into. Because each satellite is running on a Unix-like "server", we
can leverage a lot of shell and unix goodness, while still presenting a simple
user interface for common tasks.

### When would I not use it?

- If you care about security, such as hosting sensitive information, or
- if performance is important, i.e. if you have a lot of users, or
- if you are trying to do anything sophisticated.

### Where does the name Netpowder come from?

I like to imagine it as gunpowder for the web. Hosting things you make should be
a convenient commodity, not a chore.

### How does it work behind the scenes?

See http://experiments.oskarth.com/netpowder/ for a technical overview.

### How do I get access?

Currently the number of publicly available satellites is limited. This is due to
limited resources, as well as the project being in the initial stages in terms
of satellite deployment. If you wish to try out Netpowder, please email
`me@oskarth.com` or sign up to the [mailing list](http://netpowder.com/).

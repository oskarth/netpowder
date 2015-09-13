# Netpowder

Netpowder is a mini-server in the browser. It allows you to host things you make
online, without ever having to bother with a server.

Netpowder is made up of *satellites*. As an end user, you have access to a
single satellite, such as Triton. This means that you can access
`triton.neptune.netpowder.com` and host public content from that domain.

If you wish to see a quick video demonstration, you can do so
[here](https://www.youtube.com/watch?v=9NqEpsFeKDg).

## Getting access

Currently the number of publicly available satellites is limited. This is due to
limited resources, as well as the project being in the initial stages in terms
of satellite deployment. If you wish to try out Netpowder, please email
`me@oskarth.com`.

Once you have access to a satellite, go that satellite's URL and login using the
*access code* you have been given. You login by typing your *access code* in the
*command window* below the *editor*. If you see the message "AUTHENTICATED" in
the *log*, it means you successfully authenticated.

If you see the message "UNAUTHENTICATED" followed by the message "DISCONNECTED"
it means you entered the wrong code. Please refresh the code and try again. If
you see anything else, such as just the message "DISCONNECTED", please submit a
bug report.

## Getting started

So you just access to a satellite, what do you do now? Before starting to use
it, please keep the following things in mind:

1. **Ask for help and give feedback**. You can open issues on Github, or
email/tweet/IRC me. If there's anything you are wondering about, or
anything you would like to see in in Netpowder, please do let me know.

2. **Be nice**. Don't use your satellite to host anything illegal, or otherwise
abuse it, such as hosting huge files or flooding the network.

3. **Remember Netpowder is very new**. Don't use Netpowder for
security-sensitive applications, or to host things that you don't have a backup
of. Things will definitely break.

Because of current resource constraints, there are only 14 satellites available
initially. This means that if you don't actively use your satellite within a
rolling 72 hour window, you will lose the satellite and it will become available
to the next person in the queue.

More example usages are coming, but in the meantime go crazy and ask questions
:)

## Example: Hello World

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

Now open up `your.satellite.com/hello/` in a browser. See the video
demonstration. Note that this this hello-site will persist even if you close
your browser window.

## Example: finding and modifiying nginx.conf

If you want to manually modify nginx for some reason, you can do so as follows.
Be careful so you don't accidentally lock yourself out (nginx is responsible for
the client you are using too).

```
shell locate nginx.conf
open <location shown in the log> // change the config in the editor
save
shell service nginx reload // this reloads the changes you made
```

## Commands

Here's an incomplete list of commands. The goal is to mimick the IRC protocol in
terms of simplicty, while still allowing for more complex shell commands.

```
open <file> - opens the file specified
save - implicit saves the current file
save <file> - saves the content of editor to the specified file
serve <dir> - serves the specifed directory
shell <cmd> - executes cmd command in the shell, returns standard out
```

## FAQ

### Why would I use it?

Let's start by when you wouldn't use it:
- if you care about security, such as hosting sensitive information,
- if you are expecting a lot of users,
- if you are trying to do anything sophisticated.

You would however use it if you want to get something up and running quickly for
the rest of the world to see, and you are unsatisfied with current offerings.

Netpowder is still very much a work in progress, so it remains to be seen what
it involves into. Because each Satellite running on a Unix-like "server",
there's a lot of accumulated history and practices that can leveraged. If you
know what you are doing, you can always drop down to the shell.

### Where does the name Netpowder come from?

I like to imagine it as gunpowder for the web. Hosting things you make should be
a convenient commodity, not a chore.

### How does it work?

See http://experiments.oskarth.com/netpowder/ for a technical overview.

var editor = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
  lineNumbers: true,
  mode: "text/html",
  matchBrackets: true
});

// toggles between iframe and log view
function toggle() {
  iframe_elem = document.getElementById('iframe-wrap');
  log_elem = document.getElementById('log-wrap');

  if (iframe_elem.style.display == 'none') {
    log_elem.style.display = 'none';
    iframe_elem.style.display = 'block';
  }
  else {
    iframe_elem.style.display = 'none';
    log_elem.style.display = 'block';
  }
}

// changes iframe link and brings iframe to the front
function preview(data) {
  iframe = document.getElementById('preview');
  if (data == "") {
   iframe.src = iframe.src;
  } else { iframe.src = "http://placeholder.neptune.netpowder.com/" + data;
  }
  iframe.contentWindow.location.reload(true);
}

function input(event, input) {
  if (event.keyCode == 13) {  
    text = document.getElementById('input').value;  
    splitted = text.split(' ');
    cmd = splitted[0];  
    data = splitted.splice(1).join(' ');  

    switch (cmd) {
      case "save":
        if (data == "") {
          data = currentFile;
        }
        lines = editor.getValue().split("\n");
        ws.send(["beginop", "save", data].join(' '));
        for (var i = 0; i < lines.length; i++) {
          ws.send(lines[i]);
        }
        ws.send(["endop", "save", data].join(' '));
        // when will this be executed?
        break;
      case "preview":
        preview(data);
        break;
      case "toggle":
        toggle();
        break;
      default:  
        ws.send(text);
    }
  } 
}

function log(msg) {
  currContent = document.getElementById('log').textContent;
  //document.getElementById('log').textContent = msg + "\n" + currContent;
  document.getElementById('log').textContent = currContent + msg + "\n";

  var logel = document.getElementById("log");
  logel.scrollTop = logel.scrollHeight;

}

// TODO: preview foo should put that in iframe

var ws = new WebSocket('ws://placeholder.neptune.netpowder.com:8080/');

ws.onopen = function() {
  log('Welcome to Netpowder!');
  log('Enter your access code at the bottom of the screen to login.');
};

ws.onclose = function() {
  log('DISCONNECTED');
};

// on message from the server
ws.onmessage = function(event) {
  msg = event.data.split(' ');
  cmd = msg[0];
  msg.splice(0,1); // remove command part of message
  data = msg.join(' ');

  switch (cmd) {
    case "echo":
      log(data);
      break;
    case "clear":
      editor.setValue("");
      // Assuming clear always followed by append
      // we can instrument append w.r.t newlines.
      firstAppend = true;
      break;
    case "edit":
      currentFile = data; // XXX: Where is this in scope?
      currentFileElement = document.getElementById('currentFile');
      currentFileElement.textContent = "Editing " + currentFile;
      break;
    case "append":
      currentValue = editor.getValue();
      if (firstAppend) {
        editor.setValue(data);
        firstAppend = false;
      } else {
        editor.setValue(currentValue + '\n' + data);
      }
      break;
    default:
      log([cmd, data].join(' '));
  }
};

window.setInterval(function() {
  ws.send("ping");
  }, 45000);

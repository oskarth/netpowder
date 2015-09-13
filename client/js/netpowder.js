var editor = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
  lineNumbers: true,
  mode: "text/html",
  matchBrackets: true
});

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
        break;
      default:  
        ws.send(text);
    }
  } 
}

function log(msg) {
  currContent = document.getElementById('log').textContent;
  document.getElementById('log').textContent = msg + "\n" + currContent;
}

var ws = new WebSocket('ws://placeholder.netpowder.com:8080/');
ws.onopen = function() {
  log('CONNECTED');
};
ws.onclose = function() {
  log('DISCONNECTED');
};
ws.onmessage = function(event) {
  // XXX: Ugly code with mutable variables
  splitted = event.data.split(' ');
  cmd = splitted.shift();
  splitted.pop();
  data = splitted.join(' ');

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

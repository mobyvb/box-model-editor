var editorList = [];

function setup() {
  document.addEventListener('mousedown', function(e) {
    if (BoxModelEditor.isPartOfEditor(e.target)) {
      for (var i = 0; i < editorList.length; i++) {
        editorList[i].mouseDown(e);
      }
    } else {
      var newEditor = new BoxModelEditor(e.target);
      editorList.push(newEditor);
    }
  });
  document.addEventListener('mouseup', function(e) {
    for (var i = 0; i < editorList.length; i++) {
      editorList[i].mouseUp(e);
    }
  });
  document.addEventListener('mousemove', function(e) {
    for (var i = 0; i < editorList.length; i++) {
      editorList[i].mouseMove(e);
    }
  });
}

function addEventListenerToClass(label, type, cb) {
  var elements = document.getElementsByClassName(label);
  for (var i = 0; i < elements.length; i++) {
    var next = elements[i];
    next.addEventListener(type, cb);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

window.onload = setup;

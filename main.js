var hoveredHandle;
var selectedHandle;
var boxEditor;
var tooltip;
var currentTarget;
var lastMousePosition = {x: 0, y: 0};

var editorList = [];

function setup() {
  // boxEditor = document.getElementById('box-model-editor');
  // tooltip = document.getElementById('box-model-tooltip');
  /*addEventListenerToClass('handle', 'mouseenter', function(e) {
    hoveredHandle = e.target;
  });
  addEventListenerToClass('handle', 'mouseleave', function() {
    hoveredHandle = null;
  });*/
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
    /*selectedHandle = null;
    tooltip.style.visibility = 'hidden';*/
  });
  document.addEventListener('mousemove', function(e) {
    for (var i = 0; i < editorList.length; i++) {
      editorList[i].mouseMove(e);
    }
    /*if (selectedHandle) {
      var currentMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
      var difference;
      var direction;
      if (selectedHandle.className.indexOf('top-handle') >= 0) {
        direction = 'top';
        difference = currentMousePosition.y - lastMousePosition.y;
      } else if (selectedHandle.className.indexOf('bottom-handle') >= 0) {
        direction = 'bottom';
        difference = currentMousePosition.y - lastMousePosition.y;
      } else if (selectedHandle.className.indexOf('left-handle') >= 0) {
        direction = 'left';
        difference = currentMousePosition.x - lastMousePosition.x;
      } else {
        direction = 'right';
        difference = currentMousePosition.x - lastMousePosition.x;
      }
      var handleParent = selectedHandle.parentNode;
      var changedVal;
      if (handleParent.className.indexOf('box-model-outer') >= 0) {
        if (direction === 'bottom') {
          changedVal = adjustMargin(currentTarget, direction, difference);
        }
      } else if (handleParent.className.indexOf('box-model-middle') >= 0) {
        if (direction === 'bottom') {
          changedVal = adjustPadding(currentTarget, direction, difference);
        } else {
          changedVal = adjustMargin(currentTarget, direction, difference);
        }
      } else {
        if (direction !== 'bottom') {
          changedVal = adjustPadding(currentTarget, direction, difference);
        }
      }
      tooltip.style.visibility = 'visible';
      tooltip.style.left = currentMousePosition.x + 15;
      tooltip.style.top = currentMousePosition.y + 15;
      tooltip.innerHTML = changedVal;
      positionEditorOver(currentTarget);
      lastMousePosition = currentMousePosition;
    }*/
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

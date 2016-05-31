var hoveredHandle;
var selectedHandle;
var boxEditor;
var currentTarget;
var lastMousePosition = {x: 0, y: 0};

function setup() {
  boxEditor = document.getElementById('box-model-editor');
  addEventListenerToClass('handle', 'mouseenter', function(e) {
    hoveredHandle = e.target;
  });
  addEventListenerToClass('handle', 'mouseleave', function() {
    hoveredHandle = null;
  });
  document.addEventListener('mousedown', function(e) {
    if (isPartOfEditor(e.target)) {
      if (hoveredHandle) {
        selectedHandle = hoveredHandle;
        lastMousePosition = {
          x: e.clientX,
          y: e.clientY
        };
      }
    } else {
      positionEditorOver(e.target);
      currentTarget = e.target;
    }
  });
  document.addEventListener('mouseup', function() {
    selectedHandle = null;
  });
  document.addEventListener('mousemove', function(e) {
    if (selectedHandle) {
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
      if (handleParent.className.indexOf('box-model-outer') >= 0) {
        if (direction === 'bottom') {
          adjustMargin(currentTarget, direction, difference);
        }
      } else if (handleParent.className.indexOf('box-model-middle') >= 0) {
        if (direction === 'bottom') {
          adjustPadding(currentTarget, direction, difference);
        } else {
          adjustMargin(currentTarget, direction, difference);
        }
      } else {
        console.log('difference: ' + difference);
        if (direction !== 'bottom') {
          adjustPadding(currentTarget, direction, difference);
        }
      }
      positionEditorOver(currentTarget);
      lastMousePosition = currentMousePosition;
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

function isPartOfEditor(element) {
  var node = element.parentNode;
  while (node != null) {
    if (node === boxEditor) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function positionEditorOver(element) {
  var targetStyles = window.getComputedStyle(element);
  var margins = {
    top: parseInt(targetStyles.marginTop.replace('px', '')),
    bottom: parseInt(targetStyles.marginBottom.replace('px', '')),
    left: parseInt(targetStyles.marginLeft.replace('px', '')),
    right: parseInt(targetStyles.marginRight.replace('px', ''))
  };
  var padding = {
    top: parseInt(targetStyles.paddingTop.replace('px', '')),
    bottom: parseInt(targetStyles.paddingBottom.replace('px', '')),
    left: parseInt(targetStyles.paddingLeft.replace('px', '')),
    right: parseInt(targetStyles.paddingRight.replace('px', ''))
  };
  var top = element.offsetTop - margins.top - boxEditor.offsetTop;
  var left = element.offsetLeft - margins.left - boxEditor.offsetLeft;
  var width = element.offsetWidth + margins.left + margins.right;
  var height = element.offsetHeight + margins.top + margins.bottom;

  var editorOuter = document.getElementsByClassName('box-model-outer')[0];
  var editorMiddle = document.getElementsByClassName('box-model-middle')[0];
  var editorInner = document.getElementsByClassName('box-model-inner')[0];
  editorOuter.style.top = top + 'px';
  editorOuter.style.left = left + 'px';
  editorOuter.style.width = width + 'px';
  editorOuter.style.height = height + 'px';

  top += margins.top;
  left += margins.left;
  width -= (margins.left + margins.right);
  height -= (margins.top + margins.bottom);
  editorMiddle.style.top = top + 'px';
  editorMiddle.style.left = left + 'px';
  editorMiddle.style.width = width + 'px';
  editorMiddle.style.height = height + 'px';

  top += padding.top;
  left += padding.left;
  width -= (padding.left + padding.right);
  height -= (padding.top + padding.bottom);
  editorInner.style.top = top + 'px';
  editorInner.style.left = left + 'px';
  editorInner.style.width = width + 'px';
  editorInner.style.height = height + 'px';
}

function adjustPadding(target, direction, amount) {
  if (direction === 'right') {
    amount = -amount;
  }
  var targetStyles = window.getComputedStyle(target);
  var attributeToModify = 'padding' + capitalize(direction);
  var oldPadding = parseInt(targetStyles[attributeToModify].replace('px', ''));
  oldPadding += amount;
  target.style[attributeToModify] = oldPadding + 'px';
}

function adjustMargin(target, direction, amount) {
  if (direction === 'right') {
    amount = -amount;
  }
  var targetStyles = window.getComputedStyle(target);
  var attributeToModify = 'margin' + capitalize(direction);
  var oldMargin = parseInt(targetStyles[attributeToModify].replace('px', ''));
  oldMargin += amount;
  target.style[attributeToModify] = oldMargin + 'px';
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

window.onload = setup;

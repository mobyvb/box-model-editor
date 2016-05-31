function BoxModelEditor(target) {
  this.target = target;
  this.handles = [];

  var editor = document.createElement('div');
  editor.className = 'box-model-editor';

  var outer = document.createElement('div');
  outer.className = 'box-model-outer';
  var downOuter = document.createElement('div');
  downOuter.className = 'handle bottom-handle';
  this.handles.push(downOuter);
  outer.appendChild(downOuter);
  editor.appendChild(outer);

  var middle = document.createElement('div');
  middle.className = 'box-model-middle';
  var upMiddle = document.createElement('div');
  upMiddle.className = 'handle top-handle';
  var downMiddle = document.createElement('div');
  downMiddle.className = 'handle bottom-handle';
  var leftMiddle = document.createElement('div');
  leftMiddle.className = 'handle left-handle';
  var rightMiddle = document.createElement('div');
  rightMiddle.className = 'handle right-handle';
  this.handles.push(upMiddle);
  this.handles.push(downMiddle);
  this.handles.push(leftMiddle);
  this.handles.push(rightMiddle);
  middle.appendChild(upMiddle);
  middle.appendChild(downMiddle);
  middle.appendChild(leftMiddle);
  middle.appendChild(rightMiddle);
  editor.appendChild(middle);

  var inner = document.createElement('div');
  inner.className = 'box-model-inner';
  var upInner = document.createElement('div');
  upInner.className = 'handle top-handle';
  var leftInner = document.createElement('div');
  leftInner.className = 'handle left-handle';
  var rightInner = document.createElement('div');
  rightInner.className = 'handle right-handle';
  this.handles.push(upInner);
  this.handles.push(leftInner);
  this.handles.push(rightInner);
  inner.appendChild(upInner);
  inner.appendChild(leftInner);
  inner.appendChild(rightInner);
  editor.appendChild(inner);

  document.body.appendChild(editor);
  this.editor = editor;
  this.outer = outer;
  this.middle = middle;
  this.inner = inner;

  this.addHandleListeners();
  this.positionOverTarget();
}

BoxModelEditor.prototype = {
  positionOverTarget: function() {
    var element = this.target;
    var targetStyles = window.getComputedStyle(element);
    var margins = {
      top: parseInt(targetStyles.marginTop),
      bottom: parseInt(targetStyles.marginBottom),
      left: parseInt(targetStyles.marginLeft),
      right: parseInt(targetStyles.marginRight)
    };
    var padding = {
      top: parseInt(targetStyles.paddingTop),
      bottom: parseInt(targetStyles.paddingBottom),
      left: parseInt(targetStyles.paddingLeft),
      right: parseInt(targetStyles.paddingRight)
    };
    var borders = {
      top: parseInt(targetStyles.borderTopWidth),
      bottom: parseInt(targetStyles.borderBottomWidth),
      left: parseInt(targetStyles.borderLeftWidth),
      right: parseInt(targetStyles.borderRightWidth)
    };
    var top = element.offsetTop - margins.top - this.editor.offsetTop;
    var left = element.offsetLeft - margins.left - this.editor.offsetLeft;
    var width = element.offsetWidth + margins.left + margins.right;
    var height = element.offsetHeight + margins.top + margins.bottom;

    this.outer.style.top = top + 'px';
    this.outer.style.left = left + 'px';
    this.outer.style.width = width + 'px';
    this.outer.style.height = height + 'px';

    top += margins.top;
    left += margins.left;
    width -= (margins.left + margins.right);
    height -= (margins.top + margins.bottom);
    this.middle.style.top = top + 'px';
    this.middle.style.left = left + 'px';
    this.middle.style.width = width + 'px';
    this.middle.style.height = height + 'px';

    top += padding.top + borders.top;
    left += padding.left + borders.left;
    width -= padding.left + padding.right + borders.left + borders.right;
    height -= padding.top + padding.bottom + borders.top + borders.bottom;
    this.inner.style.top = top + 'px';
    this.inner.style.left = left + 'px';
    this.inner.style.width = width + 'px';
    this.inner.style.height = height + 'px';
  },
  adjustPadding: function(direction, cursorPos) {
    var amount = 0;
    var middleDimensions = {
      top: parseInt(this.middle.style.top),
      left: parseInt(this.middle.style.left),
      width: parseInt(this.middle.style.width),
      height: parseInt(this.middle.style.height)
    };
    var innerDimensions = {
      top: parseInt(this.inner.style.top),
      left: parseInt(this.inner.style.left),
      width: parseInt(this.inner.style.width),
      height: parseInt(this.inner.style.height)
    };
    if (direction === 'top') {
      amount = cursorPos.y - innerDimensions.top;
    } else if (direction === 'bottom') {
      amount = cursorPos.y - (middleDimensions.top + middleDimensions.height);
    } else if (direction === 'left') {
      amount = cursorPos.x - innerDimensions.left;
    } else {
      amount = (innerDimensions.left + innerDimensions.width) - cursorPos.x
    }
    var targetStyles = window.getComputedStyle(this.target);
    var attributeToModify = 'padding' + capitalize(direction);
    var oldPadding = parseInt(targetStyles[attributeToModify]);
    oldPadding += amount;
    this.target.style[attributeToModify] = oldPadding + 'px';
    return attributeToModify + ': ' + oldPadding + 'px';
  },
  adjustMargin: function(direction, cursorPos) {
    var amount = 0;
    var outerDimensions = {
      top: parseInt(this.outer.style.top),
      left: parseInt(this.outer.style.left),
      width: parseInt(this.outer.style.width),
      height: parseInt(this.outer.style.height)
    };
    var middleDimensions = {
      top: parseInt(this.middle.style.top),
      left: parseInt(this.middle.style.left),
      width: parseInt(this.middle.style.width),
      height: parseInt(this.middle.style.height)
    };
    if (direction === 'top') {
      amount = cursorPos.y - middleDimensions.top;
    } else if (direction === 'bottom') {
      amount = cursorPos.y - (outerDimensions.top + outerDimensions.height);
    } else if (direction === 'left') {
      amount = cursorPos.x - middleDimensions.left;
    } else {
      amount = (middleDimensions.left + middleDimensions.width) - cursorPos.x
    }
    var targetStyles = window.getComputedStyle(this.target);
    var attributeToModify = 'margin' + capitalize(direction);
    var oldMargin = parseInt(targetStyles[attributeToModify]);
    oldMargin += amount;
    this.target.style[attributeToModify] = oldMargin + 'px';
    return attributeToModify + ': ' + oldMargin + 'px';
  },
  removeFromDocument: function() {
    document.body.removeChild(this.editor);
  },
  addHandleListeners: function() {
    var self = this;
    for (var i = 0; i < this.handles.length; i++) {
      var curr = this.handles[i];
      curr.addEventListener('mouseenter', function(e) {
        self.hoveredHandle = e.target;
        var handleClass = e.target.className;
        if (handleClass.indexOf('top-handle') >= 0) {
          self.hoverDirection = 'top';
        } else if (handleClass.indexOf('bottom-handle') >= 0) {
          self.hoverDirection = 'bottom';
        } else if (handleClass.indexOf('left-handle') >= 0) {
          self.hoverDirection = 'left';
        } else {
          self.hoverDirection = 'right';
        }
      });
      curr.addEventListener('mouseleave', function() {
        if (!self.dragging) {
          self.hoveredHandle = null;
        }
      });
    }
  },
  mouseDown: function(e) {
    if (this.hoveredHandle) {
      this.dragging = true;
    }
  },
  mouseUp: function(e) {
    this.dragging = false;
    this.hoveredHandle = null;
  },
  mouseMove: function(e) {
    if (this.dragging) {
      var mousePos = {x: e.clientX, y: e.clientY};
      var editBox = this.hoveredHandle.parentNode;
      if (editBox === this.outer) {
        this.adjustMargin(this.hoverDirection, mousePos);
      } else if (editBox === this.middle) {
        if (this.hoverDirection === 'bottom') {
          this.adjustPadding(this.hoverDirection, mousePos);
        } else {
          this.adjustMargin(this.hoverDirection, mousePos);
        }
      } else {
        this.adjustPadding(this.hoverDirection, mousePos);
      }
      this.positionOverTarget();
    }
  }
};

BoxModelEditor.isPartOfEditor = function(target) {
  var node = target;
  while (node != null) {
    if (node.className && node.className.indexOf('box-model-editor') >= 0) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

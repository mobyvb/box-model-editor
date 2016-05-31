function BoxModelEditor(target) {
  this.target = target;

  var editor = document.createElement('div');
  editor.className = 'box-model-editor';

  var outer = document.createElement('div');
  outer.className = 'box-model-outer';
  var downOuter = document.createElement('div');
  downOuter.className = 'handle bottom-handle';
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
  inner.appendChild(upInner);
  inner.appendChild(leftInner);
  inner.appendChild(rightInner);
  editor.appendChild(inner);

  document.body.appendChild(editor);
  this.editor = editor;

  this.positionOverTarget();
}

BoxModelEditor.prototype = {
  positionOverTarget: function() {
    var element = this.target;
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
    var borders = {
      top: parseInt(targetStyles.borderTopWidth.replace('px', '')),
      bottom: parseInt(targetStyles.borderBottomWidth.replace('px', '')),
      left: parseInt(targetStyles.borderLeftWidth.replace('px', '')),
      right: parseInt(targetStyles.borderRightWidth.replace('px', ''))
    };
    var top = element.offsetTop - margins.top - this.editor.offsetTop;
    var left = element.offsetLeft - margins.left - this.editor.offsetLeft;
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

    top += padding.top + borders.top;
    left += padding.left + borders.left;
    width -= padding.left + padding.right + borders.left + borders.right;
    height -= padding.top + padding.bottom + borders.top + borders.bottom;
    editorInner.style.top = top + 'px';
    editorInner.style.left = left + 'px';
    editorInner.style.width = width + 'px';
    editorInner.style.height = height + 'px';
  },
  adjustPadding: function(direction, cursorPos) {
    // find "amount" based on direction and how far the cursor is from attribute being adjusted
    if (direction === 'right') {
      amount = -amount;
    }
    var targetStyles = window.getComputedStyle(target);
    var attributeToModify = 'padding' + capitalize(direction);
    var oldPadding = parseInt(targetStyles[attributeToModify].replace('px', ''));
    oldPadding += amount;
    target.style[attributeToModify] = oldPadding + 'px';
    return attributeToModify + ': ' + oldPadding + 'px';
  },
  adjustMargin: function(direction, cursorPos) {
    // find "amount" based on direction and how far the cursor is from attribute being adjusted
    if (direction === 'right') {
      amount = -amount;
    }
    var targetStyles = window.getComputedStyle(target);
    var attributeToModify = 'margin' + capitalize(direction);
    var oldMargin = parseInt(targetStyles[attributeToModify].replace('px', ''));
    oldMargin += amount;
    target.style[attributeToModify] = oldMargin + 'px';
    return attributeToModify + ': ' + oldMargin + 'px';
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

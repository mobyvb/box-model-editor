function BoxModelEditor(target) {
  this.target = target;
}

BoxModelEditor.prototype = {
  positionOverTarget: function() {
    var targetStyles = window.getComputedStyle(this.target);
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

Element.prototype.visDOMSelect = function(elems, f) {
  var m = { x: -1, y: -1 };
  var element = null;
  var _this = this;

  function mousemove(e) {
    m.x0 = e.pageX; m.y0 = e.pageY;
    element.style.width  = Math.abs(m.x - m.x0) + 'px';
    element.style.height = Math.abs(m.y - m.y0) + 'px';
    element.style.left   = Math.min(m.x, m.x0) + 'px';
    element.style.top    = Math.min(m.y, m.y0) + 'px';
  }

  function mouseup() {
    var i;
    var b;

    /**
     * For the hit testing in the loop below, we want (m.x0, m.y0)
     * representing the top left of the rectangle and (m.x, m.y)
     * representing the bottom right.
     * To do so, we swap the coordinates if needed.
     */
    if (m.x < m.x0) m.x = m.x0 + (m.x0 = m.x, 0);
    if (m.y < m.y0) m.y = m.y0 + (m.y0 = m.y, 0);

    for (i = 0; i < elems.length; i++) {
      b = elems[i].getBoundingClientRect();
      if (b && m.x0 <= b.right  + (window.pageXOffset || _this.scrollLeft)
            && m.x  >= b.left   + (window.pageXOffset || _this.scrollLeft)
            && m.y0 <= b.bottom + (window.pageYOffset || _this.scrollTop)
            && m.y  >= b.top    + (window.pageYOffset || _this.scrollTop)) {
        f(elems[i]);
      }
    }

    element.parentElement.removeChild(element);
    element = null;
    _this.style.cursor = 'default';
    _this.removeEventListener('mousemove', mousemove);
    _this.removeEventListener('mouseup', mouseup);
  }

  function mousedown(e) {
    // Temporarily disable text selection by disabling the default event.
    e.preventDefault();
    m.x = e.pageX; m.y = e.pageY;
    element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.border = '1px solid pink';
    element.style.background = 'rgba(255, 192, 203, 0.25)';
    element.style.zIndex = 555;
    element.style.left = m.x + 'px';
    element.style.top = m.y + 'px';
    _this.appendChild(element);
    _this.style.cursor = 'crosshair';
    _this.addEventListener('mousemove', mousemove);
    _this.addEventListener('mouseup', mouseup);
    _this.removeEventListener('mousedown', mousedown);
  }

  this.addEventListener('mousedown', mousedown);
};

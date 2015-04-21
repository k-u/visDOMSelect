/* there's probably too dom manip here
 * maybe try out https://github.com/Matt-Esch/virtual-dom
 *   or better yet, port the whole thing to elm
 */

(function() {
  var td = document.createElement('td');
  var inp = document.createElement('input');
  inp.type = 'checkbox';
  td.appendChild(inp);

  // we assume td does not change after this

  function mkTable(w, h) {
    var t = document.createElement('table');
    var tr = document.createElement('tr');
    while (w--) {
      tr.appendChild(td.cloneNode(true));
    }

    while (h--) {
      t.appendChild(tr.cloneNode(true));
    }

    return t;
  }

  var w = document.getElementById('w');
  var h = document.getElementById('h');

  document.getElementById('table')
          .appendChild(mkTable(w.valueAsNumber, h.valueAsNumber));
  var t = document.querySelector('table');

  /* for adding and removing rows and columns, we assume
   *   all table children are trs,
   *   tr children are tds,
   *   and each td has a checkbox.
   */

  /* polyfill for remove.  remove() was added finally in 2011 to the DOM standard.
   * http://lists.w3.org/Archives/Public/www-dom/2011OctDec/0183.html
   * http://quirksmode.org/dom/html/#t10
   */
  if (!Element.prototype.remove) {
    Element.prototype.remove = function() {
      this.parentElement.removeChild(this);
    };
  }

  w.oninput = function(e) {
    var last = t.firstChild.children.length;
    var upd8  = e.target.valueAsNumber;
    if (isNaN(upd8) || upd8 > w.max || upd8 < w.min) {
      return;
    }

    if (last < upd8) {
      // add columns
      var buffer = document.createDocumentFragment();
      for (; last < upd8; last++) {
        buffer.appendChild(td.cloneNode(true));
      }

      var addCol = t.children;
      for (var i = 0; i < addCol.length; i++) {
        addCol[i].appendChild(buffer.cloneNode(true));
      }
    } else if (last > upd8) {
      // remove columns
      for (; last > upd8; last--) {
        for (var j = 0; j < t.children.length; j++) {
          t.children[j].lastChild.remove();
        }
      }
    }
  };

  h.oninput = function(e) {
    var rows = t.children;
    var last = rows.length;
    var upd8  = e.target.valueAsNumber;
    if (isNaN(upd8) || upd8 > h.max || upd8 < h.min) {
      return;
    }

    if (last < upd8) {
      // add rows
      // we build up a buffer for a single dom insertion
      var buffer = document.createDocumentFragment();
      var tr = document.createElement('tr');
      for (var i = t.firstChild.children.length; i > 0; i--) {
        tr.appendChild(td.cloneNode(true));
      }

      for (; last < upd8; last++) {
        buffer.appendChild(tr.cloneNode(true));
      }

      t.appendChild(buffer);
    } else if (last > upd8) {
      // remove rows
      for (; last > upd8; last--) {
        rows[last - 1].remove();
      }
    }
  };
})();

# visDOMSelect

## Synopsis

Visually select to filter and iterate over a collection of DOM elements.

*Tested in Firefox 36, Chrome 41.*

## Examples

### Toggle a selection of checkboxes

    var doc = document.documentElement;
    var elems = document.querySelectorAll('input[type="checkbox"]');
    doc.visDOMSelect(elems, function(e) {
      e.checked ^= 1;
    });

![toggle checkboxes example](checkboxToggle.gif?raw=true)  
[Demo](https://k-u.github.io/visDOMSelect/checkboxToggle)

### Build an array of elements in a selection matching specified CSS selectors

    var doc = document.documentElement;
    var arr = [];
    doc.visDOMSelect(document.querySelectorAll('div, span'), function(e) {
      arr.push(e);
    });

## Why?
This originally came about to quickly fill out certain sites' privacy and email notification settings.  `visDOMSelect` is useful when you can enclose you want in a box, and where it is tricky to write a selector.

## Code Style Guidelines
[Airbnb has some guidelines for writing more readable javascript here](https://github.com/airbnb/javascript).  Code should pass `jscs --preset airbnb`.

## License
[WTFPL](http://www.wtfpl.net/about/).

## TODO
* Check compatibility in more browsers.
* Make more testable and add tests.

# doctor.js

doctor.js is a tool that parses javascript documentation (JSDoc-like) and formulates interface definitions from that, in an easily machine-readable JSON format. The goal is to act as a tool for documentation generators and editors so that those tools can focus on the presentation rather than gathering the interface definitions from the code.

doctor.js also aims to minimize the amount of redundancy common to JS documentation formats, such as repeating function/class names.

## Features

 * Simple context detection, e.g.

```javascript

/**
 * Blegh all the things.
*/
var blegh = function () {
    // function name detected automatically
};

/**
 * Mother of all Blubs.
 * @class
*/
function Blub () {
    // function name detected automatically
}

Blub.prototype = {
    /**
     * Corp it down!
    */
    corp: function () {
        // function name detected automatically
    }
};

/**
 * Ramp the blub!
*/
Blub.prototype.ramp = function () {
    // function name detected automatically
    // AND also assigned as a method of Blub
};

// The following isn't detected to avoid contextless documentation fragments being assigned accidentally.
/**
 * My Backbone View.
 * @class MyView
 * @extends Backbone.View
*/
var MyView = Backbone.View.extend({
    ...
});

```

 * Local aliasing:

```javascript

/**
 * My Class.
 * @class
 * @alias MyClass
*/
var MyClass = My.Long.NameSpace.Thing.MyClass = function () {
};

/**
 * Blerg them.
*/
MyClass.prototype.blerg = function () {
};

```

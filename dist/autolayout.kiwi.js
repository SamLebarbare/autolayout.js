/**
* AutoLayout.js is licensed under the MIT license. If a copy of the
* MIT-license was not distributed with this file, You can obtain one at:
* http://opensource.org/licenses/mit-license.html.
*
* @author: Hein Rutjes (IjzerenHein)
* @license MIT
* @copyright Gloey Apps, 2015
*
* @library autolayout.js
* @version 0.4.0
* @generated 27-07-2015
*/
/*-----------------------------------------------------------------------------
| Kiwi (TypeScript version)
|
| Copyright (c) 2015, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AutoLayout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['kiwi'] = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['kiwi'] = factory();
  }
}(this, function () {

/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var tsu;
(function (tsu) {

    /**
    * An iterator for an array of items.
    */
    var ArrayIterator = (function () {
        /*
        * Construct a new ArrayIterator.
        *
        * @param array The array of items to iterate.
        * @param [index] The index at which to start iteration.
        */
        function ArrayIterator(array, index) {
            if (typeof index === "undefined") { index = 0; }
            this._array = array;
            this._index = Math.max(0, Math.min(index, array.length));
        }
        /**
        * Returns the next item from the iterator or undefined.
        */
        ArrayIterator.prototype.__next__ = function () {
            return this._array[this._index++];
        };

        /**
        * Returns this same iterator.
        */
        ArrayIterator.prototype.__iter__ = function () {
            return this;
        };
        return ArrayIterator;
    })();
    tsu.ArrayIterator = ArrayIterator;

    /**
    * A reverse iterator for an array of items.
    */
    var ReverseArrayIterator = (function () {
        /**
        * Construct a new ReverseArrayIterator.
        *
        * @param array The array of items to iterate.
        * @param [index] The index at which to start iteration.
        */
        function ReverseArrayIterator(array, index) {
            if (typeof index === "undefined") { index = array.length; }
            this._array = array;
            this._index = Math.max(0, Math.min(index, array.length));
        }
        /**
        * Returns the next item from the iterator or undefined.
        */
        ReverseArrayIterator.prototype.__next__ = function () {
            return this._array[--this._index];
        };

        /**
        * Returns this same iterator.
        */
        ReverseArrayIterator.prototype.__iter__ = function () {
            return this;
        };
        return ReverseArrayIterator;
    })();
    tsu.ReverseArrayIterator = ReverseArrayIterator;

    

    function iter(object) {
        if (object instanceof Array) {
            return new ArrayIterator(object);
        }
        return object.__iter__();
    }
    tsu.iter = iter;

    

    function reversed(object) {
        if (object instanceof Array) {
            return new ReverseArrayIterator(object);
        }
        return object.__reversed__();
    }
    tsu.reversed = reversed;

    /**
    * Returns the next value from an iterator, or undefined.
    */
    function next(iterator) {
        return iterator.__next__();
    }
    tsu.next = next;


    function forEach(object, callback) {
        if (object instanceof Array) {
            for (var i = 0, n = object.length; i < n; ++i) {
                if (callback(object[i]) === false) {
                    return;
                }
            }
        } else {
            var value;
            var it = object.__iter__();
            while ((value = it.__next__()) !== undefined) {
                if (callback(value) === false) {
                    return;
                }
            }
        }
    }
    tsu.forEach = forEach;

})(tsu || (tsu = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var tsu;
(function (tsu) {
    

    /**
    * A class which defines a generic pair object.
    */
    var Pair = (function () {
        /**
        * Construct a new Pair object.
        *
        * @param first The first item of the pair.
        * @param second The second item of the pair.
        */
        function Pair(first, second) {
            this.first = first;
            this.second = second;
        }
        /**
        * Create a copy of the pair.
        */
        Pair.prototype.copy = function () {
            return new Pair(this.first, this.second);
        };
        return Pair;
    })();
    tsu.Pair = Pair;
})(tsu || (tsu = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
/// <reference path="iterator.ts"/>
/// <reference path="utility.ts"/>
var tsu;
(function (tsu) {
    /**
    * Perform a lower bound search on a sorted array.
    *
    * @param array The array of sorted items to search.
    * @param value The value to located in the array.
    * @param compare The value comparison function.
    * @returns The index of the first element in the array which
    *          compares greater than or equal to the given value.
    */
    function lowerBound(array, value, compare) {
        var begin = 0;
        var n = array.length;
        var half;
        var middle;
        while (n > 0) {
            half = n >> 1;
            middle = begin + half;
            if (compare(array[middle], value) < 0) {
                begin = middle + 1;
                n -= half + 1;
            } else {
                n = half;
            }
        }
        return begin;
    }
    tsu.lowerBound = lowerBound;

    /**
    * Perform a binary search on a sorted array.
    *
    * @param array The array of sorted items to search.
    * @param value The value to located in the array.
    * @param compare The value comparison function.
    * @returns The index of the found item, or -1.
    */
    function binarySearch(array, value, compare) {
        var index = lowerBound(array, value, compare);
        if (index === array.length) {
            return -1;
        }
        var item = array[index];
        if (compare(item, value) !== 0) {
            return -1;
        }
        return index;
    }
    tsu.binarySearch = binarySearch;

    /**
    * Perform a binary find on a sorted array.
    *
    * @param array The array of sorted items to search.
    * @param value The value to located in the array.
    * @param compare The value comparison function.
    * @returns The found item in the array, or undefined.
    */
    function binaryFind(array, value, compare) {
        var index = lowerBound(array, value, compare);
        if (index === array.length) {
            return undefined;
        }
        var item = array[index];
        if (compare(item, value) !== 0) {
            return undefined;
        }
        return item;
    }
    tsu.binaryFind = binaryFind;

})(tsu || (tsu = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
/// <reference path="iterator.ts"/>
var tsu;
(function (tsu) {
    /**
    * A base class for implementing array-based data structures.
    *
    * @class
    */
    var ArrayBase = (function () {
        function ArrayBase() {
            /*
            * The internal data array.
            *
            * @protected
            */
            this._array = [];
        }
        /**
        * Returns the number of items in the array.
        */
        ArrayBase.prototype.size = function () {
            return this._array.length;
        };

        /**
        * Returns true if the array is empty.
        */
        ArrayBase.prototype.empty = function () {
            return this._array.length === 0;
        };

        /**
        * Returns the item at the given array index.
        *
        * @param index The integer index of the desired item.
        */
        ArrayBase.prototype.itemAt = function (index) {
            return this._array[index];
        };

        /**
        * Removes and returns the item at the given index.
        *
        * @param index The integer index of the desired item.
        */
        ArrayBase.prototype.takeAt = function (index) {
            return this._array.splice(index, 1)[0];
        };

        /**
        * Clear the internal contents of array.
        */
        ArrayBase.prototype.clear = function () {
            this._array = [];
        };

        /**
        * Swap this array's contents with another array.
        *
        * @param other The array base to use for the swap.
        */
        ArrayBase.prototype.swap = function (other) {
            var array = this._array;
            this._array = other._array;
            other._array = array;
        };

        /**
        * Returns an iterator over the array of items.
        */
        ArrayBase.prototype.__iter__ = function () {
            return tsu.iter(this._array);
        };

        /**
        * Returns a reverse iterator over the array of items.
        */
        ArrayBase.prototype.__reversed__ = function () {
            return tsu.reversed(this._array);
        };
        return ArrayBase;
    })();
    tsu.ArrayBase = ArrayBase;
})(tsu || (tsu = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="algorithm.ts"/>
/// <reference path="array_base.ts"/>
/// <reference path="iterator.ts"/>
/// <reference path="utility.ts"/>
var tsu;
(function (tsu) {
    /**
    * A mapping container build on a sorted array.
    *
    * @class
    */
    var AssociativeArray = (function (_super) {
        __extends(AssociativeArray, _super);
        /**
        * Construct a new AssociativeArray.
        *
        * @param compare The key comparison function.
        */
        function AssociativeArray(compare) {
            _super.call(this);
            this._compare = compare;
            this._wrapped = wrapCompare(compare);
        }
        /**
        * Returns the key comparison function used by this array.
        */
        AssociativeArray.prototype.comparitor = function () {
            return this._compare;
        };

        /**
        * Return the array index of the given key, or -1.
        *
        * @param key The key to locate in the array.
        */
        AssociativeArray.prototype.indexOf = function (key) {
            return tsu.binarySearch(this._array, key, this._wrapped);
        };

        /**
        * Returns true if the key is in the array, false otherwise.
        *
        * @param key The key to locate in the array.
        */
        AssociativeArray.prototype.contains = function (key) {
            return tsu.binarySearch(this._array, key, this._wrapped) >= 0;
        };

        /**
        * Returns the pair associated with the given key, or undefined.
        *
        * @param key The key to locate in the array.
        */
        AssociativeArray.prototype.find = function (key) {
            return tsu.binaryFind(this._array, key, this._wrapped);
        };

        /**
        * Returns the pair associated with the key if it exists.
        *
        * If the key does not exist, a new pair will be created and
        * inserted using the value created by the given factory.
        *
        * @param key The key to locate in the array.
        * @param factory The function which creates the default value.
        */
        AssociativeArray.prototype.setDefault = function (key, factory) {
            var array = this._array;
            var index = tsu.lowerBound(array, key, this._wrapped);
            if (index === array.length) {
                var pair = new tsu.Pair(key, factory());
                array.push(pair);
                return pair;
            }
            var currPair = array[index];
            if (this._compare(currPair.first, key) !== 0) {
                var pair = new tsu.Pair(key, factory());
                array.splice(index, 0, pair);
                return pair;
            }
            return currPair;
        };

        /**
        * Insert the pair into the array and return the pair.
        *
        * This will overwrite any existing entry in the array.
        *
        * @param key The key portion of the pair.
        * @param value The value portion of the pair.
        */
        AssociativeArray.prototype.insert = function (key, value) {
            var array = this._array;
            var index = tsu.lowerBound(array, key, this._wrapped);
            if (index === array.length) {
                var pair = new tsu.Pair(key, value);
                array.push(pair);
                return pair;
            }
            var currPair = array[index];
            if (this._compare(currPair.first, key) !== 0) {
                var pair = new tsu.Pair(key, value);
                array.splice(index, 0, pair);
                return pair;
            }
            currPair.second = value;
            return currPair;
        };

        AssociativeArray.prototype.update = function (object) {
            var _this = this;
            if (object instanceof AssociativeArray) {
                var obj = object;
                this._array = merge(this._array, obj._array, this._compare);
            } else {
                tsu.forEach(object, function (pair) {
                    _this.insert(pair.first, pair.second);
                });
            }
        };

        /**
        * Removes and returns the pair for the given key, or undefined.
        *
        * @param key The key to remove from the map.
        */
        AssociativeArray.prototype.erase = function (key) {
            var array = this._array;
            var index = tsu.binarySearch(array, key, this._wrapped);
            if (index < 0) {
                return undefined;
            }
            return array.splice(index, 1)[0];
        };

        /**
        * Create a copy of this associative array.
        */
        AssociativeArray.prototype.copy = function () {
            var theCopy = new AssociativeArray(this._compare);
            var copyArray = theCopy._array;
            var thisArray = this._array;
            for (var i = 0, n = thisArray.length; i < n; ++i) {
                copyArray.push(thisArray[i].copy());
            }
            return theCopy;
        };
        return AssociativeArray;
    })(tsu.ArrayBase);
    tsu.AssociativeArray = AssociativeArray;

    /**
    * An internal which wraps a comparison key function.
    */
    function wrapCompare(cmp) {
        return function (pair, value) {
            return cmp(pair.first, value);
        };
    }

    /**
    * An internal function which merges two ordered pair arrays.
    */
    function merge(first, second, compare) {
        var i = 0, j = 0;
        var len1 = first.length;
        var len2 = second.length;
        var merged = [];
        while (i < len1 && j < len2) {
            var a = first[i];
            var b = second[j];
            var v = compare(a.first, b.first);
            if (v < 0) {
                merged.push(a.copy());
                ++i;
            } else if (v > 0) {
                merged.push(b.copy());
                ++j;
            } else {
                merged.push(b.copy());
                ++i;
                ++j;
            }
        }
        while (i < len1) {
            merged.push(first[i].copy());
            ++i;
        }
        while (j < len2) {
            merged.push(second[j].copy());
            ++j;
        }
        return merged;
    }
})(tsu || (tsu = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
/// <reference path="algorithm.ts"/>
/// <reference path="array_base.ts"/>
/// <reference path="associative_array.ts"/>
/// <reference path="iterator.ts"/>
/// <reference path="unique_array.ts"/>
/// <reference path="utility.ts"/>

/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
// <reference path="expression.ts">
// <reference path="strength.ts">
/**
 * Kiwi is an efficient implementation of the Cassowary constraint solving
 * algorithm, based on the seminal Cassowary paper.
 * It is *not* a refactoring or port of the original C++ solver, but
 * has been designed from the ground up to be lightweight and fast.
 *
 * **Example**
 * ```javascript
 * var kiwi = require('kiwi');
 *
 * // Create a solver
 * var solver = new kiwi.Solver();
 *
 * // Create and add some editable variables
 * var left = new kiwi.Variable();
 * var width = new kiwi.Variable();
 * solver.addEditVariable(left, kiwi.Strength.strong);
 * solver.addEditVariable(width, kiwi.Strength.strong);
 *
 * // Create a variable calculated through a constraint
 * var centerX = new kiwi.Variable();
 * var expr = new kiwi.Expression([-1, centerX], left, [0.5, width]);
 * solver.addConstraint(new kiwi.Constraint(expr, kiwi.Operator.Eq, kiwi.Strength.required));
 *
 * // Suggest some values to the solver
 * solver.suggestValue(left, 0);
 * solver.suggestValue(width, 500);
 *
 * // Lets solve the problem!
 * solver.updateVariables();
 * assert(centerX.value(), 250);
 * ```
 *
 * ##API Documentation
 * @module kiwi
 */
var kiwi;
(function (kiwi) {
    /**
     * An enum defining the linear constraint operators.
     *
     * |Value|Operator|Description|
     * |----|-----|-----|
     * |`Le`|<=|Less than equal|
     * |`Ge`|>=|Greater than equal|
     * |`Eq`|==|Equal|
     *
     * @enum {Number}
     */
    (function (Operator) {
        Operator[Operator["Le"] = 0] = "Le";
        Operator[Operator["Ge"] = 1] = "Ge";
        Operator[Operator["Eq"] = 2] = "Eq"; // ==
    })(kiwi.Operator || (kiwi.Operator = {}));
    var Operator = kiwi.Operator;
    /**
     * A linear constraint equation.
     *
     * A constraint equation is composed of an expression, an operator,
     * and a strength. The RHS of the equation is implicitly zero.
     *
     * @class
     * @param {Expression} expression The constraint expression (LHS).
     * @param {Operator} operator The equation operator.
     * @param {Expression} [rhs] Right hand side of the expression.
     * @param {Number} [strength=Strength.required] The strength of the constraint.
     */
    var Constraint = (function () {
        function Constraint(expression, operator, rhs, strength) {
            if (strength === void 0) { strength = kiwi.Strength.required; }
            this._id = CnId++;
            this._operator = operator;
            this._strength = kiwi.Strength.clip(strength);
            if ((rhs === undefined) && (expression instanceof kiwi.Expression)) {
                this._expression = expression;
            }
            else {
                this._expression = expression.minus(rhs);
            }
        }
        /**
          * A static constraint comparison function.
          * @private
          */
        Constraint.Compare = function (a, b) {
            return a.id() - b.id();
        };
        /**
         * Returns the unique id number of the constraint.
         * @private
         */
        Constraint.prototype.id = function () {
            return this._id;
        };
        /**
         * Returns the expression of the constraint.
         *
         * @return {Expression} expression
         */
        Constraint.prototype.expression = function () {
            return this._expression;
        };
        /**
         * Returns the relational operator of the constraint.
         *
         * @return {Operator} linear constraint operator
         */
        Constraint.prototype.op = function () {
            return this._operator;
        };
        /**
         * Returns the strength of the constraint.
         *
         * @return {Number} strength
         */
        Constraint.prototype.strength = function () {
            return this._strength;
        };
        return Constraint;
    })();
    kiwi.Constraint = Constraint;
    /**
     * The internal constraint id counter.
     * @private
     */
    var CnId = 0;
})(kiwi || (kiwi = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
/// <reference path="../thirdparty/tsu.d.ts"/>
var kiwi;
(function (kiwi) {
    function createMap(compare) {
        return new tsu.AssociativeArray(compare);
    }
    kiwi.createMap = createMap;
})(kiwi || (kiwi = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var kiwi;
(function (kiwi) {
    /**
     * The primary user constraint variable.
     *
     * @class
     * @param {String} [name=""] The name to associated with the variable.
     */
    var Variable = (function () {
        function Variable(name) {
            if (name === void 0) { name = ""; }
            this._value = 0.0;
            this._context = null;
            this._id = VarId++;
            this._name = name;
        }
        /**
         * A static variable comparison function.
         * @private
         */
        Variable.Compare = function (a, b) {
            return a.id() - b.id();
        };
        /**
         * Returns the unique id number of the variable.
         * @private
         */
        Variable.prototype.id = function () {
            return this._id;
        };
        /**
         * Returns the name of the variable.
         *
         * @return {String} name of the variable
         */
        Variable.prototype.name = function () {
            return this._name;
        };
        /**
         * Set the name of the variable.
         *
         * @param {String} name Name of the variable
         */
        Variable.prototype.setName = function (name) {
            this._name = name;
        };
        /**
         * Returns the user context object of the variable.
         * @private
         */
        Variable.prototype.context = function () {
            return this._context;
        };
        /**
         * Set the user context object of the variable.
         * @private
         */
        Variable.prototype.setContext = function (context) {
            this._context = context;
        };
        /**
         * Returns the value of the variable.
         *
         * @return {Number} Calculated value
         */
        Variable.prototype.value = function () {
            return this._value;
        };
        /**
         * Set the value of the variable.
         * @private
         */
        Variable.prototype.setValue = function (value) {
            this._value = value;
        };
        /**
         * Creates a new Expression by adding a number, variable or expression
         * to the variable.
         *
         * @param {Number|Variable|Expression} value Value to add.
         * @return {Expression} expression
         */
        Variable.prototype.plus = function (value) {
            return new kiwi.Expression(this, value);
        };
        /**
         * Creates a new Expression by substracting a number, variable or expression
         * from the variable.
         *
         * @param {Number|Variable|Expression} value Value to substract.
         * @return {Expression} expression
         */
        Variable.prototype.minus = function (value) {
            return new kiwi.Expression(this, typeof value === 'number' ? -value : [-1, value]);
        };
        /**
         * Creates a new Expression by multiplying with a fixed number.
         *
         * @param {Number} coefficient Coefficient to multiply with.
         * @return {Expression} expression
         */
        Variable.prototype.multiply = function (coefficient) {
            return new kiwi.Expression([coefficient, this]);
        };
        /**
         * Creates a new Expression by dividing with a fixed number.
         *
         * @param {Number} coefficient Coefficient to divide by.
         * @return {Expression} expression
         */
        Variable.prototype.divide = function (coefficient) {
            return new kiwi.Expression([1 / coefficient, this]);
        };
        /**
         * Returns the JSON representation of the variable.
         * @private
         */
        Variable.prototype.toJSON = function () {
            return {
                name: this._name,
                value: this._value
            };
        };
        return Variable;
    })();
    kiwi.Variable = Variable;
    /**
     * The internal variable id counter.
     * @private
     */
    var VarId = 0;
})(kiwi || (kiwi = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
/// <reference path="../thirdparty/tsu.d.ts"/>
/// <reference path="maptype.ts"/>
/// <reference path="variable.ts"/>
var kiwi;
(function (kiwi) {
    /**
     * An expression of variable terms and a constant.
     *
     * The constructor accepts an arbitrary number of parameters,
     * each of which must be one of the following types:
     *  - number
     *  - Variable
     *  - Expression
     *  - 2-tuple of [number, Variable|Expression]
     *
     * The parameters are summed. The tuples are multiplied.
     *
     * @class
     * @param {...(number|Variable|Expression|Array)} args
     */
    var Expression = (function () {
        function Expression() {
            var parsed = parseArgs(arguments);
            this._terms = parsed.terms;
            this._constant = parsed.constant;
        }
        /**
         * Returns the mapping of terms in the expression.
         *
         * This *must* be treated as const.
         * @private
         */
        Expression.prototype.terms = function () {
            return this._terms;
        };
        /**
         * Returns the constant of the expression.
         * @private
         */
        Expression.prototype.constant = function () {
            return this._constant;
        };
        /**
         * Returns the computed value of the expression.
         *
         * @private
         * @return {Number} computed value of the expression
         */
        Expression.prototype.value = function () {
            var result = this._constant;
            for (var i = 0, n = this._terms.size(); i < n; i++) {
                var pair = this._terms.itemAt(i);
                result += pair.first.value() * pair.second;
            }
            return result;
        };
        /**
         * Creates a new Expression by adding a number, variable or expression
         * to the expression.
         *
         * @param {Number|Variable|Expression} value Value to add.
         * @return {Expression} expression
         */
        Expression.prototype.plus = function (value) {
            return new Expression(this, value);
        };
        /**
         * Creates a new Expression by substracting a number, variable or expression
         * from the expression.
         *
         * @param {Number|Variable|Expression} value Value to substract.
         * @return {Expression} expression
         */
        Expression.prototype.minus = function (value) {
            return new Expression(this, typeof value === 'number' ? -value : [-1, value]);
        };
        /**
         * Creates a new Expression by multiplying with a fixed number.
         *
         * @param {Number} coefficient Coefficient to multiply with.
         * @return {Expression} expression
         */
        Expression.prototype.multiply = function (coefficient) {
            return new Expression([coefficient, this]);
        };
        /**
         * Creates a new Expression by dividing with a fixed number.
         *
         * @param {Number} coefficient Coefficient to divide by.
         * @return {Expression} expression
         */
        Expression.prototype.divide = function (coefficient) {
            return new Expression([1 / coefficient, this]);
        };
        return Expression;
    })();
    kiwi.Expression = Expression;
    /**
     * An internal argument parsing function.
     * @private
     */
    function parseArgs(args) {
        var constant = 0.0;
        var factory = function () { return 0.0; };
        var terms = kiwi.createMap(kiwi.Variable.Compare);
        for (var i = 0, n = args.length; i < n; ++i) {
            var item = args[i];
            if (typeof item === "number") {
                constant += item;
            }
            else if (item instanceof kiwi.Variable) {
                terms.setDefault(item, factory).second += 1.0;
            }
            else if (item instanceof Expression) {
                constant += item.constant();
                var terms2 = item.terms();
                for (var j = 0, k = terms2.size(); j < k; j++) {
                    var termPair = terms2.itemAt(j);
                    terms.setDefault(termPair.first, factory).second += termPair.second;
                }
            }
            else if (item instanceof Array) {
                if (item.length !== 2) {
                    throw new Error("array must have length 2");
                }
                var value = item[0];
                var value2 = item[1];
                if (typeof value !== "number") {
                    throw new Error("array item 0 must be a number");
                }
                if (value2 instanceof kiwi.Variable) {
                    terms.setDefault(value2, factory).second += value;
                }
                else if (value2 instanceof Expression) {
                    constant += (value2.constant() * value);
                    var terms2 = value2.terms();
                    for (var j = 0, k = terms2.size(); j < k; j++) {
                        var termPair = terms2.itemAt(j);
                        terms.setDefault(termPair.first, factory).second += (termPair.second * value);
                    }
                }
                else {
                    throw new Error("array item 1 must be a variable or expression");
                }
            }
            else {
                throw new Error("invalid Expression argument: " + item);
            }
        }
        return { terms: terms, constant: constant };
    }
})(kiwi || (kiwi = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var kiwi;
(function (kiwi) {
    /**
     * @class Strength
     */
    var Strength;
    (function (Strength) {
        /**
         * Create a new symbolic strength.
         *
         * @param {Number} a strong
         * @param {Number} b medium
         * @param {Number} c weak
         * @param {Number} [w] weight
         * @return {Number} strength
         */
        function create(a, b, c, w) {
            if (w === void 0) { w = 1.0; }
            var result = 0.0;
            result += Math.max(0.0, Math.min(1000.0, a * w)) * 1000000.0;
            result += Math.max(0.0, Math.min(1000.0, b * w)) * 1000.0;
            result += Math.max(0.0, Math.min(1000.0, c * w));
            return result;
        }
        Strength.create = create;
        /**
         * The 'required' symbolic strength.
         */
        Strength.required = create(1000.0, 1000.0, 1000.0);
        /**
         * The 'strong' symbolic strength.
         */
        Strength.strong = create(1.0, 0.0, 0.0);
        /**
         * The 'medium' symbolic strength.
         */
        Strength.medium = create(0.0, 1.0, 0.0);
        /**
         * The 'weak' symbolic strength.
         */
        Strength.weak = create(0.0, 0.0, 1.0);
        /**
         * Clip a symbolic strength to the allowed min and max.
         * @private
         */
        function clip(value) {
            return Math.max(0.0, Math.min(Strength.required, value));
        }
        Strength.clip = clip;
    })(Strength = kiwi.Strength || (kiwi.Strength = {}));
})(kiwi || (kiwi = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
/// <reference path="../thirdparty/tsu.d.ts"/>
/// <reference path="constraint.ts"/>
/// <reference path="expression.ts"/>
/// <reference path="maptype.ts"/>
/// <reference path="strength.ts"/>
/// <reference path="variable.ts"/>
var kiwi;
(function (kiwi) {
    /**
     * The constraint solver class.
     *
     * @class
     */
    var Solver = (function () {
        /**
         * Construct a new Solver.
         */
        function Solver() {
            this._cnMap = createCnMap();
            this._rowMap = createRowMap();
            this._varMap = createVarMap();
            this._editMap = createEditMap();
            this._infeasibleRows = [];
            this._objective = new Row();
            this._artificial = null;
            this._idTick = 0;
        }
        /**
         * Creates and add a constraint to the solver.
         *
         * @param {Expression|Variable} lhs Left hand side of the expression
         * @param {Operator} operator Operator
         * @param {Expression|Variable|Number} rhs Right hand side of the expression
         * @param {Number} [strength=Strength.required] Strength
         */
        Solver.prototype.createConstraint = function (lhs, operator, rhs, strength) {
            if (strength === void 0) { strength = kiwi.Strength.required; }
            var cn = new kiwi.Constraint(lhs, operator, rhs, strength);
            this.addConstraint(cn);
            return cn;
        };
        /**
         * Add a constraint to the solver.
         *
         * @param {Constraint} constraint Constraint to add to the solver
         */
        Solver.prototype.addConstraint = function (constraint) {
            var cnPair = this._cnMap.find(constraint);
            if (cnPair !== undefined) {
                throw new Error("duplicate constraint");
            }
            // Creating a row causes symbols to be reserved for the variables
            // in the constraint. If this method exits with an exception,
            // then its possible those variables will linger in the var map.
            // Since its likely that those variables will be used in other
            // constraints and since exceptional conditions are uncommon,
            // i'm not too worried about aggressive cleanup of the var map.
            var data = this._createRow(constraint);
            var row = data.row;
            var tag = data.tag;
            var subject = this._chooseSubject(row, tag);
            // If chooseSubject couldnt find a valid entering symbol, one
            // last option is available if the entire row is composed of
            // dummy variables. If the constant of the row is zero, then
            // this represents redundant constraints and the new dummy
            // marker can enter the basis. If the constant is non-zero,
            // then it represents an unsatisfiable constraint.
            if (subject.type() === 0 /* Invalid */ && row.allDummies()) {
                if (!nearZero(row.constant())) {
                    throw new Error("unsatisfiable constraint");
                }
                else {
                    subject = tag.marker;
                }
            }
            // If an entering symbol still isn't found, then the row must
            // be added using an artificial variable. If that fails, then
            // the row represents an unsatisfiable constraint.
            if (subject.type() === 0 /* Invalid */) {
                if (!this._addWithArtificialVariable(row)) {
                    throw new Error("unsatisfiable constraint");
                }
            }
            else {
                row.solveFor(subject);
                this._substitute(subject, row);
                this._rowMap.insert(subject, row);
            }
            this._cnMap.insert(constraint, tag);
            // Optimizing after each constraint is added performs less
            // aggregate work due to a smaller average system size. It
            // also ensures the solver remains in a consistent state.
            this._optimize(this._objective);
        };
        /**
         * Remove a constraint from the solver.
         *
         * @param {Constraint} constraint Constraint to remove from the solver
         */
        Solver.prototype.removeConstraint = function (constraint) {
            var cnPair = this._cnMap.erase(constraint);
            if (cnPair === undefined) {
                throw new Error("unknown constraint");
            }
            // Remove the error effects from the objective function
            // *before* pivoting, or substitutions into the objective
            // will lead to incorrect solver results.
            this._removeConstraintEffects(constraint, cnPair.second);
            // If the marker is basic, simply drop the row. Otherwise,
            // pivot the marker into the basis and then drop the row.
            var marker = cnPair.second.marker;
            var rowPair = this._rowMap.erase(marker);
            if (rowPair === undefined) {
                var leaving = this._getMarkerLeavingSymbol(marker);
                if (leaving.type() === 0 /* Invalid */) {
                    throw new Error("failed to find leaving row");
                }
                rowPair = this._rowMap.erase(leaving);
                rowPair.second.solveForEx(leaving, marker);
                this._substitute(marker, rowPair.second);
            }
            // Optimizing after each constraint is removed ensures that the
            // solver remains consistent. It makes the solver api easier to
            // use at a small tradeoff for speed.
            this._optimize(this._objective);
        };
        /**
         * Test whether the solver contains the constraint.
         *
         * @param {Constraint} constraint Constraint to test for
         * @return {Bool} true or false
         */
        Solver.prototype.hasConstraint = function (constraint) {
            return this._cnMap.contains(constraint);
        };
        /**
         * Add an edit variable to the solver.
         *
         * @param {Variable} variable Edit variable to add to the solver
         * @param {Number} strength Strength, should be less than `Strength.required`
         */
        Solver.prototype.addEditVariable = function (variable, strength) {
            var editPair = this._editMap.find(variable);
            if (editPair !== undefined) {
                throw new Error("duplicate edit variable");
            }
            strength = kiwi.Strength.clip(strength);
            if (strength === kiwi.Strength.required) {
                throw new Error("bad required strength");
            }
            var expr = new kiwi.Expression(variable);
            var cn = new kiwi.Constraint(expr, 2 /* Eq */, undefined, strength);
            this.addConstraint(cn);
            var tag = this._cnMap.find(cn).second;
            var info = { tag: tag, constraint: cn, constant: 0.0 };
            this._editMap.insert(variable, info);
        };
        /**
         * Remove an edit variable from the solver.
         *
         * @param {Variable} variable Edit variable to remove from the solver
         */
        Solver.prototype.removeEditVariable = function (variable) {
            var editPair = this._editMap.erase(variable);
            if (editPair === undefined) {
                throw new Error("unknown edit variable");
            }
            this.removeConstraint(editPair.second.constraint);
        };
        /**
         * Test whether the solver contains the edit variable.
         *
         * @param {Variable} variable Edit variable to test for
         * @return {Bool} true or false
         */
        Solver.prototype.hasEditVariable = function (variable) {
            return this._editMap.contains(variable);
        };
        /**
         * Suggest the value of an edit variable.
         *
         * @param {Variable} variable Edit variable to suggest a value for
         * @param {Number} value Suggested value
         */
        Solver.prototype.suggestValue = function (variable, value) {
            var editPair = this._editMap.find(variable);
            if (editPair === undefined) {
                throw new Error("unknown edit variable");
            }
            var rows = this._rowMap;
            var info = editPair.second;
            var delta = value - info.constant;
            info.constant = value;
            // Check first if the positive error variable is basic.
            var marker = info.tag.marker;
            var rowPair = rows.find(marker);
            if (rowPair !== undefined) {
                if (rowPair.second.add(-delta) < 0.0) {
                    this._infeasibleRows.push(marker);
                }
                this._dualOptimize();
                return;
            }
            // Check next if the negative error variable is basic.
            var other = info.tag.other;
            var rowPair = rows.find(other);
            if (rowPair !== undefined) {
                if (rowPair.second.add(delta) < 0.0) {
                    this._infeasibleRows.push(other);
                }
                this._dualOptimize();
                return;
            }
            for (var i = 0, n = rows.size(); i < n; ++i) {
                var rowPair = rows.itemAt(i);
                var row = rowPair.second;
                var coeff = row.coefficientFor(marker);
                if (coeff !== 0.0 && row.add(delta * coeff) < 0.0 && rowPair.first.type() !== 1 /* External */) {
                    this._infeasibleRows.push(rowPair.first);
                }
            }
            this._dualOptimize();
        };
        /**
         * Update the values of the variables.
         */
        Solver.prototype.updateVariables = function () {
            var vars = this._varMap;
            var rows = this._rowMap;
            for (var i = 0, n = vars.size(); i < n; ++i) {
                var pair = vars.itemAt(i);
                var rowPair = rows.find(pair.second);
                if (rowPair !== undefined) {
                    pair.first.setValue(rowPair.second.constant());
                }
                else {
                    pair.first.setValue(0.0);
                }
            }
        };
        /**
         * Get the symbol for the given variable.
         *
         * If a symbol does not exist for the variable, one will be created.
         * @private
         */
        Solver.prototype._getVarSymbol = function (variable) {
            var _this = this;
            var factory = function () { return _this._makeSymbol(1 /* External */); };
            return this._varMap.setDefault(variable, factory).second;
        };
        /**
         * Create a new Row object for the given constraint.
         *
         * The terms in the constraint will be converted to cells in the row.
         * Any term in the constraint with a coefficient of zero is ignored.
         * This method uses the `_getVarSymbol` method to get the symbol for
         * the variables added to the row. If the symbol for a given cell
         * variable is basic, the cell variable will be substituted with the
         * basic row.
         *
         * The necessary slack and error variables will be added to the row.
         * If the constant for the row is negative, the sign for the row
         * will be inverted so the constant becomes positive.
         *
         * Returns the created Row and the tag for tracking the constraint.
         * @private
         */
        Solver.prototype._createRow = function (constraint) {
            var expr = constraint.expression();
            var row = new Row(expr.constant());
            // Substitute the current basic variables into the row.
            var terms = expr.terms();
            for (var i = 0, n = terms.size(); i < n; ++i) {
                var termPair = terms.itemAt(i);
                if (!nearZero(termPair.second)) {
                    var symbol = this._getVarSymbol(termPair.first);
                    var basicPair = this._rowMap.find(symbol);
                    if (basicPair !== undefined) {
                        row.insertRow(basicPair.second, termPair.second);
                    }
                    else {
                        row.insertSymbol(symbol, termPair.second);
                    }
                }
            }
            // Add the necessary slack, error, and dummy variables.
            var objective = this._objective;
            var strength = constraint.strength();
            var tag = { marker: INVALID_SYMBOL, other: INVALID_SYMBOL };
            switch (constraint.op()) {
                case 0 /* Le */:
                case 1 /* Ge */:
                    {
                        var coeff = constraint.op() === 0 /* Le */ ? 1.0 : -1.0;
                        var slack = this._makeSymbol(2 /* Slack */);
                        tag.marker = slack;
                        row.insertSymbol(slack, coeff);
                        if (strength < kiwi.Strength.required) {
                            var error = this._makeSymbol(3 /* Error */);
                            tag.other = error;
                            row.insertSymbol(error, -coeff);
                            objective.insertSymbol(error, strength);
                        }
                        break;
                    }
                case 2 /* Eq */:
                    {
                        if (strength < kiwi.Strength.required) {
                            var errplus = this._makeSymbol(3 /* Error */);
                            var errminus = this._makeSymbol(3 /* Error */);
                            tag.marker = errplus;
                            tag.other = errminus;
                            row.insertSymbol(errplus, -1.0); // v = eplus - eminus
                            row.insertSymbol(errminus, 1.0); // v - eplus + eminus = 0
                            objective.insertSymbol(errplus, strength);
                            objective.insertSymbol(errminus, strength);
                        }
                        else {
                            var dummy = this._makeSymbol(4 /* Dummy */);
                            tag.marker = dummy;
                            row.insertSymbol(dummy);
                        }
                        break;
                    }
            }
            // Ensure the row has a positive constant.
            if (row.constant() < 0.0) {
                row.reverseSign();
            }
            return { row: row, tag: tag };
        };
        /**
         * Choose the subject for solving for the row.
         *
         * This method will choose the best subject for using as the solve
         * target for the row. An invalid symbol will be returned if there
         * is no valid target.
         *
         * The symbols are chosen according to the following precedence:
         *
         * 1) The first symbol representing an external variable.
         * 2) A negative slack or error tag variable.
         *
         * If a subject cannot be found, an invalid symbol will be returned.
         *
         * @private
         */
        Solver.prototype._chooseSubject = function (row, tag) {
            var cells = row.cells();
            for (var i = 0, n = cells.size(); i < n; ++i) {
                var pair = cells.itemAt(i);
                if (pair.first.type() === 1 /* External */) {
                    return pair.first;
                }
            }
            var type = tag.marker.type();
            if (type === 2 /* Slack */ || type === 3 /* Error */) {
                if (row.coefficientFor(tag.marker) < 0.0) {
                    return tag.marker;
                }
            }
            type = tag.other.type();
            if (type === 2 /* Slack */ || type === 3 /* Error */) {
                if (row.coefficientFor(tag.other) < 0.0) {
                    return tag.other;
                }
            }
            return INVALID_SYMBOL;
        };
        /**
         * Add the row to the tableau using an artificial variable.
         *
         * This will return false if the constraint cannot be satisfied.
         *
         * @private
         */
        Solver.prototype._addWithArtificialVariable = function (row) {
            // Create and add the artificial variable to the tableau.
            var art = this._makeSymbol(2 /* Slack */);
            this._rowMap.insert(art, row.copy());
            this._artificial = row.copy();
            // Optimize the artificial objective. This is successful
            // only if the artificial objective is optimized to zero.
            this._optimize(this._artificial);
            var success = nearZero(this._artificial.constant());
            this._artificial = null;
            // If the artificial variable is basic, pivot the row so that
            // it becomes non-basic. If the row is constant, exit early.
            var pair = this._rowMap.erase(art);
            if (pair !== undefined) {
                var basicRow = pair.second;
                if (basicRow.isConstant()) {
                    return success;
                }
                var entering = this._anyPivotableSymbol(basicRow);
                if (entering.type() === 0 /* Invalid */) {
                    return false; // unsatisfiable (will this ever happen?)
                }
                basicRow.solveForEx(art, entering);
                this._substitute(entering, basicRow);
                this._rowMap.insert(entering, basicRow);
            }
            // Remove the artificial variable from the tableau.
            var rows = this._rowMap;
            for (var i = 0, n = rows.size(); i < n; ++i) {
                rows.itemAt(i).second.removeSymbol(art);
            }
            this._objective.removeSymbol(art);
            return success;
        };
        /**
         * Substitute the parametric symbol with the given row.
         *
         * This method will substitute all instances of the parametric symbol
         * in the tableau and the objective function with the given row.
         *
         * @private
         */
        Solver.prototype._substitute = function (symbol, row) {
            var rows = this._rowMap;
            for (var i = 0, n = rows.size(); i < n; ++i) {
                var pair = rows.itemAt(i);
                pair.second.substitute(symbol, row);
                if (pair.second.constant() < 0.0 && pair.first.type() !== 1 /* External */) {
                    this._infeasibleRows.push(pair.first);
                }
            }
            this._objective.substitute(symbol, row);
            if (this._artificial) {
                this._artificial.substitute(symbol, row);
            }
        };
        /**
         * Optimize the system for the given objective function.
         *
         * This method performs iterations of Phase 2 of the simplex method
         * until the objective function reaches a minimum.
         *
         * @private
         */
        Solver.prototype._optimize = function (objective) {
            while (true) {
                var entering = this._getEnteringSymbol(objective);
                if (entering.type() === 0 /* Invalid */) {
                    return;
                }
                var leaving = this._getLeavingSymbol(entering);
                if (leaving.type() === 0 /* Invalid */) {
                    throw new Error("the objective is unbounded");
                }
                // pivot the entering symbol into the basis
                var row = this._rowMap.erase(leaving).second;
                row.solveForEx(leaving, entering);
                this._substitute(entering, row);
                this._rowMap.insert(entering, row);
            }
        };
        /**
         * Optimize the system using the dual of the simplex method.
         *
         * The current state of the system should be such that the objective
         * function is optimal, but not feasible. This method will perform
         * an iteration of the dual simplex method to make the solution both
         * optimal and feasible.
         *
         * @private
         */
        Solver.prototype._dualOptimize = function () {
            var rows = this._rowMap;
            var infeasible = this._infeasibleRows;
            while (infeasible.length !== 0) {
                var leaving = infeasible.pop();
                var pair = rows.find(leaving);
                if (pair !== undefined && pair.second.constant() < 0.0) {
                    var entering = this._getDualEnteringSymbol(pair.second);
                    if (entering.type() === 0 /* Invalid */) {
                        throw new Error("dual optimize failed");
                    }
                    // pivot the entering symbol into the basis
                    var row = pair.second;
                    rows.erase(leaving);
                    row.solveForEx(leaving, entering);
                    this._substitute(entering, row);
                    rows.insert(entering, row);
                }
            }
        };
        /**
         * Compute the entering variable for a pivot operation.
         *
         * This method will return first symbol in the objective function which
         * is non-dummy and has a coefficient less than zero. If no symbol meets
         * the criteria, it means the objective function is at a minimum, and an
         * invalid symbol is returned.
         *
         * @private
         */
        Solver.prototype._getEnteringSymbol = function (objective) {
            var cells = objective.cells();
            for (var i = 0, n = cells.size(); i < n; ++i) {
                var pair = cells.itemAt(i);
                var symbol = pair.first;
                if (pair.second < 0.0 && symbol.type() !== 4 /* Dummy */) {
                    return symbol;
                }
            }
            return INVALID_SYMBOL;
        };
        /**
         * Compute the entering symbol for the dual optimize operation.
         *
         * This method will return the symbol in the row which has a positive
         * coefficient and yields the minimum ratio for its respective symbol
         * in the objective function. The provided row *must* be infeasible.
         * If no symbol is found which meats the criteria, an invalid symbol
         * is returned.
         *
         * @private
         */
        Solver.prototype._getDualEnteringSymbol = function (row) {
            var ratio = Number.MAX_VALUE;
            var entering = INVALID_SYMBOL;
            var cells = row.cells();
            for (var i = 0, n = cells.size(); i < n; ++i) {
                var pair = cells.itemAt(i);
                var symbol = pair.first;
                var c = pair.second;
                if (c > 0.0 && symbol.type() !== 4 /* Dummy */) {
                    var coeff = this._objective.coefficientFor(symbol);
                    var r = coeff / c;
                    if (r < ratio) {
                        ratio = r;
                        entering = symbol;
                    }
                }
            }
            return entering;
        };
        /**
         * Compute the symbol for pivot exit row.
         *
         * This method will return the symbol for the exit row in the row
         * map. If no appropriate exit symbol is found, an invalid symbol
         * will be returned. This indicates that the objective function is
         * unbounded.
         *
         * @private
         */
        Solver.prototype._getLeavingSymbol = function (entering) {
            var ratio = Number.MAX_VALUE;
            var found = INVALID_SYMBOL;
            var rows = this._rowMap;
            for (var i = 0, n = rows.size(); i < n; ++i) {
                var pair = rows.itemAt(i);
                var symbol = pair.first;
                if (symbol.type() !== 1 /* External */) {
                    var row = pair.second;
                    var temp = row.coefficientFor(entering);
                    if (temp < 0.0) {
                        var temp_ratio = -row.constant() / temp;
                        if (temp_ratio < ratio) {
                            ratio = temp_ratio;
                            found = symbol;
                        }
                    }
                }
            }
            return found;
        };
        /**
         * Compute the leaving symbol for a marker variable.
         *
         * This method will return a symbol corresponding to a basic row
         * which holds the given marker variable. The row will be chosen
         * according to the following precedence:
         *
         * 1) The row with a restricted basic varible and a negative coefficient
         *    for the marker with the smallest ratio of -constant / coefficient.
         *
         * 2) The row with a restricted basic variable and the smallest ratio
         *    of constant / coefficient.
         *
         * 3) The last unrestricted row which contains the marker.
         *
         * If the marker does not exist in any row, an invalid symbol will be
         * returned. This indicates an internal solver error since the marker
         * *should* exist somewhere in the tableau.
         *
         * @private
         */
        Solver.prototype._getMarkerLeavingSymbol = function (marker) {
            var dmax = Number.MAX_VALUE;
            var r1 = dmax;
            var r2 = dmax;
            var invalid = INVALID_SYMBOL;
            var first = invalid;
            var second = invalid;
            var third = invalid;
            var rows = this._rowMap;
            for (var i = 0, n = rows.size(); i < n; ++i) {
                var pair = rows.itemAt(i);
                var row = pair.second;
                var c = row.coefficientFor(marker);
                if (c === 0.0) {
                    continue;
                }
                var symbol = pair.first;
                if (symbol.type() === 1 /* External */) {
                    third = symbol;
                }
                else if (c < 0.0) {
                    var r = -row.constant() / c;
                    if (r < r1) {
                        r1 = r;
                        first = symbol;
                    }
                }
                else {
                    var r = row.constant() / c;
                    if (r < r2) {
                        r2 = r;
                        second = symbol;
                    }
                }
            }
            if (first !== invalid) {
                return first;
            }
            if (second !== invalid) {
                return second;
            }
            return third;
        };
        /**
         * Remove the effects of a constraint on the objective function.
         *
         * @private
         */
        Solver.prototype._removeConstraintEffects = function (cn, tag) {
            if (tag.marker.type() === 3 /* Error */) {
                this._removeMarkerEffects(tag.marker, cn.strength());
            }
            if (tag.other.type() === 3 /* Error */) {
                this._removeMarkerEffects(tag.other, cn.strength());
            }
        };
        /**
         * Remove the effects of an error marker on the objective function.
         *
         * @private
         */
        Solver.prototype._removeMarkerEffects = function (marker, strength) {
            var pair = this._rowMap.find(marker);
            if (pair !== undefined) {
                this._objective.insertRow(pair.second, -strength);
            }
            else {
                this._objective.insertSymbol(marker, -strength);
            }
        };
        /**
         * Get the first Slack or Error symbol in the row.
         *
         * If no such symbol is present, an invalid symbol will be returned.
         *
         * @private
         */
        Solver.prototype._anyPivotableSymbol = function (row) {
            var cells = row.cells();
            for (var i = 0, n = cells.size(); i < n; ++i) {
                var pair = cells.itemAt(i);
                var type = pair.first.type();
                if (type === 2 /* Slack */ || type === 3 /* Error */) {
                    return pair.first;
                }
            }
            return INVALID_SYMBOL;
        };
        /**
         * Returns a new Symbol of the given type.
         *
         * @private
         */
        Solver.prototype._makeSymbol = function (type) {
            return new Symbol(type, this._idTick++);
        };
        return Solver;
    })();
    kiwi.Solver = Solver;
    /**
     * Test whether a value is approximately zero.
     * @private
     */
    function nearZero(value) {
        var eps = 1.0e-8;
        return value < 0.0 ? -value < eps : value < eps;
    }
    /**
     * An internal function for creating a constraint map.
     * @private
     */
    function createCnMap() {
        return kiwi.createMap(kiwi.Constraint.Compare);
    }
    /**
     * An internal function for creating a row map.
     * @private
     */
    function createRowMap() {
        return kiwi.createMap(Symbol.Compare);
    }
    /**
     * An internal function for creating a variable map.
     * @private
     */
    function createVarMap() {
        return kiwi.createMap(kiwi.Variable.Compare);
    }
    /**
     * An internal function for creating an edit map.
     * @private
     */
    function createEditMap() {
        return kiwi.createMap(kiwi.Variable.Compare);
    }
    /**
     * An enum defining the available symbol types.
     * @private
     */
    var SymbolType;
    (function (SymbolType) {
        SymbolType[SymbolType["Invalid"] = 0] = "Invalid";
        SymbolType[SymbolType["External"] = 1] = "External";
        SymbolType[SymbolType["Slack"] = 2] = "Slack";
        SymbolType[SymbolType["Error"] = 3] = "Error";
        SymbolType[SymbolType["Dummy"] = 4] = "Dummy";
    })(SymbolType || (SymbolType = {}));
    /**
     * An internal class representing a symbol in the solver.
     * @private
     */
    var Symbol = (function () {
        /**
         * Construct a new Symbol
         *
         * @param [type] The type of the symbol.
         * @param [id] The unique id number of the symbol.
         */
        function Symbol(type, id) {
            this._id = id;
            this._type = type;
        }
        /**
         * The static Symbol comparison function.
         */
        Symbol.Compare = function (a, b) {
            return a.id() - b.id();
        };
        /**
         * Returns the unique id number of the symbol.
         */
        Symbol.prototype.id = function () {
            return this._id;
        };
        /**
         * Returns the type of the symbol.
         */
        Symbol.prototype.type = function () {
            return this._type;
        };
        return Symbol;
    })();
    /**
     * A static invalid symbol
     * @private
     */
    var INVALID_SYMBOL = new Symbol(0 /* Invalid */, -1);
    /**
     * An internal row class used by the solver.
     * @private
     */
    var Row = (function () {
        /**
         * Construct a new Row.
         */
        function Row(constant) {
            if (constant === void 0) { constant = 0.0; }
            this._cellMap = kiwi.createMap(Symbol.Compare);
            this._constant = constant;
        }
        /**
         * Returns the mapping of symbols to coefficients.
         */
        Row.prototype.cells = function () {
            return this._cellMap;
        };
        /**
         * Returns the constant for the row.
         */
        Row.prototype.constant = function () {
            return this._constant;
        };
        /**
         * Returns true if the row is a constant value.
         */
        Row.prototype.isConstant = function () {
            return this._cellMap.empty();
        };
        /**
         * Returns true if the Row has all dummy symbols.
         */
        Row.prototype.allDummies = function () {
            var cells = this._cellMap;
            for (var i = 0, n = cells.size(); i < n; ++i) {
                var pair = cells.itemAt(i);
                if (pair.first.type() !== 4 /* Dummy */) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Create a copy of the row.
         */
        Row.prototype.copy = function () {
            var theCopy = new Row(this._constant);
            theCopy._cellMap = this._cellMap.copy();
            return theCopy;
        };
        /**
         * Add a constant value to the row constant.
         *
         * Returns the new value of the constant.
         */
        Row.prototype.add = function (value) {
            return this._constant += value;
        };
        /**
         * Insert the symbol into the row with the given coefficient.
         *
         * If the symbol already exists in the row, the coefficient
         * will be added to the existing coefficient. If the resulting
         * coefficient is zero, the symbol will be removed from the row.
         */
        Row.prototype.insertSymbol = function (symbol, coefficient) {
            if (coefficient === void 0) { coefficient = 1.0; }
            var pair = this._cellMap.setDefault(symbol, function () { return 0.0; });
            if (nearZero(pair.second += coefficient)) {
                this._cellMap.erase(symbol);
            }
        };
        /**
         * Insert a row into this row with a given coefficient.
         *
         * The constant and the cells of the other row will be
         * multiplied by the coefficient and added to this row. Any
         * cell with a resulting coefficient of zero will be removed
         * from the row.
         */
        Row.prototype.insertRow = function (other, coefficient) {
            if (coefficient === void 0) { coefficient = 1.0; }
            this._constant += other._constant * coefficient;
            var cells = other._cellMap;
            for (var i = 0, n = cells.size(); i < n; ++i) {
                var pair = cells.itemAt(i);
                this.insertSymbol(pair.first, pair.second * coefficient);
            }
        };
        /**
         * Remove a symbol from the row.
         */
        Row.prototype.removeSymbol = function (symbol) {
            this._cellMap.erase(symbol);
        };
        /**
         * Reverse the sign of the constant and cells in the row.
         */
        Row.prototype.reverseSign = function () {
            this._constant = -this._constant;
            var cells = this._cellMap;
            for (var i = 0, n = cells.size(); i < n; ++i) {
                var pair = cells.itemAt(i);
                pair.second = -pair.second;
            }
        };
        /**
         * Solve the row for the given symbol.
         *
         * This method assumes the row is of the form
         * a * x + b * y + c = 0 and (assuming solve for x) will modify
         * the row to represent the right hand side of
         * x = -b/a * y - c / a. The target symbol will be removed from
         * the row, and the constant and other cells will be multiplied
         * by the negative inverse of the target coefficient.
         *
         * The given symbol *must* exist in the row.
         */
        Row.prototype.solveFor = function (symbol) {
            var cells = this._cellMap;
            var pair = cells.erase(symbol);
            var coeff = -1.0 / pair.second;
            this._constant *= coeff;
            for (var i = 0, n = cells.size(); i < n; ++i) {
                cells.itemAt(i).second *= coeff;
            }
        };
        /**
         * Solve the row for the given symbols.
         *
         * This method assumes the row is of the form
         * x = b * y + c and will solve the row such that
         * y = x / b - c / b. The rhs symbol will be removed from the
         * row, the lhs added, and the result divided by the negative
         * inverse of the rhs coefficient.
         *
         * The lhs symbol *must not* exist in the row, and the rhs
         * symbol must* exist in the row.
         */
        Row.prototype.solveForEx = function (lhs, rhs) {
            this.insertSymbol(lhs, -1.0);
            this.solveFor(rhs);
        };
        /**
         * Returns the coefficient for the given symbol.
         */
        Row.prototype.coefficientFor = function (symbol) {
            var pair = this._cellMap.find(symbol);
            return pair !== undefined ? pair.second : 0.0;
        };
        /**
         * Substitute a symbol with the data from another row.
         *
         * Given a row of the form a * x + b and a substitution of the
         * form x = 3 * y + c the row will be updated to reflect the
         * expression 3 * a * y + a * c + b.
         *
         * If the symbol does not exist in the row, this is a no-op.
         */
        Row.prototype.substitute = function (symbol, row) {
            var pair = this._cellMap.erase(symbol);
            if (pair !== undefined) {
                this.insertRow(row, pair.second);
            }
        };
        return Row;
    })();
})(kiwi || (kiwi = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
/// <reference path="constraint.ts"/>
/// <reference path="expression.ts"/>
/// <reference path="maptype.ts"/>
/// <reference path="solver.ts"/>
/// <reference path="strength.ts"/>
/// <reference path="variable.ts"/>

return kiwi;

}));

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var kiwi = require('kiwi/ts/bin/kiwi');

'use strict';

/**
 * Layout attributes.
 * @enum {String}
 */
var Attribute = {
  CONST: 'const',
  NOTANATTRIBUTE: 'const',
  VARIABLE: 'var',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  WIDTH: 'width',
  HEIGHT: 'height',
  CENTERX: 'centerX',
  CENTERY: 'centerY',
  /*LEADING: 'leading',
  TRAILING: 'trailing'*/
  /** Used by the extended VFL syntax. */
  ZINDEX: 'zIndex'
};

/**
 * Relation types.
 * @enum {String}
 */
var Relation = {
  /** Less than or equal */
  LEQ: 'leq',
  /** Equal */
  EQU: 'equ',
  /** Greater than or equal */
  GEQ: 'geq'
};

/**
 * Layout priorities.
 * @enum {String}
 */
var Priority = {
  REQUIRED: 1000,
  DEFAULTHIGH: 750,
  DEFAULTLOW: 250
  //FITTINGSIZELEVEL: 50,
};

var parser = (function () {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;

    this.name = 'SyntaxError';
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        peg$FAILED = {},
        peg$startRuleFunctions = { visualFormatString: peg$parsevisualFormatString },
        peg$startRuleFunction = peg$parsevisualFormatString,
        peg$c0 = peg$FAILED,
        peg$c1 = null,
        peg$c2 = ':',
        peg$c3 = { type: 'literal', value: ':', description: '":"' },
        peg$c4 = [],
        peg$c5 = function peg$c5(o, superto, view, views, tosuper) {
      return {
        orientation: o ? o[0] : 'horizontal',
        cascade: (superto || []).concat([view], [].concat.apply([], views), tosuper || [])
      };
    },
        peg$c6 = 'H',
        peg$c7 = { type: 'literal', value: 'H', description: '"H"' },
        peg$c8 = 'V',
        peg$c9 = { type: 'literal', value: 'V', description: '"V"' },
        peg$c10 = function peg$c10(orient) {
      return orient == 'H' ? 'horizontal' : 'vertical';
    },
        peg$c11 = '|',
        peg$c12 = { type: 'literal', value: '|', description: '"|"' },
        peg$c13 = function peg$c13() {
      return { view: null };
    },
        peg$c14 = '[',
        peg$c15 = { type: 'literal', value: '[', description: '"["' },
        peg$c16 = ']',
        peg$c17 = { type: 'literal', value: ']', description: '"]"' },
        peg$c18 = function peg$c18(view, predicates) {
      return extend(view, predicates ? { constraints: predicates } : {});
    },
        peg$c19 = '-',
        peg$c20 = { type: 'literal', value: '-', description: '"-"' },
        peg$c21 = function peg$c21(predicateList) {
      return predicateList;
    },
        peg$c22 = function peg$c22() {
      return [{ relation: 'equ', constant: 'default', $parserOffset: offset() }];
    },
        peg$c23 = '',
        peg$c24 = function peg$c24() {
      return [{ relation: 'equ', constant: 0, $parserOffset: offset() }];
    },
        peg$c25 = function peg$c25(n) {
      return [{ relation: 'equ', constant: n, $parserOffset: offset() }];
    },
        peg$c26 = '(',
        peg$c27 = { type: 'literal', value: '(', description: '"("' },
        peg$c28 = ',',
        peg$c29 = { type: 'literal', value: ',', description: '","' },
        peg$c30 = ')',
        peg$c31 = { type: 'literal', value: ')', description: '")"' },
        peg$c32 = function peg$c32(p, ps) {
      return [p].concat(ps.map(function (p) {
        return p[1];
      }));
    },
        peg$c33 = '@',
        peg$c34 = { type: 'literal', value: '@', description: '"@"' },
        peg$c35 = function peg$c35(r, o, p) {
      return extend({ relation: 'equ' }, r || {}, o, p ? p[1] : {});
    },
        peg$c36 = '==',
        peg$c37 = { type: 'literal', value: '==', description: '"=="' },
        peg$c38 = function peg$c38() {
      return { relation: 'equ', $parserOffset: offset() };
    },
        peg$c39 = '<=',
        peg$c40 = { type: 'literal', value: '<=', description: '"<="' },
        peg$c41 = function peg$c41() {
      return { relation: 'leq', $parserOffset: offset() };
    },
        peg$c42 = '>=',
        peg$c43 = { type: 'literal', value: '>=', description: '">="' },
        peg$c44 = function peg$c44() {
      return { relation: 'geq', $parserOffset: offset() };
    },
        peg$c45 = /^[0-9]/,
        peg$c46 = { type: 'class', value: '[0-9]', description: '[0-9]' },
        peg$c47 = function peg$c47(digits) {
      return { priority: parseInt(digits.join(''), 10) };
    },
        peg$c48 = function peg$c48(n) {
      return { constant: n };
    },
        peg$c49 = /^[a-zA-Z_]/,
        peg$c50 = { type: 'class', value: '[a-zA-Z_]', description: '[a-zA-Z_]' },
        peg$c51 = /^[a-zA-Z0-9_]/,
        peg$c52 = { type: 'class', value: '[a-zA-Z0-9_]', description: '[a-zA-Z0-9_]' },
        peg$c53 = function peg$c53(f, v) {
      return { view: f + v };
    },
        peg$c54 = '.',
        peg$c55 = { type: 'literal', value: '.', description: '"."' },
        peg$c56 = function peg$c56(digits, decimals) {
      return parseFloat(digits.concat('.').concat(decimals).join(''), 10);
    },
        peg$c57 = function peg$c57(digits) {
      return parseInt(digits.join(''), 10);
    },
        peg$currPos = 0,
        peg$reportedPos = 0,
        peg$cachedPos = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ('startRule' in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error('Can\'t start parsing from rule "' + options.startRule + '".');
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(null, [{ type: 'other', description: description }], peg$reportedPos);
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === '\n') {
            if (!details.seenCR) {
              details.line++;
            }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === '\r' || ch === '\u2028' || ch === '\u2029') {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }

          return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
            return '\\x0' + hex(ch);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
            return '\\x' + hex(ch);
          }).replace(/[\u0180-\u0FFF]/g, function (ch) {
            return '\\u0' + hex(ch);
          }).replace(/[\u1080-\uFFFF]/g, function (ch) {
            return '\\u' + hex(ch);
          });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(', ') + ' or ' + expectedDescs[expected.length - 1] : expectedDescs[0];

        foundDesc = found ? '"' + stringEscape(found) + '"' : 'end of input';

        return 'Expected ' + expectedDesc + ' but ' + foundDesc + ' found.';
      }

      var posDetails = peg$computePosDetails(pos),
          found = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
    }

    function peg$parsevisualFormatString() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseorientation();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s3 = peg$c2;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsesuperview();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseconnection();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseview();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseconnection();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseview();
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsesuperview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c1;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c5(s1, s2, s3, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseorientation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 72) {
        s1 = peg$c6;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c7);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 86) {
          s1 = peg$c8;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c9);
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c10(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsesuperview() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s1 = peg$c11;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c12);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c13();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseview() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c14;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c15);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseviewName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsepredicateListWithParens();
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s4 = peg$c16;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c18(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseconnection() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c19;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c20);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicateList();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 45) {
            s3 = peg$c19;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c20);
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c21(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c19;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c22();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$c23;
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c24();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsepredicateList() {
      var s0;

      s0 = peg$parsesimplePredicate();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepredicateListWithParens();
      }

      return s0;
    }

    function peg$parsesimplePredicate() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c25(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsepredicateListWithParens() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c26;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c27);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicate();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c28;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c29);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsepredicate();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c28;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c29);
              }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsepredicate();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c30;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c31);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c32(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsepredicate() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parserelation();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseobjectOfPredicate();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 64) {
            s4 = peg$c33;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c34);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepriority();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c35(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserelation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c36) {
        s1 = peg$c36;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c37);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c38();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c39) {
          s1 = peg$c39;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c41();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c42) {
            s1 = peg$c42;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c44();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseobjectOfPredicate() {
      var s0;

      s0 = peg$parseconstant();
      if (s0 === peg$FAILED) {
        s0 = peg$parseviewName();
      }

      return s0;
    }

    function peg$parsepriority() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c45.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c46);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c47(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseconstant() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c48(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseviewName() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c49.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c50);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c49.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c50);
            }
          }
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = [];
        if (peg$c51.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c52);
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c51.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c52);
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c53(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c45.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c46);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c54;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c55);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c45.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c46);
                }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c56(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c45.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c46);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c45.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c46);
              }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c57(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function extend(dst) {
      for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
          dst[k] = arguments[i][k];
        }
      }
      return dst;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: 'end', description: 'end of input' });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse: parse
  };
})();

var parserExt = (function () {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;

    this.name = 'SyntaxError';
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        peg$FAILED = {},
        peg$startRuleFunctions = { visualFormatString: peg$parsevisualFormatString },
        peg$startRuleFunction = peg$parsevisualFormatString,
        peg$c0 = peg$FAILED,
        peg$c1 = null,
        peg$c2 = ':',
        peg$c3 = { type: 'literal', value: ':', description: '":"' },
        peg$c4 = [],
        peg$c5 = function peg$c5(o, superto, view, views, tosuper, comments) {
      return {
        orientation: o ? o[0] : 'horizontal',
        cascade: (superto || []).concat([view], [].concat.apply([], views), tosuper || [])
      };
    },
        peg$c6 = 'H',
        peg$c7 = { type: 'literal', value: 'H', description: '"H"' },
        peg$c8 = 'V',
        peg$c9 = { type: 'literal', value: 'V', description: '"V"' },
        peg$c10 = 'Z',
        peg$c11 = { type: 'literal', value: 'Z', description: '"Z"' },
        peg$c12 = function peg$c12(orient) {
      return orient == 'H' ? 'horizontal' : orient == 'V' ? 'vertical' : 'zIndex';
    },
        peg$c13 = ' ',
        peg$c14 = { type: 'literal', value: ' ', description: '" "' },
        peg$c15 = '//',
        peg$c16 = { type: 'literal', value: '//', description: '"//"' },
        peg$c17 = { type: 'any', description: 'any character' },
        peg$c18 = '|',
        peg$c19 = { type: 'literal', value: '|', description: '"|"' },
        peg$c20 = function peg$c20() {
      return { view: null };
    },
        peg$c21 = '[',
        peg$c22 = { type: 'literal', value: '[', description: '"["' },
        peg$c23 = ']',
        peg$c24 = { type: 'literal', value: ']', description: '"]"' },
        peg$c25 = function peg$c25(view, predicates, cascadedViews) {
      return extend(extend(view, predicates ? { constraints: predicates } : {}), cascadedViews ? {
        cascade: cascadedViews
      } : {});
    },
        peg$c26 = function peg$c26(views, connection) {
      return [].concat([].concat.apply([], views), [connection]);
    },
        peg$c27 = '->',
        peg$c28 = { type: 'literal', value: '->', description: '"->"' },
        peg$c29 = function peg$c29() {
      return [{ relation: 'none', $parserOffset: offset() }];
    },
        peg$c30 = '-',
        peg$c31 = { type: 'literal', value: '-', description: '"-"' },
        peg$c32 = function peg$c32(predicateList) {
      return predicateList;
    },
        peg$c33 = function peg$c33() {
      return [{ relation: 'equ', constant: 'default', $parserOffset: offset() }];
    },
        peg$c34 = '~',
        peg$c35 = { type: 'literal', value: '~', description: '"~"' },
        peg$c36 = function peg$c36() {
      return [{ relation: 'equ', equalSpacing: true, $parserOffset: offset() }];
    },
        peg$c37 = '',
        peg$c38 = function peg$c38() {
      return [{ relation: 'equ', constant: 0, $parserOffset: offset() }];
    },
        peg$c39 = function peg$c39(p) {
      return [{ relation: 'equ', multiplier: p.multiplier, $parserOffset: offset() }];
    },
        peg$c40 = function peg$c40(n) {
      return [{ relation: 'equ', constant: n, $parserOffset: offset() }];
    },
        peg$c41 = '(',
        peg$c42 = { type: 'literal', value: '(', description: '"("' },
        peg$c43 = ',',
        peg$c44 = { type: 'literal', value: ',', description: '","' },
        peg$c45 = ')',
        peg$c46 = { type: 'literal', value: ')', description: '")"' },
        peg$c47 = function peg$c47(p, ps) {
      return [p].concat(ps.map(function (p) {
        return p[1];
      }));
    },
        peg$c48 = '@',
        peg$c49 = { type: 'literal', value: '@', description: '"@"' },
        peg$c50 = function peg$c50(r, o, p) {
      return extend({ relation: 'equ' }, r || {}, o, p ? p[1] : {});
    },
        peg$c51 = function peg$c51(r, o, p) {
      return extend({ relation: 'equ', equalSpacing: true }, r || {}, o, p ? p[1] : {});
    },
        peg$c52 = '==',
        peg$c53 = { type: 'literal', value: '==', description: '"=="' },
        peg$c54 = function peg$c54() {
      return { relation: 'equ', $parserOffset: offset() };
    },
        peg$c55 = '<=',
        peg$c56 = { type: 'literal', value: '<=', description: '"<="' },
        peg$c57 = function peg$c57() {
      return { relation: 'leq', $parserOffset: offset() };
    },
        peg$c58 = '>=',
        peg$c59 = { type: 'literal', value: '>=', description: '">="' },
        peg$c60 = function peg$c60() {
      return { relation: 'geq', $parserOffset: offset() };
    },
        peg$c61 = /^[0-9]/,
        peg$c62 = { type: 'class', value: '[0-9]', description: '[0-9]' },
        peg$c63 = function peg$c63(digits) {
      return { priority: parseInt(digits.join(''), 10) };
    },
        peg$c64 = function peg$c64(n) {
      return { constant: n };
    },
        peg$c65 = '%',
        peg$c66 = { type: 'literal', value: '%', description: '"%"' },
        peg$c67 = function peg$c67(n) {
      return { view: null, multiplier: n / 100 };
    },
        peg$c68 = function peg$c68(vn, a, m, c) {
      return { view: vn.view, attribute: a ? a : undefined, multiplier: m ? m : 1, constant: c ? c : undefined };
    },
        peg$c69 = '.left',
        peg$c70 = { type: 'literal', value: '.left', description: '".left"' },
        peg$c71 = function peg$c71() {
      return 'left';
    },
        peg$c72 = '.right',
        peg$c73 = { type: 'literal', value: '.right', description: '".right"' },
        peg$c74 = function peg$c74() {
      return 'right';
    },
        peg$c75 = '.top',
        peg$c76 = { type: 'literal', value: '.top', description: '".top"' },
        peg$c77 = function peg$c77() {
      return 'top';
    },
        peg$c78 = '.bottom',
        peg$c79 = { type: 'literal', value: '.bottom', description: '".bottom"' },
        peg$c80 = function peg$c80() {
      return 'bottom';
    },
        peg$c81 = '.width',
        peg$c82 = { type: 'literal', value: '.width', description: '".width"' },
        peg$c83 = function peg$c83() {
      return 'width';
    },
        peg$c84 = '.height',
        peg$c85 = { type: 'literal', value: '.height', description: '".height"' },
        peg$c86 = function peg$c86() {
      return 'height';
    },
        peg$c87 = '.centerX',
        peg$c88 = { type: 'literal', value: '.centerX', description: '".centerX"' },
        peg$c89 = function peg$c89() {
      return 'centerX';
    },
        peg$c90 = '.centerY',
        peg$c91 = { type: 'literal', value: '.centerY', description: '".centerY"' },
        peg$c92 = function peg$c92() {
      return 'centerY';
    },
        peg$c93 = '/',
        peg$c94 = { type: 'literal', value: '/', description: '"/"' },
        peg$c95 = function peg$c95(n) {
      return 1 / n;
    },
        peg$c96 = '*',
        peg$c97 = { type: 'literal', value: '*', description: '"*"' },
        peg$c98 = function peg$c98(n) {
      return n;
    },
        peg$c99 = function peg$c99(n) {
      return -n;
    },
        peg$c100 = '+',
        peg$c101 = { type: 'literal', value: '+', description: '"+"' },
        peg$c102 = /^[a-zA-Z_]/,
        peg$c103 = { type: 'class', value: '[a-zA-Z_]', description: '[a-zA-Z_]' },
        peg$c104 = /^[a-zA-Z0-9_]/,
        peg$c105 = { type: 'class', value: '[a-zA-Z0-9_]', description: '[a-zA-Z0-9_]' },
        peg$c106 = function peg$c106(f, v) {
      return { view: f + v };
    },
        peg$c107 = '.',
        peg$c108 = { type: 'literal', value: '.', description: '"."' },
        peg$c109 = function peg$c109(digits, decimals) {
      return parseFloat(digits.concat('.').concat(decimals).join(''), 10);
    },
        peg$c110 = function peg$c110(digits) {
      return parseInt(digits.join(''), 10);
    },
        peg$currPos = 0,
        peg$reportedPos = 0,
        peg$cachedPos = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ('startRule' in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error('Can\'t start parsing from rule "' + options.startRule + '".');
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(null, [{ type: 'other', description: description }], peg$reportedPos);
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === '\n') {
            if (!details.seenCR) {
              details.line++;
            }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === '\r' || ch === '\u2028' || ch === '\u2029') {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }

          return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
            return '\\x0' + hex(ch);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
            return '\\x' + hex(ch);
          }).replace(/[\u0180-\u0FFF]/g, function (ch) {
            return '\\u0' + hex(ch);
          }).replace(/[\u1080-\uFFFF]/g, function (ch) {
            return '\\u' + hex(ch);
          });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(', ') + ' or ' + expectedDescs[expected.length - 1] : expectedDescs[0];

        foundDesc = found ? '"' + stringEscape(found) + '"' : 'end of input';

        return 'Expected ' + expectedDesc + ' but ' + foundDesc + ' found.';
      }

      var posDetails = peg$computePosDetails(pos),
          found = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
    }

    function peg$parsevisualFormatString() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseorientation();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s3 = peg$c2;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsesuperview();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseconnection();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseview();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseconnection();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseview();
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsesuperview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c1;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecomments();
                if (s6 === peg$FAILED) {
                  s6 = peg$c1;
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c5(s1, s2, s3, s4, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseorientation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 72) {
        s1 = peg$c6;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c7);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 86) {
          s1 = peg$c8;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c9);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 90) {
            s1 = peg$c10;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c11);
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c12(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsecomments() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s2 = peg$c13;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c14);
        }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c13;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c14);
          }
        }
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c15) {
          s2 = peg$c15;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c16);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (input.length > peg$currPos) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsesuperview() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s1 = peg$c18;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c19);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c20();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseview() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c21;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c22);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseviewName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsepredicateListWithParens();
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsecascadedViews();
            if (s4 === peg$FAILED) {
              s4 = peg$c1;
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s5 = peg$c23;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c24);
                }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c25(s2, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecascadedViews() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 58) {
        s1 = peg$c2;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c3);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parseconnection();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseview();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parseconnection();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseview();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseconnection();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c26(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseconnection() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c27) {
        s1 = peg$c27;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c28);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c29();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c30;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c31);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsepredicateList();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s3 = peg$c30;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c31);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c32(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 45) {
            s1 = peg$c30;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c31);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c33();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 126) {
              s1 = peg$c34;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c35);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parseequalSpacingPredicateList();
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 126) {
                  s3 = peg$c34;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c35);
                  }
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c32(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 126) {
                s1 = peg$c34;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c35);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c36();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$c37;
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c38();
                }
                s0 = s1;
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsepredicateList() {
      var s0;

      s0 = peg$parsesimplePredicate();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepredicateListWithParens();
      }

      return s0;
    }

    function peg$parsesimplePredicate() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsepercentage();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c39(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c40(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsepredicateListWithParens() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c41;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c42);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicate();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c43;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c44);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsepredicate();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c43;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c44);
              }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsepredicate();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c45;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c46);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c47(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsepredicate() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parserelation();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseobjectOfPredicate();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 64) {
            s4 = peg$c48;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c49);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepriority();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c50(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseequalSpacingPredicateList() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c41;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c42);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseequalSpacingPredicate();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c43;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c44);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parseequalSpacingPredicate();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c43;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c44);
              }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parseequalSpacingPredicate();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c45;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c46);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c47(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseequalSpacingPredicate() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parserelation();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseobjectOfPredicate();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 64) {
            s4 = peg$c48;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c49);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepriority();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c51(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserelation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c52) {
        s1 = peg$c52;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c53);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c54();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c55) {
          s1 = peg$c55;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c56);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c57();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c58) {
            s1 = peg$c58;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c59);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c60();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseobjectOfPredicate() {
      var s0;

      s0 = peg$parsepercentage();
      if (s0 === peg$FAILED) {
        s0 = peg$parseconstant();
        if (s0 === peg$FAILED) {
          s0 = peg$parseviewPredicate();
        }
      }

      return s0;
    }

    function peg$parsepriority() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c61.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c62);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c61.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c62);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c63(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseconstant() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c64(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsepercentage() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 37) {
          s2 = peg$c65;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c66);
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c67(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseviewPredicate() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseviewName();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseattribute();
        if (s2 === peg$FAILED) {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsemultiplier();
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseconstantExpr();
            if (s4 === peg$FAILED) {
              s4 = peg$c1;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c68(s1, s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseattribute() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c69) {
        s1 = peg$c69;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c70);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c71();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c72) {
          s1 = peg$c72;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c73);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c74();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c75) {
            s1 = peg$c75;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c76);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c77();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 7) === peg$c78) {
              s1 = peg$c78;
              peg$currPos += 7;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c79);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c80();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 6) === peg$c81) {
                s1 = peg$c81;
                peg$currPos += 6;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c82);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c83();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 7) === peg$c84) {
                  s1 = peg$c84;
                  peg$currPos += 7;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c85);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c86();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.substr(peg$currPos, 8) === peg$c87) {
                    s1 = peg$c87;
                    peg$currPos += 8;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c88);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c89();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 8) === peg$c90) {
                      s1 = peg$c90;
                      peg$currPos += 8;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c91);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c92();
                    }
                    s0 = s1;
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsemultiplier() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c93;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c94);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c95(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 42) {
          s1 = peg$c96;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c97);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c98(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseconstantExpr() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c30;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c31);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c99(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 43) {
          s1 = peg$c100;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c101);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c98(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseviewName() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c102.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c103);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c102.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c103);
            }
          }
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = [];
        if (peg$c104.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c105);
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c104.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c105);
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c106(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c61.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c62);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c61.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c62);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c107;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c108);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c61.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c62);
            }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c61.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c62);
                }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c109(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c61.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c62);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c61.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c62);
              }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c110(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function extend(dst) {
      for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
          dst[k] = arguments[i][k];
        }
      }
      return dst;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: 'end', description: 'end of input' });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse: parse
  };
})();

var Orientation = {
  HORIZONTAL: 1,
  VERTICAL: 2,
  ZINDEX: 4
};

/**
 * Helper function that inserts equal spacers (~).
 * @private
 */
function _processEqualSpacer(context, stackView) {

  // Determine unique name for the spacer
  context.equalSpacerIndex = context.equalSpacerIndex || 1;
  var name = '_~' + context.lineIndex + ':' + context.equalSpacerIndex + '~';
  if (context.equalSpacerIndex > 1) {

    // Ensure that all spacers have the same width/height
    context.constraints.push({
      view1: '_~' + context.lineIndex + ':1~',
      attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      relation: context.relation.relation || Relation.EQU,
      view2: name,
      attr2: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      priority: context.relation.priority
    });
  }
  context.equalSpacerIndex++;

  // Enforce proportional width/height
  if (context.relation.multiplier && context.relation.multiplier !== 1) {
    context.constraints.push({
      view1: name,
      attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      relation: context.relation.relation || Relation.EQU,
      view2: null,
      attr2: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      priority: context.relation.priority,
      multiplier: context.relation.multiplier
    });
    context.relation.multiplier = undefined;
  } else if (context.relation.constant) {
    context.constraints.push({
      view1: name,
      attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      relation: Relation.EQU,
      view2: null,
      attr2: Attribute.CONST,
      priority: context.relation.priority,
      constant: context.relation.constant
    });
    context.relation.constant = undefined;
  }

  // Add constraint
  switch (context.orientation) {
    case Orientation.HORIZONTAL:
      context.attr1 = context.view1 !== stackView ? Attribute.RIGHT : Attribute.LEFT;
      context.attr2 = Attribute.LEFT;
      break;
    case Orientation.VERTICAL:
      context.attr1 = context.view1 !== stackView ? Attribute.BOTTOM : Attribute.TOP;
      context.attr2 = Attribute.TOP;
      break;
    case Orientation.ZINDEX:
      context.attr1 = Attribute.ZINDEX;
      context.attr2 = Attribute.ZINDEX;
      context.relation.constant = context.view1 !== stackView ? 'default' : 0;
      break;
  }
  context.constraints.push({
    view1: context.view1,
    attr1: context.attr1,
    relation: context.relation.relation,
    view2: name,
    attr2: context.attr2,
    priority: context.relation.priority
  });
  context.view1 = name;
}

/**
 * Helper function that inserts proportional spacers (-12%-).
 * @private
 */
function _processProportionalSpacer(context, stackView) {
  context.proportionalSpacerIndex = context.proportionalSpacerIndex || 1;
  var name = '_-' + context.lineIndex + ':' + context.proportionalSpacerIndex + '-';
  context.proportionalSpacerIndex++;
  context.constraints.push({
    view1: name,
    attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
    relation: context.relation.relation || Relation.EQU,
    view2: null, // or relative to the stackView... food for thought
    attr2: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
    priority: context.relation.priority,
    multiplier: context.relation.multiplier
  });
  context.relation.multiplier = undefined;

  // Add constraint
  switch (context.orientation) {
    case Orientation.HORIZONTAL:
      context.attr1 = context.view1 !== stackView ? Attribute.RIGHT : Attribute.LEFT;
      context.attr2 = Attribute.LEFT;
      break;
    case Orientation.VERTICAL:
      context.attr1 = context.view1 !== stackView ? Attribute.BOTTOM : Attribute.TOP;
      context.attr2 = Attribute.TOP;
      break;
    case Orientation.ZINDEX:
      context.attr1 = Attribute.ZINDEX;
      context.attr2 = Attribute.ZINDEX;
      context.relation.constant = context.view1 !== stackView ? 'default' : 0;
      break;
  }
  context.constraints.push({
    view1: context.view1,
    attr1: context.attr1,
    relation: context.relation.relation,
    view2: name,
    attr2: context.attr2,
    priority: context.relation.priority
  });
  context.view1 = name;
}

/**
 * In case of a stack-view, set constraints for opposite orientations
 * @private
 */
function _processStackView(context, name, subView) {
  var viewName = undefined;
  for (var orientation = 1; orientation <= 4; orientation *= 2) {
    if (subView.orientations & orientation && subView.stack.orientation !== orientation && !(subView.stack.processedOrientations & orientation)) {
      subView.stack.processedOrientations = subView.stack.processedOrientations | orientation;
      viewName = viewName || {
        name: name,
        type: 'stack'
      };
      for (var i = 0, j = subView.stack.subViews.length; i < j; i++) {
        if (orientation === Orientation.ZINDEX) {
          context.constraints.push({
            view1: viewName,
            attr1: Attribute.ZINDEX,
            relation: Relation.EQU,
            view2: subView.stack.subViews[i],
            attr2: Attribute.ZINDEX
          });
        } else {
          context.constraints.push({
            view1: viewName,
            attr1: orientation === Orientation.VERTICAL ? Attribute.HEIGHT : Attribute.WIDTH,
            relation: Relation.EQU,
            view2: subView.stack.subViews[i],
            attr2: orientation === Orientation.VERTICAL ? Attribute.HEIGHT : Attribute.WIDTH
          });
          context.constraints.push({
            view1: viewName,
            attr1: orientation === Orientation.VERTICAL ? Attribute.TOP : Attribute.LEFT,
            relation: Relation.EQU,
            view2: subView.stack.subViews[i],
            attr2: orientation === Orientation.VERTICAL ? Attribute.TOP : Attribute.LEFT
          });
        }
      }
    }
  }
}

/**
 * Recursive helper function that processes the cascaded data.
 * @private
 */
function _processCascade(context, cascade, stackView) {
  var subViews = [];
  var subView = undefined;
  if (stackView) {
    cascade.push({ view: stackView });
  }
  for (var i = 0; i < cascade.length; i++) {
    context.item = cascade[i];
    if (!Array.isArray(context.item) && context.item.hasOwnProperty('view')) {
      context.view1 = context.view2;
      context.view2 = context.item.view;
      if (context.view1 !== undefined && context.view2 !== undefined && context.relation) {
        if (context.item.view !== stackView) {
          subViews.push(context.item.view);
          subView = context.subViews[context.item.view];
          if (!subView) {
            subView = { orientations: 0 };
            context.subViews[context.item.view] = subView;
          }
          subView.orientations = subView.orientations | context.orientation;
          if (subView.stack) {
            _processStackView(context, context.item.view, subView);
          }
        }
        if (context.relation.equalSpacing) {
          _processEqualSpacer(context, stackView);
        }
        if (context.relation.multiplier) {
          _processProportionalSpacer(context, stackView);
        }
        if (context.relation.relation !== 'none') {
          switch (context.orientation) {
            case Orientation.HORIZONTAL:
              context.attr1 = context.view1 !== stackView ? Attribute.RIGHT : Attribute.LEFT;
              context.attr2 = context.view2 !== stackView ? Attribute.LEFT : Attribute.RIGHT;
              break;
            case Orientation.VERTICAL:
              context.attr1 = context.view1 !== stackView ? Attribute.BOTTOM : Attribute.TOP;
              context.attr2 = context.view2 !== stackView ? Attribute.TOP : Attribute.BOTTOM;
              break;
            case Orientation.ZINDEX:
              context.attr1 = Attribute.ZINDEX;
              context.attr2 = Attribute.ZINDEX;
              context.relation.constant = context.view1 !== stackView ? 'default' : 0;
              break;
          }
          context.constraints.push({
            view1: context.view1,
            attr1: context.attr1,
            relation: context.relation.relation,
            view2: context.view2,
            attr2: context.attr2,
            multiplier: context.relation.multiplier,
            constant: context.relation.constant === 'default' || !context.relation.constant ? context.relation.constant : -context.relation.constant,
            priority: context.relation.priority
            //,variable: context.relation.variable
          });
        }
      }
      context.relation = undefined;

      // process view size constraints
      if (context.item.constraints) {
        for (var n = 0; n < context.item.constraints.length; n++) {
          context.attr1 = context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT;
          context.attr2 = context.item.constraints[n].view || context.item.constraints[n].multiplier ? context.item.constraints[n].attribute || context.attr1 : context.item.constraints[n].variable ? Attribute.VARIABLE : Attribute.CONST;
          context.constraints.push({
            view1: context.item.view,
            attr1: context.attr1,
            relation: context.item.constraints[n].relation,
            view2: context.item.constraints[n].view,
            attr2: context.attr2,
            multiplier: context.item.constraints[n].multiplier,
            constant: context.item.constraints[n].constant,
            priority: context.item.constraints[n].priority
            //,variable: context.item.constraints[n].variable
          });
        }
      }

      // Process cascaded data (child stack-views)
      if (context.item.cascade) {
        _processCascade(context, context.item.cascade, context.item.view);
      }
    } else {
      context.relation = context.item[0];
    }
  }

  if (stackView) {
    subView = context.subViews[stackView];
    if (subView.stack) {
      throw new Error('A stack with name "' + stackView + '"" already exists');
    }
    subView.stack = {
      orientation: context.orientation,
      processedOrientations: context.orientation,
      subViews: subViews
    };
    _processStackView(context, stackView, subView);
  }
}

var metaInfoCategories = ['viewport', 'spacing', 'colors', 'shapes', 'widths', 'heights'];

/**
 * VisualFormat
 *
 * @namespace VisualFormat
 */

var VisualFormat = (function () {
  function VisualFormat() {
    _classCallCheck(this, VisualFormat);
  }

  _createClass(VisualFormat, null, [{
    key: 'parseLine',

    /**
     * Parses a single line of vfl into an array of constraint definitions.
     *
     * When the visual-format could not be succesfully parsed an exception is thrown containing
     * additional info about the parse error and column position.
     *
     * @param {String} visualFormat Visual format string (cannot contain line-endings!).
     * @param {Object} [options] Configuration options.
     * @param {Boolean} [options.extended] When set to true uses the extended syntax (default: false).
     * @param {String} [options.outFormat] Output format (`constraints` or `raw`) (default: `constraints`).
     * @param {Number} [options.lineIndex] Line-index used when auto generating equal-spacing constraints.
     * @return {Array} Array of constraint definitions.
     */
    value: function parseLine(visualFormat, options) {
      if (visualFormat.length === 0 || options && options.extended && visualFormat.indexOf('//') === 0) {
        return [];
      }
      var res = options && options.extended ? parserExt.parse(visualFormat) : parser.parse(visualFormat);
      if (options && options.outFormat === 'raw') {
        return [res];
      }
      var context = {
        constraints: [],
        lineIndex: (options ? options.lineIndex : undefined) || 1,
        subViews: (options ? options.subViews : undefined) || {}
      };
      switch (res.orientation) {
        case 'horizontal':
          context.orientation = Orientation.HORIZONTAL;
          context.horizontal = true;
          break;
        case 'vertical':
          context.orientation = Orientation.VERTICAL;
          break;
        case 'zIndex':
          context.orientation = Orientation.ZINDEX;
          break;
      }
      _processCascade(context, res.cascade, null);
      return context.constraints;
    }
  }, {
    key: 'parse',

    /**
     * Parses one or more visual format strings into an array of constraint definitions.
     *
     * When the visual-format could not be succesfully parsed an exception is thrown containing
     * additional info about the parse error and column position.
     *
     * @param {String|Array} visualFormat One or more visual format strings.
     * @param {Object} [options] Configuration options.
     * @param {Boolean} [options.extended] When set to true uses the extended syntax (default: false).
     * @param {Boolean} [options.strict] When set to false trims any leading/trailing spaces and ignores empty lines (default: true).
     * @param {String} [options.lineSeperator] String that defines the end of a line (default `\n`).
     * @param {String} [options.outFormat] Output format (`constraints` or `raw`) (default: `constraints`).
     * @return {Array} Array of constraint definitions.
     */
    value: function parse(visualFormat, options) {
      var lineSeperator = options && options.lineSeperator ? options.lineSeperator : '\n';
      if (!Array.isArray(visualFormat) && visualFormat.indexOf(lineSeperator) < 0) {
        try {
          return this.parseLine(visualFormat, options);
        } catch (err) {
          err.source = visualFormat;
          throw err;
        }
      }

      // Decompose visual-format into an array of strings, and within those strings
      // search for line-endings, and treat each line as a seperate visual-format.
      visualFormat = Array.isArray(visualFormat) ? visualFormat : [visualFormat];
      var lines = undefined;
      var constraints = [];
      var lineIndex = 0;
      var line = undefined;
      var parseOptions = {
        lineIndex: lineIndex,
        extended: options && options.extended,
        strict: options && options.strict !== undefined ? options.strict : true,
        outFormat: options ? options.outFormat : undefined,
        subViews: {}
      };
      try {
        for (var i = 0; i < visualFormat.length; i++) {
          lines = visualFormat[i].split(lineSeperator);
          for (var j = 0; j < lines.length; j++) {
            line = lines[j];
            lineIndex++;
            parseOptions.lineIndex = lineIndex;
            if (!parseOptions.strict) {
              line = line.trim();
            }
            if (parseOptions.strict || line.length) {
              constraints = constraints.concat(this.parseLine(line, parseOptions));
            }
          }
        }
      } catch (err) {
        err.source = line;
        err.line = lineIndex;
        throw err;
      }
      return constraints;
    }
  }, {
    key: 'parseMetaInfo',

    /**
     * Parses meta information from the comments in the VFL.
     *
     * Additional meta information can be specified in the comments
     * for previewing and rendering purposes. For instance, the view-port
     * aspect-ratio, sub-view widths and colors, can be specified. The
     * following example renders three colored circles in the visual-format editor:
     *
     * ```vfl
     * //viewport aspect-ratio:3/1 max-height:300
     * //colors red:#FF0000 green:#00FF00 blue:#0000FF
     * //shapes red:circle green:circle blue:circle
     * H:|-[row:[red(green,blue)]-[green]-[blue]]-|
     * V:|[row]|
     * ```
     *
     * Supported categories and properties:
     *
     * |Category|Property|Example|
     * |--------|--------|-------|
     * |`viewport`|`aspect-ratio:{width}/{height}`|`//viewport aspect-ratio:16/9`|
     * ||`width:[{number}/intrinsic]`|`//viewport width:10`|
     * ||`height:[{number}/intrinsic]`|`//viewport height:intrinsic`|
     * ||`min-width:{number}`|
     * ||`max-width:{number}`|
     * ||`min-height:{number}`|
     * ||`max-height:{number}`|
     * |`spacing`|`[{number}/array]`|`//spacing:8` or `//spacing:[10, 20, 5]`|
     * |`widths`|`{view-name}:[{number}/intrinsic]`|`//widths subview1:100`|
     * |`heights`|`{view-name}:[{number}/intrinsic]`|`//heights subview1:intrinsic`|
     * |`colors`|`{view-name}:{color}`|`//colors redview:#FF0000 blueview:#00FF00`|
     * |`shapes`|`{view-name}:[circle/square]`|`//shapes avatar:circle`|
     *
     * @param {String|Array} visualFormat One or more visual format strings.
     * @param {Object} [options] Configuration options.
     * @param {String} [options.lineSeperator] String that defines the end of a line (default `\n`).
     * @return {Object} meta-info
     */
    value: function parseMetaInfo(visualFormat, options) {
      var lineSeperator = options && options.lineSeperator ? options.lineSeperator : '\n';
      visualFormat = Array.isArray(visualFormat) ? visualFormat : [visualFormat];
      var metaInfo = {};
      var key;
      for (var k = 0; k < visualFormat.length; k++) {
        var lines = visualFormat[k].split(lineSeperator);
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          for (var c = 0; c < metaInfoCategories.length; c++) {
            var category = metaInfoCategories[c];
            if (line.indexOf('//' + category + ' ') === 0) {
              var items = line.substring(3 + category.length).split(' ');
              for (var j = 0; j < items.length; j++) {
                var item = items[j].split(':');
                metaInfo[category] = metaInfo[category] || {};
                metaInfo[category][item[0]] = item.length > 1 ? item[1] : '';
              }
            } else if (line.indexOf('//' + category + ':') === 0) {
              metaInfo[category] = line.substring(3 + category.length);
            }
          }
        }
      }
      if (metaInfo.viewport) {
        var viewport = metaInfo.viewport;
        var aspectRatio = viewport['aspect-ratio'];
        if (aspectRatio) {
          aspectRatio = aspectRatio.split('/');
          viewport['aspect-ratio'] = parseInt(aspectRatio[0]) / parseInt(aspectRatio[1]);
        }
        if (viewport.height !== undefined) {
          viewport.height = viewport.height === 'intrinsic' ? true : parseInt(viewport.height);
        }
        if (viewport.width !== undefined) {
          viewport.width = viewport.width === 'intrinsic' ? true : parseInt(viewport.width);
        }
        if (viewport['max-height'] !== undefined) {
          viewport['max-height'] = parseInt(viewport['max-height']);
        }
        if (viewport['max-width'] !== undefined) {
          viewport['max-width'] = parseInt(viewport['max-width']);
        }
        if (viewport['min-height'] !== undefined) {
          viewport['min-height'] = parseInt(viewport['min-height']);
        }
        if (viewport['min-width'] !== undefined) {
          viewport['min-width'] = parseInt(viewport['min-width']);
        }
      }
      if (metaInfo.widths) {
        for (key in metaInfo.widths) {
          var width = metaInfo.widths[key] === 'intrinsic' ? true : parseInt(metaInfo.widths[key]);
          metaInfo.widths[key] = width;
          if (width === undefined || isNaN(width)) {
            delete metaInfo.widths[key];
          }
        }
      }
      if (metaInfo.heights) {
        for (key in metaInfo.heights) {
          var height = metaInfo.heights[key] === 'intrinsic' ? true : parseInt(metaInfo.heights[key]);
          metaInfo.heights[key] = height;
          if (height === undefined || isNaN(height)) {
            delete metaInfo.heights[key];
          }
        }
      }
      if (metaInfo.spacing) {
        var value = JSON.parse(metaInfo.spacing);
        metaInfo.spacing = value;
        if (value === undefined || isNaN(value)) {
          delete metaInfo.spacing;
        }
      }
      return metaInfo;
    }
  }]);

  return VisualFormat;
})();

var SubView = (function () {
  function SubView(options) {
    _classCallCheck(this, SubView);

    this._name = options.name;
    this._type = options.type;
    this._solver = options.solver;
    this._attr = {};
    if (!options.name) {
      if (false) {
        this._attr[Attribute.LEFT] = new c.Variable();
        this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.LEFT], c.Strength.required));
        this._attr[Attribute.TOP] = new c.Variable();
        this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.TOP], c.Strength.required));
        this._attr[Attribute.ZINDEX] = new c.Variable();
        this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.ZINDEX], c.Strength.required));
      } else {
        this._attr[Attribute.LEFT] = new kiwi.Variable();
        this._solver.addConstraint(new kiwi.Constraint(this._attr[Attribute.LEFT], kiwi.Operator.Eq, 0));
        this._attr[Attribute.TOP] = new kiwi.Variable();
        this._solver.addConstraint(new kiwi.Constraint(this._attr[Attribute.TOP], kiwi.Operator.Eq, 0));
        this._attr[Attribute.ZINDEX] = new kiwi.Variable();
        this._solver.addConstraint(new kiwi.Constraint(this._attr[Attribute.ZINDEX], kiwi.Operator.Eq, 0));
      }
    }
  }

  _createClass(SubView, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        name: this.name,
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height
      };
    }
  }, {
    key: 'toString',
    value: function toString() {
      JSON.stringify(this.toJSON(), undefined, 2);
    }
  }, {
    key: 'name',

    /**
     * Name of the sub-view.
     * @readonly
     * @type {String}
     */
    get: function () {
      return this._name;
    }
  }, {
    key: 'left',

    /**
     * Left value (`Attribute.LEFT`).
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._getAttrValue(Attribute.LEFT);
    }
  }, {
    key: 'right',

    /**
     * Right value (`Attribute.RIGHT`).
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._getAttrValue(Attribute.RIGHT);
    }
  }, {
    key: 'width',

    /**
     * Width value (`Attribute.WIDTH`).
     * @type {Number}
     */
    get: function () {
      return this._getAttrValue(Attribute.WIDTH);
    }
  }, {
    key: 'height',

    /**
     * Height value (`Attribute.HEIGHT`).
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._getAttrValue(Attribute.HEIGHT);
    }
  }, {
    key: 'intrinsicWidth',

    /**
     * Intrinsic width of the sub-view.
     *
     * Use this property to explicitely set the width of the sub-view, e.g.:
     * ```javascript
     * var view = new AutoLayout.View(AutoLayout.VisualFormat.parse('|[child1][child2]|'), {
     *   width: 500
     * });
     * view.subViews.child1.intrinsicWidth = 100;
     * console.log('child2 width: ' + view.subViews.child2.width); // 400
     * ```
     *
     * @type {Number}
     */
    get: function () {
      return this._intrinsicWidth;
    },
    set: function (value) {
      if (value !== undefined && value !== this._intrinsicWidth) {
        var attr = this._getAttr(Attribute.WIDTH);
        if (this._intrinsicWidth === undefined) {
          if (false) {
            this._solver.addEditVar(attr, new c.Strength('required', this._name ? 998 : 999, 1000, 1000));
          } else {
            this._solver.addEditVariable(attr, kiwi.Strength.create(this._name ? 998 : 999, 1000, 1000));
          }
        }
        this._intrinsicWidth = value;
        this._solver.suggestValue(attr, value);
        if (false) {
          this._solver.resolve();
        } else {
          this._solver.updateVariables();
        }
      }
    }
  }, {
    key: 'intrinsicHeight',

    /**
     * Intrinsic height of the sub-view.
     *
     * See `intrinsicWidth`.
     *
     * @type {Number}
     */
    get: function () {
      return this._intrinsicHeight;
    },
    set: function (value) {
      if (value !== undefined && value !== this._intrinsicHeight) {
        var attr = this._getAttr(Attribute.HEIGHT);
        if (this._intrinsicHeight === undefined) {
          if (false) {
            this._solver.addEditVar(attr, new c.Strength('required', this._name ? 998 : 999, 1000, 1000));
          } else {
            this._solver.addEditVariable(attr, kiwi.Strength.create(this._name ? 998 : 999, 1000, 1000));
          }
        }
        this._intrinsicHeight = value;
        this._solver.suggestValue(attr, value);
        if (false) {
          this._solver.resolve();
        } else {
          this._solver.updateVariables();
        }
      }
    }
  }, {
    key: 'top',

    /**
     * Top value (`Attribute.TOP`).
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._getAttrValue(Attribute.TOP);
    }
  }, {
    key: 'bottom',

    /**
     * Bottom value (`Attribute.BOTTOM`).
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._getAttrValue(Attribute.BOTTOM);
    }
  }, {
    key: 'centerX',

    /**
     * Horizontal center (`Attribute.CENTERX`).
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._getAttrValue(Attribute.CENTERX);
    }
  }, {
    key: 'centerY',

    /**
     * Vertical center (`Attribute.CENTERY`).
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._getAttrValue(Attribute.CENTERY);
    }
  }, {
    key: 'zIndex',

    /**
     * Z-index (`Attribute.ZINDEX`).
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._getAttrValue(Attribute.ZINDEX);
    }
  }, {
    key: 'type',

    /**
     * Returns the type of the sub-view.
     * @readonly
     * @type {String}
     */
    get: function () {
      return this._type;
    }
  }, {
    key: 'getValue',

    /**
     * Gets the value of one of the attributes.
     *
     * @param {String|Attribute} attr Attribute name (e.g. 'right', 'centerY', Attribute.TOP).
     * @return {Number} value or `undefined`
     */
    value: function getValue(attr) {
      return this._attr[attr] ? this._attr[attr].value() : undefined;
    }
  }, {
    key: '_getAttr',

    /**
     * @private
     */
    value: function _getAttr(attr) {
      if (this._attr[attr]) {
        return this._attr[attr];
      }
      this._attr[attr] = false ? new c.Variable() : new kiwi.Variable();
      switch (attr) {
        case Attribute.RIGHT:
          this._getAttr(Attribute.LEFT);
          this._getAttr(Attribute.WIDTH);
          if (false) {
            this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.LEFT], this._attr[Attribute.WIDTH])));
          } else {
            this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.LEFT].plus(this._attr[Attribute.WIDTH])));
          }
          break;
        case Attribute.BOTTOM:
          this._getAttr(Attribute.TOP);
          this._getAttr(Attribute.HEIGHT);
          if (false) {
            this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.TOP], this._attr[Attribute.HEIGHT])));
          } else {
            this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.TOP].plus(this._attr[Attribute.HEIGHT])));
          }
          break;
        case Attribute.CENTERX:
          this._getAttr(Attribute.LEFT);
          this._getAttr(Attribute.WIDTH);
          if (false) {
            this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.LEFT], c.divide(this._attr[Attribute.WIDTH], 2))));
          } else {
            this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.LEFT].plus(this._attr[Attribute.WIDTH].divide(2))));
          }
          break;
        case Attribute.CENTERY:
          this._getAttr(Attribute.TOP);
          this._getAttr(Attribute.HEIGHT);
          if (false) {
            this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.TOP], c.divide(this._attr[Attribute.HEIGHT], 2))));
          } else {
            this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.TOP].plus(this._attr[Attribute.HEIGHT].divide(2))));
          }
          break;
      }
      if (!false) {
        this._solver.updateVariables();
      }
      return this._attr[attr];
    }
  }, {
    key: '_getAttrValue',

    /**
     * @private
     */
    value: function _getAttrValue(attr) {
      if (false) {
        return this._getAttr(attr).value;
      } else {
        return this._getAttr(attr).value();
      }
    }
  }]);

  return SubView;
})();

var defaultPriorityStrength = false ? new c.Strength('defaultPriority', 0, 1000, 1000) : kiwi.Strength.create(0, 1000, 1000);

function _getConst(name, value) {
  if (false) {
    var vr = new c.Variable({ value: value });
    this._solver.addConstraint(new c.StayConstraint(vr, c.Strength.required, 0));
    return vr;
  } else {
    var vr = new kiwi.Variable();
    this._solver.addConstraint(new kiwi.Constraint(vr, kiwi.Operator.Eq, value));
    return vr;
  }
}

function _getSubView(viewName) {
  if (!viewName) {
    return this._parentSubView;
  } else if (viewName.name) {
    this._subViews[viewName.name] = this._subViews[viewName.name] || new SubView({
      name: viewName.name,
      solver: this._solver
    });
    this._subViews[viewName.name]._type = this._subViews[viewName.name]._type || viewName.type;
    return this._subViews[viewName.name];
  } else {
    this._subViews[viewName] = this._subViews[viewName] || new SubView({
      name: viewName,
      solver: this._solver
    });
    return this._subViews[viewName];
  }
}

function _getSpacing(constraint) {
  var index = 4;
  if (!constraint.view1 && constraint.attr1 === 'left') {
    index = 3;
  } else if (!constraint.view1 && constraint.attr1 === 'top') {
    index = 0;
  } else if (!constraint.view2 && constraint.attr2 === 'right') {
    index = 1;
  } else if (!constraint.view2 && constraint.attr2 === 'bottom') {
    index = 2;
  } else {
    switch (constraint.attr1) {
      case 'left':
      case 'right':
      case 'centerX':
      case 'leading':
      case 'trailing':
        index = 4;
        break;
      case 'zIndex':
        index = 6;
        break;
      default:
        index = 5;
    }
  }
  this._spacingVars = this._spacingVars || new Array(7);
  this._spacingExpr = this._spacingExpr || new Array(7);
  if (!this._spacingVars[index]) {
    if (false) {
      this._spacingVars[index] = new c.Variable();
      this._solver.addEditVar(this._spacingVars[index]);
      this._spacingExpr[index] = c.minus(0, this._spacingVars[index]);
    } else {
      this._spacingVars[index] = new kiwi.Variable();
      this._solver.addEditVariable(this._spacingVars[index], kiwi.Strength.create(999, 1000, 1000));
      this._spacingExpr[index] = this._spacingVars[index].multiply(-1);
    }
    this._solver.suggestValue(this._spacingVars[index], this._spacing[index]);
  }
  return this._spacingExpr[index];
}

function _addConstraint(constraint) {
  //this.constraints.push(constraint);
  var relation = undefined;
  var multiplier = constraint.multiplier !== undefined ? constraint.multiplier : 1;
  var constant = constraint.constant !== undefined ? constraint.constant : 0;
  if (constant === 'default') {
    constant = _getSpacing.call(this, constraint);
  }
  var attr1 = _getSubView.call(this, constraint.view1)._getAttr(constraint.attr1);
  var attr2 = undefined;
  if (false) {
    if (constraint.attr2 === Attribute.CONST) {
      attr2 = _getConst.call(this, undefined, constraint.constant);
    } else {
      attr2 = _getSubView.call(this, constraint.view2)._getAttr(constraint.attr2);
      if (multiplier !== 1 && constant) {
        attr2 = c.plus(c.times(attr2, multiplier), constant);
      } else if (constant) {
        attr2 = c.plus(attr2, constant);
      } else if (multiplier !== 1) {
        attr2 = c.times(attr2, multiplier);
      }
    }
    var strength = constraint.priority !== undefined && constraint.priority < 1000 ? new c.Strength('priority', 0, constraint.priority, 1000) : defaultPriorityStrength;
    switch (constraint.relation) {
      case Relation.EQU:
        relation = new c.Equation(attr1, attr2, strength);
        break;
      case Relation.GEQ:
        relation = new c.Inequality(attr1, c.GEQ, attr2, strength);
        break;
      case Relation.LEQ:
        relation = new c.Inequality(attr1, c.LEQ, attr2, strength);
        break;
      default:
        throw 'Invalid relation specified: ' + constraint.relation;
    }
  } else {
    if (constraint.attr2 === Attribute.CONST) {
      attr2 = _getConst.call(this, undefined, constraint.constant);
    } else {
      attr2 = _getSubView.call(this, constraint.view2)._getAttr(constraint.attr2);
      if (multiplier !== 1 && constant) {
        attr2 = attr2.multiply(multiplier).plus(constant);
      } else if (constant) {
        attr2 = attr2.plus(constant);
      } else if (multiplier !== 1) {
        attr2 = attr2.multiply(multiplier);
      }
    }
    var strength = constraint.priority !== undefined && constraint.priority < 1000 ? kiwi.Strength.create(0, constraint.priority, 1000) : defaultPriorityStrength;
    switch (constraint.relation) {
      case Relation.EQU:
        relation = new kiwi.Constraint(attr1, kiwi.Operator.Eq, attr2, strength);
        break;
      case Relation.GEQ:
        relation = new kiwi.Constraint(attr1, kiwi.Operator.Ge, attr2, strength);
        break;
      case Relation.LEQ:
        relation = new kiwi.Constraint(attr1, kiwi.Operator.Le, attr2, strength);
        break;
      default:
        throw 'Invalid relation specified: ' + constraint.relation;
    }
  }
  this._solver.addConstraint(relation);
}

function _compareSpacing(old, newz) {
  if (old === newz) {
    return true;
  }
  if (!old || !newz) {
    return false;
  }
  for (var i = 0; i < 7; i++) {
    if (old[i] !== newz[i]) {
      return false;
    }
  }
  return true;
}

/**
 * AutoLayoutJS API reference.
 *
 * ### Index
 *
 * |Entity|Type|Description|
 * |---|---|---|
 * |[AutoLayout](#autolayout)|`namespace`|Top level AutoLayout object.|
 * |[VisualFormat](#autolayoutvisualformat--object)|`namespace`|Parses VFL into constraints.|
 * |[View](#autolayoutview)|`class`|Main entity for adding & evaluating constraints.|
 * |[SubView](#autolayoutsubview--object)|`class`|SubView's are automatically created when constraints are added to views. They give access to the evaluated results.|
 * |[Attribute](#autolayoutattribute--enum)|`enum`|Attribute types that are supported when adding constraints.|
 * |[Relation](#autolayoutrelation--enum)|`enum`|Relationship types that are supported when adding constraints.|
 * |[Priority](#autolayoutpriority--enum)|`enum`|Default priority values for when adding constraints.|
 *
 * ### AutoLayout
 *
 * @module AutoLayout
 */

var View = (function () {

  /**
   * @class View
   * @param {Object} [options] Configuration options.
   * @param {Number} [options.width] Initial width of the view.
   * @param {Number} [options.height] Initial height of the view.
   * @param {Number|Object} [options.spacing] Spacing for the view (default: 8) (see `setSpacing`).
   * @param {Array} [options.constraints] One or more constraint definitions (see `addConstraints`).
   */

  function View(options) {
    _classCallCheck(this, View);

    this._solver = false ? new c.SimplexSolver() : new kiwi.Solver();
    this._subViews = {};
    //this._spacing = undefined;
    this._parentSubView = new SubView({
      solver: this._solver
    });
    this.setSpacing(options && options.spacing !== undefined ? options.spacing : 8);
    //this.constraints = [];
    if (options) {
      if (options.width !== undefined || options.height !== undefined) {
        this.setSize(options.width, options.height);
      }
      if (options.constraints) {
        this.addConstraints(options.constraints);
      }
    }
  }

  _createClass(View, [{
    key: 'setSize',

    /**
     * Sets the width and height of the view.
     *
     * @param {Number} width Width of the view.
     * @param {Number} height Height of the view.
     * @return {View} this
     */
    value: function setSize(width, height /*, depth*/) {
      this._parentSubView.intrinsicWidth = width;
      this._parentSubView.intrinsicHeight = height;
      return this;
    }
  }, {
    key: 'width',

    /**
     * Width that was set using `setSize`.
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._parentSubView.intrinsicWidth;
    }
  }, {
    key: 'height',

    /**
     * Height that was set using `setSize`.
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._parentSubView.intrinsicHeight;
    }
  }, {
    key: 'fittingWidth',

    /**
     * Width that is calculated from the constraints and the `.intrinsicWidth` of
     * the sub-views.
     *
     * When the width has been explicitely set using `setSize`, the fittingWidth
     * will **always** be the same as the explicitely set width. To calculate the size
     * based on the content, use:
     * ```javascript
     * var view = new AutoLayout.View({
     *   constraints: VisualFormat.parse('|-[view1]-[view2]-'),
     *   spacing: 20
     * });
     * view.subViews.view1.intrinsicWidth = 100;
     * view.subViews.view2.intrinsicWidth = 100;
     * console.log('fittingWidth: ' + view.fittingWidth); // 260
     * ```
     *
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._parentSubView.width;
    }
  }, {
    key: 'fittingHeight',

    /**
     * Height that is calculated from the constraints and the `.intrinsicHeight` of
     * the sub-views.
     *
     * See `.fittingWidth`.
     *
     * @readonly
     * @type {Number}
     */
    get: function () {
      return this._parentSubView.height;
    }
  }, {
    key: 'setSpacing',

    /**
     * Sets the spacing for the view.
     *
     * The spacing can be set for 7 different variables:
     * `top`, `right`, `bottom`, `left`, `width`, `height` and `zIndex`. The `left`-spacing is
     * used when a spacer is used between the parent-view and a sub-view (e.g. `|-[subView]`).
     * The same is true for the `right`, `top` and `bottom` spacers. The `width` and `height` are
     * used for spacers in between sub-views (e.g. `[view1]-[view2]`).
     *
     * Instead of using the full spacing syntax, it is also possible to use shorthand notations:
     *
     * |Syntax|Type|Description|
     * |---|---|---|
     * |`[top, right, bottom, left, width, height, zIndex]`|Array(7)|Full syntax including z-index **(clockwise order)**.|
     * |`[top, right, bottom, left, width, height]`|Array(6)|Full horizontal & vertical spacing syntax (no z-index) **(clockwise order)**.|
     * |`[horizontal, vertical, zIndex]`|Array(3)|Horizontal = left, right, width, vertical = top, bottom, height.|
     * |`[horizontal, vertical]`|Array(2)|Horizontal = left, right, width, vertical = top, bottom, height, z-index = 1.|
     * |`spacing`|Number|Horizontal & vertical spacing are all the same, z-index = 1.|
     *
     * Examples:
     * ```javascript
     * view.setSpacing(10); // horizontal & vertical spacing 10
     * view.setSpacing([10, 15, 2]); // horizontal spacing 10, vertical spacing 15, z-axis spacing 2
     * view.setSpacing([10, 20, 10, 20, 5, 5]); // top, right, bottom, left, horizontal, vertical
     * view.setSpacing([10, 20, 10, 20, 5, 5, 1]); // top, right, bottom, left, horizontal, vertical, z
     * ```
     *
     * @param {Number|Array} spacing
     * @return {View} this
     */
    value: function setSpacing(spacing) {
      // convert spacing into array: [top, right, bottom, left, horz, vert, z-index]
      switch (Array.isArray(spacing) ? spacing.length : -1) {
        case -1:
          spacing = [spacing, spacing, spacing, spacing, spacing, spacing, 1];break;
        case 1:
          spacing = [spacing[0], spacing[0], spacing[0], spacing[0], spacing[0], spacing[0], 1];break;
        case 2:
          spacing = [spacing[1], spacing[0], spacing[1], spacing[0], spacing[0], spacing[1], 1];break;
        case 3:
          spacing = [spacing[1], spacing[0], spacing[1], spacing[0], spacing[0], spacing[1], spacing[2]];break;
        case 6:
          spacing = [spacing[0], spacing[1], spacing[2], spacing[3], spacing[4], spacing[5], 1];break;
        case 7:
          break;
        default:
          throw 'Invalid spacing syntax';
      }
      if (!_compareSpacing(this._spacing, spacing)) {
        this._spacing = spacing;
        // update spacing variables
        if (this._spacingVars) {
          for (var i = 0; i < this._spacingVars.length; i++) {
            if (this._spacingVars[i]) {
              this._solver.suggestValue(this._spacingVars[i], this._spacing[i]);
            }
          }
          if (false) {
            this._solver.resolve();
          } else {
            this._solver.updateVariables();
          }
        }
      }
      return this;
    }
  }, {
    key: 'addConstraint',

    /**
     * Adds a constraint definition.
     *
     * A constraint definition has the following format:
     *
     * ```javascript
     * constraint: {
     *   view1: {String},
     *   attr1: {AutoLayout.Attribute},
     *   relation: {AutoLayout.Relation},
     *   view2: {String},
     *   attr2: {AutoLayout.Attribute},
     *   multiplier: {Number},
     *   constant: {Number},
     *   priority: {Number}(0..1000)
     * }
     * ```
     * @param {Object} constraint Constraint definition.
     * @return {View} this
     */
    value: function addConstraint(constraint) {
      _addConstraint.call(this, constraint);
      if (!false) {
        this._solver.updateVariables();
      }
      return this;
    }
  }, {
    key: 'addConstraints',

    /**
     * Adds one or more constraint definitions.
     *
     * A constraint definition has the following format:
     *
     * ```javascript
     * constraint: {
     *   view1: {String},
     *   attr1: {AutoLayout.Attribute},
     *   relation: {AutoLayout.Relation},
     *   view2: {String},
     *   attr2: {AutoLayout.Attribute},
     *   multiplier: {Number},
     *   constant: {Number},
     *   priority: {Number}(0..1000)
     * }
     * ```
     * @param {Array} constraints One or more constraint definitions.
     * @return {View} this
     */
    value: function addConstraints(constraints) {
      for (var j = 0; j < constraints.length; j++) {
        _addConstraint.call(this, constraints[j]);
      }
      if (!false) {
        this._solver.updateVariables();
      }
      return this;
    }
  }, {
    key: 'subViews',

    /**
     * Dictionary of `SubView` objects that have been created when adding constraints.
     * @readonly
     * @type {Object.SubView}
     */
    get: function () {
      return this._subViews;
    }

    /**
     * Checks whether the constraints incompletely specify the location
     * of the subViews.
     * @private
     */
    //get hasAmbiguousLayout() {
    // Todo
    //}

  }]);

  return View;
})();

var AutoLayout = {
  Attribute: Attribute,
  Relation: Relation,
  Priority: Priority,
  VisualFormat: VisualFormat,
  View: View,
  SubView: SubView
  //DOM: DOM
};

module.exports = AutoLayout;

},{"kiwi/ts/bin/kiwi":1}]},{},[2])(2)
});
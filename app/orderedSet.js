function binarySearch(arr, el, cmp) {
    var low = 0, high = arr.length;
    while (low < high) {
        var mid = (low + high) >> 1;
        var compareResult = cmp(el, arr[mid]);
        if (compareResult < 0) {
            high = mid;
        } else if (compareResult > 0) {
            low = mid + 1;
        } else {
            return mid;
        }
    }
    return low;
}

function OrderedSet(ordering) {
    if (arguments.length === 0) {
        this._orderFn = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
        };
        this._equalityFn = function(a, b) {
            return a === b;
        };
    } else {
        this._orderFn = ordering.compare;
        this._equalityFn = ordering.equals;
    }
    this._elements = [];
}

OrderedSet.prototype.add = function(el) {
    if (!this.tryAdd(el)) {
        throw new Error("Element " + el + " was already a member of the set");
    }
};

OrderedSet.prototype.tryAdd = function(el) {
    var idx = binarySearch(this._elements, el, this._orderFn);
    if (idx === this._elements.length) {
        this._elements.push(el);
        return true;
    } else if (this._equalityFn(this._elements[idx], el)) {
        return false;
    } else {
        this._elements.splice(idx, 0, el);
        return true;
    }
};

OrderedSet.prototype.contains = function(el) {
    var idx = binarySearch(this._elements, el, this._orderFn);
    if (idx === this._elements.length) {
        return false;
    } else {
        return this._equalityFn(this._elements[idx], el);
    }
};

OrderedSet.prototype.tryRemove = function(el) {
    var idx = binarySearch(this._elements, el, this._orderFn);
    if (idx === this._elements.length) {
        return false;
    } else if (this._equalityFn(this._elements[idx], el)) {
        this._elements.splice(idx, 1);
        return true;
    } else {
        return false;
    }
};

OrderedSet.prototype.remove = function(el) {
    if (!this.tryRemove(el)) {
        throw new Error("Element " + el + " is not in the set");
    }
};

OrderedSet.prototype.clone = function() {
    var result = new OrderedSet();
    result._orderDn = this._orderFn;
    result._elements = this._elements.slice();
    return result;
};
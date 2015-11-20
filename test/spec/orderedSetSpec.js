describe("binarySearch", function() {
  function identityCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  it("returns 0 when run on an empty array", function() {
    expect(binarySearch([], 0, identityCompare)).toBe(0);
  });

  describe("edge cases", function() {
    it("finds the insertion index before a one-element array", function() {
      expect(binarySearch([5], 0, identityCompare)).toBe(0);
    });

    it("finds the item index in a one-element array", function() {
      expect(binarySearch([5], 5, identityCompare)).toBe(0);
    });

    it("finds the insertion index after a one-element array", function() {
      expect(binarySearch([5], 7, identityCompare)).toBe(1);
    });

    it("finds the insertion index before a two-element array", function() {
      expect(binarySearch([3, 8], 0, identityCompare)).toBe(0);
    });

    it("finds the first item index in a two-element array", function() {
      expect(binarySearch([3, 8], 3, identityCompare)).toBe(0);
    });

    it("finds the insertion index between elements in a two-element array", function() {
      expect(binarySearch([3, 8], 5, identityCompare)).toBe(1);
    });

    it("finds the second item index in a two-element array", function() {
      expect(binarySearch([3, 8], 8, identityCompare)).toBe(1);
    });

    it("finds the insertion index after a two-element array", function() {
      expect(binarySearch([3, 8], 10, identityCompare)).toBe(2);
    });
  });

  it("returns the index of the specific item", function() {
    expect(binarySearch([10, 11, 12, 13, 14, 15], 12, identityCompare)).toBe(2);
  });

  it("returns the index of the next-larger item when the item is not found", function() {
    expect(binarySearch([10, 11, 12, 13, 14, 15], 13.5, identityCompare)).toBe(4);
  });

  it("returns 0 if the item is smaller than all", function() {
    expect(binarySearch([10, 11, 12, 13, 14, 15], 18, identityCompare)).toBe(6);
  });

  it("returns the array's length if the item is larger than all", function() {
    expect(binarySearch([10, 11, 12, 13, 14, 15], 18, identityCompare)).toBe(6);
  });
});

describe("OrderedSet", function() {
  var os;

  beforeEach(function() {
    os = new OrderedSet();
  });

  it("starts empty", function() {
    expect(os.contains(1)).toBe(false);
  });

  it("allows items to be added", function() {
    os.add(1);
    expect(os.contains(1)).toBe(true);
    expect(os.contains(2)).toBe(false);
  });

  it("throws if the same item is added twice", function() {
    os.add(1);
    expect(function() {
      os.add(1);
    }).toThrow();
  });

  it("allows existing items to be added without throwing", function() {
    expect(os.tryAdd(1)).toBe(true);
    expect(os.contains(1)).toBe(true);
    expect(os.tryAdd(1)).toBe(false);
  });

  it("allows items to be removed", function() {
    os.add(1);
    os.add(2);
    os.remove(1);
    expect(os.contains(1)).toBe(false);
    expect(os.contains(2)).toBe(true);
  });

  it("allows items to be removed without throwing", function() {
    os.add(1);
    expect(os.tryRemove(1)).toBe(true);
    expect(os.contains(1)).toBe(false);
    expect(os.tryRemove(1)).toBe(false);
  });

  describe("alternate_ordering", function() {
    var ordering = {
      compare: function(a, b) {
        return a[0] < b[0] ? -1 :
            a[0] > b[0] ? 1 :
                a[1] < b[1] ? -1 :
                    a[1] > b[1] ? 1 :
                        0
      },
      equals: function(a, b) {
        return a[0] === b[0] && a[1] === b[1];
      }
    };

    beforeEach(function() {
      os = new OrderedSet(ordering);
    });

    it("finds the element using the ordering object", function() {
      os.add([1, 2]);
      os.add([3, 4]);
      expect(os.contains([1, 2])).toBe(true);
      expect(os.contains([1, 1])).toBe(false);
      expect(os.contains([2, 1])).toBe(false);
      expect(os.contains([2, 2])).toBe(false);
      expect(os.contains([3, 4])).toBe(true);
    });
  })
});


var _f = collection_functions_module();

describe('every', function() {
   
    var users = [
    { 'user': 'barney', 'age': 36, 'active': false },
    { 'user': 'fred',   'age': 40, 'active': false }
    ];

    it('it should work with array and string that indicates a type', () => {
        expect(_f.every([true, 1, null, 'yes'], String)).toEqual(true);
    });

    it('it thinks that empty array is always true', () => {
        expect(_f.every([], Boolean)).toEqual(true);
    });

    it('it should work with array of numbers and function', () => {
        expect(_f.every([3,6,9,12], (num) => num % 3 === 0)).toEqual(true);
    });
 
    it('it should work with array of strings and function', () => {
        expect(_f.every(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(false);
    });

    it('it should work with array of objects and function', () => {
        expect(_f.every(users, (o) => o.active)).toEqual(false);                                                                  
    });

    it('it should work with an object and function', () => {
        let ob = {price_before: 0.75, price: 0.99, sale_price: 0.55};
        expect(_f.every(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual(true);                                                                   
    });

    it('it should work with array of objects and an object', () => {
        expect(_f.every(users,  { 'user': 'barney', 'active': false })).toEqual(false);                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(_f.every(users, ['active', false])).toEqual(true);                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(_f.every(users, 'active')).toEqual(false);                                                                   
    });

});


describe('filter', function() {
    let fruits = [
        { "name": "apple", "price": 0.99, "onSale": true },
        { "name": "orange", "price": 1.99, "onSale": false },
        { "name": "passion fruit", "price": 4.99, "onSale": false }
    ];

    var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false }
    ];

    it('it should work with array of numbers and function', () => {
        expect(_f.filter([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([3,6,9,12]);
    });
 
    it('it should work with array of strings and function', () => {
        expect(_f.filter(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(["CD-1234", "CD-2345", "CD-3456"]);
    });

    it('it should work with array of objects and function', () => {
        expect(_f.filter(fruits, (fruit) => fruit.onSale === true)).toEqual([{name: 'apple',price: 0.99,onSale: true }]);
                                                                        
    });

    it('it should work with an object and function', () => {
        let ob = {name: 'apple',price: 0.99,onSale: true};
        expect(_f.filter(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual([0.99]);
                                                                        
    });

    it('it should work with array of objects and an object', () => {
        expect(_f.filter(users, { 'age': 36, 'active': true })).toEqual([{ 'user': 'barney', 'age': 36, 'active': true }]);
                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(_f.filter(users, ['active', false])).toEqual([{ 'user': 'fred',   'age': 40, 'active': false }]);
                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(_f.filter(users, 'active')).toEqual([ { 'user': 'barney', 'age': 36, 'active': true }]);
                                                                        
    });

});

describe('partition', function() {
    var users = [
        { 'user': 'barney',  'age': 36, 'active': false },
        { 'user': 'fred',    'age': 40, 'active': true },
        { 'user': 'pebbles', 'age': 1,  'active': false }
    ];
    it('it should work with array of numbers and function', () => {
        expect(_f.partition([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([[3,6,9,12],[1,2,4,5,7,8,10,11]]);
    });
 
    it('it should work with array of strings and function', () => {
        expect(_f.partition(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual([["CD-1234", "CD-2345", "CD-3456"],["NN-noid", "NN-1234", "NN-2345", "NN-3456"]]);
    });

    it('it should work with array of objects and function', () => {
        expect(_f.partition(users, (o) => o.active)).toEqual([[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false },{ 'user': 'pebbles', 'age': 1,  'active': false }]]);
                                                                        
    });

    it('it should work with an object and function', () => {
        let ob = {name: 'apple',price: 0.99,onSale: true};
        expect(_f.partition(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual([[0.99],['apple', true]]);
                                                                        
    });

    it('it should work with array of objects and an object', () => {
        expect(_f.partition(users,  { 'age': 1, 'active': false })).toEqual([[{ 'user': 'pebbles', 'age': 1,  'active': false }],[ { 'user': 'barney',  'age': 36, 'active': false },{ 'user': 'fred',    'age': 40, 'active': true }]]);
                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(_f.partition(users, ['active', false])).toEqual([[{ 'user': 'barney',  'age': 36, 'active': false },{ 'user': 'pebbles', 'age': 1,  'active': false }],[{ 'user': 'fred',   'age': 40, 'active': true }]]);
                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(_f.partition(users, 'active')).toEqual([[{ 'user': 'fred', 'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }, { 'user': 'pebbles', 'age': 1,  'active': false }]]);
                                                                        
    });

});

describe('rejct', function() {
    var users = [
      { 'user': 'barney', 'age': 36, 'active': false },
      { 'user': 'fred',   'age': 40, 'active': true }
    ];

    it('it should work with array of numbers and function', () => {
        expect(_f.reject([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([1,2,4,5,7,8,10,11]);
    });
 
    it('it should work with array of strings and function', () => {
        expect(_f.reject(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(["NN-noid", "NN-1234", "NN-2345", "NN-3456"]);
    });

    it('it should work with array of objects and function', () => {
        expect(_f.reject(users, (o) => !o.active)).toEqual([{ 'user': 'fred',   'age': 40, 'active': true }]);
                                                                        
    });

    it('it should work with an object and function', () => {
        let ob = {name: 'apple',price: 0.99,onSale: true};
        expect(_f.reject(ob, (val) => {return val < 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual(['apple', 0.99, true]);
                                                                        
    });

    it('it should work with array of objects and an object', () => {
        expect(_f.reject(users,  { 'age': 40, 'active': true })).toEqual([{ 'user': 'barney', 'age': 36, 'active':  false  }]);
                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(_f.reject(users, ['active', false])).toEqual([{ 'user': 'fred',   'age': 40, 'active': true }]);
                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(_f.reject(users, 'kids')).toEqual([{ 'user': 'barney', 'age': 36, 'active': false },{ 'user': 'fred',   'age': 40, 'active': true }]);
                                                                        
    });

});

describe('some', function() {
    var users = [
      { 'user': 'barney', 'active': true },
      { 'user': 'fred',   'active': false }
    ];

    it('it should work with array and string that indicates a type', () => {
        expect(_f.some([null, 0, 'yes', false], Boolean)).toEqual(true);
    });

    it('it should work with array of numbers and function', () => {
        expect(_f.some([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual(true);
    });
 
    it('it should work with array of strings and function', () => {
        expect(_f.some(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(true);
    });

    it('it should work with array of objects and function', () => {
        expect(_f.some(users, (o) => o.active)).toEqual(true);                                                                  
    });

    it('it should work with an object and function', () => {
        let ob = {price_before: 0.75, price: 0.99, sale_price: 0.55};
        expect(_f.some(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual(true);                                                                   
    });

    it('it should work with array of objects and an object', () => {
        expect(_f.some(users,  { 'user': 'barney', 'active': false })).toEqual(false);                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(_f.some(users, ['active', false])).toEqual(true);                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(_f.some(users, 'active')).toEqual(true);                                                                   
    });

});
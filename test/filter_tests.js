describe('filter', function() {
    let fruits = [
        {
            "name": "apple",
            "price": 0.99,
            "onSale": true
        },
        {
            "name": "orange",
            "price": 1.99,
            "onSale": false
        },
        {
            "name": "passion fruit",
            "price": 4.99,
            "onSale": false
        }
    ];

    it('it should works with array of numbers', () => {
        expect(filter([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([3,6,9,12]);
    });
 
    it('it should works with array of strings', () => {
        expect(filter(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {
                                                                        let exp = new RegExp("^CD-");
                                                                        return exp.test(str);
                                                                    })).toEqual(["CD-1234", "CD-2345", "CD-3456"]);
    });

    it('it should works with array of objects', () => {
        expect(filter(fruits, (fruit) => fruit.onSale === true)).toEqual([
                                                                        {
                                                                            name: 'apple',
                                                                            price: 0.99,
                                                                            onSale: true
                                                                        }]);
                                                                        
    });
});

describe('filter2', function() {
    let fruits = [
        {
            "name": "apple",
            "price": 0.99,
            "onSale": true
        },
        {
            "name": "orange",
            "price": 1.99,
            "onSale": false
        },
        {
            "name": "passion fruit",
            "price": 4.99,
            "onSale": false
        }
    ];

    var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false }
    ];

    it('it should works with array of numbers', () => {
        expect(filter2([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([3,6,9,12]);
    });
 
    it('it should works with array of strings', () => {
        expect(filter2(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(["CD-1234", "CD-2345", "CD-3456"]);
    });

    it('it should works with array of objects', () => {
        expect(filter2(fruits, (fruit) => fruit.onSale === true)).toEqual([{name: 'apple',price: 0.99,onSale: true }]);
                                                                        
    });

    it('it should works with an object', () => {
        let ob = {name: 'apple',price: 0.99,onSale: true};
        expect(filter2(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual([0.99]);
                                                                        
    });
});

describe('filter3', function() {
    let fruits = [
        {
            "name": "apple",
            "price": 0.99,
            "onSale": true
        },
        {
            "name": "orange",
            "price": 1.99,
            "onSale": false
        },
        {
            "name": "passion fruit",
            "price": 4.99,
            "onSale": false
        }
    ];

    var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false }
    ];

    it('it should work with array of numbers and function', () => {
        expect(filter3([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([3,6,9,12]);
    });
 
    it('it should work with array of strings and function', () => {
        expect(filter3(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(["CD-1234", "CD-2345", "CD-3456"]);
    });

    it('it should work with array of objects and function', () => {
        expect(filter3(fruits, (fruit) => fruit.onSale === true)).toEqual([{name: 'apple',price: 0.99,onSale: true }]);
                                                                        
    });

    it('it should work with an object and function', () => {
        let ob = {name: 'apple',price: 0.99,onSale: true};
        expect(filter3(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual([0.99]);
                                                                        
    });

    it('it should work with array of objects and an object', () => {
        expect(filter3(users, { 'age': 36, 'active': true })).toEqual([{ 'user': 'barney', 'age': 36, 'active': true }]);
                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(filter3(users, ['active', false])).toEqual([{ 'user': 'fred',   'age': 40, 'active': false }]);
                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(filter3(users, 'active')).toEqual([ { 'user': 'barney', 'age': 36, 'active': true }]);
                                                                        
    });

});
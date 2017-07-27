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
        expect(filter([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([3,6,9,12]);
    });
 
    it('it should work with array of strings and function', () => {
        expect(filter(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(["CD-1234", "CD-2345", "CD-3456"]);
    });

    it('it should work with array of objects and function', () => {
        expect(filter(fruits, (fruit) => fruit.onSale === true)).toEqual([{name: 'apple',price: 0.99,onSale: true }]);
                                                                        
    });

    it('it should work with an object and function', () => {
        let ob = {name: 'apple',price: 0.99,onSale: true};
        expect(filter(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual([0.99]);
                                                                        
    });

    it('it should work with array of objects and an object', () => {
        expect(filter(users, { 'age': 36, 'active': true })).toEqual([{ 'user': 'barney', 'age': 36, 'active': true }]);
                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(filter(users, ['active', false])).toEqual([{ 'user': 'fred',   'age': 40, 'active': false }]);
                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(filter(users, 'active')).toEqual([ { 'user': 'barney', 'age': 36, 'active': true }]);
                                                                        
    });

});
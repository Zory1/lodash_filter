describe('reject', function() {
    var users = [
      { 'user': 'barney', 'age': 36, 'active': false },
      { 'user': 'fred',   'age': 40, 'active': true }
    ];

    it('it should work with array of numbers and function', () => {
        expect(reject([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([1,2,4,5,7,8,10,11]);
    });
 
    it('it should work with array of strings and function', () => {
        expect(reject(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(["NN-noid", "NN-1234", "NN-2345", "NN-3456"]);
    });

    it('it should work with array of objects and function', () => {
        expect(reject(users, (o) => !o.active)).toEqual([{ 'user': 'fred',   'age': 40, 'active': true }]);
                                                                        
    });

    it('it should work with an object and function', () => {
        let ob = {name: 'apple',price: 0.99,onSale: true};
        expect(reject(ob, (val) => {return val < 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual(['apple', 0.99, true]);
                                                                        
    });

    it('it should work with array of objects and an object', () => {
        expect(reject(users,  { 'age': 40, 'active': true })).toEqual([{ 'user': 'barney', 'age': 36, 'active':  false  }]);
                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(reject(users, ['active', false])).toEqual([{ 'user': 'fred',   'age': 40, 'active': true }]);
                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(reject(users, 'kids')).toEqual([{ 'user': 'barney', 'age': 36, 'active': false },{ 'user': 'fred',   'age': 40, 'active': true }]);
                                                                        
    });

});
describe('some', function() {
    var users = [
      { 'user': 'barney', 'active': true },
      { 'user': 'fred',   'active': false }
    ];

    it('it should work with array and string that indicates a type', () => {
        expect(some([null, 0, 'yes', false], Boolean)).toEqual(true);
    });

    it('it should work with array of numbers and function', () => {
        expect(some([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual(true);
    });
 
    it('it should work with array of strings and function', () => {
        expect(some(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(true);
    });

    it('it should work with array of objects and function', () => {
        expect(some(users, (o) => o.active)).toEqual(true);                                                                  
    });

    it('it should work with an object and function', () => {
        let ob = {price_before: 0.75, price: 0.99, sale_price: 0.55};
        expect(some(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual(true);                                                                   
    });

    it('it should work with array of objects and an object', () => {
        expect(some(users,  { 'user': 'barney', 'active': false })).toEqual(false);                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(some(users, ['active', false])).toEqual(true);                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(some(users, 'active')).toEqual(true);                                                                   
    });

});
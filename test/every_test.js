describe('every', function() {
    var users = [
    { 'user': 'barney', 'age': 36, 'active': false },
    { 'user': 'fred',   'age': 40, 'active': false }
    ];

    it('it should work with array and string that indicates a type', () => {
        expect(every([true, 1, null, 'yes'], String)).toEqual(true);
    });

    it('it thinks that empty array is always true', () => {
        expect(every([], Boolean)).toEqual(true);
    });

    it('it should work with array of numbers and function', () => {
        expect(every([3,6,9,12], (num) => num % 3 === 0)).toEqual(true);
    });
 
    it('it should work with array of strings and function', () => {
        expect(every(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual(false);
    });

    it('it should work with array of objects and function', () => {
        expect(every(users, (o) => o.active)).toEqual(false);                                                                  
    });

    it('it should work with an object and function', () => {
        let ob = {price_before: 0.75, price: 0.99, sale_price: 0.55};
        expect(every(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual(true);                                                                   
    });

    it('it should work with array of objects and an object', () => {
        expect(every(users,  { 'user': 'barney', 'active': false })).toEqual(false);                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(every(users, ['active', false])).toEqual(true);                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(every(users, 'active')).toEqual(false);                                                                   
    });

});
describe('partition', function() {
    var users = [
        { 'user': 'barney',  'age': 36, 'active': false },
        { 'user': 'fred',    'age': 40, 'active': true },
        { 'user': 'pebbles', 'age': 1,  'active': false }
    ];
    it('it should work with array of numbers and function', () => {
        expect(partition([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([[3,6,9,12],[1,2,4,5,7,8,10,11]]);
    });
 
    it('it should work with array of strings and function', () => {
        expect(partition(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {let exp = new RegExp("^CD-");return exp.test(str);})).toEqual([["CD-1234", "CD-2345", "CD-3456"],["NN-noid", "NN-1234", "NN-2345", "NN-3456"]]);
    });

    it('it should work with array of objects and function', () => {
        expect(partition(users, (o) => o.active)).toEqual([[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false },{ 'user': 'pebbles', 'age': 1,  'active': false }]]);
                                                                        
    });

    it('it should work with an object and function', () => {
        let ob = {name: 'apple',price: 0.99,onSale: true};
        expect(partition(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual([[0.99],['apple', true]]);
                                                                        
    });

    it('it should work with array of objects and an object', () => {
        expect(partition(users,  { 'age': 1, 'active': false })).toEqual([[{ 'user': 'pebbles', 'age': 1,  'active': false }],[ { 'user': 'barney',  'age': 36, 'active': false },{ 'user': 'fred',    'age': 40, 'active': true }]]);
                                                                        
    });

    it('it should work with array of objects and an array', () => {
        expect(partition(users, ['active', false])).toEqual([[{ 'user': 'barney',  'age': 36, 'active': false },{ 'user': 'pebbles', 'age': 1,  'active': false }],[{ 'user': 'fred',   'age': 40, 'active': true }]]);
                                                                        
    });

    it('it should work with array of objects and a string', () => {
        expect(partition(users, 'active')).toEqual([[{ 'user': 'fred', 'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }, { 'user': 'pebbles', 'age': 1,  'active': false }]]);
                                                                        
    });

});
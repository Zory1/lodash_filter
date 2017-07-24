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

    it('it should works with array of numbers', () => {
        expect(filter2([1,2,3,4,5,6,7,8,9,10,11,12], (num) => num % 3 === 0)).toEqual([3,6,9,12]);
    });
 
    it('it should works with array of strings', () => {
        expect(filter2(["CD-1234", "CD-2345", "CD-3456", "NN-noid", "NN-1234", "NN-2345", "NN-3456"], (str) => {
                                                                        let exp = new RegExp("^CD-");
                                                                        return exp.test(str);
                                                                    })).toEqual(["CD-1234", "CD-2345", "CD-3456"]);
    });

    it('it should works with array of objects', () => {
        expect(filter2(fruits, (fruit) => fruit.onSale === true)).toEqual([
                                                                        {
                                                                            name: 'apple',
                                                                            price: 0.99,
                                                                            onSale: true
                                                                        }]);
                                                                        
    });

    it('it should works with an object', () => {
        let ob = {name: 'apple',price: 0.99,onSale: true};
        expect(filter2(ob, (val) => {return val > 0.5 && !isNaN(parseFloat(val)) && isFinite(val)})).toEqual([0.99]);
                                                                        
    });
});
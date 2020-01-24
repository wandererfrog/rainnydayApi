const {getAverageTemp,getMaxTemp,getMinTemp} = require('../../utils/temperatures');
const {expect} = require('chai')

describe('Utility temperature functions.', function() {
   
    it('should return average temp', async ()=> {
        const expected = 12;
        const actual = await getAverageTemp(
            [
                {temp : 12},
                {temp : 12},
                {temp : 12}                
            ]
        )

        expect(expected).to.equal(actual)
    });


    it('should return max temp', async ()=> {
        const expected = 15;
        const actual = await getMaxTemp(
            [
                {temp : 12},
                {temp : 15},
                {temp : 7}                
            ]
        )
        
        expect(expected).to.equal(actual)
    });


    it('should return min temp', async ()=> {
        const expected = 7;
        const actual = await getMinTemp(
            [
                {temp : 12},
                {temp : 15},
                {temp : 7}                
            ]
        )
        
        expect(expected).to.equal(actual)
    });

});
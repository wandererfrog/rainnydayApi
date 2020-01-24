const {getWeekDayName} = require('../../utils/dates');
const {expect} = require('chai')

describe('Utility functions dates.', function() {
    it('should return correct weekday', function() {
        const expected = "Tuesday";
        const actual = getWeekDayName(3);
        expect(expected).equal(actual)
    });
});
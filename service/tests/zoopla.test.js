const zoopla = require('../zoopla');
const expect = require('expect');


it('Should return results', () => {
    return zoopla.getAllPropertyListings().then((models) => {
        expect(models.length).toBeGreaterThan(0);
    })
});
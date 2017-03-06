const zoopla = require('../zoopla');
const expect = require('expect');


it('Should return results', (done) => {
    zoopla.getZooplaPropertyListings((err, data) => {
        expect(data.length).toBeGreaterThan(0);
        done();
    })
});
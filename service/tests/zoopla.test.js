require('../../config/config');

const zoopla = require('../zoopla');
const expect = require('expect');
const {instance} = require('../../config/config');
const MockAdapter = require('axios-mock-adapter');
const fs = require('fs');

let mock = new MockAdapter(instance);


describe('Zoopla tests:', () => {
    beforeEach(() => {
        var response = JSON.parse(fs.readFileSync('/Users/Dave/Documents/projects/nodetraining/odecee/od-train-service/service/tests/stubs/200_zoopla_default.json'));
        // mock.onGet(/\/api//v1//property_listings.js?api_key=key&country=England&postcode=BR2&page_number=&page_size=100)
        mock.onAny()
            .reply(200, response);
    });

    it('Should return results', () => {
        return zoopla.getAllPropertyListings().then((properties) => {
            expect(properties.length).toBe(1400);
        });
    });

    it('Should return page 2 results', () => {
        return zoopla.getPropertyListings(2, 100).then((properties) => {
            expect(zoopla.mapZooplaResponse(properties).length).toBe(100);
        })
    });
});




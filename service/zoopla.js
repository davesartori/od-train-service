const request = require('request');
const model = require('od-train-data');

var getZooplaPropertyListings = (callback) => {
    request({
        url: `http://api.zoopla.co.uk/api/v1/property_listings.json?api_key=p3mxbd9jexgjwgxfvysvzhpc&country=England&outcode=BR1&page_number=1&page_size=1`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.stringify(body, undefined, 2));
            // var listing = model;
            // console.log(JSON.stringify(response, undefined, 2));
            
            var results = [];

            for (i = 0; i < body.listing.length; i++) {
                var result = new model({
                    listingId:  `${body.listing[i].listing_id}`,
                    url: `${body.listing[i].details_url}`,
                    description: `${body.listing[i].description}`,
                    publishedDate: `${body.listing[i].last_published_date}`,
                    floors: `${body.listing[i].num_floors}`,
                    bedrooms: `${body.listing[i].num_bedrooms}`,
                    bathroooms: `${body.listing[i].num_bathrooms}`,
                    listingType: `${body.listing[i].property_type}`,
                    stats: `${body.listing[i].status}`,
                    propertyType: `${body.listing[i].property_type}`,
                    price: `${body.listing[i].price}`,
                    location: {
                        latitude: `${body.listing[i].latitude}`,
                        longitude: `${body.listing[i].longitude}`,
                        address: `${body.listing[i].displayable_address}`,
                        postcode: `${body.postcode}`,
                        country: `${body.listing[i].country}`
                    },
                    image: `${body.listing[i].image_645_430_url}`,
                    thumbnail: `${body.listing[i].thumbnail_url}`
                });
                results.push(result);
            }
            // console.log(JSON.stringify(body, undefined, 2));
            callback(undefined, results);
        } else {
            callback('unable to connect');
        }

    });

};

module.exports.getZooplaPropertyListings = getZooplaPropertyListings;
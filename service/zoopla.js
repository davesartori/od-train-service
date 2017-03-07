const request = require('request');
const model = require('od-train-data');

const ZOOPLA_URL = 'http://api.zoopla.co.uk/api/v1/property_listings.json?api_key=p3mxbd9jexgjwgxfvysvzhpc';
const MAX_RECORDS_PER_PAGE = 10;

var getAllPropertyListings = () => {
    return getPropertyListings(1, MAX_RECORDS_PER_PAGE).then((body) => {
        var allResults = mapZooplaResponse(body);
        var numPages = Math.ceil(body.result_count / MAX_RECORDS_PER_PAGE);
        var numPages = 2;

        var resultPromises = [];
        for (let pageNum = 2; pageNum <= numPages; pageNum++) {
            resultPromises.push(getPropertyListings(pageNum, MAX_RECORDS_PER_PAGE));
        }
        return Promise.all(resultPromises)
            .then((results) => {
                results.forEach((item) => {
                    allResults.push(...mapZooplaResponse(item));
                });

                return allResults;
            })
            .catch((err) => {
                console.log('Error: ' + err);
            });
    }).catch((err) => console.error(err));
};

var getPropertyListings = (pageNumber, pageSize) => {
    return new Promise((resolve, reject) => {
        request({
            url: `${ZOOPLA_URL}&country=England&area=Oxford&page_number=${pageNumber}&page_size=${pageSize}`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                // console.log(JSON.stringify(body, undefined, 2));
                resolve(body);
            } else {
                reject(error);
            }
        });
    });

}

var mapZooplaResponse = (body) => {
    return body.listing.map((item) => {
         return new model({
            listingId:  item.listing_id,
            url: item.details_url,
            description: item.description,
            publishedDate: item.last_published_date,
            floors: item.num_floors,
            bedrooms: item.num_bedrooms,
            bathroooms: item.num_bathrooms,
            listingType: item.property_type,
            stats: item.status,
            propertyType: item.property_type,
            price: item.price,
            location: {
                latitude: item.latitude,
                longitude: item.longitude,
                address: item.displayable_address,
                postcode: body.postcode,
                country: item.country
            },
            image: item.image_645_430_url,
            thumbnail: item.thumbnail_url
        });
    });
}

// importZooplaPropertyListings((err, data) => {
//     console.log(data);
// });


module.exports = {
    getAllPropertyListings
};
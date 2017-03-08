const axios = require('axios');

let env = process.env.NODE_ENV || 'development';
console.log('>>> env', env);

if (env === 'development') {
    process.env.PORT = 3010;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/RealEstateApp';
} else if (env === 'test') {
    process.env.PORT = 3010;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/RealEstateAppTest';
}


const instance = axios.create({
    baseURL: 'https://localhost:3002',
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
});

module.exports = {
    instance
};
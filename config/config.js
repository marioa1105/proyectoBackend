const path = require('path');
const dotenv = require('dotenv');
console.log(path.resolve(process.cwd(), process.env.NODE_ENV + '.env'));
dotenv.config({
    path:path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});

module.exports.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports.PROVIDER = process.env.PROVIDER || 'memory';
module.exports.FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID ||  '599012854419306'
module.exports.FACEBOOK_KEY = process.env.FACEBOOK_KEY || 'b0d58d2bd066436c7f92a2f9852a1b1a'

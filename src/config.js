const dotenv = require('dotenv').config();

const config = {
    appConfig:{
         host: process.env.APP_HOST,
         port: process.env.APP_PORT
    },
    SECRET:"userapi-secret-key"
}

module.exports = config
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  domain: isProd ? process.env.PROD_DOMAIN : process.env.DEV_DOMAIN,
};

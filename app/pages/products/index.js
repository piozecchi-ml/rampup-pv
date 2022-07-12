/**
 * Module dependencies
 */
const router = require('nordic/ragnar').router();
const { fetchSiteData, fetchData, render } = require('./controller');

/**
 * Routers
 */
router.get('/', fetchSiteData, fetchData, render);

/**
 * Expose router
 */
module.exports = router;

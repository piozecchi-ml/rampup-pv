/**
 * Module dependencies
 */
const router = require('nordic/ragnar').router();
const demo = require('./demo');
const products = require('./products');
const form = require('./form');

/**
 * Demo router
 */
router.use('/demo', demo);
router.use('/products', products);
router.use('/form', form);

/**
 * Expose API router
 */
module.exports = router;

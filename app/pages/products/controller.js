/**
 * Module dependencies
 */
const React = require('react');
const config = require('nordic/config');
const I18nProvider = require('nordic/i18n/I18nProvider');
const ImageProvider = require('nordic/image/provider');
const demoService = require('../../../services/demo');
const productsService = require('../../../services/products');
const View = require('./view');

const { basePath } = config.ragnar;

/**
 * Fetch Site data
 */
exports.fetchSiteData = function fetchSiteData(req, res, next) {
  demoService.getSite(req.platform.siteId)
    .then((data) => {
      res.locals.site = data;
      next();
    })
    .catch(err => next(err));
};

exports.fetchData = function fetchSiteData(req, res, next) {
  productsService.getProducts(req.platform.siteId, 10)
    .then((data) => {
      res.locals.products = data.results;
      next();
    })
    .catch(err => next(err));
};

/**
 * Render
 */
exports.render = function render(req, res) {
  /**
   * View with I18nProvider and ImageProvider
   */

  const imagesPrefix = config.assets.prefix;

  const Products = props => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <View {...props} />
      </ImageProvider>
    </I18nProvider>
  );

  /**
   * Render View
   */
  res.render(Products, {
    baseURL: `${basePath}products`,
    site: res.locals.site,
    siteId: req.platform.siteId,
    lowEnd: req.device.lowEnd,
    deviceType: req.device.type,
    translations: req.translations,
    company: config.get('companyName', req.platform.id, req.platform.siteId),
    imagesPrefix,
    products: res.locals.products
  }, {
    layoutOptions: {
      staticMarkup: false,
    },
    navigationOptions: {
      type: 'full',
    },
  });
};

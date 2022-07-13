/**
 * Module dependencies
 */
const React = require('react');
const config = require('nordic/config');
const I18nProvider = require('nordic/i18n/I18nProvider');
const ImageProvider = require('nordic/image/provider');
const View = require('./view');
const formService = require('../../../services/form');

const { basePath } = config.ragnar;

exports.fetchSiteData = function fetchSiteData(req, res, next) {
  formService.getSite(req.platform.siteId)
    .then((data) => {
      res.locals.site = data;
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

  const Form = props => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <View {...props} />
      </ImageProvider>
    </I18nProvider>
  );

  /**
   * Render View
   */
  res.render(Form, {
    baseURL: `${basePath}form`,
    site: res.locals.site,
    siteId: req.platform.siteId,
    lowEnd: req.device.lowEnd,
    deviceType: req.device.type,
    translations: req.translations,
    company: config.get('companyName', req.platform.id, req.platform.siteId),
    imagesPrefix,
  }, {
    layoutOptions: {
      staticMarkup: false,
    },
    navigationOptions: {
      type: 'internal',
      internal: {
        title: 'Paquetes en la agencia',
      },
    },
  });
};

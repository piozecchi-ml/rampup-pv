/**
 * Styles
 */
require('../pages/demoWithPage/styles.scss');

/**
 * Module dependencies
 */
const React = require('react');
const hydrate = require('nordic/hydrate');
const I18n = require('nordic/i18n');
const I18nProvider = require('nordic/i18n/I18nProvider');
const View = require('../pages/demoWithPage/view');

/**
 * Get server state
 */
const {
  site,
  siteId,
  lowEnd,
  deviceType,
  company,
  translations,
} = window.__PRELOADED_STATE__;


/**
 * i18n
 */
const i18n = new I18n({ translations });

/**
 * Mount View on client
 */
hydrate(
  <I18nProvider i18n={i18n}>
    <View
      site={site}
      siteId={siteId}
      lowEnd={lowEnd}
      deviceType={deviceType}
      company={company}
    />
  </I18nProvider>,
  document.getElementById('root-app'),
);

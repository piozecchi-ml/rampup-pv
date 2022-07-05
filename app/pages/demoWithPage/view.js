/**
 * Module dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Page = require('nordic/page');
const { injectI18n } = require('nordic/i18n');

/**
 * View Component Using Page. This is the same component located under pages/demo/view but it uses the Page Component
 */

function handleClick() {
  // eslint-disable-next-line no-alert
  alert('Click using React!');
}

function View(props) {
  const {
    i18n, translations, site, siteId, lowEnd, deviceType, company,
  } = props;
  const preloadedState = {
    i18n,
    translations,
    site,
    siteId,
    lowEnd,
    deviceType,
    company,
  };
  const analytics = {
    section: 'universal',
    page: 'test',
  };
  const melidata = {
    path: '/demo-with-page',
    event_data: {},
  };
  return (
    <Page
      name="demoWithPage"
      className="demo-with-page"
      state={preloadedState}
      analytics={analytics}
      melidata={melidata}
    >
      <Head>
        <title>
          {i18n.gettext('Demo Page')}
        </title>
      </Head>
      <Script src="vendor.js" />

      <button onClick={handleClick}>
        {i18n.gettext('Click Me!')}
      </button>

      <h2>
        {i18n.gettext('Site details:')}
      </h2>
      <p>
        {i18n.gettext('Country: {0}, default currency: {1}, company: {2}',
          site.name, site.default_currency_id, company)}
      </p>

      <h2>
        {i18n.gettext('Device details:')}
      </h2>
      <p>
        {i18n.gettext('Is low-end: {0}, type: {1}', String(lowEnd), deviceType)}
      </p>

      <h2>
        {i18n.gettext('API endpoints:')}
      </h2>
      <ul>
        <li>
          <a href="/api/demo/platform">
            {i18n.gettext('Platform')}
          </a>
        </li>
        <li>
          <a href="/api/demo/user">
            {i18n.gettext('User')}
          </a>
        </li>
        <li>
          <a href="/api/demo/device">
            {i18n.gettext('Device')}
          </a>
        </li>
        <li>
          <a href="/api/demo/browser">
            {i18n.gettext('Browser')}
          </a>
        </li>
      </ul>

      <h2>
        {i18n.gettext('i18n')}
      </h2>
      <p>
        {i18n.gettext('Usuarios')}
      </p>
    </Page>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  siteId: PropTypes.string.isRequired,
  translations: PropTypes.shape({}),
  site: PropTypes.shape({
    name: PropTypes.string.isRequired,
    default_currency_id: PropTypes.string.isRequired,
  }).isRequired,
  lowEnd: PropTypes.bool,
  deviceType: PropTypes.string,
  company: PropTypes.string,
};

View.defaultProps = {
  translations: {},
  lowEnd: false,
  deviceType: null,
  company: null,
};

/**
 * Inject i18n context as props into View.
 */
module.exports = injectI18n(View);

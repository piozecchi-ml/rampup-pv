/**
 * Module dependencies
 */
const React = require('react');
const { useState, useEffect } = require('react');
const restclient = require('nordic/restclient')({ baseURL: 'api' });
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const MeliGA = require('nordic/analytics/meli-ga');
const MelidataTrack = require('nordic/melidata/melidata-track');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const Spinner = require('@andes/spinner');
const ContentComponent = require('./components/content');
const HeaderComponent = require('./components/header');
const DetailComponent = require('./components/detail');
/*
data: {
  last_updated,
  shipments: [
    id,
    service_type,
    recipient: {
     id,
     name
   },
   status,
   incoming_date,
   outgoing_date
  ]
}
*/
/**
 * View Component
 */
function View(props) {
  const { i18n, translations, site, siteId, lowEnd, deviceType, company, imagesPrefix } = props;

  const preloadedState = {
    i18n,
    translations,
    site,
    siteId,
    lowEnd,
    deviceType,
    company,
    imagesPrefix,
  };

  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState({ shipments: [] });
  const [selectedPackage, setSelectedPackage] = useState();

  const hadlePackageSelected = (item) => {
    setSelectedPackage(item);
  };

  useEffect(() => {
    setLoadingData(true);
    restclient.get('/form').then(res => {
      setData(res.data);
      setLoadingData(false);
    });
  }, []);

  return (
    <div className="form">

      <MeliGA
        section="universal"
        page="test"
      />

      <MelidataTrack path="/form" event_data={{ demo: 'data' }} />


      <Head>
        <title>
          {i18n.gettext('Form.headText')}
        </title>
      </Head>
      {loadingData && <Spinner
        modifier="fullscreen"
        size="large"
        label="Aguarde un momento..."
      />}

      {!loadingData
        && <>
          {selectedPackage
            && <DetailComponent
              i18n={i18n}
              selectedPackage={selectedPackage}
              hadlePackageSelected={hadlePackageSelected}
            />}

          {!selectedPackage
            && <>
              <HeaderComponent data={data} i18n={i18n} />

              <ContentComponent itemsList={data.shipments} i18n={i18n} hadlePackageSelected={hadlePackageSelected} />
               </>}
        </>}

      <Style href="form.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
          console.log('Form page is loaded!');
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="form.js" />

    </div>
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
  imagesPrefix: PropTypes.string,
};

View.defaultProps = {
  translations: {},
  lowEnd: false,
  deviceType: null,
  company: null,
  imagesPrefix: '/',
};

/**
 * Inject i18n context as props into View.
 */
module.exports = injectI18n(View);

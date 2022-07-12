/**
 * Module dependencies
 */
const React = require('react');
const {useState, useEffect} = require('react');
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const MeliGA = require('nordic/analytics/meli-ga');
const MelidataTrack = require('nordic/melidata/melidata-track');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const ContentComponent = require('./components/content');
const HeaderComponent = require('./components/header');

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

  const [data, setData] = useState({shipments: []});

  useEffect(() => {
    let fakeData = {
      last_updated: '09/07/2022 19:46 hs',
      shipments: [ 
        { id: 121212121, service_type: 0, recipient: { id: 1111111, name: 'Juan Perez' }, status: 0, incoming_date: '07/07/2022 ', outgoing_date: '08/07/2022' },
        { id: 454545454, service_type: 0, recipient: { id: 2222222, name: 'Roberto Rodriguez' }, status: 1, incoming_date: '08/07/2022 ', outgoing_date: '11/07/2022' },
        { id: 787878787, service_type: 2, recipient: { id: 3333333, name: 'Pedro Reyes' }, status: 1, incoming_date: '09/07/2022 ', outgoing_date: '10/07/2022' },
      ]
    };

    setData(fakeData);
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

      <HeaderComponent data={data} i18n={i18n}/>

      <ContentComponent itemsList={data.shipments} i18n={i18n}/>

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

/**
 * Module dependencies
 */
const React = require('react');
const {useState} = require('react');
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const MeliGA = require('nordic/analytics/meli-ga');
const MelidataTrack = require('nordic/melidata/melidata-track');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const Image = require('nordic/image');
const restclient = require('nordic/restclient')({
  timeout: 5000,
});

/**
 * View Component
 */
function View(props) {
  const { i18n, translations, site, siteId, lowEnd, deviceType, company, imagesPrefix, products } = props;
  const preloadedState = {
    i18n,
    translations,
    site,
    siteId,
    lowEnd,
    deviceType,
    company,
    imagesPrefix,
    products
  };

  const[listaProductos, setListaProductos] = useState(products);

  const actualizarProductos = () => {
    return restclient.get(`/api/products?q=Motorola&limit=10`)
      .then(response => setListaProductos(response.data));    
  };

  return (
    <div className="products">
      <MeliGA
        section="universal"
        page="test"
      />

      <MelidataTrack path="/products" event_data={{ products: 'products' }} />

      <Head>
        <title>
          {i18n.gettext('Products Page')}
        </title>
      </Head>

      <Style href="demo.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
          console.log('Products page is loaded!');
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="products.js" />

      Listado de articulos 
      <button onClick={actualizarProductos}>Actualizar</button>

      <ul>
        {           
          listaProductos.map(p => {
            return <li key={p.id}>{p.name}</li>
          })
        }
      </ul>
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

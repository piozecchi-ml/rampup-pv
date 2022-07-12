/**
 * Modules dependencies
 */
const restclient = require('nordic/restclient')({
  timeout: 5000,
});

/**
 * Service interface
 */
class Service {
  static getProducts(siteId, maxRows) {
    // https://internal-api.mercadolibre.com/sites/MLA/search?q=Motorola&limit=10
    // https://internal-api.mercadolibre.com/sites/MLA/search?category=MLA1055&limit=10
    console.log("SERVICE");
    return restclient.get(`/sites/${siteId}/search?q=Motorola&limit=${maxRows}`)
      .then(response => response.data);
  };
}

/**
 * Expose Service
 */
module.exports = Service;

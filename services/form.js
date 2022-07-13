/**
 * Modules dependencies
 */
const enumPlaces = require('../constants/form');
const restclient = require('nordic/restclient')({
  timeout: 5000,
});

/**
 * Service interface
 */
class Service {
  static getSite(siteId) {
    return restclient.get(`/sites/${siteId}`)
      .then(response => response.data);
  }

  static getPlaces() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(enumPlaces.DATA_MOCK);
      }, 2000);
    });
  }

  static getShipmentById(shipmentId) {
    return restclient.get(`/shipments/${shipmentId}`)
      .then(response => response.data);
  }
}

/**
 * Expose Service
 */
module.exports = Service;

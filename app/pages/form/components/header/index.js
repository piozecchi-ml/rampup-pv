const React = require('react');
const PropTypes = require('prop-types');
const ServiceTypes = require('../common/serviceTypes');

const HeaderComponent = ({ i18n, data }) => {
  const shipmentsReducer = (acc, actualValue) => {
    const serviceType = actualValue.service_type;

    if (!acc[serviceType]) {
      acc[serviceType] = 1;
    } else {
      acc[serviceType]++;
    }

    return acc;
  };

  const resumen = data.shipments.reduce(shipmentsReducer, {});

  return (
    <>
      <div id="header-container">
        <div id="packages">{data.shipments.length} paquetes</div>
        <div id="services">
          <div>{resumen[ServiceTypes.DROP_OFF] || 0}<br />Drop-off</div>
          <div>{resumen[ServiceTypes.PICKUP] || 0}<br />Pick-up</div>
          <div>{resumen[ServiceTypes.DELIVERY] || 0}<br />Delivery</div>
        </div>
        <div id="last-update">Ultima actualización: {data.last_updated}</div>
      </div>
      <div id="last-update">{data.last_updated}</div>
    </>
  );
};

HeaderComponent.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = HeaderComponent;

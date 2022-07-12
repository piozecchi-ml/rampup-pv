const React = require('react')
const PropTypes = require('prop-types');
const Style = require('nordic/style');

const HeaderComponent = ({ i18n, data }) => {

    
    return (
      <>
        <div id='header-container'>
          <div id='packages'>33 paquetes</div>
          <div id='services'>
            <div>13<br/>Drop-off</div>
            <div>10<br/>Pick-up</div>
            <div>10<br/>Delivery</div>
          </div>          
          <div id="last-update">Última actualización: 23 de Junio 20:25 hs.</div>
        </div>
      </>      
    );
}

HeaderComponent.propTypes = {
    i18n: PropTypes.shape({
      gettext: PropTypes.func.isRequired,
    }).isRequired,
  };
  
  module.exports = HeaderComponent;
const React = require('react')
const PropTypes = require('prop-types');
const ServiceNames = require('../common/serviceNames');
const Button = require('@andes/button');
const { ButtonText } = Button;

const DetailComponent = ({ i18n, selectedPackage, hadlePackageSelected }) => {
    
  return (
      <div id="detail-container">
        <div id="recipient-id">{selectedPackage.recipient.id}</div>
        <div id="recipient-name">{selectedPackage.recipient.name}</div>
        
        <table>
          <tbody>
            <tr>
              <td className="cell-header">Servicio</td>
              <td className="cell-data">{ServiceNames[selectedPackage.service_type]}</td>
            </tr>
            <tr>
              <td className="cell-header">Estado</td>
              <td className="cell-data">{selectedPackage.status}</td>
            </tr>
            <tr>
              <td className="cell-header">Ingreso</td>
              <td className="cell-data">{selectedPackage.incoming_date}</td>
            </tr>
            <tr>
              <td className="cell-header">Salida</td>
              <td className="cell-data">{selectedPackage.outgoing_date}</td>
            </tr>
          </tbody>          
        </table>

        <Button onClick={() => hadlePackageSelected(null)}>
          <ButtonText>Regresar</ButtonText>
        </Button>
      </div>       
  );
}

DetailComponent.propTypes = {
    i18n: PropTypes.shape({
      gettext: PropTypes.func.isRequired,
    }).isRequired,
  };
  
  module.exports = DetailComponent;
const React = require('react');
const PropTypes = require('prop-types');
const Button = require('@andes/button');
const injectI18n = require('nordic/i18n/injectI18n');
const ServiceNames = require('../common/serviceNames');

const { ButtonText } = Button;

const DetailComponent = ({ i18n, selectedPackage, hadlePackageSelected }) => (
  <div className="detail-container">
    <div id="recipient-id">{selectedPackage.recipient.id}</div>
    <div id="recipient-name">{selectedPackage.recipient.name}</div>

    <table>
      <tbody>
        <tr>
          <td className="cell-header">{i18n.gettext('Detail.service')}</td>
          <td className="cell-data">{ServiceNames[selectedPackage.service_type]}</td>
        </tr>
        <tr>
          <td className="cell-header">{i18n.gettext('Detail.status')}</td>
          <td className="cell-data">{selectedPackage.status}</td>
        </tr>
        <tr>
          <td className="cell-header">{i18n.gettext('Detail.entry')}</td>
          <td className="cell-data">{selectedPackage.incoming_date}</td>
        </tr>
        <tr>
          <td className="cell-header">{i18n.gettext('Detail.exit')}</td>
          <td className="cell-data">{selectedPackage.outgoing_date}</td>
        </tr>
        <tr>
          <td className="cell-dowload" colSpan={2}>{i18n.gettext('Detail.dowload')}</td>
        </tr>
      </tbody>
    </table>

    <Button onClick={() => hadlePackageSelected(null)}>
      <ButtonText>{i18n.gettext('Detail.back')}</ButtonText>
    </Button>
  </div>
);

DetailComponent.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = injectI18n(DetailComponent);

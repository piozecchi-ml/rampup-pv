const React = require('react');
const PropTypes = require('prop-types');
const List = require('@andes/list');

const { ListItem } = List;
const ServiceNames = require('../../common/serviceNames');

const DataComponent = ({ i18n, itemsList, hadlePackageSelected }) => {
  const items = itemsList.map(item => (<ListItem
    onClick={() => hadlePackageSelected(item)}
    key={item.id}
    chevron
    primary={item.id}
    // secondary={ServiceNames[item.service_type]}
  />));

  return (
    <div id="data-container">

      <List
        aria-label="Paquetes"
        id="package"
      >

        {items}

      </List>
    </div>
  );
};

DataComponent.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = DataComponent;

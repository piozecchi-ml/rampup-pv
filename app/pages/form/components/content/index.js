const React = require('react');
const PropTypes = require('prop-types');
const { useState, useEffect } = require('react');
const FiltersComponent = require('./filters');
const DataComponent = require('./data');

const ContentComponent = ({ i18n, itemsList, hadlePackageSelected }) => {
  const [filteredItemList, setFilteredItemList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  function filterBySearchText(items, searchT) {
    if (searchT.length === 0) return items;

    return items.filter(i => i.id.includes(searchT));
  }

  function filterBySelectedServices(items, selectedS) {
    if (selectedS.length === 0) return items;

    return items.filter(i => selectedS.includes(i.service_type));
  }

  const onTextFilterChangeHandler = (e) => {
    const searchTextAux = e.target.value;

    let filtered = filterBySearchText(itemsList, searchTextAux);
    filtered = filterBySelectedServices(filtered, selectedServices);

    setSearchText(searchTextAux);
    setFilteredItemList(filtered);
  };

  const onServiceFilterSelectionHandler = (selectedItems) => {
    let filtered = filterBySelectedServices(itemsList, selectedItems);
    filtered = filterBySearchText(filtered, searchText);

    setSelectedServices(selectedItems);
    setFilteredItemList(filtered);
  };


  useEffect(() => {
    if (itemsList && itemsList.length > 0) {
      setFilteredItemList(itemsList);
    }
  }, [itemsList]);

  return (
    <div id="content-container">
      <FiltersComponent
        i18n={i18n}
        onTextFilterChangeHandler={onTextFilterChangeHandler}
        onServiceFilterSelectionHandler={onServiceFilterSelectionHandler}
      />

      <DataComponent
        i18n={i18n}
        itemsList={filteredItemList}
        hadlePackageSelected={hadlePackageSelected}
      />

      {itemsList.length === 0
        && <div className="message-no-data">
          {i18n.gettext('No hay paquetes en la agencia')}
        </div>}

      {itemsList.length > 0
        && filteredItemList.length === 0
        && <div className="message-no-data">
          {i18n.gettext('No encontramos resultados para esta busqueda. Probá ingresando otro ID o cambiando de servicio en el filtro.')}
        </div>}

    </div>
  );
};

ContentComponent.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = ContentComponent;

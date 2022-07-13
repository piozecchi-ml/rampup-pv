const React = require('react')
const PropTypes = require('prop-types');
const FiltersComponent = require('./filters');
const DataComponent = require('./data');
const {useState, useEffect} = require('react');

const ContentComponent = ({ i18n, itemsList, hadlePackageSelected }) => {
  const [filteredItemList, setFilteredItemList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const onTextFilterChangeHandler = (e) => {
    let searchText = e.target.value;

    let filtered = filterBySearchText(itemsList, searchText);
    filtered = filterBySelectedServices(filtered, selectedServices);

    setSearchText(searchText);
    setFilteredItemList(filtered);
  };

  const onServiceFilterSelectionHandler = (selectedItems) => {
    let filtered = filterBySelectedServices(itemsList, selectedItems);
    filtered = filterBySearchText(filtered, searchText);

    setSelectedServices(selectedItems);
    setFilteredItemList(filtered);
  };

  function filterBySearchText(items, searchText){
    if(searchText.length == 0) return items;

    return items.filter( i => {
      return i.id.includes(searchText);
    });
  }

  function filterBySelectedServices(items, selectedServices){
    if(selectedServices.length == 0) return items;

    return items.filter( i => {
      return selectedServices.includes(i.service_type);
    });
  }

  useEffect(() => {
    if(itemsList && itemsList.length > 0){
      setFilteredItemList(itemsList);
    } 
  }, [itemsList]);

  return (
      <div id="content-container">
        <FiltersComponent 
          i18n={i18n}
          onTextFilterChangeHandler={onTextFilterChangeHandler}
          onServiceFilterSelectionHandler={onServiceFilterSelectionHandler}/>

        <DataComponent 
          i18n={i18n}          
          itemsList={filteredItemList}
          hadlePackageSelected={hadlePackageSelected}/>

          {itemsList.length == 0 &&
            <div className="message-no-data">
                No hay paquetes en la agencia
            </div>
          }

          {itemsList.length > 0 &&
            filteredItemList.length == 0 &&
              <div className="message-no-data">
                  No encontramos resultados para esta busqueda. Probá ingresando otro ID o cambiando de servicio en el filtro.
              </div>
          }

      </div>
  );
}

ContentComponent.propTypes = {
    i18n: PropTypes.shape({
      gettext: PropTypes.func.isRequired,
    }).isRequired,
  };
  
  module.exports = ContentComponent;
const React = require('react')
const PropTypes = require('prop-types');
const FiltersComponent = require('./filters');
const DataComponent = require('./data');
const {useState, useEffect} = require('react');

const ContentComponent = ({ i18n, itemsList }) => {
  const [filteredItemList, setFilteredItemList] = useState([]);

  const onTextFilterChangeHandler = (e) => {
    // Filtrar filteredItemList
  };

  const onServiceFilterSelectionHandler = (selectedItems) => {
    // Filtrar filteredItemList
  };

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
          itemsList={filteredItemList}/>
      </div>
  );
}

ContentComponent.propTypes = {
    i18n: PropTypes.shape({
      gettext: PropTypes.func.isRequired,
    }).isRequired,
  };
  
  module.exports = ContentComponent;
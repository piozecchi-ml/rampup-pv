const React = require('react')
const {useState} = require('react');
const PropTypes = require('prop-types');
const AppliedFiltersComponent = require('./appliedFilters');
const TextField = require('@andes/textfield');
const CheckboxList = require('@andes/checkbox-list');
const { ListItem } = require('@andes/list');
const Modal = require('@andes/modal');
const Button = require('@andes/button');
const Filter24 = require('@andes/icons/Filter24');
const Filter24Color = 'rgba(0, 0, 0, 1)';

const FiltersComponent = ({ i18n, onTextFilterChangeHandler, onServiceFilterSelectionHandler }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const onClose = () => {  
    setIsOpen(false)
  };

  const serviceFilterHandler = () => {
    setIsOpen(true);
  }

  const serviceFilterSelectionHandler = (event, selectedValues, itemDetails) => {
    setSelectedServices(selectedValues);
    onServiceFilterSelectionHandler(selectedValues);
  }

  return (
      <>
        <div id='filter-container'>
          <TextField 
            id="searchBox" 
            placeholder="Buscar paquete"
            onChange={onTextFilterChangeHandler}/>

          <Button
            className='filter-button'
            onClick={serviceFilterHandler}>
            <Filter24 className='filter-icon' color={Filter24Color}/>
          </Button>

          <Modal
            closeButtonLabel=""
            isOpen={isOpen}
            onClose={onClose}
            title="Filtrar por:"
            type={'large'}>

            <CheckboxList 
              id="uncontrolled-checkList-id" 
              aria-label="uncontrolled checkList example"
              defaultValue={selectedServices}
              onSelect={serviceFilterSelectionHandler}>
              <ListItem value="0" primary="Drop Off" />
              <ListItem value="1" primary="Pick Up" />
              <ListItem value="2" primary="Delivery" />
            </CheckboxList>

          </Modal>
        </div>

        <AppliedFiltersComponent 
          i18n={i18n}
          selectedServices={selectedServices}/>
      </>
  );
}

FiltersComponent.propTypes = {
    i18n: PropTypes.shape({
      gettext: PropTypes.func.isRequired,
    }).isRequired,
  };
  
  module.exports = FiltersComponent;
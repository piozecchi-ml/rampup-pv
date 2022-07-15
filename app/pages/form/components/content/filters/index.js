const React = require('react');
const { useState } = require('react');
const PropTypes = require('prop-types');
const TextField = require('@andes/textfield');
const CheckboxList = require('@andes/checkbox-list');
const { ListItem } = require('@andes/list');
const Button = require('@andes/button');
const Filter24 = require('@andes/icons/Filter24');
const AppliedFiltersComponent = require('./components/appliedFilters');
const CustomPopperComponent = require('./components/customPopper');

const Filter24Color = 'rgba(0, 0, 0, 1)';

const FiltersComponent = ({ i18n, onTextFilterChangeHandler, onServiceFilterSelectionHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const serviceFilterHandler = () => {
    setIsOpen(!isOpen);
  };

  const serviceFilterSelectionHandler = (event, selectedValues, itemDetails) => {
    setSelectedServices(selectedValues);
    onServiceFilterSelectionHandler(selectedValues.map(selected => parseInt(selected, 10)));
  };


  const renderCustomPopper = (<CustomPopperComponent
    css="filter-container-custom-popper"
    title="Filtrar por:"
  >
    <CheckboxList
      id="uncontrolled-checkList-id"
      aria-label="uncontrolled checkList example"
      defaultValue={selectedServices}
      onSelect={serviceFilterSelectionHandler}
    >
      <ListItem value="0" primary="Drop Off" />
      <ListItem value="1" primary="Pick Up" />
      <ListItem value="2" primary="Delivery" />
    </CheckboxList>

  </CustomPopperComponent>);

  return (
    <>
      <div className="filter-container">
        <TextField
          id="searchBox"
          placeholder="Buscar paquete"
          onChange={onTextFilterChangeHandler}
        />

        <Button
          className="filter-button "
          onClick={serviceFilterHandler}
        >
          <Filter24 className="filter-icon" color={Filter24Color} />
        </Button>
        {isOpen && renderCustomPopper}

      </div>

      <AppliedFiltersComponent
        i18n={i18n}
        selectedServices={selectedServices}
      />
    </>
  );
};

FiltersComponent.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = FiltersComponent;

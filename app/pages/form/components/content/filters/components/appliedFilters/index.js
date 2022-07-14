const React = require('react');
const PropTypes = require('prop-types');
const Tag = require('@andes/tag');
const FeedbackPositive32 = require('@andes/icons/FeedbackPositive32');
const ServiceNames = require('../../../../common/serviceNames');

const AppliedFiltersComponent = ({ selectedServices }) => {
  const serviceTags = selectedServices.map(service => (<Tag
    key={service}
    label={ServiceNames[service]}
    className="service-tag"
    avatar={{
      icon: <FeedbackPositive32 />,
      text: 'LI',
    }}
  />));

  return (
    <div id="tag-container">
      {serviceTags}
    </div>
  );
};

AppliedFiltersComponent.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = AppliedFiltersComponent;

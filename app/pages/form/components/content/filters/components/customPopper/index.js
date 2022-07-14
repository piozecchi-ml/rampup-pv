const React = require('react');
const PropTypes = require('prop-types');
const Card = require('@andes/card');
const { CardContent } = require('@andes/card');

const CustomPopperComponent = ({ children, css, title }) => (
  <Card className={css} shadow="elevated">
    <CardContent>
      <p>{title} </p>
      {children}
    </CardContent>
  </Card>

);

CustomPopperComponent.propTypes = {
  children: PropTypes.isRequired,
};

module.exports = CustomPopperComponent;

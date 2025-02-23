import PropTypes from 'prop-types';

const LayoutWithoutHeader = ({ children }) => {
  return <div className="sts">{children}</div>;
};

LayoutWithoutHeader.propTypes = {
  children: PropTypes.any
};

export default LayoutWithoutHeader;

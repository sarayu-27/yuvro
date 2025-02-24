import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Layout = ({ children, withHeaderAndFooter = true }) => {
  return (
    <div className="sts">
      {withHeaderAndFooter && <Header />}
      <div className="sts-body">{children}</div>
      {withHeaderAndFooter && <Footer />}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  withHeaderAndFooter: PropTypes.bool,  // This controls whether to show the header/footer
};

export default Layout;

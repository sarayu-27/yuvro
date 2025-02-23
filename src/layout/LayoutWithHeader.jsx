import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
const LayoutWithHeader = ({children}) => {
  return (
    <div>
      <div className="sts">
      <Header/>
      <div className="sts-body">{children}</div>
      <Footer></Footer>
    </div>
    </div>
  )
}
LayoutWithHeader.propTypes = {
    children: PropTypes.any,
  };
export default LayoutWithHeader;

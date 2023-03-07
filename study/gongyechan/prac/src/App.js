import PropTypes from 'prop-types';
import './assets/css/App.css';

const App = (props) => {
  return (
    <div className="App">
      <header>테스트 페이지</header>
      <div className="container">
        {props.children}
      </div>
      <footer>Copyright Yechan. All right reserved.</footer>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;

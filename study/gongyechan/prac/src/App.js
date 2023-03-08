import PropTypes from "prop-types";
import "./assets/css/App.css";

const App = (props) => {
  return (
    <div className="App">
      <header><h1>예찬이가 만든 페이지</h1></header>
      <div className="container">{props.children}</div>
      <footer>Copyright Yechan. All right reserved.</footer>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;

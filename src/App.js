// import logo from './logo.svg';
import './css/App.css';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ProPage from './layout/ProPage';
import ProTypePage from './layout/ProTypePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/pro">
            {/*用户自定义的组件,注意自定义组件名称必须以大写字母开头*/}
            <ProPage />
          </Route>
          <Route path="/proType">
            <ProTypePage />
          </Route>
          <Route path="/">
            <div className="link">
              <Link to="/pro">
                <h1>pro</h1>
              </Link>
              <Link to="/proType">
                <h1>proType</h1>
              </Link>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

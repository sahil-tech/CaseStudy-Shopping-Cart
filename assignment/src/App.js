import './App.scss';
import Home from './components/home';
import Product from './components/product';
import SignUp from './components/signUp';
import LogIn from './components/logIn';
import Header from './components/header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/shoppingCart/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={sessionStorage.getItem('isLoggedIn') ? Home : LogIn} />
            <Route path="/register" component={sessionStorage.getItem('isLoggedIn') ? Home : SignUp} />
            <Route path="/product" exact component={sessionStorage.getItem('isLoggedIn') ? Product : Product} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

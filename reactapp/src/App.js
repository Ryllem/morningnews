import React from "react";
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScreenHome from "./ScreenHome";
import ScreenMyArticles from "./ScreenMyArticles";
import ScreenSource from "./ScreenSource";
import ScreenArticlesBySource from "./ScreenArticlesBySource";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import wishlist from "./wishlist.reducers";
import user from "./user.reducers";


const store = createStore(combineReducers({ wishlist, user }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/screenmyarticles" component={ScreenMyArticles} />
          <Route path="/screensource" component={ScreenSource} />
          <Route
            path="/screenarticlesbysource/:mysource"
            component={ScreenArticlesBySource}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

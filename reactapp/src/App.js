import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ScreenHome} />
        <Route path="/screenmyarticles" component={ScreenMyArticles} />
        <Route path="/screensource" component={ScreenSource} />
        <Route path="/screenarticlesbysource/:mysource" component={ScreenArticlesBySource} />
      </Switch>
    </Router>
  
  );
}

export default App;

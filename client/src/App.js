import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Search from './components/Search';
import SavedArticles from './components/SavedArticles';
import Banner from './components/Banner';
import Footer from './components/Footer';

const App = () => (
  <Router>
    <React.Fragment>
      <div className="main-height">
        <Nav />
        <Banner />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={SavedArticles} />
          <Route component={Search} />
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  </Router>
);

export default App;
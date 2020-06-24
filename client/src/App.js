import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound'
import Landing from './components/layout/Landing'
import Booking from './components/booking/Booking'
import './App.css';

// redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className='container'>
          <Alert/>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/book/:id" component={Booking} />
            <Route component={NotFound} />
          </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;

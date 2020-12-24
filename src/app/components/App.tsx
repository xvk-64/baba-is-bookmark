import React from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './Navbar'
import Browse from './routes/Browse'
import Add from './routes/Add'
import Error404 from './routes/404'

import './styles/App.css'

export default function Main() {

  return (
    <HashRouter>
      <Navbar />
      <div className='main'>
        <div className='main-page'>
          <Switch>
            <Route exact path="/" component={Browse} />
            <Route exact path="/add" component={Add} />

            <Route path="*" component={Error404} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}
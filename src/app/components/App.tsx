import React from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './Navbar'
import Browse from './Browse'
import Error404 from './404'

import './App.css'

export default function Main() {

  return (
    <HashRouter>
      <Navbar />
      <div className='main'>
        <div className='main-page'>
          <Switch>
            <Route exact path="/" component={Browse} />

            <Route path="*" component={Error404} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}
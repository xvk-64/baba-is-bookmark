import React from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './Navbar'
import Home from './routes/Home'
import Browse from './routes/Browse'
import Add from './routes/Add'
import Error404 from './routes/404'
import Changelog from "./routes/Changelog";

import './styles/App.css'

export default function Main() {

  return (
    <HashRouter>
      <Navbar />
      <div className='main'>
        <div className='main-page'>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/add" component={Add} />
            
            <Route exact path="/changelog" component={Changelog} />

            <Route path="*" component={Error404} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}
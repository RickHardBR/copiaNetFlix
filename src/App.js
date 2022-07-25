import React, { Component } from "react";
import Home from "./header/Home";
import MovieInfo from "./MovieInfo";
import Tvinfo from "./TvInfo";
import Error from "./header/Error"
import "./style.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:movie_id" component={MovieInfo} />
            <Route exact path="/tv/:movie_id" component={Tvinfo} />
            <Route component={Error}/>
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import logo from "../logo.svg";
import "../App.css";
import Drawer from "./screens/drawer";
import Home from "./screens/home";
import Schedules from "./screens/schedules";
import Settings from "./screens/settings";
import Zone from "./screens/zone";
import SRoute from "./screens/sroute";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Drawer>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/zones" component={Zone} />
              <Route path="/route" component={SRoute} />
              <Route path="/schedules" component={Schedules} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </Drawer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

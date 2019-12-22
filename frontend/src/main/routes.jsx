import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Todo from '../todo/todo';
import About from '../about/about';

export default props => (
    <Switch>
        <Route exact path="/" componet={Todo}/>
        <Route path="/todos" component={Todo}/>
        <Route path="/about" component={About}/>
        <Redirect from="*" to={{
            pathname: '/todos',
            title: 'todos'
        }}/>
    </Switch>
);
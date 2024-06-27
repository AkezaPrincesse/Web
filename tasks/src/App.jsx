import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/Tasklist';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TaskList} />
        <Route path="/add" component={AddTask} />
        <Route path="/edit/:id" component={EditTask} />
      </Switch>
    </Router>
  );
};

export default App;

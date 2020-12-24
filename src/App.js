import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
import Home from './views/students/Home'
import Landing from './views/Landing'
import Exercise from './views/students/Exercise'
import ExerciseDetails from './views/students/ExerciseDetails'
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/exercise" component={Exercise}/>
          <Route path="/exercisedetails" component={ExerciseDetails}/>
          <Route path="/" component={Landing}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

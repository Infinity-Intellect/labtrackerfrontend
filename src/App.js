import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
import Home from './views/students/Home'
import Landing from './views/Landing'
import Exercise from './views/students/Exercise'
import ExerciseDetails from './views/students/ExerciseDetails'
import StaffHome from './views/staffs/Home'
import StaffExercise from './views/staffs/Exercise'
function App() {
  const isStaff = true
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/home">
            <Home isStaff={isStaff}/>
          </Route>
          <Route path="/exercise" component={Exercise}/>
          <Route path="/exercisedetails">
            <ExerciseDetails isStaff={isStaff}/>
          </Route>
          <Route path="/staff/exercise" component={StaffExercise}/>
          <Route path="/staff/home">
            <StaffHome isStaff={isStaff}/>
          </Route>
          <Route path="/exercisedetails">
            <ExerciseDetails isStaff={isStaff}/>
          </Route>
          <Route path="/">
            <Landing isStaff = {isStaff}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
import Home from './views/Home'
import Landing from './views/Landing'
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/" component={Landing}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

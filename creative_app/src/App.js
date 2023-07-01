
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import MainPage from "./Components/MainPage"


function App() {
  

  return (
<Router>
   <div className="App">
<Switch>
   <Route exact path="/">
<Signup/>
</Route>
<Route path="/login">
<Login />
</Route>
<Route path="/mainPage">
<MainPage />
</Route>
</Switch>
    </div> 
    </Router>
  );
}

export default App;

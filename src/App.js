import {Route, Switch} from "react-router-dom";
import Welcome from './components/welcome/Welcome';
import './App.css';
import AddRecipe from "./components/addRecipe/AddRecipe";
import Home from "./components/home/Home";

function App () {
  return (
    <div className="App bg-color1 min-h-screen">
      <Switch>
        <Route exact path={'/'}>
          <Welcome/>
        </Route>
        <Route path={'/home'}>
          <Home/>
        </Route>
        <Route path={'/addRecipe'}>
          <AddRecipe/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

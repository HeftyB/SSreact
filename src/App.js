import { Route, Switch, Link } from "react-router-dom";
import Welcome from './components/welcome/Welcome';
import Home from './components/home/Home';
import './App.css';
import AddRecipe from "./components/AddRecipe";

function App() {
  return (
    <div className="App bg-color1 h-screen">
      <Switch>
        <Route exact path={'/'}>
          <Welcome/>
        </Route>
        <Route path={'/home'}>
          <Home/>
        </Route>
        <Route path={'/addRecipe'}>
          <AddRecipe />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

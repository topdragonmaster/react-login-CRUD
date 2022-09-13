import * as React from "react";
import Login from "./view/Login/login";
import User  from "./view/User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const [isLogin, setIsLogin] = React.useState(false)

  return (
    <>
      {
        isLogin? <User/> : <Login onLogin={setIsLogin} /> 
      }
    </>
  )
}

export default App;

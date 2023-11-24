import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Switch, Route, useHistory } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    history.push('/login');

  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar handleLogout={handleLogout} />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;

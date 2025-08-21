import React from 'react';
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import Profile from "./pages/showProfile/index.jsx";

function App(){
  return(
    <div>
      <Register />
      <Login />
      <Profile />
    </div>
  );
}

export default App;

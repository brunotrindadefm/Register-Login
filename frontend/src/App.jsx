import Login from "./components/Login"
import Screen from "./components/Screen"
import Register from "./components/Register"
import Logged from "./components/Logged";

import { useState } from "react"

function App() {

  const [showRegister, setShowRegister] = useState(false);
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState('');

  const handleShowRegister = (e) => {
    e.preventDefault();
    setShowRegister(!showRegister);
  };

  const handleLogged = () => {
    setLogged(!logged)
  };

  const getEmail = (email) => {
    setEmail(email);
  };

  return (
    <div className="app">
      {!logged ? (
        <>
          {!showRegister ? (
            <Login getEmail={getEmail} handleLogged={handleLogged} handleShowRegister={handleShowRegister} />
          ) : (
            <Register getEmail={getEmail} handleUserRegister={handleLogged} handleShowRegister={handleShowRegister} />
          )}
          <Screen />
        </>
      ) : (
        <Logged userEmail={email} logOut={handleLogged}/>
      )}
    </div>
  )
}

export default App

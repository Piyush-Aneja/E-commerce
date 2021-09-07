import React, { useState } from 'react'
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { CardsContainer } from "./components/CardsContainer";
import { CartsContainer } from "./components/CartsContainer";
import { LoginPage } from './components/LoginPage';

function App() {
  const [userId, setUserId] = useState("");
  return (
    // <>
    //   <Router>
    //     <Navbar userId={userId} setloginStatus={setloginStatus} />

    //     < Route path="/" exact component={() => <LoginPage setloginStatus={setloginStatus} setUserId={setUserId} />} />

    //     <Route exact path="/shop" component={() => <CardsContainer userId={userId} />} />
    //     <Route path="/cart" component={() => <CartsContainer userId={userId} />} />

    //   </Router>
    // </>

    <Router>
      {
        !JSON.parse(window.localStorage.getItem('userData')) ?
          (< Route path="/" exact component={() => <LoginPage setUserId={setUserId} />} />)
          :
          (
            <>
              <Navbar />

              <Route exact path="/" render={() =>
                <>

                  <CardsContainer />
                </>
              } />
              <Route exact path="/shop" component={CardsContainer} />

              <Route exact path="/cart" component={() => <CartsContainer userId={userId} />} />
              < Footer />
            </>
          )
      }
    </Router>
  );
}

export default App;

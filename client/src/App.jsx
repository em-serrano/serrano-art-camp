import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Footer from "./components/Footer";
import PricingAndActivities from "./components/PricingCardsImgFront";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="app--container">
      <header className="camp-header">
        <div className="container-fluid w-75 text-center">
          <h1 className="display-1 header--title mb-3">Serrano Art Camp 2025</h1>
          <p className="lead">Join Mrs. Molly Serrano for a creative summer adventure at Grace + Peace Church in Austin, TX!</p>
          
               {/* Camp Description */}
       <div className="camp-description mt-3">
         <p className="lead">
           We will explore new artists, techniques and a variety of mediums. Each week features different themes
           and focuses. 
           Students will hold an art show on Friday at 12:10pm each week! 
         </p>
       </div>
        </div>
      </header>

      <PricingAndActivities />
      <Registration />
      <Footer />
      
    </div>
  );
}

export default App;

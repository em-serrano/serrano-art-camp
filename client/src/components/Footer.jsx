import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="">
        <div className="row">
          <div className="col-md-4">
            <h4>Serrano Art Camp 2025</h4>
            <p>Rising 2nd - 5th graders are invited to join Mrs. Molly Serrano at Art Camp! 
               We will explore new artists, techniques and a variety of mediums.</p>
          </div>
          <div className="col-md-4">
            <h4>Contact Information</h4>
            <ul className="list-unstyled">
              <li><FaEnvelope /> <a href="mailto:serranoartcamp@gmail.com">serranoartcamp@gmail.com</a></li>
              <li><FaPhone /> (310)-871-5657</li>
              <li><FaMapMarkerAlt /> Grace + Peace Church, 6301 Woodrow Ave.</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Camp Sessions</h4>
            <ul className="list-unstyled">
              <li>"Back to Nature" - June 9-13, 2025</li>
              <li>"Dots and Lines" - July 7-11, 2025</li>
              <li>9:00am - 12:30pm daily</li>
              <li>Art Show on Fridays @ 12:10pm</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <p className="small">© 2025 Serrano Art Camp with Mrs. Molly Serrano. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
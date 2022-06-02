import React from "react";
import "./ImpressumFooter.css";
import { Link } from "react-router-dom";

export default function ImpressumFooter(props) {
  return (
    <div className={"footer " + props.position}>
      <h3 className="color-white passion">Made with Passion</h3>
      <div className="color-white impressum-container">
        <div className="mr8">© 2022 Niklas Burg | All rights reserved. </div>
        <div className="mr8 mt ">
          <Link to="/impressum"> Impressum </Link>
        </div>
        <div className="mt mb">
          <Link to="/datenschutz"> Datenschutzerklärung</Link>
        </div>{" "}
      </div>
    </div>
  );
}

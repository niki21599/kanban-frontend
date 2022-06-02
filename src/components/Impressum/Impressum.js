import React from "react";
import "./Impressum.css";

export default function Impressum() {
  return (
    <div className="impressum-text">
      {" "}
      <h1>Impressum</h1>
      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p>
        Niklas Burg
        <br />
        M&uuml;hlenflur 18
        <br />
        54314 Zerf
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: +49 (0) 171 3203819
        <br />
        E-Mail: niklasburg1999.nb@gmail.com
      </p>
      <p>
        Quelle:{" "}
        <a href="https://www.e-recht24.de/impressum-generator.html">
          https://www.e-recht24.de/impressum-generator.html
        </a>
      </p>{" "}
    </div>
  );
}

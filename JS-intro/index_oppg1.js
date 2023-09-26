import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // a) Gi variabelen test verdien 8
    var testA = 8;
    console.log("a) Verdien av testA: " + testA + " (Datatype: " + typeof testA + ")");

    // b) Gi variabelen test verdien "testverdi"
    var testB = "testverdi";
    console.log("b) Verdien av testB: " + testB + " (Datatype: " + typeof testB + ")");

    // c) Regn ut 2 * 3 og sett resultatet inn i variabelen produkt
    var produkt = 2 * 3;
    console.log("c) Verdien av produkt: " + produkt + " (Datatype: " + typeof produkt + ")");

    // d) Regn ut verdien av brøken 2/3 og sett resultatet inn i variabelen broek
    var broek = 2 / 3;
    console.log("d) Verdien av broek: " + broek + " (Datatype: " + typeof broek + ")");
  }, []);

  return (
    <div>
      <h1>JavaScript Spørsmål og Svar</h1>
    </div>
  );
}

export default App;

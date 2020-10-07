import React from "react";

import MainProvider from "./context/MainProvider";

import { Header, Footer, Main } from "./components";

function App() {
  return (
    <MainProvider>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </MainProvider>
  );
}

export default App;

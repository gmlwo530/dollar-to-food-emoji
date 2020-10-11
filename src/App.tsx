import React, { useEffect } from "react";

import MainProvider from "./context/MainProvider";

import { Header, Footer, Main } from "./components";

import { viewAnalytics } from "./ga";

const App: React.FC = () => {
  useEffect(() => {
    viewAnalytics("main");
  });

  return (
    <MainProvider>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </MainProvider>
  );
};

export default App;

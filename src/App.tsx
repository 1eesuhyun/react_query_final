import React, {Fragment} from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";
function App() {
  return (
      <Fragment>
        <Header />
        <Home/>
        <Footer />
      </Fragment>
  );
}

export default App;

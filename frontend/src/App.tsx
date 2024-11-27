import React from "react";
import { ToastContainer } from "react-toastify";

import Router from "./routers";
import Modal from "./components/Modals";

function App() {
  return (

    <React.Fragment>
      <Router />
      <Modal />
      <ToastContainer position="top-right" autoClose={5000} />
    </React.Fragment>
  );
};

export default App;

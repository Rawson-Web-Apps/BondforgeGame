import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      {/* You could add a header or navigation bar here if needed */}
      <Outlet />{" "}
      {/* This renders the child route components like MainMenu, Locations, etc. */}
    </div>
  );
};

export default App;

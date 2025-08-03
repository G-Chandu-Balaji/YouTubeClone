import React, { useState } from "react";
import Header from "./Header";
import "./layout.css";

import { Outlet, useLocation } from "react-router";

function Layout() {
  const location = useLocation();
  // console.log("pathname", location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="app-layout">
      {location.pathname === "/login" ? "" : <Header setIsOpen={setIsOpen} />}
      <Outlet context={isOpen} />
    </div>
  );
}

export default Layout;

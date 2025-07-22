import React, { useState } from "react";
import Header from "./Header";

import { Outlet, useLocation } from "react-router";

function Layout() {
  const location = useLocation();
  // console.log("pathname", location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {location.pathname === "/login" ? "" : <Header setIsOpen={setIsOpen} />}
      <Outlet context={isOpen} />
    </div>
  );
}

export default Layout;

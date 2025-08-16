import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./layout.css";

import { Outlet, useLocation } from "react-router";

function Layout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1340) {
        setIsOpen(true); // collapse when small
      } else {
        setIsOpen(false);
      }
    }

    // Run once on mount
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-layout">
      {location.pathname === "/login" ? "" : <Header setIsOpen={setIsOpen} />}
      <Outlet context={{ isOpen, setIsOpen }} />
    </div>
  );
}

export default Layout;

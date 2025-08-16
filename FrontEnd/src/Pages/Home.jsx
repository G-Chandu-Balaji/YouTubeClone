import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import Filter from "../components/Filter";
import "./Home.css";
import Hero from "../components/Hero";
import { useLocation, useOutletContext } from "react-router";
import SearchResult from "./SearchResult";

export default function Home() {
  const [filtername, SetFiltername] = useState("All");
  const { isOpen, setIsOpen } = useOutletContext();
  const location = useLocation();
  let leftsection = isOpen ? "mini-leftsection" : "left-section";
  return (
    <div className="home-layout">
      <div
        className={` ${
          window.innerWidth > 978 ? leftsection : "mini-leftsection"
        }`}
      >
        <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />
      </div>
      <div className="right-section">
        {location.pathname != "/search" && (
          <Filter SetFiltername={SetFiltername} filtername={filtername} />
        )}
        {location.pathname == "/search" ? (
          <SearchResult />
        ) : (
          <Hero filtername={filtername} />
        )}
      </div>
    </div>
  );
}

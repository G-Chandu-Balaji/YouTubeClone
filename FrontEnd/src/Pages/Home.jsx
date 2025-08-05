import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import Filter from "../components/Filter";
import "./Home.css";
import Hero from "../components/Hero";
import { useLocation, useOutletContext } from "react-router";
import SearchResult from "./SearchResult";

export default function Home() {
  const [filtername, SetFiltername] = useState("All");
  const isOpen = useOutletContext();
  const location = useLocation();
  return (
    <div className="home-layout">
      <div className={`left-section ${isOpen ? "mini-leftsection" : ""}`}>
        <Sidebar isOpen={isOpen} />
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

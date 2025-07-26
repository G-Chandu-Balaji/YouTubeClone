import React from "react";

import Sidebar from "../components/Sidebar";
import Filter from "../components/filter";
import "./Home.css";
import Hero from "../components/Hero";
import { useOutletContext } from "react-router";

export default function Home() {
  const isOpen = useOutletContext();
  return (
    <div className="home-layout">
      <div className={`left-section ${isOpen ? "mini-leftsection" : ""}`}>
        <Sidebar isOpen={isOpen} />
      </div>
      <div className="right-section">
        <Filter />
        <Hero />
      </div>
    </div>
  );
}

import React from "react";

import Sidebar from "../components/Sidebar";
import Filter from "../components/filter";
import "./Home.css";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="home-layout">
      <Sidebar />
      <div>
        <Filter />
        <Hero />
      </div>
    </div>
  );
}

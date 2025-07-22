import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import Layout from "./components/layout";
import PageNotFound from "./Pages/PageNotFound";
import Channel from "./Pages/Channel";
import Login from "./Pages/Login";
import VideoPlay from "./Pages/video";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/watch/:id" element={<VideoPlay />} />
        <Route path="login" element={<Login />} />
        <Route path="channel" element={<Channel />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;

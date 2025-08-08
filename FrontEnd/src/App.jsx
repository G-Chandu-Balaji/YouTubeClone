import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import Layout from "./components/layout";
import PageNotFound from "./Pages/PageNotFound";
import Channel from "./Pages/Channel";
import Login from "./Pages/Login";
// import VideoPlay from "./Pages/video";
import CreateChannel from "./Pages/CreateChannel";
import Video from "./Pages/video";
import SearchResult from "./Pages/SearchResult";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/watch/:id" element={<Video />} />
          <Route path="login" element={<Login />} />
          <Route path="/user/channel/create" element={<CreateChannel />} />
          <Route path="channel/:channelId" element={<Channel />} />
          <Route path="/search" element={<Home />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;

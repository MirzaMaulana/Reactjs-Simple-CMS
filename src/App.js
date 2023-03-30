import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import PostIndex from "./pages/posts/Index";
import PostCreate from "./pages/posts/Create";
import PostEdit from "./pages/posts/Edit";
import PostShow from "./pages/posts/show";
import Login from "./pages/Login";
import CustomNav from "./pages/component/CustomNav";

function App() {
  return (
    <Router>
      <div>
        <CustomNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostIndex />} />
          <Route path="/posts/create" element={<PostCreate />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />
          <Route path="/post/:id" element={<PostShow />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

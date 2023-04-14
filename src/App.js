import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import PostIndex from "./pages/posts/Index";
import PostShow from "./pages/posts/show";
import Login from "./Auth/Login";
import CustomNav from "./pages/component/CustomNav";
import SignUp from "./Auth/SignUp";
import ForgetPassword from "./Auth/ForgetPassword";
import ChangePassword from "./Auth/ChangePassword";
import VerificationPassword from "./Auth/VerificationPassword";
import ProtectedRoute from "./pages/component/ProtectedRoute";
import UserProfile from "./Profile/Profile";
import ProfileEdit from "./Profile/EditProfile";
import List from "./Admin/posts/List";
import CreatePost from "./Admin/posts/Create";
import UpdatePost from "./Admin/posts/Update";
import ListTags from "./Admin/tags/List";
import CreateTags from "./Admin/tags/Create";
import UpdateTags from "./Admin/tags/Update";
function App() {
  return (
    <Router>
      <div>
        <CustomNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostIndex />} />
          <Route path="/post/:id" element={<PostShow />} />
          <Route path="/posts/:tag" element={<PostIndex />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            {/* POST */}
            <Route path="/dashboard/posts/list" element={<List />} />
            <Route path="/dashboard/posts/create" element={<CreatePost />} />
            <Route
              path="/dashboard/posts/update/:id"
              element={<UpdatePost />}
            />
            {/* POST */}
            {/* POST */}
            <Route path="/dashboard/tags/list" element={<ListTags />} />
            <Route path="/dashboard/tags/create" element={<CreateTags />} />
            <Route path="/dashboard/tags/update/:id" element={<UpdateTags />} />
            {/* POST */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/Change-password/:token" element={<ChangePassword />} />
          <Route
            path="/verification-password"
            element={<VerificationPassword />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

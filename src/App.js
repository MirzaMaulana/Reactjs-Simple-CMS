import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import PostIndex from "./pages/posts/Index";
import PostCreate from "./pages/posts/Create";
import PostEdit from "./pages/posts/Edit";
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

function App() {
  return (
    <Router>
      <div>
        <CustomNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostIndex />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
          </Route>
          <Route path="/post/:id" element={<PostShow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/Change-password" element={<ChangePassword />} />
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

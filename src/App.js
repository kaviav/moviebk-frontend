import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Movies from "./components/pages/Movies";
import Auth from "./components/pages/Auth";
import Admin from "./components/pages/Admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import { Booking } from "./components/pages/Booking";
import { UserProfile } from "./components/pages/UserProfile";
import { AddMovie } from "./components/pages/AddMovie";
import { AdminProfile } from "./components/pages/AdminProfile";

function App() {
  const dispatch = useDispatch();
  //
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  //
  //
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  //
  //
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/userprof" element={<UserProfile />} />
            </>
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Route path="/adminprof" element={<AdminProfile />} />
              <Route path="/add" element={<AddMovie />} />
            </>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;

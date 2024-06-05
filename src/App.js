import logo from "./logo.svg";
import "./App.css";
import { Component, Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Wrapper from "./Pages/Layout/Wrapper/Wrapper";
import { useDispatch } from "react-redux";
import { checkToken } from "./Toolkit/authSlice";
import { toast } from "react-toastify";




const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const Registration = lazy(() =>
  import("./Pages/Auth/Registration/Registration")
);
const Home = lazy(() => import("./Pages/CMS/Home/Home"));
const UpdatePassword = lazy(() =>
  import("./Pages/Auth/UpdatePassword/UpdatePassword")
);
const Product = lazy(() => import("./Pages/CMS/Product/Product"));
const Create=lazy(()=>import("./Pages/CMS/Create/Create"))
const Update=lazy(()=>import("./Pages/CMS/Update/Update"))
const Forgot=lazy(()=>import("./Pages/Auth/Forgot/Forgot"))
function Private({ children }) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return token != null || token != undefined ? (
    children
  ) : (
    <>
      <Navigate to={"/"} />
      {toast.error("login First...")}
    </>
  );
}
const publicRoutesName = [
  {
    path: "/",
    Component: <Login />,
  },
  {
    path: "/registration",
    Component: <Registration />,
  },
  {
    path:"/forgot",
    Component:<Forgot/>
  }
];
const privateRoutesNmae = [
  {
    path: "/Home",
    Component: <Home />,
  },
  {
    path: "/update-password",
    Component: <UpdatePassword />,
  },
  {
    path: "/Product",
    Component: <Product />,
  },
  {path:"/Create",
    Component:<Create/>
  },{
    path:"/Product/:id",
    Component:<Update/>

  }
];

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);
  return (
    <Suspense fallback={<h1>Loading..</h1>}>
      <Router>
        <Wrapper>
          <Routes>
            {publicRoutesName.map((item) => (
              <Route path={item.path} element={item.Component} />
            ))}
            {privateRoutesNmae.map((item) => (
              <Route
                path={item.path}
                element={<Private>{item.Component}</Private>}
              />
            ))}
          </Routes>
        </Wrapper>
      </Router>
    </Suspense>
  );
}

export default App;

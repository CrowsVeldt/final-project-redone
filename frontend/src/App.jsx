import { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import { AuthContext } from "./context/AuthContext";
import Root from "./pages/Root";
import About from "./pages/public/About";
import Blog from "./pages/public/Blog.jsx";
import Checkout from "./pages/public/Products/Checkout.jsx";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";
import Products, { getAllProducts } from "./pages/public/Products/Products";
import Profile from "./pages/private/Profile";
import Register from "./pages/public/Register";
import SupportPage from "./pages/public/Support.jsx";
import AutoLogin from "./utils/AutoLogin";
import RequireAuth from "./utils/RequireAuth";

function App() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route element={<AutoLogin />}>
          <Route index loader={getAllProducts} element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<SupportPage />} />
          <Route element={<RequireAuth user={user} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

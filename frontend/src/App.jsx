import { useContext } from 'react';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './pages/Root';
import Products, { getAllProducts } from './pages/public/Products/Products';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Register from './pages/public/Register';
import Login from './pages/public/Login';
import Profile from './pages/private/Profile';
import RequireAuth from './utils/RequireAuth';
import AuthContext from './context/AuthContext';
import AutoLogin from './utils/AutoLogin';

function App() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route element={<AutoLogin />}>
          <Route index loader={getAllProducts} element={<Products />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route element={<RequireAuth user={user} />}>
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
      </Route>,
    ),
  );

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;


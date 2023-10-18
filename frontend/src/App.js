import { Routes, Route } from "react-router-dom";
import './App.css';
import Landing from "./Pages/Landing.jsx"
import Navbar from "./Components/Navbar";
import MenuList from "./Pages/MenuList";
import AdminSidebar from "./Components/AdminSidebar";
import menuItems from './Components/data';
import AdminLanding from "./Pages/AdminLanding";
import AdminManageOrders from "./Pages/AdminManageOrders";
import AdminMangeReservation from "./Pages/AdminMangeReservation";
import AdminViewMenu from "./Pages/AdminViewMenu";
import AdminAddMenu from "./Pages/AdminAddMenu";
import AdminEditMenu from "./Pages/AdminEditMenu";
import AdminDeleteMenu from "./Pages/AdminDeleteMenu";
import Cart from "./Pages/Cart";
import Reservation from "./Pages/Reservation";
import AboutUs from "./Pages/AboutUs";
import MyAccountPage from "./Pages/MyAccountPage";
import OrderStatusPage from "./Pages/ViewStatusPage"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Navbar />}>
          <Route path='/' element={<Landing />} />
          <Route path='/menuList' element={<MenuList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path="/MyAccountPage" element={<MyAccountPage />} />
        </Route>
      </Routes>
      <Routes>
            <Route element={<AdminSidebar items={menuItems} />}>
              <Route path="/admin" element={<AdminLanding />} />
              <Route path="/AdminManageOrders" element={<AdminManageOrders />} />
              <Route path="/AdminMangeReservation" element={<AdminMangeReservation />} />
              <Route path="/AdminViewMenu" element={<AdminViewMenu />} />
              <Route path="/AdminAddMenu" element={<AdminAddMenu />} />
              <Route path="/AdminEditMenu" element={<AdminEditMenu />} />
              <Route path="/AdminDeleteMenu" element={<AdminDeleteMenu />} />
              <Route path="/status" element={<OrderStatusPage />} />
            </Route>

          </Routes>
    </div>
  );
}

export default App;

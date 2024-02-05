import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CarsPage from "./pages/CarsPage/CarsPage";
import Checkout from "./pages/Checkout/Checkout";
import OrderComplete from "./pages/OrderComplete/OrderComplete";
import CarDetail from "./pages/CarDetail/CarDetail";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Admin from "./pages/Admin/Admin";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <div className="  app d-flex justify-content-center  my-5  ">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/car-detail/:id" element={<CarDetail />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <div style={{ bottom: "0" }} className="position-fixed w-100 ">
        <Footer />
      </div>
    </div>
  );
}

export default App;

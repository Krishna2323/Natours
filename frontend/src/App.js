import "./App.scss";
import Header from "./components/layout/header/Header";
import Home from "./components/home/products/Home";
import { Route, Routes } from "react-router-dom";
import Container from "./components/layout/Container";
import SingleTour from "./components/productDetails/SingleTour";
import NotFound from "./components/Not Found/NotFound";
import LoginForm from "./components/loginSingup/LoginForm";
import SingupForm from "./components/loginSingup/SingupForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/loginSlice";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserAccount from "./components/userAccount/UserAccount";
import Loading from "./components/Not Found/Loading";
import AllTours from "./components/allTours/AllTours";
import UserDashboard from "./components/userAccount/UserDashboard";
import UserBookings from "./components/userAccount/UserBookings";
import axios from "axios";
import Footer from "./components/layout/footer/Footer";

// const stripePromise = loadStripe(
//   "pk_test_51JwimiSIAth5zraylKrgkax6UDLIqkKKJseyhnZgXbv8rJDipAG8YKM6MOMdBSx3OySBHf9WuXzhECynr8x1NLHf00jprWPkdi"
// );

function App() {
  const dispatch = useDispatch();
  const [stripeKey, setStripeKey] = useState();
  const { user, isLoading } = useSelector((state) => state.user);

  const getStripeKey = async () => {
    try {
      const key = await axios.get("/api/v1/booking/stripe-api-key");
      setStripeKey(key.data.stripeApiKey);
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
    getStripeKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allTours" element={<AllTours />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/singup" element={<SingupForm />} />

        <Route
          path="/tour/:id"
          element={
            <Elements stripe={loadStripe(stripeKey)}>
              <SingleTour />
            </Elements>
          }
        />
        {user && <Route path="/my-account" element={<UserAccount />} />}
        {isLoading && (
          <Route path="/my-account" element={<Loading text="Updating..." />} />
        )}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/my-bookings" element={<UserBookings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Container>
  );
}

export default App;

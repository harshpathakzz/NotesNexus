import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./Pages/LandingPage";
import MyNotes from "./Pages/MyNotes";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;

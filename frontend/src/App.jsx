import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
// Events
import Upcoming from "./pages/events/Upcoming";
import Past from "./pages/events/Past";
import Workshops from "./pages/events/Workshops";

// About
import Team from "./pages/about/Team";
import Mission from "./pages/about/Mission";

// Contact
import Email from "./pages/contact/Email";
import Phone from "./pages/contact/Phone";

export default function App() {
  return (
    <Router>
      <div>
      <Navbar />
      <div>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Events */}
        <Route path="/events/upcoming" element={<Upcoming />} />
        <Route path="/events/past" element={<Past />} />
        <Route path="/events/workshops" element={<Workshops />} />

        {/* About */}
        <Route path="/about/team" element={<Team />} />
        <Route path="/about/mission" element={<Mission />} />

        {/* Contact */}
        <Route path="/contact/email" element={<Email />} />
        <Route path="/contact/phone" element={<Phone />} />
      </Routes>
      </div>
      <Footer />
      </div>
    </Router>
  );
}

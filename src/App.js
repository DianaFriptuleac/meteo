import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CustomNavbar from "./components/CustomNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/Home.jsx";
import WeatherSection from "./components/WeatherSection.jsx";
import MyFooter from "./components/MyFooter.jsx";
import Notizie from "./components/Notizie.jsx";
import DaAggiornare from "./components/DaAggirnare.jsx";
import Mondo from "./components/Mondo.jsx";
function App() {
  return (
    <BrowserRouter>
      <header>
        <CustomNavbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meteo" element={<WeatherSection />} />
          <Route path="/notizie" element={<Notizie />} />
          <Route path="/daaggiornare" element={<DaAggiornare />} />
          <Route path="/mondo" element={<Mondo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;

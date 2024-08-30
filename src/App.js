
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CustomNavbar from './components/CustomNavbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './components/NotFound';
import Home from './components/Home.jsx'
function App() {
  return (
    <BrowserRouter>
  <header>
    <CustomNavbar/>
  </header>
  <main>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path="*" element={<NotFound/>} />
    </Routes>
  </main>
  </BrowserRouter>
  );
}

export default App;

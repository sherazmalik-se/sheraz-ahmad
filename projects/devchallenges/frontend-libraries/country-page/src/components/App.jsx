import { Link, Route, Routes } from "react-router";
import "../App.css";
import CountryDetail from "./CountryDetail";
import CountryRanking from "./CountryRanking";
import Footer from "./Footer";

function App() {
  return (
    <div className="bg-[#1B1D1F]">
      <main className="min-h-screen flex flex-col font-vietnam-regular">
        <div className="relative h-[225px] mdl:h-[300px] w-full">
          <img
            src="/resources/hero-image-sm.jpg"
            alt="view of Earth at night from space"
            className="w-full h-full object-cover -z-10 mdl:hidden"
          />
          <img
            src="/resources/hero-image.jpg"
            alt="view of Earth at night from space"
            className="w-full h-full object-cover -z-10 hidden mdl:block"
          />

          <Link to="/">
            <img
              src="/resources/Logo.svg"
              alt="World Ranks"
              className="absolute top-2/7 mdl:top-2/5 left-1/2 -translate-x-1/2 z-10"
            />
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<CountryRanking />} />

          <Route path="/country/:ccn3" element={<CountryDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

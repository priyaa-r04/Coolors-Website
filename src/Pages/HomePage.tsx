import { GlobalStyles } from "@mui/material";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import CardsSection from "../Components/CardsSection";
import Companies from "../Components/Companies";
import Footer from "../Components/Footer";

function HomePage() {
  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes scrollImages": {
            "0%": { transform: "translateY(0%)" },
            "100%": { transform: "translateY(-50%)" },
          },
        }}
      />
      <Header />
      <HeroSection />
      <CardsSection />
      <Companies/>
      <Footer/>
    </>
  );
}

export default HomePage;

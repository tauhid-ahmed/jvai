import AboutUs from "./_components/about-us";
import Benefits from "./_components/benefits";
import CaseUse from "./_components/case-use";
import Footer from "./_components/footer";
import GetStarted from "./_components/get-started";
import Header from "./_components/header";
import HeroSection from "./_components/hero";
import OurActions from "./_components/our-actions";
import OurSolutions from "./_components/our-solutions";
import OurTechnology from "./_components/our-technology";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutUs />
      <OurSolutions />
      <OurActions />
      <OurTechnology />
      <Benefits />
      <CaseUse />
      <GetStarted />
      <Footer />
    </>
  );
}

import AboutUs from "./_components/about-us";
import CaseUse from "./_components/case-use";
import GetStarted from "./_components/get-started";
import Header from "./_components/header";
import HeroSection from "./_components/hero";
import OurSolutions from "./_components/our-solutions";
import OurTechnology from "./_components/our-technology";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutUs />
      <OurSolutions />
      <OurTechnology />
      <CaseUse />
      <GetStarted />
    </>
  );
}

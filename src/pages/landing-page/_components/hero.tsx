import { Link } from "react-router-dom";
import { Button } from "../../../components/button";
import { Logo } from "../../../components/logo";
import Container from "./container";
import ParticlesComponent from "./particles";
import Section from "./section";
import { loginPath, signupPath } from "../../../paths";

export default function HeroSection() {
  return (
    <Section className="bg-blue-900 pt-24 md:pt-44 lg:pt-56 !pb-30 z-10 overflow-hidden">
      <Container>
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <div className="text-center mt-10">
          <h1 className="text-blue-100 text-4xl lg:text-5xl font-bold">
            Clin Technologies
          </h1>
          <div className="text-grey-800">
            <p className="text-xl lg:text-3xl mt-5 leading-relaxed tracking-tight">
              Revolutionizing clinical documentation through{" "}
              <span className="text-color-1 font-semibold">
                HIPAA COMPLIANT
              </span>
              advanced artificial intelligence, giving healthcare providers more
              time for what truly matters — patient care. try it for{" "}
              <span className="text-color-1 font-semibold">FREE</span> today
            </p>
            <p className="text-lg lg:text-2xl mt-6 mx-auto max-w-[650px] tracking-tight text-grey-200">
              Our sophisticated AI platform intelligently processes clinical
              conversations, creating accurate documentation that integrates
              with your existing EMR system.
            </p>
          </div>
          <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              className="w-full md:w-auto"
              variant="outline"
              shape="pill"
              size="lg"
              asChild
            >
              <Link to={loginPath()}>Login</Link>
            </Button>
            <Button className="w-full md:w-auto" shape="pill" size="lg" asChild>
              <Link to={signupPath()}>Sign up</Link>
            </Button>
          </div>
        </div>
      </Container>
      <div className="absolute inset-0 -z-10">
        <ParticlesComponent />
      </div>
    </Section>
  );
}

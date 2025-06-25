import { Link } from "react-router-dom";
import { Button } from "../../../components/button";
import { loginPath, signupPath } from "../../../paths";
import Container from "./container";
import Section from "./section";
import SectionTitle from "./section-title";
import { sections } from "../data";

export default function Benefits() {
  return (
    <Section
      id={sections.benefits.slice(1)}
      className="bg-blue-400 text-center"
    >
      <Container size="sm" className="space-y-8">
        <div className="text-grey-200">
          <SectionTitle>Get Started</SectionTitle>
          <p className="mt-8">
            Ready to transform your clinical documentation process? Contact our
            team to learn how Clin Technologies can be tailored to your specific
            healthcare setting.
          </p>
        </div>
        <div className="space-y-4 mt-8 text-grey-400 leading-relaxed">
          <div className="px-8 pb-8 border border-blue-200/20 rounded pt-14 max-w-xl mx-auto">
            Or reach us directly via email at{" "}
            <span className="text-blue-50">support@clintechso.com</span>
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
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
    </Section>
  );
}

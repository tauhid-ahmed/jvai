import Container from "./container";
import Section from "./section";
import SectionTitle from "./section-title";

export default function GetStarted() {
  return (
    <Section className="bg-blue-400">
      <div className="px-gutter">
        <SectionTitle>Get Started</SectionTitle>
        <p>
          Ready to transform your clinical documentation process? Contact our
          team to learn how Clin Technologies can be tailored to your specific
          healthcare setting.
        </p>
      </div>
      <Container size="sm">
        <div className="text-grey-100 space-y-4 mt-8 leading-relaxed">
          <div className="p-8 border border-blue-200/30 rounded">
            Or reach us directly via email at support@clintechso.com
          </div>
        </div>
      </Container>
    </Section>
  );
}

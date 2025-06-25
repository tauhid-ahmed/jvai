import { cn } from "../../../lib/utils";
import { sections } from "../data";
import Container from "./container";
import Section from "./section";
import SectionTitle from "./section-title";

const data = [
  {
    id: "validify",
    icon: "✓",
    title: "Validify",
    description:
      "Mitigate compliance risk with powerful AI that optimizes chart reviews for accuracy, integrity, coding, and compliance. Validify automatically identifies documentation gaps, ensures coding accuracy, and maintains regulatory compliance.",
  },
  {
    id: "redactify",
    icon: "⊘",
    title: "Redactify",
    description:
      "Effortlessly redact HIPAA identifiers from text, documents, and structured data with Redactify – automating your compliance workflow. Protect sensitive patient information while maintaining clinical context.",
  },
  {
    id: "transcriptX",
    icon: "🗣️",
    title: "TranscriptX",
    description:
      "Spend less time documenting. TranscriptX dictates highly accurate medical transcriptions of patient encounters into text, understanding complex medical terminology and clinical context for superior accuracy.",
  },
  {
    id: "chartwright",
    icon: "📝",
    title: "Chartwright",
    description:
      "Your best friend with charting – turn any normal text into a high-quality chart, delivered exactly how healthcare professionals need it with extensive customization options to match your workflow and documentation standards.",
  },
];

const classNames = {
  validify: {
    icon: "text-color-3 bg-color-3/20",
    card: "border-color-3",
  },
  redactify: { icon: "text-color-1 bg-color-1/20", card: "border-color-1" },
  transcriptX: {
    icon: "text-blue-200 bg-blue-200/20",
    card: "border-blue-200",
  },
  chartwright: { icon: "text-color-2 bg-color-2/20", card: "border-color-2" },
};

export default function OurSolutions() {
  return (
    <Section
      id={sections.ourSolutions.slice(1)}
      className="bg-blue-800 text-gray-100"
    >
      <div className="text-center px-gutter">
        <SectionTitle>Our Solutions</SectionTitle>
        <p className="mt-6 lg:mt-10">
          Our comprehensive suite of AI-powered solutions transforms every
          aspect of healthcare documentation:
        </p>
      </div>
      <Container>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mt-8">
          {data.map((item) => (
            <div
              className={cn(
                "p-8 bg-blue-600 rounded-lg border-t-3 space-y-4 hover:-translate-y-4 duration-300 transition-transform",
                classNames[item.id as keyof typeof classNames].card
              )}
              key={item.title}
            >
              <span
                className={cn(
                  "inline-flex size-18 text-3xl rounded-full items-center justify-center",
                  classNames[item.id as keyof typeof classNames].icon
                )}
              >
                {item.icon}
              </span>
              <h3 className="text-blue-50 text-2xl">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

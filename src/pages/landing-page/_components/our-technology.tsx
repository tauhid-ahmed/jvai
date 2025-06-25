import { sections } from "../data";
import Container from "./container";
import Section from "./section";
import SectionTitle from "./section-title";

const data = [
  {
    icon: "🧠",
    title: "Sophisticated Natural Language Processing",
    description:
      "At the core of our platform is an advanced foundation model. This enables our system to grasp the nuances of clinical conversations — understanding context, recognizing intent, and accurately interpreting medical terminology. This deep comprehension allows the AI to generate clear, concise, and contextually relevant medical notes automatically.",
    pro: false,
  },
  {
    icon: "🔄",
    title: "Learning Mode & Personalization",
    description:
      "Our AI doesn't rely on generic templates. We initiate the process by learning directly from your specific cases and workflows. The system intelligently refines its understanding and output based on your ongoing feedback. With each processed case, its accuracy and alignment with your unique clinical documentation needs become increasingly precise, ensuring a truly personalized solution.",
    pro: false,
  },

  {
    icon: "",
    title: "Robust Data Privacy & Security",
    description:
      "Protecting sensitive health information is paramount. Our AI solutions are architected with a security-first approach, incorporating principles like 'zero trust'. We utilize robust security measures, including comprehensive encryption (both at rest and in transit) and strict, role-based access controls, to ensure data integrity and confidentiality, limiting access exclusively to authorized personnel.",
    pro: true,
  },
];

export default function OurTechnology() {
  return (
    <Section
      id={sections.technology.slice(1)}
      className="bg-blue-800 text-grey-100"
    >
      <div className="px-gutter space-y-8">
        <SectionTitle>Our Technology</SectionTitle>
        <p>
          At Clin Technologies, we've built our platform on groundbreaking AI
          technology specifically designed for healthcare. Our solutions use the
          latest advancements in natural language processing and machine
          learning to create a system that truly understands the complexities of
          medical documentation.
        </p>
      </div>
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-10">
          {data.map((item) => (
            <div
              className="bg-blue-600 p-8 rounded-lg border border-blue-300 space-y-8"
              key={item.title}
            >
              {item.pro && (
                <span className="inline-block mb-6 rounded-full py-2 px-6 bg-color-3/10 border-color-3/30 text-sm">
                  🔒 HIPAA COMPLIANT
                </span>
              )}
              {item.icon ? (
                <span className="inline-flex size-16 rounded-full items-center justify-center bg-blue-200/10 aspect-square text-2xl">
                  {item.icon}
                </span>
              ) : (
                <span className="inline-flex gap-2 items-center text-sm pr-10 bg-blue-200/10 border border-blue-400 rounded-full py-2 px-4">
                  <span className="text-lg">📝</span> BUSINESS ASSOCIATE
                  AGREEMENT
                </span>
              )}
              <div className="pb-4 border-b border-blue-300">
                <h3 className="text-2xl font-medium text-blue-50">
                  {item.title}
                </h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

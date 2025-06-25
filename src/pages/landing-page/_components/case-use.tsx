import { sections } from "../data";
import Container from "./container";
import Section from "./section";
import SectionTitle from "./section-title";

const data = [
  {
    title: "Primary Care",
    description:
      "Dr SJ M.D reduced her documentation time by 52%, allowing her to see 3 more patients daily while finishing her charts before leaving the office.",
    quote:
      "This AI tool streamlines a tedious process, reduces 'click fatigue,' and helps me reclaim some sanity.",
    author: "Dr. SJ, MD",
  },
  {
    title: "Emergency Medicine",
    description:
      "Our ED department implemented Clin Tech, resulting in more thorough documentation and a 70% decrease in chart completion time during high-volume periods. Our nurses love it.",
    author: "Emergency Department (ED) Nurse Manager",
  },

  {
    title: "Behavioral Health",
    quote:
      "Chartwright has been transformative for our clinic. Our therapists were drowning in documentation; We've slashed average charting time to under 3 minutes per patient, freeing up hours for direct care. More importantly, we've seen a significant reduction in documentation errors and compliance flags. It's not just faster; it's smarter documentation.",
    author: "Clinical Director, Behavioral Health Practice",
  },
  {
    title: "Case Management",
    quote:
      "Honestly, with the number of patients I manage, documentation felt like a constant, losing battle. But this AI feels like getting an assistant. It takes my detailed notes and instantly creates the clear, customized charts I need. I'm getting hours back each week – hours I can now spend directly with patients, tackling barriers, not just typing.",
    author: "Social Worker/Case Manager",
  },
];

export default function CaseUse() {
  return (
    <Section
      id={sections.caseUse.slice(1)}
      className="bg-blue-800 text-grey-100"
    >
      <div className="px-gutter space-y-8">
        <SectionTitle>Case Use</SectionTitle>
        <p>
          See how healthcare providers across specialties are transforming their
          practice with Clin Technologies:
        </p>
      </div>
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-10">
          {data.map((item) => (
            <div
              className="bg-blue-600 p-8 rounded-lg border border-blue-300 space-y-8"
              key={item.title}
            >
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

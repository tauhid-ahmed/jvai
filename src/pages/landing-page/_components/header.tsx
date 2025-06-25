import { navigationData } from "../data";
import { Logo } from "../../../components/logo";
import { Button } from "../../../components/button";
import { MenuIcon } from "../../../components/icons";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

export default function Header() {
  const [activeSection, setActiveSection] = useState(
    window.location.hash.slice(1) || "home"
  );
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationData.map((item) => item.section.substring(1));
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="px-gutter bg-blue-800 h-15 flex items-center justify-between z-50 shadow-2xl fixed inset-x-0 top-0">
      <div className="flex items-center gap-2">
        <Logo size="sm" />
        <strong className="text-white text-xl1 font-medium mt-1 flex items-center">
          Clin
          <Button size="icon" className="lg:hidden">
            <MenuIcon />
          </Button>
        </strong>
      </div>
      <ul className="lg:flex gap-4 mr-10 hidden">
        {navigationData.map((navItem) => (
          <li key={navItem.name}>
            <a
              className={cn(
                "text-grey-800 hover:text-grey-100 px-3 py-2 relative after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:bg-blue-50 after:origin-bottom-left after:scale-x-0 transition-transform after:duration-300 hover:after:scale-x-100",
                {
                  "after:scale-x-100":
                    navItem.section.slice(1) === activeSection,
                }
              )}
              href={navItem.section}
            >
              {navItem.name}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

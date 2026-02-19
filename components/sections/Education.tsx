import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Education() {
  return (
    <section
      id="education"
      className="py-20 lg:py-32 px-6 sm:px-8 lg:px-12 border-t border-foreground/5"
    >
      <div className="max-w-4xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 lg:mb-16 tracking-tight">
            Education
          </h2>
        </AnimateOnScroll>

        <div className="space-y-12 lg:space-y-16">
          {siteContent.education.map((edu, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <div className="relative pl-8 border-l border-foreground/10 pb-8 last:pb-0 group">
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-foreground/20 border border-foreground/40 group-hover:bg-foreground/40 transition-colors duration-300"></div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1 group-hover:opacity-90 transition-opacity">
                      {edu.school}
                    </h3>
                    <p className="text-lg opacity-80 mb-2">{edu.degree}</p>
                    <p className="text-sm opacity-60 font-mono">{edu.dates}</p>
                  </div>

                  <ul className="space-y-2 pt-2">
                    {edu.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-3 text-base opacity-80 hover:opacity-100 transition-opacity duration-300"
                        style={{ animationDelay: `${hIndex * 50}ms` }}
                      >
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

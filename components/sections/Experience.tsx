import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 lg:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 lg:mb-16 tracking-tight">
            Experience
          </h2>
        </AnimateOnScroll>

        <div className="space-y-12 lg:space-y-16">
          {siteContent.experience.map((exp, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <div className="relative pl-8 border-l border-white/10 pb-8 last:pb-0 group">
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-white/20 border border-white/40 group-hover:bg-white/40 transition-colors duration-300"></div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1 group-hover:opacity-90 transition-opacity">
                      {exp.role}
                    </h3>
                    <p className="text-lg opacity-80 mb-2">{exp.company}</p>
                    <p className="text-sm opacity-60 font-mono mb-4">{exp.dates}</p>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {exp.bullets.map((bullet, bIndex) => (
                      <li
                        key={bIndex}
                        className="flex items-start gap-3 text-base opacity-80 leading-relaxed hover:opacity-100 transition-opacity duration-300"
                      >
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.tech && exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4">
                      {exp.tech.map((tech, tIndex) => (
                        <span
                          key={tIndex}
                          className="px-3 py-1 text-xs font-mono border border-white/20 rounded-sm opacity-70 hover:opacity-100 hover:border-white/40 transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

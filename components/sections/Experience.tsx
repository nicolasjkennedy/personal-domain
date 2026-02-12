import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

// Match projects to an experience entry by shared tech
function getRelatedProjects(expTech: string[] | undefined) {
  if (!expTech || expTech.length === 0) return [];
  return siteContent.projects
    .map((project) => {
      const shared = project.tech.filter((t) => expTech.includes(t)).length;
      return { project, shared };
    })
    .filter((p) => p.shared >= 2)
    .sort((a, b) => b.shared - a.shared)
    .map((p) => p.project);
}

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
          {siteContent.experience.map((exp, index) => {
            const relatedProjects = getRelatedProjects(exp.tech);

            return (
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

                    {relatedProjects.length > 0 && (
                      <div className="pt-4 space-y-3">
                        <p className="text-xs font-mono text-white/40 tracking-wider uppercase">
                          Related Projects
                        </p>
                        <div className="grid gap-3">
                          {relatedProjects.map((project, pIndex) => (
                            <div
                              key={pIndex}
                              className="border border-white/10 rounded-sm p-4 hover:border-white/20 transition-colors duration-300"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <h4 className="text-sm font-bold mb-1">{project.name}</h4>
                                  <p className="text-sm opacity-60 leading-relaxed">{project.oneLiner}</p>
                                </div>
                                {project.links && (
                                  <div className="flex gap-3 shrink-0">
                                    {project.links.github && (
                                      <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs opacity-50 hover:opacity-100 border-b border-white/20 hover:border-white/40 transition-colors whitespace-nowrap"
                                      >
                                        GitHub →
                                      </a>
                                    )}
                                    {project.links.live && (
                                      <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs opacity-50 hover:opacity-100 border-b border-white/20 hover:border-white/40 transition-colors whitespace-nowrap"
                                      >
                                        Live →
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                              {project.tech && project.tech.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                  {project.tech.map((tech, tIndex) => (
                                    <span
                                      key={tIndex}
                                      className="px-2 py-0.5 text-[10px] font-mono border border-white/15 rounded-sm text-white/50"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

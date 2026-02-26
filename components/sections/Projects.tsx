import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Projects() {
  const featuredProjects = siteContent.projects.filter((p) => p.featured);
  const otherProjects = siteContent.projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-20 lg:py-32 px-6 sm:px-8 lg:px-12 border-t border-foreground/5"
    >
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 lg:mb-16 tracking-tight">
            Projects
          </h2>
        </AnimateOnScroll>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16 lg:mb-20">
            <AnimateOnScroll>
              <h3 className="text-xl opacity-60 mb-8 font-mono tracking-wide">
                Featured
              </h3>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {featuredProjects.map((project, index) => (
                <AnimateOnScroll key={index} delay={index * 150}>
                  <div
                    className="relative border border-foreground/10 p-8 lg:p-10 hover:border-foreground/20 hover:scale-[1.02] transition-all duration-300"
                  >
                  {project.sourceType && (
                    <span
                      className={`absolute top-4 right-4 px-2.5 py-0.5 text-[10px] font-mono tracking-wide rounded-sm border ${
                        project.sourceType === "open"
                          ? "text-blue-400 border-blue-400/30 bg-blue-400/10"
                          : project.sourceType === "inDevelopment"
                          ? "text-green-400 border-green-400/30 bg-green-400/10"
                          : "text-orange-300 border-orange-300/30 bg-orange-300/10"
                      }`}
                    >
                      {project.sourceType === "open"
                        ? "Open Source"
                        : project.sourceType === "inDevelopment"
                        ? "In Development"
                        : "Closed Source"}
                    </span>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      {project.name}
                    </h3>
                    <p className="text-lg opacity-80">{project.oneLiner}</p>
                    <p className="text-base opacity-70 leading-relaxed">
                      {project.description}
                    </p>

                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech, tIndex) => (
                          <span
                            key={tIndex}
                            className="px-3 py-1 text-xs font-mono border border-foreground/20 rounded-sm opacity-70 hover:opacity-100 hover:border-foreground/40 transition-all duration-300 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.links && (
                      <div className="flex flex-wrap gap-4 pt-4">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm opacity-70 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-colors"
                          >
                            GitHub →
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm opacity-70 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-colors"
                          >
                            Live Demo →
                          </a>
                        )}
                        {project.links.pypi && (
                          <a
                            href={project.links.pypi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm opacity-70 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-colors"
                          >
                            PyPI →
                          </a>
                        )}
                        {project.links.caseStudy && (
                          <a
                            href={project.links.caseStudy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm opacity-70 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-colors"
                          >
                            Case Study →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <AnimateOnScroll>
              <h3 className="text-xl opacity-60 mb-8 font-mono tracking-wide">
                Other Work
              </h3>
            </AnimateOnScroll>
            <div className="space-y-8 lg:space-y-10">
              {otherProjects.map((project, index) => (
                <AnimateOnScroll key={index} delay={index * 100}>
                  <div
                    className="border-b border-foreground/5 pb-8 last:border-0 last:pb-0 hover:border-foreground/10 transition-colors duration-300"
                  >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">
                        {project.name}
                      </h3>
                      <p className="text-base opacity-80">{project.oneLiner}</p>
                      {project.sourceType && (
                        <span
                          className={`inline-block mt-3 px-2.5 py-0.5 text-[10px] font-mono tracking-wide rounded-sm border ${
                            project.sourceType === "open"
                              ? "text-blue-400 border-blue-400/30 bg-blue-400/10"
                              : project.sourceType === "inDevelopment"
                              ? "text-green-400 border-green-400/30 bg-green-400/10"
                              : "text-orange-300 border-orange-300/30 bg-orange-300/10"
                          }`}
                        >
                          {project.sourceType === "open"
                            ? "Open Source"
                            : project.sourceType === "inDevelopment"
                            ? "In Development"
                            : "Closed Source"}
                        </span>
                      )}
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <p className="text-base opacity-70 leading-relaxed">
                        {project.description}
                      </p>
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, tIndex) => (
                            <span
                              key={tIndex}
                              className="px-3 py-1 text-xs font-mono border border-foreground/20 rounded-sm opacity-70 hover:opacity-100 hover:border-foreground/40 transition-all duration-300 cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.links && (
                        <div className="flex flex-wrap gap-4 pt-2">
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm opacity-70 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-colors"
                            >
                              GitHub →
                            </a>
                          )}
                          {project.links.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm opacity-70 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-colors"
                            >
                              Live →
                            </a>
                          )}
                          {project.links.pypi && (
                            <a
                              href={project.links.pypi}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm opacity-70 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-colors"
                            >
                              PyPI →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

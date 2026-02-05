import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 lg:mb-16 tracking-tight">
            Contact
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="space-y-8 mb-16">
            <p className="text-lg sm:text-xl opacity-80 leading-relaxed max-w-2xl">
              I&apos;m always open to discussing new opportunities, interesting projects,
              or just connecting. Feel free to reach out.
            </p>

            <div className="flex flex-wrap gap-6">
              {siteContent.socials.email && (
                <a
                  href={siteContent.socials.email}
                  className="text-base opacity-70 hover:opacity-100 border-b border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 inline-block"
                >
                  Email
                </a>
              )}
              {siteContent.socials.linkedin && (
                <a
                  href={siteContent.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base opacity-70 hover:opacity-100 border-b border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 inline-block"
                >
                  LinkedIn
                </a>
              )}
              {siteContent.socials.github && (
                <a
                  href={siteContent.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base opacity-70 hover:opacity-100 border-b border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 inline-block"
                >
                  GitHub
                </a>
              )}
              {siteContent.socials.website && (
                <a
                  href={siteContent.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base opacity-70 hover:opacity-100 border-b border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 inline-block"
                >
                  Website
                </a>
              )}
            </div>

            {/* Resume Download */}
            {siteContent.socials.resume && (
              <div className="pt-4">
                <a
                  href={siteContent.socials.resume}
                  download
                  className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-white/40 hover:bg-white/5 hover:scale-105 transition-all duration-300 text-sm font-mono tracking-wide group"
                >
                  <svg
                    className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16"
                    />
                  </svg>
                  <span>Download Resume</span>
                </a>
              </div>
            )}
          </div>
        </AnimateOnScroll>

        {/* Footer */}
        <AnimateOnScroll delay={200}>
          <div className="pt-8 border-t border-white/5">
            <p className="text-sm opacity-50 font-mono">
              © {currentYear} {siteContent.name}. All rights reserved.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

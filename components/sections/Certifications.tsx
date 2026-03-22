import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-20 lg:py-32 px-6 sm:px-8 lg:px-12 border-t border-foreground/5"
    >
      <div className="max-w-4xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 lg:mb-16 tracking-tight">
            Certifications
          </h2>
        </AnimateOnScroll>

        <div className="space-y-6">
          {siteContent.certifications.map((cert, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-foreground/5 last:border-0 hover:border-foreground/10 transition-colors duration-300 group"
              >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 group-hover:opacity-90 transition-opacity">
                  {cert.name}
                </h3>
                <p className="text-base opacity-70">{cert.issuer}</p>
              </div>
              <div className="flex items-center gap-4">
                {cert.inProgress ? (
                  <span className="text-xs font-mono px-2 py-0.5 border border-foreground/20 rounded-sm text-foreground/50 tracking-wide">
                    In Progress
                  </span>
                ) : (
                  <p className="text-sm opacity-60 font-mono">{cert.date}</p>
                )}
                {cert.credentialLink && (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm opacity-70 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-colors"
                  >
                    Verify →
                  </a>
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

import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";
import { AboutTextReveal } from "./AboutTextReveal";
import { TitleStaggerReveal } from "./TitleStaggerReveal";

export function AboutSection() {
  const aboutSegments = [
    { text: "I'am Gielang, ", className: "font-normal text-[#E1E0CC]" },
    { text: "a CS and algorithms enthusiast. ", className: "font-serif italic text-primary" },
    { text: "I design software solutions, analyze algorithms, and explore autonomous systems.", className: "font-normal text-[#E1E0CC]" },
  ];

  const bodyText = "Driven by an early passion for technology, I spent my school years competing in national robotics competitions and learning programming independently. As a fresh high school graduate, I'm applying to study Computer Science abroad, with a focus on algorithm design and building systems that solve real problems.";

  return (
    <section 
      id="story" 
      className="relative bg-black rounded-t-[8vw] md:rounded-t-[4vw] -mt-[8vw] md:-mt-[4vw] pt-[calc(8vw+5rem)] md:pt-[calc(4vw+8rem)] pb-32 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 flex items-center justify-center overflow-hidden w-full z-10 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(222,219,200,0.05)_0%,transparent_70%)] pointer-events-none select-none" />

      <div className="w-full max-w-6xl bg-[#101010] rounded-3xl p-8 sm:p-14 md:p-20 lg:p-24 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden text-center shadow-3xl shadow-black z-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

        <TitleStaggerReveal 
          text="My Story" 
          className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mb-8 sm:mb-10 block select-none"
        />

        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[1.05] sm:leading-[0.95] tracking-tight mb-12 sm:mb-16">
          <WordsPullUpMultiStyle segments={aboutSegments} />
        </div>

        <div className="max-w-2xl mx-auto border-t border-white/10 pt-10 sm:pt-12 w-full flex flex-col items-center">
          <AboutTextReveal text={bodyText} className="text-primary/90 leading-relaxed font-light" />
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mt-10">
            {[
              { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
              { name: "C", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
              { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
              { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
              { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
              { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
              { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
              { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
              { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
              { name: "Flask", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg", className: "invert opacity-80" },
              { name: "SQL", src: "https://www.svgrepo.com/show/331760/sql-database-generic.svg" }
            ].map((tech) => (
              <div 
                key={tech.name} 
                className="group relative flex items-center justify-center bg-zinc-900/40 hover:bg-zinc-800/80 border border-white/5 hover:border-primary/20 w-12 h-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(222,219,200,0.05)] cursor-pointer"
              >
                <img 
                  src={tech.src} 
                  alt={tech.name} 
                  className={`w-6 h-6 transition-all duration-300 filter grayscale group-hover:grayscale-0 group-hover:scale-110 ${tech.className || ""}`}
                />
                <span className="absolute -bottom-8 scale-0 group-hover:scale-100 transition-all duration-200 bg-zinc-950 text-primary text-[10px] uppercase tracking-wider py-1 px-2 rounded-md border border-white/10 whitespace-nowrap pointer-events-none z-30 shadow-lg">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { Trophy, Sparkles, Pin } from "lucide-react";
import { achievementsData } from "../data";

const containerVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.98, 
    filter: "blur(8px)" 
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1], // Premium cinematic ease
      staggerChildren: 0.15,
    }
  }
};

const childVariants = {
  hidden: { 
    opacity: 0, 
    y: 16 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

/* Per-item scroll animation wrapper — used inline in map, no key needed here */
function ScrollReveal({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AchievementsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="relative bg-black py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading card — same dark card style as projects */}
      <div ref={headerRef} className="max-w-4xl mx-auto mb-20 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="bg-[#101010] rounded-2xl border border-white/5 flex flex-col items-center justify-center py-16 sm:py-20 px-8 text-center select-none"
        >
          <motion.h2
            variants={childVariants}
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-primary tracking-wide mb-4"
          >
            Achievements &amp; Activities.
          </motion.h2>
          <motion.p
            variants={childVariants}
            className="text-gray-500 font-light text-sm sm:text-base max-w-lg"
          >
            Milestones from robotics championships to self-taught engineering.
          </motion.p>
        </motion.div>
      </div>

      {/* Timeline — fully inlined in map, key on the wrapping div */}
      <div className="max-w-2xl mx-auto relative z-10">
        {achievementsData.map((item, index) => (
          <div key={item.id}>
            <ScrollReveal index={index}>
              <div className="relative flex gap-8 sm:gap-12">
                {/* Left: icon + vertical line */}
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <div className="w-9 h-9 rounded-full bg-[#161616] border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-black/50 shrink-0">
                    {item.title.includes("Robotics") ? (
                      <Trophy className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="w-[1px] flex-1 bg-white/[0.08] mt-3" />
                </div>

                {/* Right: year + role + card */}
                <div className="flex-1 pb-14">
                  <p className="font-serif italic text-3xl sm:text-4xl text-primary mb-1 leading-none">
                    {item.year}
                  </p>
                  {item.role && (
                    <p className="text-[10px] font-mono uppercase tracking-widest text-primary/50 mb-4">
                      {item.role}
                    </p>
                  )}
                  <div className="bg-[#101010] rounded-2xl border border-white/5 p-6 sm:p-8 hover:border-primary/20 transition-colors duration-300">
                    <h4 className="text-base sm:text-lg font-normal text-[#E1E0CC] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-5">
                      {item.description}
                    </p>
                    {item.details && (
                      <ul className="space-y-2">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <Pin className="w-3 h-3 text-primary/40 shrink-0 mt-0.5" />
                            <span className="text-[11px] text-gray-500 font-light leading-normal">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
  );
}

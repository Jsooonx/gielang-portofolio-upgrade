import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import { WordsPullUp } from "./WordsPullUp";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Story", href: "#story" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Inquiries", href: "#inquiries" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Jsooonx",
    icon: <Github className="w-3.5 h-3.5" />,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/jsooonx/",
    icon: (
      <img 
        src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/1200/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.jpg" 
        alt="LeetCode" 
        className="w-3.5 h-3.5 object-contain rounded-sm"
      />
    ),
  },
  {
    label: "HackerRank",
    href: "https://www.hackerrank.com/profile/elangacount15",
    icon: (
      <img 
        src="https://cdn.iconscout.com/icon/free/png-256/free-hackerrank-logo-icon-svg-download-png-3030100.png" 
        alt="HackerRank" 
        className="w-3.5 h-3.5 object-contain"
      />
    ),
  },
];

export function HeroSection() {
  const descVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        delay: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const socialVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        delay: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative h-screen w-full p-4 md:p-6 bg-black flex flex-col justify-between">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-zinc-950 flex flex-col justify-between">
        
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none select-none z-10" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none z-10" />

        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-black/95 rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 sm:px-6 md:px-12 sm:py-3 flex items-center justify-center gap-3.5 sm:gap-6 md:gap-10 lg:gap-12 border-x border-b border-white/5 shadow-2xl w-auto max-w-[95vw] sm:max-w-none">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{ color: "rgba(225, 224, 204, 0.8)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
              className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold transition-colors shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div />

        <div className="relative z-20 w-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-end items-center">
          <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-5 sm:gap-6 text-center">
            
            <div className="w-full flex justify-center select-none mb-1">
              <WordsPullUp
                text="Gielang"
                showAsterisk
                className="font-medium text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[13vw] 2xl:text-[12vw] leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] uppercase"
              />
            </div>

            <div className="flex flex-col items-center gap-5 sm:gap-6 max-w-xl sm:max-w-2xl">
              
              <motion.p
                variants={descVariants}
                initial="hidden"
                animate="visible"
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.4] text-center font-light px-2"
              >
                Gielang is an aspiring computer science student and full-stack developer. Combining software engineering with hands-on robotics, he builds intelligent systems and interactive web applications.
              </motion.p>

              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                className="w-full flex flex-col items-center gap-4"
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-4 bg-primary text-black rounded-full pl-6 pr-2 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:gap-6 cursor-pointer shadow-lg shadow-black/50"
                >
                  <span className="tracking-widest">Explore Projects</span>
                  <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </a>

                {/* Mobile & Tablet Social Links (Inline in the content flow) */}
                <motion.div
                  variants={socialVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex lg:hidden items-center justify-center gap-2.5 flex-wrap mt-2 w-full"
                >
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/5 bg-zinc-950/40 text-primary/70 hover:border-primary/30 hover:text-primary transition-all duration-300 font-mono text-[9px] tracking-widest font-semibold uppercase"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </motion.div>
              </motion.div>

            </div>

          </div>
        </div>

        {/* Desktop Profile Links (Absolute positioned bottom-left) */}
        <motion.div
          variants={socialVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex absolute bottom-6 left-12 z-30 items-center gap-3"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-zinc-950/40 text-primary/70 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:-translate-y-0.5 font-mono text-[9px] tracking-widest font-semibold uppercase"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

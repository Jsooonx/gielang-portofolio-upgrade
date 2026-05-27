import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion } from "motion/react";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { SocialsFanOut } from "./components/SocialsFanOut";
import { PageTransition, PageTransitionRef } from "./components/PageTransition";
import { ProjectsArchive } from "./components/ProjectsArchive";
import { NavigationMenu } from "./components/NavigationMenu";
import { FooterSection } from "./components/FooterSection";
import { InitialPreloader } from "./components/InitialPreloader";

export default function App() {
  const pageTransitionRef = useRef<PageTransitionRef>(null);
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'archive'>('main');
  const [activeSection, setActiveSection] = useState<string>("#story");
  const [isPreloaded, setIsPreloaded] = useState(false);

  const handleNavigation = (targetId: string) => {
    if (targetId.startsWith("#")) {
      const targetElement = document.querySelector(targetId) as HTMLElement | null;
      
      if (currentView === 'archive') {
        // Trigger curtain transition back to main view
        if (pageTransitionRef.current) {
          setIsTransitionActive(true);
          pageTransitionRef.current.trigger(() => {
            setCurrentView('main');
            setTimeout(() => {
              const element = document.querySelector(targetId) as HTMLElement | null;
              if (element) {
                element.scrollIntoView({ behavior: "auto" });
              }
            }, 50);
          }).then(() => {
            setIsTransitionActive(false);
          });
        } else {
          setCurrentView('main');
          setTimeout(() => {
            const element = document.querySelector(targetId) as HTMLElement | null;
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      } else {
        // Already on main view, trigger the curtain page transition!
        if (targetElement && pageTransitionRef.current) {
          setIsTransitionActive(true); // Trigger scale down
          pageTransitionRef.current.trigger(() => {
            // Scroll immediately while screen is covered by the curtain
            targetElement.scrollIntoView({ behavior: "auto" });
          }).then(() => {
            setIsTransitionActive(false); // Restore normal scale
          });
        } else if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      syncTouch: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth anchor scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      const anchor = targetEl.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href) as HTMLElement | null;
          if (target) {
            if (pageTransitionRef.current) {
              setIsTransitionActive(true); // Trigger scale down
              pageTransitionRef.current.trigger(() => {
                lenis.scrollTo(target, {
                  offset: 0,
                  immediate: true, // Jump immediately while screen is covered by transition
                });
              }).then(() => {
                setIsTransitionActive(false); // Restore normal scale
              });
            } else {
              lenis.scrollTo(target, {
                offset: 0,
                duration: 2.0,
              });
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    if (currentView !== 'main') return;

    const sections = ["#story", "#projects", "#achievements", "#inquiries"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.querySelector(sectionId) as HTMLElement | null;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  return (
    <div className="bg-[#050505] text-[#E1E0CC] selection:bg-primary selection:text-black min-h-screen font-sans overflow-x-hidden relative">
      <div className="w-full bg-black origin-center overflow-hidden">
        <div style={{ display: currentView === 'main' ? 'block' : 'none' }}>
          <HeroSection />
          <AboutSection />
          <ProjectsSection onViewArchive={() => {
            if (pageTransitionRef.current) {
              setIsTransitionActive(true);
              pageTransitionRef.current.trigger(() => {
                setCurrentView('archive');
                window.scrollTo(0, 0);
              }).then(() => {
                setIsTransitionActive(false);
              });
            } else {
              setCurrentView('archive');
              window.scrollTo(0, 0);
            }
          }} />
          <AchievementsSection />
        </div>

        {currentView === 'archive' && (
          <ProjectsArchive onViewMain={() => {
            if (pageTransitionRef.current) {
              setIsTransitionActive(true);
              pageTransitionRef.current.trigger(() => {
                setCurrentView('main');
                setTimeout(() => {
                  const target = document.querySelector("#projects");
                  if (target) {
                    target.scrollIntoView({ behavior: "auto" });
                  }
                }, 50);
              }).then(() => {
                setIsTransitionActive(false);
              });
            } else {
              setCurrentView('main');
            }
          }} />
        )}

        <SocialsFanOut />

        <FooterSection onNavigate={handleNavigation} />
      </div>

      <PageTransition ref={pageTransitionRef} />
      <NavigationMenu currentView={currentView} activeSection={activeSection} onNavigate={handleNavigation} />
      {!isPreloaded && <InitialPreloader onComplete={() => setIsPreloaded(true)} />}
    </div>
  );
}

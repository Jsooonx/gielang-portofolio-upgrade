import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
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

import { ProjectDetail } from "./components/ProjectDetail";

export default function App() {
  const pageTransitionRef = useRef<PageTransitionRef>(null);
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'archive' | 'project-detail'>('main');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("#story");
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Keep refs updated to prevent stale closures inside event listeners
  const currentViewRef = useRef(currentView);
  const selectedProjectIdRef = useRef(selectedProjectId);
  const isTransitionActiveRef = useRef(isTransitionActive);

  useEffect(() => {
    currentViewRef.current = currentView;
    selectedProjectIdRef.current = selectedProjectId;
    isTransitionActiveRef.current = isTransitionActive;
  }, [currentView, selectedProjectId, isTransitionActive]);

  // Synchronize view state with URL hash and trigger slide curtain transitions
  useEffect(() => {
    let lastHash = window.location.hash;

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === lastHash) return;

      const prevView = currentViewRef.current;
      const prevProjectId = selectedProjectIdRef.current;

      let nextView: 'main' | 'archive' | 'project-detail' = 'main';
      let nextProjectId: string | null = null;

      if (hash === '#archive') {
        nextView = 'archive';
      } else if (hash.startsWith('#project/')) {
        nextView = 'project-detail';
        nextProjectId = hash.replace('#project/', '');
      }

      // Check if the view is actually changing
      const isViewChanging = prevView !== nextView || (nextView === 'project-detail' && prevProjectId !== nextProjectId);

      const applyStateChanges = () => {
        setCurrentView(nextView);
        setSelectedProjectId(nextProjectId);
        window.scrollTo(0, 0);
        lastHash = hash;

        if (nextView === 'main' && hash && hash.startsWith('#')) {
          const target = document.querySelector(hash) as HTMLElement | null;
          if (target) {
            setTimeout(() => {
              target.scrollIntoView({ behavior: "auto" });
            }, 50);
          }
        }
      };

      if (isViewChanging && pageTransitionRef.current && !isTransitionActiveRef.current) {
        setIsTransitionActive(true);
        pageTransitionRef.current.trigger(() => {
          applyStateChanges();
        }).then(() => {
          setIsTransitionActive(false);
        });
      } else {
        applyStateChanges();
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Initial mount check (run instantly without transition)
    const hash = window.location.hash;
    let initialView: 'main' | 'archive' | 'project-detail' = 'main';
    let initialProjectId: string | null = null;
    if (hash === '#archive') {
      initialView = 'archive';
    } else if (hash.startsWith('#project/')) {
      initialView = 'project-detail';
      initialProjectId = hash.replace('#project/', '');
    }
    setCurrentView(initialView);
    setSelectedProjectId(initialProjectId);
    lastHash = hash;

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handles page view changes and smooth scroll navigation with transition effect
  const handleNavigation = (targetId: string) => {
    if (targetId.startsWith("#")) {
      const activeView = currentViewRef.current;
      // If we are navigating to a main section from the main view, scroll smoothly
      if (activeView === 'main' && !targetId.startsWith('#project/') && targetId !== '#archive') {
        const targetElement = document.querySelector(targetId) as HTMLElement | null;
        if (targetElement && (window as any).lenis) {
          (window as any).lenis.scrollTo(targetElement, {
            offset: 0,
            duration: 1.5,
          });
          history.pushState(null, '', targetId);
          return;
        }
      }
      // Otherwise update the hash to trigger the hash router transition
      window.location.hash = targetId;
    }
  };
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      syncTouch: false,
    });
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      const anchor = targetEl.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          
          const isSpecialRoute = href === '#archive' || href.startsWith('#project/');
          const activeView = currentViewRef.current;

          if (isSpecialRoute || activeView !== 'main') {
            if (pageTransitionRef.current) {
              setIsTransitionActive(true);
              pageTransitionRef.current.trigger(() => {
                window.location.hash = href;
              }).then(() => {
                setIsTransitionActive(false);
              });
            } else {
              window.location.hash = href;
            }
            return;
          }

          const target = document.querySelector(href) as HTMLElement | null;
          if (target) {
            lenis.scrollTo(target, {
              offset: 0,
              duration: 1.5,
            });
            history.pushState(null, '', href);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = undefined;
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  // Update active section highlight based on scroll position
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
            window.location.hash = '#archive';
          }} />
          <AchievementsSection />
        </div>

        {currentView === 'archive' && (
          <ProjectsArchive onViewMain={() => {
            window.location.hash = '#projects';
          }} />
        )}

        {currentView === 'project-detail' && selectedProjectId && (
          <ProjectDetail
            projectId={selectedProjectId}
            onBack={() => {
              window.location.hash = '#projects';
            }}
          />
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

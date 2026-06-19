import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Trophy, Sparkles, Pin, GraduationCap, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Calendar, X, ExternalLink, Award, Code, BookOpen, Github } from "lucide-react";
import { achievementsData, galleryData, journeyData } from "../data";
import { TitleStaggerReveal } from "./TitleStaggerReveal";

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
      ease: [0.16, 1, 0.3, 1],
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

// Timeline section displaying achievements, educational history, and activities
export function AchievementsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [viewMode, setViewMode] = useState<"timeline" | "journey" | "gallery">("timeline");
  const [activeIdx, setActiveIdx] = useState(0);

  // Lightbox Modal state
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  const visibleItems = achievementsData;
  const visibleItemsWithImages = visibleItems.filter((item) => item.image);

  const nextGalleryItem = () => {
    setActiveIdx((prev) => (prev + 1) % galleryData.length);
  };

  const prevGalleryItem = () => {
    setActiveIdx((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  // Keyboard navigation for gallery
  useEffect(() => {
    if (viewMode !== "gallery") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextGalleryItem();
      if (e.key === "ArrowLeft") prevGalleryItem();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, activeIdx]);

  const activeGalleryItem = galleryData[activeIdx] || galleryData[0];

  return (
    <div 
      className="relative bg-[#161616] rounded-t-[8vw] md:rounded-t-[4vw] -mt-[8vw] md:-mt-[4vw] shadow-[0_-30px_60px_rgba(0,0,0,0.8)] z-30"
    >
      <section 
        id="achievements" 
        className="relative w-full flex flex-col pt-[calc(8vw+2rem)] md:pt-[calc(4vw+3rem)] pb-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
      >
        <video
          src="/achievements_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: "translate3d(0, 0, 0)",
            willChange: "opacity, transform",
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161616] via-transparent to-[#161616] z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[#161616]/70 z-0 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(222,219,200,0.05)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(222,219,200,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

        <motion.div 
          ref={headerRef} 
          className="max-w-4xl mx-auto mb-16 relative z-20 w-full"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="bg-[#101010] rounded-2xl border border-white/5 flex flex-col items-center justify-center py-5 sm:py-8 px-4 sm:px-8 text-center select-none shadow-xl shadow-black/40"
          >
            <TitleStaggerReveal
              text="Achievements & Activities."
              className="font-serif italic text-2xl sm:text-5xl md:text-6xl text-primary tracking-wide mb-1"
            />
            <motion.p
              variants={childVariants}
              className="text-gray-500 font-light text-xs sm:text-base max-w-lg mt-1"
            >
              Milestones from robotics championships to education and certifications.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* View Mode Toggle Switch (Matches ProjectsSection styling, 3 Options) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 relative z-20 max-w-2xl mx-auto">
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
              viewMode === "timeline"
                ? "border-primary text-black bg-primary"
                : "border-white/10 text-primary/70 hover:border-white/30 hover:text-primary bg-zinc-950/40"
            }`}
          >
            Timeline View
          </button>

          <button
            onClick={() => setViewMode("journey")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
              viewMode === "journey"
                ? "border-primary text-black bg-primary"
                : "border-white/10 text-primary/70 hover:border-white/30 hover:text-primary bg-zinc-950/40"
            }`}
          >
            Coding Journey
          </button>
          
          <button
            onClick={() => setViewMode("gallery")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
              viewMode === "gallery"
                ? "border-primary text-black bg-primary"
                : "border-white/10 text-primary/70 hover:border-white/30 hover:text-primary bg-zinc-950/40"
            }`}
          >
            Experience Gallery
          </button>
        </div>

        <div 
          className="max-w-2xl lg:max-w-[860px] xl:max-w-[1060px] 2xl:max-w-6xl mx-auto relative z-10 px-0 lg:px-8 w-full"
          style={{ contain: 'inline-size' }}
        >
          <AnimatePresence mode="wait">
            {viewMode === "timeline" ? (
              <motion.div
                key="timeline-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-0"
              >
                {visibleItems.map((item) => {
                  const hasImage = !!item.image;
                  const imageIndex = hasImage ? visibleItemsWithImages.findIndex(x => x.id === item.id) : -1;
                  const isImageRight = hasImage && imageIndex % 2 === 0;
                  const isImageLeft = hasImage && imageIndex % 2 === 1;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="relative flex flex-col lg:grid lg:grid-cols-[150px_80px_1fr] xl:grid-cols-[200px_100px_1fr] 2xl:grid-cols-[240px_120px_1fr] gap-0 group/item">
                        <div className="hidden lg:block lg:col-start-3 lg:row-start-1 pb-4">
                          <p className="font-serif italic text-3xl sm:text-4xl text-primary mb-1 leading-none">{item.year}</p>
                          {item.role && (
                            <p className="text-[10px] font-mono uppercase tracking-widest text-primary/50 mb-0">{item.role}</p>
                          )}
                        </div>

                        <div className="hidden lg:flex lg:col-start-2 lg:row-start-1 justify-center relative w-full h-full">
                          <div className="w-[1px] h-full bg-white/[0.08]" />
                        </div>

                        <div className="hidden lg:flex lg:col-start-1 lg:row-start-2 justify-end items-center relative">
                          {isImageLeft && (
                            <motion.div
                              initial={{ opacity: 0, scale: 1.05 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              onClick={() => {
                                setLightboxImg(item.image!);
                                setLightboxTitle(`${item.year} - ${item.title}`);
                              }}
                              className="lg:w-[150px] xl:w-[200px] 2xl:w-[240px] lg:h-[100px] xl:h-[133px] 2xl:h-[160px] shrink-0 rounded-2xl border border-white/5 overflow-hidden relative bg-zinc-950 group-hover/item:border-primary/20 transition-all duration-300 cursor-zoom-in"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-102 pointer-events-none select-none"
                              />
                            </motion.div>
                          )}
                        </div>

                        <div className="hidden lg:flex lg:col-start-2 lg:row-start-2 items-center justify-center relative h-full w-full min-h-[120px]">
                          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/[0.08] z-0" />
                          
                          <div className="w-9 h-9 rounded-full bg-[#161616] border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-black/50 shrink-0 z-10 relative">
                            {item.category === "achievement" ? (
                              <Trophy className="w-3.5 h-3.5" />
                            ) : item.category === "education" ? (
                              <GraduationCap className="w-3.5 h-3.5" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5" />
                            )}
                          </div>

                          {isImageLeft && (
                            <div className="absolute left-0 lg:w-[22px] xl:w-[32px] 2xl:w-[42px] top-1/2 -translate-y-1/2 flex items-center justify-start text-primary/40 pointer-events-none z-10">
                              <motion.div
                                initial={{ opacity: 0, x: 5 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                                className="shrink-0 -mr-1 flex items-center z-10"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </motion.div>
                              <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                style={{ originX: 1 }}
                                className="h-[1px] border-t border-dashed border-primary/30 flex-grow"
                              />
                            </div>
                          )}

                          <div className="absolute right-0 lg:w-[22px] xl:w-[32px] 2xl:w-[42px] top-1/2 -translate-y-1/2 flex items-center justify-end text-primary/40 pointer-events-none z-10">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              style={{ originX: 0 }}
                              className="h-[1px] border-t border-dashed border-primary/30 flex-grow"
                            />
                            <motion.div
                              initial={{ opacity: 0, x: -5 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4, duration: 0.3 }}
                              className="shrink-0 -ml-1 flex items-center z-10"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </motion.div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center shrink-0 w-9 pt-1 relative lg:hidden">
                          <div className="w-9 h-9 rounded-full bg-[#161616] border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-black/50 shrink-0 z-10">
                            {item.category === "achievement" ? (
                              <Trophy className="w-3.5 h-3.5" />
                            ) : item.category === "education" ? (
                              <GraduationCap className="w-3.5 h-3.5" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5" />
                            )}
                          </div>
                          <div className="w-[1px] flex-grow bg-white/[0.08] mt-3" />
                        </div>

                        <div className="flex-grow pb-8 sm:pb-14 lg:col-start-3 lg:row-start-2 lg:flex lg:items-center">
                          <div className="w-full">
                            <div className="lg:hidden mt-1">
                              <p className="font-serif italic text-2xl text-primary leading-none">{item.year}</p>
                              {item.role && (
                                <p className="text-[9px] font-mono uppercase tracking-widest text-primary/50 mt-1 mb-4">{item.role}</p>
                              )}
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3 xl:gap-4 2xl:gap-6 w-full mt-2 lg:mt-0">
                              <div className="bg-[#101010] rounded-2xl border border-white/5 p-4 sm:p-8 hover:border-primary/20 transition-colors duration-300 w-full lg:w-[320px] xl:w-[380px] 2xl:w-[420px] lg:shrink-0 relative z-10">
                                <h4 className="text-base sm:text-lg font-normal text-[#E1E0CC] mb-2">{item.title}</h4>
                                <p className="text-xs text-gray-400 font-light leading-relaxed mb-5">{item.description}</p>
                                
                                {item.details && (
                                  <ul className="space-y-2">
                                    {item.details.map((detail, dIdx) => (
                                      <li key={dIdx} className="flex items-start gap-2.5">
                                        <Pin className="w-3.5 h-3.5 text-primary/40 shrink-0 mt-0.5" />
                                        <span className="text-[11px] text-gray-500 font-light leading-normal">{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}

                                {hasImage && (
                                  <div 
                                    onClick={() => {
                                      setLightboxImg(item.image!);
                                      setLightboxTitle(`${item.year} - ${item.title}`);
                                    }}
                                    className="lg:hidden mt-5 w-full rounded-xl border border-white/5 overflow-hidden bg-zinc-950 cursor-zoom-in"
                                  >
                                    <img src={item.image} alt={item.title} className="w-full h-auto object-cover max-h-[220px]" />
                                  </div>
                                )}
                              </div>

                              {isImageRight && (
                                <>
                                  <div className="hidden lg:flex items-center justify-center flex-grow min-w-[24px] lg:max-w-[20px] xl:max-w-[40px] 2xl:max-w-[60px] text-primary/40">
                                    <motion.div
                                      initial={{ scaleX: 0 }}
                                      whileInView={{ scaleX: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.6, ease: "easeOut" }}
                                      style={{ originX: 0 }}
                                      className="h-[1px] border-t border-dashed border-primary/30 flex-grow"
                                    />
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: 0.4, duration: 0.3 }}
                                      className="shrink-0 -ml-1 flex items-center"
                                    >
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </motion.div>
                                  </div>

                                  <motion.div
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => {
                                      setLightboxImg(item.image!);
                                      setLightboxTitle(`${item.year} - ${item.title}`);
                                    }}
                                    className="hidden lg:flex lg:w-[150px] xl:w-[200px] 2xl:w-[240px] lg:h-[100px] xl:h-[133px] 2xl:h-[160px] shrink-0 rounded-2xl border border-white/5 overflow-hidden relative bg-zinc-950 group-hover/item:border-primary/20 transition-all duration-300 cursor-zoom-in"
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-102 pointer-events-none select-none"
                                    />
                                  </motion.div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : viewMode === "journey" ? (
              <motion.div
                key="journey-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-4xl mx-auto py-8"
              >
                {/* Vertical Timeline Stepper Line */}
                <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/[0.08] z-0" />

                <div className="space-y-10 relative z-10">
                  {journeyData.map((item) => {
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-stretch w-full relative"
                      >
                        {/* Checkpoint Badge Dot */}
                        <div className="absolute left-6 -translate-x-1/2 top-7 flex items-center justify-center z-10">
                          <div className="w-10 h-10 rounded-full bg-[#161616] border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-black/50 shrink-0">
                            {item.platform === "freeCodeCamp" ? (
                              <Code className="w-4 h-4" />
                            ) : item.platform === "HackerRank" ? (
                              <Award className="w-4 h-4" />
                            ) : (
                              <BookOpen className="w-4 h-4" />
                            )}
                          </div>
                        </div>

                        {/* Content Card Column */}
                        <div className="w-full pl-16">
                          <div className="bg-[#101010] rounded-2xl border border-white/5 p-6 sm:p-8 hover:border-primary/20 transition-all duration-300 flex flex-col md:flex-row gap-6 items-stretch relative">
                            {/* Text Info */}
                            <div className="flex-grow min-w-0 flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3.5 inline-block font-semibold">
                                  {item.duration}
                                </span>
                                <h4 className="text-base sm:text-lg font-normal text-[#E1E0CC] mb-1">{item.title}</h4>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-primary/50 mb-3">{item.platform}</p>
                                
                                <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">{item.description}</p>
                                
                                <ul className="space-y-2 mb-4">
                                  {item.details.map((detail, dIdx) => (
                                    <li key={dIdx} className="flex items-start gap-2.5">
                                      <Pin className="w-3.5 h-3.5 text-primary/40 shrink-0 mt-0.5" />
                                      <span className="text-[11px] text-gray-500 font-light leading-normal">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {item.credentialUrl && (
                                <a
                                  href={item.credentialUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[10px] font-mono text-primary/70 hover:text-primary transition-colors uppercase tracking-wider mt-2 font-semibold"
                                >
                                  {item.credentialUrl.includes("github.com") ? (
                                    <>
                                      GitHub Repository <Github className="w-3 h-3" />
                                    </>
                                  ) : (
                                    <>
                                      Verify Profile <ExternalLink className="w-3 h-3" />
                                    </>
                                  )}
                                </a>
                              )}
                            </div>

                            {/* Clickable Image Preview */}
                            <div 
                              onClick={() => {
                                setLightboxImg(item.image);
                                setLightboxTitle(`${item.platform} - ${item.title}`);
                              }}
                              className="w-full md:w-[220px] lg:w-[260px] aspect-video shrink-0 rounded-xl border border-white/5 overflow-hidden relative bg-zinc-950 group/img cursor-zoom-in hover:border-primary/30 transition-all duration-300"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105 pointer-events-none select-none"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-[10px] font-mono uppercase text-primary tracking-widest bg-black/60 px-2.5 py-1.5 rounded-full border border-primary/20">Zoom</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="gallery-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full overflow-hidden flex flex-col items-stretch lg:grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-8 lg:items-start"
              >
                {/* Main Image Panel */}
                <div className="w-full min-w-0 bg-[#101010] rounded-2xl sm:rounded-3xl border border-white/5 p-3 sm:p-6 flex flex-col shadow-xl shadow-black/40 overflow-hidden relative">
                  
                  {/* Image Container / Lightbox Support */}
                  <div 
                    onClick={() => {
                      setLightboxImg(activeGalleryItem.image);
                      setLightboxTitle(activeGalleryItem.title);
                    }}
                    className="relative aspect-video lg:aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#161616] border border-white/5 group cursor-zoom-in hover:border-primary/20 transition-colors"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeGalleryItem.id}
                        src={activeGalleryItem.image}
                        alt={activeGalleryItem.title}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                        className="pointer-events-none select-none z-10"
                      />
                    </AnimatePresence>
                    
                    {/* Zoom overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15 flex items-center justify-center">
                      <span className="text-[10px] font-mono uppercase text-primary tracking-widest bg-black/60 px-3 py-2 rounded-full border border-primary/20">Zoom Media</span>
                    </div>
                    
                    {/* Navigation Chevrons Over Image */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevGalleryItem();
                      }}
                      className="absolute left-2 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300 cursor-pointer z-20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextGalleryItem();
                      }}
                      className="absolute right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300 cursor-pointer z-20"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Index Indicator Badge */}
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/50 backdrop-blur-md border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono text-primary select-none z-20">
                      {String(activeIdx + 1).padStart(2, '0')} / {String(galleryData.length).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Text Meta Details */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGalleryItem.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-4 sm:mt-6 flex-grow min-w-0"
                    >
                      <div className="flex flex-wrap items-center gap-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-primary/70 mb-2 sm:mb-3">
                        <span className="bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full text-primary font-semibold">
                          {activeGalleryItem.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {activeGalleryItem.year}
                        </span>
                      </div>

                      <h3 className="font-serif italic text-xl sm:text-3xl text-[#E1E0CC] tracking-wide mb-2 sm:mb-4 leading-tight">
                        {activeGalleryItem.title}
                      </h3>

                      <p className="text-[11px] sm:text-sm text-gray-400 font-light leading-relaxed mb-4 sm:mb-6">
                        {activeGalleryItem.description}
                      </p>

                      {activeGalleryItem.details && activeGalleryItem.details.length > 0 && (
                        <div className="border-t border-white/5 pt-5">
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-primary/50 mb-3 font-semibold">Key Highlights</h4>
                          <ul className="space-y-3">
                            {activeGalleryItem.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <Pin className="w-3.5 h-3.5 text-primary/40 shrink-0 mt-0.5" />
                                <span className="text-[11px] sm:text-xs text-gray-500 font-light leading-relaxed">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Panel / Desktop Selector Directory */}
                <div className="hidden lg:flex flex-col w-full h-[600px] xl:h-[650px] shrink-0">
                  <div className="flex items-center gap-2 mb-4 px-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary/50 font-semibold">Media Directory</span>
                  </div>
                  
                  <div 
                    data-lenis-prevent
                    onWheel={(e) => e.stopPropagation()}
                    className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar"
                  >
                    {galleryData.map((item, idx) => {
                      const isActive = idx === activeIdx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveIdx(idx)}
                          className={`w-full text-left rounded-2xl border p-3 flex gap-4 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                            isActive 
                              ? "bg-[#161616] border-primary/30 shadow-md shadow-black/30" 
                              : "bg-[#101010]/60 border-white/5 hover:border-white/10 hover:bg-[#101010]"
                          }`}
                        >
                          {/* Active Left Border Accent */}
                          {isActive && (
                            <motion.div 
                              layoutId="galleryActiveBar"
                              className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"
                            />
                          )}
                          
                          {/* Small Thumbnail Image */}
                          <div className="w-20 h-14 shrink-0 rounded-lg overflow-hidden border border-white/5 bg-[#161616]">
                            <img
                              src={item.image}
                              alt={item.title}
                              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                                isActive ? "grayscale-0 opacity-100" : "grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
                              }`}
                            />
                          </div>

                          {/* Item Info */}
                          <div className="flex flex-col justify-center min-w-0">
                            <span className="text-[9px] font-mono text-primary/50 uppercase tracking-wider mb-1">
                              {item.year}
                            </span>
                            <h4 className={`text-xs font-normal truncate ${isActive ? "text-primary font-medium" : "text-[#E1E0CC]/80 group-hover:text-[#E1E0CC]"}`}>
                              {item.title}
                            </h4>
                            <span className="text-[9px] font-light text-gray-500 truncate mt-0.5">
                              {item.category}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Swipeable Thumbnail strip */}
                <div className="w-full lg:hidden mt-2">
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-primary/50">Swipe to Explore</span>
                  </div>
                  
                  <div 
                    data-lenis-prevent
                    onWheel={(e) => e.stopPropagation()}
                    className="w-full overflow-x-auto pb-4 scrollbar-none"
                  >
                    <div className="inline-flex gap-3 px-1 snap-x w-max">
                      {galleryData.map((item, idx) => {
                        const isActive = idx === activeIdx;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveIdx(idx)}
                            className={`flex-none w-28 rounded-xl border p-2 flex flex-col gap-2 transition-all duration-300 snap-start cursor-pointer ${
                              isActive 
                                ? "bg-[#101010] border-primary/30 shadow-md shadow-black/30" 
                                : "bg-[#101010]/60 border-white/5 hover:border-white/10"
                            }`}
                          >
                            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-white/5 bg-[#161616]">
                              <img
                                src={item.image}
                                alt={item.title}
                                className={`w-full h-full object-cover transition-all duration-500 ${
                                  isActive ? "grayscale-0 opacity-100" : "grayscale opacity-50"
                                }`}
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[8px] font-mono text-primary/50 uppercase truncate">
                                {item.year}
                              </p>
                              <h4 className={`text-[10px] font-normal truncate mt-0.5 ${isActive ? "text-primary font-medium" : "text-[#E1E0CC]/80"}`}>
                                {item.title}
                              </h4>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Full-Screen Lightbox Modal for Certificate / Badge Zoom */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 w-screen h-screen bg-black/95 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            {/* Top Close Bar */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-4">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest hidden sm:inline select-none">{lightboxTitle}</span>
              <button 
                onClick={() => setLightboxImg(null)}
                className="bg-black/80 hover:bg-primary hover:text-black text-white/80 p-2.5 rounded-full border border-white/10 transition-all cursor-pointer shadow-lg"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Expanded Image Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[85vh] flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/80 shadow-2xl p-1"
            >
              <img
                src={lightboxImg}
                alt={lightboxTitle}
                className="max-w-full max-h-[80vh] object-contain rounded-xl select-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

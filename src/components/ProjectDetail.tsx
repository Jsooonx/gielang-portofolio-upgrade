import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Github, ExternalLink, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projectsData } from "../data";

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

// Screenshot meta mapping for high-craft descriptions
interface ScreenshotMeta {
  file: string;
  title: string;
  description: string;
}interface FeatureMeta {
  title: string;
  description: string;
  image: string;
}

const PROJECT_ASSETS: Record<string, {
  accentColor: string;
  accentBg: string;
  gradient: string;
  problem: string;
  solution: string;
  screenshots: ScreenshotMeta[];
  features: FeatureMeta[];
}> = {
  warungify: {
    accentColor: "#25D366", // WhatsApp Green
    accentBg: "rgba(37, 211, 102, 0.15)",
    gradient: "from-[#112211] to-black",
    problem: "Small merchants who conduct business operations directly via WhatsApp chats face chaotic workflows. They struggle to parse incoming message orders, track payment statuses, organize shipping labels, and manage customer contacts efficiently using standard messaging apps alone.",
    solution: "A client-side SaaS workspace that introduces a 'Magic Paste' raw text parser, instant payment and packing workflow updates, and click-to-chat WhatsApp response templates. Designed to work 100% in-browser with secure Supabase storage and allowlist security gates.",
    screenshots: [
      { file: "hero.png", title: "Landing Page Hero", description: "Minimalist landing page communicating the core value proposition of turning chat orders into a structured operations dashboard." },
      { file: "login.png", title: "Secure Merchant Portal", description: "Clean login flow protected by a pre-signup invite gate restricting access to authorized beta merchants." },
      { file: "dashboard.png", title: "Operations Control Center", description: "Real-time indicators showing sales volume, unpaid orders, pending shipments, and recent activity." },
      { file: "createneworder.png", title: "Magic Paste Order Parser", description: "Input form utilizing smart patterns to parse disorganized text blocks into structured customer details, items, and pricing." },
      { file: "orders.png", title: "Workflow Pipeline Board", description: "List layout organizing orders by payment, packing, and shipment status with click-to-chat action triggers." },
      { file: "customers.png", title: "Customer Ledger Directory", description: "CRM ledger recording history, contact numbers, and total spending metrics for every customer." },
      { file: "whatsapptemplate.png", title: "Automated Message Templates", description: "Interactive workspace to define custom templates with dynamic variables like {name} and {total} for rapid customer updates." },
      { file: "features.png", title: "Interactive Features Grid", description: "Visual outline illustrating the key functional modules of the system." },
      { file: "explorepowerfulfeatures.png", title: "Core Modules Details", description: "Technical overview describing the client-side parsing and database synchronization mechanisms." },
      { file: "howitworks.png", title: "Onboarding Tutorial Guide", description: "Visual walkthrough guiding merchants on copying texts, parsing orders, and notifying buyers." },
      { file: "pricing.png", title: "SaaS Tier Structures", description: "Transparent tiered pricing cards featuring custom animations on hover." },
      { file: "footer.png", title: "Branded Navigation Footer", description: "High-contrast footer layout concluding the customer landing experience." }
    ],
    features: [
      {
        title: "Magic Paste Order Parser",
        description: "Instead of forcing sellers to fill out long forms line-by-line, the platform features a 'Magic Paste' input box. Sellers can copy unstructured, chaotic order text directly from a customer's WhatsApp chat (including messy formatting, emojis, products, addresses, and phone numbers) and paste it. The system automatically parses, extracts, and populates the fields for customer name, phone number, product name, price, quantity, and delivery notes.",
        image: "createneworder.png"
      },
      {
        title: "Operations & Bottleneck Dashboard",
        description: "A real-time command center designed to give sellers immediate operational clarity. Key widgets include Today's Work Queue (displays total orders created, payments pending, and items ready to pack) and a Bottleneck Aging Tracker that flags orders stuck in certain stages (e.g. unpaid orders for more than 24 hours, or packages stuck in 'Packing' for too long).",
        image: "dashboard.png"
      },
      {
        title: "Integrated WhatsApp Actions",
        description: "Beside every order card is a set of contextual WhatsApp quick-actions. With a single click, the platform compiles personalized, pre-written templates (filling in details like the buyer's name, products, total price, and shipping tracking numbers) and opens a direct WhatsApp chat window covering payment requests, payment confirmations, processing updates, and shipping alerts.",
        image: "whatsapptemplate.png"
      },
      {
        title: "Order Lifecycle Management",
        description: "A complete visual pipeline mapping the progress of every order. Sellers can search, filter, edit, and transition orders through custom status stages: Pending Payment, Paid, Packing, Shipped, Done, and Cancelled.",
        image: "orders.png"
      },
      {
        title: "Dynamic Invoice Generator",
        description: "Once an order is marked as paid, the system automatically assigns a sequential daily invoice ID (e.g. based on the current date and order sequence number) and generates a copyable, clean text-based invoice to send directly to customers.",
        image: "explorepowerfulfeatures.png"
      },
      {
        title: "Automated Customer CRM & Purchase History",
        description: "A directory built automatically from order records. Every customer receives a detailed profile card showing lifetime orders count and total value spent (LTV), direct WhatsApp contact buttons, last order date, and a complete scrollable history of past orders.",
        image: "customers.png"
      },
      {
        title: "Pre-signup Waitlist & Batch Approval Gate",
        description: "An onboarding security feature for beta testing. The sign-up flow is protected by a pre-signup allowlist trigger. Sellers apply to join the waitlist, and once approved by the administrator, their email is whitelisted in Supabase to allow account creation.",
        image: "login.png"
      },
      {
        title: "Fully Responsive Mobile-First Design",
        description: "Designed to fit the workflow of busy merchants on the go. The layout dynamically adapts between a detailed sidebar-based dashboard on desktop and a compact, swipeable bottom-navigation layout on mobile, keeping operations fast and fluid.",
        image: "features.png"
      }
    ]
  },
  scholarhub: {
    accentColor: "#3B82F6", // Academic Blue
    accentBg: "rgba(59, 130, 246, 0.15)",
    gradient: "from-[#111a2e] to-black",
    problem: "Students seeking global scholarships get overwhelmed by fragmented information, scattered deadlines, and complex eligibility criteria. Official details are often hard to find, leading to missed application openings.",
    solution: "A curated directory of global scholarships designed to help students discover and apply for study abroad opportunities, consolidating official information into a unified platform. It integrates multi-faceted search filters and real-time status indicators.",
    screenshots: [
      { file: "heropage.png", title: "Explore Landing Portal", description: "Clean hero banner with semantic search fields and quick degree filters to begin exploration." },
      { file: "levels.png", title: "Academic Degree Filters", description: "Segmented selectors to filter scholarships by Associate, Bachelor's, Master's, Doctoral/PhD, and Short Courses." },
      { file: "latest.png", title: "Recently Added Opportunities", description: "A feed displaying the newest global openings with sponsor tags and deadline timelines." },
      { file: "desceachsscholarships.png", title: "Scholarship Coverage & Rules", description: "Detailed case-view explaining funding coverage (tuition, living allowance), qualifications, and direct application links." },
      { file: "lists.png", title: "Advanced Search Catalog", description: "Grid search layout combining filters, keyword matching, and sorting by closing deadlines." },
      { file: "openin(month).png", title: "Interactive Monthly Timeline", description: "A chronological calendar view highlighting which major programs open or close in specific months." },
      { file: "providers.png", title: "Sponsor Category Directory", description: "Direct routing to listings by official sponsors: Government, Foundations, Universities, and Corporations." },
      { file: "76scholarships.png", title: "Database Opportunity Counter", description: "Counters tracking active listings, providing validation of the comprehensive coverage of the database." },
      { file: "notification.png", title: "Deadline Subscription Panel", description: "Settings interface to customize email alerts, ensuring students get notified 7, 3, or 1 day before closing." },
      { file: "navbarmenu.png", title: "Mobile Navigation Drawer", description: "Fully responsive, slide-out drawer providing clean layout options for mobile screens." },
      { file: "navbarsearch.png", title: "Instant Autocomplete Search", description: "Dynamic dropdown search matching queries instantly with scholarship titles and country tags." },
      { file: "footers.png", title: "Academic Portal Footer", description: "Professional footer highlighting platform credentials, links, and contact options." }
    ],
    features: [
      {
        title: "Interactive Hero Slideshow",
        description: "Displays featured global programs (DAAD, MEXT, Chevening, GKS, etc.) using an interactive hero slideshow with smooth animations powered by Framer Motion. Each slide features background cover images of iconic universities, funding details, and degree levels.",
        image: "heropage.png"
      },
      {
        title: "Advanced Filtering and Search (Multi-Faceted)",
        description: "Empowers users with multi-faceted search to filter opportunities by provider type, degree levels, funding status, and destination countries, updating results dynamically in real-time.",
        image: "lists.png"
      },
      {
        title: "Dynamic Deadline Status (Real-Time Tracker)",
        description: "Dynamically tracks and displays application status (Open, Closing Soon, Closed, Rolling Intake) by parsing real-time deadline data, calculated automatically against the current date.",
        image: "openin(month).png"
      }
    ]
  }
};


export function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const project = projectsData.find((p) => p.id === projectId);
  const assets = PROJECT_ASSETS[projectId];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!assets) return;
      if (e.key === "ArrowLeft") {
        setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : assets.screenshots.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveImageIdx((prev) => (prev < assets.screenshots.length - 1 ? prev + 1 : 0));
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, assets]);

  if (!project || !assets) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <p className="text-gray-400 font-light mb-4">Project detail not found.</p>
        <button onClick={onBack} className="text-primary hover:underline font-mono text-xs uppercase">
          Return Home
        </button>
      </div>
    );
  }

  const activeScreenshot = assets.screenshots[activeImageIdx];
  const nextProjectId = projectId === "warungify" ? "scholarhub" : "warungify";
  const nextProject = projectsData.find((p) => p.id === nextProjectId);

  return (
    <div className="relative min-h-screen bg-black text-[#E1E0CC] overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div className={`absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b ${assets.gradient} opacity-40 pointer-events-none z-0`} />
      <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pt-24 pb-32 relative z-10">
        
        {/* Back Button */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-primary/70 hover:text-primary transition-colors cursor-pointer"
          >
            <div className="bg-zinc-950/80 rounded-full w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:scale-105 transition-all">
              <ArrowLeft className="w-4 h-4 text-primary" />
            </div>
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <span 
              className="text-[10px] font-mono px-3 py-1 rounded-full border tracking-widest uppercase font-bold"
              style={{ 
                color: assets.accentColor, 
                borderColor: `${assets.accentColor}40`,
                backgroundColor: assets.accentBg 
              }}
            >
              Case Study
            </span>
            <h1 className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary tracking-wide mt-6 leading-none select-none">
              {project.title}.
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
            <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-[9px] font-mono text-gray-400 bg-zinc-900 border border-white/5 px-2.5 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-xs uppercase font-mono text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span>GitHub</span>
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-xs uppercase font-mono text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Narrative / Context Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-white/5 pt-12 mb-20">
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-xs uppercase font-mono text-gray-500 tracking-wider">The Challenge</h3>
            <p className="text-sm font-light text-gray-300 leading-relaxed">
              {assets.problem}
            </p>
          </div>
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-xs uppercase font-mono text-gray-500 tracking-wider">The Solution</h3>
            <p className="text-sm font-light text-gray-300 leading-relaxed">
              {assets.solution}
            </p>
          </div>
        </div>

        {/* Interactive Visual Showcase Gallery */}
        <div className="border-t border-white/5 pt-12 mb-24">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* Main Focused Screenshot */}
            <div className="lg:w-8/12 flex flex-col justify-between">
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/80 cursor-zoom-in hover:border-primary/30 shadow-2xl transition-all duration-300 flex items-center justify-center"
              >
                <img
                  src={`/images/${projectId}/${activeScreenshot.file}`}
                  alt={activeScreenshot.title}
                  className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-700 select-none pointer-events-none"
                />
                
                {/* Floating controls */}
                <div className="absolute top-4 right-4 bg-black/80 text-white/80 p-2.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg pointer-events-none">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 pt-16 pointer-events-none">
                  <h3 className="text-lg font-normal text-white">{activeScreenshot.title}</h3>
                  <p className="text-xs text-gray-400 font-light mt-1.5 max-w-xl">{activeScreenshot.description}</p>
                </div>
              </div>

              {/* Arrow navigation triggers */}
              <div className="flex justify-between items-center mt-4 px-2">
                <button
                  onClick={() => setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : assets.screenshots.length - 1))}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer font-mono uppercase"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-xs font-mono text-gray-500">
                  {String(activeImageIdx + 1).padStart(2, "0")} / {String(assets.screenshots.length).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setActiveImageIdx((prev) => (prev < assets.screenshots.length - 1 ? prev + 1 : 0))}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer font-mono uppercase"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right side Thumbnail Selection List */}
            <div className="lg:w-4/12 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono text-gray-500 tracking-wider">Interface Screens ({assets.screenshots.length})</h3>
                <div 
                  data-lenis-prevent
                  className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 overflow-y-auto max-h-[350px] pr-1.5 py-1"
                >
                  {assets.screenshots.map((screen, idx) => (
                    <button
                      key={screen.file}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative aspect-video rounded-lg overflow-hidden border transition-all duration-200 bg-zinc-950 ${
                        activeImageIdx === idx 
                          ? "border-primary scale-[0.98] shadow-md shadow-primary/10" 
                          : "border-white/5 hover:border-white/20 hover:scale-[1.02]"
                      }`}
                    >
                      <img
                        src={`/images/${projectId}/${screen.file}`}
                        alt={screen.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                      {activeImageIdx === idx && (
                        <div className="absolute inset-0 bg-primary/10 border border-primary/20" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:mt-0 p-5 rounded-2xl bg-zinc-950/60 border border-white/5">
                <h4 className="text-xs uppercase font-mono text-gray-400 tracking-wider mb-2">Technical Highlight</h4>
                <p className="text-[11px] font-light text-gray-500 leading-relaxed">
                  Every interface element has been client-side optimized to deliver lightning-fast load times. The components use CSS flexbox and grid foundations for absolute responsive parity.
                </p>
              </div>
            </div>

          </div>
        </div>



        {/* Feature Breakdown Grid */}
        <div className="border-t border-white/5 pt-16 mb-24">
          <h2 className="font-serif italic text-3xl sm:text-4xl text-primary tracking-wide mb-12 select-none">
            Deep Dive Features.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {assets.features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-2xl bg-[#0b0b0b] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-950 mb-5 relative">
                    <img 
                      src={`/images/${projectId}/${feature.image}`} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  </div>
                  <h3 className="text-lg font-normal text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block pt-2 border-t border-white/5">
                  Core Module {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Project Teaser Navigation */}
        {nextProject && (
          <div className="border-t border-white/5 pt-16 flex flex-col items-center text-center">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-4">Next Case Study</span>
            <a
              href={`#project/${nextProject.id}`}
              className="group inline-flex flex-col items-center"
            >
              <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-primary hover:text-white transition-colors tracking-wide leading-none mb-4">
                {nextProject.title} →
              </h2>
              <p className="text-xs text-gray-500 font-light max-w-sm">
                {nextProject.description}
              </p>
            </a>
          </div>
        )}

      </div>

      {/* Lightbox Modal Portal */}
      {isLightboxOpen && createPortal(
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 w-screen h-screen bg-black/98 backdrop-blur-md z-[9999] flex flex-col justify-between p-4 cursor-default select-none animate-fade-in"
        >
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between p-4 text-white z-50">
            <div className="flex flex-col">
              <span className="text-sm font-normal uppercase tracking-wider text-primary">{project.title} Case Study</span>
              <span className="text-xs font-mono text-gray-500 mt-1">{activeScreenshot.title}</span>
            </div>
            
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="bg-zinc-900/80 hover:bg-primary hover:text-black text-white p-2.5 rounded-full border border-white/10 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Screen Image Display */}
          <div className="flex-1 w-full flex items-center justify-between gap-4 relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : assets.screenshots.length - 1));
              }}
              className="absolute left-4 z-50 bg-black/70 hover:bg-primary hover:text-black text-white p-3 rounded-full border border-white/10 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div 
              onClick={(e) => e.stopPropagation()} 
              className="mx-auto max-w-6xl max-h-[70vh] flex items-center justify-center p-4 border border-white/5 rounded-2xl bg-zinc-950/40 shadow-2xl"
            >
              <img
                src={`/images/${projectId}/${activeScreenshot.file}`}
                alt={activeScreenshot.title}
                className="max-w-full max-h-[66vh] object-contain rounded-xl select-none"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIdx((prev) => (prev < assets.screenshots.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-4 z-50 bg-black/70 hover:bg-primary hover:text-black text-white p-3 rounded-full border border-white/10 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="w-full text-center p-4 border-t border-white/5 z-50 bg-black/80">
            <p className="text-sm text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              {activeScreenshot.description}
            </p>
            <span className="text-xs font-mono text-gray-500 mt-2 block">
              Image {activeImageIdx + 1} of {assets.screenshots.length} (Use Arrow Keys to Navigate)
            </span>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

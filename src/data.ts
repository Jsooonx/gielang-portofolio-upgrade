import { ProjectItem, Achievement } from "./types";

export const projectsData: ProjectItem[] = [
  {
    id: "timetable-solver",
    title: "Timetable Solver",
    description: "An automated scheduling optimizer utilizing constraint satisfaction algorithms to resolve complex school/university timetable conflicts dynamically.",
    category: "python",
    techStack: ["Python", "Constraint Programming", "Algorithms"],
    githubLink: "https://github.com/",
    details: [
      "Resolves tutor availability, room capacity, and course conflicts",
      "Backtracking search combined with constraint propagation (AC-3)",
      "Exports schedules into clean HTML/Excel visual layouts"
    ]
  },
  {
    id: "pathfinding-visualizer",
    title: "Pathfinding Visualizer",
    description: "An interactive desktop application built to visualize pathfinding search algorithms on custom grids, illustrating how search heuristics find the shortest paths.",
    category: "python",
    techStack: ["Python", "Pygame", "Algorithms", "GUI"],
    githubLink: "https://github.com/",
    details: [
      "Visualizes A*, Dijkstra, Breadth-First, and Depth-First search",
      "Allows real-time custom maze creation and start/end node placement",
      "Interactive speed settings and step-by-step logic stepping"
    ]
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    description: "A high-performance mass solver designed to solve 10 complex Sudoku boards simultaneously in one go, leveraging advanced backtracking and heuristics.",
    category: "python",
    techStack: ["Python", "Multithreading", "Backtracking", "Heuristics"],
    githubLink: "https://github.com/",
    details: [
      "Solves 10 standard 9x9 Sudoku puzzles in parallel in milliseconds",
      "Uses Minimum Remaining Values (MRV) heuristic for state reduction",
      "Provides comparative speed stats between single-threaded and multi-threaded runs"
    ]
  },
  {
    id: "scholastic-tracker",
    title: "Scholastic Record Hub",
    description: "A lightweight full-stack web application designed for scholastic record tracking, student task assignments, and progress monitoring.",
    category: "flask-web",
    techStack: ["Flask", "Python", "SQLite", "Tailwind CSS"],
    githubLink: "https://github.com/",
    details: [
      "RESTful API endpoints for user records and progress management",
      "Clean user authentication and secure cookie session handling",
      "Dynamic server-side page rendering with Jinja2 templates"
    ]
  },
  {
    id: "robotics-pid-controller",
    title: "PID Controller & Sensor System",
    description: "Microcontroller software designed to drive multi-sensor robotic chassis, including real-time sensor processing and motor velocity controller PID loop.",
    category: "c-cpp",
    techStack: ["C++", "C", "Arduino/AVR", "PID Control", "Embedded Systems"],
    githubLink: "https://github.com/",
    details: [
      "Optimized PID loops for precise chassis alignment and movement",
      "Ultrasonic and infrared sensor data polling with noise reduction filters",
      "Low-latency interrupts handling for encoder tracking"
    ]
  }
];

export const achievementsData: Achievement[] = [
  {
    id: "robotic-championship-2018",
    year: "2018",
    title: "National Robotics Championship",
    role: "Lead Systems Programmer",
    description: "Successfully defended the national title, designing a fully autonomous navigation bot using C/C++ on microcontroller boards.",
    details: [
      "Built an autonomous line-follower and maze-solving robot chassis",
      "Optimized infrared sensor reading filters and PID motor controller algorithms",
      "Won 1st place in the senior high school category"
    ]
  },
  {
    id: "robotic-championship-2017",
    year: "2017",
    title: "National Robotics Championship",
    role: "Hardware Integrator & Programmer",
    description: "Won the first national robotics championship gold medal, constructing a high-speed line tracker bot.",
    details: [
      "Designed a custom dual-motor chassis with integrated sensors",
      "Programmed the control unit in C with real-time interrupt logic",
      "Secured 1st place among top national student teams"
    ]
  },
  {
    id: "self-guided-cs",
    year: "2020 - Present",
    title: "Self-Guided CS & Software Development",
    description: "Started learning advanced modern web architectures, translating logic from C/C++ to Python, and starting to learn TypeScript, React, and Tailwind CSS.",
    details: [
      "Implemented algorithms from scratch (sorting, graphs, search trees)",
      "Transitioning web applications to type-safe React frontend interfaces"
    ]
  }
];

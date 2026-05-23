import { ProjectItem, Achievement } from "./types";

export const projectsData: ProjectItem[] = [
  {
    id: "timetable-solver",
    title: "Timetable Solver",
    description: "Built a CSP-based timetable scheduler using recursive backtracking with hard constraint validation across teacher availability, room capacity, and session overlap rules.",
    category: "python",
    techStack: ["Python", "Constraint Programming", "Algorithms"],
    githubLink: "https://github.com/Jsooonx/timetable-solver",
    details: [
      "Applied MRV-inspired heuristic ordering and a penalty-based scoring engine to rank and select optimal schedules."
    ]
  },
  {
    id: "pathfinding-visualizer",
    title: "Pathfinding Visualizer",
    description: "Implemented DFS, BFS, and A* with a Manhattan heuristic for grid-based pathfinding.",
    category: "python",
    techStack: ["Python", "Pygame", "Algorithms", "GUI"],
    githubLink: "https://github.com/Jsooonx/pathfinding-algorithm-visualizer-python",
    details: [
      "Built a Pygame visualizer to compare algorithm performance across 10+ maze configurations using nodes explored and path optimality."
    ]
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    description: "Developed a Sudoku solver using recursive backtracking with constraint validation across rows, columns, and 3x3 subgrids.",
    category: "python",
    techStack: ["Python", "Backtracking", "Algorithms"],
    githubLink: "https://github.com/Jsooonx/sudoku-solver-python",
    details: [
      "Applied the Minimum Remaining Value (MRV) heuristic to reduce search attempts from ~2,000,000 to ~7,000 on harder puzzles."
    ]
  },
  {
    id: "scholastic-tracker",
    title: "Scholastic Record Hub",
    description: "A lightweight full-stack web application designed for scholastic record tracking, student task assignments, and progress monitoring.",
    category: "flask-web",
    techStack: ["Flask", "Python", "SQLite", "Tailwind CSS"],
    githubLink: "https://github.com/Jsooonx",
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
    githubLink: "https://github.com/Jsooonx",
    details: [
      "Optimized PID loops for precise chassis alignment and movement",
      "Ultrasonic and infrared sensor data polling with noise reduction filters",
      "Low-latency interrupts handling for encoder tracking"
    ]
  }
];

export const achievementsData: Achievement[] = [
  {
    id: "cs50",
    year: "01/2026 - 03/2026",
    title: "CS50: Introduction to Computer Science",
    role: "Harvard University (via edX)",
    description: "Completed the full CS50 course content covering algorithms, memory, data structures, SQL, web development, Flask, and AJAX.",
    details: [
      "Solved 17+ problem sets using C, Python, SQL, HTML, CSS, and JavaScript.",
      "Practiced problem solving on HackerRank, earning 5★ in Python, 4★ in C++, and 3★ in C.",
      "Repository: github.com/Jsooonx/CS50-2026"
    ]
  },
  {
    id: "high-school",
    year: "08/2022 - 06/2025",
    title: "Senior High School Diploma",
    role: "State Senior High School 2 Surabaya (SMAN 2 Surabaya), Indonesia",
    description: "Science Track (Advanced Mathematics & Physics). Graduated with GPA 93.5/100 (EQF level 4).",
    details: [
      "Relevant Coursework: Advanced Mathematics, Physics."
    ]
  },
  {
    id: "robotic-championship-2018",
    year: "2018",
    title: "National Robotics Championship",
    role: "Lead Systems Programmer",
    description: "Successfully defended the national title, designing a fully autonomous navigation bot using C/C++ on microcontroller boards.",
    details: [
      "Built an autonomous line-follower and maze-solving robot chassis.",
      "Optimized infrared sensor reading filters and PID motor controller algorithms.",
      "Won 1st place in the senior high school category."
    ]
  },
  {
    id: "robotic-championship-2017",
    year: "2017",
    title: "National Robotics Championship",
    role: "Hardware Integrator & Programmer",
    description: "Won the first national robotics championship gold medal, constructing a high-speed line tracker bot.",
    details: [
      "Designed a custom dual-motor chassis with integrated sensors.",
      "Programmed the control unit in C with real-time interrupt logic.",
      "Secured 1st place among top national student teams."
    ]
  },
  {
    id: "self-guided-cs",
    year: "2020 - Present",
    title: "Self-Guided CS & Software Development",
    description: "Learning advanced modern web architectures, translating logic from C/C++ to Python, and learning TypeScript, React, and Tailwind CSS.",
    details: [
      "Implemented algorithms from scratch (sorting, graphs, search trees).",
      "Transitioning web applications to type-safe React frontend interfaces."
    ]
  }
];

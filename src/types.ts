export interface TextSegment {
  text: string;
  className?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'python' | 'flask-web' | 'c-cpp' | 'website-webapp';
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  videoLink?: string;
  details?: string[];
  image?: string;
  featured: boolean;
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  role?: string;
  description: string;
  details?: string[];
  category: 'achievement' | 'activity' | 'education';
  image?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  images?: string[];
  title: string;
  category: string;
  year: string;
  description: string;
  details?: string[];
}


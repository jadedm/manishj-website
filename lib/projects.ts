export interface Project {
  title: string;
  description: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    title: "crux_apps_script",
    description: "Google Apps Script tool for extracting Chrome User Experience Report (CrUX) data and Core Web Vitals metrics",
    githubUrl: "https://github.com/jadedm/crux_apps_script",
  },
  {
    title: "openconnect-gui",
    description: "Modern macOS GUI for OpenConnect VPN built with Electron and React",
    githubUrl: "https://github.com/jadedm/openconnect-gui",
  },
  {
    title: "aws-infrastructure",
    description: "One command deployment snippets on AWS using Terraform + Ansible",
    githubUrl: "https://github.com/jadedm/aws-infrastructure",
  },
  {
    title: "feed-the-cow",
    description: "A fast-paced browser arcade game built with Phaser 2 for World Milk Day",
    demoUrl: "/feed-the-cow",
    githubUrl: "https://github.com/jadedm/feed-the-cow",
  },
];

export function getRecentProjects(limit = 3): Project[] {
  return projects.slice(0, limit);
}

export function getAllProjects(): Project[] {
  return projects;
}

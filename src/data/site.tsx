import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Joseph",
  initials: "JO",
  url: "https://joseph-ndonje.vercel.app",
  description:
    "Software Engineer and an aspiring Entrepreneur. I love building things and watching anime. AI is all i can think of.",
  avatarUrl: "/me.jpeg",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "allenstanleewest@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/joseph-github",
        icon: Icons.github,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/joseph-twitter",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://dub.sh/joseph-youtube",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:allenstanleewest@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },
} as const;

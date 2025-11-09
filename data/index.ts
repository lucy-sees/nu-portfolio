import { Github, Linkedin, Youtube } from "lucide-react";

const data = {
  home: {
    name: "Lucy W. Mwangi",
    description:
      "I Fix, Optimize & Build #Next_js & #React Apps - Powered by #AI", // # -> for css style, _ -> create space, __ -> creates dash
    cvLink: "#contact",
  },
  sidebar: {
    links: [
      {
        name: "github",
        link: "https://github.com/lucy-sees",
        icon: Github,
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/lucy-wanjiru-mwangi/",
        icon: Linkedin,
      },
      {
        name: "youtube",
        link: "https://www.youtube.com/@lonewolfke",
        icon: Youtube,
      },
    ],
  },

  projects: {
    projects: [
      {
        id: 1,
        title: "Hurudevs",
        description:
          "Hurudevs is Kenya's leading web development agency specializing in creative websites, AI, branding, and SEO services.",
        image: "/projects-imgs/hurudevs.png",
        previewLink: "https://huru-devs.pages.dev/",
      },
      {
        id: 2,
        title: "Davinxi Cabin",
        description:
          "An online school that combines expert instruction, certified courses, and a vibrant community to help you achieve your goals—whether you're mastering coding, exploring chess strategies, or gaining new skills to fuel your ambitions.",
        image: "/projects-imgs/davinxi.png",
        previewLink: "https://davinxicabin.netlify.app",
      },
      {
        id: 3,
        title: "Stellar Tempo",
        description:
          "Stellar Tempo is a cosmic, neubrutalist web app designed to integrate your life schedule and creative passions into one engaging platform. Balancing high-impact tech projects with soulful music creation.",
        image: "/projects-imgs/stellar-tempo.png",
        previewLink: "https://stellar-tempo.netlify.app",
      },
      {
        id: 4,
        title: "Personal Portfolio Website",
        description:
          "A reliable and polished website that makes it easy for the expert to share their skills and impress potential clients or employers. \n\n Technologies Used: Next.js, React.js, CSS.",
        image: "/projects-imgs/portfolio.png",
        previewLink: "https://lucy-wanjiru-mwangi.netlify.app",
      },
      // {
      //   id: 5,
      //   title: "Trello Clone",
      //   description:
      //     "Clone of the Trello App which is a popular project management tool designed to help individuals and teams organize tasks and collaborate efficiently. It uses boards, lists, and cards to visually represent projects and tasks, making it easy to track progress and prioritize work.",
      //   image: "/projects-imgs/trello.png",
      //   githubLink: "https://github.com/lucy-sees/trello-app",
      //   previewLink: "https://trello-clone.netlify.app",
      // },
    ],
  },
  technologies: {
    skills: [
      {
        id: 1,
        name: "html",
        src: "/skills/html.svg",
        link: "https://en.wikipedia.org/wiki/HTML",
      },
      {
        id: 2,
        name: "css",
        src: "/skills/css.svg",
        link: "https://en.wikipedia.org/wiki/CSS",
      },
      {
        id: 3,
        name: "javascript",
        src: "/skills/javascript.svg",
        link: "https://en.wikipedia.org/wiki/JavaScript",
      },
      {
        id: 4,
        name: "typescript",
        src: "/skills/typescript.svg",
        link: "https://en.wikipedia.org/wiki/TypeScript",
      },
      {
        id: 5,
        name: "react",
        src: "/skills/react.svg",
        link: "https://en.wikipedia.org/wiki/React_(JavaScript_library)",
      },
      {
        id: 6,
        name: "tailwind",
        src: "/skills/tailwind.svg",
        link: "https://en.wikipedia.org/wiki/Tailwind_CSS",
      },
      {
        id: 7,
        name: "nextJS",
        src: "/skills/nextJS.svg",
        link: "https://en.wikipedia.org/wiki/Next.js",
      },
      {
        id: 8,
        name: "postgresql",
        src: "/skills/postgresql.svg",
        link: "https://en.wikipedia.org/wiki/PostgreSQL",
      },
      {
        id: 9,
        name: "vitejs",
        src: "/skills/vitejs.svg",
        link: "https://en.wikipedia.org/wiki/Vite_(software)",
      },
      {
        id: 10,
        name: "git",
        src: "/skills/git.svg",
        link: "https://en.wikipedia.org/wiki/Git",
      },
      {
        id: 11,
        name: "docker",
        src: "/skills/docker.svg",
        link: "https://en.wikipedia.org/wiki/Docker_(software)",
      },
      {
        id: 12,
        name: "figma",
        src: "/skills/figma.svg",
        link: "https://en.wikipedia.org/wiki/Figma",
      },
      {
        id: 13,
        name: "prisma",
        src: "/skills/prisma.svg",
        link: "https://en.wikipedia.org/wiki/Prisma",
      },
      {
        id: 14,
        name: "aws",
        src: "/skills/AWS.svg",
        link: "https://en.wikipedia.org/wiki/AWS",
      },
      {
        id: 15,
        name: "mongoDB",
        src: "/skills/mongoDB.svg",
        link: "https://en.wikipedia.org/wiki/MongoDB",
      },
    ],
  },
  contact: {
    email: "lucywanjirumwangi21@gmail.com",
  },
};

export default data;

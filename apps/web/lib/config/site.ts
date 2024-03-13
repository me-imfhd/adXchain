import { Icons } from "@repo/ui/icons";

type MySocialsProps = {
  title: string;
  href: string;
  external: boolean;
  icon: keyof typeof Icons;
};
export const Company = [
  {
    title: "About",
    href: "/about",
    external: false,
  },
  {
    title: "Privacy policy",
    href: "/privacy-policy",
    external: false,
  },
  {
    title: "Terms of service",
    href: "/terms",
    external: false,
  },
  {
    title: "Contact",
    href: "/contact",
    external: false,
  },
];
export const mySocials: MySocialsProps[] = [
  {
    title: "Github",
    href: "https://github.com/grazehub",
    external: true,
    icon: "gitHub",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/grazehub_twt/",
    external: true,
    icon: "twitter",
  },
  {
    title: "Discord",
    href: "https://discord.gg/RmbH7JEr",
    external: true,
    icon: "discord",
  },
];

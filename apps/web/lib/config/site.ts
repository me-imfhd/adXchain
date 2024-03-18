import { Icons } from "@repo/ui/icons";

type FooterNavProps = {
  title: string;
  items: {
    title: string;
    href: string;
    external: boolean;
  }[];
};
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
export const SiteConfig = {
  footerNav: [
    {
      title: "Get Started",
      items: [
        {
          title: "Connect Wallet",
          href: "/connect",
          external: false,
        },
        {
          title: "Add Collection",
          href: "/collection",
          external: false,
        },
        {
          title: "How it works",
          href: "/how",
          external: false,
        },
        {
          title: "FAQ",
          href: "/faq",
          external: false,
        },
      ],
    },
    {
      title: "Categories",
      items: [
        {
          title: "Collections",
          href: "/about",
          external: false,
        },
        {
          title: "NFTs",
          href: "/contact",
          external: false,
        },
        {
          title: "Assests",
          href: "/terms",
          external: false,
        },
        {
          title: "More",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Socials",
      items: [
        {
          title: "Instagram",
          href: "/about",
          external: false,
        },
        {
          title: "Youtube",
          href: "/contact",
          external: false,
        },
        {
          title: "Twitter",
          href: "/terms",
          external: false,
        },
        {
          title: "LinkedIn",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Socials",
      items: [
        {
          title: "Instagram",
          href: "/about",
          external: false,
        },
        {
          title: "Youtube",
          href: "/contact",
          external: false,
        },
        {
          title: "Twitter",
          href: "/terms",
          external: false,
        },
        {
          title: "LinkedIn",
          href: "/privacy",
          external: false,
        },
      ],
    },
  ] satisfies FooterNavProps[],
};
export const mySocials: MySocialsProps[] = [
  {
    title: "Github",
    href: "https://github.com/me-imfhd",
    external: true,
    icon: "gitHub",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/Mefhd2",
    external: true,
    icon: "twitter",
  },
  {
    title: "Discord",
    href: "https://discord.gg/U9GNWUnA",
    external: true,
    icon: "discord",
  },
];

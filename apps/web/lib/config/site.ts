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
    title: "Youtube",
    href: "https://www.youtube.com/@adXchain",
    external: true,
    icon: "youtube",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/adXchainIN",
    external: true,
    icon: "twitter",
  },
  {
    title: "Discord",
    href: "https://discord.gg/S7pAgPR3",
    external: true,
    icon: "discord",
  },
];

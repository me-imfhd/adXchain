import Link from "next/link";
import { Shell, buttonVariants } from "@repo/ui/components";
import { Company, SiteConfig, mySocials } from "@/lib/config/site";
import { Icons, LucideProps } from "@repo/ui/icons";
import { cn } from "@repo/ui/cn";

export const SiteFooter = () => {
  return (
    <footer className="w-full border-t bg-background">
      <Shell as={"div"}>
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        >
          <section
            id="footer-branding"
            aria-labelledby="footer-branding-heading"
          >
            <Link href={"/"} className="flex items-center space-x-2">
              <span className="tracking-wide text-2xl font-bold lg:inline-block gradient-text text-transparent animate-gradient">
                AdXChain
              </span>
            </Link>
          </section>
          <section className="grid flex-1 grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-4">
            {SiteConfig.footerNav.map((item) => (
              <div className="space-y-3">
                <h4 className="text-base font-medium">{item.title}</h4>
                <ul className="space-y-3">
                  {item.items.map((link) => (
                    <li>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                      >
                        {link.title}{" "}
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section
            id="newsletter"
            aria-labelledby="newsletter-heading"
            className="space-y-3"
          >
            <h4 className="text-base font-medium">
              Subscribe to our newsletter
            </h4>
          </section>
        </section>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-row items-center space-x-4"
        >
          <div className="text-left text-sm leading-loose text-muted-foreground">
            Built by{" "}
            <a
              aria-label="Kickflip tutorial on YouTube"
              href="/twitter"
              target="_blank"
              rel="noreferrer"
            >
              <span className="tracking-wide font-bold lg:inline-block gradient-text text-transparent animate-gradient">
                AdXChain Team
              </span>
            </a>
            .
          </div>
          <ul className="flex-1 flex flex-row space-x-3">
            {Company.map((link) => (
              <li>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  {link.title} <span className="sr-only">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-1">
            {mySocials.map((social) => {
              const Icon = Icons[social.icon];
              return (
                <Link href={social.href} target="_blank" rel="noreferrer">
                  <div
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" })
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{social.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </Shell>
    </footer>
  );
};

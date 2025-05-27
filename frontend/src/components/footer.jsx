
import { SiReact, SiFacebook, SiInstagram, SiX, SiGoogle } from '@icons-pack/react-simple-icons'

import { BACKEND_URL } from "@/lib/constants";
const sections = [
  {
    title: "More",
    links: [
      { name: "Overview", href: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { name: "About", href: "/about-us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "/help" },
      { name: "Privacy", href: "/privacy" },
    ],
  },
];

// interface Footer7Props {
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//   };
// }
// export const DashboardFooter = ({
//     logo = {
//       url: "https://www.shadcnblocks.com",
//       src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
//       alt: "logo",
//       title: "Shadcnblocks.com",
//     },
//   }: Footer7Props) => {

export const DashboardFooter = ({
  logo = {
    url: BACKEND_URL,
    src: `${BACKEND_URL}/static/assets/images/MukLogo.png`,
    alt: "logo",
    title: "AITS System",
  },
}) => {
  return (
    <section className="mb-2 py-16 px-4">
      <div className="container">
        <div className="flex w-full flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col items-center justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={BACKEND_URL}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8"
                />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              An academic issue tracking system build with love by group G members.
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <SiInstagram className="size-6" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <SiFacebook className="size-6" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <SiX className="size-6" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <SiGoogle className="size-6" />
                </a>
              </li>
            </ul>
          </div>
          <div className="grid w-full grid-cols-3 gap-6 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
          <p>© AITS Group S. All rights reserved.</p>
          <ul className="flex justify-center gap-4 lg:justify-start">
            <li className="hover:text-primary">
              <a href="#"> Terms and Conditions</a>
            </li>
            <li className="hover:text-primary">
              <a href="#"> Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

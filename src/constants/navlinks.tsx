import {
  IconBolt,
  IconBriefcase2,
  IconChartBar,
  IconDeviceLaptop,
  IconClipboardData,
  IconUsers,
  IconUsersGroup,
  IconHeartHandshake,
  IconScale,
} from "@tabler/icons-react";

export const navGroups = [
  {
    group: "The Fund",
    items: [
      { href: "/", label: "Overview", icon: IconBolt },
      { href: "/thesis", label: "Thesis", icon: IconClipboardData },
      { href: "/pro-forma", label: "Pro Forma", icon: IconChartBar },
      { href: "/venture-bond", label: "Venture Bond", icon: IconBriefcase2 },
    ],
  },
  {
    group: "Pipeline",
    items: [
      { href: "/deal-flow", label: "Deal Flow", icon: IconUsersGroup },
      { href: "/portfolio-support", label: "Portfolio Support", icon: IconHeartHandshake },
    ],
  },
  {
    group: "The Firm",
    items: [
      { href: "/edin-os", label: "EdinOS", icon: IconDeviceLaptop },
      { href: "/team", label: "Team", icon: IconUsers },
      { href: "/legal", label: "Legal & Compliance", icon: IconScale },
    ],
  },
];

// Flat list for backwards compatibility
export const navlinks = navGroups.flatMap((g) => g.items);

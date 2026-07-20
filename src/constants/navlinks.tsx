import {
  IconBolt,
  IconBriefcase2,
  IconChartBar,
  IconDeviceLaptop,
  IconClipboardData,
  IconUsers,
  IconUsersGroup,
  IconHeartHandshake,
  IconFolderOpen,
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
      { href: "/team", label: "Team & Track Record", icon: IconUsers },
      { href: "/documents", label: "Documents & Legal", icon: IconFolderOpen },
      { href: "/edin-os", label: "EdinOS", icon: IconDeviceLaptop },
    ],
  },
];

// Flat list for backwards compatibility
export const navlinks = navGroups.flatMap((g) => g.items);

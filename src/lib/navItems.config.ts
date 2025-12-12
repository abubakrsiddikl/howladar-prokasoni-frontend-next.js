import { NavSection, TRole } from "@/types";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";

export const getCommonNavItems = (role: TRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard as string,
          icon: "LayoutDashboard",
          roles: ["ADMIN", "STORE_MANAGER", "CUSTOMER"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: ["ADMIN", "STORE_MANAGER", "CUSTOMER"],
        },
        {
          title: "Home",
          href: `/`,
          icon: "Home",
          roles: ["ADMIN", "STORE_MANAGER", "CUSTOMER"],
        },
      ],
    },
  ];
};

export const customerNavItems: NavSection[] = [
  {
    items: [
      {
        title: "My Orders",
        href: "/customer/dashboard/orders",
        icon: "ListOrdered",
        roles: ["CUSTOMER"],
      },
    ],
  },
];

export const storeManagerNavItems: NavSection[] = [
  {
    title: "Book Management",
    items: [
      {
        title: "Add New Book",
        href: "/store-manager/dashboard/book-management",
        icon: "Plus",
        roles: ["STORE_MANAGER", "ADMIN"],
      },
      {
        title: "Add Book Category",
        href: "/store-manager/dashboard/genre-management",
        icon: "Layers",
        roles: ["STORE_MANAGER", "ADMIN"],
      },
      {
        title: "Add Author",
        href: "/store-manager/dashboard/author-management",
        icon: "UserPen",
        roles: ["STORE_MANAGER", "ADMIN"],
      },
      {
        title: "All Orders",
        href: "/store-manager/dashboard/orders-management",
        icon: "ShoppingCart",
        roles: ["STORE_MANAGER", "ADMIN"],
      },
      {
        title: "Add Banner",
        href: "/store-manager/dashboard/banner-management",
        icon: "ImagePlus",
        roles: ["STORE_MANAGER", "ADMIN"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Store Manager Management",
        href: "/admin/dashboard/storemanager-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Customer Management",
        href: "/admin/dashboard/customer-management",
        icon: "Stethoscope",
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: TRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems, ...storeManagerNavItems];
    case "STORE_MANAGER":
      return [...commonNavItems, ...storeManagerNavItems];
    case "CUSTOMER":
      return [...commonNavItems, ...customerNavItems];
    default:
      return [];
  }
};

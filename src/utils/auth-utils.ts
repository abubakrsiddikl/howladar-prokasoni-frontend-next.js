import { TRole } from "@/types";

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const authRoutes = ["/login", "/register"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-account"],
  pattern: [],
};

export const customerProtectedRoutes: RouteConfig = {
  exact: ["/checkout"],
  pattern: [/^\/customer/],
};

export const storemanagerProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/storemanager/],
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/admin/, /^\/storemanager/],
};

// check route is authRoute
export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

// check route isMatched
export const isMatched = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern) => pattern.test(pathname));
};

// check route ownership
export const getRouteOwner = (
  pathname: string
): "ADMIN" | "STORE_MANAGER" | "CUSTOMER" | "COMMON" | null => {
  if (isMatched(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isMatched(pathname, storemanagerProtectedRoutes)) {
    return "STORE_MANAGER";
  }
  if (isMatched(pathname, customerProtectedRoutes)) {
    return "CUSTOMER";
  }
  if (isMatched(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

// get default dashboard path by role after login
export const getDefaultDashboardRoute = (role: string) => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "STORE_MANAGER") {
    return "/storemanager/dashboard";
  }
  if (role === "CUSTOMER") {
    return "/customer/dashboard";
  }
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: TRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};

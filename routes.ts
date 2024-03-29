/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const testRoutes = [
  // '/profile',
  // '/cart',
  '/seller/profile',
  '/seller/dashboard'
]

export const userRoutes = [
  '/profile',
  '/cart',
  '/order',
]
export const sellerRoutes = [
  '/seller/profile',
  '/seller/dashboard'
]

export const publicRoutes = [
  "/",
  "/_not-found",
  "/store",
  "/auth/new-verification",
  "/home",
  "/home/store",
  "/home/category",
  "/home/about"
];

/**
 * An array of dynamic routes that are accessible to the public
 * These dynamic routes do not require authentication
 * @type {string[]}
 */
export const dynamicPublicRoutes = [
  "/product",
  "/order/success",
  "/order/failed",
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * An array of routes that are accessible to authenticated users
 * These routes require authentication
 * @type {string[]}
 */
// export const privateRoutes = [""]; All routes are private by default, is defined the middleware.ts


/**
 * The prefix for API routes
 * Routes that start with this prefix are used for API purposes. They are available to the public.
 * @type {string}
 */
export const apiRoutePrefix = "/api";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

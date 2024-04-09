import { auth } from "./auth";

const publicPaths = ["/"];

const authPaths = ["/auth/login"];

const apiPrefix = "/api";

/**
 * Middleware that runs on each page request
 * @param req - Next.js request object
 * 1. Check for API route
 * 2. Check for Auth route
 * 3. Check for Private route
 */
export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;

  const isPublicRoute = publicPaths.includes(nextUrl.pathname);
  const isAuthRoute = authPaths.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);

  if (isApiRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL("/dashboard", nextUrl));
    else return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};

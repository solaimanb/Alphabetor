import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/uploadthing",
    "/api/courses",
    "/api/webhook",
    "/about",
    "/contact",
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/bookshop"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

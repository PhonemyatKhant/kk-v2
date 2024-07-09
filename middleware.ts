import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login-register",
  },
});

export const config = {
  matcher: ["/admin/:path*", "/"],
};

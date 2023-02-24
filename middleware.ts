import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.method !== "POST")
    return new Response(
      JSON.stringify({ status: "error", result: "Bad Request" }),
      {
        status: 400,
      }
    );

  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth condition
  if (!session) {
    // No session. Return 401 error.
    return new Response(
      JSON.stringify({
        status: "error",
        result: "Unauthorized. Please login with your Google account.",
      }),
      {
        status: 401,
      }
    );
  }

  // Authentication successful, forward request to protected route.
  return res;
}

export const config = {
  matcher: "/protected/:path*",
};

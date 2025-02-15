// Auth0 API handler

// pages/api/auth/[...auth0].js

import { handleAuth } from "@auth0/nextjs-auth0";

export const GET = handleAuth();
export const POST = handleAuth();
export const DELETE = handleAuth();

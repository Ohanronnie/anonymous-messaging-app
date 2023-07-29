declare global {
  namespace Express {
    interface Request {
      csrf: string;
      token: string;
    }
  }
}
declare module "express-session" {
  interface SessionData {
    isAuthenticated: boolean;
    csrf: string;
  }
}

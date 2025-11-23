import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

// email sender (Brevo API)
import { sendContactMail, sendAutoReply } from "./mail";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

/**
 * Middleware: require admin API key for protected routes
 * - Accepts header:  x-api-key: <key>
 * - Or query: ?api_key=<key>  (useful for quick curl tests)
 */
function requireAdminApiKey(req: any, res: any, next: any) {
  // If no key configured on server, deny access (safe default)
  if (!ADMIN_API_KEY) {
    console.warn("[auth] ADMIN_API_KEY not set, denying admin access");
    return res.status(401).json({ success: false, error: "Admin API key not configured" });
  }

  const headerKey = req.get?.("x-api-key") ?? req.headers?.["x-api-key"];
  const queryKey = req.query?.api_key;

  if (headerKey && headerKey === ADMIN_API_KEY) return next();
  if (queryKey && queryKey === ADMIN_API_KEY) return next();

  console.warn("[auth] invalid admin api key attempt from", req.ip ?? req.connection?.remoteAddress);
  return res.status(401).json({ success: false, error: "Unauthorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact submit
  app.post("/api/contact", async (req, res) => {
    try {
      // simple honeypot to ignore bots
      if (req.body?.hp) {
        console.log("[contact] honeypot hit - ignoring submission");
        return res.status(200).json({ success: true });
      }

      // validate request body using Zod schema
      const validatedData = insertContactSchema.parse(req.body);

      // 1️⃣ Save to storage (DB or memory)
      const submission = await storage.createContactSubmission(validatedData);

      // 2️⃣ Send emails (fire-and-forget)
      sendContactMail(submission)
        .then(() => console.log("[mail] admin email sent for", submission.id ?? submission.name))
        .catch((err) => console.error("[mail] admin email error:", err));

      sendAutoReply(submission)
        .then(() => console.log("[mail] auto-reply sent to", submission.email))
        .catch((err) => console.error("[mail] auto-reply error:", err));

      // 3️⃣ Respond to frontend immediately with created resource
      return res.status(201).json({
        success: true,
        message: "Contact submitted successfully",
        data: submission,
      });
    } catch (error: any) {
      // Zod validation error
      if (error?.name === "ZodError") {
        console.warn("[contact] validation failed:", error);
        return res.status(400).json({ success: false, error: "Invalid input data", details: error });
      }

      // generic server error
      console.error("[contact] unexpected error:", error);
      return res.status(500).json({ success: false, error: "Failed to submit contact form" });
    }
  });

  // Protected: Get all submissions (admin only)
  app.get("/api/contact-submissions", requireAdminApiKey, async (_req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      return res.json({ success: true, data: submissions });
    } catch (error) {
      console.error("[contact-submissions] error:", error);
      return res.status(500).json({ success: false, error: "Failed to retrieve contact submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

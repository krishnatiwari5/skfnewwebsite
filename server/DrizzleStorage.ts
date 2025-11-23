// server/DrizzleStorage.ts
import type { IStorage } from "./storage";
import type { InsertContact, ContactSubmission } from "@shared/schema";
import { db } from "./db";
import { contactSubmissions } from "@shared/schema";

export class DrizzleStorage implements IStorage {
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    // insert and return the first inserted row
    const res = await db.insert(contactSubmissions).values(insertContact).returning();
    return res[0] as ContactSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const rows = await db.select().from(contactSubmissions);
    return rows as ContactSubmission[];
  }
}

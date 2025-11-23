import { type ContactSubmission, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";
import { DrizzleStorage } from "./DrizzleStorage";

 
export interface IStorage { 
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}
 
export class MemStorage implements IStorage {
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.contactSubmissions = new Map();
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertContact,
      id,
      submittedAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

// export const storage = new MemStorage();

export const storage = process.env.USE_DB === "true" ? new DrizzleStorage() : new MemStorage();
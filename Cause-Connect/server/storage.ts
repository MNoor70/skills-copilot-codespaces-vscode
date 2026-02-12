import { db } from "./db";
import {
  donations,
  contactMessages,
  testimonials,
  type InsertDonation,
  type Donation,
  type InsertContactMessage,
  type ContactMessage,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";

export interface IStorage {
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonations(): Promise<Donation[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class DatabaseStorage implements IStorage {
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const [donation] = await db
      .insert(donations)
      .values(insertDonation)
      .returning();
    return donation;
  }

  async getDonations(): Promise<Donation[]> {
    return await db.select().from(donations).orderBy(donations.createdAt);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }
}

export const storage = new DatabaseStorage();

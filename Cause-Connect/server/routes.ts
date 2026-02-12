import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.donations.create.path, async (req, res) => {
    try {
      const input = api.donations.create.input.parse(req.body);
      const donation = await storage.createDonation(input);
      res.status(201).json(donation);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get(api.donations.list.path, async (req, res) => {
    try {
      const donations = await storage.getDonations();
      // Only return last 10 for ticker
      res.json(donations.slice(-10).reverse());
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get(api.testimonials.list.path, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const testimonials = await storage.getTestimonials();
  if (testimonials.length === 0) {
    await storage.createTestimonial({
      name: "Sarah Jenkins",
      role: "Donor",
      content: "I love knowing exactly where my donation goes. The transparency of this platform is unmatched.",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg"
    });
    await storage.createTestimonial({
      name: "Michael Chen",
      role: "Volunteer",
      content: "Being able to connect directly with those in need has changed my perspective completely.",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg"
    });
    await storage.createTestimonial({
      name: "Elena Rodriguez",
      role: "Beneficiary",
      content: "The support I received helped me get back on my feet during a difficult time. Thank you!",
      avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg"
    });
  }
}

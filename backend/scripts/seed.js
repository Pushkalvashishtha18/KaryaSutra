import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Project from "../src/models/Project.js";
import Client from "../src/models/Client.js";
import Contact from "../src/models/Contact.js";
import Newsletter from "../src/models/Newsletter.js";
import AdminUser from "../src/models/AdminUser.js";
import connectDB from "../src/config/db.js";

const seed = async () => {
  await connectDB();
  console.log("Clearing existing data...");
  await Promise.all([
    Project.deleteMany({}),
    Client.deleteMany({}),
    Contact.deleteMany({}),
    Newsletter.deleteMany({}),
    AdminUser.deleteMany({}),
  ]);

  console.log("Seeding admin user...");
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@123", 10);
  await AdminUser.create({
    email: process.env.ADMIN_EMAIL || "admin@karyakosha.test",
    passwordHash,
    name: "Site Admin",
  });

  console.log("Seeding projects...");
  const projects = Array.from({ length: 6 }).map((_, idx) => ({
    name: `Project ${idx + 1}`,
    description: "Sample project description showcasing capabilities.",
    imageUrl: "https://via.placeholder.com/450x350.png?text=Project",
  }));
  await Project.insertMany(projects);

  console.log("Seeding clients...");
  const clients = [
    {
      name: "Acme Corp",
      designation: "CEO",
      description: "They delivered beyond expectations!",
      imageUrl: "https://via.placeholder.com/200x200.png?text=Client",
    },
    {
      name: "Zenith LLC",
      designation: "CTO",
      description: "Reliable partner for digital products.",
      imageUrl: "https://via.placeholder.com/200x200.png?text=Client",
    },
    {
      name: "Nova Ventures",
      designation: "Founder",
      description: "Great attention to detail and design.",
      imageUrl: "https://via.placeholder.com/200x200.png?text=Client",
    },
    {
      name: "Orion Labs",
      designation: "Product Lead",
      description: "Smooth collaboration and delivery.",
      imageUrl: "https://via.placeholder.com/200x200.png?text=Client",
    },
  ];
  await Client.insertMany(clients);

  console.log("Seeding contacts & newsletter...");
  await Contact.create({
    fullName: "Sample User",
    email: "user@example.com",
    mobile: "1234567890",
    city: "Sample City",
  });
  await Newsletter.create({ email: "newsletter@example.com" });

  console.log("Seed complete");
  mongoose.connection.close();
};

seed().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});


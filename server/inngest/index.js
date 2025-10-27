import { Inngest } from "inngest";
import connectDB from "../configs/db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Create user
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    try {
      await connectDB();
      await User.create(userData);
      console.log("✅ User created:", userData.email);
    } catch (error) {
      console.error("❌ Error creating user:", error);
    }
  }
);

// Delete user
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    try {
      await connectDB();
      await User.findByIdAndDelete(id);
      console.log("🗑️ User deleted:", id);
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  }
);

// Update user
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    try {
      await connectDB();
      await User.findByIdAndUpdate(id, userData);
      console.log("♻️ User updated:", userData.email);
    } catch (error) {
      console.error("❌ Error updating user:", error);
    }
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];

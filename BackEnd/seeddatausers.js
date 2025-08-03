import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";

import userModel from "./Model/user.model.js";

// await mongoose.connect("mongodb://localhost:27017/your_db_name"); // Replace with your DB URI
mongoose
  .connect(
    "mongodb+srv://balaji5220771:dMoPRcPPQGfrs593@cluster0.wyl2bi0.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
    // seedData();
  })
  .catch((err) => console.error(err));

const users = [
  {
    username: "rajveer_99",
    password: "Raj@1234",
    email: "rajveer99@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    username: "ananya.sharma",
    password: "Ananya@456",
    email: "ananya.sharma21@yahoo.com",
    profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    username: "vinay_kumar",
    password: "Vinay!789",
    email: "vinaykumar88@outlook.com",
    profileImage: "https://randomuser.me/api/portraits/men/81.jpg",
  },
  {
    username: "megha_rao",
    password: "Megha#321",
    email: "megharao12@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    username: "aarav_singh",
    password: "Aarav@000",
    email: "aarav.singh23@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    username: "isha.patil",
    password: "Isha@1111",
    email: "isha_patil19@yahoo.in",
    profileImage: "https://randomuser.me/api/portraits/women/57.jpg",
  },
  {
    username: "manavverma",
    password: "Manav@999",
    email: "manav.verma10@hotmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    username: "kavita.mehra",
    password: "Kavita@234",
    email: "kavita.mehra99@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/83.jpg",
  },
  {
    username: "yash_thakur",
    password: "Yash#2020",
    email: "yash.thakur45@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/63.jpg",
  },
  {
    username: "riya.kapoor",
    password: "Riya$123",
    email: "riya.kapoor88@yahoo.com",
    profileImage: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  // ... rest of the users
];

// Hash passwords
const usersWithHashedPasswords = await Promise.all(
  users.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return { ...user, password: hashedPassword };
  })
);

// Insert into MongoDB
await userModel.insertMany(usersWithHashedPasswords);

console.log("Users inserted with hashed passwords");
// mongoose.disconnect();

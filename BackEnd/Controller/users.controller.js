import mongoose from "mongoose";
import userModel from "../Model/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export default async function Users(req, res) {
  try {
    let users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function createUsers(req, res) {
  try {
    // let { name, email, password } = req.body;
    let { username, email, password } = req.body;

    if (await userModel.findOne({ email })) {
      res.json("User Email already exists");
    }
    // console.log(newUserdata);
    let hashpassword = await bcrypt.hash(password, 10);
    let newUser = await userModel.create({
      username,
      email,
      password: hashpassword,
    });
    return res
      .status(200)
      .json({ message: "user registered suceessfully", newUser });
  } catch (err) {
    res.status(404).send(err.message);
  }
}

export async function deleteUser(req, res) {
  try {
    let { id } = req.params;
    // console.log(newUserdata);
    let newUser = await userModel.deleteMany({});
    return res.status(200).send(newUser);
  } catch (err) {
    res.status(404).send(err);
  }
}

export async function LoginUser(req, res) {
  try {
    let { email, password } = req.body;
    let data = await userModel.findOne({ email });

    if (!data) {
      res.json({ message: `user not registered, check your email` });
    } else {
      let validate = await bcrypt.compare(password, data.password);
      if (!validate) {
        res.json({ message: "incorrect password" });
      } else {
        var token = JWT.sign({ userId: data._id, email: data.email }, "hello", {
          expiresIn: "10d",
        });

        res.json({ message: "Password matched", token, data });
      }
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}

export const insertManyUsers = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res
        .status(400)
        .json({ message: "Request body must be a non-empty array" });
    }

    const insertedUsers = await userModel.insertMany(users);
    res.status(201).json({
      message: "Users inserted successfully",
      data: insertedUsers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to insert users", error: error.message });
  }
};

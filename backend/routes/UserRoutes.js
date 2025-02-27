import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/Auth.js";

const userRouter = express.Router();

userRouter.get("/:id", verifyToken, getUser);
userRouter.get("/:id/friends", verifyToken, getUserFriends);

userRouter.patch("/:id/friendId", verifyToken, addRemoveFriend);

export default userRouter;

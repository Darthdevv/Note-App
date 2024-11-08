import { Router } from "express";
import {
  signUp,
  signIn,
  getUserAccounts,
  // getSpecificUserAccount,
  // deleteAccount,
  // updateAccount,
} from "../controllers/user.controllers.js";
import authenticationHandler from "../middlewares/auth/authentication.middleware.js";
// import validationHandler from "../middlewares/validation/validation.middleware.js";
// import {
//   signUpSchema,
//   signInSchema,
//   getAllUsersSchema,
//   getSpecificUserSchema,
//   updateUserSchema,
//   deleteUserSchema,
// } from "../schemas/user.schema.js";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/").get( getUserAccounts);

export default router;

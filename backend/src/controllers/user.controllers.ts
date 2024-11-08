import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import appError from "../utils/appError.js";
import { catchAsync } from "../helpers/catchAsync";
import APIFeatures from "../utils/apiFeatures.js";
import { ParsedQs } from "qs";

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response {message, data}
 * @description create new user
 **/

interface SignUpRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

export const signUp = catchAsync(
  async (req: SignUpRequest, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return next(new appError("Please fill in all fields.", 400));
    }

    const lowerCaseEmail = email.toLowerCase();

    // Check if email already exists
    const doesEmailExist = await User.findOne({ email: lowerCaseEmail });
    if (doesEmailExist) {
      return next(new appError("Email already exists", 409));
    }

    // Check if username already exists
    const doesUsernameExist = await User.findOne({ username });
    if (doesUsernameExist) {
      return next(new appError("Username already exists", 409));
    }

    // Check password length
    if (password.trim().length < 8) {
      return next(new appError("Password must be at least 8 characters", 400));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      username,
      email: lowerCaseEmail,
      password: hashedPassword,
    });

    if (!user) {
      return next(new appError("User registration failed", 422));
    }

    res.status(201).json({
      message: `New user ${user.email} is registered`,
      data: user,
    });
  }
);

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response { token, userName, id, role}
 * @description accessing the site by providing credentials (email and password).
 **/

interface SignInRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const signIn = catchAsync(
  async (req: SignInRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return next(new appError("Fill in all fields.", 400));
    }

    const lowerCaseEmail = email.toLowerCase();

    // Find user by email
    const user = await User.findOne({ email: lowerCaseEmail }).select(
      "+password"
    );
    if (!user) {
      return next(new appError("User Not Found.", 404));
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(new appError("Invalid Password.", 400));
    }

    const { _id: id, username } = user;

    // Generate JWT
    const token = jwt.sign(
      { id, username },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ token, id, username });
  }
);

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response { status, requestedAt, results, data }
 * @description retreiving (reading) all users from database.
 **/

interface GetUserAccountsRequest extends Request {
  query: ParsedQs; // Use ParsedQs instead of any
  requestTime?: string; // Assuming requestTime is added to req in middleware
}


export const getUserAccounts = catchAsync(
  async (req: GetUserAccountsRequest, res: Response, next: NextFunction) => {
    // Use APIFeatures with User model query and request query parameters
    const features = new APIFeatures(User.find().select("-password"), req.query)
      .filter()
      .sort()
      .paginate();

    const users = await features.query;

    // Check if any users were found
    if (!users || users.length === 0) {
      return next(new appError("No Users Found", 404));
    }

    // Respond with user data
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: users.length,
      data: { users },
    });
  }
);

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} returns response { data }
 * @description retreiving (reading) specific user from database.
 **/

// export const getSpecificUserAccount = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const user = await User.findById(id).select("-password");

//   if (!user) {
//     return next(new appError("Couldn't find this User", 404));
//   }

//   res.status(200).json({ data: user });
// });

// /**
//  * @param {object} req
//  * @param {object} res
//  * @param {object} next
//  * @returns {object} returns response { message , data }
//  * @description updating logged user from database.
//  **/

// export const updateAccount = catchAsync(async (req, res, next) => {
//   const { firstName, lastName, email, recoveryEmail, DOB, mobileNumber } =
//     req.body;

//   if (
//     !firstName ||
//     !lastName ||
//     !email ||
//     !recoveryEmail ||
//     !DOB ||
//     !mobileNumber
//   ) {
//     return next(new appError("Please fill in all fields.", 400));
//   }

//   const userName = `${firstName} ${lastName}`;

//   //get user from database
//   const user = await User.findById(req.user.id);
//   const { role, password } = user;

//   if (!user) {
//     return next(new appError("User not found.", 404));
//   }

//   const lowerCaseEmail = email.toLowerCase();
//   //make sure that the email does not already exist
//   const emailExists = await User.findOne({ email: lowerCaseEmail });

//   if (emailExists && emailExists._id != req.user.id) {
//     return next(new appError("Email already exists.", 409));
//   }

//   //update user info on database
//   if (user._id == req.user.id) {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       {
//         firstName,
//         lastName,
//         userName,
//         email,
//         recoveryEmail,
//         DOB,
//         mobileNumber,
//         role,
//         password,
//       },
//       { new: true }
//     );

//     res
//       .status(200)
//       .json({
//         message: "User Account updated successfully.",
//         data: updatedUser,
//       });
//   } else {
//     return next(new appError("Failed to update User Account.", 403));
//   }
// });

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void} returns nothing as the status code is 204 No Content
 * @description deleting logged user from database.
 **/

// export const deleteAccount = catchAsync(async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     return next(new appError("User not found.", 404));
//   }

//   if (user._id == req.user.id) {
//     await User.findByIdAndDelete(req.user.id);

//     res.status(204).json({ message: "User Account deleted successfully." });
//   } else {
//     return next(new appError("Failed to delete User Account.", 403));
//   }
// });
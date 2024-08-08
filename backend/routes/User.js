const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = z.object({
  username: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(5).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const valid_input = signupSchema.safeParse(req.body);
  if (!valid_input.success) {
    return res.status(404).json({
      message: "Incorrect inputs",
    });
  }
  const existinguser = await User.findOne({
    username: body.username,
  });
  if (existinguser) {
    return res.status(411).json({
      message: "email alread exisst",
    });
  }

  // making the user
  const user = await User.create(body);
  // creating the acocunt of the user
  const userId = user._id;
  const account = await Account.create({
    userId: userId,
    balance: (1 + Math.random()) * 10000,
  });
  const token = jwt.sign({ userid: user._id }, JWT_SECRET);
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

const signinschema = z.object({
  username: z.string().email(),
  password: z.string().min(5).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const valid_input = signinschema.safeParse(body);
  if (!valid_input.success) {
    return res.status(411).json({
      message: "invlaid username or password",
    });
  }
  // findind the user in the database
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (!user) {
    return res.status(411).json({
      message: "error while loggig in",
    });
  }

  const token = jwt.sign({ userid: user._id }, JWT_SECRET);
  res.status(200).json({
    message: "user is loginned",
    token,
  });
});

const updatebodySchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  password: z
    .string()
    .min(5)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .optional(),
});
// update fucnction hase filter insde it only
router.put("/", authMiddleware, async (req, res) => {
  const valid_input = updatebodySchema.safeParse(req.body);
  if (valid_input.success) {
    await User.updateOne({ _id: req.userId }, req.body);
    return res.status(200).json({
      message: "Updated successfully",
    });
  }

  res.status(411).json({
    message: "Error while updating information",
  });
});

const friendschema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.get("/bulk", async (req, res) => {
  const parameter = req.query.filter || " ";
  const valid_friend = friendschema.safeParse(req.query.filter);
  if (valid_friend) {
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: parameter,
          },
        },
        {
          lastName: {
            $regex: parameter,
          },
        },
      ],
    });
    const user = users.map((user) => {
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
    });
    res.status(200).json({
      user,
    });
  }
});

module.exports = router;

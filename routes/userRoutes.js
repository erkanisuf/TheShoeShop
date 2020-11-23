const router = require("express").Router();
const Users = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Validate
const Joi = require("@hapi/joi"); //Validation package (it needs own Joi.object({} schema))

const JoiSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

/// Routes
router.post("/register", async (req, res) => {
  const { error } = JoiSchema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const noDupeEmail = await Users.findOne({ email: req.body.email }); //Checks if email duplicates in Database (findOne!)
  if (noDupeEmail) return res.status(400).send("Email already exists!");

  //Has Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const saveUser = await user.save();
    res.send({ user: user.email });
  } catch (err) {
    res.status(400).status(err);
  }
});

////// LOGIN //////////////
const JoiSchemaLogin = Joi.object({
  name: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
});
router.post("/login", async (req, res) => {
  const { error } = JoiSchemaLogin.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const user = await Users.findOne({ name: req.body.name }); //Checks if email duplicates in Database (findOne!)
  if (!user) return res.status(400).send("User name doesnt exists!");

  const validPassword = await bcrypt.compare(req.body.password, user.password); //Checks if password matches with Db
  if (!validPassword) return res.status(400).send("Invalid password");
  //Make Tokens
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_USER);

  res.header("auth_token", token).send({ token: token, user: user.name });
});

router.get("/userpost", async (req, res) => {
  const users = await Users.find({}).populate("products", {
    name: 1,
    price: 1,
  });
  res.send(users);
});

module.exports = router;

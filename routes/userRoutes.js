const router = require("express").Router();
const Users = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./privateRoute");
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
    // res.send({ user: user.email });

    const userFind = await Users.findOne({ name: req.body.name });
    const validPassword = await bcrypt.compare(
      req.body.password,
      userFind.password
    );
    const token = jwt.sign({ _id: userFind._id }, process.env.TOKEN_USER);
    res
      .header("auth_token", token)
      .send({ token: token, user: userFind.name, userID: userFind.id });
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

  res.header("auth_token", token).send({
    token: token,
    user: user.name,
    userID: user.id,
    adress: user.adress,
  });
});
// UPDATE User Adress
const JoiSchemaUpdateAdress = Joi.object({
  adress: {
    street: Joi.string().min(6),
    city: Joi.string().min(6),
    phone: Joi.string().min(6),
    postcode: Joi.string().min(4),
  },
});

router.put("/update/:id", (request, response, next) => {
  const { error } = JoiSchemaUpdateAdress.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  const body = request.body;

  const newUpdate = {
    adress: body.adress,
  };
  let token = request.header("auth_token");
  if (!token)
    return response
      .status(401)
      .send({ auth: false, message: "No token provided" });
  jwt.verify(token, process.env.TOKEN_USER, function (err, decoded) {
    if (err)
      return response
        .status(500)
        .send({ auth: false, message: "failed to auth token" });
    Users.findByIdAndUpdate(
      { _id: decoded._id },
      newUpdate,
      { new: true },
      function (err, user) {
        if (err) response.send(err);
        response.json(user.adress);
      }
    );
  });
});
///////// Get Adress User
router.get("/useradress", verify, async (req, res) => {
  let token = req.header("auth_token");
  if (!token)
    return response
      .status(401)
      .send({ auth: false, message: "No token provided" });
  const tokenID = jwt.verify(token, process.env.TOKEN_USER);

  const users = await Users.find({ _id: tokenID }).select("adress");
  res.send(users);
});

router.get("/userpost", async (req, res) => {
  const users = await Users.find({}).populate("products", {
    name: 1,
    price: 1,
  });
  res.send(users);
});

module.exports = router;

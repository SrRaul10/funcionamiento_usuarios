const HttpError = require("../models/Http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Raul Garcia",
    email: "raul@gmail.com",
    password: "12345"
  }
];

const getUser = (req, res, next) => {
  const userID = req.params.uid;
  const user = DUMMY_USERS.filter(p => {
    return p.id === userID;
  });
  if (!user) {
    throw new HttpError("No se encontro el usuario con el id solicitado", 404);
  }
  res.json({ user: user });
};

const getUsers = (req, res, next) => {
  res.status(200).json({ user: DUMMY_USERS });
};

const singup = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Argumentos invalidos", 422);
  }
  const { name, email, password } = req.body;
  const id = uuidv4();
  console.log(id);
  const createPlace = {
    id,
    name,
    email,
    password
  };
  DUMMY_USERS.push(createPlace);
  res.status(201).json({ message: "Se agregó el usuario exitosamente." });
};

const generarUID = (req, res, next) => {
  var dt = new Date().getTime();
  var uuid = "xxx".replace(/[xy]/g, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "No identifico al usuario, las credenciales son incorrectas"
    );
  }
  res.json({ message: "TRUE" });
};
exports.getUser = getUser;
exports.singup = singup;
exports.login = login;
exports.getUsers = getUsers;

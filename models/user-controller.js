const HttpError = require("../models/Http-error");

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

const singup = (req, res, next) => {
  const { name, email, password } = req.body;
  const id = generarUID();
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
  const user = DUMMY_USERS.filter(p => {
    return p.email === email && p.password === password;
  });
  if (!user) {
    throw new HttpError("FALSE", 404);
  }
  res.json({ user: user });
};

exports.getUser = getUser;
exports.singup = singup;
exports.login = login;

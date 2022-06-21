const routes = require("express").Router();
const multer = require("multer");
const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

const auth = require("./middleware/authMiddleware");

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const TypeController = require("./controllers/TypeController");
const CategoryController = require("./controllers/CategoryController");
const EventController = require("./controllers/EventController");

routes.post("/auth", AuthController.authenticate);
routes.post("/user", UserController.create);
routes.get("/user", auth, UserController.index);
routes.delete("/user/:id", UserController.delete);
routes.put("/user/:id", UserController.update);

routes.post("/types", auth, TypeController.store);
routes.post("/category", auth, CategoryController.store);

routes.post("/event", auth, upload.single("file"), EventController.store);
routes.put(
  "/event/:id/:id_user",
  auth,
  upload.single("file"),
  EventController.update
);
routes.put("/event/:id", auth, EventController.storeUser);
routes.get("/event/:id", auth, EventController.indexUser);
routes.get("/event", auth, EventController.index);
routes.delete("/event/:id/:id_user", auth, EventController.delete);

module.exports = routes;

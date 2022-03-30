module.exports = app => {
  const shoppingLists = require("../controllers/shoppingList.controller.js");

  var router = require("express").Router();

  // Create a new ShoppingList
  router.post("/", shoppingLists.create);

  // Retrieve all ShoppingLists
  router.get("/", shoppingLists.findAll);

  // Retrieve all published ShoppingLists
  router.get("/published", shoppingLists.findAllPublished);

  // Retrieve a single ShoppingList with id
  router.get("/:id", shoppingLists.findOne);

  // Update a ShoppingList with id
  router.put("/:id", shoppingLists.update);

  // Delete a ShoppingList with id
  router.delete("/:id", shoppingLists.delete);

  // Delete all ShoppingLists
  router.delete("/", shoppingLists.deleteAll);

  app.use('/api/shoppingLists', router);
};

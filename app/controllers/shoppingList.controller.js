const ShoppingList = require("../models/shoppingList.model.js");

// Create and Save a new ShoppingList
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a ShoppingList
  const shoppingList = new ShoppingList({
    title: req.body.title,
    description: req.body.description,
    num_items: req.body.num_items,
    purchased: false
  });


  // Save ShoppingList in the database
  ShoppingList.create(shoppingList, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ShoppingList."
      });
    else res.send(data);
  });
};

// Retrieve all ShoppingLists from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  ShoppingList.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shoppingLists."
      });
    else res.send(data);
  });
};

// Find a single ShoppingList by Id
exports.findOne = (req, res) => {
  ShoppingList.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ShoppingList with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ShoppingList with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published ShoppingLists
exports.findAllPublished = (req, res) => {
  ShoppingList.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shoppingLists."
      });
    else res.send(data);
  });
};

// Update a ShoppingList identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ShoppingList.updateById(
    req.params.id,
    new ShoppingList(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ShoppingList with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ShoppingList with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a ShoppingList with the specified id in the request
exports.delete = (req, res) => {
  ShoppingList.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ShoppingList with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ShoppingList with id " + req.params.id
        });
      }
    } else res.send({ message: `ShoppingList was deleted successfully!` });
  });
};

// Delete all ShoppingLists from the database.
exports.deleteAll = (req, res) => {
  ShoppingList.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all shoppingLists."
      });
    else res.send({ message: `All ShoppingLists were deleted successfully!` });
  });
};

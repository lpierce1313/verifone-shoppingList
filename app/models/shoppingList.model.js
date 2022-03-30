const sql = require("./db.js");

// constructor
const ShoppingList = function(shoppingList) {
  this.title = shoppingList.title;
  this.description = shoppingList.description;
  this.num_items = shoppingList.num_items;
  this.purchased = shoppingList.purchased;
  
};

ShoppingList.create = (newShoppingList, result) => {
  sql.query("INSERT INTO shoppinglist SET ?", newShoppingList, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created shoppinglist: ", { id: res.insertId, ...newShoppingList });
    result(null, { id: res.insertId, ...newShoppingList });
  });
};

ShoppingList.findById = (id, result) => {
  sql.query(`SELECT * FROM shoppinglist WHERE list_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shoppingList: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ShoppingList with the id
    result({ kind: "not_found" }, null);
  });
};

ShoppingList.getAll = (title, result) => {
  let query = "SELECT * FROM shoppinglist";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("shoppinglist: ", res);
    result(null, res);
  });
};

ShoppingList.getAllPurchased = result => {
  sql.query("SELECT * FROM shoppinglist WHERE purchased=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("shoppinglist: ", res);
    result(null, res);
  });
};

ShoppingList.updateById = (id, shoppingList, result) => {
  sql.query(
    "UPDATE shoppinglist SET title = ?, description = ?, purchased = ?, num_items = ? WHERE list_id = ?",
    [shoppingList.title, shoppingList.description, shoppingList.purchased, shoppingList.num_items, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found ShoppingList with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated shoppinglist: ", { id: id, ...shoppingList });
      result(null, { id: id, ...shoppingList });
    }
  );
};

ShoppingList.remove = (id, result) => {
  sql.query("DELETE FROM shoppinglist WHERE list_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found ShoppingList with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted shoppinglist with list_id: ", id);
    result(null, res);
  });
};

ShoppingList.removeAll = result => {
  sql.query("DELETE FROM shoppinglist", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} shoppinglist`);
    result(null, res);
  });
};

module.exports = ShoppingList;

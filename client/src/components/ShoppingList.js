import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EmptyShoppingList from "./RenderShoppingList/EmptyShoppingList";
import { ShowShoppingList } from "./RenderShoppingList/ShowShoppingList";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([
    {
      title: "Tomatoes",
      description: "Green cherry tomatoes",
      howMany: 5,
      purchased: false,
    },
    {
      title: "Tomatoes",
      description: "Green cherry tomatoes",
      howMany: 5,
      purchased: false,
    },
    {
      title: "Tomatoes",
      description: "Green cherry tomatoes",
      howMany: 5,
      purchased: false,
    },
  ]);
  return (
    <>
      {shoppingList.length ? (
        <ShowShoppingList shoppingList={shoppingList} />
      ) : (
        <EmptyShoppingList />
      )}
    </>
  );
};

export default ShoppingList;

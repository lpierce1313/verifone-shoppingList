import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddItem from "../modals/AddItem";

const addItem = async (listData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { listData },
  };

  // get the data from the api
  const data = await fetch(
    "http://localhost:8080/api/shoppingLists",
    requestOptions
  );
  // convert the data to json
  const json = await data.json();
};

const EmptyShoppingList = ({ addItem, updateShoppingList }) => {
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <div>
      <Box
        m="auto"
        width={700}
        height={350}
        >
        <Typography mt={12} color="text.secondary" variant="body1">
          Your shopping list is empty&nbsp;:(
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpenAdd}>
          Add your first item
        </Button>
      </Box>
      <AddItem open={openAdd} onClose={handleCloseAdd} onAdd={addItem} updateShoppingList={updateShoppingList}/>
    </div>
  );
};

export default EmptyShoppingList;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddItem from "../modals/AddItem";

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
        sx={{ border: 1, borderColor: "#C6C6C6", mt: 14 }}
        >
        <Typography mt={12} color="text.secondary" variant="body1">
          Your shopping list is empty&nbsp;:(
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpenAdd}>
          Add your first item
        </Button>
      </Box>
      <AddItem open={openAdd} onClose={handleCloseAdd} updateShoppingList={updateShoppingList}/>
    </div>
  );
};

export default EmptyShoppingList;

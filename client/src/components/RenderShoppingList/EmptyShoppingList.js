import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const EmptyShoppingList = () => {
  return (
    <div>
      <Box
        m="auto"
        width={700}
        height={350}
        sx={{ mt: 16, p: 2, border: "1px solid grey" }}
      >
        <Typography mt={12} color="text.secondary" variant="body1">
          Your shopping list is empty&nbsp;:(
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Add your first item
        </Button>
      </Box>
    </div>
  );
};

export default EmptyShoppingList;

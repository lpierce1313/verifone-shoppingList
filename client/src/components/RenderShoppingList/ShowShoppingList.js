import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Button from "@mui/material/Button";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const ShowShoppingList = ({ shoppingList }) => {
  return (
    <Container maxWidth="lg">
      {/* Top Elements */}
      <Grid container alignItems="center" mt={8} mb={1}>
        <Grid>
          <Typography variant="h6" component="h6">
            Your Items
          </Typography>
        </Grid>
        <Grid className="ml-auto">
          <Button variant="contained" color="primary">
            Add Item
          </Button>
        </Grid>
      </Grid>

      {/* Shopping Items */}
      <Grid item xs={12} md={6}>
        <Demo>
          <List>
            {shoppingList.map((item, i) => (
              <ListItem
                sx={{ border: "1px solid lightgrey", mb: 1}}
                secondaryAction={
                  <>
                    <IconButton aria-label="edit">
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemAvatar>
                  <Checkbox />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </Container>
  );
};

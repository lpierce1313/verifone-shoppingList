import React, { useState } from "react";
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
import { FormControlLabel } from "@mui/material";
import EditItem from "../modals/EditItem";
import ConfirmDelete from "../modals/ConfirmDelete";
import AddItem from "../modals/AddItem";

export const ShowShoppingList = ({ shoppingList, updateShoppingList }) => {
  const [modalData, setModalData] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

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
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              setOpenAdd(!openAdd);
            }}
          >
            Add Item
          </Button>
        </Grid>
      </Grid>

      {/* Shopping Items */}
      <Grid item xs={12} md={6}>
        <List>
          {shoppingList.map((item, i) => (
            <ListItem
              key={item.list_id}
              sx={{ border: "1px solid lightgrey", mb: 1 }}
              secondaryAction={
                <>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setModalData(item);
                      setOpenEdit(!openEdit);
                    }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setModalData(item);
                      setOpenDelete(!openDelete);
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <FormControlLabel
                  control={<Checkbox color="success" />}
                  value="item.purchased"
                  checked={!!item.purchased}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    style={
                      item.purchased
                        ? { textDecoration: "line-through", color: "#4D81B7" }
                        : {}
                    }
                  >
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body1"
                    color="secondary"
                    style={
                      item.purchased ? { textDecoration: "line-through" } : {}
                    }
                  >
                    {item.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      <AddItem
        open={openAdd}
        onClose={handleCloseAdd}
        updateShoppingList={updateShoppingList}
      />
      {
        //Check if message failed
        modalData && (
          <EditItem
            open={openEdit}
            onClose={handleCloseEdit}
            data={modalData}
            updateShoppingList={updateShoppingList}
          />
        )
      }
      <ConfirmDelete
        open={openDelete}
        onClose={handleCloseDelete}
        data={modalData}
        updateShoppingList={updateShoppingList}
      />
    </Container>
  );
};

import React, { useState, useRef } from "react";
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
import EditItem from "../modals/EditItem";
import ConfirmDelete from "../modals/ConfirmDelete";
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

export const ShowShoppingList = ({ shoppingList, updateShoppingList }) => {
  const [modalData, setModalData] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
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
                <Checkbox />
              </ListItemAvatar>
              <ListItemText primary={item.title} secondary={item.description} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <AddItem
        open={openAdd}
        onClose={handleCloseAdd}
        onAdd={addItem}
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

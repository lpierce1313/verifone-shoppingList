import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 438,
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 3,
  mb: 2,
};

const ConfirmDelete = ({ open, onClose, data, updateShoppingList }) => {
  async function onDelete() {
    await fetch(`http://localhost:8080/api/shoppingLists/${data.list_id}`, {
      method: "DELETE",
    });

    //update shopping list below
    updateShoppingList();
    onClose();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="container">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Item?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ color: "#5C6269", mt: 2, mb: 12 }}
            color="secondary"
          >
            Are you sure you want to delete this item? This can not be undone.
          </Typography>

          <div className="btn-holder">
            <Button
              sx={{ color: "#2A323C", mr: 2 }}
              variant="text"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button onClick={onDelete} variant="contained">
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmDelete;

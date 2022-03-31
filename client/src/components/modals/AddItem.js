import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  FormControl,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { modalStyle, modalHeaderStyle, modalContentStyle, modalInputStyle } from "../../constants/styles";

const AddItem = ({ open, onClose, onAdd, updateShoppingList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [howMany, setHowMany] = useState(0);

  const resetItems = () => {
    setTitle("");
    setDescription("");
    setHowMany(0);
  }

  const postData = async (jsonData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    };

    // get the data from the api
    const data = await fetch(
      "http://localhost:8080/api/shoppingLists",
      requestOptions
    );
    // convert the data to json
    const json = await data.json();
    console.log(json);
    updateShoppingList();
    onClose();
    resetItems();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (howMany === 0 || description === "" || title === "") {
      alert("Cannot Submit, form is invalid");
    } else {
      postData(
        {
          title: title,
          description: description,
          num_items: howMany,
          purchased: false,
        },
        updateShoppingList
      );
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className="form" onSubmit={handleSubmit}>
          <Box sx={modalStyle} className="container">
            {/* Header */}
            <div>
              <Box sx={modalHeaderStyle}>
                <Grid container alignItems="center">
                  <Grid>
                    <Typography sx={{ color: "#5C6269" }}>
                      SHOPPING LIST
                    </Typography>
                  </Grid>
                  <Grid className="ml-auto">
                    <IconButton onClick={onClose}>
                      <LastPageIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
              {/* Body */}
              <Box sx={modalContentStyle}>
                <Typography variant="h6">Add an Item</Typography>
                <Typography id="modal-modal-description" color="secondary">
                  Add your new item below
                </Typography>

                {/* Start Form Inputs */}
                <Box noValidate autoComplete="off" spacing={2}>
                  <TextField
                    required
                    fullWidth
                    sx={modalInputStyle}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Item Name"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    sx={modalInputStyle}
                    id="outlined-basic"
                    variant="outlined"
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 100 }}
                  />
                  <FormControl fullWidth sx={modalInputStyle}>
                    <Select
                      placeholder="How many"
                      labelId="how-many-select-label"
                      id="how-many"
                      value={howMany}
                      onChange={(e) => setHowMany(e.target.value)}
                    >
                      <MenuItem value={0} disabled>
                        <em style={{ color: "#9CA8B4" }}>How Many?</em>
                      </MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </div>

            {/* Bottom Portion */}
            <Box className="btn-holder" sx={modalContentStyle}>
              <Button
                onClick={onClose}
                sx={{ color: "#2A323C", mr: 2 }}
                variant="text"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Add Task
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default AddItem;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 4,
};

const headerStyle = {
  p: 1,
  pl: 3,
  pr: 3,
  backgroundColor: "#FAFAFA",
  border: "0.5px solid #D5DFE9",
};

const contentStyle = {
  p: 1,
  pl: 3,
  pr: 3,
  mb: 2,
  mt: 2,
};

const inputStyle = {
  mt: 2,
};

const EditItem = ({ open, onClose, data, onAdd, updateShoppingList }) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [purchased, setPurchased] = useState(data.purchased);
  const [howMany, setHowMany] = useState(data.num_items);
  const updatePurchased = () => setPurchased(!purchased);

  const updateList = async (jsonData) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    };

    // get the data from the api
    const response = await fetch(
      `http://localhost:8080/api/shoppingLists/${data.list_id}`,
      requestOptions
    );
    // convert the data to json
    const json = await response.json();
    updateShoppingList();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (howMany === 0 || description === "" || title === "") {
      alert("Cannot Submit, form is invalid");
    } else {
      updateList(
        {
          title: title,
          description: description,
          num_items: howMany,
          purchased: purchased,
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
          <Box sx={style} className="container">
            {/* Header */}
            <div>
              <Box sx={headerStyle}>
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
              <Box sx={contentStyle}>
                <Typography variant="h6" component="h2">
                  Add an Item
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ color: "#5C6269" }}
                  color="secondary"
                >
                  Add your new item below
                </Typography>

                {/* Start Form Inputs */}
                <Box noValidate autoComplete="off" spacing={2}>
                  <TextField
                    required
                    fullWidth
                    sx={inputStyle}
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
                    sx={inputStyle}
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
                  <FormControl fullWidth sx={inputStyle}>
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
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox color="success" />}
                      value="!!purchased"
                      onChange={updatePurchased}
                      checked={!!purchased}
                      label="Purchased"
                    />
                  </FormGroup>
                </Box>
              </Box>
            </div>

            {/* Bottom Portion */}
            <Box className="btn-holder" sx={contentStyle}>
              <Button
                onClick={onClose}
                sx={{ color: "#2A323C", mr: 2 }}
                variant="text"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Edit Task
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default EditItem;

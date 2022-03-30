import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import LastPageIcon from "@mui/icons-material/LastPage";
import Container from "@mui/material/Container";
import {
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
};

const inputStyle = {
  mt: 3,
};

const AddItem = ({ open, onClose, onAdd, updateShoppingList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [howMany, setHowMany] = useState(1);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(
      {
        title: title,
        description: description,
        num_items: howMany,
        purchased: false,
      },
      updateShoppingList
    );
    console.log(title, description, howMany);
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
                    <IconButton>
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
                <Box component="form" noValidate autoComplete="off" spacing={2}>
                  <TextField
                    fullWidth
                    sx={inputStyle}
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    sx={inputStyle}
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={3}
                    maxRows={5}
                    inputProps={{ maxLength: 100 }}
                  />
                  <FormControl fullWidth sx={inputStyle}>
                    <InputLabel id="how-many-select-label">
                      How many?
                    </InputLabel>
                    <Select
                      labelId="how-many-select-label"
                      id="how-many"
                      value={howMany}
                      label="howMany"
                      onChange={(e) => setHowMany(e.target.value)}
                    >
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
            <Box className="btn-holder" sx={contentStyle}>
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

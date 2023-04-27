import { Autocomplete, Stack, TextField } from "@mui/material";
import React from "react";

const Searchbar = ({ users }) => {
  return (
    <Stack spacing={1} sx={{ paddingRight: "8px" }}>
      <Autocomplete
        id="search-bar"
        disableClearable
        options={users.map((option) => option)}
        renderInput={(params) => (
          <TextField
            sx={{
              input: {
                color: "#FFF8DC",
              },
              "& .MuiInputBase-input": {
                fontSize: "16px",
              },
            }}
            {...params}
            label="Search Users"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
};

export default Searchbar;

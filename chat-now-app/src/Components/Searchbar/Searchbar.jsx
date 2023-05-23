import { Autocomplete, Stack, TextField } from "@mui/material";
import React from "react";

const Searchbar = ({ users, setPeople }) => {
  return (
    <Stack spacing={1} sx={{ paddingRight: "8px" }}>
      {/* <Autocomplete
        id="search-bar"
        disableClearable
        options={[]} //{users.map((option) => option)}
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
      /> */}
      <TextField
        id="standard-basic"
        label="People"
        variant="standard"
        onInput={(e) => {
          const filteredUsers = users.filter((user) =>
            user.name
              .toLowerCase()
              .trim()
              .includes(e.target.value.toLowerCase().trim())
          );
          setPeople(filteredUsers);
        }}
      />
    </Stack>
  );
};

export default Searchbar;

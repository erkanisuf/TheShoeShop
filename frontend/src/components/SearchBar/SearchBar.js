import React, { useState, useEffect } from "react";
import { makeStyles, InputBase, fade } from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  searchBox: {
    width: "100%",
    height: "100%",
    minHeight: "200px",
    backgroundColor: "red",
    position: "absolute",
    top: 35,
    zIndex: "15",
  },
}));

const SearchBar = ({ state }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [arrayFiltered, setarrayFiltered] = useState([]);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue) {
      const filter = state.filter((el) => {
        let newobj = { name: el.name, color: el.color };
        let name = newobj.name + " " + newobj.color;
        console.log(newobj.name + newobj.color);

        return name.toLowerCase().includes(searchValue.toLocaleLowerCase());
      });
      setarrayFiltered(filter);
      if (filter.length >= 1) {
        setOpen(true);
      } else {
        setOpen(false);
      }
      console.log(filter);
    } else {
      setOpen(false);
    }
  }, [searchValue, state]);
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />

      {open && (
        <div className={classes.searchBox}>
          {arrayFiltered.length >= 1 && (
            <div>
              {" "}
              {arrayFiltered.map((el, index) => {
                return (
                  <p key={index}>
                    {el.name},{el.color}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

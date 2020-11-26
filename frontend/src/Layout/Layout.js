import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import Login from "../components/User/Login";
import Register from "../components/User/Register";
import { Link, useHistory } from "react-router-dom";
////////////
import {
  USER_LOGOUT,
  REMOVE_PRODUCT,
  INCREMENT_QUANT,
  DECREMENT_QUANT,
  REMOVE_ALL_CART,
} from "../Context/reducers";
/////////////
import {
  fade,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
} from "@material-ui/core/";
/////////////
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
////////////////

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontFamily: "Goldman",
    },
  },
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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
      width: "250px",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  AppBar: {
    backgroundColor: "black",
  },
  spanUser: {
    fontSize: "15px",
    fontFamily: "Goldman",
    alignSelf: "center",
  },
  root: {
    width: "500px",
    flex: "1 1 0px",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: "1 1 0px",
  },
  inline: {
    width: "100px",
  },
  plusminus: {
    marginLeft: "5px",
    width: "2px",
    height: "2px",
    color: "white",

    backgroundColor: "#ffc107",
    "&:hover": {
      backgroundColor: "#ffac33",
    },
    "& svg": {
      fontSize: "20px",
      color: "white",
    },
  },
  login: {
    cursor: "Pointer",
    "&:hover": {
      color: "#ffc107",
    },
  },
}));

export default function Layout(props) {
  const { state, dispatch } = useContext(MyContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isCartOpen = Boolean(anchorElCart);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [totalpricevalue, setTotalPrice] = useState(null);

  //Open Login Dialog
  const [openLogin, setopenLogin] = useState(false);
  const [openRegister, setopenRegister] = useState(false);

  ///
  useEffect(() => {
    const totalPrice = () => {
      const copyArr = [...state.cart];
      const sum = copyArr.reduce((a, b) => a + b.price * b.quantity, 0);
      setTotalPrice(sum);
    };
    totalPrice();
  }, [state.cart]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const cartOpenHandler = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMenuCloseCART = () => {
    setAnchorElCart(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const history = useHistory();
  const signOut = () => {
    dispatch({ type: USER_LOGOUT });
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push("/");
    history.replace("/");
  };

  const menuId = "primary-search-account-menu";
  const cartID = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        to="/userprofile"
        style={{ color: "black", textDecoration: "none" }}
      >
        <MenuItem onClick={handleMenuClose}>UserProfile</MenuItem>
      </Link>

      <MenuItem onClick={signOut}>Sign Out</MenuItem>
    </Menu>
  );
  const renderCart = (
    <Menu
      anchorEl={anchorElCart}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={cartID}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isCartOpen}
      onClose={handleMenuCloseCART}
    >
      <List className={classes.root}>
        {state.cart.map((item, index) => {
          return (
            <div className={classes.rootTwo} key={index}>
              <ListItem alignItems="flex-start" className={classes.list}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={item.image} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.inline}
                  primary={<b>{item.name}</b>}
                  secondary={item.price * item.quantity + "€"}
                />
                <ListItemText
                  primary={<b>Quantity</b>}
                  secondary={
                    <>
                      {item.quantity}
                      <IconButton
                        className={classes.plusminus}
                        onClick={() =>
                          dispatch({ type: INCREMENT_QUANT, product: item })
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        className={classes.plusminus}
                        onClick={() =>
                          dispatch({ type: DECREMENT_QUANT, product: item })
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                    </>
                  }
                />

                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() =>
                      dispatch({ type: REMOVE_PRODUCT, product: item })
                    }
                  >
                    <ClearIcon
                      color="secondary"
                      style={{
                        fontSize: "30px",
                        display: "inline",
                      }}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "5px",
          padding: "10px",
        }}
      >
        <Button
          startIcon={<ShoppingCartIcon />}
          variant="contained"
          color="primary"
        >
          Check Out
        </Button>
        <Button
          onClick={() => dispatch({ type: REMOVE_ALL_CART })}
          variant="outlined"
        >
          Clear All
        </Button>

        <Typography variant="button">
          Total Price:<b>{totalpricevalue}</b>€
        </Typography>
      </div>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={cartOpenHandler}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Shopping Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Link to="/userprofile">UserProfile</Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className="LayoutContainer">
      <div className={classes.grow}>
        <AppBar position="static" className={classes.AppBar}>
          <Toolbar style={{ width: "80%", margin: "0 auto" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              The Shoe Shop
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={cartID}
                aria-haspopup="true"
                onClick={cartOpenHandler}
                color="inherit"
              >
                <Badge badgeContent={state.cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {localStorage.getItem("UserToken") ? (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <span className={classes.spanUser}>
                    Welcome {state.user.name} <AccountCircle />
                  </span>
                </IconButton>
              ) : (
                <div className={classes.spanUser}>
                  <span
                    className={classes.login}
                    onClick={() => setopenLogin(true)}
                  >
                    Login{" "}
                  </span>
                  <span
                    className={classes.login}
                    onClick={() => setopenRegister(true)}
                  >
                    / Sign up
                  </span>
                </div>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {state.cart.length !== 0 && <Paper>{renderCart}</Paper>}
        <Login openLogin={openLogin} handleClose={() => setopenLogin(false)} />
        <Register
          openRegister={openRegister}
          handleCloseRegister={() => setopenRegister(false)}
        />
      </div>

      {props.children}
    </div>
  );
}

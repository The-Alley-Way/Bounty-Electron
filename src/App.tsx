import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.global.css';
import {
  AppBar,
  Menu,
  Toolbar,
  Typography,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import firebase from 'firebase';
import { AuthProvider } from './Authentication';
import PrivateRoute from './PrivateRoute';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import app from './firebase';
import MyBounties from './pages/MyBounties';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Main = () => {
  return (
    <div>
      <h1>Bounty</h1>
    </div>
  );
};

export default function App() {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth != null) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  }, [user]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    setAnchorEl(null);
    app.auth().signOut();
  };

  return (
    <AuthProvider>
      <HashRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Bounty
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    component={Link}
                    to="/profile/bounties"
                    onClick={handleClose}
                  >
                    My Bounties
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/account"
                    onClick={handleClose}
                  >
                    My account
                  </MenuItem>
                  <MenuItem onClick={handleSignout}>Signout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Switch>
          <PrivateRoute exact path="/" component={Main} />
          <PrivateRoute exact path="/profile/bounties" component={MyBounties} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </HashRouter>
    </AuthProvider>
  );
}

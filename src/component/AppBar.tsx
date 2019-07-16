import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';

import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

const  Header = () => {

  return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Mini Twitter
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;

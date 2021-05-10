import React, { useState, useEffect } from 'react';
import { Typography, Button, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
const theme = createMuiTheme( {
	palette: {
		primary: {
			main: '#9e9e9e'
		},
		secondary: {
			main: '#bdbdbd'
		},
	},
} );



const useStyles = makeStyles( ( theme ) => ( {
	root: {
		flexGrow: 1, backgroundColor: '#424242'
	},
	menuButton: {
		marginRight: theme.spacing( 2 ),
	},
	title: {
		flexGrow: 1,
	},
} ) );

const SiteHeader = ( props ) =>
{
	const classes = useStyles();
	const firebase = props.firebase
	// const curShop = props.curShop
	const [ curShop, setCurShop ] = useState( props.curShop )
	useEffect( () =>
	{
		console.log( 'siteHeader', curShop )
		setCurShop( props.curShop )
	}, [ props.curShop, curShop ] )
	// const nextPath = ( path ) =>
	// {
	// 	props.history.push( path );
	// }
	return (
		<ThemeProvider theme={theme}>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography className={classes.title} edge="start" variant="h6" >
							r o d s q u e u e
				</Typography>
						{curShop && <Button color="inherit" component={Link} to={`public/${curShop}`}  >PUBLIC VIEW</Button>}


						<Button color="inherit" onClick={() => { firebase.auth().signOut() }}>Log Out</Button>

					</Toolbar>

				</AppBar>
			</div>
		</ThemeProvider >
	);
};

export { SiteHeader };
import React from "react";

import text from "../data";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { Typography, Container, Icon, Grid, Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	header: {
		width: "100%",
		paddingTop: 30,
		paddingBottom: 20,
		color: "black",
		overflow: "hidden",
		backgroundColor: "#F6F8F9",
	},
	image: {
		position: "",
	},
	headerDiv: {
		top: theme.spacing(5),
		position: "relative",
		backgroundColor: "rgba(255,255,255,0.82)",
		width: "100%",
		height: "100%",
		padding: 20
	},
	headerText: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: 24,
		color: "#2C2E30",
		marginBottom: "20px",
	},
	subheaderText: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: 22,
		color: "#2C2E30",
		marginTop: 80,
		marginBottom: 20,
	},
	listText: {
		width: "100%",
		textAlign: "left",
		fontFamily: "Play",
		fontSize: "14px",
		color: "#2C2E30",
		marginBottom: "10px",
	},
	iconOver: {
		fontSize: "54px",
		position: "absolute",
		top: "6px",
	},
	iconTabs: {
		fontSize: "24px",
		marginBottom: "20px",
		marginTop: "10px",
	},
	mheaderText: {
		textAlign: "center",
		fontFamily: "Play",
		fontSize: 24,
		color: "#2C2E30",
		marginBottom: "20px",
	},
	msubheaderText: {
		textAlign: "center",
		fontFamily: "Play",
		fontSize: 22,
		color: "#2C2E30",
		marginTop: 80,
		marginBottom: 20,
	},
	mlistText: {
		textAlign: "justify",
		textIndent: "1.5em",
		fontFamily: "Play",
		fontSize: "14px",
		color: "#2C2E30",
		marginBottom: "10px",
	},
	miconOver: {
		fontSize: "24px",
		position: "absolute",
		top: "2px",
	},
	miconTabs: {
		fontSize: "12px",
		marginBottom: "10px",
		marginTop: "-14px",
	},
	imgOverText: {
		position: "fixed",
		opacity: 0.2,
		zIndex: -1,
	},
	imageP: {
		width: "calc(100% - 40px)",
		margin: 20,
	}
}));


export default function Section5(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const theme = useTheme();

	function handleChange(event, newValue) {
		setValue(newValue);
	}
	function handleChangeIndex(index) {
		setValue(index);
	}
	let image = require("./image/" + text().s5.image);
	let partners = require("./image/" + text().s5.partners.image);

	return (
		<>
			<Hidden mdUp>
				<Grid className={classes.header} container direction="row" justify="center" alignItems="center">
					<img src={image} alt={image} className={classes.imgOverText} />
					<Grid item key={text().s5.header}>
						<Typography className={classes.mheaderText}>{text().s5.header}</Typography>
						{text().s5.text.map((itemtext, index) => (
							<p key={index}>
								<Typography className={classes.mlistText}>{itemtext}</Typography>
							</p>
						))}
					</Grid>
				</Grid>
			</Hidden>
			<Hidden smDown>
				{/* декстоп */}
				<Grid className={classes.header} container direction="column" justify="center" alignItems="center">
					<Grid item>
						<Grid container direction="row" justify="center" alignItems="flex-start">
							<Grid className={classes.image} item key={image} xs={3}>
								<img className={classes.imageP} src={image} alt={image} />
							</Grid>
							<Grid className={classes.headerDiv} item key={text().s5.header} xs={9}>
								<Typography className={classes.headerText}>{text().s5.header}</Typography>
								<ul>
									{text().s5.text.map((itemtext, index) => (
										<li key={index}>
											<Typography className={classes.listText}>{itemtext}</Typography>
										</li>
									))}
								</ul>
							</Grid>
						</Grid>
					</Grid>
					<Grid item><Typography className={classes.subheaderText}>{text().s5.partners.text}</Typography></Grid>
					<Grid item><img className={classes.imageP} src={partners} alt={partners} /></Grid>
				</Grid>
			</Hidden>
		</>
	);
}

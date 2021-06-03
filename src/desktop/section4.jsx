import React, { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";

import text from "../data";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Zoom, Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	header: {
		paddingTop: 30,
		paddingBottom: 20,
		width: "100%",
		color: "black",
		backgroundColor: "white",
		overflow: "hidden",
	},
	header_m: {
		paddingTop: 50,
		paddingBottom: 20,
		width: "100%",
		color: "black",
		backgroundColor: "white",
		overflow: "hidden",
	},
	image: {
		width: "100%",
	},
	header_text: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "24px",
		color: "#2C2E30",
		marginBottom: "20px",
	},
	subheader_text: {
		width: "100%",
		textAlign: "left",
		fontFamily: "Play",
		fontSize: "16px",
		color: "#2C2E30",
		marginBottom: "20px",
		marginLeft: "20px",
	},
	mheader_text: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "24px",
		color: "#2C2E30",
		marginBottom: "20px",
	},

	msubheader_text: {
		width: "100%",
		textAlign: "justify",
		textIndent: "1.5em",
		fontFamily: "Play",
		fontSize: "14px",
		color: "#2C2E30",
		marginBottom: "20px",
	},
	button: {
		position: "relative",
		top: "140px",
		left: "100px",
		width: "250px",
		fontFamily: "Play",
		fontSize: "24px",

		textTransform: "uppercase",
	},
}));

export default function Section4(props) {
	const [visible, setVisible] = useState(false);

	const classes = useStyles();
	const imgHeader = require("./image/" + text().s4.image);

	return (
		<ScrollTrigger
			onEnter={() => {
				setVisible(true);
			}}
			onExit={() => {
				setVisible(false);
			}}
		>
			<Hidden mdUp>
				{/* мобилник */}
				<div className={classes.header_m}>
					<Grid container direction="column" justify="center" alignItems="center" spacing={2}>
						<Grid item>
							<Typography className={classes.mheader_text}>{text().s4.header}</Typography>
						</Grid>
						<Grid item>
							<Zoom in={visible} timeout={800}>
								<img className={classes.image} src={imgHeader} alt="header" />
							</Zoom>
						</Grid>
						<Grid item>
							<Typography className={classes.msubheader_text}>{text().s4.text}</Typography>
						</Grid>
						<Grid item>
							<Button color="primary" onClick={() => { props.feedback(true, { radio: text().feedback.radio[4] }); }} >{text().s4.link}</Button>
						</Grid>
					</Grid>
				</div>
			</Hidden>
			<Hidden smDown>
				{/* декстоп */}
				<div className={classes.header}>
					<Grid container direction="row" justify="center" alignItems="center" spacing={10}>
						<Grid item xs={7}>
							<Grid container direction="column" justify="center" alignItems="center" spacing={1}>
								<Grid item>
									<Typography className={classes.header_text}>{text().s4.header}</Typography>
								</Grid>
								<Grid item>
									<Typography className={classes.subheader_text}>{text().s4.text}</Typography>
								</Grid>
								<Grid item>
									<Button color="primary" onClick={() => { props.feedback(true, { radio: text().feedback.radio[4] }); }} >{text().s4.link}</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={5}>
							<Zoom in={visible} timeout={800}>
								<img className={classes.image} src={imgHeader} alt="header" />
							</Zoom>
						</Grid>
					</Grid>
				</div>
			</Hidden>
		</ScrollTrigger>
	);
}

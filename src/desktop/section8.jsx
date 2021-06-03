import React, { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";

import text from "../data";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Zoom, Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	header: {
		paddingTop: "50px",
		paddingBottom: "50px",
		width: "100%",
		//height: "280px",
		color: "white",
		backgroundColor: "#2F5BEA",
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
		color: "white",
		marginBottom: "20px",
	},
	subheader_text: {
		width: "100%",
		textAlign: "justify",
		fontFamily: "Play",
		fontSize: "16px",
		color: "white",
		marginBottom: "20px",
	},
	button: {
		backgroundColor: "white",
		color: "#2C2E30",
		textTransform: "uppercase",
	},
}));

export default function Section8(props) {
	const [visible, setVisible] = useState(false);

	const classes = useStyles();

	return (
		<ScrollTrigger
			onEnter={() => {
				setVisible(true);
			}}
			onExit={() => {
				setVisible(false);
			}}
		>
			<div className={classes.header}>
				<Grid container direction="column" justify="center" alignItems="center" spacing={1}>
					<Hidden mdUp>
						{/* мобилник */}
						<Grid item xs={10}>
							<Typography className={classes.header_text}>{text().s8.header}</Typography>
						</Grid>
						<Grid item xs={11}>
							<Typography className={classes.subheader_text}>{text().s8.text}</Typography>
						</Grid>
						<Grid item xs={10}>
							<Zoom in={visible} timeout={800}>
								<Button className={classes.button} onClick={() => {props.feedback(true, { radio: text().feedback.radio[0] });}} >
									{text().s8.button.text}
								</Button>
							</Zoom>
						</Grid>
					</Hidden>
					<Hidden smDown>
						{/* декстоп */}
						<Grid item xs={7}>
							<Typography className={classes.header_text}>{text().s8.header}</Typography>
						</Grid>
						<Grid item xs={7}>
							<Typography className={classes.subheader_text}>{text().s8.text}</Typography>
						</Grid>
						<Grid item xs={7}>
							<Zoom in={visible} timeout={800}>
								<Button className={classes.button} onClick={() => {props.feedback(true, { radio: text().feedback.radio[0] });}} >
									{text().s8.button.text}
								</Button>
							</Zoom>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		</ScrollTrigger>
	);
}

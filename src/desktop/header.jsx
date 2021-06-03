import React from "react";

import text from "../data";
import { makeStyles } from "@material-ui/core/styles";
import Background from "./image/section0-1.png";
import { Typography, Button, Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	header: {
		paddingTop: 80,
		paddingBottom: 20,
		width: "100%",
		minHeight: 900,
		color: "black",
		overflow: "hidden",
		backgroundSize: "contain",
		backgroundImage: `url(${Background})`,
		backgroundPosition: "center bottom",
		backgroundRepeat: "no-repeat",
		backgroundColor: "white",
		backgroundSize: "cover",
	},
	image: {
		position: "",
	},
	headerDiv: {
		position: "relative",
		top: 240,
		left: 105,
		backgroundColor: "rgba(255,255,255,0.82)",
		width: 650,
		height: 270,
		padding: 20
	},

	header_text: {
		fontFamily: "Play",
		fontSize: "24px",
		color: "#2C2E30",
		letterSpacing: 0,
		textTransform: "uppercase",
	},
	subheader_text: {
		fontFamily: "Play",
		fontSize: "16px",
		color: "#2C2E30",
		letterSpacing: 0,
	},
	fab: {
		position: "absolute",
		bottom: 20,
		right: 20,
		fontFamily: "Play",
		fontSize: "24px",

		textTransform: "uppercase",
	},
	header_m: {
		paddingTop: 80,
		paddingBottom: 20
	},

	image_m: {
		width: "100%",
		//height: 550,
		color: "black",
		//overflow: "hidden",
		backgroundColor: "white",
	},
	header_mtext: {
		width: "100%",
		fontFamily: "Play",
		fontSize: 20,
		color: "#2C2E30",
		letterSpacing: -1,
		textTransform: "uppercase",
	},
	subheader_mtext: {
		width: "100%",
		textAlign: "justify",
		textIndent: "1.5em",
		fontFamily: "Play",
		fontSize: "14px",
		color: "#2C2E30",
		letterSpacing: 0,
	},
	mfab: {
		width: "100%",
		fontFamily: "Play",
		fontSize: "16px",
		textTransform: "uppercase",
	},
}));

export default function Header(props) {
	const classes = useStyles();
	//	const theme = useTheme();
	//	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<Hidden mdUp >
				<div className={classes.header_m}>
					{/* мобилник */}
					<img className={classes.image_m} src={Background} />
					<Typography className={classes.header_mtext}>{text().hero.t1}</Typography>
					<Typography className={classes.subheader_mtext}>{text().hero.t2}</Typography>
					<Button variant="contained" color="primary"
						className={classes.mfab}
						aria-label="Add"
						onClick={() => {
							props.feedback(true, { radio: text().feedback.radio[0] });
						}}
					>
						{text().hero.button.name}
					</Button>
				</div>
			</Hidden>
			<Hidden smDown>
				{/* декстоп */}
				<div className={classes.header}>
					<div className={classes.headerDiv}>
						<Typography className={classes.header_text}>{text().hero.t1}</Typography>
						<Typography className={classes.subheader_text}>{text().hero.t2}</Typography>
						<Button variant="contained" color="primary"
							className={classes.fab}
							aria-label="Add"
							onClick={() => {
								props.feedback(true, { radio: text().feedback.radio[0] });
							}}
						>
							{text().hero.button.name}
						</Button>
					</div>
				</div>
			</Hidden>
		</React.Fragment>
	);
}

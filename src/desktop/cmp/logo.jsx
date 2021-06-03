import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Logo100Png from "../image/LogoMini.png";
import LogoPng from "../image/LogoFull.png";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	logo100: {
		display: "flex",
		height: theme.spacing(11),
	},
	logo100_img: {
		top: theme.spacing(1),
		position: "relative",
		height: theme.spacing(9),
		marginRight: theme.spacing(1),
	},
	logo100_text: {
		top: "15px",
		left: "-20px",
		position: "relative",
		fontFamily: "'Yeon Sung', cursive",
		fontSize: "30px",
		color: "black",
	},
	logoMobile: {
		position: "static",
	},
	logoMobile_img: {
		position: "relative",
	},
	logoMobile_text: {
		top: "-180px",
		left: "110px",
		position: "relative",
		fontFamily: "'Yeon Sung', cursive",
		fontSize: "40px",
		color: "black",
	},
	logo_img: {
		maxWidth: "100%",
		left: "50px",
		position: "relative",
	},
	logo_text: {
		top: "-180px",
		left: "140px",
		position: "relative",
		fontFamily: "'Yeon Sung', cursive",
		fontSize: "70px",
		color: "black",
	},

	logo: {
		height: "100px",
		color: "black",
	},
}));

export function LogoMini() {
	const classes = useStyles();

	return (
		<div className={classes.logo100}>
			<img className={classes.logo100_img} src={Logo100Png} alt="logo" />
		</div>
	);
}
export function LogoMobile() {
	const classes = useStyles();

	return (
		<div className={classes.logoMobile}>
			<img className={classes.logoMobile_img} src={LogoPng} alt="logo" />
		</div>
	);
}
export function Logo() {
	const classes = useStyles();

	return (
		<div className={classes.logo}>
			<img className={classes.logo_img} src={LogoPng} alt="logo" />
		</div>
	);
}

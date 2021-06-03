import React, { useState } from "react";
import Grow from "@material-ui/core/Grow";
import ScrollTrigger from "react-scroll-trigger";

import text from "../data";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Icon, Grid, Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	header: {
		paddingTop: 30,
		paddingBottom: 20,
		width: "100%",
		color: "black",
		backgroundColor: "#F6F8F9",
		overflow: "hidden",
	},
	header_m: {
		paddingTop: "50px",
		paddingBottom: "50px",
		width: "100%",
		//height: "1750px",
		color: "black",
		backgroundColor: "#F6F8F9",
		overflow: "hidden",
	},
	image: {
		position: "",
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
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "16px",
		color: "#2C2E30",
		marginBottom: "20px",
	},
	header_bubble: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "18px",
		color: "#2C2E30",
		marginBottom: "20px",
	},
	subheader_bubble: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "12px",
		color: "#2C2E30",
		marginBottom: "20px",
	},
	list_text: {
		width: "100%",
		textAlign: "left",
		fontFamily: "Play",
		fontSize: "14px",
		color: "#2C2E30",
		marginBottom: "10px",
	},
	iconOver: {
		fontSize: "54px",
		position: "relative",
		zIndex: 0,
	},
	iconBubble: {
		position: "relative",
		fontSize: "56px",
		marginBottom: "-40px",
		top: "-84px",
		color: "white",
		zIndex: 1,
	},
	animAppear: {
		opacity: 0.01,
		animAppearActive: {
			opacity: 2,
			transition: "opacity 5s ease-in",
		},
	},
}));

function Bubble(props) {
	const classes = useStyles();
	const iconDark = require("./image/bubble_dark.png");
	const arrow = props.is_mobile ? require("./image/arrow_down.png") : require("./image/arrow_right.png");
	if (props.is_mobile)
		return (
			<Grid item xs={12}>
				<Grow in={props.visible} timeout={props.timeout}>
					<Grid container direction="column" justify="center" alignItems="center">
						<Grid item>
							<Grid container direction="column" justify="center" alignItems="center">
								<img className={classes.iconOver} src={iconDark} alt="icon" />
								<Icon className={classes.iconBubble}>{props.content.icon}</Icon>
								<Typography className={classes.header_bubble}>{props.content.name}</Typography>
								<Typography className={classes.subheader_bubble}>{props.content.text}</Typography>
							</Grid>
						</Grid>
						{!props.is_last && (
							<Grid item>
								<img src={arrow} alt="icon" />
							</Grid>
						)}
					</Grid>
				</Grow>
			</Grid>
		);
	else
		return (
			<Grid item xs={4}>
				<Grow in={props.visible} timeout={props.timeout}>
					<Grid container direction="row" justify="center" alignItems="center">
						<Grid item xs={props.is_last && props.is_mobile ? 12 : 10}>
							<Grid container direction="column" justify="center" alignItems="center">
								<img className={classes.iconOver} src={iconDark} alt="icon" />
								<Icon className={classes.iconBubble}>{props.content.icon}</Icon>
								<Typography className={classes.header_bubble}>{props.content.name}</Typography>
								<Typography className={classes.subheader_bubble}>{props.content.text}</Typography>
							</Grid>
						</Grid>
						<Grid item xs={2}>
							{!props.is_last && <img src={arrow} alt="icon" />}
						</Grid>
					</Grid>
				</Grow>
			</Grid>
		);
}

export default function Section2(props) {
	const classes = useStyles();
	const [visible, setVisible] = useState(false);

	return (
		<ScrollTrigger
			onEnter={() => {
				setVisible(true);
			}}
			onExit={() => {
				setVisible(false);
			}}
		>
			<Hidden smDown>
				<div className={classes.header}>
					<Typography className={classes.header_text}>{text().s2.header}</Typography>

					<Container fixed maxWidth="md">
						<Typography className={classes.subheader_text}>{text().s2.subheader}</Typography>
					</Container>
					<Grid container direction="row" justify="center" alignItems="center" spacing={10}>
						{text().s2.bubble.map((item, index) => (
							<Bubble
								is_mobile={false}
								key={index}
								content={item}
								timeout={{ enter: index * 1000, exit: index * 1000 + 2000 }}
								visible={visible}
								is_last={index + 1 === text().s2.bubble.length}
							/>
						))}
					</Grid>
				</div>
			</Hidden>
			<Hidden mdUp>
				<div className={classes.header_m}>
					<Typography className={classes.header_text}>{text().s2.header}</Typography>

					<Container fixed maxWidth="md">
						<Typography className={classes.subheader_text}>{text().s2.subheader}</Typography>
					</Container>
					<Grid container direction="column" justify="center" alignItems="center">
						{text().s2.bubble.map((item, index) => (
							<Bubble
								is_mobile={true}
								key={index}
								content={item}
								timeout={{ enter: index * 1000, exit: index * 1000 + 2000 }}
								visible={visible}
								is_last={index + 1 === text().s2.bubble.length}
							/>
						))}
					</Grid>
				</div>
			</Hidden>
		</ScrollTrigger>
	);
}

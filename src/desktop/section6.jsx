import React, { useState } from "react";

import text from "../data";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { IconButton, Typography, Link, Grid, Icon, Card, CardHeader, CardContent, Avatar, Button, Hidden, Toolbar } from "@material-ui/core";

function Bubble(props) {
	const classes = useStyles();
	//	const iconLight = require("./image/bubble_light.png");
	return (
		<IconButton color="primary" aria-label="Add" onClick={props.onClick}>
			<Icon className={classes.iconBubble}>{props.icon}</Icon>
		</IconButton>
	);
}
function CardFeedBack(props) {
	const classes = useStyles();
	//	const iconLight = require("./image/bubble_light.png");
	const isMobile = !!props.mobile;
	return (
		<Card className={classes.card}>
			<CardHeader avatar={<Avatar aria-label="Recipe" alt={props.avatar} src={props.avatar} className={classes.avatar} />} title={props.header} subheader={props.date} />
			<CardContent>
				<Typography variant="body2" className={isMobile ? classes.mcardFont : classes.cardFont} color="textSecondary" component="p">
					{props.text}
				</Typography>
			</CardContent>
		</Card>
	);
}

const useStyles = makeStyles(theme => ({
	card: {
		height: "325px",
		padding: theme.spacing(1),
		margin: theme.spacing(1),
		fontFamily: "Play"
	},
	cardFont: {
		fontSize: "0.8rem",
		fontFamily: "Play",
	},
	mcardFont: {
		fontSize: "0.8rem",
		fontFamily: "Play",
	},

	cards: {
		//width: "100%",
		//height: "350px",
	},
	slideContainer: {
		padding: "0 10px",
		width: "300px",
	},
	header: {
		paddingTop: "50px",
		paddingBottom: "50px",
		width: "100%",
		//height: "650px",
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
		color: "black",
		marginBottom: "20px",
	},
	subheader_text: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "16px",
		color: "#2C2E30",
		marginBottom: "20px",
		marginLeft: "20px",
	},
	mheader_text: {
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "24px",
		color: "black",
		marginBottom: "20px",
	},
	msubheader_text: {
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "16px",
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
	row: {
		overflow: "hidden",
	},
	rowCard: {
		width: "100%",
		margin: 0,
		overflow: "hidden",
	},
}));

export default function Section6(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = useState(0);
	function handleChangeIndex(index) {
		setValue(index);
	}
	let image = [];
	let fb = text().s6.feedback;
	for (let t of fb) {
		image[t.avatar] = require("./image/avatar/" + t.avatar);
	}
	return (
		<React.Fragment>
			<Hidden mdUp>
				{/* мобилник */}
				<div className={classes.mheader}>
					<Typography className={classes.mheader_text}>{text().s6.header}</Typography>
					<Typography className={classes.msubheader_text}>{text().s6.subheader}</Typography>
					<Grid container direction="row" justify="center" alignItems="center" spacing={0} className={classes.row}>

						<Grid item xs={12}>
							<SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
								{fb.map((item, index) => (
									<CardFeedBack mobile avatar={image[item.avatar]} header={item.name} date={item.date} text={item.text} />
								))}
							</SwipeableViews>
						</Grid>

					</Grid>
					<Grid item xs={12}>
						<Grid container direction="column" justify="center" alignItems="center">
							<Grid item>
								<Button variant="contained" color="primary" href={text().s6.link.link} target="_blank">{text().s6.link.text}</Button>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Hidden>
			<Hidden smDown>
				{/* декстоп */}
				<div className={classes.header}>
					<Typography className={classes.header_text}>{text().s6.header}</Typography>
					<Typography className={classes.subheader_text}>{text().s6.subheader}</Typography>
					{/*<Grid container direction="row" justify="center" alignItems="center" spacing={1} className={classes.row}>
						<Grid item xs={1}>*/}
					<Toolbar>
						<Bubble
							icon="arrow_left"
							onClick={() => {
								value === 0 ? setValue(2) : setValue(value - 1);
							}}
						/>
						{/*</Grid>
						<Grid item xs={9}>*/}
						<SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex} >
							{[0, 1, 2].map(index => (
								<Grid key={"s6" + index * 3} container direction="row" justify="space-between" alignItems="center" spacing={0} className={classes.rowCard}>
									{[0, 1, 2].map(inx => {
										if (index * 3 + inx < fb.length)
											return (
												<Grid key={"s6_" + (index * 3 + inx)} item xs={4}>
													<CardFeedBack
														avatar={image[fb[index * 3 + inx].avatar]}
														header={fb[index * 3 + inx].name}
														date={fb[index * 3 + inx].date}
														text={fb[index * 3 + inx].text}
													/>
												</Grid>
											);
										else return <div key={"s6_" + (index * 3 + inx)} />;
									})}
								</Grid>
							))}
						</SwipeableViews>
						{/*</Grid>
						<Grid item xs={1}>*/}
						<Bubble
							icon="arrow_right"
							onClick={() => {
								value >= 2 ? setValue(0) : setValue(value + 1); //value >= text().s5.works.length / 3 ? setValue(0) :
							}}
						/>
						{/*</Grid>*/}
					</Toolbar>
					{/*</Grid>*/}
					<Grid item xs={12}>
						<Grid container direction="column" justify="center" alignItems="center">
							<Grid item>
								<Button variant="contained" color="primary" href={text().s6.link.link} target="_blank">{text().s6.link.text}</Button>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Hidden>
		</React.Fragment >
	);
}

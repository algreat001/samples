import React, { useState } from "react";

import text from "../data";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Card, CardContent, Zoom, Button, Divider, Hidden } from "@material-ui/core";
import ScrollTrigger from "react-scroll-trigger";

function CardPrice(props) {
	const classes = useStyles();
	return (
		<Card className={props.color === 0 ? classes.card0 : classes.card1}>
			<CardContent className={classes.card}>
				<Grid xs={12} className={classes.card} container direction="column" justify="space-between" alignItems="center">
					<Grid item>
						<Typography className={classes.header_card_text_top} variant="h3">
							{props.content.price}
						</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.header_card_text} component="p">
							{props.content.name}
						</Typography>
					</Grid>
					<Grid item>
						<Divider />
						<Typography className={classes.card_description} variant="body2" component="p">
							{props.content.desciption}
						</Typography>
					</Grid>
					<Grid item>
						<Button className={props.color === 0 ? classes.button0 : classes.button1} onClick={() => {props.feedback(true, { radio: text().feedback.radio[0] });}}  >
							{props.content.button.text}
						</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

const useStyles = makeStyles(theme => ({
	card: {
		height: "100%",
	},
	card0: {
		width: "100%",
		height: "350px",
		backgroundColor: "white",
		color: "#2C2E30",
		padding: theme.spacing(1),
		margin: theme.spacing(2),
	},
	card1: {
		width: "100%",
		height: "380px",
		backgroundColor: "#2F5BEA",
		color: "white",
		padding: theme.spacing(2),
		margin: theme.spacing(2),
	},

	button0: {
		backgroundColor: "#2F5BEA",
		color: "white",
	},
	button1: {
		backgroundColor: "white",
		color: "#2C2E30",
	},
	cards: {
		width: "100%",
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
		//height: "700px",
		color: "black",
		backgroundColor: "#F6F8F9",
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
	header_card_text: {
		width: "100%",
		textAlign: "center",
		marginBottom: "20px",
	},
	header_card_text_top: {
		width: "100%",
		textAlign: "center",
		marginBottom: "20px",
		whiteSpace: "nowrap",
		fontSize: "2.4rem",
	},
	subheader_card_text: {
		width: "100%",
		textAlign: "center",
		marginBottom: "18px",
		textTransform: "uppercase",
	},
	card_description: {
		width: "100%",
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	subheader_text: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "16px",
		color: "#2C2E30",
		marginBottom: "20px",
		//marginLeft: "20px",
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

export default function Section7(props) {
	const classes = useStyles();
	//const theme = useTheme();
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
			<div className={classes.header}>
				<Typography className={classes.header_text}>{text().s7.header}</Typography>
				<Typography className={classes.subheader_text}>{text().s7.subheader}</Typography>
				<Hidden mdUp>
					{/* мобилник */}
					<Grid container direction="column" justify="center" alignItems="center" spacing={2}>
						{text().s7.plan.map((item, index) => {
							return (
								<Zoom key={index} in={visible} timeout={{ enter: index * 1000 + 2000, exit: index * 1000 + 3000 }}>
									<Grid item xs={10}>
										<CardPrice feedback={props.feedback} content={item} color={index % 2} />
									</Grid>
								</Zoom>
							);
						})}
					</Grid>
				</Hidden>
				<Hidden smDown>
					{/* декстоп */}
					<Grid container direction="column" justify="center" alignItems="center" spacing={0}>
						<Grid item xs={10}>
							<Grid container direction="row" justify="center" alignItems="center" spacing={2}>
								{text().s7.plan.map((item, index) => {
									return (
										<Zoom key={index} in={visible} timeout={{ enter: index * 1000 + 2000, exit: index * 1000 + 3000 }}>
											<Grid item xs>
												<CardPrice feedback={props.feedback} content={item} color={index % 2} />
											</Grid>
										</Zoom>
									);
								})}
							</Grid>
						</Grid>
					</Grid>
				</Hidden>
				<Grid container direction="column" justify="center" alignItems="center" spacing={1}>
					<Grid item>
						<Typography className={classes.subheader_text}>{text().s7.postText}</Typography>
					</Grid>
					<Grid item>
						<Button color="primary"  onClick={() => {props.feedback(true, { radio: text().feedback.radio[3] });}} >{text().s7.button.text}</Button>
					</Grid>
				</Grid>
			</div>
		</ScrollTrigger>
	);
}

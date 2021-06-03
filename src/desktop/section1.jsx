import React from "react";

import text from "../data";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ScrollDialog from "./cmp/scrolldlg";

import SwipeableViews from "react-swipeable-views";
import { IconButton, GridList, GridListTile, GridListTileBar, Typography, Container, Tab, Tabs, Icon, Grid, Hidden, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	header: {
		width: "100%",
		paddingBottom: "10px",
		//height: "850px",
		color: "black",
		overflow: "hidden",
		backgroundColor: "white",
	},
	header_m: {
		width: "100%",
		paddingBottom: "10px",
		paddingTop: "10px",
		//height: "850px",
		color: "black",
		overflow: "hidden",
		backgroundColor: "white",
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
		padding: 10,
		textAlign: "center"
	},
	headerText: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "24px",
		color: "#2C2E30",
		marginBottom: "20px",
	},
	subheaderText: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Play",
		fontSize: "16px",
		color: "#2C2E30",
		marginBottom: "20px",
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
	miconOver: {
		fontSize: "24px",
		position: "absolute",
		top: "2px",
	},
	miconTabs: {
		fontSize: "12px",
		marginBottom: "10px",
		marginTop: "-13px",
	},
	imgOverText: {
		position: "fixed",
		opacity: 0.2,
		zIndex: -1,
	},
	mgridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
	mlistText: {
		width: "100%",
		textAlign: "left",
		fontFamily: "Play",
		fontSize: "10px",
		color: "white",
		marginBottom: "10px",
	},
	mbutton: {
		width: "calc(100% - 20px)",
		marginLeft: 10,
	},
	title: {
		color: "white",
	},
	titleBar: {
		height: "100%"
	}
}));

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}
function IconTab(props) {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Hidden smDown>
				<Icon className={classes.iconOver}>personal_video</Icon>
				<Icon className={classes.iconTabs}>{props.children}</Icon>
			</Hidden>
			<Hidden mdUp>
				<Icon className={classes.miconOver}>personal_video</Icon>
				<Icon className={classes.miconTabs}>{props.children}</Icon>
			</Hidden>
		</React.Fragment>
	);
}
TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function Section1(props) {
	const classes = useStyles();
	const [moreArticle, setMoreArticle] = React.useState(getArticleShowInit());
	const [value, setValue] = React.useState(0);
	const theme = useTheme();


	function getArticleShowInit() {
		let artFlag = [];
		for (const item of text().s1.tab) {
			artFlag[item.name] = false;
		}
		//		const artFlag = text().article.articles.map((item, index) => false);
		return artFlag;
	}
	function showArticleHandle(article) {
		let artFlag = [];
		for (const item of text().s1.tab) {
			artFlag[item.name] = item.name === article ? true : false;
		}
		setMoreArticle(artFlag);
	};
	function handleChange(event, newValue) {
		setValue(newValue);
	}
	function handleChangeIndex(index) {
		setValue(index);
	}
	function getHtml(item) {
		let res = "<ul style='padding-inline-start: 10px;'>"; //`<h2 style="font-size:0.9rem;">${item.header}</h2><ul>`;
		item.text.map((itemtext, index) => {
			res += `<li key="${index}" style="font-size:0.9rem;">`;
			res += `${itemtext}`;
			res += `</li>`;
		});
		res += `</ul>`;
		if (!!item.link) {
			res += `<a href="${item.link.ref}" target="blank">${item.link.text}</a>`;
		}
		return res;
	}
	let image = [];
	for (let t of text().s1.tab) {
		image[t.image] = require("./image/" + t.image);
	}
	return (
		<>
			<Hidden mdUp>
				{text().s1.tab.map((item, index) => (
					<ScrollDialog
						name={index}
						article={item.name}
						html={getHtml(item)}
						open={moreArticle[item.name]}
						onClose={() => {
							setMoreArticle(getArticleShowInit());
						}}
					/>
				))}
				<GridList className={classes.header_m} cols={1}>
					{text().s1.tab.map((item, index) => (
						<GridListTile key={index}>
							<img src={image[item.image]} alt={item.image} />

							<GridListTileBar
								title={item.header}
								subtitle={
									<Button
										className={classes.mbutton}
										variant="contained" color="default"
										size="large"
										startIcon={<Icon>more_vert</Icon>}
										onClick={() => { showArticleHandle(item.name); }}
									>
										Подробнее
									</Button>
								}
								classes={{
									root: classes.titleBar,
									title: classes.title,
								}}
							/>
						</GridListTile>

					))}
				</GridList>
			</Hidden >
			<Hidden smDown>
				{/* декстоп */}
				<div className={classes.header}>
					<Typography className={classes.headerText}>{text().s1.header}</Typography>
					<Container fixed maxWidth="md">
						<Typography className={classes.subheaderText}>{text().s1.subheader}</Typography>
					</Container>
					<Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
						{text().s1.tab.map((item, index) => (
							<Tab key={index} label={item.name} icon={<IconTab>{item.icon}</IconTab>} />
						))}
					</Tabs>
					<SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
						{text().s1.tab.map((item, index) => (
							<TabContainer key={index}>
								<Grid container direction="row" justify="center" alignItems="flex-start">
									<Grid item key={item.image} xs={4}>
										<img src={image[item.image]} alt={item.image} />
									</Grid>
									<Grid className={classes.headerDiv} item key={item.header} xs={8}>
										<Typography className={classes.headerText}>{item.header}</Typography>
										<ul>
											{item.text.map((itemtext, index) => (
												<li key={index}>
													<Typography className={classes.listText}>{itemtext}</Typography>
												</li>
											))}
										</ul>
										{!!item.link && (<a href={item.link.ref} target="blank">{item.link.text}</a>)}
									</Grid>
								</Grid>
							</TabContainer>
						))}
					</SwipeableViews>
				</div>
			</Hidden>
		</>
	);
}

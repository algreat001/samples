import React from "react";
import clsx from "clsx";
import { withStyles, withTheme } from "@material-ui/core/styles";

import Icon from "@material-ui/core/Icon";

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Drawer,
	CssBaseline,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	Button,
	IconButton,
	Container,
	ListItem,
	ListItemIcon,
	ListItemText,
	Link,
	Hidden,
} from "@material-ui/core";

import ScrollDialog from "./desktop/cmp/scrolldlg.jsx";
import ScrollableAnchor from "react-scrollable-anchor";
import { configureAnchors } from "react-scrollable-anchor";
import PropTypes from "prop-types";

import Header from "./desktop/header";
import { LogoMini } from "./desktop/cmp/logo";
import Section1 from "./desktop/section1";
import Section2 from "./desktop/section2";
import Section3 from "./desktop/section3";
import Section4 from "./desktop/section4";
import Section5 from "./desktop/section5";
import Section6 from "./desktop/section6";
import Section7 from "./desktop/section7";
//import Section8 from "./desktop/section8";
import Footer from "./desktop/footer";
import Feedback from "./desktop/feedback";
import text from "./data";

const drawerWidth = 260;
class PageSection extends React.Component {
	render() {
		return <div>{this.props.content}</div>;
	}
}

PageSection.propTypes = {
	content: PropTypes.node.isRequired,
};



const styles = theme => ({
	root: {
		//display: "flex",
		margin: 0,
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		height: theme.spacing(12),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	title: {
		flexGrow: 1,
	},
	logo: {
		textTransform: "none",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: "auto",
		height: "calc(100vh)",
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
});

class Main extends React.Component {
	constructor(props) {
		super(props);
		//const artFlag = text().article.articles.map((item, index) => false);
		this.state = { open: false, feedbackDlgShow: false, paramFeedback: {}, articleShow: this.getArticleShowInit() };
	}
	getArticleShowInit() {
		let artFlag = [];
		for (const item of text().article.articles) {
			artFlag[item.name] = false;
		}
		//		const artFlag = text().article.articles.map((item, index) => false);
		return artFlag;
	}
	showArticleHandle = article => {
		let artFlag = [];
		for (const item of text().article.articles) {
			artFlag[item.name] = item.name === article ? true : false;
		}
		this.setState({ articleShow: artFlag });
	};

	componentWillMount() {
		configureAnchors({ offset: -100, scrollDuration: 500 });
	}

	setOpen = v => {
		this.setState({ open: v });
	};
	setFeedback = (showDlg, paramFeedback = {}) => {
		this.setState({ feedbackDlgShow: showDlg, paramFeedback: paramFeedback });
	};

	handleDrawerOpen = () => {
		this.setOpen(true);
	};

	handleDrawerClose = () => {
		this.setOpen(false);
	};
	render() {
		const { theme } = this.props;
		const { classes } = this.props;
		const articles = text().article.articles;
		const anchors = [text().s1.anchor, text().s2.anchor, text().s7.anchor, text().s3.anchor, text().s4.anchor, text().s5.anchor, text().s6.anchor];
		const section = [
			<Section1 feedback={this.setFeedback} article={this.showArticleHandle} />,
			<Section2 feedback={this.setFeedback} article={this.showArticleHandle} />,
			<Section7 feedback={this.setFeedback} article={this.showArticleHandle} />,
			<Section3 feedback={this.setFeedback} article={this.showArticleHandle} />,
			<Section4 feedback={this.setFeedback} article={this.showArticleHandle} />,
			<Section5 feedback={this.setFeedback} article={this.showArticleHandle} />,
			<Section6 feedback={this.setFeedback} article={this.showArticleHandle} />,
		];

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar color="default" className={classes.appBar}>
					<Toolbar>
						<Hidden mdUp>
							<IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} edge="start" className={clsx(classes.menuButton, this.state.open && classes.hide)}>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>
						<Button
							onClick={() => {
								window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
							}}
							className={classes.logo}
						>
							<LogoMini />
						</Button>

						<Typography variant="h6" className={classes.title}>
							{" "}
						</Typography>
						<Hidden smDown>
							{anchors.map((item, index) => (
								<Button component={Link} href={"#" + item.name} key={item.name} onClick={this.handleDrawerClose}>
									{item.text}
								</Button>
							))}
						</Hidden>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					anchor="left"
					open={this.state.open}
					onClose={this.handleDrawerClose}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<LogoMini />
						<IconButton onClick={this.handleDrawerClose}>{theme.direction === "ltr" ? <Icon>chevron_left</Icon> : <Icon>chevron_right</Icon>}</IconButton>
					</div>
					<Divider />
					<Button className={classes.button} onClick={() => this.setFeedback(true)}>
						{text().hero.button.name}
					</Button>
					<Divider />
					<Button lassName={classes.button} component={Link} href={text().hero.phone.link} key={text().hero.phone.text} onClick={this.handleDrawerClose}>
						{text().hero.phone.text}
					</Button>
					<Divider />
					<List>
						{anchors.map((item, index) => (
							<ListItem component={Link} href={"#" + item.name} button key={item.name} onClick={this.handleDrawerClose}>
								<ListItemIcon>
									<Icon>{item.icon}</Icon>
								</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItem>
						))}
					</List>
				</Drawer>
				<main className={classes.content}>
					{articles.map((item, index) => (
						<ScrollDialog
							name={index}
							article={item.name}
							html={item.html}
							open={this.state.articleShow[item.name]}
							onClose={() => {
								this.setState({ articleShow: this.getArticleShowInit() });
							}}
						/>
					))}
					<Container>
						<div className={classes.toolbar} />
						<Feedback param={this.state.paramFeedback} open={this.state.feedbackDlgShow} onClose={() => this.setFeedback(false)} onSend={() => this.setFeedback(false)} />
						<Header feedback={this.setFeedback} />
						{anchors.map((item, index) => (
							<ScrollableAnchor key={"sa" + index} id={item.name}>
								<PageSection content={section[index]} />
							</ScrollableAnchor>
						))}
						<Footer feedback={this.setFeedback} article={this.showArticleHandle} />
					</Container>
				</main>
			</div>
		);
	}
}

export default withTheme(withStyles(styles)(Main));

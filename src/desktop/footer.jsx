import React, { useState } from "react";

import text from "../data";
import { LogoMini, LogoMobile } from "./cmp/logo";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, Card, CardActionArea, CardMedia, CardContent, TextField, Paper, Button, Typography, Grid, AppBar, Link, Toolbar, Hidden, Icon, IconButton } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	header: {
		paddingTop: "50px",
		paddingBottom: "50px",
		width: "100%",
		//height: "250px",
		color: "black",
		backgroundColor: "#F6F8F9",
		zIndex: 100,
		overflow: "inherit",
	},
	image: {
		margin: "auto",
	},
	form: {
		padding: 10,
		//marginBottom: 40,
		//marginLeft: 20,
	},
	mheader: {
		paddingTop: 20,
		paddingBottom: 80,
		color: "black",
		backgroundColor: "#F6F8F9",
		zIndex: 100,
		overflow: "inherit",
	},
	mform: {
		padding: 10,
	},
	adress: {
		margin: 10,
		marginBottom: 20,
		marginRight: 20,
		minWidth: 230,
	},
	adressGrid: {
		minWidth: 230,
	},
	madress: {
		minWidth: 120,
	},
	cardCnt: {
		padding: 6,
	},
	link: {
		cursor: "pointer",
	},
	linkGrid: {
		minWidth: 495,
	},
	footer_text: {
		width: "100%",
		textAlign: "center",
		fontFamily: "Consolas",
		fontSize: "24px",
		color: "white",
		marginBottom: "20px",
	},
	link_text: {
		width: "100%",
		textAlign: "left",
		fontFamily: "Consolas",
		fontSize: "16px",
		color: "white",
		marginBottom: "20px",
		marginLeft: "20px",
	},
	button: {
		backgroundColor: "white",
		color: "#2C2E30",
		textTransform: "uppercase",
	},
	footerBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		height: theme.spacing(7),
		top: "auto",
		bottom: 0,
	},
}));

function AdressCard(props) {
	const classes = useStyles();
	const map = require("./image/map.png");
	const isMobile = !!props.mobile;


	return (
		<Card className={isMobile ? classes.madress : classes.adress}>
			<CardActionArea
				target="_blank"
				href="https://2gis.ru/krasnoyarsk/firm/70000001025649591?m=92.907649%2C56.047983%2F16"
			>
				<CardMedia
					component="img"
					alt="Наш адрес"
					height="140"
					image={map}
					title="Наш адрес"
				/>
				<CardContent className={classes.cardCnt}>
					<Typography gutterBottom variant="subtitle2" component="h2">
						ООО "Бэст Бизнес Консалтинг +"
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						ул. Алексеева, д.49, офис 513<br />
						<a href="tel:+73912232903">тел. +7(391)-223-29-03</a><br />
						<a href="mailto:office@bestbc.ru">office@bestbc.ru</a>
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

function Subsctibe(props) {

	const [showSendMailStatus, setShowSendMailStatus] = useState(false);
	const [mailStatus, setMailStatus] = useState('');
	const [email, setEmail] = useState('');

	const validateEmail = (email) => {
		var res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return res.test(String(email).toLowerCase());
	}

	const handleSend = async () => {
		if (validateEmail(email)) {
			const info = { fields: { email: email } };
			const url = window.location.protocol + "//" + window.location.hostname + "/api/subscribe";
			try {
				let response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: JSON.stringify(info),
				});
				let result = await response.json();
				if (result.status) {
					setMailStatus(text().feedback.ok_subscribe);
					setShowSendMailStatus(true);
				} else {
					setMailStatus(text().feedback.error);
					setShowSendMailStatus(true);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};
	const handleCloseSnack = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setShowSendMailStatus(false);
	};
	const handleEmailChange = async e => {
		await setEmail(e.target.value);
	};

	const classes = useStyles();
	const isMobile = !!props.mobile;

	return (
		<>
			<Paper  >
				<Toolbar className={isMobile ? classes.mform : classes.form} >
					<LogoMini className={classes.image} />
					<Grid container direction="column" justify="space-around" alignItems="center" >
						<Grid item>
							Исследования ББК+:
						</Grid>
						<Grid item>
							<TextField
								id="filled-basic"
								label="e-mail"
								variant="filled"
								value={email}
								onChange={handleEmailChange}
							/>
						</Grid>
						<Grid item>
							<Button onClick={handleSend} >Подписаться</Button>
						</Grid>
					</Grid>
				</Toolbar>
			</Paper>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={showSendMailStatus}
				autoHideDuration={6000}
				onClose={handleCloseSnack}
				ContentProps={{
					"aria-describedby": "message-id",
				}}
				message={<span id="message-id">{mailStatus}</span>}
				action={[
					<IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleCloseSnack}>
						<Icon>close</Icon>
					</IconButton>,
				]}
			/>
		</>
	);
}


export default function Footer(props) {
	const classes = useStyles();

	return (
		<>
			<Hidden mdUp>
				<div className={classes.mheader}>
					{/* мобильник */}
					<Grid container direction="column" justify="center" alignItems="stretch" spacing={2}>
						<Grid item>
							<Subsctibe mobile />
						</Grid>
						<Grid item >
							<AdressCard mobile />
						</Grid>
						<Grid item>
							<Grid container direction="column" justify="center" alignItems="flex-start" spacing={1}>
								<Grid item>
									<Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={1}>
										<Grid item>
											<Typography variant="subtitle2" component="h2" className={classes.subheader_text}>{text().footer.header1}</Typography>
										</Grid>
										{text().footer.col1.map((item, index) => (
											<Grid key={index} item>
												{item.link !== undefined && <Link href={item.link}>{item.text}</Link>}
												{item.article !== undefined && (
													<Link className={classes.link} onClick={() => props.article(item.article)}>
														{item.text}
													</Link>
												)}
												{item.feedback !== undefined && (
													<Link className={classes.link} onClick={() => props.feedback(true, { radio: item.feedback })}>
														{item.text}
													</Link>
												)}
											</Grid>
										))}
									</Grid>
								</Grid>
								<Grid item>
									<Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={1}>
										<Grid item>
											<Typography variant="subtitle2" component="h2" className={classes.subheader_text}>{text().footer.header2}</Typography>
										</Grid>
										{text().footer.col2.map((item, index) => (
											<Grid key={index} item>
												<Link className={classes.link} onClick={() => props.feedback(true, { radio: item.text })}>
													{item.text}
												</Link>
											</Grid>
										))}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Hidden>
			<Hidden smDown>
				{/* декстоп */}
				<div className={classes.header}>
					<Grid container direction="row" justify="center" alignItems="center" spacing={1}>
						<Grid item xs={3}>
							<Subsctibe />
						</Grid>
						<Grid item xs={3} className={classes.adressGrid}>
							<AdressCard />
						</Grid>
						<Grid item xs={6} className={classes.linkGrid} >
							<Grid container direction="row" justify="center" alignItems="flex-start" spacing={1}>
								<Grid item xs={6}>
									<Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={1}>
										<Grid item>
											<Typography variant="subtitle2" component="h2" className={classes.subheader_text}>{text().footer.header1}</Typography>
										</Grid>
										{text().footer.col1.map((item, index) => (
											<Grid key={index} item>
												{item.link !== undefined && <Link href={item.link}>{item.text}</Link>}
												{item.article !== undefined && (
													<Link className={classes.link} onClick={() => props.article(item.article)}>
														{item.text}
													</Link>
												)}
												{item.feedback !== undefined && (
													<Link className={classes.link} onClick={() => props.feedback(true, { radio: item.feedback })}>
														{item.text}
													</Link>
												)}
											</Grid>
										))}
									</Grid>
								</Grid>
								<Grid item xs={6}>
									<Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={1}>
										<Grid item>
											<Typography variant="subtitle2" component="h2" className={classes.subheader_text}>{text().footer.header2}</Typography>
										</Grid>
										{text().footer.col2.map((item, index) => (
											<Grid key={index} item>
												<Link className={classes.link} onClick={() => props.feedback(true, { radio: item.text })}>
													{item.text}
												</Link>
											</Grid>
										))}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Hidden>

			<AppBar color="default" className={classes.footerBar}>
				<Toolbar>
					<Hidden smDown>
						{/* декстоп */}
						<Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
							{text().footer.links.map((item, index) => (
								<Grid key={index} item>
									{item.link !== undefined && <Link href={item.link}>{item.text}</Link>}
									{item.article !== undefined && (
										<Link className={classes.link} onClick={() => props.article(item.article)}>
											{item.text}
										</Link>
									)}
								</Grid>
							))}
						</Grid>
					</Hidden>
					<Hidden mdUp>
						{/* мобильник */}
						<Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
							{text().footer.links_mobil.map((item, index) => (
								<Grid key={index} item>
									{item.link !== undefined && <Link href={item.link}>{item.text}</Link>}
									{item.article !== undefined && (
										<Link className={classes.link} onClick={() => props.article(item.article)}>
											{item.text}
										</Link>
									)}
								</Grid>
							))}
						</Grid>
					</Hidden>
				</Toolbar>
			</AppBar>
		</>
	);
}

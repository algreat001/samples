import React, { Component } from "react";

import text from "../data";
import { withStyles } from "@material-ui/core/styles";
import {
	Hidden,
	Icon,
	IconButton,
	Snackbar,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	Button,
	DialogActions,
	Grid,
	RadioGroup,
	FormControlLabel,
	Radio,
	Select,
	MenuItem,
	InputLabel,
} from "@material-ui/core";

const styles = theme => ({
	close: {
		padding: theme.spacing(0.5),
	},
	header: {
		color: "black",
		backgroundColor: "#E0E0E0",
	},
	image: {
		width: "100%",
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
	select: {
		width: "100%",
	},
});

class Feedback extends Component {
	constructor(props) {
		super(props);
		this.is_mobile = false;
		this.state = {
			mailStatus: "",
			showSendMailStatus: false,
			radio: text().feedback.radio[0],
			name: "",
			phone: "",
			email: "",
			desc: "",
			error: { radio: false, name: false, phone: false, email: false, desc: false },
		};
	}

	handleClose = () => {
		this.props.onClose();
	};
	handleSend = async () => {
		//console.log("Send");
		if (!this.isError()) {
			const info = { type: this.state.radio, fields: { name: this.state.name, phone: this.state.phone, email: this.state.email, desc: this.state.desc } };
			const url = window.location.protocol + "//" + window.location.hostname + "/api/send";
			//console.log(info, url);
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
					this.setState({ mailStatus: text().feedback.ok_status, showSendMailStatus: true });
				} else this.setState({ mailStatus: text().feedback.error, showSendMailStatus: true });
			} catch (e) {
				console.log(e);
			}

			this.props.onSend();
		}
	};
	handleTextFieldChange = async e => {
		let name = e.target.id;
		if (name.substr(name.length - 2) === "_m") {
			name = name.substr(0, name.length - 2);
			this.is_mobile = true;
		}
		await this.setState({ [name]: e.target.value });
		this.isError();
	};
	handleEnter = () => {
		if (this.props.param && this.props.param.radio) {
			const value = text().feedback.radio.indexOf(this.props.param.radio);
			if (value !== -1) this.setState({ radio: this.props.param.radio });
			else
				this.setState({ radio: text().feedback.radio[0] });
		}
	}
	handleRadioChange = e => {
		this.setState({ radio: e.target.value });
	};
	validateEmail(email) {
		var res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return !res.test(String(email).toLowerCase());
	}
	validatePhone(phone) {
		// eslint-disable-next-line
		var res = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;
		return !res.test(String(phone).toLowerCase());
	}
	isError() {
		let res = false;
		let error = {
			radio: this.state.radio === "",
			name: this.state.name === "",
			phone: this.validatePhone(this.state.phone),
			email: this.validateEmail(this.state.email),
			desc: false,
		};

		for (let v in error) {
			res = res || error[v];
		}
		this.setState({ error: error });
		//console.log("result", res, "errr", error);
		return res;
	}

	handleCloseSnack = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		this.setState({ showSendMailStatus: false });
	};

	render() {
		const { classes } = this.props;
		const { showSendMailStatus, mailStatus } = this.state;

		return (
			<div>
				<Dialog open={this.props.open} onEnter={this.handleEnter} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
					<DialogTitle className={classes.header} id="form-dialog-title">
						{text().feedback.header}
					</DialogTitle>
					<Hidden mdUp>
						{/* мобилник */}
						<DialogContent>
							<DialogContentText>{text().feedback.subheader}</DialogContentText>
							<Grid container direction="column" justify="space-between" alignItems="center">
								<Grid item className={classes.select}>
									<InputLabel id="type_obr_lbl">Причина обращения</InputLabel>
									<Select
										variant="outlined"
										labelId="type_obr_lbl"
										aria-label="Gender"
										name="type_obr_m"
										className={classes.select}
										value={this.state.radio}
										onChange={this.handleRadioChange}
									>
										{text().feedback.radio.map((item, index) => (
											<MenuItem key={index} value={item}>
												{item}
											</MenuItem>
										))}
									</Select>
								</Grid>

								<Grid item>
									{text().feedback.field_m.map((item, index) => (
										<React.Fragment key={index}>
											{item.type === "text" && (
												<TextField
													// eslint-disable-next-line no-eval
													value={this.state[item.name]}
													onChange={this.handleTextFieldChange}
													margin="dense"
													id={item.name}
													// eslint-disable-next-line no-eval
													error={this.state.error[item.name]}
													label={item.place}
													type={item.type}
													fullWidth
												/>
											)}
											{item.type === "multiline" && (
												<TextField
													multiline
													// eslint-disable-next-line no-eval
													value={this.state[item.name]}
													onChange={this.handleTextFieldChange}
													// eslint-disable-next-line no-eval
													error={this.state.error[item.name]} //eval("this.state.error." + item.name)}
													rows={item.rows}
													margin="dense"
													id={item.name}
													label={item.place}
													type={item.type}
													fullWidth
												/>
											)}
										</React.Fragment>
									))}
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Grid container direction="column" justify="space-between" alignItems="center">
								<Grid item>
									<Button onClick={this.handleClose} color="primary">
										{text().feedback.cancel}
									</Button>
								</Grid>
								<Grid item>
									<Button onClick={this.handleSend} color="primary">
										{text().feedback.send}
									</Button>
								</Grid>
							</Grid>
						</DialogActions>
					</Hidden>

					<Hidden smDown>
						{/* декстоп */}
						<DialogContent>
							<DialogContentText>{text().feedback.subheader}</DialogContentText>
							<Grid container direction="row" justify="center" alignItems="flex-start">
								<Grid item xs={5}>
									<RadioGroup aria-label="Gender" name="type_obr" className={classes.group} value={this.state.radio} onChange={this.handleRadioChange}>
										{text().feedback.radio.map((item, index) => (
											<FormControlLabel key={index} value={item} control={<Radio />} label={item} />
										))}
									</RadioGroup>
								</Grid>

								<Grid item xs={7}>
									{text().feedback.field.map((item, index) => (
										<React.Fragment key={index}>
											{item.type === "text" && (
												<TextField
													value={this.state[item.name]}
													onChange={this.handleTextFieldChange}
													margin="dense"
													id={item.name}
													error={this.state.error[item.name]}
													label={item.place}
													type={item.type}
													fullWidth
												/>
											)}
											{item.type === "multiline" && (
												<TextField
													multiline
													value={this.state[item.name]}
													onChange={this.handleTextFieldChange}
													error={this.state.error[item.name]}
													rows={item.rows}
													margin="dense"
													id={item.name}
													label={item.place}
													type={item.type}
													fullWidth
												/>
											)}
										</React.Fragment>
									))}
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								{text().feedback.cancel}
							</Button>
							<Button onClick={this.handleSend} color="primary">
								{text().feedback.send}
							</Button>
						</DialogActions>
					</Hidden>
				</Dialog>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					open={showSendMailStatus}
					autoHideDuration={6000}
					onClose={this.handleCloseSnack}
					ContentProps={{
						"aria-describedby": "message-id",
					}}
					message={<span id="message-id">{mailStatus}</span>}
					action={[
						<IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={this.handleCloseSnack}>
							<Icon>close</Icon>
						</IconButton>,
					]}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(Feedback);

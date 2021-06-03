const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const os = require('os');
const dns = require('dns');
const nodemailer = require("nodemailer");
const database = require("../middleware/db/database");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

const is_debug = false;


app.post("/api/send", async function (req, res) {
	//console.log(req.body);
	const quest = req.body;
	await database.addMessageLanding(quest.fields.name, quest.fields.phone, quest.fields.email, quest.fields.desc, quest.type);
	const result = await sendMail(
		`Обращение ${quest.fields.name}(${quest.fields.email})`,
		`<p>Тип: ${quest.type}</p><hr/><p>ФИО: ${quest.fields.name}</p><p>Телефон: ${quest.fields.phone}</p><p>e-mail: ${quest.fields.email}</p><p>Коментарий: ${quest.fields.desc}</p>`,
		is_debug
	);
	return res.send(JSON.stringify({ status: result }));
});
app.post("/api/subscribe", async function (req, res) {
	//console.log(req.body);
	const quest = req.body;
	await database.addSubscribeLanding(quest.fields.email);
	const result = await sendMail(
		`Подписка для ${quest.fields.email}`,
		`<p>Оформлена подписка на e-mail: ${quest.fields.email}</p>`,
		is_debug
	);
	return res.send(JSON.stringify({ status: result }));
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/robot.txt", function (req, res) {
	res.sendFile(path.join(__dirname, "public", "robot.txt"));
});
app.get("/robots.txt", function (req, res) {
	res.sendFile(path.join(__dirname, "public", "robot.txt"));
});
app.get("/sitemap.xml", function (req, res) {
	res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
});
app.get("/favicon.ico", function (req, res) {
	res.sendFile(path.join(__dirname, "public", "favicon32.png"));
});

let appInstance = app.listen(process.env.PORT || 3004);
const srv = "OS: " + os.platform() + " v:" + os.release() + ", Host:" + os.hostname();
const server_str_html = "<h1>Server is started!</h1><hr/><p>mode debug:" + is_debug + "</p><h2>Server info</h2><p>" + srv + "</p>";
const server_str = "Server is started!\r\n====================================================\r\nmode debug:" + is_debug + "\r\nServer info\r\n" + srv;
sendMail("Server started", server_str_html, is_debug);

console.log(server_str);


function getTransportMail() {
	return nodemailer.createTransport({
		host: "smtp.yandex.ru",
		port: 465,
		secure: true,
		auth: {
			user: "admin@energy-soft.ru", //"office@bestbc.ru", //
			pass: "cerfzefrkrgmhjwz", //"lqrjamikbzxqhkzw", //
		},
	});
}
async function sendMail(subj, body, is_debug = false) {
	let res = true;
	const addr = ["shkolnik@bestbc.ru", "office@bestbc.ru"];

	if (is_debug) {
		console.log("============================ mail =================================");
		console.log({ from: "office@bestbc.ru", to: addr, subject: subj, html: body });
	} else res = await getTransportMail().sendMail({ from: "office@bestbc.ru", to: addr, subject: subj, html: body });
	return res;
}

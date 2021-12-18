const { Client } = require("discord.js");
const express = require("express");
const settings = require("../botconfig/settings.json");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const console = require("console");
const { Console } = require("console");
const { json } = require("express");
const { name } = require("ejs");

const port = settings.dashboardPort;

app = express();
app.set("view engine", "ejs");
app.set('views', __dirname + '/public');
app.use(express.static(__dirname + "/dash/static"));
app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index");
});

app.get('/addnewresponder', (req, res) => {
    res.render("addnewresponder");
});
app.post('/addnewresponder', (req, res) => {
  let response = req.body;
  let triggers = [];
  let responses = [];
  response.responderTriggers.split("\r").forEach(trigger => {triggers.push(trigger.toLowerCase().replace("\r\n", "").replace("\n", ""))});
  response.responderResponse.split("\r").forEach(response => {responses.push(response.toLowerCase().replace("\r\n", ""))});
  triggers.forEach(trigger => {
      index = trigger.indexOf(trigger);
      trigger = trigger.replaceAll("\\n", "\n");
      if (trigger.endsWith(" ")) trigger = trigger.substring(0, trigger.length - 1);
      triggers[index] = trigger;
  });
  responses.forEach(response => {
      index = response.indexOf(response)
      response = response.replaceAll("\\n", "\n");
      if (response.endsWith(" ")) response = response.substring(0, response.length - 1);
      responses[index] = response;
  });
  let json = {
    "name": response.responderName,
    "type": "string",
    "triggers": triggers,
    "responses": responses
  }
  const path = __dirname + "/../autoResponses/";
  fs.writeFile(path + response.responderName + ".json", JSON.stringify(json, null, 4), (err) => {
    if(err) console.log(err); 
    else console.log(`Added autoresponse file ${response.responderName}.json`)});
  res.redirect('/listallresponders');
});

app.get("/listallresponders", (req, res) => {
  responders = []
  responderList = fs.readdirSync(__dirname + "/../autoResponses/");
  responderList.forEach(responder => {
    resp = JSON.parse(fs.readFileSync(__dirname + "/../autoResponses/" + responder, "utf8"));
    responders.push(resp);
  });
  res.render("listallresponders", responders=responders);
});

app.get("/editresponder", (req, res) => {
  responder = req.query.responder;
  if(!responder) return res.redirect("/listallresponders");
  responder = JSON.parse(fs.readFileSync(__dirname + "/../autoResponses/" + responder + ".json", "utf8"));
  resString = responder.responses.join("\n");
  responder.responses = resString;
  triString = responder.triggers.join("\n");
  responder.triggers = triString;
  res.render("editresponder", responder=responder);
});
app.post("/editresponder", (req, res) => {
  let response = req.body;
  let triggers = [];
  let responses = [];
  response.responderTriggers.split("\r").forEach(trigger => {triggers.push(trigger.toLowerCase().replace("\r\n", "").replace("\n", ""))});
  response.responderResponse.split("\r").forEach(response => {responses.push(response.toLowerCase().replace("\r\n", ""))});
  triggers.forEach(trigger => {
      index = trigger.indexOf(trigger);
      trigger = trigger.replaceAll("\\n", "\n");
      if (trigger.endsWith(" ")) trigger = trigger.substring(0, trigger.length - 1);
      triggers[index] = trigger;
  });
  responses.forEach(response => {
      index = response.indexOf(response)
      response = response.replaceAll("\\n", "\n");
      if (response.endsWith(" ")) response = response.substring(0, response.length - 1);
      responses[index] = response;
  });
  let json = {
    "name": req.query.responder,
    "type": "string",
    "triggers": triggers,
    "responses": responses
  }
  const path = __dirname + "/../autoResponses/";
  fs.writeFile(path + req.query.responder + ".json", JSON.stringify(json, null, 4), (err) => {
    if(err) console.log(err); 
    else console.log(`Added autoresponse file ${req.query.responder}.json`)});
  res.redirect('/listallresponders');
});


app.get("/deleteresponder", (req, res) =>{
  responder = req.query.responder;
  if(!responder) return res.redirect("/listallresponders");
  try{
    fs.unlinkSync(__dirname + "/../autoResponses/" + responder + ".json", (err) => {});
  } catch(err) {
    console.log(err);
  }
  let warnStr = `deleted responder: ${responder.name}`;
  res.redirect("/listallresponders");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
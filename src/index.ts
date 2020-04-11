import express from "express"
import bodyParser from "body-parser"
import Haxer from "./haxer"

const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 5000
const BASE_URL = `https://hakr.herokuapp.com/login/`

const haxer = new Haxer()

// express setup
server.set("view engine", "ejs")
server.use(express.static('public'))


server.get("/welcome", (req, res) => {
  res.render("index.ejs")
})

server.get("/", (req, res) => {
  res.render("create.ejs")
})

server.get("/login", (req, res) => {
  res.render("login.ejs")
})

server.get("/hack", (req, res) => {
  res.render("hack.ejs")
})

server.post("/code", (req, res) => {
  const values: any = req.body
  console.log("values", values)
  const code = haxer.createCode(values)
  res.render("invite.ejs", {
    url: BASE_URL +
      code.uid
  })
})

server.get("/login/:uid", (req, res) => {
  const code = haxer.get(req.params.uid)
  if (code)
    res.render("login.ejs", {
      username: code.username,
      password: "",
      uid: code.uid,
    })
  else
    res.send("This is not the login you are looking for.")
})

server.post("/attempt", (req, res) => {
  const values: any = req.body
  console.log("values", values)
  if (!values || !values.uid || !values.password)
    return res.send("You obviously shouldn't be here.")
  const code = haxer.get(values.uid)
  if (!code)
    return res.send("Please go away.")
  const attempt = code.attempt(values.password)
  const result: any = {
    ...values,
    ...attempt
  }
  if (attempt.result === "granted") {
    result.message = code.message
    return res.render("granted.ejs", result)
  }
  if (attempt.result === "denied") {
    return res.render("denied.ejs", result)
  }
  res.render("login.ejs", result)
})

server.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`haxer server started at http://localhost:${PORT}`)
})
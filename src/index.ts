import express from "express"
import bodyParser from "body-parser"
import Haxer from "./haxer"

const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
const PORT = 8000
const BASE_URL = "https://haxer-server.zakmandhro.repl.co/login/"

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

server.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`haxer server started at http://localhost:${PORT}`)
})
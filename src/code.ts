export default class Code {
  username = ""
  message = ""
  password = ""
  uid = ""
  constructor({ username, message, password }: { username: string, message: string, password: string }) {
    this.uid = generateQuickGuid()
    this.username = username
    this.message = message
    this.password = password
  }
}

function generateQuickGuid() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}
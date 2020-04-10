const MAX_ATTEMPTS = 10

export default class Code {
  username = ""
  message = ""
  password = ""
  uid = ""
  attempts = 0
  constructor({ username, message, password }: { username: string, message: string, password: string }) {
    this.uid = generateQuickGuid()
    this.username = username
    this.message = message
    this.password = password
  }
  attempt(password) {
    this.attempts += 1
    const remaining = MAX_ATTEMPTS - this.attempts
    if (remaining > 0) {
      if (this.password === password) return {
        result: "granted",
        attempts: this.attempts
      }
      return {
        result: "incorrect",
        feedback: `Incorrect password. You have ${remaining} tries left.`,
        attempts: this.attempts
      }
    } else return { result: "denied" }
  }
}

function generateQuickGuid() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}
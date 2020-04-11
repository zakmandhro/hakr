import { Attempt } from "./attempt"

const MAX_ATTEMPTS = 10

export default class Code {
  username = ""
  message = ""
  password = ""
  uid = ""
  attempts = []
  constructor({ username, message, password }: { username: string, message: string, password: string }) {
    this.uid = generateQuickGuid()
    this.username = username
    this.message = message
    this.password = password
  }
  attempt(password) {
    const attempt = new Attempt(password, this.password)
    this.attempts.push(attempt)
    const remaining = MAX_ATTEMPTS - this.attempts.length
    if (remaining > 0) {
      if (this.password === password) return {
        result: "granted",
        attempts: this.attempts
      }
      return {
        result: "incorrect",
        feedback: `Incorrect password. You have ${remaining} tries left.`,
        password: password,
        hint: attempt.hint,
        attempts: this.attempts
      }
    } else return { result: "denied" }
  }
}

function generateQuickGuid() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}
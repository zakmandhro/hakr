export class Attempt {
  password = ""
  placed = 0
  misplaced = 0
  hint = "No matching letters"
  constructor(private attempted: string, actual: string) {
    this.password = attempted
    let a = attempted.split("")
    let b = actual.split("")
    if (attempted === actual) {
      this.placed = 4
      this.hint = "passwords match"
    } else {
      [a, b] = this.scanPlaced(a, b)
      this.scanMisplaced(a, b)
      if (this.placed) {
        const s = this.placed == 1 ? "" : "s"
        this.hint = `${this.placed} letter${s} in the right place`
      }
      if (this.misplaced) {
        if (this.placed) this.hint += ", plus "
        const s = this.misplaced == 1 ? "" : "s"
        this.hint += `${this.misplaced} letter${s} in the wrong place`
      }
    }
  }

  scanPlaced(a: string[], b: string[]) {
    let places = []
    a.forEach((x, i) => {
      if (x == b[i]) {
        places.push(i)
      }
    })
    this.placed = places.length
    let a2 = a.filter((x, i) => !places.includes(i))
    let b2 = b.filter((x, i) => !places.includes(i))
    return [a2, b2]
  }

  scanMisplaced(a: string[], b: string[]) {
    let b2 = Object.assign([], b)
    a.forEach((x) => {
      if (b2.includes(x)) {
        b2.splice(b2.indexOf(x), 1)
        this.misplaced += 1
      }
    })
  }
}

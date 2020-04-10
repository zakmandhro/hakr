import Code from "./code"

export default class Haxer {
  codes: any = {}
  createCode(values: any) {
    const code = new Code(values)
    this.codes[code.uid] = code
    console.log("codes: ", this.codes)
    return code
  }
}
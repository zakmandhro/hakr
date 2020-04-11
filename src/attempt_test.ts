import { Attempt } from "./attempt"

const fixtures = [
  ["AABB", "ABCD"],
  ["ABCD", "DCBA"],
  ["ABAB", "ABCC"],
  ["AAAA", "BAAA"]
]

fixtures.forEach(fix => {
  console.log(`\n${fix[0]} =? ${fix[1]}`)
  console.log(new Attempt(fix[0], fix[1]))
})

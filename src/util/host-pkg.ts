import * as fs from "fs"
import * as path from "path"

interface Pkg {
  name: string
  [key: string]: any
}

function determinePkg(): Pkg {
  let pkg
  let mod: NodeModule | null = module
  do {
    mod = mod.parent
    if (!mod) return {name: "<unknown>"}
  } while (mod.id !== ".")

  let dir = mod.filename
  do {
    dir = path.dirname(dir)
    if (dir === "/") return {name: "<unknown>"}

    pkg = path.join(dir, "package.json")
  } while (!fs.existsSync(pkg))

  return require(pkg)
}

const pkg = determinePkg()
export default pkg

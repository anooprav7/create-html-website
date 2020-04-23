const fs = require("fs-extra")
const path = require("path")
const { spawnSync, spawn } = require("child_process")
const os = require("os")
const { generatePackageJson } = require("./config")

let folderName
let root

function addDependencies() {
  let dependencies = ["lite-server@2.5.4"]
  let command = "yarnpkg"
  args = ["add", ...dependencies, "--exact", "--save-dev"]
  args.push("--cwd")
  args.push(root)

  spawnSync(command, args, { stdio: "inherit" })
}

function addTemplateFiles() {
  // package.json
  const packageJson = generatePackageJson(folderName)
  const templateRoot = path.resolve("template-files")

  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )

  // copy template files
  fs.copySync(templateRoot, root)
}

function init() {
  folderName = process.argv[2] || "html-website"
  root = path.resolve(folderName)

  // clean up
  fs.removeSync(root)

  // create folder
  fs.ensureDirSync(folderName)

  addTemplateFiles()
  addDependencies()
}

init()
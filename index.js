#!/usr/bin/env node

"use strict"

const fs = require("fs-extra")
const path = require("path")
const { spawnSync, spawn } = require("child_process")
const os = require("os")
const { html, css, generatePackageJson } = require("./config")

let folderName
let root

function addDependencies() {
  let dependencies = ["lite-server@2.5.4"]
  let command = "yarnpkg"
  let args = ["add", ...dependencies, "--exact", "--save-dev"]
  args.push("--cwd")
  args.push(root)

  spawnSync(command, args, { stdio: "inherit" })
}

function addTemplateFiles() {
  // package.json
  const packageJson = generatePackageJson(folderName)
  // const templateRoot = path.resolve("template-files")
  // const templateRoot = require.resolve("./template-files/index.html")

  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )

  fs.writeFileSync(path.join(root, "index.html"), html + os.EOL)
  fs.writeFileSync(path.join(root, "normalize.css"), css + os.EOL)
  fs.writeFileSync(path.join(root, "styles.css"), "" + os.EOL)
  fs.writeFileSync(path.join(root, "index.js"), "" + os.EOL)
  fs.writeFileSync(path.join(root, ".gitignore"), "node_modules/" + os.EOL)

  // copy template files
  // fs.copySync(templateRoot, root)
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

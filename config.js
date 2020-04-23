exports.generatePackageJson = function (folderName) {
  return {
    name: folderName,
    version: "0.1.0",
    private: true,
    main: "index.js",
    scripts: {
      start: "lite-server",
    },
    bin: {
      "create-html-website": "./index.js",
    },
    keywords: [],
    author: "",
    license: "ISC",
  }
}

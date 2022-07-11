const pkg = require("./package.json");
const path = require("path");
const fs = require("fs");

const packageDir = path.resolve(__dirname, "package");
if (!fs.existsSync(packageDir)) {
  fs.mkdirSync(packageDir);
}

[
    "scripts",
    "devDependencies",
    "eslintConfig"
].forEach(k => {
    delete pkg[k];
});

fs.writeFileSync(path.resolve(packageDir, "package.json"), JSON.stringify(pkg, null, 2));
fs.cpSync(path.resolve(__dirname, "dist"), path.resolve(packageDir, "dist"), { recursive: true });

[
    "README.md",
    "LICENSE"
].forEach(f => {
    fs.cpSync(path.resolve(__dirname, f), path.resolve(packageDir, f));
})

var json = JSON.parse(require('fs').readFileSync("./package.json", { encoding: 'utf8', flag: 'r' }))

json.version = (parseInt(json.version.replace(/\./g, "")) + 1).toString().split("").join(".")

require('fs').writeFileSync('./package.json', require('json-format')(json))

function exec(code) {
    require('child_process').exec(code, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
}

exec("git add *")
exec("git add .")
exec("git commit -m 'commit automatico'")
exec("git push")
exec("npm publish")
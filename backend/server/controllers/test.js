const { PythonShell } = require('python-shell');
const spawn = require("child_process").spawn;

// let options = {
//     pythonOptions: ['-u'], // get print results in real-time
//     args: ["--input-file " + '../../invoice-extractor/Sample1.pdf', "--output-file ../../invoice-extractor/results5.xlsx", "--template ../../invoice-extractor/template.xlsx"]
// };

// PythonShell.run('C:\Users\apoor\OneDrive\Documents\GitHub\flipkartgrid-backend\invoice-extractor\file-new.py', options, function (err, results) {
//     console.log('ya!');
// })

async function test() {
    const pythonProcess = spawn('python3', ["../../invoice-extractor/file-new.py", "--input-file " + './invoice-extractor/Sample1.pdf', "--output-file ./invoice-extractor/results3.xlsx", "--template ./invoice-extractor/template.xlsx"]);

    await new Promise((resolve, reject) => {
        pythonProcess.stdout.on("data", data => {
            resolve(data.toString()); // <------------ by default converts to utf-8
        })
        pythonProcess.stderr.on("data", reject)
    })
}

test()


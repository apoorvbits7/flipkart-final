const FileUploads = require('../models').FileUploads;
const AWS = require('aws-sdk');
const formidable = require('formidable');
const fs = require('fs');
const spawn = require("child_process").spawn;
const exec = require("child_process").exec;
const { PythonShell } = require('python-shell');
const { executionAsyncId } = require('async_hooks');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAWJIIFWUCROL25VVT',
    secretAccessKey: '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'
})

module.exports = {
    upload(req, res) {
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            try {
                if (err) {
                    next(err);
                    console.error(err);
                    res.sendStatus(500);
                    return;
                }

                Object.entries(files).map((obj) => {
                    let key = obj[0];
                    let file = obj[1];
                    console.log(file.path);
                    let fileStream = fs.createReadStream('C:\\Users\\apoor\\OneDrive\\Documents\\GitHub\\flipkartgrid-backend\\invoice-extractor\\out1.xlsx');
                    const params = {
                        Bucket: 'something-corona',
                        Key: fields.userID + '-' + fields.fileID + '-' + key + '.xlsx', // File name you want to save as in S3
                        Body: fileStream,
                        ACL: 'public-read'
                    };

                    // Uploading files to the bucket
                    s3.upload(params, async function (err, data) {
                        if (err) {
                            console.error(err);
                            res.sendStatus(500);
                        } else {
                            console.log(`File uploaded successfully. ${data.Location}`);
                            await FileUploads.create({
                                id: fields.fileID,
                                userID: fields.userID,
                                fileName: key,
                                fileURL: data.Location,
                                invoiceNumber: 456,
                                totalAmount: 123,
                                processedJSON: {
                                    invoiceNumber: 456,
                                    totalAmount: 123,
                                    gstinNo: 234
                                }
                            })
                            res.send({
                                link: data.Location,
                                fraud: '75%',
                                userID: fields.userID,
                                fileID: fields.fileID,
                                processedDetails: {
                                    invoiceNumber: 1234,
                                    totalAmount: 799,
                                    gstinNo: '17ABCDEF123GXYZ'
                                }
                            });
                        }
                    });
                    // let osCommand = "python C:\\Users\\apoor\\OneDrive\\Documents\\GitHub\\flipkartgrid-backend\\invoice-extractor\\file-latest.py --input-file " + file.path + " --output-file C:\\Users\\apoor\\OneDrive\\Documents\\GitHub\\flipkartgrid-backend\\invoice-extractor\\results6.xlsx"
                    // // const pythonProcess = spawn('python3', ["./invoice-extractor/file-new.py", "--input-file " + './invoice-extractor/Sample1.pdf', "--output-file ./invoice-extractor/results3.xlsx", "--template ./invoice-extractor/template.xlsx"]);
                    // exec(osCommand, (error, stdout, stderr) => {
                    //     if (err) throw err;
                    //     // results is an array consisting of messages collected during execution
                    //     console.log('results: ' + stdout);

                    // });
                })
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        });
    },
    async getAllUploads(req, res) {
        let allUploads = await FileUploads.findAll({
            where: {
                userID: req.body.userID
            }
        });
        let allUploadsParsed = allUploads.map((upload) => {
            return upload.dataValues
        });
        res.status(200).send(allUploadsParsed);
    }
}
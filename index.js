// dependencies
const AWS = require('aws-sdk');
const util = require('util');

const efsClient = require('fs');

// get reference to S3 client
const s3Client = new AWS.S3();

//destination efs folder structure
const efsDir = process.env.DESTINATION_FOLDER;

exports.handler = async (event, context, callback) => {

    // Read options from the event parameter.
    console.log("Reading options from event:\n", util.inspect(event, { depth: 5 }));

    //source S3 bucket name - from where the event is triggered
    const srcBucket = event.Records[0].s3.bucket.name;

    // S3 Object key may have spaces or unicode non-ASCII characters.
    const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

    // Infer the file type from the file suffix.
    const typeMatch = srcKey.match(/\.([^.]*)$/);
    console.log(' srcBucket ---' + srcBucket + ' srcKey --- ' + srcKey);

    // Check that the file type is zip and if not then log the error and return  
    const fileType = typeMatch[1].toLowerCase();
    if (fileType != "zip") {
        console.log(`Unsupported file type to be moved: ${fileType}`);
        return;
    }

    // Download the image from the S3 source bucket. Log error and return for any errors
    try {
        //S3 source bucket and key name
        const sourceParams = {
            Bucket: srcBucket,
            Key: srcKey
        };

        //To download the file from S3 source
        var sourceFile = await s3Client.getObject(sourceParams).promise();

    } catch (error) {
        console.log(error);
        return;
    }
    // move the file to the destination efs location. Log error if any.
    try {
        //To move the file to the efs folder
        efsClient.writeFileSync(`${efsDir}/${srcKey}`, sourceFile.Body);

    } catch (error) {
        console.log(error);
        return;
    }

    console.log(' File Successfully moved from ' + srcBucket + '/' + srcKey +
        ' to the destination path ' + efsDir + '/' + srcKey);

    //To list the files in the efs destination folder. This is to be removed.
    const fileList = efsClient.readdirSync(efsDir);

    //to traverse through the files in the fileList
    for (const file of fileList) {
        console.log(' The files are --- ', file);
    }

};

const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

// Your credentialsCREDENTIALS
//console.log(process.env.CREDENTIALS);
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

async function translateText(data, targetLanguage){
    try {
        const promise = [];
        for (element of data ){
            for (const key in element) {
                if( key  == 'mobileNumber') continue;
                [element[key]] = await translate.translate(element[key], targetLanguage);
            }
        };
        return data;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};

module.exports = translateText
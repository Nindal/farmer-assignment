const res = require('express/lib/response');

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
        const result = [];
        for (element of data ){
            for (const key in element) {
                 promise.push(translate.translate(element[key], targetLanguage));
            }
        };
        const arr = await Promise.all(promise);
        for ( let i=0 ;i<promise.length;i=i+5){
            const obj = {};
            obj.name = arr[i][0];
            obj.mobileNulber = arr[i+1][0];
            obj.state_name = arr[i+2][0];
            obj.district_name = arr[i+3][0];
            obj.village_name = arr[i+4][0];
            result.push(obj);
        }
        return result;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};

module.exports = translateText
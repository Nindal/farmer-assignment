const fs = require('fs');
const csv = require('csvtojson')

async function read(fileName){
    try{
        const array = await csv().fromFile(__dirname+'/file/'+fileName);
        return array;
    }
    catch(err){
        console.log(err);
        return null;
    }
    
}

module.exports = {read};
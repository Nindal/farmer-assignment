const db = require("../models");
const Address = db.address;
const Farmer= db.farmer;
const { read } = require("../util/readCSV");
const _ = require('underscore');
const translateText = require('../util/translate');
const LANGUAGE = require('./LANGUAGE');

async function uploadData(req,res){
    try{
        const val = await read(req.file.filename);
        for( ele of val){
            const add = await Address.findOne({
                where : {
                    state : ele.state_name,
                    district : ele.district_name,
                    village : ele.village_name
                }
            })
            if( _.isEmpty(add)){
                const address = await Address.create({
                    state : ele.state_name,
                    district : ele.district_name,
                    village : ele.village_name
                })
                console.log(address.dataValues.id);
                await Farmer.create({
                    name : ele.farmer_name,
                    mobileNumber : ele.phone_number,
                    addressId : address.dataValues.id
                })
            }
            else{
                await Farmer.create({
                    name : ele.farmer_name,
                    mobileNumber : ele.phone_number,
                    addressId : add.dataValues.id
                })
            }
            
        }
        return res.status(200).json({
            status: 'success',
            message: 'data successfully uploaded'
        })
    }
    catch(err){
        return res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}    
    
async function showData(req,res){
    try{
        const lang = req.query.language ;
        const targetLanguage = LANGUAGE[lang];
        const farmers = await Farmer.findAll({
            include: { model: Address, required: true },
        });
        const result = JSON.parse(JSON.stringify(farmers));
        const jsonObj = [];
        result.forEach(element => {
            const obj = {};
            obj.name = element.name;
            obj.mobileNumber = element.mobileNumber;
            obj.state_name  = element.address.state;
            obj.district_name = element.address.district;
            obj.village_name = element.address.village;
            jsonObj.push(obj);
        });
       const data = await translateText(jsonObj,targetLanguage);
        return res.status(200).json({
            status : 'success',
            data   : data
        })
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            status: 'fail',
            message: err
        })

    }
}


module.exports = { uploadData, showData }

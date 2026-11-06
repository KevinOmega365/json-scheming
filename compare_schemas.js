///////////////////////////////////////////////////////////////////////////////

import fs from 'fs'
import util from 'util'
import Ajv from "ajv";

///////////////////////////////////////////////////////////////////////////////

const configsFolderPath = './data/working/endpoint_configs/'
const schemaFolderPath = './data/working/endpoint_schema/'

///////////////////////////////////////////////////////////////////////////////

const schemaFileList = fs.readdirSync(schemaFolderPath)

const schemaList = schemaFileList.map(filename =>
    JSON.parse(fs.readFileSync(`${schemaFolderPath}${filename}`))
)

///////////////////////////////////////////////////////////////////////////////

const configFileList = fs.readdirSync(configsFolderPath)

const configList = configFileList.map(filename =>
    JSON.parse(fs.readFileSync(`${configsFolderPath}${filename}`))
)

///////////////////////////////////////////////////////////////////////////////

let sting_match_output = ''
for (let i = 0; i < schemaList.length; i++) {
    sting_match_output += `${(i < 10 ? '0' : '') + i}:`
    for (let j = 0; j < schemaList.length; j++) {
        sting_match_output += util.isDeepStrictEqual(schemaList[i], schemaList[j]) ? 'x' : ' '
    }
    sting_match_output += '\n'
}

console.log(sting_match_output)

///////////////////////////////////////////////////////////////////////////////

const ajv = new Ajv()

let validation_output = ''
for (let i = 0; i < schemaList.length; i++) {
    validation_output += `${(i < 10 ? '0' : '') + i}:`
    for (let j = 0; j < schemaList.length; j++) {
        validation_output += ajv.validate(schemaList[i], configList[j]) ? 'x' : ' '
    }
    validation_output += '\n'
}

// console.log(validation_output)
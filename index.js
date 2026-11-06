///////////////////////////////////////////////////////////////////////////////

import { readFileSync, existsSync } from 'fs'
import {
    readyEmptyFolder,
    writeConfigFiles
} from "./src/js/generate_config_files.js"
// import Ajv from "ajv";
import jsonSchemaGenerator from 'json-schema-generator'
import { zip_data_fields } from './src/js/zip_data_fields_json.js'

///////////////////////////////////////////////////////////////////////////////

const inputFolderPath = './data/input/'
const inputFileName = 'endpoint_configs.json'
const inputFilePath = `${inputFolderPath}${inputFileName}`
const configsFolderPath = './data/working/endpoint_configs/'
const schemaFolderPath = './data/working/endpoint_schema/'

///////////////////////////////////////////////////////////////////////////////

if(!existsSync(inputFilePath)) {
    console.log(console.log(`Unable to find input file: ${inputFilePath}`))
    console.log(process.exit(1))
}

///////////////////////////////////////////////////////////////////////////////

const unzippedData =
JSON.parse(
    readFileSync(inputFilePath)
)

const endpointConfigData = zip_data_fields(unzippedData)
    .map(o => ({
        System: o.QuerySystem,
        Name: o.QueryName,
        EndpointConfig: JSON.parse(o.EndpointConfig)
    }))

console.log(endpointConfigData) // debug

readyEmptyFolder(configsFolderPath)
writeConfigFiles(configsFolderPath, endpointConfigData)

///////////////////////////////////////////////////////////////////////////////

const endpointSchemaData = endpointConfigData
    .map(({
        System,
        Name,
        EndpointConfig
    }) => {
        const generatedSchema = jsonSchemaGenerator(EndpointConfig)
        delete generatedSchema['$schema']
        return {
            System,
            Name,
            EndpointConfig: generatedSchema
        }
    })

readyEmptyFolder(schemaFolderPath)
writeConfigFiles(schemaFolderPath, endpointSchemaData)

///////////////////////////////////////////////////////////////////////////////
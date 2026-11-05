///////////////////////////////////////////////////////////////////////////////

import { readFileSync } from 'fs'
import {
    readyEmptyFolder,
    writeConfigFiles
} from "./src/js/generate_config_files.js"
// import Ajv from "ajv";
import jsonSchemaGenerator from 'json-schema-generator'

///////////////////////////////////////////////////////////////////////////////

const inputFolderPath = './data/input/'
const configsFolderPath = './data/working/endpoint_configs/'
const schemaFolderPath = './data/working/endpoint_schema/'

///////////////////////////////////////////////////////////////////////////////

const endpointConfigData =
    JSON.parse(
        readFileSync(`${inputFolderPath}endpoint_configs.json`)
    )

readyEmptyFolder(configsFolderPath)
writeConfigFiles(configsFolderPath, endpointConfigData)

///////////////////////////////////////////////////////////////////////////////

const endpointSchemaData = endpointConfigData.map(({
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
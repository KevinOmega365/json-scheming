///////////////////////////////////////////////////////////////////////////////

import { readFileSync, existsSync } from 'fs'
import {
    readyEmptyFolder,
    writeConfigFiles
} from "./src/js/generate_config_files.js"
import { zip_data_fields } from './src/js/zip_data_fields_json.js'

///////////////////////////////////////////////////////////////////////////////

const inputFolderPath = './data/input/'
const inputFileName = 'endpoint_configs.json'
const inputFilePath = `${inputFolderPath}${inputFileName}`
const configsFolderPath = './data/working/endpoint_configs/'

///////////////////////////////////////////////////////////////////////////////

if(!existsSync(inputFilePath)) {
    console.log(`Unable to find input file: ${inputFilePath}`)
    process.exit(1)
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

// console.log(endpointConfigData) // debug

readyEmptyFolder(configsFolderPath)
writeConfigFiles(configsFolderPath, endpointConfigData)

///////////////////////////////////////////////////////////////////////////////
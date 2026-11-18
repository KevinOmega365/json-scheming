//////////////////////////////////////////////////////////////////// imports //

import Ajv from 'ajv'
import fs from 'fs'
import { getFileRequestSchema } from './src/js/api_file_request_schema.js'
import { getRestRequestSchema } from './src/js/api_rest_request_schema.js'
import { zip_data_fields } from './src/js/zip_data_fields_json.js'

/////////////////////////////////////////////////////////////// path strings //

const FILE_REQUEST = 'API / File request'
const REST_REQUEST = 'API / Query request'

const inputFolderPath = './data/input/'
const inputFileName = 'endpoint_configs.json'
const inputFilePath = `${inputFolderPath}${inputFileName}`

const schemaFolderPath = './data/working/endpoint_schema/'
const restSchemaFileName = 'api_rest_request_schema.json'
const fileSchemaFileName = 'api_file_request_schema.json'
const restSchemaFilePath = `${schemaFolderPath}${restSchemaFileName}`
const fileSchemaFilePath = `${schemaFolderPath}${fileSchemaFileName}`

//////////////////////////////////////////////////// placeholder config data //

const configsJsonTemplate = {
    "data": [
    ],
    "fields": [
        {
            "name": "StepRef"
        },
        {
            "name": "EndPointRef"
        },
        {
            "name": "StepType"
        },
        {
            "name": "QuerySystem"
        },
        {
            "name": "QueryName"
        },
        {
            "name": "StepConfig"
        },
        {
            "name": "EndpointConfig"
        }
    ]
}

///////////////////////////////////////////////////////// prepare input data //

if (!fs.existsSync(inputFilePath)) {
    console.log(`Unable to find input file: ${inputFilePath}`)
    if (!fs.existsSync(inputFolderPath)) {
        fs.mkdirSync(inputFolderPath, { recursive: true })
    }
    fs.writeFileSync(
        inputFilePath,
        JSON.stringify(configsJsonTemplate, null, 4)
    )
    console.log('Folder and file template created: ' + configsJsonTemplate)
    process.exit(1)
}

///////////////////////////////////////////////////////// unpack config data //

const unzippedData =
    JSON.parse(
        fs.readFileSync(inputFilePath)
    )

const endpointConfigData = zip_data_fields(unzippedData)
    .map(o => ({
        StepType: o.StepType,
        System: o.QuerySystem,
        Name: o.QueryName,
        EndpointConfig: o.EndpointConfig && JSON.parse(o.EndpointConfig)
    }))

// console.table(endpointConfigData) // debug

///////////////////////////////////////////////////////// create JSON schema //

const fileRequestSchema = getFileRequestSchema().valueOf()
const restRequestSchema = getRestRequestSchema().valueOf()

if (!fs.existsSync(schemaFolderPath)) {
    fs.mkdirSync(schemaFolderPath, { recursive: true })
}

fs.writeFileSync(fileSchemaFilePath, JSON.stringify(fileRequestSchema, null, 4))
fs.writeFileSync(restSchemaFilePath, JSON.stringify(restRequestSchema, null, 4))

///////////////////////////////////////////////////////// prepare validators //

const ajv = new Ajv({ allErrors: true })
const validateFile = ajv.compile(fileRequestSchema)
const validateRest = ajv.compile(restRequestSchema)

///////////////////////////////////////////////////////////// run validation //

for (let i = 0; i < endpointConfigData.length; i++) {
    const { EndpointConfig, StepType } = endpointConfigData[i]
    let validate
    
    switch (StepType) {
        case FILE_REQUEST: validate = validateFile; break;
        case REST_REQUEST: validate = validateRest; break;
        default: validate = () => {}; break;
    } 

    const valid = validate(EndpointConfig)
    
    endpointConfigData[i].IsValid = valid && 'OK' || 'Nope'

    endpointConfigData[i].Errors = JSON.stringify(validate.errors)

}

///////////////////////////////////////////////////////////////////// output //

console.table(endpointConfigData)

///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

import Ajv from 'ajv'
import fs from 'fs'
import { getRestRequestSchema } from './src/js/api_rest_request_schema.js'
import { getFileRequestSchema } from './src/js/api_file_request_schema.js'

///////////////////////////////////////////////////////////////////////////////

const folderPath = './data/working/endpoint_configs'

///////////////////////////////////////////////////////////////////////////////

const fileNames = fs.readdirSync(folderPath)

///////////////////////////////////////////////////////////////////////////////

const schema = getFileRequestSchema() // getRestRequestSchema()
const ajv = new Ajv({ allErrors: true })
const validate = ajv.compile(schema.valueOf())

///////////////////////////////////////////////////////////////////////////////

for(let i = 0; i < fileNames.length; i++) {
    const filePath = fs.readFileSync(folderPath + '/' + fileNames[i])
    const config = JSON.parse(filePath)
    const valid = validate(config)
    console.log(valid && 'OK' || 'Nope')

    if (!valid) {
        console.log(validate.errors)
        console.log(config)
        console.log(JSON.stringify(schema.valueOf(), null, 4))
        break
    }
}

///////////////////////////////////////////////////////////////////////////////

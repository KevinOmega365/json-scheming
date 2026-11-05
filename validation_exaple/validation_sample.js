///////////////////////////////////////////////////////////////////////////////

import Ajv from "ajv";
import fs from 'fs'
import jsonSchemaGenerator from 'json-schema-generator'

///////////////////////////////////////////////////////////////////////////////

const ajv = new Ajv();

///////////////////////////////////////////////////////////////////////////////

const iceCreamData = JSON.parse(fs.readFileSync('./icecream.json'));
const iceCreamSchema = JSON.parse(fs.readFileSync('./original_schema.json'));

///////////////////////////////////////////////////////////////////////////////

const generatedSchema = jsonSchemaGenerator(iceCreamData)
delete generatedSchema['$schema']

fs.writeFileSync('./generated_schema.json', JSON.stringify(generatedSchema, null, 4))

const isSelfValid = ajv.validate(generatedSchema, iceCreamData);

if (isSelfValid) {
    console.log("The ice cream can vouch for itself");
} else {
    console.error("WAT:", ajv.errors);
}

///////////////////////////////////////////////////////////////////////////////

const isDataValid = ajv.validate(iceCreamSchema, iceCreamData);

if (isDataValid) {
    console.log("The ice cream data is valid! 🍨");
} else {
    console.error("The ice cream data is invalid:", ajv.errors);
}

///////////////////////////////////////////////////////////////////////////////
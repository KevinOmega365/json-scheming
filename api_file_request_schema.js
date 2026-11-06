///////////////////////////////////////////////////////////////////// import //

import Ajv from 'ajv'
import S from 'fluent-json-schema'
import fs from 'fs'

//////////////////////////////////////////////////////////////// test config //

const config = JSON.parse(
    fs.readFileSync(
        './data/working/endpoint_configs/Apply ProArcProxy-JobCard Files.json'
    )
)
// console.log(config)

////////////////////////////////////////////////////////////////////// types //

const basicAuthenticator = S.object()
    .id('#BasicAuthenticator')
    .prop('Type', S.string().const('Integrations.Interface.RestAPI.AuthenticationHandlers.BasicAuthenticator').required())
    .prop('Parameters', S.object().required()
        .prop('username', S.string().required())
        .prop('password', S.string().required())
    )

///////////////////////////////////////////////////////////////////// schema //

const schema = S.object()
    .id('api_file_request')
    .title('API File Request')
    .description('REST API File Downloader Config Schema')
    .prop('QueryUri', S.string().required())
    .prop('DataRootPath', S.string().required())
    .prop('QueryHeaderAttributes', S.object().required())
    .prop(
        'AuthenticationHandlerConfig',
        S.oneOf([basicAuthenticator])
    )
    .prop('PagingHandlerConfig', S.object()
        .prop('Type', S.string().const('NoPaging.DefaultPagingHandler').required())
    )
    .prop('MAX_QUERY_RETRIES', S.integer())
    .prop('MAX_QUERY_DELAY', S.integer())
    .prop('QUERY_TIMEOUT', S.integer())
    .valueOf()

fs.writeFileSync(
    './api_file_request_schema.json',
    JSON.stringify(schema, null, 4)
)

/////////////////////////////////////////////////////////////////// validate //

const ajv = new Ajv({ allErrors: true })
const validate = ajv.compile(schema.valueOf())
const valid = validate(config)

///////////////////////////////////////////////////////////////////// report //

console.log(valid)
console.log(validate.errors)

///////////////////////////////////////////////////////////////////////////////
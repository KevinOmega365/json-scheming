///////////////////////////////////////////////////////////////////// import //

import Ajv from 'ajv'
import S from 'fluent-json-schema'
import fs from 'fs'

//////////////////////////////////////////////////// allow unused properties //

const ALLOW_UNUSED_PROPERTIES = false

//////////////////////////////////////////////////////////////// test config //

const config = JSON.parse(
    fs.readFileSync(
        // './data/working/endpoint_configs/DTS - AIBEL-Timerecords.json'
        // './data/working/endpoint_configs/DTS Classlibrary Tags - AibelIO - Yggdrasil-Classlibrary Tags.json'
        // './data/working/endpoint_configs/DTS Classlibrary Tags - YGGDRASIL-Classlibrary Tags.json'
        // './data/working/endpoint_configs/DTS MaterialStockItems-Material Stock Items.json'
        // './data/working/endpoint_configs/DTS Planning Data-Plan Activities Relations.json'
        // './data/working/endpoint_configs/DTS Planning Data-Plan Activities.json'
        // './data/working/endpoint_configs/DTS SIF-SIF TagX.json'
        // './data/working/endpoint_configs/DTS SIF-SIF.json'
        // './data/working/endpoint_configs/DTS Yggdrasil+Munin-TagDocX.json'
        './data/working/endpoint_configs/EdvardGrieg-Apply DTS - DCS-Documents.json'
    )
)
// console.log(config)

//////////////////////////////////////////////////////// authenticator types //

const basicAuthenticator = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#BasicAuthenticator')
    .prop('Type',
        S.string()
            .const('Integrations.Interface.RestAPI.AuthenticationHandlers.BasicAuthenticator')
            .required()
    )
    .prop('Parameters',
        S.object()
            .additionalProperties(ALLOW_UNUSED_PROPERTIES)
            .required()
            .prop('username', S.string().required())
            .prop('password', S.string().required())
    )

const oauth2ClientCredentialsAuthenticator = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#OAUTH2ClientCredentialsAuthenticator')
    .prop('Type',
        S.string()
            .const('Integrations.Interface.RestAPI.AuthenticationHandlers.OAUTH2ClientCredentialsAuthenticator')
            .required()
    )
    .prop('TokenUri', S.string().required())
    .prop('TokenRequestTimeout', S.integer().required())
    .prop('TokenRequestParameters',
        S.object()
            .additionalProperties(ALLOW_UNUSED_PROPERTIES)
            .required()
            .prop('grant_type', S.string().required())
            .prop('Client_ID', S.string().required())
            .prop('Client_Secret', S.string().required())
            .prop('scope', S.string())
    )

/////////////////////////////////////////////////////// paging handler types //

const noPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#NoPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('Type',
        S.string()
            .const('NoPaging.DefaultPagingHandler')
            .required()
    )

const incrementUrlPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#IncrementUrlPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('TargetVariable', S.string().required())
    .prop('Type', S.string()
        .const('IncrementUrl.DefaultPagingHandler')
        .required()
    )
    .prop('ValueIncrement', S.integer())
    .prop('ValueInitial', S.integer())

///////////////////////////////////////////////////////////////////// schema //

const schema = S.object()

    .additionalProperties(ALLOW_UNUSED_PROPERTIES)

    .id('api_rest_request')
    .title('API REST Request')
    .description('REST API Data Query Config Schema')

    .prop(
        'AuthenticationHandlerConfig',
        S.oneOf([basicAuthenticator, oauth2ClientCredentialsAuthenticator])
    )

    .prop('DataRootPath', S.string().required())

    .prop('DUMP_RESPONSE', S.boolean())

    .prop('HTTPRequestMethod', S.string().const('GET').required())

    .prop('MAX_QUERY_DELAY', S.integer())

    .prop('MAX_QUERY_RETRIES', S.integer())

    .prop(
        'PagingHandlerConfig',
        S.oneOf([noPagingHandler, incrementUrlPagingHandler])
    )

    .prop('QUERY_TIMEOUT', S.integer())

    .prop('QueryHeaderAttributes', S.object()
        .additionalProperties(ALLOW_UNUSED_PROPERTIES)
        .required()
    ) // todo: add some details

    .prop('QueryUri', S.string().required())

    .prop('QueryUriModifierProc', S.string())
    
    .prop('RemoteMode', S.string().const('REST').required())
    
    .prop('StoreMode', S.string().const('RAW_JSON').required())
    
    .prop('xxQueryUri', S.string()) // todo: get rid of this

    .valueOf()

fs.writeFileSync(
    './api_rest_request_schema.json',
    JSON.stringify(schema, null, 4)
)

/////////////////////////////////////////////////////////////////// validate //

const ajv = new Ajv({ allErrors: true })
const validate = ajv.compile(schema.valueOf())
const valid = validate(config)

///////////////////////////////////////////////////////////////////// report //

console.log(valid || 'Nope')
console.log(validate.errors ?? 'OK')

///////////////////////////////////////////////////////////////////////////////
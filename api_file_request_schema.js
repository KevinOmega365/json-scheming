///////////////////////////////////////////////////////////////////// import //

import Ajv from 'ajv'
import S from 'fluent-json-schema'
import fs from 'fs'

//////////////////////////////////////////////////// allow unused properties //

const ALLOW_UNUSED_PROPERTIES = false

//////////////////////////////////////////////////////////////// test config //

const config = JSON.parse(
    fs.readFileSync(
        // './data/working/endpoint_configs/AkerCDF D2 BMS-Download Files.json'
        // './data/working/endpoint_configs/Apply ProArcProxy-Download Files.json'
        // './data/working/endpoint_configs/EdvardGrieg-Apply DTS - DCS-Download Files.json'
        // './data/working/endpoint_configs/IvarAasen DTS - DCS-Download Files.json'
        // './data/working/endpoint_configs/Munin DTS - DCS-Download Files.json'
        // './data/working/endpoint_configs/Valhall DTS - DCS-Download Files.json'
        './data/working/endpoint_configs/Yggdrasil DTS - DCS-Download Files.json'
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

///////////////////////////////////////////////////////// file handler types //


const directUrlFileHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#DirectUrlFileHandler')

    .prop('FileDownloadMaxDegreeOfParallelism', S.integer())
    .prop('FileNameColumnName', S.string())
    .prop('FilesToDownloadViewName', S.string())
    .prop('FilterOnBatchRef', S.boolean())
    .prop('FilterOnGroupRef', S.boolean())
    .prop('FileDownloadURLColumnName', S.string())
    .prop('FilesToDownloadViewColumnNames',
        S.array()
            .items(S.string())
    )
    .prop('ToDownloadViewFilestoreTableColumnMapping',
        S.object()
            .additionalProperties(S.string()) // free string mapping
    )
    .prop('Type',
        S.string()
            .const('Integrations.Interface.RestAPI.FileHandlers.DirectUrlFileHandler')
            .required()
    )

const delegatedUrlFileHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#DelegatedUrlFileHandler')

    .prop('FileDownloadMaxDegreeOfParallelism', S.integer())
    .prop('FileNameColumnName', S.string())
    .prop('FilesToDownloadViewName', S.string())
    .prop('FilterOnBatchRef', S.boolean())
    .prop('FilterOnGroupRef', S.boolean())
    .prop('LargeFileHandling', S.object()
        .additionalProperties(ALLOW_UNUSED_PROPERTIES)
        .prop('FileSizeColumnName', S.string().required())
        .prop('LargeFileSizeThresholdBytes', S.integer().required())
        .prop('TempFileFolderName', S.string().required())
    )
    .prop('FilesToDownloadViewColumnNames',
        S.array()
            .items(S.string())
    )
    .prop('RequestBodyTemplate', S.object().required())
    .prop('ToDownloadViewFilestoreTableColumnMapping',
        S.object()
            .additionalProperties(S.string()) // free string mapping
    )
    .prop('Type',
        S.string()
            .const('Integrations.Interface.RestAPI.FileHandlers.DelegatedUrlFileHandler')
            .required()
    )

///////////////////////////////////////////////////////////////////// schema //

const schema = S.object()

    .additionalProperties(ALLOW_UNUSED_PROPERTIES)

    .id('api_file_request')
    .title('API File Request')
    .description('REST API File Downloader Config Schema')

    .prop(
        'AuthenticationHandlerConfig',
        S.oneOf([basicAuthenticator, oauth2ClientCredentialsAuthenticator])
    )

    .prop('DataRootPath', S.string().required())

    .prop(
        'FileHandlerConfig',
        S.oneOf([directUrlFileHandler, delegatedUrlFileHandler])
    )
    .prop('MAX_QUERY_RETRIES', S.integer())
    .prop('MAX_QUERY_DELAY', S.integer())

    .prop(
        'PagingHandlerConfig',
        S.object()

            .additionalProperties(ALLOW_UNUSED_PROPERTIES)

            .prop('OldType', S.string())

            .prop('Type',
                S.string()
                    .const('NoPaging.DefaultPagingHandler')
                    .required()
            )
    )

    .prop('QUERY_TIMEOUT', S.integer())

    .prop('QueryUri', S.string().required())

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

console.log(valid || 'Nope')
console.log(validate.errors ?? 'OK')

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////// import //

import S from 'fluent-json-schema'

//////////////////////////////////////////////////// allow unused properties //

const ALLOW_UNUSED_PROPERTIES = false

/////////////////////////////////////////////////////////////// Remote modes //

const remoteModes = {
    REST: 'REST',
    ODATA: 'ODATA',
    GRAPHQL: 'GRAPHQL'
}

//////////////////////////////////////////////////////////////// Store modes //

const storeModes = {
    RAW_JSON: 'RAW_JSON',
    TABULAR: 'TABULAR'
}

/////////////////////////////////////////////////////// HTTP request methods //

const httpRequestMethods = {
    GET: 'GET',
    POST: 'POST'
}

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

const noAuthAuthenticator = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#NoAuthAuthenticator')
    .prop('Type',
        S.string()
            .const('Integrations.Interface.RestAPI.AuthenticationHandlers.NoAuthAuthenticator')
            .required()
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

const cursorContentJsonPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#CursorContent.JsonPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('Type',
        S.string()
            .const('CursorContent.JsonPagingHandler')
            .required()
    )
    .prop('CursorValuePath', S.string().required())
    .prop('NextCursorValuePath', S.string().required())

const cursorUrlDBQueuePagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#CursorUrl.DBQueuePagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('Type',
        S.string()
            .const('CursorUrl.DBQueuePagingHandler')
            .required()
    )
    .prop('ViewName', S.string().required())
    .prop('ColumnName', S.string().required())
    .prop('PostStoredProc', S.string())

const cursorUrlNextLinkPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#CursorUrl.NextLinkPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('Type',
        S.string()
            .const('CursorUrl.NextLinkPagingHandler')
            .required()
    )
    .prop('NextLinkPath', S.string().required())

const incrementUrlDefaultPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#IncrementUrl.DefaultPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('TargetVariable', S.string().required())
    .prop('Type', S.string()
        .const('IncrementUrl.DefaultPagingHandler')
        .required()
    )
    .prop('ValueIncrement', S.integer())
    .prop('ValueInitial', S.integer())

const noPagingDefaultPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#NoPaging.DefaultPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('Type',
        S.string()
            .const('NoPaging.DefaultPagingHandler')
            .required()
    )

///////////////////////////////////////////////////////////////////// schema //

export const getRestRequestSchema = () => {

    const schema = S.object()

        .additionalProperties(ALLOW_UNUSED_PROPERTIES)
        .id('api_rest_request')
        .title('API REST Request')
        .description('REST API Data Query Config Schema')
        .prop(
            'AuthenticationHandlerConfig',
            S.oneOf([
                basicAuthenticator,
                noAuthAuthenticator,
                oauth2ClientCredentialsAuthenticator
            ])
        )
        .prop('DataRootPath', S.string())
        .prop('DUMP_RESPONSE', S.boolean())
        .prop(
            'HTTPRequestMethod',
            S.string().enum(Object.values(httpRequestMethods)))
        .prop('HTTPReequestMethod', S.string()) // todo: get rid of this
        .prop('MAX_QUERY_DELAY', S.integer())
        .prop('MAX_QUERY_RETRIES', S.integer())
        .prop('MAX_RETRY_DELAY', S.integer())
        .prop(
            'PagingHandlerConfig',
            S.oneOf([
                cursorContentJsonPagingHandler,
                cursorUrlDBQueuePagingHandler,
                cursorUrlNextLinkPagingHandler,
                incrementUrlDefaultPagingHandler,
                noPagingDefaultPagingHandler
            ])
        )
        .prop('QUERY_TIMEOUT', S.integer())
        .prop('QueryHeaderAttributes',
            S.object()
                .additionalProperties(S.string()) // free string mapping
        )
        .prop('QueryUri', S.string().required())
        .prop('QueryUriModifierProc', S.string())
        .prop('RegexErrorPattern', S.string())
        .prop(
            'RemoteMode',
            S.string().enum(Object.values(remoteModes))
        )
        .prop(
            'StoreMode',
            S.string().enum(Object.values(storeModes)).required()
        )
        .prop('SECRET_EXPIRATION', S.string())
        .prop('xStoreMode', S.string()) // todo: get rid of this
        .prop('xxAuthenticationHandlerConfig', S.object()) // todo: get rid of this
        .prop('xxPagingHandlerConfig', S.object()) // todo: get rid of this
        .prop('xxQueryUri', S.string()) // todo: get rid of this
        .prop('xyzaa', S.string()) // todo: get rid of this

    return schema
}

///////////////////////////////////////////////////////////////////////////////
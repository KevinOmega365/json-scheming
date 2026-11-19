///////////////////////////////////////////////////////////////////// import //

import S from 'fluent-json-schema'
import {
    basicAuthenticator,
    noAuthAuthenticator,
    oauth2ClientCredentialsAuthenticator
} from './auth/authenticator_types.js'
import {
    cursorContentJsonPagingHandler,
    cursorUrlDBQueuePagingHandler,
    cursorUrlNextLinkPagingHandler,
    incrementUrlDefaultPagingHandler,
    noPagingDefaultPagingHandler,
} from './paging/paging_handler_types.js'

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
                oauth2ClientCredentialsAuthenticator,
            ])
        )
        .prop('DataRootPath', S.string())
        .prop('DUMP_RESPONSE', S.boolean())
        .prop(
            'HTTPRequestMethod',
            S.string().enum(Object.values(httpRequestMethods)))
        .prop('HTTPReequestMethod', S.string().deprecated()) // todo: get rid of this
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
                noPagingDefaultPagingHandler,
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
        .prop('xStoreMode', S.string().deprecated()) // todo: get rid of this
        .prop('xxAuthenticationHandlerConfig', S.object().deprecated()) // todo: get rid of this
        .prop('xxPagingHandlerConfig', S.object().deprecated()) // todo: get rid of this
        .prop('xxQueryUri', S.string().deprecated()) // todo: get rid of this
        .prop('xyzaa', S.string().deprecated()) // todo: get rid of this

    return schema
}

///////////////////////////////////////////////////////////////////////////////
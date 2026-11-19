///////////////////////////////////////////////////////////////////// import //

import S from 'fluent-json-schema'

//////////////////////////////////////////////////// allow unused properties //

const ALLOW_UNUSED_PROPERTIES = false

///////////////////////////////////////////////////////// basicAuthenticator //

export const basicAuthenticator = S.object()
.additionalProperties(ALLOW_UNUSED_PROPERTIES)
.id('#BasicAuthenticator')
.title('Basic Auth')
.prop('Type',
    S.string()
    .const('Integrations.Interface.RestAPI.AuthenticationHandlers.BasicAuthenticator')
    .default('Integrations.Interface.RestAPI.AuthenticationHandlers.BasicAuthenticator')
    .required()
)
.prop('Parameters',
    S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .required()
    .prop('username', S.string().required())
    .prop('password', S.string().required())
)

//////////////////////////////////////////////////////// noAuthAuthenticator //

export const noAuthAuthenticator = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#NoAuthAuthenticator')
    .title("No Auth")
    .prop('Type',
        S.string()
            .const('Integrations.Interface.RestAPI.AuthenticationHandlers.NoAuthAuthenticator')
            .default('Integrations.Interface.RestAPI.AuthenticationHandlers.NoAuthAuthenticator')
            .required()
    )

/////////////////////////////////////// oauth2ClientCredentialsAuthenticator //

export const oauth2ClientCredentialsAuthenticator = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#OAUTH2ClientCredentialsAuthenticator')
    .title('OAuth 2 Client')
    .prop('Type',
        S.string()
            .const('Integrations.Interface.RestAPI.AuthenticationHandlers.OAUTH2ClientCredentialsAuthenticator')
            .default('Integrations.Interface.RestAPI.AuthenticationHandlers.OAUTH2ClientCredentialsAuthenticator')
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

///////////////////////////////////////////////////////////////////////////////
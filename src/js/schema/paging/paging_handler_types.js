///////////////////////////////////////////////////////////////////// import //

import S from 'fluent-json-schema'

//////////////////////////////////////////////////// allow unused properties //

const ALLOW_UNUSED_PROPERTIES = false

///////////////////////////////////////////// cursorContentJsonPagingHandler //
export const cursorContentJsonPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#CursorContent.JsonPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('Type',
        S.string()
            .const('CursorContent.JsonPagingHandler')
            .default('CursorContent.JsonPagingHandler')
            .required()
    )
    .prop('CursorValuePath', S.string().required())
    .prop('NextCursorValuePath', S.string().required())

////////////////////////////////////////////// cursorUrlDBQueuePagingHandler //

export const cursorUrlDBQueuePagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#CursorUrl.DBQueuePagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('Type',
        S.string()
            .const('CursorUrl.DBQueuePagingHandler')
            .default('CursorUrl.DBQueuePagingHandler')
            .required()
    )
    .prop('ViewName', S.string().required())
    .prop('ColumnName', S.string().required())
    .prop('PostStoredProc', S.string())

///////////////////////////////////////////// cursorUrlNextLinkPagingHandler //

export const cursorUrlNextLinkPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#CursorUrl.NextLinkPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('Type',
        S.string()
            .const('CursorUrl.NextLinkPagingHandler')
            .default('CursorUrl.NextLinkPagingHandler')
            .required()
    )
    .prop('NextLinkPath', S.string().required())

/////////////////////////////////////////// incrementUrlDefaultPagingHandler //

export const incrementUrlDefaultPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#IncrementUrl.DefaultPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('TargetVariable', S.string().required())
    .prop('Type', S.string()
        .const('IncrementUrl.DefaultPagingHandler')
        .default('IncrementUrl.DefaultPagingHandler')
        .required()
    )
    .prop('ValueIncrement', S.integer())
    .prop('ValueInitial', S.integer())

/////////////////////////////////////////////// noPagingDefaultPagingHandler //

export const noPagingDefaultPagingHandler = S.object()
    .additionalProperties(ALLOW_UNUSED_PROPERTIES)
    .id('#NoPaging.DefaultPagingHandler')
    .prop('OldType', S.string()) // todo: get rid of this
    .prop('Type',
        S.string()
            .const('NoPaging.DefaultPagingHandler')
            .default('NoPaging.DefaultPagingHandler')
            .required()
    )

///////////////////////////////////////////////////////////////////////////////
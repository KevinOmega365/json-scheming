select
    StepRef = T.PrimKey,
    EndPointRef = E.PrimKey,
    T.StepType,
    QuerySystem = E.System,
    QueryName = E.Name,
    T.StepConfig,
    E.EndpointConfig
from
    dbo.atbl_Integrations_ScheduledTasksConfigGroups G with (nolock)
    join dbo.atbl_Integrations_ScheduledTasksConfigGroupTasks T with (nolock)
        on T.GroupRef = G.PrimKey
    left join dbo.atbl_Integrations_Setup_Endpoints E with (nolock)
        on json_value(T.StepConfig, '$.QueryName') = E.Name
        and json_value(T.StepConfig, '$.QuerySystem') = E.System
where
    G.Inactive = 0
    and T.Inactive = 0

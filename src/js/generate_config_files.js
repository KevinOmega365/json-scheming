
///////////////////////////////////////////////////////////////////////////////

import { mkdirSync, rmSync, writeFileSync } from 'fs'
import sanitize from 'sanitize-filename'

///////////////////////////////////////////////////////////////////////////////

export function readyEmptyFolder(folderPath) {
    rmSync(folderPath, { recursive: true, force: true })
    mkdirSync(folderPath, { recursive: true })
}

export function writeConfigFiles(folderPath, data) {
    data.forEach(({
        System,
        Name,
        EndpointConfig
    }) => {
        const filename = sanitize(`${System}-${Name}`)
        writeFileSync(
            `${folderPath}${filename}.json`,
            JSON.stringify(EndpointConfig, null, 4)
        )
    });
}

///////////////////////////////////////////////////////////////////////////////

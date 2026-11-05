import fs from 'fs'

const inputPath = '../../data/input/endpoint_configs.json'
const outputPath = '../../data/work/endpoint_configs.json'

const data_fields =
    JSON.parse(fs.readFileSync(inputPath))

const fields = data_fields.fields.map(f => f.name)

const zipped = data_fields.data.map(row => {
    const entries = row.map((d, i) => [
        fields[i],
        d
    ])
    return Object.fromEntries(entries)
})

fs.writeFileSync(outputPath, JSON.stringify(zipped, null, 4))
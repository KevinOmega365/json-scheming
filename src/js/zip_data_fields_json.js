export const zip_data_fields = (data_fields) => {
    
    const fields = data_fields.fields.map(f => f.name)

    const zipped = data_fields.data.map(row => {
        const entries = row.map((d, i) => [
            fields[i],
            d
        ])
        return Object.fromEntries(entries)
    })
    
    return zipped
}
const createSlug = (name: string): string => {
    if (name) {
        const parsedName = name.replace(/\s/g, '').toLowerCase()
        return parsedName
    } else return ''
}

export default createSlug

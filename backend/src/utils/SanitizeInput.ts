interface TypeObj {
    [key: string]: any
}

export const sanitizeInput = (obj: TypeObj) => {
    let flag = false, errors = ''
    Object.keys(obj).forEach((input: string) => {
        const _value = (obj[input] || "").trim()
        if (!Boolean(_value)) {
            flag = true
            errors += `Field '${input}' cannot be empty. `
        }
        obj[input] = _value
    })
    if (flag) {
        throw errors.trim()
    }
    return obj
}

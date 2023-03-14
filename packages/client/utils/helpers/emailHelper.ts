const EMAIL_REGEXP =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export function isEmailValid(input: string | null): boolean {
    if (!input) return false
    return input.match(EMAIL_REGEXP) !== null
}

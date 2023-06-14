const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/
export function isEmailValid(input: string | null): boolean {
    if (!input) return false
    return input.match(EMAIL_REGEXP) !== null
}

const DOMAIN_REGEXP =
    /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})(\.[a-z]{2,})?$/

export function isEmailDomainValid(input: string | null): boolean {
    if (!input) return false
    return input.match(DOMAIN_REGEXP) !== null
}

const PASSWORD_REGEXP =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

export function isPasswordValid(input: string | null): boolean {
    if (!input) return false
    return input.match(PASSWORD_REGEXP) !== null
}

export function getPasswordRuleLabel(): string {
    return "Password must be at least {nbChars} characters, with at least one upper case English letter, one lower case English letter, one number and one special character"
}

export enum SlashRule {
    SLASH_OPTIONAL = 'SLASH_OPTIONAL',
    SLASH_REQUIRED = 'SLASH_REQUIRED',
    SLASH_MUST_NOT_BE_PRESENT = 'SLASH_MUST_NOT_BE_PRESENT',
}

export enum ValidationError {
    TOO_SHORT = 'TOO_SHORT',
    TOO_LONG = 'TOO_LONG',
    SLASH_REQUIRED = 'SLASH_REQUIRED',
    SLASH_MUST_NOT_BE_PRESENT = 'SLASH_MUST_NOT_BE_PRESENT',
    INVALID_SLASH_POSITION = 'INVALID_SLASH_POSITION',
    NOT_A_NUMBER = 'NOT_A_NUMBER',
    INVALID_MONTH = 'INVALID_MONTH',
    INVALID_DAY = 'INVALID_DAY',
    INVALID_YEAR_9_CHARS = 'INVALID_YEAR_9_CHARS',
    INVALID_YEAR_10_CHARS = 'INVALID_YEAR_10_CHARS',
    MOD_11_CHECK_FAIL = 'MOD_11_CHECK_FAIL',
}

export const getValidationError = (
    value: string,
    slashRule: SlashRule = SlashRule.SLASH_OPTIONAL,
): ValidationError | undefined => {
    //remove slash for convenience
    const valueWithoutSlashes = value.replace('/', '') || ''

    //forced slash
    if (slashRule === SlashRule.SLASH_REQUIRED && !value.includes('/')) {
        return ValidationError.SLASH_REQUIRED
    }

    //forced slash
    if (slashRule === SlashRule.SLASH_MUST_NOT_BE_PRESENT && value.includes('/')) {
        return ValidationError.SLASH_MUST_NOT_BE_PRESENT
    }

    if (value.includes('/') && value[6] !== '/') {
        //slash must be at position 7
        return ValidationError.INVALID_SLASH_POSITION
    }

    //must be a number
    if (!valueWithoutSlashes.match(/[0-9]+/)) {
        return ValidationError.NOT_A_NUMBER
    }

    //min length
    if (value.length < 9) {
        return ValidationError.TOO_SHORT
    }

    //max length
    if (value.length > 11) {
        return ValidationError.TOO_LONG
    }

    //valid month
    const month = Number(valueWithoutSlashes.substring(2, 4))
    const validMaleMonth = month >= 1 && month <= 12
    const validFemaleMonth = month >= 51 && month <= 62
    if (!validMaleMonth && !validFemaleMonth) {
        return ValidationError.INVALID_MONTH
    }

    //valid day
    const day = Number(valueWithoutSlashes.substring(4, 6))
    if (day < 1 || day > 31) {
        return ValidationError.INVALID_DAY
    }

    //valid year for 9 char value
    if (valueWithoutSlashes.length === 9) {
        const year = Number(valueWithoutSlashes.substring(0, 2))
        if (year > 53) {
            return ValidationError.INVALID_YEAR_9_CHARS
        }
    }

    //valid year for 10 char value
    if (valueWithoutSlashes.length === 10) {
        const moduloResult = Number(valueWithoutSlashes) % 11
        if (moduloResult !== 0) {
            const year = Number(valueWithoutSlashes.substring(0, 2))
            if (year < 54 || year > 85) {
                return ValidationError.INVALID_YEAR_10_CHARS
            } else {
                const lastDigitIsZero = valueWithoutSlashes[valueWithoutSlashes.length - 1] === '0'
                // first 9 digits substring modulo 11 check
                const first9DigitsModuloResult = Number(valueWithoutSlashes.substring(0, 9)) % 11
                if (!lastDigitIsZero || first9DigitsModuloResult !== 10) {
                    return ValidationError.MOD_11_CHECK_FAIL
                }
            }
        }
    }
}

export const isValid = (value: string, slashRule: SlashRule = SlashRule.SLASH_OPTIONAL): boolean => {
    return getValidationError(value, slashRule) === undefined
}

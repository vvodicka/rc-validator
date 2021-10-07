import {getValidationError, isValid, SlashRule, ValidationError} from './validator'

test("getValidationError '7008038752' must return undefiend", () => {
    expect(getValidationError('7008038752')).toBe(undefined)
})

test("getValidationError '340616681' must return undefiend", () => {
    expect(getValidationError('340616681')).toBe(undefined)
})

test("getValidationError '700803/8752' must return undefiend", () => {
    expect(getValidationError('700803/8752')).toBe(undefined)
})

test("getValidationError '340616/681' must return undefiend", () => {
    expect(getValidationError('340616/681')).toBe(undefined)
})

test("getValidationError '70080387521233345' must return TOO_LONG", () => {
    expect(getValidationError('70080387521233345')).toBe(ValidationError.TOO_LONG)
})

test("getValidationError '7008038' must return TOO_SHORT", () => {
    expect(getValidationError('7008038')).toBe(ValidationError.TOO_SHORT)
})

test("getValidationError 'a' must return NOT_A_NUMBER", () => {
    expect(getValidationError('a')).toBe(ValidationError.NOT_A_NUMBER)
})

test("getValidationError '7008038751' must return MOD_11_CHECK_FAIL", () => {
    expect(getValidationError('7008038751')).toBe(ValidationError.MOD_11_CHECK_FAIL)
})

test("getValidationError '7008038/752' must return INVALID_SLASH_POSITION", () => {
    expect(getValidationError('7008038/752')).toBe(ValidationError.INVALID_SLASH_POSITION)
})

test("getValidationError '7008038752' must return SLASH_REQUIRED", () => {
    expect(getValidationError('7008038752', SlashRule.REQUIRED)).toBe(ValidationError.SLASH_REQUIRED)
})

test("getValidationError '700803/8752' must return SLASH_MUST_NOT_BE_PRESENT", () => {
    expect(getValidationError('700803/8752', SlashRule.MUST_NOT_BE_PRESENT)).toBe(
        ValidationError.SLASH_MUST_NOT_BE_PRESENT,
    )
})

test("getValidationError '5308038752' must return INVALID_YEAR_10_CHARS", () => {
    expect(getValidationError('5308038752')).toBe(ValidationError.INVALID_YEAR_10_CHARS)
})

test("getValidationError '8608038752' must return INVALID_YEAR_10_CHARS", () => {
    expect(getValidationError('8608038752')).toBe(ValidationError.INVALID_YEAR_10_CHARS)
})

test("getValidationError '540616681' must return INVALID_YEAR_9_CHARS", () => {
    expect(getValidationError('540616681')).toBe(ValidationError.INVALID_YEAR_9_CHARS)
})

test("getValidationError '7032038752' must return INVALID_MONTH", () => {
    expect(getValidationError('7032038752')).toBe(ValidationError.INVALID_MONTH)
})

test("getValidationError '7008328752' must return INVALID_DAY", () => {
    expect(getValidationError('7008328752')).toBe(ValidationError.INVALID_DAY)
})

test("isValid '7008328752' must return false", () => {
    expect(isValid('7008328752')).toBe(false)
})

test("isValid '7008038752' must return false", () => {
    expect(isValid('7008038752')).toBe(true)
})

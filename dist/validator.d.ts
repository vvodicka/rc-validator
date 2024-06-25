export declare enum SlashRule {
    SLASH_OPTIONAL = "SLASH_OPTIONAL",
    SLASH_REQUIRED = "SLASH_REQUIRED",
    SLASH_MUST_NOT_BE_PRESENT = "SLASH_MUST_NOT_BE_PRESENT"
}
export declare enum ValidationError {
    TOO_SHORT = "TOO_SHORT",
    TOO_LONG = "TOO_LONG",
    SLASH_REQUIRED = "SLASH_REQUIRED",
    SLASH_MUST_NOT_BE_PRESENT = "SLASH_MUST_NOT_BE_PRESENT",
    INVALID_SLASH_POSITION = "INVALID_SLASH_POSITION",
    NOT_A_NUMBER = "NOT_A_NUMBER",
    INVALID_MONTH = "INVALID_MONTH",
    INVALID_DAY = "INVALID_DAY",
    INVALID_YEAR_9_CHARS = "INVALID_YEAR_9_CHARS",
    INVALID_YEAR_10_CHARS = "INVALID_YEAR_10_CHARS",
    MOD_11_CHECK_FAIL = "MOD_11_CHECK_FAIL"
}
export declare const getValidationError: (value: string, slashRule?: SlashRule) => ValidationError | undefined;
export declare const isValid: (value: string, slashRule?: SlashRule) => boolean;

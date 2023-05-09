# Simple JavaScript validator of Slovak birth numbers (a.k.a. personal numbers)

This library contains a validation methods for slovak birth numbers. It checks following properties:

-   correct position of '/' character
-   illegal characters
-   length
    -   9 chars for year prior 1953 included
    -   10 chars for year after 1953 excluded
-   valid month
-   valid day
-   mod 11 check

## Installation

`npm i rc-validator` or `yarn add rc-validator`

## Usage

```
import {getValidationError, isValid} from 'rc-validator'

const birthNumber = '700803/8752'

const result = getValidationError(birthNumber)
const valid = isValid(birthNumber)
const slashPresentError = getValidationError(birthNumber, 'SLASH_MUST_NOT_BE_PRESENT')

// result === undefined
// valid === true
// slashPresentError === 'SLASH_MUST_NOT_BE_PRESENT'
```

## Methods

`isValid(value: string, slashRule: SlashRule = SlashRule.OPTIONAL): boolean`

-   `value` - input value
-   `slashRule` - flag declaring how to handle '/' char
-   returns `true` when input value is valid, otherwise `false`

`getValidationError(value: string, slashRule: SlashRule = SlashRule.OPTIONAL): ValidationError | undefined`

-   `value` - input value
-   `slashRule` - flag declaring how to handle '/' char
-   returns `undefined` when input value is valid, otherwise `ValidationError` enum value

### SlashRule

| Value                         | Description                                    | Note    |
|-------------------------------|------------------------------------------------|---------|
| **SLASH_OPTIONAL**            | It accepts input with or without slash         | Default |
| **SLASH_REQUIRED**            | Slash is required                              |
| **SLASH_MUST_NOT_BE_PRESENT** | Slash is prohibited, only numbers are accepted |

### ValidationError

| Value                         | Description                                                                                   | Note                                                                                                |
|-------------------------------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **TOO_SHORT**                 | Input is shorter than 9                                                                       |                                                                                                     |
| **TOO_LONG**                  | Input is longer than 11                                                                       |
| **SLASH_REQUIRED**            | SlashRule === REQUIRED, but '/' is not present in input                                       |
| **SLASH_MUST_NOT_BE_PRESENT** | SlashRule === MUST_NOT_BE_PRESENT, but '/' is present in input                                |
| **INVALID_SLASH_POSITION**    | Slash char index is not 6                                                                     |
| **NOT_A_NUMBER**              | Input contains illegal characters                                                             |
| **INVALID_MONTH**             | Month part is not 1...12                                                                      |
| **INVALID_DAY**               | Day part is not 1...31                                                                        | Months with 28 or 30 days are not validated by this rule, because mod 11 rule takes care about that |
| **INVALID_YEAR_9_CHARS**      | Input is 9 char long (excluding slash), but year part is > 53                                 |
| **INVALID_YEAR_10_CHARS**     | Input is 10 char long (excluding slash), mod 11 rule not fulfilled and year < 54 or year > 85 |
| **MOD_11_CHECK_FAIL**         | Mod 11 rule not fulfilled                                                                     |

## How to run example

```
cd ./example
yarn
yarn start
```

// Checks if input is numeric, if not throws an error
export function isNumeric(parameter: string, input: any) {
    if (isNaN(Number(input))) {
        throw new Error(`${parameter} must be a number`);
    }
}

// Checks if an input is numeric and is in a range, if not throws an error
export function inRange(parameter: string, input: any, min: number, max: number) {
    isNumeric(parameter, input);
    const inputVal = parseInt(input, 10);
    if (inputVal > max || inputVal < min) {
        throw new Error(`${parameter} must be a between ${min} and ${max}`);
    }
}

export default { isNumeric, inRange }
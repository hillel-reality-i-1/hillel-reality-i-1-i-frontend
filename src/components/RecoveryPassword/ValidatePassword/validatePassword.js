const validatePassword = (value) => {
    const errors = [];

    if (value.length < 8) {
        errors.push('mustBeAtLeast8Numbers');
    }

    if (!/[0-9!@#$%^&*()_+={}[\]:;<>,±"'|.?~\\/-]/.test(value)) {
        errors.push('mustHaveAtLeastOneSymbolOrNumber');
    }

    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
        errors.push('mustHaveUpperAndLowerCases');
    }

    return errors;
};

export default validatePassword
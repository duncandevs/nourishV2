type ValidateResponse = {
    isValid: boolean;
    error: string;
}

export const validateEmail = (email: string): ValidateResponse => {
    // Regular expression pattern for a valid email
    // It checks that:
    // - There are characters before the @ symbol.
    // - There are characters after the @ and before the dot.
    // - There are characters after the dot.
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailPattern.test(email)){
        return {isValid: false, error: 'Please enter a valid email'}
    }
    return { isValid: true, error: '' }
};

export const validatePasswordWithConfirmation = (password: string, passwordConfirmation: string): ValidateResponse => {
    // Check if password and confirmation match
    if (password !== passwordConfirmation) {
        return { isValid: false, error: 'Passwords do not match' };
    }

    // At least 8 characters long
    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters long' };
    }

    return { isValid: true, error: '' };
};

export const validatePassword = (password: string): ValidateResponse => {
    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters long' };
    }
    return { isValid: true, error: ''}
};

export const validateName = (name: string) => {
    if(!name || name.length < 3) {
        return {isValid:false, error: 'Name must be at least 3 characters long'}
    };
    return {isValid: true, error: ''}
}
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../translations/i18n';

export const useValidation = () => {
	const { t } = useTranslation();
	const [validWarnings, setValidWarnings] = useState([]);
	const [password, setPassword] = useState('');

	// validate EMAIL==========================//

	const validateEmail = (value) => {
		let error;

		if (!value) {
			error = t('textSignUp.error.required');
		} else {
			const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
			const maxLength = 50;

			if (!emailRegex.test(value) || !value.length > maxLength) {
				error = t('textSignUp.error.email');
			}
		}

		return error;
	};

	// validate Password==========================//

	const validatePasswordLength = (value) => {
		if (value.length < 8 || value.length > 16) {
			return t('textSignUp.error.length');
		}
		return null;
	};

	const validatePasswordSymbol = (value) => {
		if (!/[0-9]/.test(value) || !/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value)) {
			return t('textSignUp.error.symbolNumber');
		}
		return null;
	};

	const validatePasswordCase = (value) => {
		if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
			return t('textSignUp.error.register');
		}
		return null;
	};

	const validatePassword = (value) => {
		setPassword(value);
		let messages = [];

		// Validate password length
		const lengthError = validatePasswordLength(value);
		if (lengthError) {
			messages.push({ message: lengthError, isWarning: false });
		} else {
			messages.push({ message: t('textSignUp.error.length'), isWarning: true });
		}

		// Validate password symbols
		const symbolError = validatePasswordSymbol(value);
		if (symbolError) {
			messages.push({ message: symbolError, isWarning: false });
		} else {
			messages.push({ message: t('textSignUp.error.symbolNumber'), isWarning: true });
		}

		// Validate password case
		const caseError = validatePasswordCase(value);
		if (caseError) {
			messages.push({ message: caseError, isWarning: false });
		} else {
			messages.push({ message: t('textSignUp.error.register'), isWarning: true });
		}

		// Update the validWarnings state with the array of messages
		setValidWarnings(messages);

		const errors = messages
			.filter((msg) => !msg.isWarning && msg.message !== null)
			.map((msg) => msg.message);

		// Return null when there are no errors
		return errors.length === 0 ? null : errors;
	};

	// validate validateConfirmPassword==========================//

	const validateConfirmPassword = (value) => {
		let error;
		if (!value) {
			error = t('textSignUp.error.required');
		} else if (value !== password) {
			error = t('textSignUp.error.coincidence');
		}
		return error;
	};

	// validate validateCheckBox==========================//

	const validateCheckBox = (checked) => {
		let error;
		if (!checked) {
			error = t('textSignUp.error.required');
		}
		return error;
	};

	// validate validateInputRequired==========================//

	const validateInputRequired = (value) => {
		let error;
		if (!value) {
			error = 'Required';
		}
		return error;
	};

	// validate validateFirstName==========================//

	const validateFirstName = (value) => {
		let error;
		if (!value) {
			error = t('textSignUp.error.required');
		}

		if (value.length < 2 || value.length > 20) {
			error = t('textSignUp.error.lengthName');
		} else if (!/^[а-яА-Яa-zA-Z'-]+$/u.test(value)) {
			error = t('textSignUp.error.otherValidName');
		}

		return error;
	};

	return {
		validateEmail,
		validateConfirmPassword,
		validatePassword,
		validWarnings,
		setValidWarnings,
		validateCheckBox,
		validateInputRequired,
		validateFirstName,
	};
};



export const validateSignInForm = (values) => {

	const errors = {};
  
	if (!values.email) {
	  errors.email = 'Обов\'язкове поле';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
	  errors.email = 'Введіть дійсну пошту (email@example.com) ';
	}
  
	if (!values.password) {
	  errors.password = 'Обов\'язкове поле';
	} else if (values.password.length < 3) {
	  errors.password = 'Пароль повинен містити не менше 8 символів.';
	}
  
	return errors;
};
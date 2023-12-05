const EmailValidator = async (values, setActiveButton, setEmailValue) => {
    const errors = {};
    const authToken = localStorage.getItem('authTokenUHelp');

    try {
        const usersResponse = await fetch('http://127.0.0.1:8000/api/v1/users/user_list/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`,
            },
        });

        if (!usersResponse.ok) {
            throw new Error(`Failed to fetch user data. Status: ${usersResponse.status}`);
        }

        const usersData = await usersResponse.json();
        const userWithEmail = usersData.find(user => user.email === values.email);

        if (!userWithEmail) {
            errors.email = 'Email not found';
            setActiveButton(false);
        } else {
            setActiveButton(true);
            setEmailValue(values);
        }
    } catch (error) {
       
        console.error('Error during email validation:', error.message);

       
        errors.email = 'Error during email validation';
        setActiveButton(false);
    }

    return errors;
};

export default EmailValidator;

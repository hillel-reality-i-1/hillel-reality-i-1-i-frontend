const emailValidationServer = async (values, setActiveButton, setEmailValue) => {
    const errors = {};

    /// ВХОД(Здесь временно, для того, чтобы получить список юзеров)

    fetch('http://51.20.204.164/api/v1/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'admin@gmail.com',
            password: 'admin'
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('authTokenUHelp', data.key);
        })

    ///

    try {
        const usersResponse = await fetch('http://51.20.204.164/api/v1/users/user_list/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authTokenUHelp')}`,
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

export default emailValidationServer;

export default async function submitPasswordReset(values) {
    try {
        const response = await fetch('http://51.20.204.164/api/v1/auth/password/reset/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.detail);
    } catch (error) {
        console.error(error.message);
    }
}

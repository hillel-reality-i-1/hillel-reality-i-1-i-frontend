import { useGoogleLogin } from '@react-oauth/google';

export default function GoogleSignIn() {

    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

    return (
        <>
            <div onClick={() => login()}> Продовжити через Google </div>
        </>
    )
}

import { useGoogleLogin } from '@react-oauth/google';

export default function GoogleSignIn({changeGoogleAuthToken}) {

    const login = useGoogleLogin({
        onSuccess: tokenResponse => changeGoogleAuthToken(tokenResponse.access_token),
    });

    return (
        <>
            <div onClick={() => login()}> Продовжити через Google </div>
        </>
    )
}

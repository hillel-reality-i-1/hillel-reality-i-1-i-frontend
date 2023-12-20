import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAuthToken, clearAuthToken } from "../../store/slices/signInSlice";
import SignIn from "../SignIn/SignIn";
import AccountHeader from "../accountHeader/AccountHeader";
import CustomModal from "../modals/CustomModal";
import SignUp from "../Registration/SignUp/SignUp";

export default function AuthenticationWrapper() {
  const authToken = useSelector((state) => state.signIn.authTokenUHelp);
  const googleAuth = useSelector((state) => state.signIn.googleAuthTokenUHelp);

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const toggleSignInModal = () => {
    setSignInModalOpen(!signInModalOpen);
  };

  const toggleSignUpModal = () => {
    setSignUpModalOpen(!signUpModalOpen);
  };
  return (
    <div style={{ display: "flex" }}>
      {authToken || googleAuth ? (
        <AccountHeader />
      ) : (
          <div>
            <SignIn
              signInModalOpen={signInModalOpen}
              toggleSignInModal={toggleSignInModal}
              toggleSignUpModal={toggleSignUpModal}
            />
            <SignUp
              signUpModalOpen={signUpModalOpen}
              toggleSignUpModal={toggleSignUpModal}
              toggleSignInModal={toggleSignInModal}
            />
          </div>
      )}
    </div>
  );
}

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAuthToken, clearAuthToken } from "../../store/slices/signInSlice";
import SignIn from "../SignIn/SignIn";
import AccountHeader from "../accountHeader/AccountHeader";
import CustomModal from "../modals/CustomModal";

export default function AuthenticationWrapper() {

  const authToken = useSelector((state) => state.signIn.authTokenUHelp);
  const googleAuth = useSelector((state) => state.signIn.googleAuthTokenUHelp);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  //   console.log("Open");
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

return (
    <div style={{ display: 'flex'  }} >
      {authToken || googleAuth ? <AccountHeader /> : <SignIn />}

    </div>
  );
}

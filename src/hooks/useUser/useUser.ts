import { useAppDispatch } from "../../store/hooks";
import { CustomTokenPayload, LoginResponse, UserCredentials } from "./types";
import decodeToken from "jwt-decode";
import { User } from "../../store/features/userSlice/types";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../../store/features/userSlice/userSlice";
import { showErrorToast } from "../../modals/modals";
import useToken from "../useToken/useToken";
import {
  setIsLoadingActionCreator,
  unsetIsLoadingActionCreator,
} from "../../store/features/uiSlice/uiSlice";
interface UseUserStructure {
  loginUser: (userCredentials: UserCredentials) => Promise<void>;
  logoutUser: () => void;
}

const useUser = (): UseUserStructure => {
  const dispatch = useAppDispatch();
  const { removeToken } = useToken();

  const apiUrl = process.env.REACT_APP_URL_API;
  const usersEndpoint = "/users";
  const loginEndpoint = "/login";

  const loginUser = async (userCredentials: UserCredentials) => {
    try {
      dispatch(setIsLoadingActionCreator());

      const response = await fetch(
        `${apiUrl}${usersEndpoint}${loginEndpoint}`,
        {
          method: "POST",
          body: JSON.stringify(userCredentials),
          headers: { "Content-type": "application/json" },
        }
      );

      const { token } = (await response.json()) as LoginResponse;

      const tokenPayload: CustomTokenPayload = decodeToken(token);

      const { id, username } = tokenPayload;

      const userLogin: User = {
        username,
        token,
        id,
      };

      dispatch(unsetIsLoadingActionCreator());
      dispatch(loginUserActionCreator(userLogin));

      localStorage.setItem("token", token);
    } catch {
      showErrorToast("Wrong credentials");
    }
  };

  const logoutUser = () => {
    removeToken();
    dispatch(logoutUserActionCreator());
  };

  return { loginUser, logoutUser };
};

export default useUser;

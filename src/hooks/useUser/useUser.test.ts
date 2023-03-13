import { renderHook } from "@testing-library/react";
import Wrapper from "../../testUtils/Wrapper";
import { store } from "../../store/store";
import { CustomTokenPayload, UserCredentials } from "./types";
import useUser from "./useUser";
import decodeToken from "jwt-decode";
import { User } from "../../store/features/userSlice/types";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../../store/features/userSlice/userSlice";

jest.mock("jwt-decode", () => jest.fn());

const spy = jest.spyOn(store, "dispatch");

beforeAll(() => {
  jest.clearAllMocks();
});

const userCredentials: UserCredentials = {
  username: "Jairo",
  password: "Jairo1020!",
};

const mockTokenPayload: CustomTokenPayload = {
  username: "Jairo",
  id: "12345678",
};

const mockToken = "jairo1020!";

const mockLoginUser: User = {
  username: mockTokenPayload.username,
  id: mockTokenPayload.id,
  token: mockToken,
};

describe("Given a useUser custom hook", () => {
  describe("When the loginUser function is called", () => {
    test("Then it should call the dispatch", async () => {
      const {
        result: {
          current: { loginUser },
        },
      } = renderHook(() => useUser(), { wrapper: Wrapper });

      (decodeToken as jest.MockedFunction<typeof decodeToken>).mockReturnValue(
        mockTokenPayload
      );

      await loginUser(userCredentials);

      expect(spy).toHaveBeenCalledWith(loginUserActionCreator(mockLoginUser));
    });
  });

  describe("When the loginUser function is called and the credentials are incorrect", () => {
    test("Then it should call the showErrorToast function and show the message: 'Wrong credentials'", async () => {
      const {
        result: {
          current: { loginUser },
        },
      } = renderHook(() => useUser(), { wrapper: Wrapper });

      await loginUser(userCredentials);

      expect(spy).not.toHaveBeenCalledWith(
        loginUserActionCreator(mockLoginUser)
      );
    });
  });

  describe("When the logoutUser function is called", () => {
    test("Then it should call the dispatch", async () => {
      const {
        result: {
          current: { logoutUser },
        },
      } = renderHook(() => useUser(), { wrapper: Wrapper });

      (decodeToken as jest.MockedFunction<typeof decodeToken>).mockReturnValue(
        mockTokenPayload
      );

      await logoutUser();

      expect(spy).toHaveBeenCalledWith(logoutUserActionCreator());
    });
  });
});

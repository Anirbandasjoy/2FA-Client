import baseAuthApi from "@/redux/api/baseApi";
import {
  loginRequest,
  loginResponse,
  logOutResponse,
  registerRequest,
  registerResponse,
  resendVerficationCodeResponse,
  verfiyUserResponse,
  verifyUserRequest,
} from "./authTypes";

const authApi = baseAuthApi.injectEndpoints({
  endpoints: (builder) => ({
    handleRegister: builder.mutation<registerResponse, registerRequest>({
      query: (user) => ({
        url: "/user/registation",
        method: "POST",
        body: user,
      }),
    }),

    handleVerifyEmail: builder.mutation<verfiyUserResponse, verifyUserRequest>({
      query: ({ email, verificationCode }) => ({
        url: "/user/verify-user",
        method: "POST",
        body: { email, verificationCode },
      }),
    }),

    handleResendVerificationCode: builder.mutation<
      resendVerficationCodeResponse,
      string
    >({
      query: (email) => ({
        url: "/user/resend-verification-code",
        method: "POST",
        body: { email },
      }),
    }),
    handleLogin: builder.mutation<loginResponse, loginRequest>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),

    handleLogOut: builder.mutation<logOutResponse, void>({
      query: () => ({
        url: "/auth/logOut",
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleLoginMutation,
  useHandleLogOutMutation,
  useHandleRegisterMutation,
  useHandleVerifyEmailMutation,
  useHandleResendVerificationCodeMutation,
} = authApi;

export default authApi;

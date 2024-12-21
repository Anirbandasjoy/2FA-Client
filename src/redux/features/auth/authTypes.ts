// Registation Types

export interface registerRequest {
  name: string;
  email: string;
  password: string;
}

export interface registerResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// verfiyUser types

export interface verifyUserRequest {
  email: string;
  verificationCode: string;
}

export interface verfiyUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  payload: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

//  Resend Verification Code types

export interface resendVerficationCodeResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// login types
export interface loginRequest {
  email: string;
  password: string;
}

export interface loginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  payload: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

// logout types

export interface logOutResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

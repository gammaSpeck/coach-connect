export interface AuthState {
  userId: string | null;
  token: string | null;
  didAutoLogout: boolean;
}

export interface ValidAuth {
  userId: string;
  token: string;
  tokenExpiration: string;
}

export interface SignupParams {
  email: string;
  password: string;
}

export interface SignupResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface LoginResponse extends SignupResponse {
  registered: boolean;
}

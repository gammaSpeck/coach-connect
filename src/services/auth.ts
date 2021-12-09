import { LoginResponse, SignupParams, SignupResponse } from "@/interfaces";

const API_KEY = "AIzaSyD2EjuzaCdlM1bb1eZ4WVJ4DuYkynydddE";

const FIREBASE_AUTH_BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts` as const;

export const Auth = {
  /** Refer https://firebase.google.com/docs/reference/rest/auth#section-create-email-password */
  async signupUser(params: SignupParams): Promise<SignupResponse> {
    const res = await fetch(`${FIREBASE_AUTH_BASE_URL}:signUp?key=${API_KEY}`, {
      method: "POST",
      body: JSON.stringify({ ...params, returnSecureToken: true })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "Could not signup user. Check your Signup Data.");

    return data;
  },

  async loginUser(params: SignupParams): Promise<LoginResponse> {
    const res = await fetch(`${FIREBASE_AUTH_BASE_URL}:signInWithPassword?key=${API_KEY}`, {
      method: "POST",
      body: JSON.stringify({ ...params, returnSecureToken: true })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "Could not login user. Check your Login Data.");

    return data;
  }
};

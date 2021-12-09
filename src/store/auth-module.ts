import { AuthState, SignupParams, ValidAuth } from "@/interfaces";
import { Auth, LS } from "@/services";
import { store } from "@/store";
import { VuexModule, Module, getModule, Action, Mutation } from "vuex-module-decorators";

let TIMER: any;

@Module({ name: "auth", namespaced: true, dynamic: true, store })
export default class AuthModule extends VuexModule implements AuthState {
  userId: AuthState["userId"] = null;
  token: AuthState["token"] = null;

  didAutoLogout: AuthState["didAutoLogout"] = false;

  get isAuthenticated() {
    return !!this.token;
  }

  @Mutation
  private _setDidAutoLogout(val: boolean) {
    this.didAutoLogout = val;
  }

  @Mutation
  private _setUser(params: Omit<AuthState, "didAutoLogout">) {
    this.userId = params.userId;
    this.token = params.token;
  }

  @Action
  private storeAuth({ tokenExpiration, ...params }: ValidAuth) {
    const expIn = +tokenExpiration * 1000;
    // const expIn = 5_000; //* TEST VALUE
    const expDate = new Date().getTime() + expIn;

    LS.setToken(params.token);
    LS.setUserId(params.userId);
    LS.setExpDate(expDate);

    this.setupAutoLogout(expIn);

    this._setUser(params);
    this._setDidAutoLogout(false);
  }

  @Action
  private setupAutoLogout(delay: number) {
    TIMER = setTimeout(() => {
      this.autoLogout();
    }, delay);
  }

  @Action({ rawError: true })
  async signup(params: SignupParams) {
    const data = await Auth.signupUser(params);

    this.storeAuth({
      userId: data.localId,
      token: data.idToken,
      tokenExpiration: data.expiresIn
    });
  }

  @Action({ rawError: true })
  async login(params: SignupParams) {
    const data = await Auth.loginUser(params);

    this.storeAuth({
      userId: data.localId,
      token: data.idToken,
      tokenExpiration: data.expiresIn
    });
  }

  @Action
  logout() {
    this._setUser({ userId: null, token: null });
    LS.purge();
    clearTimeout(TIMER);
  }

  @Action
  tryAutoLogin() {
    const token = LS.getToken();
    const userId = LS.getUserId();
    const expDate = LS.getExpDate();

    if (!token || !userId || !expDate) return;

    const expIn = expDate - new Date().getTime();
    if (expIn < 0) return;

    this.setupAutoLogout(expIn);

    this._setUser({ userId, token });
  }

  @Action
  autoLogout() {
    this.logout();
    this._setDidAutoLogout(true);
  }
}

export const authModule = getModule(AuthModule);

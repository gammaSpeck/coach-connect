import { ContactCoachParams, IRequest, RequestsState } from "@/interfaces";
import { Api } from "@/services";
import { store } from "@/store";
import { VuexModule, Module, getModule, Mutation, Action } from "vuex-module-decorators";
import { authModule } from "./auth-module";

@Module({ name: "requests", namespaced: true, dynamic: true, store })
export default class RequestsModule extends VuexModule implements RequestsState {
  requests: RequestsState["requests"] = [];

  get userRequests() {
    return this.requests.filter((r) => r.coachId === authModule.userId);
  }

  get hasRequests() {
    return this.userRequests.length;
  }

  @Mutation
  private _addRequests(req: IRequest) {
    this.requests.push(req);
  }

  @Mutation
  private _setRequests(requests: IRequest[]) {
    this.requests = requests;
  }

  @Action({ rawError: true })
  async contactCoach({ email, ...rest }: ContactCoachParams) {
    const req = { userEmail: email, ...rest };
    const { name: id } = await Api.addNewContactRequest(req);
    this._addRequests({ ...req, id });
  }

  @Action({ rawError: true })
  async loadRequests() {
    const coachId = authModule.userId ?? "";
    const token = authModule.token ?? "";

    const requests = await Api.listAllContactRequests(coachId, token);
    this._setRequests(requests);
  }
}

export const requestsModule = getModule(RequestsModule);

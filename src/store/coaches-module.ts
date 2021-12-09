import { store } from "@/store";
import { VuexModule, Module, getModule, Mutation, Action } from "vuex-module-decorators";
import { Coach, CoachesState, NewCoachFormData } from "@/interfaces";

import { Api } from "@/services";
import { authModule } from "./auth-module";

@Module({ name: "coaches", namespaced: true, dynamic: true, store })
export default class CoachesModule extends VuexModule implements CoachesState {
  coaches: CoachesState["coaches"] = [];
  lastFetch: CoachesState["lastFetch"] = null;

  get hasCoaches() {
    return !!this.coaches.length;
  }

  get isCoach() {
    return this.coaches.some((c) => c.id === authModule.userId);
  }

  get shouldUpdate() {
    if (!this.lastFetch) return true;

    const currTimestamp = new Date().getTime();
    // Update if last fetch was more than a min ago
    return (currTimestamp - this.lastFetch) / 1000 > 60;
  }

  @Mutation
  private _setCoaches(coaches: Coach[]) {
    this.coaches = coaches;
  }

  @Mutation
  private _addCoach(coach: Coach) {
    this.coaches.push(coach);
  }

  @Mutation
  private _setFetchTimestamp() {
    this.lastFetch = new Date().getTime();
  }

  @Action
  async registerCoach(formData: NewCoachFormData) {
    const { rate, ...rest } = formData;
    const id = authModule.userId ?? "";
    const token = authModule.token ?? "";

    const newCoach: Coach = { ...rest, id, hourlyRate: rate };
    await Api.registerNewCoach(newCoach, token);

    this._addCoach(newCoach);
  }

  @Action({ rawError: true })
  async loadCoaches(forceRefresh = false) {
    if (!forceRefresh && !this.shouldUpdate) return;

    const coaches = await Api.listAllCoaches();
    this._setCoaches(coaches);

    this._setFetchTimestamp();
  }
}

export const coachesModule = getModule(CoachesModule);

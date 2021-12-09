import { RootState } from "@/interfaces";
import { store } from "@/store";
import { VuexModule, Module, getModule } from "vuex-module-decorators";

@Module({ name: "root", namespaced: true, dynamic: true, store })
export default class RootModule extends VuexModule implements RootState {
  userId: RootState["userId"] = "asd";
}

export const rootModule = getModule(RootModule);

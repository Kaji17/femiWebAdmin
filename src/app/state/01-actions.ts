import { createAction, props } from "@ngrx/store";

export const initAction = createAction("Init App");
export const loginAction = createAction("Login App", props<{user:any}>())
export const logoutAction = createAction("Logout App")
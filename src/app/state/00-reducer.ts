import { ActionReducer, createReducer, MetaReducer, on } from "@ngrx/store";
import { initAction, loginAction, logoutAction } from "./01-actions";

const initialState = {
  appName: "Admin Klaman",
  isAdmin: false,
  
};

function log(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const currenState = reducer(state, action);
    console.groupCollapsed(action.type)
    console.log("Etat precedent: ", state);
    console.log("Action: ", action);
    console.log("Etat suivant: ", currenState);
    console.groupEnd()
    return currenState;
  };
}

export const metaReducers: MetaReducer[] = [log];
export const rootReducer = createReducer(
  initialState,
  on(initAction, (state) => {
    return {
      ...state,
    };
  }),
  on(loginAction, (state, props) => {
    return {
        ...state,
        isAdmin: true,
        user: props.user
    };
  }),
  on(logoutAction, (state)=>{
    return  {
        ... state,
        isAdmin: false,
        user: {}
    }
  })
);

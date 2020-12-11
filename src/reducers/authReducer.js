import { types } from "../types/types";

/*
{
    uid: 12415454545445,
    name: 'Juan Carlos'
}

*/

//Reducer para Autenticación
export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:

            return {

                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:

            return { }

        default:
            return state;
    }

}
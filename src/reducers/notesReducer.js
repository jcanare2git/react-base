import { types } from "../types/types";

/*
    {
        notes: [],
        active: null,
        active: {
            id: '124545dfgffgh5j4hgjhg',
            title: '',
            body: '',
            imageUrl: '',
            date: 12454544
        }
    }
*/

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload,

                }
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
        
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map( 
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                 )
            }
        
        default:
            return state;
    }

}
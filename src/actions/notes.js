import Swal from 'sweetalert2';

import { db } from "../firebase/firebaseConfig";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from '../types/types';


export const startNewNote = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        console.log(uid);

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        console.log(doc);

        dispatch(activeNote(doc.id, newNote))

    }
}

export const activeNote = (id, note) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({

    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {

    return async(dispatch, getState) =>{

        const { uid } = getState().auth;
        
        if( !note.url){
            delete note.url;
        }
        
        const noteToFirestore = {...note };
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore);

        dispatch(refreshNote( note.id, noteToFirestore ));

        Swal.fire('Saved', noteToFirestore.title, 'success');

    }
}

export const refreshNote = (id, note) => ({

    type: types.notesUpdated,
    payload: {
        id,
        note: {
            ...note
        }
    }

})

//Subir Archivos a Cloudinary
export const startUploading = ( file ) => {

    return async( dispatch, getState ) => {

        const {active: activeNote } = getState().notes;

        const fileUrl = await fileUpload( file );

        console.log(fileUrl);

    }

}
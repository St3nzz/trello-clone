/* jshint esversion: 6 */

const Column = { 
    IdCounter: 4,

    ////////////////////////////
    //                        //
    // Function columnProcess //
    //                        //
    ////////////////////////////

    process(columnElement){
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

    spanAction_addNote.addEventListener('click', (event) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.setAttribute('data-note-id', Note.IdCounter);
        Note.IdCounter++;
        columnElement.querySelector('[data-notes]').append(noteElement);
        Note.process(noteElement);
        console.log(this);
        
        noteElement.setAttribute('contenteditable', 'true');
        noteElement.focus();
    });

    const hedaerElement = columnElement.querySelector('.column-header');
    hedaerElement.addEventListener('click', (event) => {
        hedaerElement.setAttribute('contenteditable', 'true');
        noteElement.focus();
    });
    hedaerElement.addEventListener('blur', (event) => {
        hedaerElement.removeAttribute('contenteditable');
    });
    columnElement.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    columnElement.addEventListener('drop', (event) => {
        if(Note.dragged){
            columnElement.querySelector('[data-notes]').append(Note.dragged);
        }
    });
    },
}
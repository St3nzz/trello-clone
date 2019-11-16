/*jshint esversion: 6 */

const Note = {
    IdCounter: 8,
    dragged: null,
    
    //////////////////////////
    //                      //
    // Function Note.process //
    //                      //
    //////////////////////////

    process(noteElement){
        noteElement.addEventListener('dblclick', (event) => {
            noteElement.removeAttribute('draggable');
            noteElement.closest('.column').removeAttribute('draggable');
            noteElement.setAttribute('contenteditable', 'true');
            noteElement.focus();
        });
        noteElement.addEventListener('blur', (event) => {
            noteElement.removeAttribute('contenteditable');
            noteElement.setAttribute('draggable', 'true');
            noteElement.closest('.column').setAttribute('draggable', 'true');
            if(!noteElement.textContent.length){
                noteElement.remove();
            }
        });
    
        noteElement.addEventListener('dragstart', Note.dragstart);
        noteElement.addEventListener('dragend', Note.dragend);
        noteElement.addEventListener('dragenter', Note.dragenter);
        noteElement.addEventListener('dragover', Note.dragover);
        noteElement.addEventListener('dragleave', Note.dragleave);
        noteElement.addEventListener('drop', Note.drop);
    },
    
    //////////////////////////
    //                      //
    //   Function drag...   //
    //                      //
    //////////////////////////

    dragstart (event){
        Note.dragged = this;
        this.classList.add('dragged');
        event.stopPropagation();
    },
    dragend (event){
        Note.dragged = null;
        this.classList.remove('dragged');
        
        document
            .querySelectorAll('.note')
            .forEach(x => x.classList.remove('under'));
    },
    dragenter (event){
        if(this == Note.dragged){
            return;
        }
        this.classList.add('under');
    },
    dragover (event){
        if(this == Note.dragged){
            return;
        }
        event.preventDefault();
    },
    dragleave (event){
        if(this == Note.dragged){
            return;
        }
        this.classList.remove('under');
    },
    drop (event){
        event.stopPropagation();
        if(this == Note.dragged){
            return;
        }
        
        if(this.parentElement === Note.dragged.parentElement){
            const note = Array.from(document.querySelectorAll('.note'));
            const indexA = note.indexOf(this);
            const indexB = note.indexOf(Note.dragged);
            if(indexA < indexB){        
                this.parentElement.insertBefore(Note.dragged, this);
            } else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
            }
        } else {
            this.parentElement.insertBefore(Note.dragged, this);
        }
    },
}
/* jshint esversion: 6 */

const Column = { 
    IdCounter: 4,
    dragged: null,

    ////////////////////////////
    //                        //
    // Function columnProcess //
    //                        //
    ////////////////////////////

    process(columnElement){
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

    spanAction_addNote.addEventListener('click', (event) => {
        const noteElement = Note.create();

        columnElement.querySelector('[data-notes]').append(noteElement);
        Note.process(noteElement);
        
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
        Application.save();
    });
    columnElement.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    columnElement.addEventListener('drop', (event) => {
        if(Note.dragged){
            columnElement.querySelector('[data-notes]').append(Note.dragged);
        }
    });

        columnElement.addEventListener('dragstart', Column.dragstart);
        columnElement.addEventListener('dragend', Column.dragend);
        columnElement.addEventListener('dragenter', Column.dragenter);
        columnElement.addEventListener('dragover', Column.dragover);
        columnElement.addEventListener('dragleave', Column.dragleave);
        columnElement.addEventListener('drop', Column.drop);
    },

    create(id = null){
        const columnElement = document.createElement('div');
        columnElement.classList.add('column');
        columnElement.setAttribute('draggble', 'true');
        if(id){
            columnElement.setAttribute('data-Column.Id', id);
        } else {
            columnElement.setAttribute('data-Column.Id', Column.IdCounter);
            Column.IdCounter++;
        }
        columnElement.innerHTML = '<p class="column-header">В плане</p><div data-notes></div><p class="column-footer"> <span data-action-addNote class="action">+ Добавить карточку</span></p>';
        Column.process(columnElement);
        return columnElement;
    },
    //////////////////////////
    //                      //
    //   Function drag...   //
    //                      //
    //////////////////////////

    dragstart (event){
        Column.dragged = this;
        this.classList.add('dragged');
        event.stopPropagation();
    },
    dragend (event){
        Column.dragged = null;
        this.classList.remove('dragged');
        
        document
            .querySelectorAll('.column')
            .forEach(x => x.classList.remove('under'));
        Application.save();    
    },
    dragenter (event){
        if(!Column.dragged || this == Column.dragged){
            return;
        }
        this.classList.add('under');
    },
    dragover (event){
        if(!Column.dragged || this == Column.dragged){
            return;
        }
        event.preventDefault();
    },
    dragleave (event){
        if(!Column.dragged || this == Column.dragged){
            return;
        }
        this.classList.remove('under');
    },
    drop (event){
        //event.stopPropagation();
        if(!Column.dragged || this == Column.dragged){
            return;
        } else if(Column.dragged){
            const column = Array.from(document.querySelectorAll('.column'));
            const indexA = column.indexOf(this);
            const indexB = column.indexOf(Column.dragged);
            if(indexA < indexB){        
                this.parentElement.insertBefore(Column.dragged, this);
            } else {
                this.parentElement.insertBefore(Column.dragged, this.nextElementSibling);
            }
        }
    },
}
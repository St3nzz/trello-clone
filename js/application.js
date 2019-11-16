/* jshint esversion: 6 */
const Application = {
    save(){
        const object = {
            columns: {
                idCounter: Column.IdCounter,
                items: []
            },
            notes: {
                idCounter: Note.IdCounter,
                items: []
            }
        };

        document
            .querySelectorAll('.column')
            .forEach(columnElement => {
            const column = {
                title: '',
                id: parseInt(columnElement.getAttribute('data-column-id')),
                noteIds: []
            };
            columnElement.querySelectorAll('.note').forEach(noteElement => {
                //console.log(parseInt(noteElement.getAttribute('data-note-id')));
                column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')));
            });

            object.columns.items.push(column);
        });

        document
            .querySelectorAll('.note')
            .forEach(noteElement => {
            const note = {
                id: parseInt(noteElement.getAttribute('data-column-id')),
                content: noteElement.textContent
            };

            object.notes.items.push(note);
        });

        //console.log(object.notes.items);

        const json = JSON.stringify(object);

        localStorage.setItem('trello', json);

    },
    load(){
        if(!localStorage.getItem('trello')){
            return;
        }   
        const mountePoint = document.querySelector('.columns');
        mountePoint.innerHTML = '';

        const object = JSON.parse(localStorage.getItem('trello'));

        for(const column of object.columns.items){
            const columnElement = Column.create(column.id);

            mountePoint.append(columnElement);

            for(const noteId of column.noteIds){
                const note = object.notes.items[noteId-8];

                //console.log(object.notes.items[(noteId-1)/8]);
                const noteElement = Note.create(note.id, note.content);
                columnElement.querySelector('[data-notes]').append(noteElement);
            }
        }
    },
}
/*jshint esversion: 6 */

document
    .querySelector('[data-action-addColumn]')
    .addEventListener('click', (event) => {
        const columnElement = Column.create();
        document.querySelector('.columns').append(columnElement);

        Application.save();
    });

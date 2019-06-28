'use strict'

const titleElement = document.querySelector('#note-title')
const bodyElememt = document.querySelector('#note-body')
const removeButton = document.querySelector("#remove-note")
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if(!note){
    location.assign('./index.html')
}

titleElement.value = note.title
bodyElememt.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)
titleElement.addEventListener('input', function(e){
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElememt.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeButton.addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('./index.html')
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
       notes =  JSON.parse(e.newValue)
       note = notes.find((note) => note.id === noteId)
    
    if(!note){
        location.assign('./index.html')
    }
    
    titleElement.value = note.title
    bodyElememt.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
    }
})
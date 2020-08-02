const fs = require('fs')
const chalk = require('chalk')

// Add Note Function
// Adds note only when no other note has same title
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        // no duplicate note
        // adding note object to array
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    }
    else{
        // duplicate note
        console.log(chalk.red.inverse("Note title already taken!"))
    }
   
}

// Removes a note by title
const removeNote = (title) => {
    const notes = loadNotes()
    const finalNotes = notes.filter((note) => note.title !== title)
    if(finalNotes.length === notes.length){
        // no notes found
        console.log(chalk.red.inverse("No such note!"))
    }
    else{
        // note found
        saveNotes(finalNotes)
        console.log(chalk.green.inverse(title + ": note removed"))
    }
}

// Lists all notes with title and body
const listNotes = () => {
    notes = loadNotes()
    console.log(chalk.bold.inverse("Your Notes"))
    notes.forEach((note, i) => {
        console.log((i+1) + '. ' + note.title + ': ' + note.body)
    })
}

// Prints note with a particular title
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title.toLowerCase() === title.toLowerCase())

    if(note){
       // Note with particular title present 
       console.log(chalk.bold.inverse(note.title))
       console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse("No such note!"))
    }
}

// Returns all present notes or empty array if no notes present
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json') // this requires notes.json to be present
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}

// Save notes array to notes.json
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
} 
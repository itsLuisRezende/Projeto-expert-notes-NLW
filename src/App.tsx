import { ChangeEvent, useState } from 'react'
import Logo from './assets/Logo.svg'
import { NewNoteCard } from './componentes/new-note-card'
import { NoteCard } from './componentes/note-card'

interface Note {
  id: string
  date: Date
  content: string
}

function App() {
const [search, setSearch] = useState('')
const [notes, setNotes] = useState<Note[]>(() => {
  const notesOnStorage = localStorage.getItem('notes')

  if (notesOnStorage) {
    return JSON.parse(notesOnStorage)
  }

  return []
})

function onNoteCreated(content: string) {
  const newNote = {
    id: crypto.randomUUID(),
    date: new Date(),
    content,
  }

  const notesArray = [newNote, ...notes]

  setNotes(notesArray)

  localStorage.setItem('notes', JSON.stringify(notesArray))
}

function onNoteDeleted(id: string) {
  const notesArray = notes.filter(note => {
    return note.id != id
  })

  setNotes(notesArray)

  localStorage.setItem('notes', JSON.stringify(notesArray))
}

function handleSearch(event: ChangeEvent<HTMLInputElement>) {
  const query = event.target.value 

  setSearch(query)

}

const filteredNotes = search != ''
  ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  :notes

  return (

    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img src={Logo} alt="Logo" />

      <form className='w-full'>
        <input type="text" placeholder='Busque as suas notas...' className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500' onChange={handleSearch} />
      </form>

      <div className='h-px bg-slate-700'/>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
          <NewNoteCard onNoteCreated={onNoteCreated}/>

          {filteredNotes.map(note => {
            return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
          })}

        </div>
    </div>
  )
}

export {App}

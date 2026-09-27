import { useEffect, useState } from "react";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {

    const API_URL = "http://localhost:5000/api/notes";

    const [notes, setNotes] = useState([]);

    const [editingNote, setEditingNote] = useState(null);


    // Get all notes
    const getNotes = async () => {

        try {

            const response = await fetch(API_URL);

            const data = await response.json();

            setNotes(data);

        } catch (error) {

            console.log(error);

        }

    };


    // Get notes when page loads
    useEffect(() => {

        getNotes();

    }, []);


    // Create / Update note
    const saveNote = async (data) => {

        try {

            if (editingNote) {

                // UPDATE

                const response = await fetch(
                    `${API_URL}/${editingNote._id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );

                const updatedNote = await response.json();


                setNotes(
                    notes.map((note) =>
                        note._id === editingNote._id
                            ? updatedNote
                            : note
                    )
                );


                setEditingNote(null);

            } else {

                // CREATE

                const response = await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );

                const newNote = await response.json();


                setNotes([
                    newNote,
                    ...notes
                ]);

            }

        } catch (error) {

            console.log(error);

        }

    };


    // Edit
    const editNote = (note) => {

        setEditingNote(note);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // Delete
    const deleteNote = async (id) => {

        try {

            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


            setNotes(
                notes.filter(
                    (note) => note._id !== id
                )
            );

        } catch (error) {

            console.log(error);

        }

    };


    // Cancel
    const cancelEdit = () => {

        setEditingNote(null);

    };


    return (

        <div className="min-h-screen bg-gray-100">

            <header className="bg-black text-white">

                <div className="max-w-5xl mx-auto px-5 py-8">

                    <h1 className="text-3xl font-bold">
                        My Notes
                    </h1>

                    <p className="text-gray-400">
                        Simple Notes Application
                    </p>

                </div>

            </header>


            <main className="max-w-5xl mx-auto px-5 py-10">

                <NoteForm
                    editingNote={editingNote}
                    onSave={saveNote}
                    onCancel={cancelEdit}
                />


                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-2xl font-bold">
                        Your Notes
                    </h2>

                    <span className="text-gray-500">
                        {notes.length} Notes
                    </span>

                </div>


                <NoteList
                    notes={notes}
                    onEdit={editNote}
                    onDelete={deleteNote}
                />

            </main>

        </div>
    );
}

export default App;
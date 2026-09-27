import NoteCard from "./NoteCard";

function NoteList({ notes, onEdit, onDelete }) {

    if (notes.length === 0) {
        return (
            <div className="bg-white p-8 rounded-xl text-center">
                <p className="text-gray-500">
                    No notes available.
                </p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {notes.map((note) => (

                <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />

            ))}

        </div>
    );
}

export default NoteList;
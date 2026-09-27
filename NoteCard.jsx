function NoteCard({ note, onEdit, onDelete }) {

    return (
        <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-xl font-bold mb-3">
                {note.title}
            </h3>

            <p className="text-gray-600 mb-5">
                {note.content}
            </p>

            <div className="flex gap-2">

                <button
                    onClick={() => onEdit(note)}
                    className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(note._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default NoteCard;
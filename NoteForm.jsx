import { useEffect } from "react";
import { useForm } from "react-hook-form";

function NoteForm({ editingNote, onSave, onCancel }) {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    useEffect(() => {

        if (editingNote) {

            reset({
                title: editingNote.title,
                content: editingNote.content
            });

        } else {

            reset({
                title: "",
                content: ""
            });

        }

    }, [editingNote, reset]);


    const submitForm = (data) => {
        onSave(data);
        reset();
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow mb-8">

            <h2 className="text-2xl font-bold mb-5">
                {editingNote ? "Edit Note" : "Create Note"}
            </h2>

            <form onSubmit={handleSubmit(submitForm)}>

                <div className="mb-4">

                    <label className="block font-medium mb-2">
                        Title
                    </label>

                    <input
                        type="text"
                        placeholder="Enter title"
                        {...register("title", {
                            required: true
                        })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />

                </div>


                <div className="mb-4">

                    <label className="block font-medium mb-2">
                        Content
                    </label>

                    <textarea
                        rows="5"
                        placeholder="Write your note..."
                        {...register("content", {
                            required: true
                        })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />

                </div>


                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="bg-black text-white px-5 py-2 rounded-lg"
                    >
                        {editingNote ? "Update Note" : "Add Note"}
                    </button>


                    {editingNote && (

                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-200 px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                    )}

                </div>

            </form>

        </div>
    );
}

export default NoteForm;
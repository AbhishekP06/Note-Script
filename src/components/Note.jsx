import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { removeFromNotes } from "../features/noteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Note() {

    const notes = useSelector((state) => state.note.notes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = notes.filter(
        (note) => note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(noteId) {
        console.log(noteId);
        dispatch(removeFromNotes(noteId));
    }

    function handleCopy(note) {
        navigator.clipboard.writeText(note?.content);
        toast.success("Copied to clipboard");
    }
    function formattedDate(date) {
        const dateStr = date;
        const formatDate = new Date(dateStr);

        const formattedDate = formatDate.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
        return formattedDate
    }

    return (
        <>
            <div>
                <input
                    className="bg-gray-100 dark:bg-black dark:text-white p-3 rounded-2xl mt-2 w-full max-w-3xl pl-2 placeholder-gray-500 dark:placeholder-gray-400"
                    type="search"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap gap-4">
                {filteredData.length > 0 &&
                    filteredData.map((note) => {
                        return (
                            <div
                                key={note?._id}
                                className="border bg-black p-3 mt-5 rounded-2xl pl-2 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] min-h-[350px] max-h-[300px] relative"
                            >
                                {/* Window Style Header */}
                                <div className="flex items-center gap-2 mt-2 pl-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                </div>
                                <div>
                                    <h1 className="text-white text-2xl font-bold line-clamp-1 ml-1 mt-1">{note.title}</h1>
                                </div>
                                <div className="flex flex-wrap p-1 mt-2 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                    <p className="pl-1 text-white">{formattedDate(note.createdAt)}</p>
                                </div>
                                <div className="line-clamp-3 pt-3 text-white ml-1 mt-1">
                                    <p className="whitespace-pre-wrap">{note.content}</p>
                                </div>
                                <div className="flex flex-wrap gap-6 mt-2 mb-1 px-4 py-2 place-content-evenly absolute bottom-0">
                                    {/* Edit button */}
                                    <button>
                                        <Link to={`/?noteId=${note?._id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Link>
                                    </button>
                                    {/* View button */}
                                    <button>
                                        <Link to={`/notes/${note?._id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </Link>
                                    </button>
                                    {/* Delete button */}
                                    <button onClick={() => handleDelete(note?._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                    {/* Copy button */}
                                    <button onClick={() => handleCopy(note)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>

        </>
    )
}

export default Note
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToNotes, updateToNotes } from "../features/noteSlice";

function Home() {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get("noteId");
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.note.notes);

    function createNote() {
        const note = {
            title: title,
            content: value,
            _id: noteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }
        if (noteId) {
            //update
            dispatch(updateToNotes(note));
        }
        else {
            //create
            dispatch(addToNotes(note));
        }
        //creation or updation - cleaning
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    useEffect(() => {
        if (noteId) {
            const note = notes.find((n) => n._id === noteId);
            setTitle(note.title);
            setValue(note.content);
        }

    }, [noteId])

    return (
        <>
            <div className="flex flex-row gap-7 place-content-start mt-2">
                <input className="bg-black p-3 rounded-2xl mt-2 min-w-2xs pl-2"
                    type="text"
                    placeholder="What is it about?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <button className="p-2 rounded-2xl mt-2" onClick={createNote}>
                    {noteId ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    }
                </button>
            </div>
            <div>
                <div className="flex items-center ml-1 mt-2">
                    <div className="circle">
                        <span className="red box"></span>
                    </div>
                    <div className="circle">
                        <span className="yellow box"></span>
                    </div>
                    <div className="circle">
                        <span className="green box"></span>
                    </div>
                </div>
                <textarea className="bg-black p-3 mt-2 min-w-2xl rounded-2xl overflow-y-auto scrollbar-hide resize-none"
                    value={value}
                    placeholder="Start writing here"
                    onChange={(e) => setValue(e.target.value)}
                    rows={20} />
            </div>

        </>
    )
}

export default Home
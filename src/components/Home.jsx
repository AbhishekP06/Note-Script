import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToNotes, updateToNotes } from "../features/noteSlice";

function Home() {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get("noteId");
    const dispatch = useDispatch();

    function createNote(){
        const note = {
            title: title,
            content: value,
            _id: noteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }
        if(noteId) {
            //update
            dispatch(updateToNotes(note)); 
        }
        else{
            //create
            dispatch(addToNotes(note));
        }
        //creation or updation - cleaning
        setTitle('');
        setValue('');
        setSearchParams({});
    }


    return (
        <>
            <div className="flex flex-row gap-7 place-content-between mt-2">
                <input className="bg-black p-3 rounded-2xl mt-2 min-w-2xs pl-2"
                    type="text"
                    placeholder="What is it about?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <button className="p-2 rounded-2xl mt-2" onClick={createNote}>
                    { noteId ? "Edit Me" : "Add Me"}
                </button>
            </div>
            <div>
                <textarea className="bg-black p-3 mt-5 min-w-2xl rounded-2xl" 
                value={value}
                placeholder="Start writing here"
                onChange={(e) => setValue(e.target.value)}
                rows={20}/>
            </div>
        </>
    )
}

export default Home
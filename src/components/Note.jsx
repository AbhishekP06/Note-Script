import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

function Note() {

    const notes = useSelector((state) => state.note.notes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = notes.filter(
        (note) => note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div>
                <input className="bg-black p-3 rounded-2xl mt-2 min-w-2xl pl-2"
                    type="search"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (note) => {
                            return (
                                <div className="border bg-black p-3 mt-5 rounded-2xl pl-2 max-w-[50%]">
                                    <div>
                                        <h1>{note.title}</h1>
                                    </div>
                                    <div className="overflow-hidden text-clip">
                                        <p>{note.content}</p>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </>
    )
}

export default Note
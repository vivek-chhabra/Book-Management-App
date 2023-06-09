import React, { useState } from "react";
import "./AddBook.css";

export default function AddBook(props) {
    const { handleSubmit, isEditModeOn, editArrElement } = props;

    // states
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("available");
    const [position, setPosition] = useState(true)

    const addData = () => {
        handleSubmit(title, author, status);
        setTitle('')
        setAuthor('')
    };

    let pos;
    if(isEditModeOn && position) {
        setTitle(editArrElement.title)
        setAuthor(editArrElement.author)
        setPosition(false)
    }

    return (
        <div className="AddBook">
            <div className="AddBook-input">
                <div className="a">
                    <div>A</div>
                    <input
                        type="text"
                        value={title}
                        placeholder="Book Title..."
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <div className="b">
                    <div>B</div>
                    <input
                        type="text"
                        value={author}
                        placeholder="Book Author..."
                        onChange={(e) => {
                            setAuthor(e.target.value);
                        }}
                    />
                </div>
                <div className="buttons">
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            setStatus("available");
                        }}>
                        Available
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            setStatus("unavailable");
                        }}>
                        Not Available
                    </button>
                </div>
                <button className="btn btn-primary" onClick={addData}>
                    Add / Update
                </button>
            </div>
        </div>
    );
}

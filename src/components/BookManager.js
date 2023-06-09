import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { capitalize } from "../helpers";
import { db } from "../firebase-config";
import BookList from "./BookList";
import AddBook from "./AddBook";
import "./BookManager.css";

export default function BookManager() {
    const [bookListArr, setBookListArr] = useState([]);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [editElementIdx, setEditElementIdx] = useState("");
    const [editElementId, setEditElementId] = useState("");
    const [addItemMsg, setAddItemMsg] = useState(false);
    const [deleteMsg, setDeleteMsg] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    // fetching data from firestore
    const collectionRef = collection(db, "bookInfo");
    const fetchData = async () => {
        try {
            let data = await getDocs(collectionRef);
            let bookList = data.docs.map((sglDoc) => ({ ...sglDoc.data(), id: sglDoc.id }));
            setBookListArr(bookList);
        } catch (err) {
            console.log(err);
        }
    };

    // adding information to the firestore database
    const handleSubmit = async (bookTitle, bookAuthor, status) => {
        if (bookTitle !== "" && bookAuthor !== "") {
            if (isEditModeOn) {
                const docToBeEdited = doc(db, "bookInfo", editElementId);
                try {
                    await updateDoc(docToBeEdited, { author: capitalize(bookAuthor), status: capitalize(status), title: capitalize(bookTitle) });
                } catch (err) {
                    console.log(err);
                }
                setIsEditModeOn(false);
                setAddItemMsg(true);
                setTimeout(() => {
                    setAddItemMsg(false);
                }, 2000);
            } else {
                try {
                    await addDoc(collectionRef, { author: capitalize(bookAuthor), status: capitalize(status), title: capitalize(bookTitle) });
                } catch (err) {
                    console.log(err);
                }
                setAddItemMsg(true);
                setTimeout(() => {
                    setAddItemMsg(false);
                }, 2000);
            }
        }
        fetchData();
    };

    // deleting the document from firestore database
    const handleDelete = async (id) => {
        const docToBeDeleted = doc(db, "bookInfo", id);
        setDeleteMsg(true);
        setTimeout(() => {
            setDeleteMsg(false);
        }, 2000);
        try {
            await deleteDoc(docToBeDeleted);
        } catch (err) {
            console.log(err);
        }
    };

    // updating the document at firestore database
    const handleEdit = async (id, idx) => {
        setIsEditModeOn(true);
        setEditElementIdx(idx);
        setEditElementId(id);
        // console.log(id, idx)
    };

    const bookItem = () => {
        return bookListArr.map((item, idx) => {
            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.status}</td>
                    <td className="action-btns">
                        <button
                            className="btn btn-secondary fw-bold mx-1"
                            onClick={() => {
                                handleEdit(item.id, idx);
                            }}>
                            Edit
                        </button>
                        <button
                            className="btn btn-danger fw-bold mx-1"
                            onClick={() => {
                                handleDelete(item.id);
                            }}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    };


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        BookManager
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <div className="add-msg" style={addItemMsg || deleteMsg ? { visibility: "visible" } : { visibility: "hidden" }}>
                <div className="alert alert-primary alert-dismissible fade show py-2 mt-3 mb-0" role="alert">
                    {deleteMsg ? (
                        <div>
                            <strong>Deleted Successfully,</strong> <span>Refresh to see changes.</span>
                            <button type="button" className="btn-close pb-1" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    ) : (
                        <div>
                            <strong>Yehhh!</strong> <span>Added successfully.</span>
                            <button type="button" className="btn-close pb-1" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}
                </div>
            </div>

            <AddBook handleSubmit={handleSubmit} editArrElement={bookListArr[editElementIdx]} isEditModeOn={isEditModeOn} />
            <BookList bookItem={bookItem} handleDelete={handleDelete} handleEdit={handleEdit} />
        </div>
    );
}

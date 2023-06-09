import React from "react";
import "./BookList.css";

export default function BookList(props) {
    const { bookItem, handleDelete, HandleEdit } = props;

    return (
        <div className="BookList">
            <div className="container">
            <div className="refresh btn btn-dark bg-black mb-2" onClick={() => {window.location.reload()}}>Refresh . . .</div>
                <table class="table table-success table-striped text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book Title</th>
                            <th>Book Author</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookItem()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

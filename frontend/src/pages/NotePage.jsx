import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import toast from "react-hot-toast";

const NotePage = () => {
    const [note, setNote] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const getAll = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const res = await axios.get("http://localhost:8000/note/getAll", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNote(res.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleAdd = async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            toast.error("Please login first");
            return;
        }

        if (!title.trim()) {
            toast.error("Title cannot be empty");
            return;
        }

        try {
            await axios.post(
                "http://localhost:8000/note/create",
                {
                    title: title,
                    description: description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Note added successfully");

            setTitle("");
            setDescription("");

            getAll();
        } catch (error) {
            console.log(error.response?.data);
            toast.error("Add failed");
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="text-center mt-5">
            <div className="flex justify-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border px-3 py-2"
                />

                <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border px-3 py-2"
                />

                <button
                    onClick={handleAdd}
                    className="px-4 py-2 text-white bg-blue-600"
                >
                    Add
                </button>
            </div>

            {note.map((item) => (
                <Card
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    getAll={getAll}
                />
            ))}
        </div>
    );
};

export default NotePage;

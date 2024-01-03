"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AddBookForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [ISBN, setISBN] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/get-all-authors"
        );
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/create-book", {
        title,
        ISBN,
        publicationYear,
        authorId,
      });

      console.log("Book created successfully:", response.data);
      router.push("/dashboard"); // Redirect to the main list book page
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const settitle = () => {};
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-10 ">
        <h1 className="text-[32px] font-semibold uppercase">Add new Book</h1>
        <div className=" p-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-3"
          >
            <label className="font-bold">
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter the title"
                className="ml-2 border border-black rounded-md p-1 font-normal"
              />
            </label>
            <label className="font-bold">
              ISBN:
              <input
                type="text"
                value={ISBN}
                onChange={(e) => setISBN(e.target.value)}
                required
                placeholder="Enter the title"
                className="ml-2 border border-black rounded-md p-1 font-normal"
              />
            </label>
            <label className="font-bold">
              Publication Year:
              <input
                type="number"
                value={publicationYear}
                onChange={(e) => setPublicationYear(e.target.value)}
                required
                placeholder="Enter the title"
                className="ml-2 border border-black rounded-md p-1 font-normal"
              />
            </label>
            <label className="font-bold">
              Author:
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                required
                placeholder="Enter the title"
                className="ml-2 border border-black rounded-md p-1 font-normal"
              >
                <option value="" disabled>
                  Select an author
                </option>
                {authors.map((author) => (
                  <option key={author.authorId} value={author.authorId}>
                    {author.authorName}
                  </option>
                ))}
              </select>
            </label>
            <div className="self-center flex flex-row items-center justify-around w-full">
              <button
                className=" bg-yellow-200 p-2 rounded-lg font-bold"
                type="submit"
              >
                Add Book
              </button>
              <button
                onClick={() => {
                  router.push("/dashboard");
                }}
                className="self-center bg-red-500 p-2 rounded-lg font-bold"
                type="submit"
              >
                Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBookForm;

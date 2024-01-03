"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import BookSearch from "../bookSearch/page";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [filteredBook, setFilteredBook] = useState([]);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    // const fetchBookData = async axios.get("http://localhost:3001/get-all-books");

    const fetchBookData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get-all-books");
        setBooks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };
    fetchBookData();
  }, []);

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

  const handleSearch = (query) => {
    const lowerCasedQuery = query.toLowerCase();
    console.log(books);
    const filtered = books.filter((book) => book.title.includes(query));
    console.log(filtered);

    !filtered ? setFilteredBook([]) : setFilteredBook(filtered);
  };
  return (
    <>
      <div className="w-full lg:h-[600px] flex flex-col justify-start gap-10 items-center ">
        <h1 className="font-semibold text-[32px]">BOOK LIST</h1>
        <BookSearch onSearch={handleSearch}></BookSearch>
        <table className="mx-1">
          <thead>
            <tr>
              <th className="p-4 w-24 border-2 border-black">Sl.no</th>
              <th className="w-24 border-2 border-black">Book Title</th>
              <th className="w-24 border-2 border-black">ISBN</th>
              <th className="w-40 border-2 border-black">Publication Year</th>
              <th className="w-24 border-2 border-black">Author ID</th>
            </tr>
          </thead>
          <tbody>
            {(filteredBook.length > 0 ? filteredBook : books).map(
              (book, index) => (
                <tr>
                  <td className="border border-black">{index + 1}</td>
                  <td className="border border-black">{book.title}</td>
                  <td className="border border-black">{book.ISBN}</td>
                  <td className="border border-black">
                    {book.publicationYear}
                  </td>
                  <td className="border border-black">
                    {
                      authors.find(
                        (author) => author.authorId === book.authorId
                      )?.authorName
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <div className="bg-yellow-300 p-2 rounded-xl">
          <Link href="/addBookForm">Create new Book</Link>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

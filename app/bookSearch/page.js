"use client";
import React, { useState } from "react";

function BookSearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log(searchQuery);
    onSearch(searchQuery);
  };
  return (
    <>
      <div className="w-[200px] flex flex-col gap-3 items-center justify-center">
        <input
          type="text"
          className="border-2 border-black p-2 rounded-xl"
          value={searchQuery}
          placeholder="Enter Book name"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button className="bg-green-300 p-2 rounded-xl" onClick={handleSearch}>
          Search
        </button>
      </div>
    </>
  );
}

export default BookSearch;

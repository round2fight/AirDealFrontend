import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Loader from "react-loader-spinner";
import Spinner from "@/components/Spinner";
const UploadImagePage = () => {
  const [file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const [cards, setCards] = useState([]);
  const handleGetCards = async () => {
    let url = process.env.NEXT_PUBLIC_API_URL + "/cards";
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setCards(res.data);
      // setExtractedData(response.data);
    } catch (error) {
      console.error("Error uploading the file:" + error);
      <Spinner />;
      alert(
        "Error processing image, Please wait for my free services to boot up."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCards = async () => {
    let url = process.env.NEXT_PUBLIC_API_URL + "/cards";
    try {
      const res = await axios.delete(url);
      console.log(res);
      // setExtractedData(response.data);
    } catch (error) {
      console.error("Error uploading the file:" + error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (!file) return;

    console.log("file", file);

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    let url = process.env.NEXT_PUBLIC_API_URL + "/upload";

    try {
      const res = await axios.post(url, formData);
      console.log(res);
      // setExtractedData(response.data);
    } catch (error) {
      console.error("Error uploading the file:" + error);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = () => {
    setFile(null); // Clear the file state
    // setExtractedData(null); // Clear any extracted data
  };

  return (
    <>
      <div className="">
        <div className="m-2">{loading === true && <Spinner />}</div>

        <div className="justify-center rounded-3xl overflow-hidden shadow-xl p-4 bg-nyanza max-w-md mx-auto">
          <div className="m-4 flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-gray-700 font-bold text-4xl">
                AirDeal Assignment
              </h1>
              <p className="text-xl text-gray-700">OCR using MERN stack</p>
              <p className="text-l text-gray-700">By Roshan Daniel</p>
            </div>
          </div>{" "}
          <div className="">
            <div
              {...getRootProps()}
              style={{ border: "2px dashed #ccc", padding: "20px" }}
            >
              <input {...getInputProps()} />
              <div className="text-center text-gray-700">
                Drag & drop a visiting card image here, or click to select a
                file
              </div>
            </div>
            <div className="flex justify-center">
              {file ? (
                <div className="mt-4">
                  <h3 className="flex justify-center text-gray-700">
                    Image Preview:
                  </h3>
                  <img
                    className="flex justify-center"
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{ width: "400px" }}
                  />
                </div>
              ) : (
                <div className="mt-4 text-gray-700">
                  Waiting for your upload :)
                </div>
              )}
            </div>
            <div className="flex justify-center">
              {" "}
              <button
                className="m-3 disabled:bg-gray-400  disabled:hover:bg-gray-400  bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300 "
                onClick={handleSubmit}
                disabled={!file}
              >
                Process Image
              </button>
              <button
                className="m-3 disabled:bg-gray-400  disabled:hover:bg-gray-400  bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300 "
                onClick={handleClear}
                disabled={!file}
              >
                Clear Image
              </button>
            </div>
          </div>
        </div>
        <div className=" mt-2 justify-center rounded-3xl overflow-hidden shadow-xl p-4 bg-nyanza max-w-md mx-auto">
          <div className="m-2 flex justify-center">
            <button
              className="m-3  bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300 "
              onClick={handleGetCards}
            >
              Get Cards
            </button>
            <button
              className="m-3  bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-300 "
              onClick={handleDeleteCards}
            >
              Delete All Cards
            </button>
          </div>
          <div className="m-2 flex justify-center max-w-4xl">
            {" "}
            <CardPagination cards={cards} />;
            {/* {cards.map((card) => (
                <div key={card._id}>Yo</div>
              ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImagePage;

const CardPagination = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 2;

  // Calculate total pages
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  // Get the current set of cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  // Handle next and previous page clicks
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center   ">
      {/* Card container */}
      <div className="flex flex-row gap-2 ">
        {currentCards.map((card, index) => (
          <div
            key={index}
            className="bg-blue-500 rounded-lg shadow p-4 text-center"
          >
            <h2 className="text-xl font-bold text-gray-800">{card.name}</h2>
            <form className="space-y-2">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  value={card.name}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200  text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Job Title
                </label>
                <input
                  type="text"
                  value={card.jobTitle}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200  text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Company Name
                </label>
                <input
                  type="text"
                  value={card.companyName}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200  text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  value={card.email}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200  text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={card.phone}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200  text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold ">
                  Address
                </label>
                <input
                  type="text"
                  value={card.address}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200  text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Processed Timestamp
                </label>
                <input
                  type="text"
                  value={card.timestamp}
                  disabled
                  className="w-full p-2 border rounded bg-gray-200  text-gray-700"
                />
              </div>
            </form>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-between items-center mt-4 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

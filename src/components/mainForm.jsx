import React, { useState } from "react";
import { sortData, processData } from "../utils";
import ProductCardGrid from "./ProductCardGrid";

function MainForm() {
  const [userQuery, setuserQuery] = useState();
  const [productData, setProductData] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [justLoaded, setJustLoaded] = useState(false);
  const handleUserInput = (e) => {
    e.preventDefault();
    const searchUrl = `https://www.reddit.com/search.json?q=${userQuery}%20review&limit=1000&sort=relevance`;

    fetch(`${searchUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(sortData(processData(data), userQuery));
        setProcessing(false);
      });
  };
  return (
    <form
      className="container mx-auto flex flex-col"
      action=""
      onSubmit={(e) => {
        setProcessing(true);
        handleUserInput(e);
        setJustLoaded(true);
      }}
    >
      <div className="container max-w-sm self-center">
        <input
          className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          onChange={(e) => setuserQuery(e.target.value)}
        />
        <input
          className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 disabled:opacity-50"
          disabled={processing}
          type="submit"
          value={processing ? "loading results" : "search reddit"}
        />
      </div>

      <div id="results" className="">
        {productData.length > 0 ? (
          <ProductCardGrid data={productData} />
        ) : (
          justLoaded && (
            <div className="w-full text-center p-10">
              <span className=" ">No Results Found 😥</span>
            </div>
          )
        )}
      </div>
    </form>
  );
}
export default MainForm;

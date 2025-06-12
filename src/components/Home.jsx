import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCopy, updateToCopy } from "../redux/copySlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const copyId = searchParams.get("copyId");
  const dispatch = useDispatch();
  const allCopies = useSelector((state) => state.copy.copies);

  function createCopy(){
    const copy ={
        title: title,
        content : value,
        _id: copyId || Date.now().toString(36),
        createdAt: new Date().toISOString(),
    }
    if(copyId){
        dispatch(updateToCopy(copy));
    }
    else{
        dispatch(addToCopy(copy))
    }

    setTitle("");
    setValue("");
    setSearchParams({});
    // alert("Copy saved successfully!");
  }
 


useEffect(()=>{
  if(copyId){
    const copy = allCopies.find((item) => item._id === copyId);
      setTitle(copy.title);
      setValue(copy.content);
    
  }
},[copyId]

)


  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-row gap-7 p-4 place-content-between">
        <input
          className="border-2 border-gray-300 rounded-md p-2  mt-4 w-[66%] pl-4"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
        onClick={createCopy}
        className="border-2 border-gray-300 rounded-md p-2  mt-4">
          {copyId ? "Update My Copy" : "Create My Copy"}
        </button>


      </div>

      <div className="mt-8">
        <textarea
          value={value}
          placeholder="Enter your copy here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          className="border-2 border-gray-300 rounded-md p-2 w-full mt-4"
        />
      </div>
    </div>
  );
};

export default Home;

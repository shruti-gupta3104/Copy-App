import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCopy } from "../redux/copySlice";
import toast from "react-hot-toast";
import { Calendar, Clipboard, Eye, PencilLine, Trash2 } from "lucide-react";

import { FormatDate } from "../utlis/formateDate";
import { useNavigate } from "react-router-dom";

const Copy = () => {
  const copies = useSelector((state) => state.copy.copies);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = copies.filter(
    (copy) =>
      copy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      copy.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(copyId){
    // console.log(copyId);
    dispatch(removeFromCopy(copyId));
  }

  return (
    <div>
      <input
        className="border-2 border-gray-300 rounded-md p-2 mt-4 w-full pl-4"
        type="search"
        placeholder="Search your copies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5">
         <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>

        {filteredData.length > 0 &&
          filteredData.map((copy) => {
            return (
              <div className="border-2 border-gray-300 rounded-md p-4 mt-4" key={copy?._id}>
                <div className=" flex flex-col space-y-3">
                    <p className="text-4xl font-semibold ">{copy?.title}</p>
                    <p className="text-sm font-normal  max-w-[80%] text-[#707070]">
                      {copy?.content}
                    </p>
                  </div>



                <div className="flex flex-row gap-4 mt-4 place-content-evenly">
                  <button>
                    <a href={`/?copyId=${copy?._id}`} 
                    className="text-blue-500">
                      <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                          />
                      
                      
                      </a>
                   </button>
                  <button onClick={()=> navigate(`/copies/${copy?._id}`)}>
                    
                    <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                    
                    </button>
                  
                  <button onClick={()=> {handleDelete(copy?._id)}}>
                     <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                    
                    </button>
                  <button onClick={ ()=>{
                    navigator.clipboard.writeText(copy?.content);
                    toast.success("Copy content copied to clipboard!"); 
                  }}>
                     <Clipboard
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                  
                  </button>
                  
                </div>

                <div className="gap-x-2 flex ">
                      <Calendar className="text-black" size={20} />
                      {FormatDate(copy?.createdAt)}
                    </div>

              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Copy;

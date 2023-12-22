// BinarySearch.jsx

import React, { useState } from "react";
import VisualizeHeader from "../../../../Components/VisualizeHeader";
import VisualizeBubble from "../../../Visualizations/VisualizeBubble";
import Description from "../../../../Components/Description";

const BubbleSort = () => {
  const [array, setArray] = useState("1 2 3 4 5");
  const [inVisualize, setInVisualize] = useState(false);
  const [arrayValues, setArrayValues] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedValue, setSelectedValue] = useState('Integer');


  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
  };

  const handleArrayChange = (event) => {
    setArray(event.target.value);
  };

  const formatValues = (value) => {
    switch(selectedValue){
      case "Integer" : return Number.parseInt(value, 10);
      case "Float" : return parseFloat(value);
      case "Character": return value[0];
      default: return value;
    }
  }

  function getMessage(message){
    setMessage(message);
  }

  const visualizeBinarySearch = () => {
    const arrayValues = array.split(" ").map(formatValues);
    if (arrayValues[arrayValues.length - 1] === 0) arrayValues.pop(-1);
    setArrayValues(arrayValues);
    setInVisualize(true);
  };

  return (
    <div className="bg-color h-screen">
      <div className='max-w-[1200px] m-auto h-full'>
        <VisualizeHeader
          routePath="/algorithms/sort/bubble-sort"
          setInVisualize={setInVisualize}
        />

        {inVisualize ? (
          <div className="flex justify-around items-center h-[80%]">
            <div className="border bg-input p-4">
              <div>
                Array : <span>{array}</span>
              </div>
              <div>
                Size : <span>{arrayValues.length}</span>
              </div>
              <div>
                Data Type : <span>{selectedValue}</span>
              </div>
            </div>
            <div className="w-[70%]">
              <div className='w-full min-h-[350px] flex justify-center items-center bg-input p-4'>
                <VisualizeBubble
                  arrayValues={arrayValues}
                  setArrayValues={setArrayValues}
                  getMessage={getMessage}
                />
              </div>
              <Description message={message}/>
            </div>
            
            
            
          </div>
        ) : (
          <div className="mt-24  bg-input w-fit m-auto p-5">
            <h1 className="card-heading text-3xl font-bold mb-4 flex flex-col items-center text-red-500 py-4">
              Bubble Sort Visualization
            </h1>
            <form className="mb-8 flex justify-center items-center flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <label className="min-w-[170px] text-blue-500 card-heading">
                  Enter Array:
                </label>
                <input
                  type="text"
                  value={array}
                  onChange={handleArrayChange}
                  className="bg-input border border-blue-500 rounded py-2 px-3 text-red-500"
                />
              </div>
              <div className='flex items-center space-x-2'>
                <label htmlFor="dropdown" className='min-w-[170px] text-blue-500 card-heading'>Select Data Type:</label>
                <select id="dropdown" onChange={handleDropdownChange} value={selectedValue} className='border bg-input border-blue-500 rounded py-2 px-3 text-red-500'>
                    <option value="Integer">Integer</option>
                    <option value="Float">Float</option>
                    <option value="Character">Character</option>
                    <option value="String">String</option>
                  </select>
              </div>
              <div className="flex gap-2 py-4">
                <button
                  type="button"
                  onClick={visualizeBinarySearch}
                  className="bg-input hover:scale-110 hover:card-heading hover:shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Visualize
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BubbleSort;

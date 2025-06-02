

import {
  Box,
  Button
} from "@mui/material";
// import { LoadingButton } from '@mui/lab';

import { exportToExcel } from '../utils/export';
import { apiModify } from "../api/pattern"
import axios from "axios";
import LoadingContainer from '../components/LoadingContainer';



import { useState, useRef } from "react";
import Navbar from "../components/Navbar";

import ModifiedTable from "./TransformComponents/PreviewTable";
import FileUpload from './TransformComponents/FileUpload';

import { useDataStore } from '../store/useDataStore';
import { useSnackbarQueue } from '../store/useSnackbarQueue';




const Transform = () => {

  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLOading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);



  const { showMessage } = useSnackbarQueue();
  // data from global store 
  const { originalData, modifiedData, isTransformed, fileName } = useDataStore();
  // method from global store 
  const setIsTransformed = useDataStore((state) => state.setIsTransformed);
  const setModifiedData = useDataStore((state) => state.setModifiedData);

  const validateInstructionFormat = (text: string) => {
    const pattern = /^find .+ in .+ column and replace them with .+/i;
    return pattern.test(text.trim());
  };

  const handleTransform = async () => {
    if (inputText.trim() === '') {
      setError(true);
      return;
    }

    if (!validateInstructionFormat(inputText)) {
      showMessage('error', "⚠️ Please follow the format:\n'Find xxx in xxx column and replace them with xxx' !");
      return;
    }
    setLoading(true);
    setTableLOading(true)


    try {
      const res = await apiModify({ instruction: inputText, table_data: originalData, filename: fileName ?? '' });
      setModifiedData(res.modified_data);
      setIsTransformed(true);
      showMessage('success', 'Success transform !');
    } catch (err) {
      // console.error(err);
      let message = "Unexpected error occurred";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      }
      showMessage('error', message);
    } finally {
      setLoading(false);
      setTableLOading(false)
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (e.target.value.trim() !== '') setError(false);
    setInputText(value);

  };


  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };




  return (
    <Box className="min-h-screen flex flex-col">
      <Navbar />

      <main className="bg-gradient-to-b from-purple-100 via-white to-pink-100 flex-1 flex flex-col h-full ">
        <div className="min-h-screen  bg-gray-50 flex">

          {/* left */}
          <div className="flex-1 px-10 py-6 h-screen overflow-hidden" >
            <LoadingContainer loading={tableLoading} >
              <div className="bg-white rounded-xl  h-full shadow-md p-6 ">
                <div className="flex justify-between">   <h2 className="text-xl font-bold mb-4">📁 {fileName}</h2>
                  {isTransformed && <button
                    onClick={() => exportToExcel(modifiedData, 'ModifiedData.xlsx')}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Export
                  </button>} </div>


                <ModifiedTable
                  modifiedData={isTransformed ? modifiedData : originalData}
                  originalData={originalData}
                  highlightChanges={isTransformed}
                />



              </div>

            </LoadingContainer>
          </div>


          {/* right */}
          <div className="w-[300px] p-6 border-l border-gray-200 bg-white shadow-inner flex flex-col gap-6">
            {/* resubmit */}
            <div
              className="bg-green-100 text-green-800p-4 p-4  rounded-lg hover:cursor-pointer hover:bg-green-200"
              onClick={handleFileClick}
            >

              <p className="font-semibold mb-4">⚡ Want to change another file ?</p>

              <FileUpload></FileUpload>


            </div>

            {/* natural input */}
            <div className="bg-gray-100 rounded-lg p-4">
              <label htmlFor="instruction" className="block font-medium text-sm mb-2">🧠 Describe your change</label>
              <textarea
                id="instruction"
                className={`
                  w-full p-3 rounded-md bg-white text-sm 
                  ${error ? 'border border-red-500' : 'border border-gray-300'} 
                  focus:outline-none focus:ring-2 
                  ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
                `}
                rows={8}
                placeholder="e.g. Find email addresses in the Email column and replace them with 'REDACTED'"
                value={inputText}
                onChange={handleTextChange}
              />

              {error && (
                <p className="text-red-500 text-sm mt-2 ml-1">
                  Please describe your change before submitting.
                </p>
              )}
            </div>


            <div className="flex justify-end ">

              <Button
                variant="contained"
                loading={loading}
                onClick={() => handleTransform()}
              >
                TRANSFORM
              </Button>
            </div>
          </div>

        </div>


      </main>

    </Box>
  );
};

export default Transform;

import React, { useState } from "react";
import { Typography, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import axios from "axios";

import { useDataStore } from '../../store/useDataStore';
import { uploadAndMergeFile } from "../../utils/uploadFileInChunks";
import { fetchMergedFile } from "../../utils/fetchMergedFile";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setUploading(true);
    setProgress(0);

    try {
      const store = useDataStore.getState();
      store.clearAll();
      store.setFileName(file.name);

      const mergedPath = await uploadAndMergeFile(file, setProgress);
      const parsedData = await fetchMergedFile(mergedPath);


      store.setModifiedData(parsedData);
      store.setOriginalData(parsedData);

      navigate("/transform");
    } catch (err) {
      console.error("Upload or merge failed:", err);
 
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative flex-1 max-w-screen-xl mx-auto w-full">
      {/* mask + progress bar */}
      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full text-center">
            <p className="text-gray-700 font-semibold mb-4">Uploading: {selectedFile?.name}</p>
            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-4 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{progress}%</p>
          </div>
        </div>
      )}

      {/* unload */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center py-4 h-full justify-center border-2 border-blue-500 bg-blue-50 border-dashed rounded-2xl cursor-pointer hover:border-blue-400"
      >
        <CloudUploadIcon fontSize="large" color="disabled" />
        <Typography className="font-medium text-gray-600">Browse Files</Typography>
        <Typography variant="body2" className="text-gray-400">
          Drag and drop csv or xsls files here
        </Typography>

        <Input
          type="file"
          inputProps={{
            accept: '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }}
          id="file-upload"
          sx={{ display: "none" }}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

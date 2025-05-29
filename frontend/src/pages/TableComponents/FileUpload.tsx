import React, { useState } from "react";
import { Typography, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useDataStore } from '../../store/useDataStore';
import { uploadAndParseFile } from "../../utils/uploadAndParseFile";

export default function FileUpload() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSelectedFile(file);
      useDataStore.getState().clearAll();
      useDataStore.getState().setFileName(file.name);
      await uploadAndParseFile(file);

      // console.log('success save file');
      navigate("/upload");
    } catch (err) {
      console.error("error:", err);
      alert(err);
    }
  };


  return (
    <div className="flex-1 max-w-screen-xl mx-auto w-full">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center h-80 border-2 border-blue-500 bg-blue-50 border-dashed rounded-2xl cursor-pointer hover:border-blue-400"
      >
        <CloudUploadIcon fontSize="large" color="disabled" />
        <Typography className="font-medium text-gray-600">Browse Files</Typography>
        <Typography variant="body2" className="text-gray-400">
          Drag and drop files here
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

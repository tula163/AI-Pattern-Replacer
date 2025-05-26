import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Input,
  CircularProgress
} from "@mui/material";
import { LoadingButton } from '@mui/lab';



import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Navbar from "../components/Navbar";
import { getRegexFromText } from "../api/pattern";

export default function RegexFormCard() {
  const [inputText, setInputText] = useState("");
  const [regexResult, setRegexResult] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");



  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);

    // 简单示例：匹配邮箱
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const matches = value.match(emailRegex);
    setRegexResult(matches ? matches.join(", ") : "No matches found.");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const extractRegexPattern = (rawText: string): string => {
    const match = rawText.match(/```(?:\w*\n)?([\s\S]*?)```/);
    return match ? match[1].trim() : "can't find result.....";
  };
  

  const handleSubmit = async () => {
    setLoading(true); // loading

    try {
      const response = await getRegexFromText(inputText);
  
      const rawRegex = response.regex;
      const extracted = extractRegexPattern(rawRegex);
      setRegexResult(extracted);
      setStatus("success");
    } catch (error) {
   
      setRegexResult("");
      setStatus("error");
    } finally {
      setLoading(false); // stop loading
    }
  };
  
  

  return (
    <Box  className="min-h-screen flex flex-col">
        <Navbar />

        <main className="bg-gradient-to-b from-purple-100 via-white to-pink-100 flex-1 flex flex-col h-full">
         
          <Card className=" max-w-screen-xl mx-auto px-6 flex-1 w-full mt-10 mb-10">
        <CardContent className="flex flex-col gap-6">
          <Typography variant="h6" className="font-semibold">
            Regex Pattern Extractor
          </Typography>

          {/* 文本区域 */}
          <div>
            <Typography className="mb-1 font-medium">Natural Language Input</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={inputText}
              onChange={handleTextChange}
              placeholder="Type here..."
            />
          </div>
                              {/* 提交按钮 */}
                              {/* <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            className="w-40 self-right bg-green-600 hover:bg-green-700"
          >
            
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Transform'}
          </Button> */}

          <LoadingButton
  variant="contained"
  loading={loading}
  onClick={() => handleSubmit()}
>
  TRANSFORM
</LoadingButton>

          {/* 正则结果展示 */}
          <div>
            <Typography className="mb-1 font-medium">Regex Matches</Typography>
<div
  className={`
    relative min-h-[100px] rounded p-4 text-lg font-semibold
    ${status === "idle" && "bg-gray-100 text-gray-400"}
    ${status === "success" && "bg-green-100 text-green-800 border border-green-300"}
    ${status === "error" && "bg-red-100 text-red-800 border border-red-300"}
    flex items-center
  `}
>
  {/* content */}
  <div className="flex-1 text-5xl">{regexResult}</div>

  {/* copy */}
  {status === "success" && (
    <button
      onClick={() => navigator.clipboard.writeText(regexResult)}
      className="absolute top-2 right-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
    >
      copy
    </button>
  )}
</div>



          </div>



          {/* 文件上传区域 */}
          <div>
            <Typography className="mb-1 font-medium">Upload File</Typography>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400"
            >
              <CloudUploadIcon fontSize="large" color="disabled" />
              <Typography className="font-medium text-gray-600">Browse Files</Typography>
              <Typography variant="body2" className="text-gray-400">
                Drag and drop files here
              </Typography>
              <Input
                type="file"
                id="file-upload"
                sx={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            {selectedFile && (
              <Typography variant="body2" className="mt-2 text-gray-600">
                Selected: {selectedFile.name}
              </Typography>
            )}
          </div>

          {/* 提交按钮 */}
          {/* <Button
            onClick={handleSubmit}
            variant="contained"
            className="w-40 self-center bg-green-600 hover:bg-green-700"
          >
            Submit
          </Button> */}
        </CardContent>
      </Card>
          {/* </div> */}
        </main>

    </Box>
  );
}

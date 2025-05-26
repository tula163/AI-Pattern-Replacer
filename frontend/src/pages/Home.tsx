import { Button } from '@mui/material';

import Navbar from "../components/Navbar";
import HomeImg from '../assets/home.png';
import SendIcon from '@mui/icons-material/Send';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
    return (
      <div className="min-h-screen flex flex-col">

        <Navbar />
        {/* main */}
        <main className="flex-1 max-w-screen-xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-20">
  {/* left text content */}
  <div className="flex-1  ">
    <h1 className="text-5xl font-semibold text-[#2C2C4A] mb-6">
    Get Regex – Pattern Matching & Replacement Tool
    </h1>
    <p className="text-gray-600 text-2xl leading-relaxed text-base mb-6">
    Effortlessly upload your CSV or Excel files, describe the pattern you want to replace using <strong>natural language</strong>,
    {/* <br/> */}
      and let our AI-powered platform handle the rest.
    
    </p>
    <section className='mb-6  text-2xl font-mono'>


    <p className='mb-2'> Convert natural language to regular expressions</p>
<p className='mb-2'> Instantly replace text patterns in bulk
</p>
<p> View updated data in a clear, tabular format</p>
</section>
<p  className='mb-6 text-xl font-mono'>
Whether you're cleaning email addresses, masking sensitive data, or transforming text at scale, Get Regex makes it simple – no regex expertise required.
</p>

    <Button variant="contained" endIcon={<SendIcon />}  onClick={() => navigate("/regex")} >
    Start free
</Button>
  </div>


  {/* right image content */}
  <div className="flex-1 max-w-md w-full">
    <img src={HomeImg} alt="upload" className="w-full h-auto" />
  </div>
</main>





        <footer className='bg-stone-200'>
          <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center h-16  shadow-sm ">
          <div>© 2025 ZIHAN LUO, Inc. All rights reserved.</div>
    <div className="flex gap-4 text-gray-500">
      <a href="#">📘</a>
      <a href="#">📸</a>
      <a href="#">𝕏</a>
      <a href="#">🐙</a>
      <a href="#">▶️</a>
    </div>

          </div>
        </footer>

      </div>
    );
  }
  

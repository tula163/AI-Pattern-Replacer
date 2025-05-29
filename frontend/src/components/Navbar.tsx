
// import { Button } from '@mui/material';
import Divider from '@mui/joy/Divider';

export default function Navbar() {
    return (
        <header className="sticky top-0 bg-white shadow-sm z-50">
          <div className="max-w-screen-2xl mx-auto px-6 flex justify-between items-center h-16">
            {/* left LOGO */}
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-6 w-auto" />

              <span className="font-semibold text-2xl">Upload Files</span>
              <Divider orientation="vertical" />
              <span className="font-semibold text-2xl">Get Regex</span>
              <Divider orientation="vertical" />
              <span className="font-semibold text-2xl">Replace</span>

            </div>
            {/* right */}
            <nav className="flex space-x-4 text-sm text-gray-600">
              <a href="#">Home</a>
              <a href="#">FAQ</a>
              <a href="#">Login</a>
            </nav>

          </div>
        </header>
    );
  }
  

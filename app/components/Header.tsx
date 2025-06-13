import { UserCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-10 bg-gray-900">
      <div className="flex items-center justify-between text-lg font-medium">
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="Logo" className="h-10 w-auto" />
        </div>
        
        <div className="flex space-x-6 text-lg font-medium">
          <a href="#" className="text-white border-b-2 border-yellow-500 pb-2 hover:text-yellow-400 transition-colors">
            Inicio
          </a>
          <UserCircle className="h-8 w-8 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
const Header = () => {
  return (
    <header className="mb-8">
      <nav className="flex space-x-6 text-lg font-medium">
        <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-2">Gestion de usuarios</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 pb-2">Membresias</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 pb-2">Control de acceso</a>
      </nav>
    </header>
  )
}

export default Header
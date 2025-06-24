// Componente que renderiza el pie de página común para toda la aplicación.
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} GymsGG. Todos los derechos reservados.
                </p>
                <p className="text-xs mt-2">
                    Desarrollado por <a href="#">....</a>
                </p>
            </div>
        </footer>
    );
};
export default Footer;
// @ts-expect-error CSS imports are handled by the blunder, not TypeScript
import './Footer.css';

interface FooterProps {
    nombreSitio: string;
    anio: number;
}

const Footer = ({ nombreSitio, anio }: FooterProps) => {
    return (
        <footer className="footer-container">
            <p>&copy; {anio} {nombreSitio}. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;
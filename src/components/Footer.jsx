import React from "react";
import { Container } from "reactstrap";

const Footer = () => (
    <footer className="footer font-small">
        <div className="footer-copyright text-center py-3 ">
            <Container fluid>
                &copy; {new Date().getFullYear()} Copyright:{" "}
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/talKitron" className="text-success">Tal Kitron</a>
            </Container>
        </div>
    </footer>
);

export default Footer;
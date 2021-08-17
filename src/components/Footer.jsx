import { Facebook, Twitter, Instagram } from "react-bootstrap-icons";

const iconClass = "link text-secondary mx-2";

const Footer = () => {
  return (
    <footer className="footer bg-dark mt-3 py-3">
      <div className="container d-flex  justify-content-center ">
        <span className="text-muted">&copy; 2021 Blog List</span>
        <span className="text-secondary px-4">|</span>
        <span>
          <a href="https://facebook.com">
            <Facebook size={22} className={iconClass} />
          </a>

          <a href="https://twitter.com">
            <Twitter size={22} className={iconClass} />
          </a>

          <a href="https://instagram.com">
            <Instagram size={22} className={iconClass} />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

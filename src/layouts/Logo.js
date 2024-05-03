import { Link } from "react-router-dom";
import LogoImage from "../assets/images/logos/logouns.png"; // Pastikan path gambar SVG sesuai dengan struktur proyek Anda

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={LogoImage}
        alt="Logo"
        style={{ width: "132px", height: "31px" }}
      />
    </Link>
  );
};

export default Logo;

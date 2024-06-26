import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import Logo1 from './img/d3ti.png';
import Logo2 from './img/uns.png';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const location = useLocation(); // Get current location
  
  // Check if the current location is dashboard or rekapitulasi
  const isDashboardOrRekapitulasi = 
  location.pathname === '/dashboard' || 
  location.pathname === '/rekapitulasi' || 
  location.pathname === '/capaian-iku' || 
  location.pathname === '/capaian-iku/iku1' || 
  location.pathname === '/capaian-iku/iku2' ||
  location.pathname === '/capaian-iku/iku3' || 
  location.pathname === '/capaian-iku/iku4' ||
  location.pathname === '/capaian-iku/iku5' || 
  location.pathname === '/capaian-iku/iku6' ||
  location.pathname === '/capaian-iku/iku7'  ||
  location.pathname === '/iku1' || 
  location.pathname === '/iku2' ||
  location.pathname === '/iku3' || 
  location.pathname === '/iku4' ||
  location.pathname === '/iku5' ||
  location.pathname === '/iku6' || 
  location.pathname === '/iku7' ||
  location.pathname === '/addiku1' || 
  location.pathname === '/addiku2' ||
  location.pathname === '/addiku3' || 
  location.pathname === '/addiku4' ||
  location.pathname === '/addiku5' ||
  location.pathname === '/addiku6' || 
  location.pathname === '/addiku7' ||
  location.pathname === '/valid' 
  ;

  // Render Header only if it's dashboard or rekapitulasi
  if (!isDashboardOrRekapitulasi) {
    return null;
  }

  return (
    <div>
      <div className='header'>
        <div className='d-flex justify-content-around'>
          <div>
            <img src={Logo1} alt="" />
          </div>
          <div className='d-flex align-items-center'>
            <h2>Sistem Monitoring IKU D3 TI PSDKU Madiun </h2>
          </div>
          <div>
            <img src={Logo2} alt="" />
          </div>
          <div style={{ borderBottom: '3px solid blue' }}></div>
        </div>
      </div>
    </div>
  );
}

export default Header;

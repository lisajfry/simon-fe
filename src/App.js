import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FullLayout from "./layouts/FullLayout.js";
import Starter from "./views/Starter.js";
import About from "./views/About.js";
import Alerts from "./views/ui/Alerts.js";
import Badges from  "./views/ui/Badges.js" ;
import Buttons from "./views/ui/Buttons.js";
import Cards from "./views/ui/Cards.js";
import Grid from "./views/ui/Grid.js";
import Tables from "./views/ui/Tables.js";
import Forms from "./views/ui/Forms.js";
import Breadcrumbs from "./views/ui/Breadcrumbs.js";
import Login from "./views/login/login.js";
import TabelUser from "./views/ui/TabelUser.js";
import Dashboard from "./views/ui/Dashboard.js";
import Rekapitulasi from "./views/ui/Rekapitulasi.js";
import Iku1 from "./views/ui/iku1/Iku1.js";
import Iku7 from "./views/ui/iku7/Iku7.js";
import Iku1List from "./views/ui/iku1/Iku1List.js";
import EditIku1 from "./views/ui/iku1/EditIku1.js";
import Iku1Sesuai from "./views/ui/iku1/Iku1sesuai.js";
import Iku1TidakSesuai from "./views/ui/iku1/Iku1tidaksesuai.js";
import RekapIku1 from "./views/ui/iku1/RekapIku1.js";
import AddIku1 from "./views/ui/iku1/AddIku1.js";
import { RespondenProvider } from './views/ui/iku1/RespondenContext';
import Iku2 from "./views/ui/iku2/Iku2.js";
import MahasiswaList from "./views/ui/mahasiswa/MahasiswaList.js";
import DosenList from "./views/ui/dosen/DosenList.js";
import { MahasiswaProvider } from "./views/ui/mahasiswa/MahasiswaContext.js";
import AddMahasiswa from "./views/ui/mahasiswa/AddMahasiswa.js";
import EditMahasiswa from "./views/ui/mahasiswa/EditMahasiswa.js";
import { DosenProvider } from "./views/ui/dosen/DosenContext.js";
import AddDosen from "./views/ui/dosen/AddDosen.js";
import EditDosen from "./views/ui/dosen/EditDosen.js";
import UserList from "./views/ui/user/UserList.js";
import AddUser from "./views/ui/user/AddUser.js";
import EditUser from "./views/ui/user/EditUser.js";
import { KegiatanProvider } from "./views/ui/iku2/KegiatanContext.js";
import Iku2kegiatanList from "./views/ui/iku2/Iku2kegiatanList.js";
import AddIku2kegiatan from "./views/ui/iku2/AddIku2kegiatan.js";
import EditIku2kegiatan from "./views/ui/iku2/EditIku2kegiatan.js";
import Iku2prestasiList from "./views/ui/iku2/Iku2prestasiList.js";
import AddIku2prestasi from "./views/ui/iku2/AddIku2prestasi.js";
import EditIku2prestasi from "./views/ui/iku2/EditIku2prestasi.js";
import { PrestasiProvider } from "./views/ui/iku2/PrestasiContext.js";
import { Iku3Provider } from "./views/ui/iku3/Iku3Context.js";
import Iku3 from "./views/ui/iku3/Iku3.js";
import LulusanList from "./views/ui/iku1/Lulusan.js";
import Iku6 from "./views/ui/iku6/Iku6.js";
import PertukaranPelajarList from "./views/ui/iku2/Pertukaranpelajar.js";
import Iku3tridharmaList from "./views/ui/iku3/Iku3tridharmaList.js";
import AddIku3tridharma from "./views/ui/iku3/AddIku3tridharma.js";
import EditIku3tridharma from "./views/ui/iku3/EditIku3tridharma.js"; 
import AddIku3praktisi from "./views/ui/iku3/AddIku3praktisi.js";
import Iku3praktisiList from "./views/ui/iku3/Iku3praktisiList.js";
import MahasiswaAktifList from "./views/ui/iku2/MahasiswaAktif.js";
import AddIku2inbound from "./views/ui/iku2/AddIku2inbound.js";
import Iku2inboundList from "./views/ui/iku2/Iku2inboundList.js";
import EditIku2inbound from "./views/ui/iku2/EditIku2inbound.js";
import EditIku3praktisi from "./views/ui/iku3/EditIku3praktisi.js";
import Addiku6 from "./views/ui/iku6/AddIku6.js";
import Iku6List from "./views/ui/iku6/Iku6List.js";
import EditIku6 from "./views/ui/iku6/EditIku6.js";
import Iku4 from "./views/ui/iku4/Iku4.js";
import AddIku4 from "./views/ui/iku4/AddIku4.js";
import Iku4List from "./views/ui/iku4/Iku4List.js";
import EditIku4 from "./views/ui/iku4/EditIku4.js";
import RekapIku4 from "./views/ui/iku4/RekapIku4.js";
import Iku5 from "./views/ui/iku5/Iku5.js";
import AddIku5 from "./views/ui/iku5/AddIku5.js";
import Iku5List from "./views/ui/iku5/Iku5List.js";
import AddDosenpraktisi from "./views/ui/iku4/Dosenpraktisi/AddDosenpraktisi.js";
import DosenpraktisiList from "./views/ui/iku4/Dosenpraktisi/DosenpraktisiList.js";
import AddIku7 from "./views/ui/iku7/AddIku7.js";
import EditIku7 from "./views/ui/iku7/EditIku7.js";
import CountryForm from "./views/ui/iku2/CountryForm.js";
import PrestasiDetail from "./views/ui/iku2/PrestasiDetail.js";
import DosenBerkualifikasiS3 from "./views/ui/iku4/DosenBerkualifikasiS3List.js";
import SertifikasiKompetensiDosen from "./views/ui/iku4/SertifikasiKompetensiDosenList.js";
import PraktisiMenjadiDosenDosen from "./views/ui/iku4/PraktisiMenjadiDosenList.js";




const App = () => {
  return (
    <Router>
        <Routes>
          <Route
            path="/"
            element={
      <RespondenProvider>
        <MahasiswaProvider>
        <DosenProvider>
        <KegiatanProvider>
        <PrestasiProvider>
        <Iku3Provider>
        <FullLayout />
        </Iku3Provider>
        </PrestasiProvider>
        </KegiatanProvider>
        </DosenProvider>
        </MahasiswaProvider>
      </RespondenProvider>}
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/rekapitulasi" element={<Rekapitulasi />}/>
            <Route path="/starter" element={<Starter />} />
            <Route path="/about" element={<About />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/grid" element={<Grid />} />
            <Route path="/table" element={<Tables />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/breadcrumbs" element={<Breadcrumbs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userlist" element={<UserList/>} />
            <Route path="/adduser" element={<AddUser/>} />
            <Route path="/update/user/:id_user" element={<EditUser />} />
            <Route path="/mahasiswalist" element={<MahasiswaList />} />
            <Route path="/addmahasiswa" element={<AddMahasiswa />} />
            <Route path="/update/mahasiswa/:NIM" element={<EditMahasiswa />} />
            <Route path="/adddosen" element={<AddDosen />} />
            <Route path="/update/dosen/:NIDN" element={<EditDosen />} />
            <Route path="/dosenlist" element={<DosenList/>} />
            <Route path="/iku1" element={<Iku1/>} />
            <Route path="/addiku1" element={<AddIku1 />} />
            <Route path="/update/iku1/:iku1_id" element={<EditIku1 />} />
            <Route path="/iku1list" element={<Iku1List />} />
            <Route path="/iku1valid" element={<Iku1Sesuai />} />
            <Route path="/iku1notvalid" element={<Iku1TidakSesuai />} />
            <Route path="/rekapiku1" element={<RekapIku1 />} />
            <Route path="/lulusanlist" element={<LulusanList />} />
            <Route path="/pertukaranpelajarlist" element={<PertukaranPelajarList />} />
            <Route path="/iku2" element={<Iku2/>} />
            <Route path="/mahasiswaaktif" element={<MahasiswaAktifList />} />
            <Route path="/iku2kegiatanlist" element={<Iku2kegiatanList/>} />
            <Route path="/addiku2kegiatan" element={<AddIku2kegiatan />} />
            <Route path="/update/iku2kegiatan/:iku2kegiatan_id" element={<EditIku2kegiatan />} />
            <Route path="/addiku2inbound" element={<AddIku2inbound />} />
            <Route path="/iku2inboundlist" element={<Iku2inboundList />} />
            <Route path="/update/iku2inbound/:iku2inbound_id" element={<EditIku2inbound />} />
            <Route path="/iku2prestasilist" element={<Iku2prestasiList/>} />
            <Route path="/addiku2prestasi" element={<AddIku2prestasi />} />
            <Route path="/update/iku2prestasi/:iku2prestasi_id" element={<EditIku2prestasi />} />
            <Route path="/iku7" element={<Iku7/>} />
            
            <Route path="/addiku7" element={<AddIku7/>} />
            <Route path="/update/iku7/:iku7_id" element={<EditIku7/>} />
            <Route path="/iku3tridharmalist" element={<Iku3tridharmaList/>} />
           <Route path="/addiku3tridharma" element={<AddIku3tridharma />} />
            <Route path="/update/iku3tridharma/:iku3tridharma_id" element={<EditIku3tridharma />} />
            <Route path="/iku3praktisilist" element={<Iku3praktisiList/>} />
           <Route path="/addiku3praktisi" element={<AddIku3praktisi />} /> 
           <Route path="/update/iku3praktisi/:iku3praktisi_id" element={<EditIku3praktisi />} />
            <Route path="/iku3" element={<Iku3 />} />
            <Route path="/iku6" element={<Iku6/>} />
            <Route path="/iku6list" element={<Iku6List/>} />
            <Route path="/addiku6" element={<Addiku6/>} />
            <Route path="/update/iku6/:iku6_id" element={<EditIku6/>} />
            <Route path="/iku4" element={<Iku4/>} />
            <Route path="/addiku4" element={<AddIku4 />} />
            <Route path="/iku4list" element={<Iku4List/>} />
            <Route path="/editiku4" element={<EditIku4/>} />
            <Route path="/rekapiku4" element={<RekapIku4/>} />
            <Route path="/iku5" element={<Iku5/>} />
            <Route path="/addiku5" element={<AddIku5/>} />
            <Route path="/iku5list" element={<Iku5List/>} />
            <Route path="/adddosenpraktisi" element={<AddDosenpraktisi/>} />
            <Route path="/dosenpraktisilist" element={<DosenpraktisiList/>} />
            <Route path="/country-form" element={<CountryForm />} />
            <Route path="/prestasidetail/:iku2prestasi_id" component={PrestasiDetail} />
            <Route path="/dosenberkualifikasis3" element={<DosenBerkualifikasiS3/>} />
            <Route path="/sertifikasikompetensidosen" element={<SertifikasiKompetensiDosen/>} />
            <Route path="/praktisimenjadidosen" element={<PraktisiMenjadiDosenDosen/>} />
          </Route>
        </Routes>
    </Router>
  );
};

export default App;

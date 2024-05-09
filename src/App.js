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
import AddIku3 from "./views/ui/iku3/AddIku3.js";
import EditIku3 from "./views/ui/iku3/EditIku3.js";
import Iku3List from "./views/ui/iku3/Iku3List.js";
import Iku3 from "./views/ui/iku3/Iku3.js";
import { Iku3Provider } from "./views/ui/iku3/Iku3Context.js";
import LulusanList from "./views/ui/iku1/Lulusan.js";
import Iku6 from "./views/ui/iku6/Iku6.js";
import PertukaranPelajarList from "./views/ui/iku2/Pertukaranpelajar.js";
import Iku7List from "./views/ui/iku7/Iku7List.js";



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
            <Route path="/iku2kegiatanlist" element={<Iku2kegiatanList/>} />
            <Route path="/addiku2kegiatan" element={<AddIku2kegiatan />} />
            <Route path="/update/iku2kegiatan/:iku2kegiatan_id" element={<EditIku2kegiatan />} />
            <Route path="/iku2prestasilist" element={<Iku2prestasiList/>} />
            <Route path="/addiku2prestasi" element={<AddIku2prestasi />} />
            <Route path="/update/iku2prestasi/:iku2prestasi_id" element={<EditIku2prestasi />} />
            <Route path="/iku7" element={<Iku7/>} />
            <Route path="/iku7list" element={<Iku7List/>} />
            <Route path="/iku3" element={<Iku3/>} />
           <Route path="/addiku3" element={<AddIku3 />} />
            <Route path="/update/iku3/:iku3_id" element={<EditIku3 />} />
            <Route path="/iku3list" element={<Iku3List />} />
            <Route path="/iku6" element={<Iku6/>} />
          </Route>
        </Routes>
    </Router>
  );
};

export default App;

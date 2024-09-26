import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Aboutus from './Pages/Aboutus';
import Packages from './Pages/Packages';
import Staff from './Pages/Staff';
import Events from './Pages/Events';
import Payment from './Pages/Payment';


import Signin from './Pages/Signin';
import Beginner from './Pages/Beginner';
import Intermidiate from './Pages/Intermidiate';
import Advanced from './Pages/Advanced';
import Bookpackage from './Pages/Bookpackage';
import Bookingdetails from './Booking/Bookingdetails';
import Viewbooking from './Booking/Viewbooking';
import Booking from './Booking/Booking';
import Updatebooking from './Booking/Updatebooking';
import Bookingdescription from './Booking/Bookingdescription';
import Support from './Pages/Support';
import Lessondetails from './Lessons/Lessondetails';
import Viewlesson from './Lessons/Viewlesson';
import Lesson from './Lessons/Lesson';
import Updatelesson from './Lessons/Updatelesson';
import Lessondescription from './Lessons/Lessondescription';
import Lessonnav from './Lessons/Lessonnav';
import Addlesson from './Lessons/Addlesson';
import Upcoming from './Pages/Upcoming';
import RegisterStu from './Pages/RegisterStu';
import Studentnav from './Students/Studentnav';
import Studentdescription from './Students/Studentdescription';
import Staffm from './Staff/Staffm';
import Staffdetails from './Staff/Staffdetails';
import Staffnavi from './Staff/Staffnavi';
import Viewstaff from './Staff/Viewstaff';
import Staffdescription from './Staff/Staffdescription';
import Addstaff from './Staff/Addstaff';
import Upstaff from './Staff/Upstaff';
import AdminHome from './Dashboard/AdminHome';
import Surfboard from './Sales/Surfboard';

import ETable from './Equipment/ETable';
import EsupplierAdd from './Equipment/EsupplierAdd';
import ESupdate from './Equipment/ESupdate';

import Tab from './Supplier/Table';
import SupplierAdd from './Supplier/supplierAdd';
import Supupdate from './Supplier/Supdate';
import Order from './Supplier/order';

import Addoder from './Sales/Addoder';
import Oderdescription from './Sales/Oderdescription';
import Oder from './Sales/Oder';
import Odernav from './Sales/Odernav';
import Updateoder from './Sales/Updateoder';
import Oderdetail from './Sales/Oderdetail';
import Viewoder from './Sales/Viewoder';
import LessonList from './Lessons/Lessonlist';
import Student from './Students/Student';
import Viewstudent from './Students/Viewstudent';
import Addstudent from './Students/Addstudent';
import Studentdetails from './Students/Studentdetails';
import UpdateStudent from './Students/Updatestudent';
import Adminlogin from './Components/Adminlogin';
import Eqnav from './Equipment/Eqnav';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main pages */}
        <Route path='' element={<Home />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/packages' element={<Packages />} />
        <Route path='/staff' element={<Staff />} />
        <Route path='/events' element={<Events />} />
        <Route path='/payment' element={<Payment />} />
        
     
        <Route path='/signin' element={<Signin />} />
        <Route path='/RegisterStu' element={<RegisterStu />} />
        <Route path='/beginner' element={<Beginner />} />
        <Route path='/intermediate' element={<Intermidiate />} />
        <Route path='/advanced' element={<Advanced />} />
        <Route path='/bookpackage' element={<Bookpackage />} />
        <Route path='/support' element={<Support />} />
        <Route path='/adminlogin' element={<Adminlogin />} />

        {/* Booking pages */}
        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/bookingdetails' element={<Bookingdetails />} />
        <Route path='/viewbooking' element={<Viewbooking />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/bookingdetails/:id' element={<Updatebooking />} />
        <Route path='/bookingdescription' element={<Bookingdescription />} />

        {/* Lesson pages */}
        <Route path='/lessondetails' element={<Lessondetails />} />
        <Route path='/addlesson' element={<Addlesson />} />
        <Route path='/viewlesson' element={<Viewlesson />} />
        <Route path='/lesson' element={<Lesson />} />
        <Route path='/lessonnav' element={<Lessonnav />} />
        <Route path='/updatelesson/:id' element={<Updatelesson />} />
        <Route path='/lessondescription' element={<Lessondescription />} />
        <Route path='/upcoming' element={<Upcoming />} />
        <Route path='/lessonlist' element={<LessonList />} />

        {/* Staff pages */}
        <Route path='/staffm' element={<Staffm />} />
        <Route path='/staffnavi' element={<Staffnavi />} />
        <Route path='/viewstaff' element={<Viewstaff />} />
        <Route path='/staffdescription' element={<Staffdescription />} />
        <Route path='/staffdetails' element={<Staffdetails />} />
        <Route path='/addstaff' element={<Addstaff />} />
        <Route path='/upstaff/:id' element={<Upstaff />} />

        {/* Sales pages */}
        <Route path='/surfboard' element={<Surfboard />} />
        <Route path='/addoder' element={<Addoder />} />
        <Route path='/oderdescription' element={<Oderdescription />} />
        <Route path='/oder' element={<Oder />} />
        <Route path='/odernav' element={<Odernav />} />
        <Route path='/updateoder/:id' element={<Updateoder />} />
        <Route path='/oderdetail' element={<Oderdetail />} />
        <Route path='/viewoder' element={<Viewoder />} />

        {/* Equipment pages */}
        <Route path='/Etable' element={<ETable />} />
        <Route path='/Eadd' element={<EsupplierAdd />} />
        <Route path='/Eupdate/:upId' element={<ESupdate />} />
        <Route path='/eqnav' element={<Eqnav />} />

        {/* Supplier pages */}
        <Route path='/table' element={<Tab />} />
        <Route path='/add' element={<SupplierAdd />} />
        <Route path='/update/:upId' element={<Supupdate />} />
        <Route path='/order' element={<Order />} />

        {/* Student pages */}
        <Route path='/studentnav' element={<Studentnav />} />
        <Route path='/studentdescription' element={<Studentdescription />} />
        <Route path='/student' element={<Student />} />
        <Route path='/Viewstudent' element={<Viewstudent />} />
        <Route path='/addstudent' element={<Addstudent />} />
        <Route path='/studentdetails' element={<Studentdetails />} />
        <Route path='/updateStudent/:id' element={<UpdateStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

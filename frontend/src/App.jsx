import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Aboutus from './Pages/Aboutus';
import Packages from './Pages/Packages';
import Staff from './Pages/Staff';
import Events from './Pages/Events';
import Payment from './Pages/Payment';
import Equipments from './Pages/Equipments';
import Supplier from './Pages/Supplier';
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


import Student from './Students/Student';
import Viewstudent from './Students/Viewstudent';
import Addstudent from './Students/Addstudent';
import Studentdetails from './Students/Studentdetails';
import UpdateStudent from './Students/Updatestudent';
import AdminHome from './Dashboard/AdminHome';






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
        <Route path='/equipments' element={<Equipments />} />
        <Route path='/supplier' element={<Supplier />} />
        <Route path='/signin' element={<Signin />} />
        <Route path="/RegisterStu" element={<RegisterStu />} />
        <Route path='/beginner' element={<Beginner />} />
        <Route path='/intermediate' element={<Intermidiate />} />
        <Route path='/advanced' element={<Advanced />} />
        <Route path='/bookpackage' element={<Bookpackage />} />
        <Route path='/support' element={<Support />} />
       
        
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

        {/* student pages */}
        <Route path='/studentnav' element={<Studentnav/>} />
        <Route path='/studentdescription ' element={<Studentdescription />} />
       <Route path='/student' element={<Student />} />
        <Route path='/Viewstudent' element={<Viewstudent />} />
        <Route path='/addstudent' element={<Addstudent/>} />
        <Route path='/studentdetails' element={<Studentdetails />} />
        <Route path='/updateStudent/:id' element={<UpdateStudent />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

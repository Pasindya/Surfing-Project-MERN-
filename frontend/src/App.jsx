import{BrowserRouter, Routes, Route}from 'react-router-dom';
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
import Staffm from './Staff/Staffm';
import Staffdetails from './Staff/Staffdetails';
import Staffnavi from './Staff/Staffnavi';
import Viewstaff from './Staff/Viewstaff';
import Staffdescription from './Staff/Staffdescription';
import Addstaff from './Staff/Addstaff';
import Upstaff from './Staff/Upstaff';
import AdminHome from './Dashboard/AdminHome';
import Surfboard from './Sales/Surfboard';
import Staffinfo from './Staff/Staffinfo';



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      //main pages
      <Route path ='' element={<Home/>}/>
      <Route path ='/aboutus' element={<Aboutus/>}/>
      <Route path ='/packages' element={<Packages/>}/>
      <Route path ='/staff' element={<Staff/>}/>
      <Route path ='/events' element={<Events/>}/>
      <Route path ='/payment' element={<Payment/>}/>
      <Route path ='/equipments' element={<Equipments/>}/>
      <Route path ='/supplier' element={<Supplier/>}/>
      <Route path ='/signin' element={<Signin/>}/>
      <Route path ='/beginner' element={<Beginner/>}/>
      <Route path ='/intermediate' element={<Intermidiate/>}/>
      <Route path ='/advanced' element={<Advanced/>}/>
      <Route path ='/bookpackage' element={<Bookpackage/>}/>
      <Route path ='/support' element={<Support/>}/>



//Booking pages
      <Route path ='/adminhome' element={<AdminHome/>}/>
      <Route path ='/bookingdetails' element={<Bookingdetails/>}/>
      <Route path ='/viewbooking' element={<Viewbooking/>}/>
      <Route path ='/booking' element={<Booking/>}/>
      <Route path ='/bookingdetails/:id' element={<Updatebooking/>}/>
      <Route path ='/bookingdescription' element={<Bookingdescription/>}/>

      //Lesson pages
      
      <Route path ='/lessondetails' element={<Lessondetails/>}/>
     < Route path ='/addlesson' element={<Addlesson/>}/>
      <Route path ='/viewlesson' element={<Viewlesson/>}/>
      <Route path ='/lesson' element={<Lesson/>}/>
      <Route path ='/lessonnav' element={<Lessonnav/>}/>
      <Route path ='/updatelesson/:id' element={<Updatelesson/>}/>
      <Route path ='/lessondescription' element={<Lessondescription/>}/>
      <Route path ='/upcoming' element={<Upcoming/>}/>
      
      //Staff
      <Route path='/staffm' element={<Staffm />} />
      <Route path='/staffnavi' element={<Staffnavi />} />
      <Route path='/viewstaff' element={<Viewstaff />} />
      <Route path='/staffdescription' element={<Staffdescription />} />
      <Route path="/staffdetails" element={<Staffdetails />} />
      <Route path='/addstaff' element={<Addstaff />} />  
      <Route path="/updatestaff/:id" element={<Upstaff />} />
      <Route path='/staffinfo' element={<Staffinfo />} />

      
      //Staffdetails
      <Route path='/surfboard' element={<Surfboard />} />  

      
    </Routes>
    </BrowserRouter>
    
  )
}

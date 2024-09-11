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
import Adminhome from './Dashboard/Adminhome';
import Support from './Pages/Support';
import Lessondetails from './Lessons/Lessondetails';
import Lessondescription from './Lessons/Lessondescription';
import Lessonnav from './Lessons/Lessonnav';
import Viewlesson from './Lessons/Viewlesson';
import Updatelesson from './Lessons/Updatelesson';
import Shedulelesson from './Lessons/Shedulelesson';
import Lessonplan from './Lessons/Lessonplan';
import Upcoming from './Pages/Upcoming';

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
      <Route path ='/adminhome' element={<Adminhome/>}/>
      <Route path ='/bookingdetails' element={<Bookingdetails/>}/>
      <Route path ='/viewbooking' element={<Viewbooking/>}/>
      <Route path ='/booking' element={<Booking/>}/>
      <Route path ='/bookingdetails/:id' element={<Updatebooking/>}/>
      <Route path ='/bookingdescription' element={<Bookingdescription/>}/>


      //lesson pages
      <Route path ='/lessondetails' element={<Lessondetails/>}/>
      <Route path ='/lessondescription' element={<Lessondescription/>}/>
      <Route path ='/lessonnav' element={<Lessonnav/>}/>
      <Route path ='/viewlesson' element={<Viewlesson/>}/>
      <Route path ='/updatelesson' element={<Updatelesson/>}/>
      <Route path ='/shedulelesson' element={<Shedulelesson/>}/>
      <Route path ='/lessonplan' element={<Lessonplan/>}/>
      <Route path ='/upcoming' element={<Upcoming/>}/>

    </Routes>
    </BrowserRouter>
  )
}

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
import Viewlesson from './Lessons/Viewlesson';
import Lesson from './Lessons/Lesson';
import Updatelesson from './Lessons/Updatelesson';
import Lessondescription from './Lessons/Lessondescription';
import Lessonnav from './Lessons/Lessonnav';
import Addlesson from './Lessons/Addlesson';
import Upcoming from './Pages/Upcoming';
import Boardsurf from './Event/Boardsurf';
import Boatsurf from './Event/Boatsurf';
import Windsurf from './Event/Windsurf';
import Specialsurf from './Event/Specialsurf';
import Eventregister from './Event/Eventregister';
import Viewevent from './Event/Viewevent';
import Updateevent from './Event/Updateevent';
import Notification from './Event/Notification';
import Report from './Event/Report';

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
        <Route path='/beginner' element={<Beginner />} />
        <Route path='/intermediate' element={<Intermidiate />} />
        <Route path='/advanced' element={<Advanced />} />
        <Route path='/bookpackage' element={<Bookpackage />} />
        <Route path='/support' element={<Support />} />

        {/* Booking pages */}
        <Route path='/adminhome' element={<Adminhome />} />
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

        {/* Event pages */}
        <Route path='/boardsurf' element={<Boardsurf />} />
        <Route path='/boatsurf' element={<Boatsurf />} />
        <Route path='/windsurf' element={<Windsurf />} />
        <Route path='/specialsurf' element={<Specialsurf />} />
        <Route path='/eventregister' element={<Eventregister />} />
        <Route path='/viewevent/:eventId' element={<Viewevent />} />
        <Route path='/updateevent' element={<Updateevent />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/report' element={<Report/>}/>
      </Routes>
    </BrowserRouter>
  );
}

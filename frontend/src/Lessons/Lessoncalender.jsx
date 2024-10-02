import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

const URL = "http://localhost:5009/lessons"; // Adjust the URL as necessary

const fetchLessons = async () => {
    try {
        const response = await axios.get(URL);
        return response.data.lessons || []; // Return lessons if available
    } catch (error) {
        console.error("Error fetching lessons:", error);
        return []; // Return an empty array in case of error
    }
};

export default function LessonCalendar() {
    const [lessons, setLessons] = useState([]);
    const [markedDates, setMarkedDates] = useState([]);

    useEffect(() => {
        const getLessons = async () => {
            const fetchedLessons = await fetchLessons();
            setLessons(fetchedLessons);
            // Prepare an array of dates to mark
            const dates = fetchedLessons.map(lesson => new Date(lesson.date)); // Assuming `lesson.date` is the date of the lesson
            setMarkedDates(dates);
        };

        getLessons();
    }, []);

    const tileClassName = ({ date }) => {
        // Mark dates that have scheduled lessons
        if (markedDates.find(markedDate => markedDate.toDateString() === date.toDateString())) {
            return 'highlight'; // Add a class for highlighting
        }
        return null;
    };

    return (
        <div className="calendar-container">
            <h2 className="text-2xl font-bold mb-4">Scheduled Lessons Calendar</h2>
            <Calendar
                tileClassName={tileClassName}
                className="react-calendar"
            />
            <style jsx>{`
                .highlight {
                    background: lightblue !important; /* Customize the highlight color */
                }
            `}</style>
        </div>
    );
}

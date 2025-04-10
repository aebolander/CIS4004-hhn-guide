import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Houses() {
    const [events, setEvents] = useState([]);
    const [houses, setHouses] = useState([]);
    const [visits, setVisits] = useState([]);
    const redirect = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/show_events')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                return response.json();
            })
            .then((data) => setEvents(data.events))
            .catch((error) => {
                console.error('Error fetching events:', error);
                alert('Error fetching data from show_events');
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/show_houses')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch houses');
                }
                return response.json();
            })
            .then((data) => {
                setHouses(data.houses);
            })
            .catch((error) => {
                console.error('Error fetching houses:', error);
                alert('Error fetching data from show_houses');
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/show_houses_by_person')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch visits');
                }
                return response.json();
            })
            .then((data) => {
                setVisits(data.houses_by_person);
            })
            .catch((error) => {
                console.error('Error fetching visits:', error);
                alert('Error fetching data from houses_by_person!');
            });
    }, []);

    const visitChange = async (houseId, change) => {
        try {
            const response = await fetch('http://localhost:8000/increment_visit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    person_id: 3,
                    house_id: houseId,
                    visit_count: change,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setVisits((prevVisits) =>
                    prevVisits.map((visit) =>
                        visit.house_id === houseId
                            ? { ...visit, visit_count: visit.visit_count + change }
                            : visit
                    )
                );
            } else {
                console.error('Error updating visit count:', data.error);
                alert(`Error updating visit count: ${data.error}`);
            }
        } catch (error) {
            console.error('Error updating visit count:', error);
            alert('An error occurred while updating the visit count.');
        }

        redirect("/houses");
    };


    return (
        <div>
            <Navbar />
            <h1>Event List</h1>
            <ol>
                {events.map((event) => (
                    <li key={event.event_id}>
                        &ensp;{event.event_name} &ensp;|&ensp; {event.event_year}
                    </li>
                ))}
            </ol>
            <h1>House Visits</h1>
            <table>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>House</th>
                        <th># of Visits</th>
                    </tr>
                </thead>
                <tbody>
                    {houses.map((house) => {
                        const visit = visits.find((v) => v.house_id === house.house_id);
                        const visitCount = visit ? visit.visit_count : 0;

                        return (
                            <tr key={house.house_id}>
                                <td>{house.event_id}</td>
                                <td>{house.house_name}</td>
                                <td><button onClick={() => visitChange(house.house_id, 1)}>+</button>
                                &ensp;{visitCount}&ensp;<button onClick={() => visitChange(house.house_id, -1)}>-</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Houses;
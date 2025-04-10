import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Scarezones() {
  const [events, setEvents] = useState([]);
  const [scarezones, setScarezones] = useState([]);
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
    fetch('http://localhost:8000/show_scarezones')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch scarezones');
        }
        return response.json();
      })
      .then((data) => {
        setScarezones(data.scarezones);
      })
      .catch((error) => {
        console.error('Error fetching scarezones:', error);
        alert('Error fetching data from show_scarezones');
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/show_scarezones_by_person')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch visits');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the fetched data
        setVisits(data.scarezones_by_person || []);
      })
      .catch((error) => {
        console.error('Error fetching visits:', error);
        alert('Error fetching data from scarezones_by_person!');
      });
  }, []);

  const visitChange = async (scarezoneId, change) => {
    try {
      const response = await fetch('http://localhost:8000/increment_scarezone_visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          person_id: 3,
          scarezone_id: scarezoneId,
          visit_count: change,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVisits((prevVisits) =>
          prevVisits.map((visit) =>
            visit.scarezone_id === scarezoneId
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

    redirect("/scarezones");
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
      <h1>Scarezone Visits</h1>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Scarezone</th>
            <th># of Visits</th>
          </tr>
        </thead>
        <tbody>
          {scarezones.map((scarezone) => {
            const visit = visits ? visits.find((v) => v.scarezone_id === scarezone.scarezone_id) : null;
            const visitCount = visit ? visit.visit_count : 0;

            return (
              <tr key={scarezone.scarezone_id}>
                <td>{scarezone.event_id}</td>
                <td>{scarezone.scarezone_name}</td>
                <td>
                  <button onClick={() => visitChange(scarezone.scarezone_id, 1)}>+</button>
                  &ensp;{visitCount}&ensp;
                  <button onClick={() => visitChange(scarezone.scarezone_id, -1)}>-</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Scarezones;
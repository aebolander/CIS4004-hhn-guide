import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Shows() {
  const [events, setEvents] = useState([]);
  const [shows, setShows] = useState([]);
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
    fetch('http://localhost:8000/show_shows')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }
        return response.json();
      })
      .then((data) => {
        setShows(data.shows);
      })
      .catch((error) => {
        console.error('Error fetching shows:', error);
        alert('Error fetching data from show_shows');
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/show_shows_by_person')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch visits');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the fetched data
        setVisits(data.shows_by_person || []);
      })
      .catch((error) => {
        console.error('Error fetching visits:', error);
        alert('Error fetching data from shows_by_person!');
      });
  }, []);

  const visitChange = async (showId, change) => {
    try {
      const response = await fetch('http://localhost:8000/increment_show_visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          person_id: 3,
          show_id: showId,
          visit_count: change,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVisits((prevVisits) =>
          prevVisits.map((visit) =>
            visit.show_id === showId
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

    redirect("/shows");
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
      <h1>Show Visits</h1>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Shows</th>
            <th># of Visits</th>
          </tr>
        </thead>
        <tbody>
          {shows.map((show) => {
            const visit = visits ? visits.find((v) => v.show_id === show.show_id) : null;
            const visitCount = visit ? visit.visit_count : 0;

            return (
              <tr key={show.show_id}>
                <td>{show.event_id}</td>
                <td>{show.show_name}</td>
                <td>
                  <button onClick={() => visitChange(show.show_id, 1)}>+</button>
                  &ensp;{visitCount}&ensp;
                  <button onClick={() => visitChange(show.show_id, -1)}>-</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Shows;
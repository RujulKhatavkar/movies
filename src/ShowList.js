import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (showId) => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
      const { id, summary } = response.data;
      // Perform any further processing or pass the id and summary to the appropriate component
      console.log(`Clicked show id: ${id}`);
      console.log(`Summary: ${summary}`);
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  };
  function convertTo12Hour(time) {
  // Split the time string into hours and minutes
  const [hours, minutes] = time.split(':');

  // Convert the hours to a number
  let hour = parseInt(hours);

  // Determine if it's AM or PM
  const suffix = hour >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hour = hour % 12 || 12;

  // Create the new time string in 12-hour format
  const convertedTime = `${hour}:${minutes} ${suffix}`;

  return convertedTime;
}


  return (
    <div>
    <section class="dark">
    <div class="container py-4">
      <h1 id="pageHeaderTitle">Movies </h1>
      <ul style={{ listStyleType: 'none' }}>
        {shows.map((show) => (
          <li key={show.show.id}>
          <article class="postcard dark blue">

			<a class="postcard__img_link" href="/">
				<img class="postcard__img" src={show.show.image.medium} alt="Image Title" />
			</a>
			<div class="postcard__text">
				<h1 class="postcard__title blue"><a href="#">{show.show.name}</a></h1>

				<div class="postcard__bar"></div>
				<ul class="postcard__tagbox">
        <li class="tag__item">{show.show.genres.join(', ')}</li>

        <li class="tag__item">{convertTo12Hour(show.show.schedule.time)}</li>
					<li class="tag__item play blue">
						<a href="#">
            <Link class="postcard__img_link" to={`/details/${show.show.id}`} sum={show.show.summary} onClick={() => handleClick(show.show.id)}>View Details</Link></a>
					</li>
				</ul>
			</div>

		</article>
          </li>
        ))}
      </ul>
      </div>
      </section>
    </div>
  );
}

export default ShowList;

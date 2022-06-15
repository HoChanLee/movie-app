import { useState, useEffect } from 'react'
import Movie from '../components/Movie'
import styles from '../components/Movie.module.css'

function Home () {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year')
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <ul className={styles.movies_wrap}>
          {movies.map((movie) =>
            <Movie
              key={movie.id}
              id={movie.id}
              titleEnglish={movie.title_english}
              mediumCoverImage={movie.medium_cover_image}
              summary={movie.summary}
              genres={movie.genres}
            />
          )}
        </ul>
      )}
    </div>
  )
}

export default Home;
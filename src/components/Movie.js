import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import styles from '../components/Movie.module.css'

function Movie({ id, titleEnglish, mediumCoverImage, summary, genres }) {
  return (
    <li className={styles.movies} key={id}>
      <img className={styles.movies_img} src={mediumCoverImage} alt={titleEnglish}></img>
      <div className={styles.movies_con}>
        <h2 className={styles.movies_tit}><Link to={`/movie/${id}`}>{titleEnglish}</Link></h2>
        <p className={styles.movies_summary}>{summary.length > 330 ? `${summary.slice(0, 329)}...` : summary }</p>
        <ul className={styles.movies_genres_wrap}>
          {genres.map((g, index) => <li className={styles.movies_genres} key={index}>{g}</li>)}
        </ul>
      </div>
    </li>
  );
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  titleEnglish: PropTypes.string.isRequired,
  mediumCoverImage: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  summary: PropTypes.string,
}

export default Movie;
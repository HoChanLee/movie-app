import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from '../components/Movie.module.css';

function Detail () {
    const [loading, setLoading] = useState(true);
    const [mData, setMData] = useState([]);
    const {id} = useParams();
    const getMovie = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMData(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getMovie();
    }, [])
    return (
        <div>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <div className={styles.detail}>
                    <strong className={styles.detail_back}><Link to={"/"}>back home</Link></strong>
                    <div className={styles.detail_wrap}>
                        <img className={styles.detail_img} src={mData.large_cover_image} alt={mData.title_english}></img>
                        <div className={styles.detail_con}>
                            <h1 className={styles.detail_tit}>{mData.title_english} ({mData.year})</h1>
                            <p className={styles.detail_description}>{mData.description_full}</p>
                            <em className={styles.detail_genres_txt}>genres</em>
                            <ul className={styles.detail_genres_wrap}>
                                {mData.genres.map((genres) => <li className={styles.detail_genres}>{genres}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Detail;
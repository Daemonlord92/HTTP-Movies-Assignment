
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {

    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(result => {
                setMovie(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [props.match.params.id])

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleStars = e => {
        setMovie({
            ...movie,
            stars:[e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(result => {
                console.log(result.data)
                props.history.push(`/`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='update-form'>
            <form onSubmit={handleSubmit} className='edit-form'>
                <h1>Update Movie</h1>
                <label>Title:</label>
                <input
                    type='text'
                    name='title'
                    placeholder='New Title'
                    value={movie.title}
                    onChange={handleChange}
                />

                <label>Director:</label>
                <input
                    type='text'
                    name='director'
                    placeholder='New Title'
                    value={movie.director}
                    onChange={handleChange}
                />

                <label>Metascore:</label>
                <input
                    type='text'
                    name='metascore'
                    placeholder='New Metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                />

                <label>Stars:</label>
                <input
                    type='text'
                    name='stars'
                    placeholder='New Stars'
                    value={movie.stars}
                    onChange={handleStars}
                />
                <button className='update-button'>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
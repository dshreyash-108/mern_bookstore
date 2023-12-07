import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md'
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    useEffect(() => {
        setLoading(true);
        axios
            .get("https://super-space-acorn-v9wxvwvw56g2p4gj-5555.app.github.dev/books")
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            }
            )
    }, [])
    return (
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                <button
                    onClick={() => setShowType('table')}>
                        Table
                </button>
                <button
                    onClick={() => setShowType('card')}>
                        Card
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books list</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (showType === 'table' ? < BooksTable books={books} />: <BooksCard books={books} />)
            }
        </div>
    )
}

export default Home
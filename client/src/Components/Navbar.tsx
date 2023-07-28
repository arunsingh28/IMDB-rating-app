import React, { useState, useRef } from 'react'
import { useAppDispatch } from '../Redux/hooks'
import { changeSeach } from '../Redux/slice/search.slice'
import Favourite from './Favourite'


const Navbar = () => {

    const dispatch = useAppDispatch()

    const [searchTxt, setSearchTxt] = useState<string>('')


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSeach({
            text: e.target.value
        }))
        setSearchTxt(e.target.value)
    }
    const FavDivRef = useRef<HTMLDivElement>(null)
    const [openFavMenu, setOpenFavMenu] = useState<boolean>(false)

    const handleFavMenu = () => { }

    return (
        <div>
            <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">

                <div className="flex items-center justify-between mb-4 md:mb-0">
                    <h1 className="leading-none text-2xl text-grey-darkest">
                        <a className="no-underline text-gray-700 hover:text-black font-poppins" href="#">
                            IMDB
                        </a>
                    </h1>
                </div>

                <div className="mb-4 w-full md:mb-0 md:w-1/4">
                    <input className="border-2 p-2 rounded-lg w-full font-poppins text-gray-700 outline-blue-500"
                        value={searchTxt}
                        onChange={handleChange}
                        placeholder="Search movies" type="text" />
                </div>

                <button className='bg-blue-500 p-2 rounded-md w-full mb-3 text-gray-50 border-blue-400 hover:bg-blue-600
                 xl:w-auto lg:w-auto xl:mb-auto lg:mb-auto' onClick={handleFavMenu}>Favourites</button>
            </header>
            <div className='absolute top-0 right-0' ref={FavDivRef}>
                <Favourite />
            </div>
        </div>
    )
}

export default Navbar
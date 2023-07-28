import React, { useState, useRef, useEffect } from 'react'
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

    const closeFavDiv = (event: MouseEvent) => {
        // Check if the click target is outside the FavDiv
        if (FavDivRef.current && !FavDivRef.current.contains(event.target as Node)) {
            setOpenFavMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeFavDiv)
        return () => {
            document.removeEventListener('mousedown', closeFavDiv);
        };
    }, [])

    const handleFavMenu = () => {
        setOpenFavMenu(true)
    }

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

                <button className='bg-blue-500 flex items-center gap-2 font-poppins p-2 rounded-md w-full mb-3 text-gray-50 border-blue-400 hover:bg-blue-600
                 xl:w-auto lg:w-auto xl:mb-auto lg:mb-auto' onClick={handleFavMenu}>
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.303 12C26.9472 12 26.5951 12.0714 26.2674 12.2098C25.9397 12.3483 25.643 12.551 25.395 12.806L25.002 13.211L24.605 12.806C24.3569 12.551 24.0603 12.3484 23.7326 12.21C23.4049 12.0716 23.0527 12.0003 22.697 12.0003C22.3413 12.0003 21.9891 12.0716 21.6614 12.21C21.3337 12.3484 21.0371 12.551 20.789 12.806C20.2831 13.3283 20.0003 14.0269 20.0003 14.754C20.0003 15.4811 20.2831 16.1797 20.789 16.702L25.002 21L29.211 16.702C29.7169 16.1797 29.9997 15.4811 29.9997 14.754C29.9997 14.0269 29.7169 13.3283 29.211 12.806C28.963 12.551 28.6663 12.3483 28.3386 12.2098C28.0109 12.0714 27.6588 12 27.303 12ZM2 30H4V25C4.00159 23.6744 4.52888 22.4036 5.46622 21.4662C6.40356 20.5289 7.6744 20.0016 9 20H15C16.3256 20.0016 17.5964 20.5289 18.5338 21.4662C19.4711 22.4036 19.9984 23.6744 20 25V30H22V25C21.9979 23.1441 21.2597 21.3649 19.9474 20.0526C18.6351 18.7403 16.8559 18.0021 15 18H9C7.14413 18.0021 5.36489 18.7403 4.05259 20.0526C2.7403 21.3649 2.00212 23.1441 2 25V30ZM12 4C12.9889 4 13.9556 4.29324 14.7779 4.84265C15.6001 5.39206 16.241 6.17295 16.6194 7.08658C16.9978 8.00021 17.0969 9.00555 16.9039 9.97545C16.711 10.9454 16.2348 11.8363 15.5355 12.5355C14.8363 13.2348 13.9454 13.711 12.9755 13.9039C12.0055 14.0969 11.0002 13.9978 10.0866 13.6194C9.17295 13.241 8.39206 12.6001 7.84265 11.7779C7.29324 10.9556 7 9.98891 7 9C7 7.67392 7.52678 6.40215 8.46447 5.46447C9.40215 4.52678 10.6739 4 12 4ZM12 2C10.6155 2 9.26215 2.41054 8.11101 3.17971C6.95986 3.94888 6.06266 5.04213 5.53284 6.32122C5.00303 7.6003 4.86441 9.00777 5.1345 10.3656C5.4046 11.7235 6.07128 12.9708 7.05025 13.9497C8.02922 14.9287 9.2765 15.5954 10.6344 15.8655C11.9922 16.1356 13.3997 15.997 14.6788 15.4672C15.9579 14.9373 17.0511 14.0401 17.8203 12.889C18.5895 11.7378 19 10.3845 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" fill="white" />
                    </svg>
                    Favourites</button>
            </header>
            <div className={openFavMenu ? 'fixed  top-0 right-0 transition-transform duration-100 translate-x-0 z-10' : 'fixed top-0 right-0 transition-transform duration-100 translate-x-full'}>
                {openFavMenu && <Favourite setOpenFavMenu={setOpenFavMenu} changeEvent={openFavMenu} />}
            </div>
        </div>
    )
}

export default Navbar
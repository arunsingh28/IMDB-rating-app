import React, { useEffect, useState } from 'react'
import { OMDB } from './Workspace'
import { addToFav, removeFromFav } from '../http/axios'
import { toast } from 'react-toastify'

interface MovieProps {
    movieData: OMDB[] | undefined,
    direction: string
}

const MovieCard = ({ movieData, direction }: MovieProps) => {

    const [favorites, setFavorites] = useState<OMDB[]>(movieData || []);

    useEffect(() => {
        if (movieData) {
            setFavorites(movieData)
        }
    }, [])

    const addToFavList = async (data: OMDB) => {
        const isAddedd = await addToFav(data)
        if (isAddedd.data) {
            // update fav icon to red
            setFavorites((prevFavorites) =>
                prevFavorites.map((item) =>
                    item.OMDBID === data.OMDBID ? { ...item, fav: true } : item
                )
            );
            toast.success(`${data.Title} is added successfully`, {
                position: 'bottom-left',
                theme: 'dark'
            })
        } else {
            const isRemove = await removeFromFav(data.OMDBID)
            if (isRemove.data) {
                setFavorites((prevFavorites) =>
                    prevFavorites.map((item) =>
                        item.OMDBID === data.OMDBID ? { ...item, fav: false } : item
                    )
                );
                toast.success(`${data.Title} is remove from favourites`, {
                    position: 'bottom-left',
                    theme: 'dark'
                })
            }
        }
    }

    return (
        <div className={`flex flex-wrap gap-4 mx-10 my-6 items-center ${direction}`}>
            {
                Array.isArray(favorites) && favorites.length > 0 ? (
                    favorites.map((item) => (
                        <div key={item.OMDBID} className='w-64 h-96 bg-white font-poppins relative group hover:shadow-2xl px-2 py-2 rounded-md hover:h-auto hover:-translate-y-5'>
                            <img src={item.Poster} alt={item.Title + ' poster not availble'} className='h-80 w-64 rounded-md' />
                            <h1>{item.Title}</h1>
                            <div className='flex items-center justify-between'>
                                <p className='flex items-center gap-2'>
                                    {
                                        item.Type === 'series' ?
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 20.25H18M10.5 17.25V20.25M13.5 17.25V20.25M3.375 17.25H20.625C21.246 17.25 21.75 16.746 21.75 16.125V4.875C21.75 4.254 21.246 3.75 20.625 3.75H3.375C2.754 3.75 2.25 4.254 2.25 4.875V16.125C2.25 16.746 2.754 17.25 3.375 17.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            : item.Type === 'game' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_1671_52)">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.0001 4C17.7631 4 18.3941 4.434 18.8561 4.89C19.3371 5.363 19.7781 5.999 20.1701 6.7C20.9571 8.106 21.6421 9.943 22.0951 11.758C22.5451 13.559 22.7941 15.44 22.6351 16.919C22.4751 18.404 21.7101 20 20.0001 20C18.5241 20 17.3481 19.24 16.3861 18.469L16.0351 18.18L15.5431 17.765L15.0991 17.397C14.0801 16.572 13.1751 16 12.0001 16C10.8251 16 9.92012 16.572 8.90112 17.397L8.45712 17.765L7.96512 18.18L7.61512 18.469C6.65112 19.24 5.47512 20 4.00012 20C2.28912 20 1.52412 18.404 1.36512 16.919C1.20712 15.439 1.45512 13.559 1.90512 11.757C2.35812 9.943 3.04312 8.107 3.83012 6.699C4.22212 5.999 4.66312 5.363 5.14412 4.889C5.60612 4.434 6.23712 4 7.00012 4C7.51512 4 8.01812 4.123 8.51312 4.27L9.10512 4.451C9.20412 4.481 9.30212 4.511 9.40012 4.538C10.2651 4.786 11.1501 5 12.0001 5C12.8501 5 13.7351 4.786 14.6001 4.538L15.4851 4.271C15.9831 4.124 16.4901 4 17.0001 4ZM17.0001 6C16.6171 6 16.2171 6.116 15.8291 6.243L15.3711 6.394C15.2978 6.41784 15.2241 6.44051 15.1501 6.462C14.2651 6.714 13.1501 7 12.0001 7C10.8501 7 9.73512 6.714 8.85012 6.462L8.63012 6.394L8.17112 6.243C7.78312 6.115 7.38312 6 7.00012 6C6.58212 6.078 6.20712 6.585 5.92412 7.055L5.76612 7.33L5.57612 7.676C4.89412 8.894 4.26612 10.556 3.84612 12.242C3.45112 13.819 3.25912 15.329 3.33212 16.453L3.35812 16.746L3.37812 16.922L3.40812 17.13C3.47712 17.531 3.62612 18 4.00012 18C4.81212 18 5.49012 17.596 6.33312 16.926L6.73612 16.598L7.49612 15.962L7.84012 15.682C8.90412 14.839 10.2351 14 12.0001 14C13.7651 14 15.0961 14.84 16.1601 15.682L16.5051 15.962L17.2651 16.598L17.6671 16.926C18.5101 17.596 19.1871 18 20.0001 18C20.3401 18 20.4941 17.613 20.5711 17.241L20.6091 17.023L20.6461 16.706C20.7691 15.56 20.5791 13.941 20.1551 12.243C19.7691 10.697 19.2091 9.171 18.5931 7.989L18.2341 7.329L18.0761 7.056C17.7931 6.585 17.4181 6.078 17.0001 6ZM8.50012 8C9.16317 8 9.79905 8.26339 10.2679 8.73223C10.7367 9.20107 11.0001 9.83696 11.0001 10.5C11.0001 11.163 10.7367 11.7989 10.2679 12.2678C9.79905 12.7366 9.16317 13 8.50012 13C7.83708 13 7.2012 12.7366 6.73236 12.2678C6.26352 11.7989 6.00012 11.163 6.00012 10.5C6.00012 9.83696 6.26352 9.20107 6.73236 8.73223C7.2012 8.26339 7.83708 8 8.50012 8ZM15.5001 8C15.7451 8.00003 15.9815 8.08996 16.1645 8.25272C16.3475 8.41547 16.4645 8.63975 16.4931 8.883L16.5001 9V9.5H17.0001C17.255 9.50028 17.5002 9.59788 17.6855 9.77285C17.8708 9.94782 17.9824 10.187 17.9973 10.4414C18.0122 10.6958 17.9294 10.9464 17.7659 11.1418C17.6023 11.3373 17.3702 11.4629 17.1171 11.493L17.0001 11.5H16.5001V12C16.4998 12.2549 16.4022 12.5 16.2273 12.6854C16.0523 12.8707 15.8132 12.9822 15.5587 12.9972C15.3043 13.0121 15.0537 12.9293 14.8583 12.7657C14.6628 12.6021 14.5372 12.3701 14.5071 12.117L14.5001 12V11.5H14.0001C13.7452 11.4997 13.5001 11.4021 13.3148 11.2272C13.1294 11.0522 13.0179 10.813 13.003 10.5586C12.988 10.3042 13.0708 10.0536 13.2344 9.85817C13.398 9.66271 13.63 9.5371 13.8831 9.507L14.0001 9.5H14.5001V9C14.5001 8.73478 14.6055 8.48043 14.793 8.29289C14.9806 8.10536 15.2349 8 15.5001 8ZM8.50012 10C8.36752 10 8.24034 10.0527 8.14657 10.1464C8.0528 10.2402 8.00012 10.3674 8.00012 10.5C8.00012 10.6326 8.0528 10.7598 8.14657 10.8536C8.24034 10.9473 8.36752 11 8.50012 11C8.63273 11 8.75991 10.9473 8.85368 10.8536C8.94745 10.7598 9.00012 10.6326 9.00012 10.5C9.00012 10.3674 8.94745 10.2402 8.85368 10.1464C8.75991 10.0527 8.63273 10 8.50012 10Z" fill="black" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1671_52">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                                : <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z" stroke="black" strokeWidth="4" strokeLinejoin="round" />
                                                    <path d="M24 18C24.7956 18 25.5587 17.6839 26.1213 17.1213C26.6839 16.5587 27 15.7956 27 15C27 14.2044 26.6839 13.4413 26.1213 12.8787C25.5587 12.3161 24.7956 12 24 12C23.2044 12 22.4413 12.3161 21.8787 12.8787C21.3161 13.4413 21 14.2044 21 15C21 15.7956 21.3161 16.5587 21.8787 17.1213C22.4413 17.6839 23.2044 18 24 18ZM24 36C24.7956 36 25.5587 35.6839 26.1213 35.1213C26.6839 34.5587 27 33.7956 27 33C27 32.2044 26.6839 31.4413 26.1213 30.8787C25.5587 30.3161 24.7956 30 24 30C23.2044 30 22.4413 30.3161 21.8787 30.8787C21.3161 31.4413 21 32.2044 21 33C21 33.7956 21.3161 34.5587 21.8787 35.1213C22.4413 35.6839 23.2044 36 24 36ZM15 27C15.7956 27 16.5587 26.6839 17.1213 26.1213C17.6839 25.5587 18 24.7956 18 24C18 23.2044 17.6839 22.4413 17.1213 21.8787C16.5587 21.3161 15.7956 21 15 21C14.2044 21 13.4413 21.3161 12.8787 21.8787C12.3161 22.4413 12 23.2044 12 24C12 24.7956 12.3161 25.5587 12.8787 26.1213C13.4413 26.6839 14.2044 27 15 27ZM33 27C33.7956 27 34.5587 26.6839 35.1213 26.1213C35.6839 25.5587 36 24.7956 36 24C36 23.2044 35.6839 22.4413 35.1213 21.8787C34.5587 21.3161 33.7956 21 33 21C32.2044 21 31.4413 21.3161 30.8787 21.8787C30.3161 22.4413 30 23.2044 30 24C30 24.7956 30.3161 25.5587 30.8787 26.1213C31.4413 26.6839 32.2044 27 33 27Z" stroke="black" strokeWidth="4" strokeLinejoin="round" />
                                                    <path d="M24 44H44" stroke="black" strokeWidth="4" strokeLinecap="round" />
                                                </svg>
                                    }
                                    {item.Type}</p>
                                <p className='flex items-center gap-2'>
                                    <svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_1671_21)">
                                            <path d="M32.2503 6H29.0003V8H32.0003V30H4.00026V8H7.00026V6H3.75026C3.51649 6.00391 3.28579 6.05383 3.07132 6.14691C2.85686 6.23999 2.66283 6.37441 2.50032 6.54249C2.33781 6.71057 2.21 6.90902 2.1242 7.1265C2.0384 7.34398 1.99628 7.57624 2.00026 7.81V30.19C1.99628 30.4238 2.0384 30.656 2.1242 30.8735C2.21 31.091 2.33781 31.2894 2.50032 31.4575C2.66283 31.6256 2.85686 31.76 3.07132 31.8531C3.28579 31.9462 3.51649 31.9961 3.75026 32H32.2503C32.484 31.9961 32.7147 31.9462 32.9292 31.8531C33.1437 31.76 33.3377 31.6256 33.5002 31.4575C33.6627 31.2894 33.7905 31.091 33.8763 30.8735C33.9621 30.656 34.0042 30.4238 34.0003 30.19V7.81C34.0042 7.57624 33.9621 7.34398 33.8763 7.1265C33.7905 6.90902 33.6627 6.71057 33.5002 6.54249C33.3377 6.37441 33.1437 6.23999 32.9292 6.14691C32.7147 6.05383 32.484 6.00391 32.2503 6Z" fill="black" />
                                            <path d="M8 14H10V16H8V14Z" fill="black" />
                                            <path d="M14 14H16V16H14V14Z" fill="black" />
                                            <path d="M20 14H22V16H20V14Z" fill="black" />
                                            <path d="M26 14H28V16H26V14Z" fill="black" />
                                            <path d="M8 19H10V21H8V19Z" fill="black" />
                                            <path d="M14 19H16V21H14V19Z" fill="black" />
                                            <path d="M20 19H22V21H20V19Z" fill="black" />
                                            <path d="M26 19H28V21H26V19Z" fill="black" />
                                            <path d="M8 24H10V26H8V24Z" fill="black" />
                                            <path d="M14 24H16V26H14V24Z" fill="black" />
                                            <path d="M20 24H22V26H20V24Z" fill="black" />
                                            <path d="M26 24H28V26H26V24Z" fill="black" />
                                            <path d="M10 10C10.2652 10 10.5196 9.89464 10.7071 9.70711C10.8946 9.51957 11 9.26522 11 9V3C11 2.73478 10.8946 2.48043 10.7071 2.29289C10.5196 2.10536 10.2652 2 10 2C9.73478 2 9.48043 2.10536 9.29289 2.29289C9.10536 2.48043 9 2.73478 9 3V9C9 9.26522 9.10536 9.51957 9.29289 9.70711C9.48043 9.89464 9.73478 10 10 10Z" fill="black" />
                                            <path d="M26 10C26.2652 10 26.5196 9.89464 26.7071 9.70711C26.8946 9.51957 27 9.26522 27 9V3C27 2.73478 26.8946 2.48043 26.7071 2.29289C26.5196 2.10536 26.2652 2 26 2C25.7348 2 25.4804 2.10536 25.2929 2.29289C25.1054 2.48043 25 2.73478 25 3V9C25 9.26522 25.1054 9.51957 25.2929 9.70711C25.4804 9.89464 25.7348 10 26 10Z" fill="black" />
                                            <path d="M13 6H23V8H13V6Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1671_21">
                                                <rect width="36" height="36" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    {item.Year}</p>
                            </div>
                            {/* fav icon */}
                            <div className='hidden group-hover:block absolute top-4 right-2 duration-200 cursor-pointer drop-shadow-lg' title='Add to favorite list' onClick={() => addToFavList(item)}>
                                <div className='relative'>
                                    <svg width="40" height="40" className='scale-125' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill={item.fav ? "red" : "white"} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <p className='bg-gray-100 px-32 py-3 rounded-md text-gray-600 flex items-center gap-1 hover:shadow-md'>No <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z" stroke="black" strokeWidth="4" strokeLinejoin="round" />
                            <path d="M24 18C24.7956 18 25.5587 17.6839 26.1213 17.1213C26.6839 16.5587 27 15.7956 27 15C27 14.2044 26.6839 13.4413 26.1213 12.8787C25.5587 12.3161 24.7956 12 24 12C23.2044 12 22.4413 12.3161 21.8787 12.8787C21.3161 13.4413 21 14.2044 21 15C21 15.7956 21.3161 16.5587 21.8787 17.1213C22.4413 17.6839 23.2044 18 24 18ZM24 36C24.7956 36 25.5587 35.6839 26.1213 35.1213C26.6839 34.5587 27 33.7956 27 33C27 32.2044 26.6839 31.4413 26.1213 30.8787C25.5587 30.3161 24.7956 30 24 30C23.2044 30 22.4413 30.3161 21.8787 30.8787C21.3161 31.4413 21 32.2044 21 33C21 33.7956 21.3161 34.5587 21.8787 35.1213C22.4413 35.6839 23.2044 36 24 36ZM15 27C15.7956 27 16.5587 26.6839 17.1213 26.1213C17.6839 25.5587 18 24.7956 18 24C18 23.2044 17.6839 22.4413 17.1213 21.8787C16.5587 21.3161 15.7956 21 15 21C14.2044 21 13.4413 21.3161 12.8787 21.8787C12.3161 22.4413 12 23.2044 12 24C12 24.7956 12.3161 25.5587 12.8787 26.1213C13.4413 26.6839 14.2044 27 15 27ZM33 27C33.7956 27 34.5587 26.6839 35.1213 26.1213C35.6839 25.5587 36 24.7956 36 24C36 23.2044 35.6839 22.4413 35.1213 21.8787C34.5587 21.3161 33.7956 21 33 21C32.2044 21 31.4413 21.3161 30.8787 21.8787C30.3161 22.4413 30 23.2044 30 24C30 24.7956 30.3161 25.5587 30.8787 26.1213C31.4413 26.6839 32.2044 27 33 27Z" stroke="black" strokeWidth="4" strokeLinejoin="round" />
                            <path d="M24 44H44" stroke="gray" strokeWidth="4" strokeLinejoin="round" />
                        </svg> Movies found</p>
                    </div>
                )}
        </div>
    )
}

export default MovieCard
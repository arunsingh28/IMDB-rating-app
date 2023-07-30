import React, { useEffect, useState } from 'react'
import { allFavMoviesList, removeFromFav } from '../http/axios'
import { toast } from 'react-toastify'
import Loading from './Loading'


interface FavProps {
    setOpenFavMenu: React.Dispatch<React.SetStateAction<boolean>>
    changeEvent: boolean
}

export interface OMDB {
    Year: string
    Type: string
    Poster: string
    Title: string
    imdbID: string
    fav: boolean
}


const Favourite: React.FC<FavProps> = ({ setOpenFavMenu, changeEvent }) => {

    const [favMoviesData, setMoviesData] = useState<OMDB[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchData = async () => {
        setIsLoading(true)
        allFavMoviesList().then((data) => {
            setIsLoading(false)
            setMoviesData(data.data)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }

    useEffect(() => {
        if (changeEvent === true) {
            fetchData()
        }
    }, [changeEvent])

    const handleRemoveFav = async (id: string, title: string) => {
        const isRemove = await removeFromFav(id)
        if (isRemove.data) {
            // render new fav list
            fetchData()
            toast.success(`${title} is remove successfully`, {
                position: 'bottom-left',
                theme: 'dark'
            })
        } else {
            // render new fav list
            fetchData()
            toast.success(`${title} is remove successfully`, {
                position: 'bottom-left',
                theme: 'dark'
            })
        }
    }


    return (
        <div className='h-screen w-80 shadow-2xl shadow-gray-600 bg-white overflow-scroll overflow-x-hidden relative'>
            <div className='fixed top-0 left-0 z-10 bg-white w-full flex items-center border-b-2 justify-between px-2'>
                <button className='bg-blue-500 rounded-md px-5 py-2 font-poppins my-2 text-gray-600 font-semibold hover:bg-blue-600' onClick={() => setOpenFavMenu(false)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5H7V7H5V5ZM9 9H7V7H9V9ZM11 11H9V9H11V11ZM13 11H11V13H9V15H7V17H5V19H7V17H9V15H11V13H13V15H15V17H17V19H19V17H17V15H15V13H13V11ZM15 9V11H13V9H15ZM17 7V9H15V7H17ZM17 7V5H19V7H17Z" fill="white" />
                    </svg>
                </button>

                <span className='text-[15px] text-gray-700 font-poppins font-semibold flex items-center justify-center'>{isLoading ? <Loading height={5} width={5} /> : favMoviesData?.length} Movies</span>
            </div >
            <div className='mt-16'>
                {
                    isLoading ?
                        <Loading height={6} width={6} /> :
                        favMoviesData && favMoviesData.length > 0 ? favMoviesData.map((item) => {
                            return (
                                <div key={item.imdbID} className='m-2 h-auto bg-gray-100 mb-5 group relative'>
                                    <img src={item.Poster} alt="movie poster" className='w-full h-full rounded-md' />
                                    <h4 className='font-poppins text-gray-700 text-lg text-center font-semibold'>{item.Title}</h4>
                                    <div className='absolute top-2 right-2'>
                                        <button className='bg-red-500 text-gray-50 px-2 flex items-center justify-center gap-2 py-1 rounded-full h-8 w-8 cursor-pointer hover:bg-red-600' onClick={() => handleRemoveFav(item.imdbID, item.Title)}>
                                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="white" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )
                        }).reverse() : <p className='text-center font-poppins bg-gray-100 px-10 py-2'>No Movies found !!!</p>
                }
            </div>
        </div >
    )
}

export default Favourite
import React from 'react'
import Navbar from '../Components/Navbar'
import Workspace from '../Components/Workspace'

const Dashboard = () => {

    const [searchTxt, setSearchTxt] = React.useState<string>('')

    return (
        <div>
            <Navbar />
            <Workspace />
        </div>
    )
}

export default Dashboard
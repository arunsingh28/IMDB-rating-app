import { Response } from 'express'

export const errorHandler = () => {
    process.on('unhandledRejection', (err: any) => {
        /*
           -- add code for store logs into file
           */
        console.log('\n==== unhandle Rejection fail =====\n', err)
        // uncaoughtException
        process.on('uncaughtException', (err: any) => {
            /*
            -- add code for store logs into file
            */
            console.log('\n==== uncaught Exception fail =====\n', err)
            // server shutdown
            process.exit(1)
        })
    })
}

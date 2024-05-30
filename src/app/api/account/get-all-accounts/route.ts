// Importing the connectToDB function from the "@/database" module
import connectToDB from '@/database'

// Importing the Account model from the "@/models/Account" module
import Account from '@/models/Account'

// Importing the NextResponse object from the 'next/server' module
import { NextResponse } from 'next/server'

// Exporting a constant named dynamic with a value of 'force-dynamic'
export const dynamic = 'force-dynamic'

// Defining an asynchronous function named GET that handles HTTP GET requests
export async function GET(req){

    try {
        // Establishing a connection to the database
        await connectToDB();

        // Extracting the searchParams object from the request URL
        const {searchParams} = new URL(req.url)
        
        // Retrieving the value of the 'id' parameter from the URL query string
        const id = searchParams.get('id')

        // Querying the database to find all accounts with the specified 'id'
        const getAllAccounts = await Account.find({uid : id})

        // Checking if any accounts were found
        if(getAllAccounts){
            // Returning a JSON response with success and data if accounts were found
            return NextResponse.json({
                success:true,
                data : getAllAccounts
            })
        } else {
            // Returning a JSON response with failure message if no accounts were found
            return NextResponse.json({
                success:false,
                message: "something went wrong",
            })
        }
    } catch(e) {
        // Catching and logging any errors that occur during the execution of the function
        console.log(e);
        // Returning a JSON response with failure message if an error occurs
        return NextResponse.json({
            success:false,
            message: "something went wrong",
        })
    }
}

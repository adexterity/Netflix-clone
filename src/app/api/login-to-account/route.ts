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

        // Parsing the JSON data from the request body to get 'pin', 'accountId', and 'uid'
        const {pin, accountId, uid} = await req.json();

        // Finding the account with the specified 'accountId' and 'uid' in the database
        const getCurrentAccount = await Account.findOne({_id: accountId, uid}); 
        
        // Checking if the account was not found
        if(!getCurrentAccount){
            // Returning a JSON response indicating failure if account was not found
            return NextResponse.json({
                success: false,
                message: "Account not found"
            })
        }

        // Comparing the provided 'pin' with the 'pin' of the retrieved account
        const checkPin = await compare(pin, getCurrentAccount.pin)
        
        // Checking if the provided 'pin' matches the account's 'pin'
        if(checkPin){
            // Returning a JSON response indicating success if PIN is correct
            return NextResponse.json({
                success: true,
                message: "welcome to Netflix"
            })
        } else {
            // Returning a JSON response indicating failure if PIN is incorrect
            return NextResponse.json({
                success: false,
                message: "Incorrect PIN! please try again"
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

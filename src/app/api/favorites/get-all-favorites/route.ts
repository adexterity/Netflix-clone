// Importing the connectToDB function from the "@/database" module
import connectToDB from "@/database";

import Favorites from "@/models/Favorite";

// Importing the NextResponse object from the 'next/server' module
import { NextResponse } from "next/server";

// Exporting a constant named dynamic with a value of 'force-dynamic'
export const dynamic = "force-dynamic";

// Defining an asynchronous function named GET that handles HTTP GET requests
export async function GET(req) {
  try {
    // Establishing a connection to the database
    await connectToDB();

    // Extracting the searchParams object from the request URL
    const { searchParams } = new URL(req.url);

    console.log(searchParams, 'searchparams: get-all-favorites')

    // Retrieving the value of the 'id' parameter from the URL query string
    const id = searchParams.get("id");

    // Retrieving the value of the 'accountID' parameter from the URL query string
    const accID = searchParams.get("accountID");

    console.log("Received id:", id);
    console.log("Received accID:", accID);

    // Querying the database to find all favorites with the specified 'uid' that matches the 'id' of the url in the favorite
    const getAllFavorites = await Favorites.find({ uid: id, accountID: accID });

    console.log(getAllFavorites, "getAllFavorites: get-all-favorites");

    // Checking if any accounts were found
    if (getAllFavorites) {
      // Returning a JSON response with success and data if accounts were found

      return NextResponse.json({
        success: true,
        data: getAllFavorites,
      });
    } else {
      // Returning a JSON response with failure message if no accounts were found
      return NextResponse.json({
        success: false,
        message: "something went wrong",
      });
    }
  } catch (e) {
    // Catching and logging any errors that occur during the execution of the function
    console.log(e);
    // Returning a JSON response with failure message if an error occurs
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}

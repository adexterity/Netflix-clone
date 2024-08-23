// Importing the connectToDB function from the "@/database" module
import connectToDB from "@/database";

import Favorites from "@/models/Favorite";

// Importing the NextResponse object from the 'next/server' module
import { NextResponse } from "next/server";

// Exporting a constant named dynamic with a value of 'force-dynamic'
export const dynamic = "force-dynamic";

// Defining an asynchronous function named DELETE that handles HTTP DELETE requests
export async function DELETE(req: any) {
  try {
    // Establishing a connection to the database
    await connectToDB();

    // Extracting the searchParams object from the request URL
    const { searchParams } = new URL(req.url);

    // Retrieving the value of the 'id' parameter from the URL query string
    const id = searchParams.get("id");

    // Checking if the 'id' parameter is missing
    if (!id) {
      // Returning a JSON response indicating failure if 'id' is missing
      return NextResponse.json({
        success: false,
        message: "Favorite item ID is required",
      });
    }

    const deletedFavoriteItem = await Favorites.findByIdAndDelete(id);

    if (deletedFavoriteItem) {
      // Returning a JSON response indicating success if item was removed from list
      return NextResponse.json({
        success: true,
        message: "removed from list",
      });
    } else {
      // Returning a JSON response indicating failure if item removal failed
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

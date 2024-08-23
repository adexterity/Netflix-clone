import connectToDB from "@/database"; // Imports the function to connect to the database
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";

// Export a constant "dynamic" to be used for Next.js routing
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    // Connect to the database
    await connectToDB();

    const data = await req.json();

    // Check if an account with the same name and uid already exists
    const isFavoriteAlreadyExists = await Favorites.find({
      uid: data.uid,
      accountID: data.accountID,
      movieID: data.movieID,
    });

    if (isFavoriteAlreadyExists && isFavoriteAlreadyExists.length > 0) {
      return NextResponse.json({
        success: false,
        message: "This is already added to your list",
      });
    }

    const newlyAddedFavorite = await Favorites.create(data);

    if (newlyAddedFavorite) {
      return NextResponse.json({
        success: true,
        message: "Added to list successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong creating the account",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

import connectToDB from "@/database"; // Imports the function to connect to the database
import Account from "@/models/Account"; // Imports the Account model for interacting with accounts
import { NextResponse } from "next/server";

// Export a constant "dynamic" to be used for Next.js routing
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract name, pin, and uid from the request body (assuming JSON format)
    const { name, pin, uid } = await req.json();

    // Check if an account with the same name and uid already exists
    const isAccountAlreadyExists = await Account.find({ uid, name });

    // Check if the total number of accounts reaches the limit (4)
    const allAccounts = await Account.find({});
    if (allAccounts && allAccounts.length === 4) {
      return NextResponse.json({
        success: false,
        message: "You can only have 4 accounts",
      });
    }

    // If account doesn't exist and limit isn't reached, proceed with creating the new account
    if (!isAccountAlreadyExists) {
      // Hash the pin for secure storage (replace 'hash' with your actual hashing function)
      const hashPin = await hash(pin, 12); // Assuming 'hash' is a function that hashes the pin with 12 salt rounds

      // Create a new Account instance with the provided details
      const newlyCreatedAccount = await Account.create({
        name,
        pin: hashPin,
        uid,
      });

      // If account creation is successful, send a success response
      if (newlyCreatedAccount) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully",
        });
      } else {
        // If account creation fails, send a generic error message
        return NextResponse.json({
          success: false,
          message: "Something went wrong creating the account",
        });
      }
    } else {
      // If account already exists, send an error response
      return NextResponse.json({
        success: false,
        message: "Please try a different name",
      });
    }
  } catch (e) {
    // Log any errors encountered during the process
    console.error(e);

    // Send a generic error response in case of unexpected errors
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

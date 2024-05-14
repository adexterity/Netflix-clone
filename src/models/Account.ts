// Importing mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Defining a new schema for a user account using mongoose.Schema
// This schema describes the structure of documents in the collection
const NewAccountSchema = new mongoose.schema(
    {
        // Field for unique identifier for the account
        uid: String,
        // Field for the name associated with the account
        name: String,
        // Field for a PIN associated with the account
        pin: String,
    },
    // Options object for schema configuration
    {
        // Adding timestamps to automatically manage creation and update timestamps. tells Mongoose to automatically add createdAt and updatedAt fields to the documents to track their creation and modification times.
        timestamps: true
    }
);

// Defining a mongoose model for the Account collection
// If the model "Account" already exists, use it, otherwise create a new one
const Account = mongoose.models.Account || mongoose.model("Account", NewAccountSchema);

// Exporting the Account model to be used in other files
export default Account;

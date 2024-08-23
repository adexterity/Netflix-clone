// Import the mongoose library which is used for interacting with MongoDB in a Node.js environment
import mongoose from "mongoose";

// Define a new schema for the "Favorites" collection in MongoDB
// The schema defines the structure of the documents within the collection
const NewFavoriteSchema = new mongoose.Schema(
  {
    // 'uid' field to store the user ID as a string
    uid: String,
    // 'accountID' field to store the account ID as a string
    accountID: String,
    // 'backdrop_path' field to store the path to the backdrop image as a string
    backdrop_path: String,
    // 'poster_path' field to store the path to the poster image as a string
    poster_path: String,
    // 'movieID' field to store the movie ID as a number
    movieID: Number,
    // 'type' field to store the type of the favorite item as a string (e.g., movie, TV show, etc.)
    type: String,
  },
  {
    // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields to the documents
    timestamps: true,
  }
);

// Create a model called "Favorites" using the schema defined above
// If a model named "Favorites" already exists in the mongoose models, use the existing one
// Otherwise, create a new model named "Favorites"
const Favorites =
  mongoose.models.Favorites || mongoose.model("Favorites", NewFavoriteSchema);

console.log("favorite: mongooseSchema", Favorites);

// Export the "Favorites" model so it can be used in other parts of the application
export default Favorites;

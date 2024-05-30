import NextAuth from "next-auth"; // Importing NextAuth for authentication handling
import GithubProvider from "next-auth/providers/github"; // Importing the GitHub provider for OAuth authentication

// Configuration options for NextAuth
const authOptions = {
  providers: [
    // Adding GitHub as an OAuth provider
    GithubProvider({
      clientId: process.env.GITHUB_ID as string, // GitHub client ID from environment variables
      clientSecret: process.env.GITHUB_SECRET as string, // GitHub client secret from environment variables
    }),
  ],
  callbacks: {
    // Custom callback to modify the session object
    async session({ session, token, user }) {
      // Modify the username in the session object to be lowercase and concatenated
      session.user.username = session?.user?.name
        .split(" ") // Split the name into an array of words
        .join("") // Join the words without spaces
        .toLocaleLowerCase(); // Convert the resulting string to lowercase

      // Add the user's unique ID (uid) from the token to the session object
      session.user.uid = token.sub;

      return session; // Return the modified session object
    },
  },
  secret: "default_secret_key", // Secret key for NextAuth (should be changed to a more secure value in production)
};

// Handler for NextAuth, handling both GET and POST requests
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };

list of installed packages

    - @tailwind/line-clamp
    - bcryptjs
    - framer-motion
    - mongoose
    - next-auth
    - react-icons
    - @heroicons/react
    - react-pin-input
    - react-player
    - tailwind-scrollbar
    - tailwind-scrollbar-hide


STAGES OF APP DEVELOPMENT
    - create the context folder, then create the index.tsx file inside it.
    - in the layout, wrap the children around the context created using the <GlobalState> component from context
    - create github app and database with mongodb 
    - create the database folder and include the index.ts file inside it.
    - install all the packages ( they are listed at the top)
    - update the database database file by making an asynchronous request to mongoose.
    - create the auth-provider directory and import {SessionProvider} from nextauth, and export the NextAuthProvider function created
    - in the layout.ts file, wrap the GlobalState inside the NextAuthProvider component.

    - Setup Authentication:

        - in the App directory, create an 'api' directory, then inside it, create an 'auth' directory, then inside it, create the catchall route '[...nextauth]', then inside it, create 'route.ts' file.
        - in the route.ts file, import NextAuth and GithubProvider and export handler as get and post.

    - create the component directory and inside it, create the 'unauth' directory. this directory is where unauthorized users will be redirected to.

    - create these directories inside the app directory: movies, tv, browse, search, my-list.

    - in each of the directories created above, check if the user is authenticated, if not, return the 'unauth' component.

    - in the context directory, let the page return a loader when the session if undefined(this happens when the page just loads, or you're searching for something in the page)

    - in the src directory, create a models directory and inside, create an Account.ts file. in this file import the mongoose library and setup new account schema. src\models\Account.ts

    - in the api directory, we'll setup out api routes by creating 4 directories inside the api directory: create-account, get-all-account, login-to-account, remove-account directories.
    inside each of the directories, create a route.ts file.
        - create-account route:
        This route defines a serverless function to handle HTTP POST requests for creating new user accounts. It connects to a database, extracts the account details (name, PIN, and UID) from the request body, checks if the account already exists, and if not, creates a new account. It also checks if the total number of accounts reaches a limit of 4. The PIN is securely hashed before storage. It returns JSON responses indicating success or failure based on the outcome of account creation or any errors encountered during the process.
        - get-all-account route:
        This route defines a serverless function to handle HTTP GET requests. It connects to a database, extracts the 'id' parameter from the request URL, queries the database for accounts with that id, and returns a JSON response containing the query results. If no accounts are found or an error occurs during the process, it returns a JSON response indicating failure.
        - login-to-account route:
        This route defines a serverless function to handle HTTP GET requests. It connects to a database, retrieves account information based on provided parameters (account ID, user ID, and PIN), securely compares the provided PIN with the stored PIN in the database, and returns a JSON response indicating success or failure based on the comparison. If the account is not found or an error occurs during the process, it returns a JSON response indicating failure.
        - remove-account route:
        This route defines a serverless function to handle HTTP DELETE requests. It connects to a database, extracts the 'id' parameter from the request URL, deletes the account with that id from the database, and returns a JSON response indicating success or failure. If the 'id' parameter is missing, it returns a JSON response indicating failure. If an error occurs during the process, it logs the error and returns a JSON response indicating failure.
    
    - Update the manage-account: src\components\manage-accounts\index.tsx
    This code defines a React component that fetches and displays user accounts from an API based on the logged-in user's session. It uses React hooks to manage state and side effects, and displays a list of accounts with an option to add more accounts if fewer than four exist.

    - create the manage-account directory inside the component directory.
        - in the index.ts file, create the login that will be called when the user submit the form to create new account, and also display the already created accounts.
        - create the accountform component: this component is the login form that the user will fill to create new account.

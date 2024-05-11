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
    - create these directories: movies, tv, browse, search, my-list.
    - in each of the directories, check if the user is authenticated, if not, return the 'unauth' component.
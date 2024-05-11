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
    - in the layout.ts file, wrap the globalState inside the NextAuthProvider component.
    - 
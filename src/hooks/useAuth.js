// import { createContext, useState } from "react";
// import { useContext } from "react";

// function useProviderAuth() {
//     const setUser = useState(null);

//     const getUser = async () => {
//         try {
//             fetch('http://localhost:3000/api/auth').then(res => res.json()).then(token => token.user).then(session =>{
//                 if(session.token){
//                     setUser(session);
//                 }
//             })
//             return getUser();
//         } catch (error) {
//             setUser(null);
//         }
//     }
// }

// const AuthContext = createContext();

// export function ProviderAuth({children}){
//     const auth = useProviderAuth();
//     console.log("use auth" ,auth);
//     return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
// }

// export const useAuth = () => {
//     return useContext(AuthContext);
// }
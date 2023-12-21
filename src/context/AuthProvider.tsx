import { ReactNode, createContext, useState } from "react"

const AuthContext = createContext({});

export const AuthProvider = (prop: { children: ReactNode }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {prop.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
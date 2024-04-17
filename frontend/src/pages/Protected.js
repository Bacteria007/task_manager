import { Navigate } from 'react-router-dom'

function Protected({ children }) {
    const token = localStorage.getItem("token")
    if (!token || token === undefined) {
        return <Navigate to={"/login"} replace={true}></Navigate>
    }
    return children;
}

export default Protected
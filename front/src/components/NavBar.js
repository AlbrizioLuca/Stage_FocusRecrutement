import { Outlet, Link } from "react-router-dom";

export default function NavBar(){
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="/admin" >CRUD Admin</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}
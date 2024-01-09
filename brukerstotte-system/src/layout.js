import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <nav>
                <Link to="/">Send beskjed</Link>
                <Link to="/tickets">Se beskjeder</Link>
            </nav>
            <div>
                <Outlet />
            </div>
        </>
    )
}
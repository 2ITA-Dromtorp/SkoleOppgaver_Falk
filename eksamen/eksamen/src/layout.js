import { Outlet } from "react-router-dom";
import Nav from "./navbar";

export default function Layout ({ loggedInUser }) {
    return (
        <div>
            <Nav loggedInUser={loggedInUser} />
            <Outlet />
        </div>
    );
}
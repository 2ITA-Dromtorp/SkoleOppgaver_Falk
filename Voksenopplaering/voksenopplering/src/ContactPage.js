import { Link } from 'react-router-dom';
import './CSS/MainPage.css';

function ContactPage() {
    return (
        <div>
            <button>
                <Link to="/" className="home-button">
                    Home
                </Link>
            </button>
        </div>
    )
}

export default ContactPage;

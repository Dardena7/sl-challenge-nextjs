import Link from "next/link";

const Navigation = (props) => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link href="/" passHref>
                    <a className="navbar-brand star-wars-font">Yoda Agency</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/agencies" passHref>
                                <a className="nav-link">Agencies</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/agencies/add" passHref>
                                <a className="nav-link">Add agency</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
)
    ;
}

export default Navigation;


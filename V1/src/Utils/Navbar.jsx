import React, { useEffect, useState } from 'react';
import './index.css';
import logo from '../LandingPage.webp'
const Navbar = () => {
    const getFullPath = () => window.location.pathname + window.location.hash;

    const [activeLink, setActiveLink] = useState(getFullPath());

    useEffect(() => {
        const handleLocationChange = () => {
            setActiveLink(getFullPath());
        };

        // Listen for both hash changes and popstate (back/forward button events)
        window.addEventListener('hashchange', handleLocationChange);
        window.addEventListener('popstate', handleLocationChange);

        return () => {
            window.removeEventListener('hashchange', handleLocationChange);
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, []);

    console.log(activeLink);  // Debugging to check what the active link is

    return (
        <nav className="container-fluid shadow-md navbar navbar-expand-lg navbar-primary fixed-top" style={{borderBottom:"1px white",background:"#000000"}}>
            <div className="container d-flex align-items-center justify-between">
                <a className="navbar-brand" style={{ fontWeight: '700', fontSize: '' }} href="/">
                    <img src={logo} style={{ maxWidth: '70px', filter: 'drop-shadow(0px 0px 1px)' }} />
                </a>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" 
                    // style={{filter:"invert(10)"}}
                    ></span>
                </button>

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h3 className="offcanvas-title" id="offcanvasNavbarLabel" style={{ fontSize: '1.5em' }}>Being Diplomatic</h3>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body setWidth1000px justify-content-between ">
                        <ul className="navbar-nav">
                            <li>
                                <a className={`nav_tab_hover nav-link px-2 text-uppercase ${activeLink === '/' ? 'nav-link-active text-white' : 'text-secondary'}`} href="/">Home</a>
                            </li>
                            <li>
                                <a className={`nav_tab_hover nav-link px-2 text-uppercase ${activeLink === '/about_us' || activeLink === '/about_us#award' ? 'nav-link-active text-white' : 'text-secondary'}`} href="/about_us">About Us</a>
                            </li>
                            <li>
                                <a className={`nav_tab_hover nav-link px-2 text-uppercase ${activeLink === '/#base3' ? 'nav-link-active text-white' : 'text-secondary'}`} href="/#base3">Our Work</a>
                            </li>
                            {/* <li>
                                <a className={`nav_tab_hover nav-link px-2 text-uppercase ${activeLink === '/#keyPartners' ? 'nav-link-active text-white' : 'text-secondary'}`} href="/#keyPartners">Industries</a>
                            </li> */}
                            <li className="nav-item dropdown">
                                <a className={`nav_tab_hover nav-link px-2 text-uppercase dropdown-toggle ${activeLink.startsWith('/services') ? 'nav-link-active text-white' : 'text-secondary'}`} href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Our Services</a>
                                <ul className="dropdown-menu w-100 border" aria-labelledby="navbarDropdownMenuLink">
                                    <li ><a className="dropdown-item" href="/services#services_for_Marketing">Marketing</a></li>
                                    <li ><a className="dropdown-item" href="/services#services_for_Technology">Technology</a></li>
                                    <li ><a className="dropdown-item" href="/services#services_for_More">More..</a></li>
                                </ul>
                            </li>


                            <li>
                                <a className={`nav_tab_hover nav-link px-2 text-uppercase ${activeLink === '/#ourClients' ? 'nav-link-active text-white' : 'text-secondary'}`} href="/#ourClients">Our Clients</a>
                            </li>
                            {/* <li>
                                <a className={`nav-link px-2 text-uppercase ${activeLink === '/about_us#leaderShipTeam' ? 'nav-link-active text-white' : 'text-secondary'}`} href="/about_us#leaderShipTeam">Testimonials</a>
                            </li> */}
                            {/* <li>
                                <a className={`nav-link px-2 text-uppercase ${(activeLink === '/about_us#contactUs' || activeLink === '/#contactUs') ? 'nav-link-active text-white' : 'text-secondary'}`} href="#contactUs">Contact Us</a>
                            </li> */}
                            {/* <li>
                                <a className={`nav-link px-2 text-uppercase ${(activeLink === '/#jobOpening' || activeLink === '/about_us#jobOpening') ? 'nav-link-active text-white' : 'text-secondary'}`} href="#jobOpening">Work with Us</a>
                            </li> */}
                            <li>
                                <a className={`nav_tab_hover nav-link px-2 text-uppercase ${(activeLink === '/privacy_and_policy' || activeLink === '/privacy_and_policy') ? 'nav-link-active text-white' : 'text-secondary'}`} href="/privacy_and_policy">Privacy & Policy</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li>
                                <a className='fs-5'>
                                    <button className="btn text-white" style={{ fontWeight: '300' }}><i className="bi bi-globe2"></i> GLOBAL (English)</button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

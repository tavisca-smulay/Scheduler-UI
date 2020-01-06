import React from 'react'
import './header.css';
import {Navbar} from 'react-bootstrap';
function Header(){
    return(
        <div className="pageHeader">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    Job Scheduler
                </Navbar.Brand>
            </Navbar>
        </div>
    );

}
export default Header;
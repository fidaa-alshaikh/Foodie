import React from 'react'
import jQuery from 'jquery'
import { useHistory ,Link} from "react-router-dom";

export default function NavBar(props) {
	const history = useHistory();

    jQuery(function($) {
        $(window).on('scroll', function() {
            if ($(this).scrollTop() >= 200) {
                $('.navbar').addClass('fixed-top');
            } else if ($(this).scrollTop() == 0) {
                $('.navbar').removeClass('fixed-top');
            }
        });
        
        function adjustNav() {
            var winWidth = $(window).width(),
                dropdown = $('.dropdown'),
                dropdownMenu = $('.dropdown-menu');
            
            if (winWidth >= 768) {
                dropdown.on('mouseenter', function() {
                    $(this).addClass('show')
                        .children(dropdownMenu).addClass('show');
                });
                
                dropdown.on('mouseleave', function() {
                    $(this).removeClass('show')
                        .children(dropdownMenu).removeClass('show');
                });
            } else {
                dropdown.off('mouseenter mouseleave');
            }
        }
        
        $(window).on('resize', adjustNav);
        
        adjustNav();
    });
    
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark">
		<div className="container">
			<a href="#" className="navbar-brand" style={{"font-size": "30px"}}>Foodie.com</a>
			
			<button type="button" className="navbar-toggler collapsed" data-toggle="collapse" data-target="#main-nav">
				<span className="menu-icon-bar"></span>
				<span className="menu-icon-bar"></span>
				<span className="menu-icon-bar"></span>
			</button>
			
			<div id="main-nav" className="collapse navbar-collapse">
				<ul className="navbar-nav ml-auto">
				
					<li><Link to ="/" className="nav-item nav-link" style={{"font-size": "90.5%"}}> Home</Link></li>
					{!props.isLoggedIn ? <> 
					<li><Link to ="/signin" className="nav-item nav-link" style={{"font-size": "90.5%"}}> SignIn</Link></li>
					<li><Link to ="/signup" className="nav-item nav-link" style={{"font-size": "90.5%"}}>SignUp</Link></li>

					</>:  <>

					<li><Link to ="/profile" className="nav-item nav-link" style={{"font-size": "90.5%"}}> Profile</Link></li>
					<li><Link to ="/signin" className="nav-item nav-link" onClick={() => {
							console.log("Logging Out!");
							localStorage.removeItem("jwtToken");
							props.loginCallback();
							history.push("/home")
							// to="/login"
						  }} style={{"font-size": "90.5%"}}>Logout</Link></li>
					</> }
				</ul>
			</div>
		</div>
	</nav>
            
        </div>
    )
}

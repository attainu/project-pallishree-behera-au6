import React, { Fragment } from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import '../../App.css'

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    
  const authLinks =(
        <ul>
              <li><Link to="/uploadpost">Upload post
             </Link></li>
             <li><Link to="/posts">Posts
             </Link></li>

           
             <li><Link to="/profile">
             <i className="fas fa-user"></i>{' '} 
             <span className="hide-sm">Profile</span>  </Link></li>
          <li><a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">Logout </span>
            
            </a></li>
        
        </ul>
  );

  const guestLinks = (
       <ul>
               <li><Link to="/posts">Posts
             </Link></li>
          <li><Link to="/signup">Register</Link></li>
          <li><Link to="/signin">Login</Link></li>
        </ul>
  )
  
  
  
  return (
    <nav class="nav bg-primary">
    <ul>
        <li><Link to="/">Facebook</Link>  </li> 
        </ul>
       {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
  </nav>
    )
}

const mapStateToProps = state => ({
   auth : state.auth
})

export default connect(mapStateToProps,{logout})(Navbar)
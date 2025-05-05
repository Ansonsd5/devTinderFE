import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant/urls';
import { removeUser } from '../utils/userSlice';
import { removeUserFeed } from '../utils/feedSlice';

const Nav = () => {
  const user = useSelector(store =>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() =>{
    try {
      const res = await axios.post(`${BASE_URL}/logout`,{},{withCredentials :true});
      if(res.status === 200){
        dispatch(removeUser());
        dispatch(removeUserFeed());
        return navigate("/login");
      }
    } catch (error) {
      console.error("Failed to logout"+error);
    }
  }

 

  return (
    <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
  <Link to="/feed" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex gap-2">
    {user && <div className="dropdown dropdown-end mx-4">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="grid">
          <div>{user?.firstName}</div>
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to = "/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link  to="/connections">Connections</Link></li>
        <li><Link  to="/request">Request</Link></li>

        <li><Link onClick={handleLogout} >Logout</Link></li>
      </ul>
    </div>}
  </div>
</div>
  )
}

export default Nav
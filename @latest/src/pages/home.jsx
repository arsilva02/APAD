import Navbar from './navBar';
import { Link } from 'react-router-dom';

export default function Home(){
    return (
        <p>
        <Navbar />
        <div className='routerElements'>
        <Link to={'/newUser'} className='linkSpace'><button className='routerButton'>New User?</button></Link>
        <Link to={'/login'} className='linkSpace'><button className='routerButton'>Login</button></Link>
        <Link to={'/newProject'} className='linkSpace'><button className='routerButton'>Create Project</button></Link>
        <Link to={'/Project'} className='linkSpace'><button className='routerButton'>Project Login</button></Link>
        <Link to={'/recource'} className='linkSpace'><button className='routerButton'>Resource Management</button></Link>

        </div>
        
    </p>
    )
}
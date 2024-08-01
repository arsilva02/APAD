import { Link } from 'react-router-dom';
import Navbar from './navBar';
export default function newProject(){
    return (
        <>
        <Navbar />
        <div className='homeButton'>
        <Link to={'/'}><button className='routerButton'>Home</button></Link>
        </div>
        <div>This is the Project Creation page</div>
        </>
    )
}
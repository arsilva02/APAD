import { Link } from 'react-router-dom';
import Navbar from './navBarHardware';
export default function Resource(){
    return (
        <>
        <Navbar />
        <div className='homeButton'>
        <Link to={'/'}><button className='routerButton'>Home</button></Link>
        </div>
        <div>This is the Hardware Management page</div>
        </>
       
    )
}
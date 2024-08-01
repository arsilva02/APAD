import { Link } from 'react-router-dom';
import Navbar from './navBar';
export default function Login(){
    return (
        <>
        <Navbar />
        <div className='homeButton'>
        <Link to={'/'}><button className='routerButton'>Home</button></Link>
        </div>
        <div>Please use your login credentials to proceed further:</div>
        </>
    )
}
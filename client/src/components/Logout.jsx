import { useEffect, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import '../App.css'
import { UserContext } from '../UserContext';


function Logout() {
    const {username, logout} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.post('http://localhost:3000/logout', {username})
        .then(response =>{
        if(response.status == 200){
            logout();
            navigate('/login');
        }
        })
        .catch(error =>{
        console.log(error)
        });
    })
};

  export default Logout
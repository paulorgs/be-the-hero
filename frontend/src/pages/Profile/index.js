import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const [incident, setIncident] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    const ongName = localStorage.getItem('ongName');

   

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncident(response.data);
        })
    }, []);

    async function handleDeleteIncident(id){
        try{    
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            });

            setIncident(incident.filter(incident => incident.id !== id));
        }
        catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
          
    }

    return (
        <div className="profile-container">

            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">

                    <FiPower size={18} color="#e02041" />

                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
               {incident.map(incident => (
                    <li key={incident.id}>
                    <strong>CAS0:</strong>
                     <p>{incident.title}</p>

                    <strong>DESCRICÂO</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
               ))}
               
            </ul>
        </div>
    );
}
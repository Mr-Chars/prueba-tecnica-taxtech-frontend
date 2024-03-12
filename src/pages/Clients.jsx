
import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { SvgPlus } from '../assets/imgs/SvgGeneral';

import axios from "axios";
import { SERVER_URL } from "../global/enviroment";
import { ModalClient } from '../modals/modalClient';

export const Clients = () => {
    const [showModalClient, setShowModalClient] = useState(false);
    const [clients, setClient] = useState([])
    const [dniToUpdate, setDniToUpdate] = useState(0)

    const openModalProduct = useCallback((data) => {
        setShowModalClient(data);
    }, [setShowModalClient]);

    const updateClient = useCallback((data) => {
        setDniToUpdate(data);
        setShowModalClient(data);
    }, [setShowModalClient]);

    useEffect(() => {
        getClient("");
    }, []);

    const deleteClient = (dni) => {
        let params = 'deleteclient/' + dni;

        axios.delete(SERVER_URL + params)
            .then((response) => {
                getClient();
            })
            .catch((error) => {
            });
        return
    }

    const getClient = () => {
        let params = 'listclients';

        axios.get(SERVER_URL + params)
            .then((response) => {
                console.log(response.data)
                setClient(response.data.data)
            })
            .catch((error2) => {
            });
        return
    }

    return (
        <>
            {showModalClient ? (
                <ModalClient openModalState={openModalProduct} dni={dniToUpdate} />
            ) : (
                <span></span>
            )}


            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h2 className="h4">Clientes</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <a onClick={() => { openModalProduct(true); }} className="btn btn-sm btn-gray-800 d-inline-flex align-items-center">
                        <SvgPlus />
                        Agregar cliente
                    </a>
                </div>
            </div>

            <div className="card border-0 shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-centered table-nowrap mb-0 rounded">
                            <thead className="thead-light">
                                <tr>
                                    <th className="border-0 rounded-start">#</th>
                                    <th className="border-0">Nombre</th>
                                    <th className="border-0">Apellidos</th>
                                    <th className="border-0">Edad</th>
                                    <th className="border-0">Fecha de nacimiento</th>
                                    <th className="border-0">Dni</th>
                                    <th className="border-0">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clients.map((client, i) => (
                                        <tr key={client.id}>
                                            <td>{i + 1}</td>
                                            <td>{client.name}</td>
                                            <td>{client.lastname}</td>
                                            <td>{client.years_old}</td>
                                            <td>{client.birthday}</td>
                                            <td>{client.dni}</td>
                                            <td>
                                                <svg onClick={() => { updateClient(client.dni); }} className="icon icon-xs text-success ms-1 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                                                </svg>
                                                <svg onClick={() => { deleteClient(client.dni); }} className="icon icon-xs text-danger ms-1 cursor-pointer" data-bs-toggle="tooltip" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-bs-original-title="Delete" aria-label="Delete">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                                </svg>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
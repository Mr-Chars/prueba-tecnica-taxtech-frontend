
import React from 'react';
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from '../global/enviroment';
import { useFormik } from 'formik'

export const ModalClient = ({ openModalState, dni }) => {
    useEffect(() => {
        console.log(dni);
        if (dni) {
            getClient();
        }
    }, []);

    const getClient = () => {
        let params = 'listclients?dni=' + dni;

        axios.get(SERVER_URL + params)
            .then((response) => {
                console.log(response.data.data[0].name)
                formik.setFieldValue('name', response.data.data[0].name)
                formik.setFieldValue('lastname', response.data.data[0].lastname)
                formik.setFieldValue('years_old', response.data.data[0].years_old)
                formik.setFieldValue('birthday', response.data.data[0].birthday)
                formik.setFieldValue('dni', response.data.data[0].dni)
            })
            .catch((error2) => {
            });
        return
    }

    const validate = (values) => {
        const errors = {}

        if (!values.name) {
            errors.name = 'Requerido'
        } else if (values.name.length < 1) {
            errors.name = 'El nombre es muy corto'
        }

        if (!values.lastname) {
            errors.lastname = 'Requerido'
        } else if (values.lastname.length < 1) {
            errors.lastname = 'El nombre es muy corto'
        }

        if (!values.years_old) {
            errors.years_old = 'Requerido'
        } else if (values.years_old.length < 1) {
            errors.years_old = 'El nombre es muy corto'
        }

        if (!values.birthday) {
            errors.birthday = 'Requerido'
        } else if (values.birthday.length < 1) {
            errors.birthday = 'El nombre es muy corto'
        }

        if (!values.dni) {
            errors.dni = 'Requerido'
        } else if (values.dni.length < 1) {
            errors.dni = 'El nombre es muy corto'
        }
        return errors
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            years_old: '',
            birthday: '',
            dni: '',
        },
        validate,
        onSubmit: (values) => {
            console.log(values);
            if (dni) {
                axios.put(SERVER_URL + 'updateclient/' + values.dni, values)
                    .then((response) => {
                        closeModal()
                    })
                    .catch(function (error) {
                        closeModal()
                    });
            } else {
                axios.post(SERVER_URL + 'createclient', values)
                    .then((response) => {
                        closeModal()
                    })
                    .catch(function (error) {
                        closeModal()
                    });
            }
        }
    })

    const closeModal = () => {
        openModalState(false);
        window.location.reload();
    }

    return (
        <>
            <div className="modal fade show d-block" id="modal-default" aria-labelledby="modal-default" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="h6 modal-title">Agregar cliente</h2>
                            <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="email">Nombre</label>
                                        <input autoComplete='off' type="text" className="form-control" {...formik.getFieldProps('name')} />
                                        {formik.touched.name && formik.errors.name ?
                                            <div className='text-danger'>{formik.errors.name}</div> : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="email">Apellido</label>
                                        <input autoComplete='off' type="text" className="form-control" {...formik.getFieldProps('lastname')} />
                                        {formik.touched.lastname && formik.errors.lastname ?
                                            <div className='text-danger'>{formik.errors.lastname}</div> : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="email">Edad</label>
                                        <input autoComplete='off' type="number" className="form-control" {...formik.getFieldProps('years_old')} />
                                        {formik.touched.years_old && formik.errors.years_old ?
                                            <div className='text-danger'>{formik.errors.years_old}</div> : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="email">Cumpleaños</label>
                                        <input autoComplete='off' type="date" className="form-control" {...formik.getFieldProps('birthday')} />
                                        {formik.touched.birthday && formik.errors.birthday ?
                                            <div className='text-danger'>{formik.errors.birthday}</div> : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="email">Dni</label>
                                        <input autoComplete='off' type="number" className="form-control" {...formik.getFieldProps('dni')} />
                                        {formik.touched.dni && formik.errors.dni ?
                                            <div className='text-danger'>{formik.errors.dni}</div> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Guardar</button>
                                <button type="button" className="btn btn-danger ms-auto" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
            <div className="modal-backdrop fade show"></div>
        </>
    )
}
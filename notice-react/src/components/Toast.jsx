import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setToastFalse } from '../redux/toastStatus/action';

const ToastDiv = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 11px;
    min-width: 350px;
    transform: translate(-50%, -50%);
    justify-content: center;
    text-align: center;
    font-size: 18px;
    z-index: 99;
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 4px;
    border: 1px solid #000000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
`;

const Toast = () => {
    const toastStatus = useSelector((store) => store.toastStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (toastStatus.status) {
        let x = document.getElementById('snackbar');
        x.style.opacity = '0.8';
        x.style.visibility = 'visible';
        setTimeout(() => {
            x.style.opacity = '0';
            x.style.visibility = 'hidden';
            dispatch(setToastFalse());
        }, 3000);
        }
    }, [toastStatus.status, dispatch]);

    return <ToastDiv id="snackbar">{toastStatus.msg || 'Operation Successful'}</ToastDiv>;
};

export default Toast;
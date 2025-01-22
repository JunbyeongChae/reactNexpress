import React from 'react'
import { ContainerDiv } from '../../styles/FormStyles'
import { Card } from 'react-bootstrap'

const PayReadyPage = () => {
    return (
        <>
            <ContainerDiv>
                <Card>
                    <Card.Header>
                        <h3>결제 페이지</h3>
                    </Card.Header>
                    <Card.Body>
                        <iframe src='http://localhost:3000/pay/action' width="500px" height="600px">카카오페이 결제창</iframe>
                    </Card.Body>
                </Card>
            </ContainerDiv>
        </>
    )
}

export default PayReadyPage
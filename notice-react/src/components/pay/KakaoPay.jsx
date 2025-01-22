import React, { useEffect, useState } from 'react'

const KakaoPay = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        const checkIsLoaded = () => {
            if (window.IMP) {
            setIsLoaded(true);
            } else {
            setTimeout(checkIsLoaded, 100); //시간지나면 결제 취소
            }
        };
        checkIsLoaded();
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
        }, []);
        const handlePayment = () => {
        if (!isLoaded) {
            return;
        }
        const { IMP } = window;
        IMP.init([["imp00067405"]]); // 결제 데이터 정의
        const data = {
            pg: "kakaopay",
            pay_method: "card",
            merchant_uid: `mid_${new Date().getTime()}`,
            name: "아메리카노",
            amount: 2000,
            custom_data: { name: "부가정보", desc: "세부 부가정보" },
        };
        IMP.request_pay(data, callback);
        };
        const callback = (response) => {
        const { success, error_msg, paid_amount, name, pg_provider, pg_tid, pg_type, receipt_url, status, custom_data } = response;
        if (success) {//success=true
            console.log("success ===> ", success)//true
            console.log("name ===> ", name)//true
            console.log("amount ===> ", paid_amount)//2000
            console.log("pg_provider ===> ", pg_provider)//2000
            console.log("pg_tid ===> ", pg_tid)//거래번호
            console.log("pg_tid ===> ", pg_type)//point
            console.log("status ===> ", status)//point
            console.log("custom_data ===> ", custom_data)//point
            console.log("success response ===> ", response)//true

            alert("성공");
            //window.location.href = "/pay/complete"; // 결제 성공 시 /pay/complete 페이지로 이동
        } else {
            alert(`결제 실패 : ${error_msg}`);
        }
    };

    return (
        <>
            <button onClick={handlePayment} style={{ border:0, background: 'none' }}>
                <img src='/images/kakaopay/payment_icon_yellow_medium.png' alt='카카오페이 이미지' />
            </button>
        </>
    )
}

export default KakaoPay
import React from 'react'
import Signup from '../../auth/Signup'
import Signuptype from '../../auth/Signuptype'

const SignupPage = () => {
    const type = window.location.search.split('=')[1]
    const signuppage = () => {
        if(type){
            return <Signup />
        }else{
            return <Signuptype />
        }
    }//end of signuppage
    return (
        signuppage()
    )
}

export default SignupPage
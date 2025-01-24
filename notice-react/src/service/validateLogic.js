export const validateEmail = (e) => {//eslint-disable-next-line
    const re = (/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/);
    const email = e.target.value;
    if (email===''){
        return " "; 
        } else if(!re.test(email)){
        return "이메일 형식이 잘못되었습니다."; 
        } else {
        return "중복확인을 해주세요."; 
        }
    }
    
    
    export const validatePassword = (e) => {
        const pw = e.target.value;
        const num = pw.search(/[0-9]/g);
        const eng = pw.search(/[a-z]/ig);
        const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        const hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    
        if(pw.length===0){
        return " ";
        }else if(pw.length < 8 || pw.length > 20){
        return "8자리 ~ 20자리 이내로 입력해주세요.";
        }else if(hangulcheck.test(pw)){
        return "비밀번호에 한글을 사용 할 수 없습니다."; 
        }else if(pw.search(/\s/) !== -1){
        return "비밀번호는 공백 없이 입력해주세요.";
        }else if(num < 0 || eng < 0 || spe < 0 ){
        return "영문,숫자, 특수문자를 혼합하여 입력해주세요.";
        }else {
        return "";
        }
    
    }
    
    
    
    export const checkPassword = (pw, pw2) => {
        if(pw2){
        if(pw === pw2) {
            return ""; 
        } else {
            return "비밀번호가 일치하지않습니다.";
        }
        } else {
        return " ";
        }
    }
    
    
    export const validateName = (e) => {
        const name = e.target.value;
        const han = /^[가-힣]+$/;
        const eng = /^[a-zA-Z]+$/;
        if(name.length===0){
        return " ";
        } else if(han.test(name)||eng.test(name)){
        return "";
        } else {
        return "이름은 영어또는 한글로만 가능합니다.";
        }
    }
    
    
    export const validateBirthdate = (e) => {
        const birthday = e.target.value;
        const day = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
        if(birthday.length===0) {
        return " ";
        } else if(day.test(birthday)&&birthday.length===8){
        return "";
        } else {
        return "생년월일은 YYYYMMDD형식으로 적어주세요.";
        }
    
    }
    
    
    
    export const validateHp = (e) => {
        const hp = e.target.value;
    
        var reghp = /^01([0|1|6|7|8|9]?)([0-9]{4})([0-9]{4})$/;
    
        if(hp.length===0){
        return " ";
        } else if(!reghp.test(hp)){
        return "'-'를 제외한 번호를 적어주세요.";
        } else {
        return "";
        }
    
    }
    
    
    export const validateNickname = (e) => {
        const nickname = e.target.value;
        const check = /^[가-힣a-zA-Z0-9]+$/;
        if(nickname.length===0){
        return " ";
        } else if(nickname.length<2||nickname.length>10){
        return "2자리 ~ 10자리 이내로 입력해주세요.";
        } else if(nickname.search(/\s/) !== -1){
        return "닉네임은 공백 없이 입력해주세요.";
        } else if(check.test(nickname)) {
        return "중복확인을 해주세요.";
        } else {
        return "해당 닉네임은 사용할 수 없습니다.";
        }
    }
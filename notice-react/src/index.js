import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js'
import App from './App'
import { BrowserRouter } from 'react-router';
import 'react-quill/dist/quill.snow.css';
import AuthLogic from './service/authLogic';
import { app } from './service/firebase';
import { legacy_createStore } from 'redux';
import rootReducer from './redux/rootReducer'
import { Provider } from 'react-redux';
import { setAuth } from './redux/userAuth/action';
//인증을 위한 코드 추가
const authLogic = new AuthLogic(app)
const store = legacy_createStore(rootReducer)
store.dispatch(setAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider()))
//getState함수는 리덕스에서 제공하는 함수로 상태값을 확인함.
console.log(store.getState())

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        {/* App전체를 Provider감싸서 props전달될 store를 사용할 수  있음. */}
        <App />
      </Provider>
    </BrowserRouter>
  </>
);


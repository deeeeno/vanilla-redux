import {createStore} from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

const ADD = "ADD";
const MINUS = "MINUS";

const countAction = {type:'abc',payload:3};
//reducer
const countModifier = (state=0,action)=>{ 
    switch(action.type){
        case ADD:
            return state+1;
        case MINUS:
            return state-1;
        default:
            return state;
    }
};
const countStore = createStore(countModifier);

//subscribe -> state가 변할 시에 발동되는 콜백
countStore.subscribe(()=>{
    number.innerText = countStore.getState();
})
add.addEventListener("click",()=>countStore.dispatch({type:ADD}));
minus.addEventListener("click",()=>countStore.dispatch({type:MINUS}));
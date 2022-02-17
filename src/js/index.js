import {createStore} from 'redux';

const add = document.getElementById('add');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const ADD = "ADD";
const DELETE = "DELETE";

const toDoListReducer = (state=[],action)=>{
    switch(action.type){
        case ADD:
            //여기서 중요한건 state를 연산하는게 아니라 새로운 객체로써 state를 내보내야 한다는 것!!!!!!!!!!!!!!!
            return [...state,action.payload];
        case DELETE:
            const target_id = action.payload.text;
            return state.filter((toDo)=>toDo.time!==target_id);
        default:
            return state;
    }
}
const toDoListStore = createStore(toDoListReducer);

const toDoListAction = function(type=ADD,text){
    return{
        type:type,
        payload:{text,time:Date.now()}
    }
}
const addToDo = ()=>{
    const toDo = input.value;
    toDoListStore.dispatch(toDoListAction(ADD,toDo));
}
const removeToDo = (e)=>{
    const id = parseInt(e.target.parentNode.id);
    toDoListStore.dispatch(toDoListAction(DELETE,id));
}


toDoListStore.subscribe(()=>{
    ul.innerHTML = '';
    toDoListStore.getState().forEach(toDo=>{
        const li = document.createElement('li');
        li.id = toDo.time; li.innerText = toDo.text;
        const btn = document.createElement('button');
        btn.innerText = 'DELETE';
        btn.addEventListener("click",removeToDo);
        li.appendChild(btn);
        ul.appendChild(li);
    })
    input.value = '';
    
})
add.addEventListener("click",addToDo)
 
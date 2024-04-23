// id 命名不能和远程组件相同
// The problem I think is because you have the element with id which is equals to the name of your remote component. Try to find that element and change the id of it
document.querySelector("#microFeTwo").innerHTML = `<h1> 微前端二</h1>
<h1> This is the second Micro Frontend </h1>`;

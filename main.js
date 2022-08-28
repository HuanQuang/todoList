const input = document.querySelector('.input')
const listTask = document.querySelector('.list--task')
const tasks = []
function render(){
    let html = tasks.map((task, index) =>{
        return `<li class="task ${task.checkStatus === true? 'active' :``}">
                    ${task.content}
                    <div class="icon">
                        <i class="fa-solid fa-square-check" onclick = switchActive(${index})></i>
                        <i class="fa-solid fa-trash-can" onclick = removeTask(${index})></i>
                    </div>                   
                </li>`
       
    })
    listTask.innerHTML = html.join('')
}
render()
// thêm task vào list khi press Enter
input.addEventListener('keypress', e => {
    if(e.code ==='Enter'){
        tasks.push({content:input.value, checkStatus: false})
        render()
        input.value = ''
        updateLocalstorage()
        
    }
})
// Hàm check trạng thái task
function switchActive(index){
    document.querySelectorAll('.task')[index].classList.toggle('active')
    updateLocalstorage()

}
// Hàm xoá 1 task
function removeTask(index){
    tasks.splice(index, 1)
    render()
    updateLocalstorage()
}
// hàm update data vào localStorage
function updateLocalstorage(){
    let listTask = document.querySelectorAll('li')
    let todoStorage = []
    listTask.forEach(task => {
        let content = task.innerText
        let checkStatus = task.classList.contains('active')
        todoStorage.push({content, checkStatus})
    })
localStorage.setItem('listTask', JSON.stringify(todoStorage))

}
// Hàm khởi tạo, lấy dữ liệu từ localStorage ra
function init(){
    let data = localStorage.getItem('listTask')
    JSON.parse(data).forEach(item => {
        tasks.push(item)
    })
    render()
}
init()


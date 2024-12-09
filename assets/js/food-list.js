// biến const khai báo không đc phép gắn lại giá trị
let listFood = [];

let isEdit = false;

console.log("hello test");
document.querySelector("#btnThemMon").onclick = function () {
    console.log("Them mon");

    let foodID = document.querySelector("#foodID").value;
    let tenMon = document.querySelector("#tenMon").value;
    let loai = document.querySelector("#loai").value;
    let giaMon = document.querySelector("#giaMon").value;
    let khuyenMai = document.querySelector("#khuyenMai").value;
    let tinhTrang = document.querySelector("#tinhTrang").value;
    let hinhMon = document.querySelector("#hinhMon").value;
    let moTa = document.querySelector("#moTa").value;

    console.log(
        foodID,
        tenMon,
        loai,
        giaMon,
        khuyenMai,
        tinhTrang,
        hinhMon,
        moTa
    )

    let food = {
        id: foodID,
        ten: tenMon,
        loai: loai,
        gia: giaMon,
        khuyenMai: khuyenMai,
        tinhTrang: tinhTrang,
        hinhMon: hinhMon,
        moTa: moTa,
    }

    console.log(food);

    listFood.push(food);

    console.log(listFood);  
    renderListFood2(listFood);

    resetFormAddFood();
    saveListFood();
}

function resetFormAddFood() {
    let foodID = document.querySelector("#foodID");
    let tenMon = document.querySelector("#tenMon");
    let loai = document.querySelector("#loai");
    let giaMon = document.querySelector("#giaMon");
    let khuyenMai = document.querySelector("#khuyenMai");
    let tinhTrang = document.querySelector("#tinhTrang");
    let hinhMon = document.querySelector("#hinhMon");
    let moTa = document.querySelector("#moTa");

    foodID.value = "";
    tenMon.value = "";
    loai.value = "";
    giaMon.value = "";
    khuyenMai.value = "";
    tinhTrang.value = "";
    hinhMon.value = "";
    moTa.value = "";
}

function renderListFood2(lf) {
    const tbodyFood = document.getElementById('tbodyFood');
   
    if(listFood.length == 0){
        tbodyFood.innerHTML = "";
        return;
    }

    let content = "";

    for(let i = 0; i < lf.length; i++){
        const food = lf[i];

        console.log(food);

        content += `
            <tr>
                <td>${food.id}</td>
                <td>${food.ten}</td>
                <td>${showLoai(food.loai)}</td>
                <td>${food.gia}</td>
                <td>${food.khuyenMai}</td>


                <!-- @TODO -->    
                <td>${tinhGiaKhuyenMai(
                    Number(food.gia),
                    Number(food.khuyenMai)
                )}</td>
                <td>${showTinhTrang(food.tinhTrang)}</td>
                <td>
                    <button
                    data-toggle="modal"
                     data-target="#exampleModal"
                     onclick="handleEditFood('${food.id}')"
                    >edit</button>
                    <button onclick="handleDeleteFood('${food.id}')">delete</button>
                </td>

            </tr>
        `
    }

    

    tbodyFood.innerHTML = content;

}


function showLoai(loai) {
    if(loai == 'loai1'){
        return "chay"
    }

    return "mặn"
}

function showTinhTrang(tinhTrang) {
    if(tinhTrang == 0){
        return "hết"
    }

    return "còn"
}

function handleDeleteFood(id) {
    console.log("id", id);

    const index = findIndex(listFood, id);

    // kiểm tra id có tồn tại trong mảng hay ko

    // -1: không tồn tại
    if(index == -1){

        // thoát khỏi function , không tính toán nữa
        return;
    } 

    listFood.splice(index, 1);

    renderListFood2(listFood);
    saveListFood();
}



const lap = {
    name: 'macboook',
    price: 20,
}

const lapJSON = JSON.stringify(lap);
localStorage.setItem("laptop", lapJSON);

//lấy ra

const lapItem = localStorage.getItem("laptop");

// khôi phục lại

const lapItemObj = JSON.parse(lapItem);

function saveListFood() {
    const listFoodJSON = JSON.stringify(listFood)
    localStorage.setItem('listFood', listFoodJSON);
}

function restoreListFood() {
    const foods = localStorage.getItem("listFood");

    if(foods) {
        listFood = JSON.parse(foods);
    }
}

function init() {
    restoreListFood();
    
    renderListFood2(listFood);
}

init();

//-------------------
// disable button cap nhat khi click vao them mon an
// disable button them cua modal khi click vao edit

document.querySelector("#btnThem").onclick = function () {
    
    console.log('them mon an')
    let btnCapnhatEle = document.querySelector("#btnCapNhat");
    btnCapnhatEle.style.display = 'none';

    document.getElementById("btnThemMon").style.display = 'block';
}

function handleEditFood(id) {
    

    document.getElementById("btnCapNhat").style.display = 'block';
    document.getElementById("btnThemMon").style.display = 'none';

    const item = findItem(listFood, id);
    if(item === null){
        return;
    }
    let foodID = document.querySelector("#foodID");
    let tenMon = document.querySelector("#tenMon");
    let loai = document.querySelector("#loai");
    let giaMon = document.querySelector("#giaMon");
    let khuyenMai = document.querySelector("#khuyenMai");
    let tinhTrang = document.querySelector("#tinhTrang");
    let hinhMon = document.querySelector("#hinhMon");
    let moTa = document.querySelector("#moTa");
    debugger
    console.log(item);

    foodID.value = item.id;
    foodID.disabled = true;
    tenMon.value = item.ten;
    loai.value = item.loai;
    giaMon.value = item.gia;
    khuyenMai.value = item.khuyenMai;
    tinhTrang.value = item.tinhTrang;
    hinhMon.value = item.hinhMon;
    moTa.value = item.moTa;

    document.getElementById('btnCapNhat').onclick = function () {
        handleUpdateFood(item.id);
    }
    // isEdit = true;
}

const arr = [
    { id: 1, age: 20},
    { id: 2, age: 21},
    { id: 3, age: 22},
    { id: 4, age: 23},
]

const id = 3;

function findItem(arr, key) {
    for(let i = 0; i < arr.length; i++){
        let item = arr[i];

        if (item.id === key){
            return arr[i]
        }
    }
    return null;
    
}

function handleUpdateFood(id) {
    let foodID = document.querySelector("#foodID").value;
    let tenMon = document.querySelector("#tenMon").value;
    let loai = document.querySelector("#loai").value;
    let giaMon = document.querySelector("#giaMon").value;
    let khuyenMai = document.querySelector("#khuyenMai").value;
    let tinhTrang = document.querySelector("#tinhTrang").value;
    let hinhMon = document.querySelector("#hinhMon").value;
    let moTa = document.querySelector("#moTa").value;
    
    let food = {
        id: foodID,
        ten: tenMon,
        loai: loai,
        gia: giaMon,
        khuyenMai: khuyenMai,
        tinhTrang: tinhTrang,
        hinhMon: hinhMon,
        moTa: moTa,
    }
debugger
    const index = findIndex(listFood, id);

    if(index === -1){
        return;
    }

    listFood[index] = food;

    renderListFood2(listFood);

    document.querySelector('#foodID').disabled = false;
}

function handleResetFormEdit() {
    if (isEdit) {
        resetFormAddFood();

        document.querySelector('#foodID').disabled = false;
        isEdit = false;
    }
}

document.getElementById('exampleModal').onclick = function (event) {
    if (event.target.id === 'exampleModal') {
        handleResetFormEdit();
    }
};

document.getElementById('btn-close').onclick = handleResetFormEdit;
document.getElementById('icon-close').onclick = handleResetFormEdit;
document.getElementById('selLoai').onchange = function (event) {
    console.log(event.target.value);
    const loai = event.target.value;
    const newArr = filterArr(listFood, loai);
    renderListFood2(newArr);
}
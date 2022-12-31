
// POST function to post user data to the app
// const register = async (url,data) =>{
//     const response = await fetch(url, {
//         method: "POST", 
//         credentials: "same-origin", 
//         headers: {
    //             "Content-Type": "application/json",
    //         },
//         body: JSON.stringify(data)
//     });
//     try {
    //         const newData = await response.json();
    //     }catch(error) {
        //       console.log("error", error);
        //     }
// }

// Function to filter cars
// const search = async () =>{
//     const request = await fetch("/get");
//     try {
//     // Transform into JSON
//     const allData = await request.json();
//     }
//     catch(error) {
    //       console.log("error", error);
    //       // appropriately handle the error
    //     }
// }

var data;
var sliders = [];
var ssn;
var user_info;

const userInit = async(s) =>{
    let data = {"ssn":s}; 
    const response = await fetch("http://localhost:8000/userinit", {
        method: "POST", 
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const res = await response;
        if (!res.ok){
            return false;
        }
        console.log(res);
        user_info = await res.json();
        return true;
    }catch(error) {
        console.log("Login error", error);
    }
}



function updateS() {
    
}

function updateB(values,handle) {
    document.getElementById("searchPanel").getElementsByTagName("li")[this.options.handleAttributes[0].slider].getElementsByTagName("input")[handle].value = values[handle];
}

function build(){
    
}

const init = async () =>{
    user_info = {};
    ssn = -1;
    if(typeof(sessionStorage) != 'undefined') {
        if (sessionStorage.getItem("mySsn")) {
            ssn = sessionStorage.getItem("mySsn");
        }
    }
    if (ssn != -1){
        await userInit(ssn);
        sessionStorage.setItem("reservations",JSON.stringify(user_info));
    }
    console.log(user_info);
    const request = await fetch("http://localhost:8000/init");
    let db;
    try {
        // Transform into JSON
        db = await request.json();
        data = db.models;
        // Write updated data to DOM elements
        addMakes(db.makes);
        addImgs(db.models);
        addColors(db.colors);
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }

    let year = document.getElementById('yearSlider');
    let milage = document.getElementById('milageSlider');
    let hp = document.getElementById('hpSlider');
    let price = document.getElementById('priceSlider');
    
    noUiSlider.create(year, {
        start: [db.year[0],db.year[1]],
        connect: true,
        handleAttributes: [
            { 'slider': '0' },
            { 'slider': '0' },
        ],
        behaviour: 'drag-tap',
        range: {
            'min': db.year[0],
            'max': db.year[1]
        },
        pips: {
            mode: 'count',
            values: 4,
            density: 3
        }
    });
    noUiSlider.create(milage, {
        start: [db.milage[0],db.milage[1]],
        connect: true,
        handleAttributes: [
            { 'slider': '1' },
            { 'slider': '1' },
        ],
        behaviour: 'drag-tap',
        range: {
            'min': db.milage[0],
            'max': db.milage[1]
        },
        pips: {
            mode: 'count',
            values: 4,
            density: 3
        }
    });
    noUiSlider.create(hp, {
        start: [db.hp[0],db.hp[1]],
        connect: true,
        handleAttributes: [
            { 'slider': '2' },
            { 'slider': '2' },
        ],
        behaviour: 'drag-tap',
        range: {
            'min': db.hp[0],
            'max': db.hp[1]
        },
        pips: {
            mode: 'count',
            values: 4,
            density: 3
        }
    });
    noUiSlider.create(price, {
        start: [db.price[0],db.price[1]],
        connect: true,
        handleAttributes: [
            { 'slider': '3' },
            { 'slider': '3' },
        ],
        behaviour: 'drag-tap',
        range: {
            'min': db.price[0],
            'max': db.price[1]
        },
        pips: {
            mode: 'count',
            values: 4,
            density: 3
        }
    });

    year.noUiSlider.on("update",updateB);
    milage.noUiSlider.on("update",updateB);
    hp.noUiSlider.on("update",updateB);
    price.noUiSlider.on("update",updateB);

    sliders[0] = year;
    sliders[1] = milage;
    sliders[2] = hp;
    sliders[3] = price;
}

function printData(){
    document.getElementById("detailsPanel").car=this.id;
    document.getElementById("c_plate_id").textContent ="plate id: "+data[this.id].plate_id;
    document.getElementById("c_make").textContent ="make: "+data[this.id].make;
    document.getElementById("c_model").textContent = "model: "+data[this.id].model;
    document.getElementById("c_year").textContent = "year: "+data[this.id].year;
    document.getElementById("c_color").textContent = "color: "+data[this.id].color;
    document.getElementById("c_milage").textContent = "milage: "+data[this.id].milage;
    document.getElementById("c_hp").textContent = "horse power: "+data[this.id].hp;
    document.getElementById("c_price").textContent = "daily price: "+data[this.id].d_price;
    document.getElementById("reserveSection").className = "";
}

function toggle_model() {
    let makes = document.getElementById("makes").getElementsByTagName("input");
    let c = 0;
    while (c < makes.length) {
        if (this.make === makes[c].make) {
            if(this.checked && !makes[c].checked){
                makes[c].click();
                break;
            }
        }
        c++;
    }
}

function addImgs(models) {
    let c = 0;
    let imgs = document.createDocumentFragment();
    let frag = document.createDocumentFragment();
    for (let car of models) {
        if(!c){
            item = document.createElement("label");
            item.textContent = car.make+" "+car.model+" ";
            box = document.createElement("input");
            box.name = c;
            box.make = car.make;
            box.model = car.model;
            box.type = "checkbox";
            box.checked = "True";
            box.addEventListener("change",toggle_model);
            item.appendChild(box);
            frag.appendChild(item);
        }
        else if(car.model !== models[c-1].model){
            item = document.createElement("label");
            item.textContent = car.make+" "+car.model+" ";
            box = document.createElement("input");
            box.name = c;
            box.make = car.make;
            box.model = car.model;
            box.type = "checkbox";
            box.checked = "True";
            box.addEventListener("change",toggle_model);
            item.appendChild(box);
            frag.appendChild(item);
        }
        img = document.createElement("img");
        img.id = c++;
        img.src = "https://cdn.imagin.studio/getImage?customer=egmuhammedgebrilcompany&make="+car.make+"&modelFamily="+car.model;
        img.addEventListener("click",printData);
        imgs.appendChild(img);
    }
    document.getElementById("models").appendChild(frag);
    document.getElementById("items").appendChild(imgs);
}

function toggle_make() {
    let models = document.getElementById("models").querySelectorAll("input");
    for (let model of models) {
        if(model.make === this.make){
            if(this.checked !== model.checked){
                model.click();    
            }
        }
    }
}

function addMakes(makes) {
    let frag = document.createDocumentFragment();
    let item , box;
    for (let make of makes) {
        item = document.createElement("label");
        item.textContent = make.make+" ";
        box = document.createElement("input");
        box.make = make.make;
        box.type = "checkbox";
        box.checked = "True";
        box.addEventListener("change",toggle_make);
        item.appendChild(box);
        frag.appendChild(item);
    }
    document.getElementById("makes").appendChild(frag);
}

function filter() {
    let c = 0;
    let imgs = document.getElementById("items").getElementsByTagName("img");
    let models = document.getElementById("models").getElementsByTagName("input");
    let colors = document.getElementById("colors").getElementsByTagName("input");
    let years = [document.getElementById("yearL").value,document.getElementById("yearU").value];
    let milages = [document.getElementById("milageL").value,document.getElementById("milageU").value];
    let hps = [document.getElementById("hpL").value,document.getElementById("hpU").value];
    let prices = [document.getElementById("priceL").value,document.getElementById("priceU").value];
    let color;
    let model;
    while (c < imgs.length) {
        for (let i = 0; i < models.length; i++) {
            if (data[c].model === models[i].model) {
                model = models[i];
                break;
            }
        }
        for (let i = 0; i < colors.length; i++) {
            if (data[c].color === colors[i]["data-color"]) {
                color = colors[i];
                break;
            }
        }
        if(color.checked && model.checked && inRange(data[c],years,milages,hps,prices)){
            if(!imgs[c].checkVisibility()) imgs[c].style = "";
        } else if (imgs[c].checkVisibility()){
            imgs[c].style = "display:none; visibility:hidden;"
        }
        c++;
    }    
}

function inRange(car,years,milages,hps,prices) {
    if(car.year >= years[0] && car.year <= years[1]){
        if(car.milage >= milages[0] && car.milage <= milages[1]){
            if(car.hp >= hps[0] && car.hp <= hps[1]){
                if(car["d_price"] >= prices[0] && car["d_price"] <= prices[1]){
                    return true;
                }
            }
        }
    }
    return false;
}


function resetFilter() {
    let makes = document.getElementById("makes").getElementsByTagName("input");
    let models = document.getElementById("models").getElementsByTagName("input");
    let colors = document.getElementById("colors").getElementsByTagName("input");
    for (let i = 0; i < makes.length; i++) {
        if(!makes[i].checked) makes[i].click();
    }
    for (let i = 0; i < models.length; i++) {
        if(!models[i].checked) models[i].click();
    }
    for (let i = 0; i < colors.length; i++) {
        if(!colors[i].checked) colors[i].click();
    }
    for (let slider of sliders) {
        slider.noUiSlider.reset();
    }
    filter();
}


function addColors(colors) {
    let frag = document.createDocumentFragment();
    let item , box;
    for (let color of colors) {
        item = document.createElement("label");
        item.textContent = color.color+" ";
        box = document.createElement("input");
        box["data-color"] = color.color;
        box.type = "checkbox";
        box.checked = "True";
        item.appendChild(box);
        frag.appendChild(item);
    }
    document.getElementById("colors").appendChild(frag);
}

const reserveCar = async(s, d) =>{
    let p_id = data[document.getElementById("detailsPanel").car].plate_id;
    let data = {s_date: s, d_date: d, my_ssn:ssn, plate_id: p_id}; 
    const response = await fetch("http://localhost:8000/doreserve", {
        method: "POST", 
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const res = await response;
        if (!res.ok){
            return false;
        }
        let resj = await res.json();
        let pay = {plate_id: p_id, R_id: resj.R_id}
        sessionStorage.setItem("payment",JSON.stringify(pay));
        window.location.href='payment.html';
        return true;
    }catch(error) {
        console.log("Reserve error", error);
    }
}

function reserve(){
    let s_date = document.getElementById("s_date").value;
    let d_date = document.getElementById("d_date").value;
    let s_date_js = new Date(s_date);
    let now_date = new Date();
    if (d_date < s_date || s_date_js < now_date){
        alert("Invalid date range!");
        return false;
    }


}

document.addEventListener("DOMContentLoaded",init);


// Adding listener to make the appropriate http requests
// document.getElementById("generate").addEventListener("click",() =>{
    //     getData(baseUrl,document.getElementById("zip").value,apiKey).then((d) =>{
//         postData("/post",{
    //             date: newDate,
//             temp: d.main.temp,
//             feel: feeling.value
//         });
//     }).then(updateUi);
// });

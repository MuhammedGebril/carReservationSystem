
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

const init = async () =>{
    const request = await fetch("http://localhost:8000/init");
    try {
        // Transform into JSON
        const db = await request.json();
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
}

function printData(){
    document.getElementById("c_make").textContent ="make: "+data[this.id].make;
    document.getElementById("c_model").textContent = "model: "+data[this.id].model;
    document.getElementById("c_year").textContent = "year: "+data[this.id].year;
    document.getElementById("c_color").textContent = "color: "+data[this.id].color;
    document.getElementById("c_milage").textContent = "milage: "+data[this.id].milage;
    document.getElementById("c_hp").textContent = "horse power: "+data[this.id].hp;
    document.getElementById("c_price").textContent = "daily price: "+data[this.id].d_price;
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
        if(color.checked && model.checked){
            if(!imgs[c].checkVisibility()) imgs[c].style = "";
        } else if (imgs[c].checkVisibility()){
            imgs[c].style = "display:none; visibility:hidden;"
        }
        c++;
    }    
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
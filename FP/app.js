
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

const init = async () =>{
    const request = await fetch("http://localhost:8000/init");
    try {
    // Transform into JSON
    const data = await request.json();
    console.log(data);
    // Write updated data to DOM elements
    let frag = document.createDocumentFragment();
    let imgs = document.createDocumentFragment();
    let item , box , c = 0;
    for (let make of data.makes) {
        item = document.createElement("label");
        item.textContent = make+" ";
        box = document.createElement("input");
        box.type = "checkbox";
        box.checked = "True";
        item.appendChild(box);
        frag.appendChild(item);
        img = document.createElement("img");
        img.src = "https://cdn.imagin.studio/getImage?customer=egmuhammedgebrilcompany&paintId=2r&paintDescription=black&make="+make+"&modelFamily="+data.models[c++];
        imgs.appendChild(img);
        img = document.createElement("img");
        img.src = "https://cdn.imagin.studio/getImage?customer=egmuhammedgebrilcompany&paintId=2r&paintDescription=black&make="+make+"&modelFamily="+data.models[c++];
        imgs.appendChild(img);
    }
    document.getElementById("makes").appendChild(frag);
    document.getElementById("items").appendChild(imgs);
    frag = document.createDocumentFragment();
    for (let model of data.models) {
        item = document.createElement("label");
        item.textContent = model+" ";
        box = document.createElement("input");
        box.type = "checkbox";
        box.checked = "True";
        item.appendChild(box);
        frag.appendChild(item);
    }
    document.getElementById("models").appendChild(frag);
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
}
document.addEventListener("DOMContentLoaded",init)

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
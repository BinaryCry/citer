import './style.css'
import doc from './img/doc.jpg'
import jsonData from './data/data.json'

const root = document.getElementById('root');

root.innerHTML = "Hello WebPack";

let img = new Image();
img.src = doc;

root.appendChild(img);

console.log(jsonData);


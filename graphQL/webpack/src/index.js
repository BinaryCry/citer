import printMe from './printMe';
import './fonts_assets.css';
import './index.css';
import './style.less';
import docImg from './doc.jpg'

const doc = document.getElementById('doc');
let img = new Image();
img.src = docImg;
doc.appendChild(img);

printMe();


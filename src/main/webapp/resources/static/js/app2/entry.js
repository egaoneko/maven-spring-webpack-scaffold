import '../../css/app2.scss';

const name = "app2";
const init = (name) => {
    let p = document.createElement('p');
    p.innerText = `${name} is loaded`;
    document.querySelector('.center').appendChild(p);
};

export {
    name,
    init
};
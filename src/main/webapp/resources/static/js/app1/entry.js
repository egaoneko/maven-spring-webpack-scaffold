import '../../css/app1.scss';

const name = "app1";
const init = (name) => {
    let p = document.createElement('p');
    p.innerText = `${name} is loaded`;
    document.querySelector('.center').appendChild(p);
};

export {
    name,
    init
};
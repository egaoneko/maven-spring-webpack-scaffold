/* global jQuery */

import module from './module'
import '../../css/app1.scss';

const name = "app1";
const init = (name) => {
    let p = document.createElement('p');
    p.innerText = `${name} is loaded`;
    document.querySelector('.center').appendChild(p);
    p = jQuery('<p>');
    p.text(`jquery is loaded`);
    jQuery('.center').append(p);
};

export {
    name,
    module,
    init
};
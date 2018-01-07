// @flow

import typeof {imagesList} from "../model/images-list";

const imageView = (selector: string, imageView: imagesList) => {

    const list = document.querySelector(selector);

    if (list) {
        const imageDraw = (url: string, i: number) => {
            return new Promise((res, rej) => {
                const img = document.createElement('img');
                list.appendChild(img);
                img.src = url;
                img.addEventListener('load', () => {
                    res('success ' + (i + 1))
                });
            })
        };

        let promise = Promise.resolve('success ' + 0);

        imageView.forEach((el, i) => {
            promise = promise.then((x) => {
                console.log(x);
                return imageDraw(el, i);

            })
        })
    }


};

export {imageView}
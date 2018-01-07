// @flow

import typeof {guitarList} from "../model/guitar-list";

const setElementsCords = (parent: HTMLElement, child: HTMLElement) => {
    const parentCords = parent.getBoundingClientRect();
    child.style.left = parentCords.left + 'px';
    child.style.top = parentCords.top + 'px';
    child.style.width = parentCords.width + 'px';
    child.style.height = parentCords.height + 'px';
};

const guitarView = (selector: string, guitarList: guitarList) => {
    const list = document.querySelector(selector);

    if (list) {
        const template = list.querySelector('#guitar');
        const docEl = document.documentElement;
        if (template && template.parentNode && docEl) {
            template.parentNode.removeChild(template);
            guitarList.forEach((guitar)=>{
                const guitarElement = template.cloneNode(true);
                const text = guitarElement.querySelector('[data-text]');
                const title = guitarElement.querySelector('[data-title]');
                const subtitle = guitarElement.querySelector('[data-subtitle]');
                const img = guitarElement.querySelector('[data-img]');
                if (title && subtitle && img instanceof HTMLImageElement && text) {
                    title.innerText = guitar.title;
                    subtitle.innerText = guitar.subtitle;
                    img.src = guitar.url;
                    img.addEventListener('click', ()=>{
                        const cordsImg = img.getBoundingClientRect();
                        const article = guitarElement.getBoundingClientRect();
                        const docWidth = docEl.clientWidth;
                        const docHeight = docEl.clientHeight;
                        const details = list.querySelector('#details');
                        const background = list.querySelector('[data-background]');
                        const detailImg = list.querySelector('[data-details-img]');
                        if (details && background && detailImg instanceof HTMLImageElement) {
                            setElementsCords(guitarElement, background);
                            const divX = docWidth/background.clientWidth;
                            const divY = cordsImg.height/background.clientHeight;
                            background.style.transform = ` translate(${docWidth/2 - article.right + article.width/2}px, ${docHeight/2 - (article.top + article.height/2)}px) scaleX(${divX}) scaleY(${divY}) scaleZ(1)`;
                            setElementsCords(img, detailImg);
                            detailImg.src = img.src;
                            const price = details.querySelector('[data-price]');
                            const description = details.querySelector('[data-description]');
                            const detailsTitle = details.querySelector('[data-title]');
                            const detailsSubTitle = details.querySelector('[data-subtitle]');
                            const detailsText = details.querySelector('[data-text]');
                            if (price && description && detailsTitle && detailsSubTitle && detailsText) {
                                detailsTitle.innerText = guitar.title;
                                detailsSubTitle.innerText = guitar.subtitle;
                                detailsText.classList.add('details__text_shown');
                                price.innerText = guitar.price.toString();
                                description.innerText = guitar.description;
                                const detailImgCords = detailImg.getBoundingClientRect();
                                detailImg.style.transform = `translate(${-detailImgCords.left + cordsImg.left}px, ${-detailImgCords.top + cordsImg.top}px)`;
                                details.classList.add('details_shown');
                                details.setAttribute('data-shown', '');
                                setTimeout(()=>{
                                    detailImg.classList.add('details__img_shown');
                                    detailImg.style.transform = `translateX(0px) translateY(0px)`;
                                    detailImg.addEventListener('click', ()=>{
                                        detailsText.classList.remove('details__text_shown');
                                        background.style.transform = `translate(0px, 0px)`;
                                        background.style.zIndex = '';
                                        const transEnd = () => {
                                            details.classList.remove('details_shown');
                                            detailImg.classList.remove('details__img_shown');
                                            detailImg.style.transform = ``;
                                            background.removeEventListener('transitionend', transEnd);
                                        };
                                        background.addEventListener('transitionend', transEnd);
                                        detailImg.style.transform = `translate(${-detailImgCords.left + cordsImg.left}px, ${-detailImgCords.top + cordsImg.top}px)`;
                                    })
                                }, 10);
                            }
                        }
                    })
                }
                list.appendChild(guitarElement);
            })
        }
    }
};

export {guitarView}
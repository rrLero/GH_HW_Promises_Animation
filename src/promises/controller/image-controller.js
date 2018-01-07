// @flow

import {imageView} from "../view/image-view";
import {imagesList} from "../model/images-list";

const imageController = () => {

    imageView('#images-list', imagesList)

};

export {imageController};
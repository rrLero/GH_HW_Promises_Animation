// @flow

import {guitarView} from "../view/guitar-view";
import {guitarList} from "../model/guitar-list";

const guitarController = () => {

    guitarView('#guitar-list', guitarList)

};

export {guitarController};
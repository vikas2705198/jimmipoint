'use strict';


module.exports = {
    generateId: generateId
}

function generateId(assetType){
    return new Date().valueOf().toString();
}
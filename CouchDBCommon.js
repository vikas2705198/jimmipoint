/**
 * 
Copyright 2018 SBSA Technologies

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 * 
 * 
 */

/**
@author: Vikas
@version: 1.0
@date: 
**/


var logHelper = require('./utils/logging.js');
var logger = logHelper.getLogger('CouchDBCommon');
var fs = require('fs');
var couchDBConfigData = fs.readFileSync('couchdb.json', 'utf8');
var couchDBConfig = JSON.parse(couchDBConfigData);
//console.log("Couch DB URL :: ", (couchDBConfig.protocol + '://'+"admin:admin@" + couchDBConfig.hostname + ':' + couchDBConfig.port + "/" + couchDBConfig.db))
const couchdb = require('nano')(couchDBConfig.protocol + '://' +"admin:admin@" + couchDBConfig.hostname + ':' + couchDBConfig.port + "/" + couchDBConfig.db);
console.log("Couch DB URL :: ", (couchDBConfig.protocol + '://' + couchDBConfig.hostname + ':' + couchDBConfig.port + "/" + couchDBConfig.db))
//const couchdb = require('nano')(couchDBConfig.protocol + '://' + couchDBConfig.hostname + ':' + couchDBConfig.port + "/" + couchDBConfig.db);
module.exports = {
    readByKey: readByKey,
    saveByKeyValue: saveByKeyValue,
    deleteByKey: deleteByKey,
    save: save,
    find: find
}
async function readByKey(key) {
    var response;
    logger.info('Enter readByKey ');
    try {
        response = await couchdb.get(key);

    } catch (e) {
        logger.error(' readByKey error: ', e);
        return e;
    }
    logger.info('Exit readByKey ');
    return response;
}

async function saveByKeyValue(key, value) {
    var savedata;
    logger.info('Enter saveByKeyValue');
    try {
        savedata = await couchdb.insert(value, key);
    }
    catch (e) {
        logger.error('Exception', e);
        return e;
    }
    logger.info('Exit saveByKeyValue');
    return savedata;
}
async function save(value) {
    var data;
   
    logger.info('Enter save');
    try {
        data = await couchdb.insert(value);
    }
    catch (e) {
        logger.error('Save error occurred: ', e);
        console.log("error------",e)
        return e;
    }
    logger.info('Exit save');
    return data;
}
async function find(selector) {

    console.log("----",selector)
    var result;
    var response = [];
    logger.info('Enter find');
    try {
        result = await couchdb.find({selector: selector})
        logger.info('Found ' + result.docs.length + ' documents ');
        for (var i = 0; i < result.docs.length; i++) {
            console.log('  Doc :: ', result.docs[i]);
            response.push(result.docs[i])
        }
    }
    catch (e) {
        logger.error(' find error:', e);
        return e;
    }
    return response;
}

async function deleteByKey(key) {
    console.log("key---->",key)
    var doc;
    var response;
    try {
        logger.info('Enter deleteByKey');
      //  doc = await couchdb.get(key);
        doc = await find(key);
        console.log("Doc--->", doc);
    }
    catch (e) {
        logger.error(' find error:', e);
        return e;
    }
    try {

        var dataobj = doc[0];
        var id = dataobj['_id'];
        var key = dataobj['_rev'];
        console.log("Dociidddcdcddc--->", id, key);
        response = couchdb.destroy(id, key);
    }
    catch (e) {
        logger.error('deleteByKey:', e);
        return e;
    }
    logger.info('Exit deleteByKey');
    return response;

}





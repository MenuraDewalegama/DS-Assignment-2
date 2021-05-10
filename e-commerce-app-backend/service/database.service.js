/*
@author : Dhanusha Perera
@date : 10/05/2021
*/

export default class DatabaseService {
    static databaseFileName = './db';
    static databaseName = 'ecommerceDB';

    constructor(collectionName) {
        this.collection = require(DatabaseService.databaseFileName)
            .db(DatabaseService.databaseName)
            .collection(collectionName);
        // if (DatabaseUtil._instance) {
        //     return DatabaseUtil._instance;
        // }
        // DatabaseUtil._instance = this;
    }

    /** save record in the database.
     * @param object BSON object to be saved.
     * @return Promise with the driver generated ObjectId for the insert operation if successfully inserted,
     * otherwise error. */
    save(newObject) {
        return new Promise((resolve, reject) => {
            try {
                const result = this.collection.insertOne(newObject);
                if (result.insertedId) {
                    /* successfully inserted ,resolve generated ID. */
                    resolve(result.insertedId);
                } else {
                    reject(throw new Error('Insertion failed: No record inserted!'));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /** update a given record in the database.
     * @param id (_id) attribute value (primary key value).
     * @param objectWithNewValue BSON object containing new values.
     * @return Promise with result if successfully inserted, otherwise error. */
    update(id, objectWithNewValue) {
        return new Promise((resolve, reject) => {
            try {
                const result = this.collection.updateOne({_id: ObjectId(id)}, {
                    $set: objectWithNewValue
                });

                if (result.modifiedCount === 1) {
                    resolve(true);
                } else {
                    reject(throw new Error(`Update failed: no record updated. 
                    modifiedCount: ${result.modifiedCount}`));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /** delete the record by given ID.
     * @param id id of the record to be deleted.
     * @return Promise if successfully deleted resolve boolean true,
     * otherwise rejected error.
     * */
    delete(id) {
        return new Promise((resolve, reject) => {
            try {
                const result = this.collection.deleteOne({id: id});

                if (result.deletedCount === 1) {
                    resolve(true);
                } if (result.deletedCount === 0){
                    resolve(false);
                } else {
                    reject(throw new Error(`Something went wrong: no record(s) deleted. 
                    deleteCount: ${result.deletedCount}`));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /** find record by given ID.
     * @param id id of the record to be retrieved from the database.
     * @return Promise with requested record; if found,
     * otherwise return rejected error. */
    findById(id) {
        return new Promise((resolve, reject) => {
            try {
                const cursor = this.collection.find({_id: ObjectId(id)});
                if (cursor.toArray()[0]) {
                    resolve(cursor.toArray()[0]);
                } else {
                    reject(throw new Error('Something went wrong: No matching record found!'));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /** find all the records.
     * @return Promise with requested record(s), if found.
     * If nothing found without errors, then returns a empty array.,
     * otherwise return rejected error. */
    findAll() {
        return new Promise((resolve, reject) => {
            try {
                const cursor = this.collection.find({});
                if (cursor.toArray().length >= 0) {
                    resolve(cursor.toArray());
                } else {
                    reject(throw new Error('Something went wrong: No record(s) found!'));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

}

import { db } from '../firebase.js';

function Model(_table) {
  return class {
    static async create(data) {
      const docId = Date.now().toString();
      const tableRef = db.collection(_table).doc(docId);
      const newData = Object.assign({}, data, { _id: docId });
      await tableRef.set(newData, { merge: true });
      const newEntity = await db.collection(_table).doc(docId).get();
      return newEntity.data();
    }

    static async getAll() {
      const snapshot = await db.collection(_table).get()
      return snapshot.docs.map(doc => doc.data());
    }
    
    static async findByField(field, compare, value) {
      const findArr = [];
      const tableRef = db.collection(_table);
      const snapshot = await tableRef.where(field, compare, value).get();
      snapshot.forEach(doc => findArr.push(doc.data()));
      return findArr;
    }
    
    static async findById(docId) {
      const doc = await db.collection(_table).doc(docId).get();
      return doc.data();
    }
    
    static async findByIdAndUpdate(docId, data) {
      const updatedAt = Date.now().toString();
      const tableRef = db.collection(_table).doc(docId);
      const newData = Object.assign({}, data, { updatedAt: updatedAt });
      await tableRef.update(newData, { merge: true });
      const updEntity = await db.collection(_table).doc(docId).get();
      return updEntity.data();
    }
    
    static async findByIdAndDelete(docId) {
      await db.collection(_table).doc(docId).delete();
    }

    static async getPosts(arrUserId) {
      const findArr = [];
      await Promise.all(arrUserId.map(async (userId) => {
        const snaps = await this.findByField("userId", '==', userId);
        findArr.push(snaps);
      }));
      return findArr;
    }
  };
};


export default Model;
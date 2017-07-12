import Realm from 'realm';
import uuidv4 from 'uuid/v4';

class HistorySchema extends Realm.Object {}

HistorySchema.schema = {
  name: 'History',
  primaryKey: 'id',
  properties: {
    id: 'string',
    cityId: 'int',
    temperature: 'double',
    time: 'string',
    timestamp: 'int'
  }
};

export class HistorySchemaDAO {

  static addHistoryRecord(realm, record) {
    // let id;
    // if (record.id) {
    //   id = record.id;
    // } else {
    //   UUIDGenerator.getRandomUUID().then((uuid) => {
    //     id = uuid;
    //   })
    // }

    const id = record.id ? record.id : uuidv4();
    const { cityId, temperature, time } = record;
    console.log(cityId, temperature, time);

    if (!realm.objects('History').some(history => (history.cityId === cityId && history.time === time))) {
      realm.write(() => {
        realm.create('History',
          {
            id,
            cityId,
            temperature,
            time,
            timestamp: Date.now(),
          });
      });
    }
    if (realm.objects('History').length > 10) {
      console.log("length", realm.objects('History').length);
      let tail = realm.objects('History').sorted('timestamp', true).slice(10);
      realm.write(() => {
        realm.delete(tail);
      })
    }
  }

  static getHistoryRecords(realm) {
    return realm.objects('History').sorted('timestamp', true);
  }
}

export default new Realm({ schema: [HistorySchema] });
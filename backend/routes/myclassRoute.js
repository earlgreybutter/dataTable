const { Router } = require('express');
const myclassRouter = Router();
const mongoose = require('mongoose');
const { MyclassModel } = require('../models/adminMyClass');
const { Certification } = require('../models/Certification');
const { Sequelize } = require('sequelize');

// Todo. Credential select 선택 시, 해당 user 가 가진 table 을 모두 보여주는 api
myclassRouter.post('/checkconnection', async (req, res) => {
  try {
    console.log(req.body);
    const { selectedDB, dbip, dbport, dbname, username, password } = req.body;

    const sequelize = new Sequelize(dbname, username, password, {
      host: dbip,
      dialect: selectedDB,
      port: dbport,
    });

    await sequelize
      .authenticate()
      .then(async () => {
        await sequelize
          .getQueryInterface()
          .showAllSchemas()
          .then((tableObj) => {
            console.log('// Tables in database', '==========================');
            console.log(tableObj);
            return res
              .status(200)
              .send([{ customMsg: 'Connection Success' }, tableObj]);
          })
          .catch((err) => {
            console.log('showAllSchemas ERROR', err);
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(200).send([{ customMsg: 'Connection Failed' }]);
      });

    // sequelize.close();
  } catch (err) {
    console.log(err);
  }
});

// show column
myclassRouter.post('/checkcolumns', async (req, res) => {
  try {
    console.log(req.body);
    const { selectedDB, selectedTable, ip, port, dbname, username, password } =
      req.body;

    const { SequelizeAuto } = require('sequelize-auto');

    const auto = new SequelizeAuto(dbname, username, password, {
      host: ip,
      dialect: selectedDB,
      port: port,
    });

    var myclassToJson = [];
    auto.run().then(async (data) => {
      try {
        const initModels = require('../models/init-models');

        const sequelize = new Sequelize(dbname, username, password, {
          host: ip,
          dialect: selectedDB,
          port: port,
        });

        const models = initModels(sequelize);
        console.log('before');
        console.log(models);
        console.log(selectedTable);
        console.log(models[selectedTable]);

        let colArr = [];
        for (let key in models[selectedTable].rawAttributes) {
          // console.log('Field: ', key); // this is name of the field
          // console.log('TypeField: ', models[selectedTable].rawAttributes[key].type.key); // Sequelize type of field
          colArr.push({
            key: key,
            type: models[selectedTable].rawAttributes[key].type.key,
          });
        }
        console.log(colArr);

        return res.send(colArr);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// show table data
myclassRouter.post('/checktabledata', async (req, res) => {
  try {
    console.log(req.body);
    const { selectedDB, selectedTable, ip, port, dbname, username, password } =
      req.body;

    const { SequelizeAuto } = require('sequelize-auto');

    const auto = new SequelizeAuto(dbname, username, password, {
      host: ip,
      dialect: selectedDB,
      port: port,
    });

    auto.run().then(async (data) => {
      try {
        console.log(data.tables[selectedTable]); // table and field list
        // console.log(data.foreignKeys); // table foreign key list
        // console.log(data.indexes); // table indexes
        // console.log(data.hasTriggerTables); // tables that have triggers
        // console.log(data.relations); // relationships between models
        // console.log(data.text); // text of generated models

        return res.send(data.tables[selectedTable]);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Todo. Dynamic Tables - RDBMS 로드 시, 해당하는 모든 Credential Documents find 하는 api
myclassRouter.get('/showcredentialinfo', async (req, res) => {
  try {
    const certificationResult = await Certification.find({
      credentialCategory: 'rdbms',
    });
    return res.send(certificationResult);
  } catch (err) {
    return res.status(500).send('Error');
  }
});

// insert test
myclassRouter.post('/rdbms', async (req, res) => {
  try {
    console.log(req.body);

    // 1. 사용자로부터 CredentialName 을 받아온다.
    // 2. CredentialName 으로 Certification Documents 를 찾는다.
    // 3. 해당 Certification Documents 로
    const { selectedDB, dbip, dbport, dbname, username, password } = req.body;

    const { SequelizeAuto } = require('sequelize-auto');

    const auto = new SequelizeAuto(dbname, username, password, {
      host: dbip,
      dialect: selectedDB,
      port: dbport,
    });

    var myclassToJson = [];
    auto
      .run()
      .then(async (data) => {
        try {
          // console.log(data.tables); // table and field list
          // console.log(data.foreignKeys); // table foreign key list
          console.log(data.indexes); // table indexes
          // console.log(data.hasTriggerTables); // tables that have triggers
          // console.log(data.relations); // relationships between models
          // console.log(data.text); // text of generated models

          const initModels = require('../models/init-models');

          const sequelize = new Sequelize(dbname, username, password, {
            host: dbip,
            dialect: selectedDB,
            port: dbport,
          });

          sequelize
            .authenticate()
            .then(console.log('Success'))
            .catch(console.log('Fail')); // Todo. 수정 필요

          const models = initModels(sequelize);

          var myclass = await models.myclasses.findAll({
            attributes: [
              ['ROW_ID', 'index'],
              ['CLASS', 'class'],
              ['USER_ID', 'userId'],
              ['SEMESTER', 'semester'],
              ['SUBJECT', 'subject'],
              ['SCORE', 'score'],
            ],
          });

          console.log(typeof myclass);

          const dataString = JSON.stringify(myclass);
          const dataArr = JSON.parse(dataString);
          myclassToJson = dataArr;

          console.log(typeof myclassToJson);

          for (let i = 0; i < myclassToJson.length; i++) {
            myclassToJson[i].tableName = 'localhostmysql'; // Todo. 사용자가 입력한 테이블명 받아오기
            // delete myclassToJson[i]['pk'];
          }

          console.log(myclassToJson[0]);
          console.log(myclassToJson[1]);
          return res.send(myclassToJson);
          // json 을 mongodb에 넣기
        } catch (err) {
          return res.send(err);
        }
      })
      .then(async () => {
        try {
          // console.log(myclassToJson);
          await MyclassModel.insertMany(myclassToJson);
          console.log(myclassToJson);
          return res.send(myclassToJson);
        } catch (err) {
          console.log(err);
          // return res.send(err);
        }
      });

    // sequelize.close();
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

myclassRouter.post('/mongodb', async (req, res) => {
  try {
    // const adminConn = mongoose.createConnection(
    //   'mongodb://localhost:27017/admin',
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }
    // );
    const externalConn = mongoose.createConnection(
      'mongodb://192.168.92.147:27017/admin',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    await MyclassModel.find({}, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = { myclassRouter };

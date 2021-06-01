import mongoose from 'mongoose';

require('dotenv').config();

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const dbName = process.env.DB_NAME;
    console.log(user);
    console.log(password);
    console.log(dbName);
    this.mongoConnection = mongoose.connect(`mongodb+srv://${user}:${password}@personalprojectscluster.jyth1.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
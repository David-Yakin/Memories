import { connect } from "mongoose";
import chalk from "chalk";

const connectToDB = () => {
  connect("mongodb://127.0.0.1:27017/memories")
    .then(() =>
      console.log(chalk.magentaBright("connected to MongoDb Locally!"))
    )
    .catch(error =>
      console.log(
        chalk.redBright.bold(`could not connect to mongoDb: ${error}`)
      )
    );
};

export default connectToDB;

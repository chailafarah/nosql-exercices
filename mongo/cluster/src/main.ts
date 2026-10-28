import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client
  .db("marketplace")
  .collection("products");

const stream = products.watch();

stream.on("change", (event) => {
  console.log(event);
});

setInterval(async() => {
  await products.insertOne({test: "1"})
}, 1000);


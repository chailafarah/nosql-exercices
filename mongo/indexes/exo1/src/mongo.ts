import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products")

await products.createIndex({ "categories.id": 1 });

const result = await products.find({ "categories.id": "accessories" }).toArray();

console.log(result);

// on doit voir IXSCAN (et pas COLLSCAN)
const explain = await products.find({ "categories.id": "accessories" }).explain();

console.log(JSON.stringify(explain.queryPlanner.winningPlan, null, 2));

await client.close()

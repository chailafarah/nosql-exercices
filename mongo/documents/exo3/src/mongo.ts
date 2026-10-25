import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products")

// avec stock: { quantity: 8 } on perd reserved et warehouse
await products.updateOne(
  { name: "Laptop Pro 14" },
  {
    $set: {
      "stock.quantity": 8,
    },
  },
);

const result = await products.findOne({ name: "Laptop Pro 14" });

console.log(result);

await client.close()

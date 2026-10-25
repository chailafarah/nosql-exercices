import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products")

// la requete proposee remplace tout l'objet stock :
// on obtient stock: { quantity: 8 } et on perd reserved et warehouse
// avec la notation par point on modifie juste quantity
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

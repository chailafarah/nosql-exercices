import { GlideClient } from "@valkey/valkey-glide";

const valkey = await GlideClient.createClient({
  addresses: [{
    host: process.env.VALKEY_HOST!,
    port: 6379,
  }],
});

// vues
await valkey.incr("product:1:views");
console.log("vues :", await valkey.get("product:1:views"));

// session
await valkey.hset("session:abc", {
  userId: "user:1",
  role: "customer",
});
await valkey.expire("session:abc", 1800);
console.log("session :", await valkey.hgetall("session:abc"));

// 20 derniers produits vus
await valkey.lpush("user:1:recent:products", ["product:1"]);
await valkey.ltrim("user:1:recent:products", 0, 19);
console.log("recents :", await valkey.lrange("user:1:recent:products", 0, -1));

// users connectes
await valkey.sadd("online:users", ["user:1"]);
console.log("user:1 connecte :", await valkey.sismember("online:users", "user:1"));

// classement
await valkey.zincrby("leaderboard:products", 1, "product:1");
console.log("classement :", await valkey.zrangeWithScores("leaderboard:products", { start: 0, end: -1 }));

// cache fiche produit
await valkey.set(
  "cache:product:1",
  JSON.stringify({ id: "product:1", name: "Laptop Pro 14", price: 1499 }),
  { expiry: { type: "EX", count: 60 } },
);
console.log("cache :", await valkey.get("cache:product:1"));

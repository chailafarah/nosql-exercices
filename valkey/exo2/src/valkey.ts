import { GlideClient } from "@valkey/valkey-glide";

const subscriber = await GlideClient.createClient({
  addresses: [{
    host: process.env.VALKEY_HOST!,
    port: 6379,
  }],
  pubsubSubscriptions: {
    channelsAndPatterns: {},
    callback: (message) => {
      console.log(message.channel);
      console.log(message.message);
    },
    context: null,
  },
});

// s'abonner avant le publish sinon on recoit rien
await subscriber.subscribe(new Set(["notifications"]), 5000);

const publisher = await GlideClient.createClient({
  addresses: [{
    host: process.env.VALKEY_HOST!,
    port: 6379,
  }],
});

await publisher.publish("hello", "notifications");

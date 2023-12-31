const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  brokers: ['localhost:29092'],
});

const createConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'test-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'product-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
};

createConsumer();

import { createConnections } from 'typeorm';

(async () => {
  let retries = 5;
  while (retries) {
    try {
      createConnections();
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }
})();
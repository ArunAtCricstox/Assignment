// import { singularSdk, SingularConfig } from 'singular-sdk'
import {singularSdk, SingularConfig} from "singular-sdk";

function initSingular() {
  //   const config = new SingularConfig(apiKey, secretKey, productId);
  const config = new SingularConfig(
    'e720d72f4052a9d7553a8e1987692481dcf34dae78bb254dbe9c54881f5de5d0',
    'aea09a17d33f8771b6c21d22b54e8653',
    'in.HornClaw.CricStox'
  ).withInitFinishedCallback((initParams) => {
    // This callback will be called when the init method has finished
    console.log(initParams);
    // You can get Singular Device id here
    const singularDeviceId = initParams.singularDeviceId;
    console.log(singularDeviceId);
  });

  singularSdk.init(config);
}
export default initSingular;

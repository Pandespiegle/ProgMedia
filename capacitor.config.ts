import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pandule.app',
  appName: 'ListApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;

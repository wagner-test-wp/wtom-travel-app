import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'wtom.travel.app',
  appName: 'wtom-travel-app',
  webDir: 'www',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    },
  }
};

export default config;

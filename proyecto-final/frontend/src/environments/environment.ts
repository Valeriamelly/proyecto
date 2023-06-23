// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'kanbanfire-aaa0a',
    appId: '1:1023465133587:web:dd5381a67eac06c6cf91e6',
    storageBucket: 'kanbanfire-aaa0a.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyBU5sUqWPgeZNU2nhMHyhB6eYhzVSpJsNw',
    authDomain: 'kanbanfire-aaa0a.firebaseapp.com',
    messagingSenderId: '1023465133587',
    measurementId: 'G-HL2Q4X1THT',
  },
  production: false,
  base_url: 'http://localhost:8080/api/v1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

# Word Search JS
Simple word search game used as a test bed for learning and experimenting with web technologies.\
By Ahmed Tawfik

## Run requirements
Due to the use of JS modules, CORS browser policies prevent running directly from the filesystem. Running this HTML requires running from a web server.

### Building
Ensure you have typescript and source-map-support:\
```npm install typescript```\
```npm install source-map-support --save```

Build the typescript into javascript before running:\
```tsc```\
The dist folder under root should now contain new javascript files.

### Running
Download http-server via npm: ```npm install -g http-server```

Ensure you're on the root folder of this project and run the http server: ```http-server```\
Click on the link printed in the console to open in the default browser.

## Running unit tests
Run via terminal using `npm run test` or via IntelliJ Jest run configuration. Note that this will also enter the console into watch mode.
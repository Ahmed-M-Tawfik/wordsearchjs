# Word Search JS
Simple word search game used as a test bed for learning and experimenting with web technologies.

By Ahmed Tawfik

## Run requirements
Due to the use of JS modules, CORS browser policies prevent running directly from the filesystem. Running this HTML requires running from a web server.

### Building
Ensure you have typescript and source-map-support:
```shell
npm install typescript
```
```shell
npm install source-map-support --save
```

Build the typescript into javascript before running:
```shell 
tsc
```
The dist folder under root should now contain new javascript files.

### Running
Download http-server via npm:
```shell 
npm install -g http-server
```

Ensure you're on the root folder of this project and run the http server:
```shell
http-server
```
Click on the link printed in the console to open in the default browser.

## Running unit tests
Run via terminal or via IntelliJ Jest run configuration:
```shell
npm run test
```
Note that this will also enter the console into watch mode.
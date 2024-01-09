# Word Search JS
Simple word search game used as a test bed for learning and experimenting with web technologies.

By Ahmed Tawfik

## Run requirements
Due to the use of JS modules, CORS browser policies prevent running directly from the filesystem. Running this HTML requires running from a web server.

### Building
Install application dependencies via NPM, then build a production build:
```shell
npm install
```
```shell
npm run build
```
Now contents of `dist` folder are ready to be deployed to a static web server. 

You may use preview mode to verify correct build in `dist` folder:
```shell
npm run preview
```

### Running in dev mode
```shell
npm run dev
```
Click on the link printed in the console to open in the default browser. Note that this will also enter the console and browser into watch mode, updating the browser on every change under `./src`.

### Linting
```shell
npm run lint
```

## Running unit tests
Run via terminal or via IntelliJ ViTest run configuration:
```shell
npm run test
```
Note that this will also enter the console into watch mode.
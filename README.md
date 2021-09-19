# Breathe App
breathe app helps you control your feels by breathing

designed by [Vitali Stepanov](https://dribbble.com/VitaliStepanov) ( [Breathe widget for the Relax App](https://dribbble.com/shots/5959314-Breathe-widget-for-the-Relax-App) )

## Installation
After cloning the repository, you should install packages.
```bash
$ npm install
```
And then for starting bundle process
```bash
$ npm start
```
App will be avaiable in `localhost:4200`

For bundling the app without running `webpack-dev-server` you could use these scripts
```bash
# developmnet bundle
$ npm run build:dev

# production bundle
npm run build:local
```

Note: You **_Shouldn't_** use `npm run build:prod` for local bundling, because it's only used in github actions and will not work correctly in local.

For running a bundle in local, you shuold use
```bash
$ npm run server
```
You can see the app in `localhost:5320` and also you can use this methode for remote debugging.
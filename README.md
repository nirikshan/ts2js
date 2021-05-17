# ts2js
The node.js script to convert typescript to Babel (es) code.

# How to use

Place run.js file to tsx project you want to convert to js. set some of the value in run.js
 ```js
  const SCANNING_PATH = './src'; /*Location where your code are*/
  const REPLACE_TS_FILE_WITH_JS = true; /*Do you want to replace old tsx and ts file to js.*/
  const TYPE_SCRIPT_EXT = '.ts'; /* The extension we use on our projects. */
 
 ```
 

Note : Maintain the version of package yourself this is simply the example packages I have used on my project.



### Add this packages of required version. As a dev or packaging dependency. - on Package.js  
```json
    "@babel/cli": "^7.13.16",
    "@babel/core": "^7.14.2",
    "@babel/plugin-transform-runtime": "^7.14.2",
    "@babel/plugin-transform-typescript": "^7.13.0",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.14.2",
    "@babel/register": "^7.13.16",
    "@babel/runtime": "^7.14.0",
```

### Remove this packages. - on Package.js

```json
    "@types/node": "^11.12.1",
    "ts-loader": "^5.3.3",
    "typescript": "^3.4.1",
```




## Add js babel loaded on webpack.config.js. - on webpack.config.js

```js
    {
      test: /\.js$/,
      use:[
        {
          loader:'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              require('@babel/plugin-proposal-object-rest-spread'),
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      ]
   }
```


### Remove ts loader and modules if you have. - on webpack.config.js

```js
  {
      test: /\.tsx?$/,
      loader: "ts-loader"
  }
```

### change entry point. - on webpack.config.js

```
  .
  .
  entry: ['babel-polyfill' , "./src/main.js"],
  resolve: {
      extensions: [".js"]
  }
  .
  .
```

### Final Command to use

```bash
node ./run.js
```

Congratulation you are done. If you have any problem using this package feel free to ping on my email.

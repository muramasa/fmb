var NwBuilder = require('node-webkit-builder');
var nw = new NwBuilder({
    buildDir: 'dist',
    files: './**/**', // use the glob format
    platforms: ['win', 'osx']
    //winIco: 'res/slack.ico'
});

// Log stuff you want
nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
    console.log('all done!');
}).catch(function (error) {
    console.error(error);
});


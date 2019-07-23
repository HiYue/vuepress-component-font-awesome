const fs = require('fs')
const path = require('path')
const argv = require('yargs').argv
const allIcons = require('./lib/all')
const solidIcons = require('./lib/solid')

// keys of icons
let keys = Object.keys(allIcons);
let solidKeys = Object.keys(solidIcons);

let defaultDotVuepressFolder = '/.vuepress';

// get argument
if(argv.dest){
    defaultDotVuepressFolder = argv.dest + defaultDotVuepressFolder;
}

let defaultDest = defaultDotVuepressFolder + '/components'

console.log(defaultDest);

let targetFolder = path.resolve(__dirname, '../../' + defaultDest);

console.log(targetFolder);

if(!fs.existsSync(targetFolder)){
    // Create components folder
    fs.mkdirSync(targetFolder);
    console.log('Target components folder is created!');
}

// Create fa folder
targetFolder += '/Fa'

// Let's check if the user has specified the icons
try{
    const configFile = path.resolve(__dirname, '../../' + defaultDotVuepressFolder + '/config.js');
    let config = require(configFile);
    if(typeof config.thirdPartyComponents !== 'undefined'){
        if(typeof config.thirdPartyComponents.fontAwesomeIcons !== 'undefined'){
            if(typeof config.thirdPartyComponents.fontAwesomeIcons.regular !== 'undefined' && config.thirdPartyComponents.fontAwesomeIcons.regular.length > 0){
                // regular icons key
                keys = config.thirdPartyComponents.fontAwesomeIcons.regular;
            }
            if(typeof config.thirdPartyComponents.fontAwesomeIcons.solid !== 'undefined' && config.thirdPartyComponents.fontAwesomeIcons.solid.length > 0){
                // regular icons key
                solidKeys = config.thirdPartyComponents.fontAwesomeIcons.solid;
            }
            // Remove all files from 'Fa' folder
            if(fs.existsSync(targetFolder)){
                fs.readdirSync(targetFolder).forEach((file) => {
                    fs.unlinkSync(path.join(targetFolder, file));
                })
            }
        }
    }
}
catch(e){
    console.log("Can not locate your .vuepress/config.js file ...")
}

if(!fs.existsSync(targetFolder)){
    // Create folder
    fs.mkdirSync(targetFolder);
    console.log('Target Fa folder is created!');
}
// It's ready to hold font awesome components

console.log('Generating Font Awesome Icon components for you ...');

function jsUcfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Generate component in string
function getContent(iconName, templateName){
    return '<template><span><font-awesome-icon :icon="theIcon" :pulse="pulse" :border="border" :spin="spin" :pull="pull" :flip="flip" :rotation="rotation" :size="size" :style="attachStyles()"></font-awesome-icon></span></template>' + '\n' +
    '<script>import { library } from "@fortawesome/fontawesome-svg-core";' +  '\n' +
    'import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";' +  '\n' +
    'import { '+iconName+' } from "@fortawesome/free-solid-svg-icons";' +  '\n' +
    'library.add('+iconName+');' +  '\n' +
    'export default {' +  '\n' +
    '   name: "'+templateName+'",' +  '\n' +
    '   components: {FontAwesomeIcon},' +  '\n' +
    '   props:{' +  '\n' +
    '       size: {type: String,required: false,default: null},' +  '\n' +
    '       color: { type: String, required: false, default: null},' +  '\n' +
    '       rotation: { type: [String, Number], required: false, default: null},' +  '\n' +
    '       flip: { type: String, required: false, default: null},' +  '\n' +
    '       pull: { type: String, required: false, default: null},' +  '\n' +
    '       spin: { type: Boolean, required: false, default: false},' +  '\n' +
    '       pulse: { type: Boolean, required: false, default: false},' +  '\n' +
    '       border: { type: Boolean, required: false, default: false},' +  '\n' +
    '   },' +  '\n' +
    '   computed:{ theIcon(){return ' +iconName+ '}},' +  '\n' +
    '   methods: {attachStyles: function(){return this.color ? {color: this.color} : {}}}' +  '\n' +
    '}' +  '\n' +
    '</script>';
}

function getContentSolid(iconName, templateName){
    return '<template><span><font-awesome-icon :icon="theIcon" :size="size" :style="attachStyles()"></font-awesome-icon></span></template>' + '\n' +
    '<script>import { library } from "@fortawesome/fontawesome-svg-core";' +  '\n' +
    'import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";' +  '\n' +
    'import { '+iconName+' } from "@fortawesome/free-solid-svg-icons";' +  '\n' +
    'library.add('+iconName+');' +  '\n' +
    'export default {' +  '\n' +
    '   name: "'+templateName+'",' +  '\n' +
    '   components: {FontAwesomeIcon},' +  '\n' +
    '   props:{' +  '\n' +
    '       size: {type: String,required: false,default: null},' +  '\n' +
    '       color: { type: String, required: false, default: null}' +  '\n' +
    '   },' +  '\n' +
    '   computed:{ theIcon(){return ' +iconName+ '}},' +  '\n' +
    '   methods: {attachStyles: function(){return this.color ? {color: this.color} : {}}}' +  '\n' +
    '}' +  '\n' +
    '</script>';
}

// Create all regular icons
const countRegularIcons = keys.length;
// let strRegularIcons = keys.join(', ');
for(let i=0; i< countRegularIcons; i++){
    let arr = keys[i].split('-');
    let filename = '';
    for(let j=0; j < arr.length; j++){
        filename += jsUcfirst(arr[j]);
    }
    const content = getContent('fa' + filename, 'Fa' + filename);
    filename += '.vue';
    filename = targetFolder + '/' + filename;
    fs.writeFileSync(filename, content);
}
// fs.writeFileSync(path.resolve(__dirname,'lib/regular-icons.txt'), strRegularIcons);

// Create all solid icons
const countSolidIcons = solidKeys.length;
// let strSolidIcons = solidKeys.join(', ');
for(let i=0; i< countSolidIcons; i++){
    let arr = solidKeys[i].split('-');
    let filename = '';
    for(let j=0; j < arr.length; j++){
        filename += jsUcfirst(arr[j]);
    }
    const content = getContent('fa' + filename, 'Fa' + filename);
    filename += '.vue';
    filename = targetFolder + '/' + filename;
    fs.writeFileSync(filename, content);
}
// fs.writeFileSync(path.resolve(__dirname,'lib/solid-icons.txt'), strSolidIcons);

console.log('done! All your components are located in: ' + targetFolder);
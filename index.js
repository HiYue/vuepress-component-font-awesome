const fs = require('fs')
const path = require('path')
const allIcons = require('./lib/all')
const solidIcons = require('./lib/solid')
const argv = require('yargs').argv

let defaultDest = '/.vuepress/components'
// get argument
if(argv.dest){
    defaultDest = argv.dest + defaultDest;
}

console.log(defaultDest);

let targetFolder = path.resolve(__dirname, '../../' + defaultDest);

console.log(targetFolder);

if(!fs.existsSync(targetFolder)){
    // Create folder
    fs.mkdirSync(targetFolder);
    console.log('Target components folder is created!');
}

// Create fa folder
targetFolder += '/Fa'
if(!fs.existsSync(targetFolder)){
    // Create folder
    fs.mkdirSync(targetFolder);
    console.log('Target Fa folder is created!');
}

console.log('Generating Font Awesome Icon components for you ...');

const keys = Object.keys(allIcons);

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

for(let i=0; i< keys.length; i++){
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

const solidKeys = Object.keys(solidIcons);

for(let i=0; i< solidKeys.length; i++){
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

console.log('done! All your components are located in: ' + targetFolder);
const fs = require('fs')
const path = require('path')
const allIcons = require('./lib/all')
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

// faEnvelope
function getContent(iconName, templateName){
    return '<template><span><font-awesome-icon :icon="theIcon" :size="size" :style="attachStyles()" /></span></template>' + 
    '<script>import { library } from "@fortawesome/fontawesome-svg-core";' + 
    'import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";' + 
    'import { '+iconName+' } from "@fortawesome/free-solid-svg-icons";' + 
    'library.add('+iconName+');' + 
    'export default {' + 
    '   name: "'+templateName+'",' + 
    '   components: {FontAwesomeIcon},' + 
    '   props:{' +  '\n' +
    '       size: {type: String,required: false,default: null},' + 
    '       color: { type: String, required: false, default: null}' + 
    '   },' + 
    '   computed:{ theIcon(){return ' +iconName+ '}},' + 
    '   methods: {attachStyles: function(){return this.color ? {color: this.color} : {}}}' + 
    '}' + 
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

console.log('done! All your components are located in: ' + targetFolder);
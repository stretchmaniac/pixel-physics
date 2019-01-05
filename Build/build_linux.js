const files = require('fs');
const shell = require('shelljs');

// Remove result directory, then add it back (remove all the files)
// /s is for removing all sub-elements, /q is for quiet (no confirmation)
if(files.existsSync('result')){
	shell.exec('rm -r result');
}
shell.exec('mkdir result');

// copy entire ace-src-min and img folders
for(const name of ['ace-src-min', 'img']){
    shell.exec(`cp -r "../${name}" "result/${name}"`);
}

// copy pixel.js, index.html and styles.css
shell.exec('cp ../pixel.js result/');
shell.exec('cp ../index.html result/');
shell.exec('cp ../styles.css result/');
const files = require('fs');
const exec = require('child_process').execSync;

// Remove result directory, then add it back (remove all the files)
// /s is for removing all sub-elements, /q is for quiet (no confirmation)
if(files.existsSync('result')){
	exec('rmdir /s /q result');
}
exec('mkdir result');

// copy entire ace-src-min and img folders
for(const name of ['ace-src-min', 'img']){
	exec(`echo d | xcopy /s /q /r /y "../${name}" "result/${name}"`);
}

// copy pixel.js, index.html and styles.css
exec('copy "..\\pixel.js" "result\\pixel.js"');
exec('copy "..\\index.html" "result\\index.html"');
exec('copy "..\\styles.css" "result\\styles.css"');
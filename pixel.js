/*global $,ace*/ 
$(function(){
    var canvas = document.getElementById('canvas');
    var container = document.getElementsByClassName('canvas-container')[0];
    canvas.width=container.clientWidth;
    canvas.height=container.clientHeight;
    drawGrid(canvas,20);
    canvasEvents();
    buttonEvents();
    otherInitialization();
})

var examples = {
    rule30:{
        typeCode:[
        `var n = getNeighbor;
var s = n([-1,-1]).type+  '' + n([0,-1]).type + '' + n([1,-1]).type;
s = s.replace(/null/g,'0');
if(s == '200' || s=='002' || s=='020' || s=='022'){
    writeSelf(2);
}

writeSeveral([[-1,1],[0,1],[1,1]], 1);

remove();`],
        collisionCode:['    return changes[0].type;'],
        title:"Stephen Wolfram's rule 30",
        pixs:[
            "46,27,1","45,28,0",
            "46,28,0","47,28,0"
            ]
    },

    conwaysGameOfLife:{
        typeCode:[
        `var s = getNeighborSum([1]);
if(s < 2 || s > 3){
    writeSelf(2);
}`,
`var s = getNeighborSum([1]);
if(s === 3){
    writeSelf(1);
    mapNeighborhood(function(pix,pos){
        if(pix.type !== 1){
            write(pos,2);
        }
    });
}else if(s === 0){
    remove();
}`], 
        collisionCode:[`    var finalType;
    for(var k = 0; k < changes.length; k++){
        if(changes[k].type !== null){
            finalType = changes[k].type;
        }
        if(finalType === 1){
            return 1;
        }
    }
    return finalType;`],
        title:"Conway's Game of Life",
        pixs:[
            "46,27,0","46,28,0","45,28,0","46,29,0","47,29,0","45,27,1","44,27,1","45,26,1","46,26,1","47,26,1","47,27,1",
            "47,28,1","48,28,1","48,29,1","45,30,1","46,30,1","47,30,1","48,30,1","44,29,1","45,29,1","44,28,1"]
    },
    statisticalMovement:{
        typeCode:[
`var direction = [(Math.random()-.5)<0?-1:1,(Math.random()-.5)<0?-1:1];

var n = getNeighbor(direction);

if(n.type === null || n.type === 1){
    move(direction);
}else{
    move([0,0]);
}`,`var pt1 = [(Math.random()-.5)<0?-1:1,(Math.random()-.5)<0?-1:1];

var pt1T = getNeighbor(pt1);

if(pt1T.type === null || pt1T.type === 1){
    write(pt1,1);
    writeSelf(1);
}`,'',`var pt1 = [(Math.random()-.5)<0?-1:1,(Math.random()-.5)<0?-1:1];

var pt1T = getNeighbor(pt1);

if(pt1T.type === null || pt1T.type === 1){
    write(pt1,1);
    writeSelf(2);
}`,`var pt1 = [(Math.random()-.5)<0?-1:1,(Math.random()-.5)<0?-1:1];

var pt1T = getNeighbor(pt1);

if(pt1T.type === null || pt1T.type === 1){
    write(pt1,1);
    writeSelf(4);
}`,`var pt1 = [(Math.random()-.5)<0?-1:1,(Math.random()-.5)<0?-1:1];

var pt1T = getNeighbor(pt1);

if(pt1T.type === null || pt1T.type === 1){
    write(pt1,1);
    writeSelf(5);
}`],
        collisionCode:[
        `    var types = [];
    for(var k = 0; k < changes.length; k++){
        if(changes[k].type !== null){
            types.push(changes[k].type);
        }
    }
    if(types.length === 0){
        return null;
    }
    if(types.length === 1){
        return 1;
    }
    if(types.length === 2){
        return 2;
    }
    //quite rare
    return types.length+1`],
        title:"Statistical Movement",
        pixs:["18,5,2",
        "18,6,2","18,7,2","18,8,2","18,9,2","18,10,2","18,11,2","18,12,2","18,13,2","18,14,2","18,15,2","18,16,2","18,17,2","18,18,2","18,19,2","18,20,2","18,21,2","18,22,2","18,23,2","18,24,2","18,25,2","18,26,2","18,27,2","18,28,2","18,29,2","18,30,2","18,31,2","18,32,2","18,33,2","18,34,2","18,35,2","18,36,2","18,37,2","18,38,2","18,39,2","18,40,2","18,41,2","18,42,2","18,43,2","18,44,2","19,5,2","19,44,2","20,5,2","20,44,2","21,5,2","21,44,2","22,5,2","22,44,2","23,5,2","23,44,2","24,5,2","24,44,2","25,5,2","25,44,2","26,5,2","26,44,2","27,5,2","27,44,2","28,5,2","28,44,2","29,5,2","29,44,2","30,5,2","30,44,2","31,5,2","31,44,2","32,5,2","32,44,2","33,5,2","33,44,2","34,5,2","34,44,2","35,5,2","35,44,2","36,5,2","36,44,2","37,5,2","37,44,2","38,5,2","38,44,2","39,5,2","39,44,2","40,5,2","40,44,2","41,5,2","41,44,2","42,5,2","42,44,2","43,5,2","43,44,2","44,5,2","44,44,2","45,5,2","45,44,2","46,5,2","46,44,2","47,5,2","47,44,2","48,5,2","48,44,2","49,5,2","49,44,2","50,5,2","50,44,2","51,5,2","51,44,2","52,5,2","52,44,2","53,5,2","53,44,2","54,5,2","54,44,2","55,5,2","55,44,2","56,5,2","56,44,2","57,5,2","57,44,2","58,5,2","58,44,2","59,5,2","59,44,2","60,5,2","60,6,2","60,7,2","60,8,2","60,9,2","60,10,2","60,11,2","60,12,2","60,13,2","60,14,2","60,15,2","60,16,2","60,17,2","60,18,2","60,19,2","60,20,2","60,21,2","60,22,2","60,23,2","60,24,2","60,25,2","60,26,2","60,28,2","60,29,2","60,30,2","60,31,2","60,32,2","60,33,2","60,34,2","60,35,2","60,36,2","60,37,2","60,38,2","60,39,2","60,40,2","60,41,2","60,42,2","60,43,2","60,44,2","60,27,2","55,43,0","33,6,0","19,17,0","59,33,0","35,39,0","21,10,0","22,33,0","22,19,0","57,20,0","53,30,0","51,32,0","50,30,0","27,38,0","25,38,0","48,18,0","29,10,0","44,23,0","50,43,0","39,27,0","36,33,0","32,26,0","36,19,0","40,14,0","41,14,0","48,13,0","53,19,0","49,26,0","43,32,0","45,36,0","51,38,0","54,36,0","46,39,0","39,36,0","31,34,0","28,28,0","31,19,0","32,15,0","39,11,0","44,10,0","51,9,0","58,15,0","56,24,0","56,30,0","57,40,0","41,41,0","31,41,0","22,24,0","26,18,0"]
    },
	serpinsky:{
        typeCode:[
        `writeSeveral([[-1,0],[0,1]], 1);
writeSelf(2);`,''],
        collisionCode:['    return null;'],
        title:"Sierpinski's Triangle",
        pixs:["48,25,0"]
    }
}

var view={
    magnification:20,
    origin:[0,0]
}
var state={
    mousedown:false,
    mousePosition:[0,0],
    mousedownPosition:[0,0],
    selecting:false,
    selection:{},
    selectionClipBoard:{},
    rightClick:false,
    controlKeyPressed:false,
    activeSettingsType:0,
    menuOpen:false,
    //play states: 'play', 'pause'
    playState:'pause',
    //frame time in milliseconds
    frameTime:100,
    minFrameTime:true,
    stepState:{
        neighborWidth:2
    },
    collisionFunc:null,
}
var pixels={};
var types=[];
var currentType=null;
var editor;
var collisionEditor;
var colorSet=['rgb(189, 42, 125)','rgb(42, 189, 179)','rgb(189, 106, 42)',
    'rgb(125, 189, 42)','rgb(179, 42, 189)','rgb(42, 189, 106)',
    'rgb(189, 42, 51)','rgb(42, 125, 189)','rgb(189, 179, 42)'];
function canvasEvents(){
    var canvas = document.getElementById('canvas')
    $('#canvas').bind('mousewheel',function(e){
        var amount = e.originalEvent.wheelDelta;
        //each mousewheel click is 150
        var pageCoords = sub([e.pageX,e.pageY],[$(canvas).offset().left,$(canvas).offset().top]);
        zoomScreen(amount/1500,pixCoords(pageCoords));
        paint();
    });
    $(window).on('resize',function(){
        var canvas = document.getElementById('canvas');
        var container = document.getElementsByClassName('canvas-container')[0];
        canvas.width=container.clientWidth;
        canvas.height=container.clientHeight;
        paint();
    })
    $('#canvas').mousedown(function(e){
        state.mousedown=true;
        state.mousedownPosition=sub([e.pageX,e.pageY],[$(canvas).offset().left,$(canvas).offset().top]);
        if(e.which == 1){
            state.rightClick = false;
        }else if(e.which == 3){
            state.rightClick = true;
        }
        if(state.selecting && state.rightClick == false){
            state.selection.p1 = map(Math.floor,pixCoords(state.mousedownPosition)); 
            state.selection.p2 = state.selection.p1;
        }
        paint();
    })
    $('#canvas').mouseup(function(e){
        state.mousedown=false;
        var pos = sub([e.pageX,e.pageY],[$(canvas).offset().left,$(canvas).offset().top]);
        if(Math.abs(pos[0]-state.mousedownPosition[0])<=1 && Math.abs(pos[1]-state.mousedownPosition[1])<=1 && state.selecting===false){
            var realCoords = pixCoords(pos);
            realCoords = map(Math.floor, realCoords);
            //left click
            if(e.which == 1){
                //fill in square @ position
                addPixel(realCoords, currentType);
                paint();
            }
            //right click (erase)
            if(e.which == 3){
                removePixel(realCoords)
                paint();
            }
        }
    })
    $('#canvas').mousemove(function(e){
        var pos = sub([e.pageX,e.pageY],[$(canvas).offset().left,$(canvas).offset().top]);
        var delta = sub(pos,state.mousePosition);
        state.mousePosition=pos;
        if(state.mousedown && (state.selecting == false || state.rightClick)){
            translateScreen(scale(-1/view.magnification,delta));
            paint();
        }
        if(state.mousedown && state.selecting == true && state.rightClick == false){
            state.selection.p2 = map(Math.floor,pixCoords(pos));
            paint();
        }
    })
    $('#canvas')[0].addEventListener('contextmenu',event => event.preventDefault());
}

function buttonEvents(){
    $('#add-type-button').click(function(){
        var itemIndex = types.length;
        if(itemIndex >= colorSet.length){
            return;
        }
        var newItem = $("<div class='control-item' id='type-"+itemIndex+"'></div>");
        newItem.css('background-color',''+colorSet[itemIndex]);
        types.push({color:colorSet[itemIndex],actionCode:'',actionFunction:function(){}});
		
        $('.control-bar').append(newItem);
        
        
        removeTypeUnderlines();
        newItem.addClass('control-item-underlined');
        currentType = itemIndex;
		
		saveTypeSettings();
        
        newItem.click(function(e){
            removeTypeUnderlines();
            $(e.target).addClass('control-item-underlined');
            currentType = parseInt(e.target.id.split('-')[1])
            if(state.selecting){
                fillSelection()
            }
        })
    })
    $('#select-button').click(function(){
        toggleSelection();
    })
    $('#settings-button').click(function(){
        $('#settings-wrapper').removeClass('gone')
        state.menuOpen = true;
        $('#menu-tabs').html('')
        //create heading 
        for(var k = 0 ; k < types.length; k++){
            var type = types[k];
            if(!type.actionCode){
                type.actionCode = '';
            }
            var newTab = $("<div class='tab' id='menu-tab-"+k+"'></div>");
            newTab.css('background-color',type.color);
            newTab.addClass('tab');
            newTab.click(function(e){
                clearActiveTabs()
                $(e.target).removeClass('tab')
                $(e.target).addClass('active-tab')
                state.activeSettingsType=e.target.id.split('-')[2];
                switchTypeSettings()
            })
            $('#menu-tabs').append(newTab)
            
            if(k == 0 && !state.activeSettingsType){
                newTab.removeClass('tab');
                newTab.addClass('active-tab')
                state.activeSettingsType=0;
            }
        }
        
        if(state.activeSettingsType){
            $('#menu-tab-'+state.activeSettingsType).click();
            switchTypeSettings();
        }
        
    })
    $(document).mousedown(function(e){
        if($(e.target).closest('#settings-menu').length === 0 && state.menuOpen){
            $('#settings-wrapper').addClass('gone')
            state.menuOpen=false;
        }
    })
    $('body').keypress(function(e){
        if(state.menuOpen){
            return;
        }
        var key = e.key;
        if(!isNaN(key) && parseInt(key)-1 < types.length && parseInt(key)-1>=0){
                var numericKey = parseInt(key)-1;
                removeTypeUnderlines();
                $('#type-'+numericKey).addClass('control-item-underlined');
                currentType = numericKey;
            if(state.selecting){
                fillSelection()
            }
        }
        if(key == 's'){
            toggleSelection()
        }
        if(key == 'a'){
            $('#add-type-button').click();
        }
        if(key == 'o'){
            if($('#settings-wrapper').hasClass('gone')){
                $('#settings-button').click();
            }else{
                $('#settings-wrapper').addClass('gone')
            }
        }
    })
    //aparently delete/enter don't register on keypress...
    $('body').keyup(function(e){
        //control key
        if(e.keyCode == 17){
            state.controlKeyPressed = false;
        }
        
        if(state.menuOpen){
            return;
        }
        var keyCode = e.keyCode;
        if(state.selecting){
            //delete pressed
            if(keyCode == 46){
                //delete all pixels in region
               deleteSelection()
            }
            if(keyCode == 27){
                state.selection = {};
            }
            paint();
        }
    }).keydown(function(e){
        //control key
        if(e.keyCode == 17){
            state.controlKeyPressed = true;
        }
        //c key
        if(state.controlKeyPressed && e.keyCode == 67 && state.menuOpen === false){
            console.log('copy')
            copySelection();
        }
        //v key
        if(state.controlKeyPressed && e.keyCode == 86 && state.menuOpen === false){
            console.log('paste')
            pasteSelection()
        }
    })
    $('#play-button').click(function(){
        startAnimation();
        $('#pause-button').removeClass('control-item-underlined');
        $('#play-button').addClass('control-item-underlined');
    })
    $('#pause-button').click(function(){
        stopAnimation();
        $('#pause-button').addClass('control-item-underlined');
        $('#play-button').removeClass('control-item-underlined');
    })
    $('#step-forward-button').click(function(){
        stopAnimation();
        step();
    })
    $('#step-back-button').click(function(){
        
    })
    $('#menu-export-button').click(function(){
        var resultArray = [];
        var keys = Object.keys(pixels);
        for(var j = 0; j < keys.length; j++){
            var pix = pixels[keys[j]];
            resultArray.push(pix.pos[0]+','+pix.pos[1]+','+pix.type);
        };
        $('#menu-import-export-textarea').val(JSON.stringify(resultArray));
    })
    $('#menu-import-button').click(function(){
        var resultArray = JSON.parse($('#menu-import-export-textarea').val());
        for(var k = 0; k < resultArray.length; k++){
            importPix(resultArray[k])
        }
        $('#menu-import-export-textarea').val('');
        paint();
    })

	$('#reference-button').click(function(){
		const wrapper = document.getElementById('reference-wrapper');
		if(wrapper.style.display === 'none'){
			wrapper.style.display = 'block';
		}else{
			wrapper.style.display = 'none';
		}
	});
}

function importPix(pixString){
    var pixInfo = map(parseInt,pixString.split(','));
    addPixel([pixInfo[0],pixInfo[1]],pixInfo[2]);
}

function otherInitialization(){
	ace.require('ace/ext/language_tools');
	
	// add some custom word-completion items
	var wordCompleter = {
		getCompletions: function(editor, session, pos, prefix, callback){
			var words = ['getNeighbor', 'getNeighbors', 'move', 'create',
						'change','remove','neighborSum','iterateNeighborhood', 'plus', 'sub'];
			callback(null, words.map(function(word){
				return {
					caption: word,
					value: word,
					meta: 'pixel function'
				}
			}));
		}
	}
	
    editor = ace.edit('menu-textarea');
    editor.setTheme("ace/theme/crimson_editor");
    editor.setShowPrintMargin(false);
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().on('change',function(){
        saveTypeSettings();
    })
	editor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: false,
		enableLiveAutocompletion: true
	});
	editor.completers.push(wordCompleter);
    editor.$blockScrolling = Infinity
    
    collisionEditor = ace.edit('menu-edit-collision-textarea');
    collisionEditor.setTheme("ace/theme/crimson_editor");
    collisionEditor.setShowPrintMargin(false);
    collisionEditor.getSession().setMode("ace/mode/javascript");
    collisionEditor.getSession().on('change',function(){
        saveCollisionSettings();
    })
    collisionEditor.$blockScrolling = Infinity
    
    setCollisionText(`  for(var k = 0; k < changes.length; k++){
      if(changes[k].type !== null){
          return changes[k].type;
      }
  }
  return null;`)
    collisionEditor.navigateLineEnd();
    
    for(var k = 0; k < types.length; k++){
        types[k].actionCode = '';
    }
    
    for(var k = 0; k < 4; k++){
        $('#add-type-button').click()
    }
    
    $('#type-0').click();
    
    //initialize examples
    var keys = Object.keys(examples);
    for(var k = 0; k < keys.length; k++){
        var key = keys[k];
        var example = examples[key];
        $('#examples-select').append($('<option>',{
            value:k,
            text:example.title
        }));
    }
    
    $('#examples-select').change(function(){
        var actualCurrentType = state.activeSettingsType;
        var index = $('#examples-select').val();
        var example = examples[keys[index]];
        
        clearTypeEditors();
        for(var j = 0; j < example.typeCode.length; j++){
            if(j >= types.length){
                $('#add-type-button').click();
            }
            types[j].actionCode = example.typeCode[j];
            state.activeSettingsType = j;
            switchTypeSettings();
            saveTypeSettings();
        }
        state.activeSettingsType = actualCurrentType;
        switchTypeSettings();
        
        var collisionCode = example.collisionCode[0];
        setCollisionText(collisionCode);
        collisionEditor.navigateLineEnd()
        
        pixels = {};
        for(j = 0; j < example.pixs.length; j++){
            importPix(example.pixs[j]);
        }
        paint(); 
    })
    
    toggleSelection();
    
    $('#menu-import-export-textarea').attr('placeholder',`"x,y,type", e.g.: ["23,42,2", "23,43,0"]`)
}

function clearTypeEditors(){
    for(var j = 0; j < types.length; j++){
        types[j].actionCode = '';
        state.activeSettingsType = j;
        switchTypeSettings();
        saveTypeSettings();
    }
}

function setCollisionText(text){
    collisionEditor.setValue(
`// when a pixel experiences a contradiction, for example being removed by one pixel and added 
//   by another, this function determines the outcome
// pos - the position of the pixel in question
// changes - an array of objects, each of the structure:
//   {type: <integer>, changer: <pixel object>}
// you must return the final type of the pixel, or null for removal
function onUpdateCollision(pos, changes){
`+text+`
}`);
}

function startAnimation(){
    if(state.playState == 'play'){
        return;
    }
    state.playState='play';
    step();
    setTimeout(function(){
        if(state.playState == 'play'){
            var startTime = Date.now();
            step();
            var endTime = Date.now();
            var fTime = state.minFrameTime ? 0 : state.frameTime;
            setTimeout(arguments.callee, fTime);
        }
    },state.frameTime)
}

function stopAnimation(){
    state.playState='pause'; 
}

function step(){
    var currentPixel;
    var changeLog = {};
	var pixelClone = Object.assign({},pixels);
    
    var pixKeys = Object.keys(pixels);
    for(var i = 0; i < pixKeys.length; i++){
        currentPixel = pixels[pixKeys[i]];
		var r, resultChangeLog = [];
		if(types[state.activeSettingsType].actionFunctionEmpty === false){
			var r = types[currentPixel.type].actionFunction(currentPixel, pixelClone);
			var resultChangeLog = r[1];
		}
		// add any keys generated in the last actionFunction to the entire changeLog
		for(let k = 0; k < resultChangeLog.length; k++){
			item = resultChangeLog[k];
			const key = item[0];
			const type = item[1];
			const changerKey = item[2];
			const pos = item[3];
			if(!changeLog[key]){
				changeLog[key] = [{type:type, changer:pixels[changerKey], pos:pos}]
			}else{
				changeLog[key].push({type:type, changer:pixels[changerKey], pos:pos});
			}
		}
    }
    
    //enact changes
    var logKeys = Object.keys(changeLog);
    for(var k = 0; k < logKeys.length; k++){
        var c = changeLog[logKeys[k]].map(x => {
			return {
				pos:x.pos, 
				type: (x.type === null ? null : x.type+1) ,
				changer:{type:x.changer.type+1, pos: x.changer.pos}
			}
		});
        var resultType;
        if(c.length > 1){
            resultType = state.collisionFunc(c[0].pos,c);
			if(resultType){
				resultType--;
			}
        }else{
            resultType = c[0].type !== null ? c[0].type - 1 : null;
        }
		
		console.log(resultType);
        
        if(resultType !== null){
            addPixel(c[0].pos, resultType);
        }else{
            removePixel(c[0].pos);
        }
    }
    paint();
}

function copyPixels(){
    var copy = [];
    var keys = Object.keys(pixels)
    for(var k = 0 ; k < keys.length; k++){
        var pix = pixels[keys[k]]
        copy[keys[k]] = copyPix(pix);
    }
    return copy;
}

function copyPix(p){
    if(!p){
        return undefined;
    }
    return {
        pos:copyVec(p.pos),
        type:p.type
    }
}

function copyVec(v){
    var copy = [];
    for(var k = 0; k < v.length; k++){
        copy.push(v[k])
    }
    return copy;
}

function saveTypeSettings(){
    types[state.activeSettingsType].actionCode = editor.getValue();
	codeString = `
	return function(self, pixels){
		self.type++;
		var newChangeLog = [];
		function move(localCoords){
			removePixelToLog(self.pos);
			addPixelToLog(plus(localCoords,self.pos),self.type - 1);
		}
		function writeSeveral(localCoords, type){
			for(var q = 0; q < localCoords.length; q++){
				write(localCoords[q], type);
			}
		}
		function write(pos, type){
			if(!type){
				addPixelToLog(plus(self.pos, pos), null)
			}else{
				addPixelToLog(plus(self.pos, pos),type - 1)
			}
		}
		function writeSelf(type){
			write([0,0], type);
		}
		function writeGlobal(pos, type){
			if(!type){
				addPixelToLog(pos, null);
			}else{
				addPixelToLog(pos, type - 1);
			}
		}
		function remove(p){
			if(p){
				removePixelToLog(plus(p,self.pos));
			}else{
				removePixelToLog(self.pos);
			}
		}
		function addPixelToLog(pos,type){
			var key = pos[0]+','+pos[1]
			// key, type, changerKey, pos props
			newChangeLog.push([key,type,self.pos[0]+','+self.pos[1], pos])
		}
		function removePixelToLog(pos){
			addPixelToLog(pos, null);
		}
		function getNeighbor(loc){
			var result = findPix(plus(loc,self.pos),pixels);
			if(!result){
				return {type:null, pos:plus(loc,self.pos)};
			}
			return {type:result.type + 1, pos:result.pos};
		}
		function getNeighborSum(ts,n){
			if(!n){
				n=1;
			}
			var sum = 0;
			for(var j = -n; j <= n; j++){
				for(var k = -n; k <= n; k++){
					if(ts.indexOf(getNeighbor([j,k]).type) !== -1 && (j != 0 || k != 0)){
						sum++;
					}
				}
			}
			return sum;
		}
		function mapNeighborhood(func, n){
			if(!n){n=1}
			for(var j = -n; j <= n; j++){
				for(var k = -n; k <=n ;k++){
					if(j !== 0 || k !== 0){
						func(getNeighbor([j,k]),[j,k]);
					}
				}
			}
		}
		function findPix(pos,pixs){
			return pixs[pos[0]+','+pos[1]];
		}
		function sub(a,b){
			var result=[];
			for(var i = 0; i < a.length; i++){
				result.push(a[i]-b[i]);
			}
			return result;
		}

		function plus(a,b){
			var result=[];
			for(var i = 0; i < a.length; i++){
				result.push(a[i]+b[i]);
			}
			return result;
		}
		
		`+types[state.activeSettingsType].actionCode+`
		self.type--;
		return [self, newChangeLog];
	}`;
	(function(code, type){
	caja.load(undefined, undefined, function(frame) {
		frame.code("data:application/octet-stream," + encodeURIComponent(code),'text/javascript')
				.api({log: console.log})
				.run(function (guestF) {
					var f = frame.untame(guestF);
					types[type].actionFunction = function(self, pixs){
						return f(self,pixs);
					}
			 });
	});
	})(codeString, state.activeSettingsType);
	
	const cType = types[state.activeSettingsType];
	cType.actionFunctionEmpty = (cType.actionCode.trim().length === 0);
}

function saveCollisionSettings(){
	const code = 'return function(pos, changes){'+collisionEditor.getValue()+';\nreturn onUpdateCollision(pos, changes);}';
	caja.load(undefined, undefined, function(frame) {
		frame.code("data:application/octet-stream," + encodeURIComponent(code),'text/javascript')
			.api({log: console.log})
			.run(function (guestF) {
				var f = frame.untame(guestF);
				state.collisionFunc = function(pos, changes){
					return f(pos, changes);
				}
			});
	});
}

function switchTypeSettings(){
    editor.setValue(types[state.activeSettingsType].actionCode);
    editor.navigateLineEnd();
}

function clearActiveTabs(){
    for(var k = 0; k < types.length; k++){
        $('#menu-tab-'+k).removeClass('active-tab')
        $('#menu-tab-'+k).addClass('tab');
    }
}

function fillSelection(){
    var p1 = state.selection.p1;
    var p2 = state.selection.p2;
    var realP1 = [Math.min(p1[0],p2[0]),Math.min(p1[1],p2[1])];
    var realP2 = [Math.max(p1[0],p2[0]),Math.max(p1[1],p2[1])];
    for(var i = realP1[0]; i <= realP2[0]; i++){
        for(var j = realP1[1]; j <= realP2[1]; j++){
            addPixel([i,j], currentType)
        }
    }
}

function copySelection(){
    var clipboard = {};
    var p1 = state.selection.p1;
    var p2 = state.selection.p2;
    var realP1 = [Math.min(p1[0],p2[0]),Math.min(p1[1],p2[1])];
    var realP2 = [Math.max(p1[0],p2[0]),Math.max(p1[1],p2[1])];
    for(var i = realP1[0]; i <= realP2[0]; i++){
        for(var j = realP1[1]; j <= realP2[1]; j++){
            if(!findPix([i,j],pixels)){
                continue;
            }
            clipboard[(i-realP1[0])+','+(j-realP1[1])] = copyPix(findPix([i,j], pixels));
        }
    }
    state.selectionClipBoard = clipboard;
}

function pasteSelection(){
    var keys = Object.keys(state.selectionClipBoard);
    var p1 = state.selection.p1;
    var p2 = state.selection.p2;
    var realP1 = [Math.min(p1[0],p2[0]),Math.min(p1[1],p2[1])];
    for(var k = 0; k < keys.length; k++){
        if(!state.selectionClipBoard[keys[k]]){
            continue;
        }
        addPixel(plus(map(parseInt,keys[k].split(',')),realP1), state.selectionClipBoard[keys[k]].type);
    }
    paint();
}

function deleteSelection(){
    var p1 = state.selection.p1;
    var p2 = state.selection.p2;
    var realP1 = [Math.min(p1[0],p2[0]),Math.min(p1[1],p2[1])];
    var realP2 = [Math.max(p1[0],p2[0]),Math.max(p1[1],p2[1])];
    for(var i = realP1[0]; i <= realP2[0]; i++){
        for(var j = realP1[1]; j <= realP2[1]; j++){
            removePixel([i,j])
        }
    }
}

function toggleSelection(){
    state.selection = {};
    if(state.selecting === false){
        state.selecting = true;
        $('#select-button').addClass('control-item-underlined')
    }else{
        state.selecting = false;
        $('#select-button').removeClass('control-item-underlined')
    }
    paint();
}

function addPixel(realCoords, type){
    var newPix = {
        pos:realCoords,
        type:type
    }
    
    pixels[realCoords[0]+','+realCoords[1]] = newPix;
}

function removePixel(realCoords){
    delete pixels[realCoords[0]+','+realCoords[1]];
}

function findPix(pos,pixs){
    return pixs[pos[0]+','+pos[1]];
}

function removeTypeUnderlines(){
    for(var i = 0; i < types.length; i++){
        document.getElementById('type-'+i).classList.remove('control-item-underlined');
    }
}

function zoomScreen(amount,zoomCenter){
    //find center of screen
    var canvas = document.getElementById('canvas');
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var center = zoomCenter;
    //so oldMag (center - oldOrigin) = newMag (center - newOrigin)
    //newOrigin = (-oldMag / newMag)(center - oldOrigin) + center
    var newMagnification = view.magnification * (1+amount);
    view.origin = plus(center, scale(-view.magnification/newMagnification,sub(center,view.origin)));
    view.magnification = newMagnification;
}

function translateScreen(amount){
    view.origin = plus(view.origin, amount)
}

function paint(){
    var canvas = document.getElementById('canvas');
    var ctx=canvas.getContext('2d');
    ctx.fillStyle='white';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    drawGrid(canvas);
    
    var keys = Object.keys(pixels)
    for(var k  =0; k < keys.length; k++){
        drawPix(pixels[keys[k]], ctx,canvas);
    }
    
    if(state.selecting && state.selection && state.selection.p1 && state.selection.p2){
        drawSelectionBox(ctx)
    }
}

function drawSelectionBox(ctx){
    ctx.beginPath()
    var p1 = screenCoords(state.selection.p1);
    var p2 = screenCoords(state.selection.p2);
    var realP1 = [Math.min(p1[0],p2[0]),Math.min(p1[1],p2[1])];
    var realP2 = [Math.max(p1[0],p2[0]),Math.max(p1[1],p2[1])];
    ctx.rect(realP1[0],realP1[1],realP2[0]-realP1[0]+view.magnification,realP2[1]-realP1[1]+view.magnification);
    ctx.strokeStyle='rgba(0,0,0,.5)';
    ctx.lineWidth=2;
    ctx.stroke();
}

function drawGrid(canvas){
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle='rgba(0,0,0,.2)'
    ctx.lineWidth=.5;
    var start = pixCoords([0,0]);
    start[0] = Math.round(start[0])-1;
    start[1] = Math.round(start[1])-1;
    var width = canvas.clientWidth/view.magnification;
    var height = canvas.clientHeight/view.magnification;
    var cellWidth = 1;
    if(width > 1000){
        return;
    }
    ctx.beginPath();
    var startPt,endPt;
    for(var i = start[0]; i <= start[0]+2+width; i += cellWidth){
        startPt = screenCoords([i,start[1]]);
        endPt = screenCoords([i,start[1]+2+height])
        ctx.moveTo(startPt[0],startPt[1]);
        ctx.lineTo(endPt[0],endPt[1]);
    }
    for(var j = start[1]; j < start[1]+2+height; j += cellWidth){
        startPt = screenCoords([start[0],j]);
        endPt = screenCoords([start[0]+2+width,j])
        ctx.moveTo(startPt[0],startPt[1]);
        ctx.lineTo(endPt[0],endPt[1]);
    }
    ctx.stroke();
}

function drawPix(pix,ctx,canvas){
    if(!canvas){
        canvas = document.getElementById('canvas')
    }
    if(!ctx){
        ctx = canvas.getContext('2d');
    }
    
    
    var scnCoords = screenCoords(pix.pos);
    
    if(scnCoords[0] < -view.magnification || scnCoords[0] > canvas.clientWidth || scnCoords[1] < -view.magnification || scnCoords[1] > canvas.clientHeight){
        return;
    }
    
    var width = view.magnification;
    ctx.fillStyle = types[pix.type].color;
    
    ctx.fillRect(scnCoords[0]+.005*view.magnification,scnCoords[1]+.005*view.magnification,
        width-.01*view.magnification,width-.01*view.magnification)
}

function screenCoords(pt){
    //the transformation must transform the origin to (0,0) while magnifying the size by view.magnification
    //so translate by -origin, then magnify
    return scale(view.magnification,sub(pt,view.origin));
}

//inverse of screenCoords
function pixCoords(pt){
    return plus(view.origin,scale(1/view.magnification,pt));
}

function sub(a,b){
    var result=[];
    for(var i = 0; i < a.length; i++){
        result.push(a[i]-b[i]);
    }
    return result;
}

function plus(a,b){
    var result=[];
    for(var i = 0; i < a.length; i++){
        result.push(a[i]+b[i]);
    }
    return result;
}

function scale(a,b){
    var result=[];
    for(var i = 0; i < b.length; i++){
        result.push(a*b[i]);
    }
    return result;
}

function map(func,a){
    var result = [];
    for(var i =0; i < a.length; i++){
        result.push(func(a[i]));
    }
    return result;
}

function equal(a,b){
    for(var i = 0; i < a.length; i++){
        if(a[i] !== b[i]){
            return false;
        }
    }
    return true;
}

function greaterThan(a,b){
    if(a[0] > b[0]){
        return true;
    }else if(a[0] === b[0] && a[1] > b[1]){
        return true;
    }
    return false;
}
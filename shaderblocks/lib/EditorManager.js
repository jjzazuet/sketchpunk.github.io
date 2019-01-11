import Svg from "./sage/Svg.js";

function init(){
	mod.svg = new Svg("svgcanvas");
}

function processNodes(node,initCode = null){
	var nAry = (Array.isArray(node))? node : [node];
	var iAry;
	var n,onn, conn;
	var nComplete = [];
	var glsl = [];
	var code = "";

	if(initCode != null) glsl.push(initCode);

	while( (n = nAry.pop()) != undefined ){
		if( (code = n.getGLSL()) != null) glsl.push(code);
		nComplete.push(n.id);
		for(var i in n.inputs){
			if(!n.inputs[i].isConnected) continue;
			conn = n.inputs[i].conn;
			onn = conn.outputNode;
			if(nComplete.indexOf(onn.id) < 0 && nAry.indexOf(onn) < 0) nAry.push(onn);
		}
	}
}

var mod = {
	init:init,
	processNodes:processNodes,
	svg:null
};

//------------------------------------------------------
export default mod;

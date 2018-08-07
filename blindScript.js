   var nPos; var bPos; var rPos; var qPos; var counter=1; var clickCount=0; var streak=0; var maxStreak=0; var boardShown=false;

   function intToSquare(num){
		return 'abcdefgh'[Math.floor(num/8)]+(num%8+1).toString();
   }
   function initPos() {
   nPos = Math.floor(Math.random()*64);
   bPos = Math.floor(Math.random()*64);
   rPos = Math.floor(Math.random()*64);
   qPos = Math.floor(Math.random()*64);
   if(nPos==bPos || nPos==rPos || bPos==rPos || qPos==nPos||qPos==bPos||qPos==rPos) {initPos();}
   document.getElementById("initial").innerHTML = "B"+intToSquare(bPos)
       + "  "+"R"+intToSquare(rPos)
       + "  "+"N"+intToSquare(nPos);
	   document.getElementById("initial").innerHTML += " Q"+intToSquare(qPos);
	   document.getElementById("last").innerHTML = "";
	   //document.getElementById("Movelist").innerHTML = "";
	   counter=1;
	   //Attacks();
	   streak=0;
	   clearForm();
   }

   function nMove(){
	var x = Math.floor(nPos/8); var y =nPos%8; var tempPos; var vartempX; var tempY; var moves=[];
	
	tempX=x+1;tempY=y+2; tempPos=8*tempX+tempY;
	if(tempX>=0 && tempX<8 && tempY>=0 && tempY<8 && tempPos!=bPos && tempPos!=rPos && tempPos!=qPos) {moves.push(tempPos);}
	
	tempX=x+2;tempY=y+1; tempPos=8*tempX+tempY;
	if(tempX>=0 && tempX<8 && tempY>=0 && tempY<8 && tempPos!=bPos && tempPos!=rPos && tempPos!=qPos) {moves.push(tempPos);}
	
	tempX=x+2;tempY=y-1; tempPos=8*tempX+tempY;
	if(tempX>=0 && tempX<8 && tempY>=0 && tempY<8 && tempPos!=bPos && tempPos!=rPos && tempPos!=qPos) {moves.push(tempPos);}
	
	tempX=x+1;tempY=y-2; tempPos=8*tempX+tempY;
	if(tempX>=0 && tempX<8 && tempY>=0 && tempY<8 && tempPos!=bPos && tempPos!=rPos && tempPos!=qPos) {moves.push(tempPos);}
	
	tempX=x-1;tempY=y-2; tempPos=8*tempX+tempY;
	if(tempX>=0 && tempX<8 && tempY>=0 && tempY<8 && tempPos!=bPos && tempPos!=rPos && tempPos!=qPos) {moves.push(tempPos);}
	
	tempX=x-2;tempY=y-1; tempPos=8*tempX+tempY;
	if(tempX>=0 && tempX<8 && tempY>=0 && tempY<8 && tempPos!=bPos && tempPos!=rPos && tempPos!=qPos) {moves.push(tempPos);}
	
	tempX=x-2;tempY=y+1; tempPos=8*tempX+tempY;
	if(tempX>=0 && tempX<8 && tempY>=0 && tempY<8 && tempPos!=bPos && tempPos!=rPos && tempPos!=qPos) {moves.push(tempPos);}
	
	tempX=x-1;tempY=y+2; tempPos=8*tempX+tempY;
	if(tempX>=0 && tempX<8 && tempY>=0 && tempY<8 && tempPos!=bPos && tempPos!=rPos && tempPos!=qPos) {moves.push(tempPos);}
	if(moves.length>0) {nPos = moves[Math.floor(Math.random()*moves.length)]; return 1;}
	else {return 0;}
    }
   function bMove(){
	var x = Math.floor(bPos/8); var y =bPos%8; var tempPos; var tempX; var tempY; var moves=[];
	tempY=y;
	for(tempX=x+1;tempX<8;tempX++){ //++
		tempY++; tempPos=tempX*8+tempY;
		if(tempY==8 || tempPos==nPos || tempPos==rPos || tempPos==qPos) 
			break;
		moves.push(tempPos);
	}
	tempY=y;
	for(tempX=x+1;tempX<8;tempX++){ //+-
		tempY--; tempPos=tempX*8+tempY;
		if(tempY<0 || tempPos==nPos || tempPos==rPos || tempPos==qPos) 
			break;
		moves.push(tempPos);
	}
	tempY=y;
	for(tempX=x-1;tempX>=0;tempX--){ //-+
		tempY++; tempPos=tempX*8+tempY;
		if(tempY==8 || tempPos==nPos || tempPos==rPos || tempPos==qPos) 
			break;
		moves.push(tempPos);
	}
	tempY=y;
	for(tempX=x-1;tempX>=0;tempX--){ //--
		tempY--; tempPos=tempX*8+tempY;
		if(tempY<0 || tempPos==nPos || tempPos==rPos || tempPos==qPos) 
			break;
		moves.push(tempPos);
	}
	if(moves.length>0) {bPos = moves[Math.floor(Math.random()*moves.length)]; return 1;}
	else {return 0;}
   }
	//generate random rook move
   function rMove(){
	var x = Math.floor(rPos/8); var y =rPos%8; var tempPos; var vartempX; var tempY; var moves=[];
	tempY=y;
	for(tempX=x+1;tempX<8;tempX++){ //+x
		 tempPos=tempX*8+tempY;
		if(tempPos==nPos || tempPos==bPos || tempPos==qPos) 
			break;
		moves.push(tempPos);
	}
	for(tempX=x-1;tempX>=0;tempX--){ //-x
		tempPos=tempX*8+tempY;
		if(tempPos==nPos || tempPos==bPos || tempPos == qPos) 
			break;
		moves.push(tempPos);
	}
	tempX=x;
	for(tempY=y+1;tempY<8;tempY++){ //+y
		tempPos=tempX*8+tempY;
		if(tempPos==nPos || tempPos==bPos || tempPos == qPos) 
			break;
		moves.push(tempPos);
	}
	tempX=x;
	for(tempY=y-1;tempY>=0;tempY--){ //-y
		tempPos=tempX*8+tempY;
		if(tempPos==nPos || tempPos==bPos || tempPos==qPos) 
			break;
		moves.push(tempPos); 
		}
	if(moves.length>0) {rPos = moves[Math.floor(Math.random()*moves.length)]; return 1;}
	else {return 0;}
   }
   //generate random queen move, comb. of bishop and rook 
   function qMove(){
	var x = Math.floor(qPos/8); var y =qPos%8; var tempPos; var tempX; var tempY; var moves=[];
	//bmove
	tempY=y;
	for(tempX=x+1;tempX<8;tempX++){ //++
		tempY++; tempPos=tempX*8+tempY;
		if(tempY==8 || tempPos==nPos || tempPos==rPos || tempPos==bPos) 
			break;
		moves.push(tempPos);
	}
	tempY=y;
	for(tempX=x+1;tempX<8;tempX++){ //+-
		tempY--; tempPos=tempX*8+tempY;
		if(tempY<0 || tempPos==nPos || tempPos==rPos || tempPos==bPos) 
			break;
		moves.push(tempPos);
	}
	tempY=y;
	for(tempX=x-1;tempX>=0;tempX--){ //-+
		tempY++; tempPos=tempX*8+tempY;
		if(tempY==8 || tempPos==nPos || tempPos==rPos || tempPos==bPos) 
			break;
		moves.push(tempPos);
	}
	tempY=y;
	for(tempX=x-1;tempX>=0;tempX--){ //--
		tempY--; tempPos=tempX*8+tempY;
		if(tempY<0 || tempPos==nPos || tempPos==rPos || tempPos==bPos) 
			break;
		moves.push(tempPos);
	}
	//rMove
	tempY=y;
	for(tempX=x+1;tempX<8;tempX++){ //+x
		 tempPos=tempX*8+tempY;
		if(tempPos==nPos || tempPos==bPos || tempPos==rPos) 
			break;
		moves.push(tempPos);
	}
	for(tempX=x-1;tempX>=0;tempX--){ //-x
		tempPos=tempX*8+tempY;
		if(tempPos==nPos || tempPos==bPos || tempPos == rPos) 
			break;
		moves.push(tempPos);
	}
	tempX=x;
	for(tempY=y+1;tempY<8;tempY++){ //+y
		tempPos=tempX*8+tempY;
		if(tempPos==nPos || tempPos==bPos || tempPos == rPos) 
			break;
		moves.push(tempPos);
	}
	tempX=x;
	for(tempY=y-1;tempY>=0;tempY--){ //-y
		tempPos=tempX*8+tempY;
		if(tempPos==nPos || tempPos==bPos || tempPos == rPos) 
			break;
		moves.push(tempPos); 
		} 
	if(moves.length>0) {qPos = moves[Math.floor(Math.random()*moves.length)]; return 1;}
	else {return 0;}
	   
   }
   //Check if the rook attacks square
   function rAttacks(square) {
	   var x=Math.floor(square/8); var y = square%8; 
	   var xB=Math.floor(bPos/8); var yB = bPos%8; 
	   var xN=Math.floor(nPos/8); var yN = nPos%8;
	   var xR=Math.floor(rPos/8); var yR = rPos%8;   
	   var xQ=Math.floor(qPos/8); var yQ = qPos%8; 
	   if(x==xR) {//x equal 
	       if(x==xN) { //knight on the same file?
			   if((y<yN && yN<yR) || (yR<yN && yN<y))
					return 0;
		   }
			if(x==xB) { //bishop on the same file?
				if((y<yB && yB<yR) || (yR<yB && yB<y))
					return 0;
			}
			if(x==xQ) { //queen on the same file?
				if((y<yQ && yQ<yR) || (yR<yQ && yQ<y))
					return 0;
			}
			return 1;
	   }
	   else if(y==yR) {//y equal 
	       if(y==yN) { //if knight between rook and square
			   if((x<xN && xN<xR) || (xR<xN && xN<x))
					return 0;
		   }
			if(y==yB) { //if bishop between rook and square
				if((x<xB && xB<xR) || (xR<xB && xB<x))
					return 0;
			}
			if(y==yQ) { //if queen between rook and square
				if((xQ<x && xQ<xR) || (xR<xQ && xQ<x))
					return 0;
			}
			return 1;
	   }
	   return 0;
   }
   function nAttacks(square) {
	   if(Math.abs(Math.floor(square/8)-Math.floor(nPos/8))==1 && Math.abs((square%8)-(nPos%8))==2) 
		   return 1;
	   else if (Math.abs(Math.floor(square/8)-Math.floor(nPos/8))==2 && Math.abs((square%8)-(nPos%8))==1)
		   return 1;
	   else return 0;
   }
   function bAttacks(square) {
	   var x=Math.floor(square/8); var y = square%8; 
	   var xB=Math.floor(bPos/8); var yB = bPos%8; 
	   var xN=Math.floor(nPos/8); var yN = nPos%8;
	   var xR=Math.floor(rPos/8); var yR = rPos%8;  
       var xQ=Math.floor(qPos/8); var yQ = qPos%8; 	   
	   if(x-xB==y-yB) {//sw-ne diagonal 
	       if(xR-xB==yR-yB) { //rook on the same diagonal?
			   if((y<yR && yR<yB) || (yB<yR && yR<y)) //rook between square and bishop?
					return 0;
		   }
			if(xN-xB==yN-yB) { // knight on the same diagonal?
				if((y<yN && yN<yB) || (yB<yN && yN<y)) //knight between square and bishop?
					return 0;
			}
			if(xQ-xB==yQ-yB) { // quuen on the same diagonal?
				if((y<yQ && yQ<yB) || (yB<yQ && yQ<y)) //queen between square and bishop?
					return 0;
			}
			return 1;
	   }
	   if(x-xB==-(y-yB)) {//nw-se diagonal 
	       if(xR-xB==-(yR-yB)) { //rook on the same diagonal?
			   if((y<yR && yR<yB) || (yB<yR && yR<y)) //rook between square and bishop?
					return 0;
		   }
			if(xN-xB==-(yN-yB)) { // knight on the same diagonal?
				if((y<yN && yN<yB) || (yB<yN && yN<y)) //knight between square and bishop?
					return 0;
			}
			if(xQ-xB==-(yQ-yB)) { // queen on the same diagonal?
				if((y<yQ && yQ<yB) || (yB<yQ && yQ<y)) //queen between square and bishop?
					return 0;
			}
			return 1;
	   }
	   return 0;
   }
   
   function qAttacks(square) {
	   var x=Math.floor(square/8); var y = square%8; 
	   var xB=Math.floor(bPos/8); var yB = bPos%8; 
	   var xN=Math.floor(nPos/8); var yN = nPos%8;
	   var xR=Math.floor(rPos/8); var yR = rPos%8;   
	   var xQ=Math.floor(qPos/8); var yQ = qPos%8; 
	   //bishop movement
	   if(x-xQ==y-yQ) {//sw-ne diagonal 
	       if(xR-xQ==yR-yQ) { //rook on the same diagonal?
			   if((y<yR && yR<yQ) || (yQ<yR && yR<y)) //rook between square and bishop?
					return 0;
		   }
			if(xN-xQ==yN-yQ) { // knight on the same diagonal?
				if((y<yN && yN<yQ) || (yQ<yN && yN<y)) //knight between square and bishop?
					return 0;
			}
			if(xB-xQ==yB-yQ) { // Bishop on the same diagonal?
				if((y<yB && yB<yQ) || (yQ<yB && yB<y)) //bishop between square and bishop?
					return 0;
			}
			return 1;
	   }
	   if(x-xQ==-(y-yQ)) {//nw-se diagonal 
	       if(xR-xQ==-(yR-yQ)) { //rook on the same diagonal?
			   if((y<yR && yR<yQ) || (yQ<yR && yR<y)) //rook between square and bishop?
					return 0;
		   }
			if(xN-xQ==-(yN-yQ)) { // knight on the same diagonal?
				if((y<yN && yN<yQ) || (yQ<yN && yN<y)) //knight between square and bishop?
					return 0;
			}
			if(xB-xQ==-(yB-yQ)) { // Bishop on the same diagonal?
				if((y<yB && yB<yQ) || (yQ<yB && yB<y)) //bishop between square and bishop?
					return 0;
			}
			return 1;
	   }
	   //rook movement
	   if(x==xQ) {//x equal 
	       if(x==xN) { //knight on the same file?
			   if((y<yN && yN<yQ) || (yQ<yN && yN<y))
					return 0;
		   }
			if(x==xB) { //bishop on the same file?
				if((y<yB && yB<yQ) || (yQ<yB && yB<y))
					return 0;
			}
			if(x==xR) { //rook on the same file?
				if((y<yR && yR<yQ) || (yQ<yR && yR<y))
					return 0;
			}
			return 1;
	   }
	   else if(y==yQ) {//y equal 
	       if(y==yN) { //knight between?
			   if((x<xN && xN<xQ) || (xQ<xN && xN<x))
					return 0;
		   }
			if(y==yB) { //bishop between?
				if((x<xB && xB<xQ) || (xQ<xB && xB<x))
					return 0;
			}
			if(y==yR) { //rook between
				if((x<xR && xR<xQ) || (xQ<xR && xR<x))
					return 0;
			}
			return 1;
	   }
	   return 0;
   }
   
   function Attacks() {
	   //Bishop Attacks
	   document.getElementById("B").innerHTML = "";
		if(bAttacks(rPos)==1)
			document.getElementById("B").innerHTML = "Rook ";
		if(bAttacks(nPos)==1)
			document.getElementById("B").innerHTML += "Knight ";
		if(bAttacks(qPos)==1)
			document.getElementById("B").innerHTML += "Queen";
		//Rook Attacks
		document.getElementById("R").innerHTML = "";
		if(rAttacks(bPos)==1)
			document.getElementById("R").innerHTML = "Bishop ";
		if(rAttacks(nPos)==1)
			document.getElementById("R").innerHTML += "Knight ";
		if(rAttacks(qPos)==1)
			document.getElementById("R").innerHTML += "Queen";
		//Knight Attacks
		document.getElementById("N").innerHTML = "";
		if(nAttacks(bPos)==1)
			document.getElementById("N").innerHTML = "Bishop ";
		if(nAttacks(rPos)==1)
			document.getElementById("N").innerHTML += "Rook ";
		if(nAttacks(qPos)==1)
			document.getElementById("N").innerHTML += "Queen";
		//Queen Attacks
		document.getElementById("Q").innerHTML = "";
		if(qAttacks(bPos)==1)
		document.getElementById("Q").innerHTML = "Bishop ";
		if(qAttacks(rPos)==1) 
		document.getElementById("Q").innerHTML += "Rook ";
		if(qAttacks(nPos)==1) 
		document.getElementById("Q").innerHTML += "Knight";

	   
   }
   function newMove() 
	{ 
	   var piece=Math.floor(Math.random()*4); //bishop, rook, knight or queen
	   var move="";
	   if (piece==0) {
			if(bMove()==1) {move =counter.toString()+".B"+intToSquare(bPos); document.getElementById("last").innerHTML = move;}
			else {newMove();} 
	   }
	   else if (piece==1) {
			if(rMove()==1) {move=counter.toString()+".R"+intToSquare(rPos);document.getElementById("last").innerHTML = move;}
			else {newMove();} 
		}
	    else if (piece==2){
			if(nMove()==1) {move=counter.toString()+".N"+intToSquare(nPos);document.getElementById("last").innerHTML = move;}
			else {newMove();} 
		}
		else { 
			if(qMove()==1) {move=counter.toString()+".Q"+intToSquare(qPos);document.getElementById("last").innerHTML = move;}
			else {newMove();} 
		}
		//Attacks();
		//document.getElementById("Movelist").innerHTML += counter.toString()+"."+move+" ";
		counter++;
		clearForm();
	   return 1;
	}
	
	function checkAnswer() {
		if(clickCount>0)
			return 0;
		clickCount++;
		var cList = document.getElementsByTagName("input");
		for(var i=0;i<cList.length;i++){
			if(cList[i].type=="checkbox")
				cList[i].disabled="disabled";
		}
		var bR=document.getElementById("BR").checked; var bN=document.getElementById("BN").checked; var bQ=document.getElementById("BQ").checked; 
		var rB=document.getElementById("RB").checked; var rN=document.getElementById("RN").checked; var rQ=document.getElementById("RQ").checked;
		var nB=document.getElementById("NB").checked; var nR=document.getElementById("NR").checked; var nQ=document.getElementById("NQ").checked;
		var qB=document.getElementById("QB").checked; var qR=document.getElementById("QR").checked; var qN=document.getElementById("QN").checked;
		var answer=true;
		//Bishop Attacks
		if(bAttacks(rPos)== 1) {
			if(bR)
				document.getElementById("labelBR").style.color="green";
			else {
				document.getElementById("labelBR").style.color="red";
				answer=false;
			}
		}
		else {
			if(bR) {
				document.getElementById("labelBR").style.color="red";
				answer=false;
			}
		}
		if(bAttacks(nPos)== 1){
			if(bN)
				document.getElementById("labelBN").style.color="green";
			else {
				document.getElementById("labelBN").style.color="red";
				answer=false;
			}
		}
		else {
			if(bN) {
				document.getElementById("labelBN").style.color="red";
				answer=false;
			}
		}
		if(bAttacks(qPos)==1){
			if(bQ)
				document.getElementById("labelBQ").style.color="green";
			else {
				document.getElementById("labelBQ").style.color="red";
				anwer=false;
			}
		}
		else {
			if(bQ){
				document.getElementById("labelBQ").style.color="red";
				answer=false;
			}
		}
		//Rook Attacks
		if(rAttacks(bPos)==1){
			if(rB)
				document.getElementById("labelRB").style.color="green";
			else {
				document.getElementById("labelRB").style.color="red";
				answer=false;
			}
		}
		else {
			if(rB){
				document.getElementById("labelRB").style.color="red";
				answer=false;
			}
		}
		if(rAttacks(nPos)==1){
			if(rN)
				document.getElementById("labelRN").style.color="green";
			else {
				document.getElementById("labelRN").style.color="red";
				answer=false;
			}
		}
		else {
			if(rN){
				document.getElementById("labelRN").style.color="red";
				answer=false;
			}
		}
		if(rAttacks(qPos)==1){
			if(rQ)
				document.getElementById("labelRQ").style.color="green";
			else {
				document.getElementById("labelRQ").style.color="red";
				answer=false;
			}
		}
		else {
			if(rQ){
				document.getElementById("labelRQ").style.color="red";
				answer=false;
			}
		}
		//Knight Attacks
		if(nAttacks(bPos)==1){
			if(nB)
				document.getElementById("labelNB").style.color="green";
			else {
				document.getElementById("labelNB").style.color="red";
				answer=false;
			}
		}
		else {
			if(nB){
				document.getElementById("labelNB").style.color="red";
				answer=false;
			}
		}
		if(nAttacks(rPos)==1){
			if(nR)
				document.getElementById("labelNR").style.color="green";
			else {
				document.getElementById("labelNR").style.color="red";
				answer=false;
			}
		}
		else {
			if(nR){
				document.getElementById("labelNR").style.color="red";
				answer=false;
			}
		}
		if(nAttacks(qPos)==1){
			if(nQ)
				document.getElementById("labelNQ").style.color="green";
			else {
				document.getElementById("labelNQ").style.color="red";
				answer=false;
			}
		}
		else {
			if(nQ){
				document.getElementById("labelNQ").style.color="red";
				answer=false;
			}
		}
		//Queen Attacks
		if(qAttacks(bPos)==1){
			if(qB)
				document.getElementById("labelQB").style.color="green";
			else {
				document.getElementById("labelQB").style.color="red";
				answer=false;
			}
		}
		else {
			if(qB){
				document.getElementById("labelQB").style.color="red";
				answer=false;
			}
		}
		if(qAttacks(rPos)==1){
			if(qR)
				document.getElementById("labelQR").style.color="green";
			else {
				document.getElementById("labelQR").style.color="red";
				answer=false;
			}
		}
		else {
			if(qR){
				document.getElementById("labelQR").style.color="red";
				answer=false;
			}
		}
		if(qAttacks(nPos)==1) {
			if(qN)
				document.getElementById("labelQN").style.color="green";
			else {
				document.getElementById("labelQN").style.color="red";
				answer=false;
			}
		}
		else {
			if(qN){
				document.getElementById("labelQN").style.color="red";
				answer=false;
			}
		}
		var output; var color;
		if(answer) {
			document.getElementById("answerButton").style.background="green";
			output="Correct";
			color="green";
			if(!boardShown)
				streak++;
		}
		else {output="Incorrect"; color="red"; streak=0; document.getElementById("answerButton").style.background="red";}
		document.getElementById("Answer").innerHTML = output;
		document.getElementById("Answer").style.color = color;
		document.getElementById("Streak").innerHTML= streak;
		if(streak>maxStreak)
			maxStreak=streak;
		document.getElementById("MaxStreak").innerHTML= maxStreak;
	}
	
	function clearForm() {
		clickCount=0;
		document.getElementById("answerButton").style.background=document.getElementById("startButton").style.background;
		document.getElementById("Streak").innerHTML = streak;
		document.getElementById("MaxStreak").innerHTML= maxStreak;
		document.getElementById("Answer").innerHTML = "";
		if(document.getElementById('chessTable').style.visibility=="hidden")
			boardShown=false;
		var cList = document.getElementsByTagName("input");
		updatePieces();
		for(var i=0; i<cList.length;i++) {
		   if(cList[i].type=="checkbox") {
			   cList[i].disabled=false;
		       cList[i].checked=false;
		   }
		}
		var labelList = document.getElementsByTagName("label");
		for(var i=0; i<labelList.length;i++) {
		   labelList[i].style.color="black";
		}	
		var buttonList = document.getElementsByTagName("button");
		for(var i=0; i<buttonList.length;i++) {
		   buttonList[i].disabled=false;
		}
	}
	
	function handleBoard(){
		if(document.getElementById('chessTable').style.visibility=="hidden")
			displayPieces();
		else hidePieces();
	}
	function displayPieces(){
		boardShown=true;
		document.getElementById('chessTable').style.visibility="visible";
		updatePieces();
		streak=0;
	}
	
	function updatePieces()
	{
		var imageList = document.getElementsByTagName("img");
		var iMax=imageList.length;
		for(var i=0; i<iMax;i++) {
			for(j=0;j<imageList.length;j++) {
			if((imageList[j].id != "boardIcon") && (imageList[j].id != "bgImage"))
				imageList[j].parentNode.removeChild(imageList[j]);
		    }
		}	
		var imgR = document.createElement("img");
		imgR.src = "img/WR.png";
		var imgB = document.createElement("img");
		imgB.src = "img/WB.png";
		var imgN = document.createElement("img");
		imgN.src = "img/WN.png";
		var imgQ = document.createElement("img");
		imgQ.src = "img/WQ.png";
		//rook pos
		var position = document.getElementById('chessTable').rows[7-rPos%8].cells[Math.floor(rPos/8)];
		position.appendChild(imgR);
		//bishop
		position = document.getElementById('chessTable').rows[7-bPos%8].cells[Math.floor(bPos/8)];
		position.appendChild(imgB);
		//knight
		position = document.getElementById('chessTable').rows[7-nPos%8].cells[Math.floor(nPos/8)];
		position.appendChild(imgN);
		//queen
		position = document.getElementById('chessTable').rows[7-qPos%8].cells[Math.floor(qPos/8)];
		position.appendChild(imgQ);	
	}
	function hidePieces(){
		document.getElementById('chessTable').style.visibility="hidden";
		updatePieces();	
	}

// Play Data
let playData;
// 表示用データ
let mergedMusicData;
/**
 * 初期表示処理
 */
function dataInit(){
	
	// localStorage.removeItem("playData");
	
	// ストレージからデータを取得
	playData = localStorage.getItem("playData");
	// 取得できた場合
	if(playData){
		// JSON変換
		playData = JSON.parse(playData);
		// 曲データループ
		musicData.forEach(function(rec){
			// データ有無
			let hasData = false;
			// プレイデータループ
			for(let i = 0; i < playData.length; i++){
				// 同タイトルの曲の場合
				if(rec.TITLE == playData[i].TITLE){
					// データ有
					hasData = true;
					// これ以上ループしない
					break;
				}
			}
			// データが無い場合
			if(!hasData){
				// プレイデータの初期生成
				playData.push(makeInitData(rec));
			}
		});
		// ストレージを更新
		localStorage.setItem("playData", JSON.stringify(playData));
	// データなし
	}else{
		// プレイデータの初期化
		playData = new Array();
		// 曲データループ
		musicData.forEach(function(rec){
			// プレイデータの初期生成
			playData.push(makeInitData(rec));
		});
		// ストレージを更新
		localStorage.setItem("playData", JSON.stringify(playData));
	}
	// 曲データをループ
	musicData.forEach(function(rec){
		// プレイデータをループ
		for(let i = 0; i < playData.length; i++){
			// 曲名が同じ場合
			if(rec.TITLE == playData[i].TITLE){
				
				if(rec.SPN){
					for(let key in playData[i].SPN){
						rec.SPN[key] = playData[i].SPN[key];
					}
				}
				
				if(rec.SPH){
					for(let key in playData[i].SPH){
						rec.SPH[key] = playData[i].SPH[key];
					}
				}
				
				if(rec.SPA){
					for(let key in playData[i].SPA){
						rec.SPA[key] = playData[i].SPA[key];
					}
				}
				
				if(rec.DPN){
					for(let key in playData[i].DPN){
						rec.DPN[key] = playData[i].DPN[key];
					}
				}
				
				if(rec.DPH){
					for(let key in playData[i].DPH){
						rec.DPH[key] = playData[i].DPH[key];
					}
				}
				
				if(rec.DPA){
					for(let key in playData[i].DPA){
						rec.DPA[key] = playData[i].DPA[key];
					}
				}
				
				break;
			}
		}
	});
	
	init();
}

function init(){
	// SP/DP取得
	const spdp = document.forms[0].SPDP.value;
	// 表示用データの初期化
	mergedMusicData = new Array();
	// LV取得
	const lv = document.forms[0].LV.value;

	musicData.forEach(function(rec){
		if(rec[spdp + "N"]){
			if(rec[spdp + "N"].DIFFICULT == lv){
				mergedMusicData.push({
					TITLE:rec.TITLE,
					BPM:rec.BPM,
					type:"N",
					BSS:rec[spdp + "N"].BSS,
					HBSS:rec[spdp + "N"].HBSS,
					CN:rec[spdp + "N"].CN,
					HCN:rec[spdp + "N"].HCN,
					DIFFICULT:rec[spdp + "N"].DIFFICULT,
					OPEN:rec[spdp + "N"].OPEN,
					CLEARSTATUS:rec[spdp + "N"].CLEARSTATUS,
					PLAYRESULT:rec[spdp + "N"].PLAYRESULT,
					EXSCORE:rec[spdp + "N"].EXSCORE,
					MISSCOUNT:rec[spdp + "N"].MISSCOUNT
				});
			}
		}
		if(rec[spdp + "H"]){
			if(rec[spdp + "H"].DIFFICULT == lv){
				mergedMusicData.push({
					TITLE:rec.TITLE,
					BPM:rec.BPM,
					type:"H",
					BSS:rec[spdp + "H"].BSS,
					HBSS:rec[spdp + "H"].HBSS,
					CN:rec[spdp + "H"].CN,
					HCN:rec[spdp + "H"].HCN,
					DIFFICULT:rec[spdp + "H"].DIFFICULT,
					OPEN:rec[spdp + "H"].OPEN,
					CLEARSTATUS:rec[spdp + "H"].CLEARSTATUS,
					PLAYRESULT:rec[spdp + "H"].PLAYRESULT,
					EXSCORE:rec[spdp + "H"].EXSCORE,
					MISSCOUNT:rec[spdp + "H"].MISSCOUNT
				});
			}
		}
		if(rec[spdp + "A"]){
			if(rec[spdp + "A"].DIFFICULT == lv){
				mergedMusicData.push({
					TITLE:rec.TITLE,
					BPM:rec.BPM,
					type:"A",
					BSS:rec[spdp + "A"].BSS,
					HBSS:rec[spdp + "A"].HBSS,
					CN:rec[spdp + "A"].CN,
					HCN:rec[spdp + "A"].HCN,
					DIFFICULT:rec[spdp + "A"].DIFFICULT,
					OPEN:rec[spdp + "A"].OPEN,
					CLEARSTATUS:rec[spdp + "A"].CLEARSTATUS,
					PLAYRESULT:rec[spdp + "A"].PLAYRESULT,
					EXSCORE:rec[spdp + "A"].EXSCORE,
					MISSCOUNT:rec[spdp + "A"].MISSCOUNT
				});
			}
		}
	});
	// Data Table取得
	const dt = document.getElementById("dt");
	// 表示内容をクリア
	dt.innerHTML = null;
	
	mergedMusicData.sort(function(a, b){
	
		if(a.DIFFICULT > b.DIFFICULT){
			return 1;
		}else if(a.DIFFICULT < b.DIFFICULT){
			return -1;
		}
		
		if(a.TITLE.toUpperCase() > b.TITLE.toUpperCase()){
			return 1;
		}else if(a.TITLE.toUpperCase() < b.TITLE.toUpperCase()){
			return -1;
		}
		
		return 0;
	});
	
	mergedMusicData.forEach(function(rec){
	
		if(document.getElementById("hideOpenData").checked && !rec.OPEN){
			return;
		}
		
		let r = document.createElement("tr");
		r.style.cursor = "pointer";
		r.setAttribute("title", rec.TITLE);
		r.setAttribute("type", rec.type);
		r.onclick = function(){
			let t = event.target;
			while(t.tagName != "TR"){
				t = t.parentNode;
			}
			const title = t.getAttribute("title");
			const type = t.getAttribute("type");
			openInputForm(title, type);
		}
		
		let color;
		
		if(rec.type == "N"){
			color = "00A0FF";
		}else if(rec.type == "H"){
			color = "FFC000";
		}else if(rec.type == "A"){
			color = "FF0000";
		}
		
		addText(r, rec.DIFFICULT, "width:1.2em;font-size:5.0em;text-align:center;color:#" + color + ";").setAttribute("class", "TOP_" + rec.CLEARSTATUS.replaceAll(" ", "_"));
		
		const c = document.createElement("td");
		
		let divTitle = createDiv();
		divTitle.innerText = rec.TITLE;
		divTitle.style = "font-size:1.1em;";
		if(!rec.OPEN){
			divTitle.style.color = "gray";
		}
		c.appendChild(divTitle);
		
		let div = createDiv();
		div.style = "display:flex;justify-content:space-between;";
		
		let divA = createDiv();
		
		let divA1 = createDiv();
		divA1.style = "display:flex;justify-content:flex-start;";
		
		let div4 = createDiv();
		div4.innerText = "BPM:" + rec.BPM;
		div4.style.width = "6.5em";
		if(!rec.OPEN){
			div4.style.color = "gray";
		}
		divA1.appendChild(div4);
		
		let div42 = createDiv();
		if(rec.BSS || rec.CN){
			div42.innerText = "CN";
			div42.setAttribute("class", "CN");
		}else if(rec.HBSS || rec.HCN){
			div42.innerText = "HCN";
			div42.setAttribute("class", "HCN");
		}
		div42.style = "width:2.2em;text-align:center;";
		divA1.appendChild(div42);
		
		let divA2 = createDiv();
		divA2.style = "display:flex;justify-content:flex-start;";
		
		let div5 = createDiv();
		div5.innerText = rec.CLEARSTATUS;
		div5.setAttribute("class", rec.CLEARSTATUS.replaceAll(" ", "_"));
		div5.style.width = "6.5em";
		divA2.appendChild(div5);
		
		if(rec.OPEN){
			let div6 = createDiv();
			div6.innerText = rec.PLAYRESULT;
			div6.setAttribute("class", "PLAYRESULT " + rec.PLAYRESULT);
			div6.style = "width:2.2em;text-align:center;";
			divA2.appendChild(div6);
		}
		
		divA.appendChild(divA1);
		
		divA.appendChild(divA2);
		
		div.appendChild(divA);
		
		let divX = createDiv();
		divX.style = "width:7.0em;padding-right:0.15em;";
		
		let div7 = createDiv();
		div7.style = "display:flex;justify-content:space-between;";
		
		if(rec.OPEN){
			let div71 = createDiv();
			div71.innerText = "EX SCORE";
			div7.appendChild(div71);
			
			let div72 = createDiv();
			div72.innerText = rec.EXSCORE;
			div7.appendChild(div72);
			
			divX.appendChild(div7);
			
			let div8 = createDiv();
			div8.style = "display:flex;justify-content:space-between;";
			
			let div81 = createDiv();
			div81.innerText = "MISS COUNT";
			div8.appendChild(div81);
			
			let div82 = createDiv();
			div82.innerText = rec.MISSCOUNT;
			
			div8.appendChild(div82);
			
			divX.appendChild(div8);
			
			div.appendChild(divX);
		}
		
		c.appendChild(div);
		
		r.appendChild(c);
		
		dt.appendChild(r);
	});
}

function createDiv(){
	return document.createElement("div");
}

function makeInitData(rec){
	// 初期化データ
	const initialData = {
		OPEN:false,
		CLEARSTATUS:"NO PLAY",
		PLAYRESULT:"F",
		EXSCORE:0,
		MISSCOUNT:0
	}
	// コピー用データの準備
	const copyData = {};
	// タイトルをコピー
	copyData.TITLE = rec.TITLE;
	// SPNデータのコピー
	if(rec.SPN){
		copyData.SPN = JSON.parse(JSON.stringify(initialData));
	}
	// SPHデータのコピー
	if(rec.SPH){
		copyData.SPH = JSON.parse(JSON.stringify(initialData));
	}
	// SPAデータのコピー
	if(rec.SPA){
		copyData.SPA = JSON.parse(JSON.stringify(initialData));
	}
	// DPNデータのコピー
	if(rec.DPN){
		copyData.DPN = JSON.parse(JSON.stringify(initialData));
	}
	// DPHデータのコピー
	if(rec.DPH){
		copyData.DPH = JSON.parse(JSON.stringify(initialData));
	}
	// DPAデータのコピー
	if(rec.DPA){
		copyData.DPA = JSON.parse(JSON.stringify(initialData));
	}
	// コピーデータを返却
	return copyData;
}

function addText(r, text, style){

	const cell = document.createElement("td");
	
	cell.innerText = text;
	
	if(style){
		cell.style = style;
	}
	
	r.appendChild(cell);
	
	return cell;
}

function openInputForm(title, type){
	
	const spdp = document.forms[0].SPDP.value + type;
	
	for(let i = 0; i < musicData.length; i++){
		
		if(musicData[i].TITLE == title){
			
			document.getElementById("TITLE").innerText = title;
			document.getElementById("SPDP").innerText = spdp;
			document.getElementById("NOTES").innerText = musicData[i][spdp].NOTES;
			document.getElementById("OPEN").checked = musicData[i][spdp].OPEN;
			document.getElementById("CLEARSTATUS").value = musicData[i][spdp].CLEARSTATUS;
			document.getElementById("EXSCORE").value = musicData[i][spdp].EXSCORE;
			document.getElementById("MISSCOUNT").value = musicData[i][spdp].MISSCOUNT;
			
			if(musicData[i][spdp].OPEN){
				document.getElementById("CLEARSTATUS").disabled = false;
				document.getElementById("PLAYRESULT").disabled = false;
				document.getElementById("EXSCORE").disabled = false;
				document.getElementById("MISSCOUNT").disabled = false;
			}else{
				document.getElementById("CLEARSTATUS").disabled = true;
				document.getElementById("PLAYRESULT").disabled = true;
				document.getElementById("EXSCORE").disabled = true;
				document.getElementById("MISSCOUNT").disabled = true;
			}
			
			calc(musicData[i][spdp].NOTES, musicData[i][spdp].EXSCORE);
			
			document.getElementById("inputContainer").style.display = "block";
			
			break;
		}
	}
}

function cancel(){
	
	document.getElementById("inputContainer").style.display = "none";
}

function save(){
	
	const title = document.getElementById("TITLE").innerText;
	
	const spdp = document.getElementById("SPDP").innerText;
	
	for(let i = 0; i < musicData.length; i++){
	
		if(musicData[i].TITLE == title){
		
			musicData[i][spdp].OPEN = document.getElementById("OPEN").checked;
			musicData[i][spdp].CLEARSTATUS = document.getElementById("CLEARSTATUS").value;
			musicData[i][spdp].PLAYRESULT = document.getElementById("PLAYRESULT").innerText;
			musicData[i][spdp].EXSCORE = document.getElementById("EXSCORE").value;
			musicData[i][spdp].MISSCOUNT = document.getElementById("MISSCOUNT").value;
			
			break;
		}
	}
	
	for(let i = 0; i < playData.length; i++){
	
		if(playData[i].TITLE == title){
		
			playData[i][spdp].OPEN = document.getElementById("OPEN").checked;
			playData[i][spdp].CLEARSTATUS = document.getElementById("CLEARSTATUS").value;
			playData[i][spdp].PLAYRESULT = document.getElementById("PLAYRESULT").innerText;
			playData[i][spdp].EXSCORE = document.getElementById("EXSCORE").value;
			playData[i][spdp].MISSCOUNT = document.getElementById("MISSCOUNT").value;
			
			break;
		}
	}
	
	localStorage.setItem("playData", JSON.stringify(playData));
	
	document.getElementById("inputContainer").style.display = "none";
	
	init();
}

function openChange(){
	
	if(event.target.checked){
		document.getElementById("CLEARSTATUS").disabled = false;
		document.getElementById("EXSCORE").disabled = false;
		document.getElementById("MISSCOUNT").disabled = false;
	}else{
		document.getElementById("CLEARSTATUS").disabled = true;
		document.getElementById("EXSCORE").disabled = true;
		document.getElementById("MISSCOUNT").disabled = true;
	}
}

function focusReset(){
	
	event.target.value = "";
}

function calcRate(){
	
	calc(parseInt(document.getElementById("NOTES").innerText, 10), event.target.value);
}

function calc(notes, exscore){
	/*
		AAA…8/9以上
		AA…7/9以上
		A…6/9以上
		B…5/9以上
		C…4/9以上
		D…3/9以上
		E…2/9以上
		F…2/9未満
	*/
	const max = notes * 2;
	
	const rate = exscore / max;
	
	if(rate >= (8 / 9)){
	
		document.getElementById("PLAYRESULT").innerText = "AAA";
		document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT AAA");
		if(rate >= (85 / 90)){
			document.getElementById("DETAIL").innerText = "(MAX-" + (max - exscore) + ")";
		}else{
			document.getElementById("DETAIL").innerText = "(AAA+" + (exscore - Math.ceil(max * (8 / 9))) + ")";
		}
	}else if(rate >= (7 / 9)){
		document.getElementById("PLAYRESULT").innerText = "AA";
		document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT AA");
		document.getElementById("DETAIL").innerText = "(AAA-" + (Math.ceil(max * (8 / 9)) - exscore) + ")";
	}else if(rate >= (6 / 9)){
		document.getElementById("PLAYRESULT").innerText = "A";
		document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT A");
		document.getElementById("DETAIL").innerText = "(AA-" + (Math.ceil(max * (7 / 9)) - exscore) + ")";
	}else if(rate >= (5 / 9)){
		document.getElementById("PLAYRESULT").innerText = "B";
		document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT B");
		document.getElementById("DETAIL").innerText = "(A-" + (Math.ceil(max * (6 / 9)) - exscore) + ")";
	}else if(rate >= (4 / 9)){
		document.getElementById("PLAYRESULT").innerText = "C";
		document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT C");
		document.getElementById("DETAIL").innerText = "(B-" + (Math.ceil(max * (5 / 9)) - exscore) + ")";
	}else if(rate >= (3 / 9)){
		document.getElementById("PLAYRESULT").innerText = "D";
		document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT D");
		document.getElementById("DETAIL").innerText = "(C-" + (Math.ceil(max * (4 / 9)) - exscore) + ")";
	}else if(rate >= (2 / 9)){
		document.getElementById("PLAYRESULT").innerText = "E";
		document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT E");
		document.getElementById("DETAIL").innerText = "(D-" + (Math.ceil(max * (3 / 9)) - exscore) + ")";
	}else{
		document.getElementById("PLAYRESULT").innerText = "F";
		document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT F");
		if(exscore != 0){
			document.getElementById("DETAIL").innerText = "(E-" + (Math.ceil(max * (2 / 9)) - exscore) + ")";
		}else{
			document.getElementById("DETAIL").innerText = "";
		}
	}
}

function openOption(){
	
	document.getElementById("total").innerText = mergedMusicData.length;
	
	let notOpenCnt = 0;
	let noPlayCnt = 0;
	let failedCnt = 0;
	let assistClearCnt = 0;
	let easyClearCnt = 0;
	let clearCnt = 0;
	let hardClearCnt = 0;
	let exhClearCnt = 0;
	let fullComboCnt = 0;
	let aaaCnt = 0;
	let aaCnt = 0;
	let aCnt = 0;
	let bCnt = 0;
	let cCnt = 0;
	let dCnt = 0;
	let eCnt = 0;
	let fCnt = 0;
	
	mergedMusicData.forEach(function(rec){
	
		if(!rec.OPEN){
			notOpenCnt++;
		}else{
			switch(rec.CLEARSTATUS){
				case "NO PLAY":
					noPlayCnt++;
					break;
				case "FAILED":
					failedCnt++;
					break;
				case "ASSIST CLEAR":
					assistClearCnt++;
					break;
				case "EASY CLEAR":
					easyClearCnt++;
					break;
				case "CLEAR":
					clearCnt++;
					break;
				case "HARD CLEAR":
					hardClearCnt++;
					break;
				case "EX HARD CLEAR":
					exhClearCnt++;
					break;
				case "FULL COMBO":
					fullComboCnt++;
					break;
			}
			switch(rec.PLAYRESULT){
				case "AAA":
					aaaCnt++;
					break;
				case "AA":
					aaCnt++;
					break;
				case "A":
					aCnt++;
					break;
				case "B":
					bCnt++;
					break;
				case "C":
					cCnt++;
					break;
				case "D":
					dCnt++;
					break;
				case "E":
					eCnt++;
					break;
				case "F":
					fCnt++;
					break;
			}
		}
	});
	
	document.getElementById("notOpenCnt").innerText = notOpenCnt;
	document.getElementById("noPlayCnt").innerText = noPlayCnt;
	document.getElementById("failedCnt").innerText = failedCnt;
	document.getElementById("assistClearCnt").innerText = assistClearCnt;
	document.getElementById("easyClearCnt").innerText = easyClearCnt;
	document.getElementById("clearCnt").innerText = clearCnt;
	document.getElementById("hardClearCnt").innerText = hardClearCnt;
	document.getElementById("exhClearCnt").innerText = exhClearCnt;
	document.getElementById("fullComboCnt").innerText = fullComboCnt;

	document.getElementById("aaaCnt").innerText = aaaCnt;
	document.getElementById("aaCnt").innerText = aaCnt;
	document.getElementById("aCnt").innerText = aCnt;
	document.getElementById("bCnt").innerText = bCnt;
	document.getElementById("cCnt").innerText = cCnt;
	document.getElementById("dCnt").innerText = dCnt;
	document.getElementById("eCnt").innerText = eCnt;
	document.getElementById("fCnt").innerText = fCnt;
	
	document.getElementById("optionContainer").style.display = "block";
}

function closeOption(){
	
	document.getElementById("optionContainer").style.display = "none";
}
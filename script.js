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

var clearStatusFilter = null;
var playResultFilter = null;

function filter(argType, argFilter){
	if(argType == 'CLEARSTATUS'){
		playResultFilter = null;
		clearStatusFilter = argFilter;
	}else if(argType == 'PLAYRESULT'){
		playResultFilter = argFilter;
		clearStatusFilter = null;
	}
	init();
	closeOption();
}

function clearFilter(){
	clearStatusFilter = null;
	playResultFilter = null;
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
					NOTES:rec[spdp + "N"].NOTES,
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
					NOTES:rec[spdp + "H"].NOTES,
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
					NOTES:rec[spdp + "A"].NOTES,
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
		
		if(a.TITLE.match(/^[0-9|\.]/) && !b.TITLE.match(/^[0-9|\.]/)){
			if(b.TITLE.match(/^[a-zA-Z]/)){
				return 1;
			}
		}else if(!a.TITLE.match(/^[0-9|\.]/) && b.TITLE.match(/^[0-9|\.]/)){
			if(a.TITLE.match(/^[a-zA-Z]/)){
				return -1;
			}
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
		
		if(clearStatusFilter != null){
			if(clearStatusFilter == '未解禁'){
				if(rec.OPEN){
					return;
				}
			}else{
				 if(clearStatusFilter != rec.CLEARSTATUS){
					return;
				}
			}
		}
		
		if(playResultFilter != null){
			if(playResultFilter != rec.PLAYRESULT){
				return;
			}
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
		
		let cell = createCell();
		
		let divHeader = createDiv({
			style:"font-size:3.5em;background-color:rgba(32,32,32,0.5);display:flex;justify-content:flex-start;border:5px solid rgb(255,128,0);border-radius:12px;"
		});
		
		let divStat = createDiv({
			style:"width:0.5em;border-radius:6px 0px 0px 6px;",
			html:"&nbsp;",
			class:"TOP_" + rec.CLEARSTATUS.replaceAll(" ", "_") + " TOP_" + rec.type
		});
		
		divHeader.appendChild(divStat);
		
		let divDifficult = createDiv({
			style:"width:1.5em;padding-top:0.2em;",
			text:rec.DIFFICULT,
			class:"DIFFICULT DIF_" + rec.type
		});
		
		divHeader.appendChild(divDifficult);
		
		let divTitle = createDiv({
			style:"padding-top:0.2em;padding-bottom:0.2em;",
			text:rec.TITLE
		});
		
		if(!rec.OPEN){
			divTitle.style.color = "gray";
		}
		
		divHeader.appendChild(divTitle);
		
		cell.appendChild(divHeader);
		
		let div1 = createDiv({
			style:"font-size:3.0em;display:flex;justify-content:flex-start;"
		});
		
		let divCN = createDiv({
			style:"width:2.2em;text-align:center;margin-left:0.25em;margin-right:0.25em;"
		});
		
		if(rec.BSS || rec.CN){
			divCN.innerText = "CN";
			divCN.setAttribute("class", "CN");
		}else if(rec.HBSS || rec.HCN){
			divCN.innerText = "HCN";
			divCN.setAttribute("class", "HCN");
		}
		
		div1.appendChild(divCN);
		
		let divBPM = createDiv({
			style:"width:6.0em;",
			text:"BPM:" + rec.BPM
		});

		if(!rec.OPEN){
			divBPM.style.color = "gray";
		}
		
		div1.appendChild(divBPM);
		
		let divNOTES = createDiv({
			style:"width:6.0em;",
			text:"NOTES:" + rec.NOTES
		});

		if(!rec.OPEN){
			divNOTES.style.color = "gray";
		}
		div1.appendChild(divNOTES);
		
		cell.appendChild(div1);
		
		if(rec.OPEN){
		
			let divDet = createDiv({
				style:"font-size:3.0em;display:flex;justify-content:space-between;"
			});
			
			let divA = createDiv();
		
			let div2 = createDiv({
				style:"display:flex;justify-content:flex-start;"
			});

			let div21 = createDiv({
				style:"width:6.5em;",
				text:"EX SCORE"
			});
			
			div2.appendChild(div21);
			
			let div22 = createDiv({
				style:"text-align:right;width:3em;",
				text:rec.EXSCORE
			});
			
			div2.appendChild(div22);
			
			divA.appendChild(div2);
			
			let div3 = createDiv({
				style:"display:flex;justify-content:flex-start;"
			});
			
			let div31 = createDiv({
				style:"width:6.5em;",
				text:"MISS COUNT"
			});
			
			div3.appendChild(div31);
			
			let div32 = createDiv({
				style:"text-align:right;width:3em;",
				text:rec.MISSCOUNT
			});
			
			div3.appendChild(div32);
			
			divA.appendChild(div3);
			
			divDet.appendChild(divA);
			
			let div6 = createDiv({
				style:"width:2.0em;font-size:2.0em;padding-left:0.1em;padding-right:0.1em;text-align:center;",
				text:rec.PLAYRESULT,
				class:"PLAYRESULT " + rec.PLAYRESULT
			});
			
			divDet.appendChild(div6);
			
			cell.appendChild(divDet);
		}
		
		const ret = calc(rec.NOTES, rec.EXSCORE);
		
		let div5 = createDiv({
			style:"font-size:3.0em;display:flex;justify-content:space-between;"
		});
		
		let div51 = createDiv({
			text:rec.CLEARSTATUS,
			class:rec.CLEARSTATUS.replaceAll(" ", "_")
		});

		div5.appendChild(div51);
		
		let div52 = createDiv({
			style:"width:4.7em;text-align:center;",
			text:ret.detail
		});

		div5.appendChild(div52);
		
		cell.appendChild(div5);

		r.appendChild(cell);
		
		dt.appendChild(r);
	});
}

function createCell(){
	return document.createElement("td");
}

function createDiv(option){
	const div = document.createElement("div");
	if(option){
		if(option.style){
			div.style = option.style;
		}
		if(option.text){
			div.innerText = option.text;
		}
		if(option.html){
			div.innerHtml = option.html;
		}
		if(option.class){
			div.setAttribute("class", option.class);
		}
	}
	return div;
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
			const res = calc(musicData[i][spdp].NOTES, musicData[i][spdp].EXSCORE);
			document.getElementById("PLAYRESULT").innerText = res.result;
			document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT " + res.result);
			if(res.detail != ""){
				document.getElementById("DETAIL").innerText = "(" + res.detail + ")";
			}else{
				document.getElementById("DETAIL").innerText = "";
			}
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
	
	const res = calc(parseInt(document.getElementById("NOTES").innerText, 10), event.target.value);
	document.getElementById("PLAYRESULT").innerText = res.result;
	document.getElementById("PLAYRESULT").setAttribute("class", "PLAYRESULT " + res.result);
	if(res.detail != ""){
		document.getElementById("DETAIL").innerText = "(" + res.detail + ")";
	}
}

function calc(notes, exscore){
	const ret = {
		result:"",
		detail:""
	};
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
	
	if(rate == 1){
		ret.result = "AAA";
		ret.detail = "MAX+0";
	}else if(rate >= (8 / 9)){
		ret.result = "AAA";
//		if(rate >= (85 / 90)){
//			ret.detail = "MAX-" + (max - exscore);
//		}else{
			ret.detail= "AAA+" + (exscore - Math.ceil(max * (8 / 9)));
//		}
	}else if(rate >= (7 / 9)){
		ret.result = "AA";
		ret.detail = "AAA-" + (Math.ceil(max * (8 / 9)) - exscore);
	}else if(rate >= (6 / 9)){
		ret.result = "A";
		ret.detail = "AA-" + (Math.ceil(max * (7 / 9)) - exscore);
	}else if(rate >= (5 / 9)){
		ret.result = "B";
		ret.detail = "A-" + (Math.ceil(max * (6 / 9)) - exscore);
	}else if(rate >= (4 / 9)){
		ret.result = "C";
		ret.detail = "B-" + (Math.ceil(max * (5 / 9)) - exscore);
	}else if(rate >= (3 / 9)){
		ret.result = "D";
		ret.detail = "C-" + (Math.ceil(max * (4 / 9)) - exscore);
	}else if(rate >= (2 / 9)){
		ret.result = "E";
		ret.detail= "D-" + (Math.ceil(max * (3 / 9)) - exscore);
	}else{
		ret.result = "F";

		if(exscore != 0){
			ret.detail = "E-" + (Math.ceil(max * (2 / 9)) - exscore);
		}else{
			ret.detail = "";
		}
	}
	return ret;
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
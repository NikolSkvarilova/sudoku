(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],[,,,,function(e){e.exports=JSON.parse('{"txtPrimaryDark":"#000000","txtPrimaryLight":"#FFFFFF","txtSecondary":"#9E9E9E","fancy1":"#FF00FF","fancy2":"#0071BC","bgDark":"#1A1A1A","bgLight":"#FFFFFF"}')},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,a){e.exports=a(69)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){e.exports=a.p+"static/media/background_landing_page.e5a96202.png"},function(e,t,a){e.exports=a.p+"static/media/about_us.accbce02.png"},function(e,t,a){e.exports=a.p+"static/media/code.a5edd4ac.png"},function(e,t,a){e.exports=a.p+"static/media/documentation.2d5b2333.png"},function(e,t,a){e.exports=a.p+"static/media/about_img.2750b97e.png"},function(e,t,a){e.exports=a.p+"static/media/sudoku_light.ebf66f08.png"},function(e,t,a){e.exports=a.p+"static/media/API.ab28b2bc.png"},function(e,t,a){},function(e,t,a){e.exports=a.p+"static/media/daily.d7031145.png"},,,function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(19),r=a.n(o),i=(a(43),a(13)),c=a(14),s=a(17),u=a(16),m=(a(44),a(35)),d=a(3),h=(a(45),a(46),function(e){var t={width:e.width?e.width:"100%",justifyContent:e.justifyContent?e.justifyContent:"center",background:e.bg?e.bg:"none",padding:e.padding?e.padding:"60px 0",flexDirection:e.flexDirection?e.flexDirection:"column",height:e.height?e.height:"auto",alignItems:e.alignItems?e.alignItems:""};return l.a.createElement("div",{className:"section-container",id:e.sectionLink,style:t},e.children)}),g=(a(47),a(85)),p=a(86),v=function(e){var t,a,n={backgroundColor:e.bg_color?e.bg_color:"white",background:e.bg_img?"url(".concat(e.bg_img,")"):"white",boxShadow:e.shadow?e.shadow:""},o={color:e.sub_text_color?e.sub_text_color:"gray"},r={backgroundColor:!!e.btn_bg_color&&e.btn_bg_color,boxShadow:e.btn_shadow?e.btn_shadow:"0px 0px 55px -2px rgba(0,0,0,0.63)"};return e.icon&&(t=l.a.createElement(g.a,{style:r,href:"#".concat(e.link)},l.a.createElement(p.a,{fontSize:"large",style:{color:e.arrow_color?e.arrow_color:"black"}}))),(e.icon||e.sub_text)&&(a=l.a.createElement("div",{className:"scroll-down_container"},!!e.sub_text&&l.a.createElement("p",{className:"sub_text",style:o},e.sub_text),t)),l.a.createElement("div",{className:"landing_page_container",style:n},l.a.createElement("div",{className:"text-section"},e.children),a)},f=(a(51),function(e){return l.a.createElement("div",{className:"quote-container"},l.a.createElement("figure",{className:"figure-container"},l.a.createElement("blockquote",{className:"quote-text",style:e.text_styles},'"',e.text,'"'),!!e.author&&l.a.createElement("figcaption",{className:"quote-author",style:e.author_styles},"\u2013\u2060 ",e.author)),e.line_styles?l.a.createElement("div",{className:"rectangle",style:e.line_styles}):"")}),k=(a(52),function(e){var t={color:e.title_color?e.title_color:"black"},a={color:e.sub_title_color?e.sub_title_color:"gray"},n={color:e.txt_color?e.txt_color:"black"},o={background:e.line_color?e.line_color:""},r="";r="to_edge"===e.img_position&&"left"===e.img_align?"to_edge_left_full_screen_mobile":"to_edge"===e.img_position&&"left"!=e.img_align?"to_edge_right_full_screen_mobile":"img_center";var i="";i="left"===e.img_align?"img_on_the_left_from_text":"img_on_the_right_from_text";var c,s,u="";return u=e.img_full_width_mobile?"img_full_width_mobile":"img_regular_width_mobile",l.a.createElement("div",{className:"text_section_container ".concat(e.img_align," ").concat((c=e.img_align,s=e.img_align_mobile,null==s?"left"===c?"top":"bot":s))},l.a.createElement("div",{className:"text_half_container"},l.a.createElement("div",{className:"text_half_wrapper ".concat(i)},e.line_color?l.a.createElement("div",{className:"rectangle",style:o}):"",l.a.createElement("div",{className:"text_half"},e.title?l.a.createElement("h1",{className:"text_section_title",style:t},e.title):"",e.sub_title?l.a.createElement("h2",{className:"text_section_subtitle",style:a},e.sub_title):"",l.a.createElement("article",{className:"text",style:n},e.children)))),l.a.createElement("div",{className:"img_half_container ".concat(r)},l.a.createElement("img",{className:"img_half ".concat(u),src:e.img,alt:e.alt})))}),b=(a(53),a(54),function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){return Object(i.a)(this,a),t.call(this,e)}return Object(c.a)(a,[{key:"buildButton",value:function(e){var t="button";this.props.class&&(t+=" "+this.props.class);var a=l.a.createElement("div",Object.assign({className:t,style:e},!!this.props.onClick&&{onClick:this.props.onClick}),this.props.children);return this.props.link?l.a.createElement("a",{href:this.props.link},a):a}},{key:"render",value:function(){var e={borderColor:this.props.borderColor?this.props.borderColor:"black",color:this.props.txtColor?this.props.txtColor:"black",margin:this.props.margin?this.props.margin:"0"};return this.buildButton(e)}}]),a}(l.a.Component)),y=function(e){var t=[];return e.levels.forEach((function(a){t.push(l.a.createElement(b,{link:"".concat(e.goTo,"/").concat(a.linkValue),borderColor:e.borderColor,txtColor:e.txtColor},a.name))})),l.a.createElement("div",{className:"container",style:e.sectionStyle},l.a.createElement("h1",null,"Choose your level!"),l.a.createElement("div",{className:"levels-container"},t))},E=a(29),_=(a(55),a(56),function(e){return l.a.createElement("div",{className:"category-container",style:e.style},l.a.createElement("div",{className:"img-wrapper"},l.a.createElement("img",{src:e.img,alt:"image"})),e.children)}),S=function(e){var t=[];return e.categories.forEach((function(a){t.push(l.a.createElement(_,{img:a.img,style:Object(E.a)(Object(E.a)({},e.style),a.style)},a.content))})),l.a.createElement("div",{className:"categories-container"},t)},x=(a(57),function(e){var t={color:e.noteColor?e.noteColor:"black"},a={color:e.counterColor?e.counterColor:"black"};return l.a.createElement("div",{className:"counter-container"},!!e.upperTxt&&l.a.createElement("p",{className:"counter-note counter-upperTxt",style:t},e.upperTxt),l.a.createElement("p",{className:"counter-num",style:a},e.number.toLocaleString()),!!e.bottomTxt&&l.a.createElement("p",{className:"counter-note counter-bottomTxt",style:t},e.bottomTxt))});a.p;var w=a(4),N=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={numOfSudokus:0},a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.getNumOfSudokus()}},{key:"getNumOfSudokus",value:function(){var e=this;fetch("/api/numOfSudokus").then((function(e){return e.json()})).then((function(t){return e.setState({numOfSudokus:t.numOfSudokus})})).catch((function(t){e.setState({numOfSudokus:1e4})}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"home"},l.a.createElement(h,{padding:"0",bg:w.bgDark,className:"dark-container"},l.a.createElement(h,{padding:"0 0 60px 0"},l.a.createElement(v,{sub_text:"We have taken sudoku to a new level.",sub_text_color:w.txtPrimaryLight,bg_img:a(58),bg_color:w.bgDark,icon:!0,btn_bg_color:"rgba(219, 219, 219, 0.3)",arrow_color:"white",link:"quote",shadow:"0px 0px 55px -2px rgba(0,0,0,0.63)"},l.a.createElement("h1",{style:{color:w.txtPrimaryLight}},"It's not just ",l.a.createElement("br",null)," sudoku."),l.a.createElement("h2",{style:{color:w.txtPrimaryLight}},"Lorem Ipsum Dolor sit amet."),l.a.createElement("p",{style:{color:w.txtPrimaryLight}},"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis sagittis nisi. Donec vitae blandit quam, et rhoncus nulla. Nulla vitae urna at ex maximus rutrum."))),l.a.createElement(h,{sectionLink:"quote"},l.a.createElement(f,{text:"If you are curious, you'll find the puzzles around you. If you are determined, you will solve them.",author:"Erno Rubik",text_styles:{color:w.txtPrimaryLight},author_styles:{color:w.txtSecondary}})),l.a.createElement(h,null,l.a.createElement(S,{categories:[{img:a(59),content:[l.a.createElement("h1",null,"About Us"),l.a.createElement("p",null,"Learn more about our team and our work.")]},{img:a(60),content:[l.a.createElement("h1",null,"Code"),l.a.createElement("p",null,l.a.createElement("a",{href:"https://github.com/NikolSkvarilova/sudoku"},"View source code")," and check out used technologies.")]},{img:a(61),content:[l.a.createElement("h1",null,"Documentation"),l.a.createElement("p",null,"Read the documentation and join the development process!")]}],style:{color:"white"}})),l.a.createElement(h,{sectionLink:"about"},l.a.createElement(k,{title:"About project",sub_title:"A few words from the author.",title_color:w.txtPrimaryLight,sub_title_color:w.txtSecondary,txt_color:w.txtPrimaryLight,line_color:"#741FFF",img:a(62),alt:"Designer Image",img_align_mobile:"top",img_align:"left",line_bg:"linear-gradient(90deg, rgba(150,85,255,1) 0%, rgba(116,31,255,1) 100%);"},l.a.createElement("p",null,"Aliquam sollicitudin egestas pellentesque. Nulla porta sollicitudin lacus, ut finibus libero fermentum quis. Integer fermentum mattis ex, lacinia lobortis ex hendrerit in. Vivamus at ante imperdiet, lobortis felis vitae, efficitur massa.")," ",l.a.createElement("p",null,"Nam ex metus, venenatis id justo nec, tempus dictum mauris. Sed non nibh lorem. Phasellus et faucibus ligula, sit amet porttitor magna. Phasellus non volutpat dolor, nec lobortis ex."))),l.a.createElement(h,null,l.a.createElement(x,{number:this.state.numOfSudokus,upperTxt:"We have got for you over",bottomTxt:"sudokus you can play right now!",noteColor:"white",counterColor:"#741FFF"})),l.a.createElement(h,{sectionLink:"rules"},l.a.createElement(k,{title:"Rules",sub_title:"Learn the rules for solving sudoku!",title_color:w.txtPrimaryLight,sub_title_color:w.txtSecondary,txt_color:w.txtPrimaryLight,img:a(63),alt:"Designer Image",img_align:"right",img_align_mobile:"bot"},l.a.createElement("p",null,"Sudoku is played over a ",l.a.createElement("strong",null,"9x9 grid"),", divided to ",l.a.createElement("strong",null,"3x3 sub"),' grids called "regions".'),l.a.createElement("p",null,"Sudoku begins with some of the grid cells already filled with numbers."),l.a.createElement("p",null,"The object of Sudoku is to fill the other empty cells with numbers between 1 and 9 (1 number only in each cell) according the following guidelines"),l.a.createElement("ol",null,l.a.createElement("li",null,"Number can appear only once on each ",l.a.createElement("strong",null,"row"),"."),l.a.createElement("li",null,"Number can appear only once on each ",l.a.createElement("strong",null,"column"),"."),l.a.createElement("li",null,"Number can appear only once on each ",l.a.createElement("strong",null,"region"),".")),l.a.createElement("p",null,"And that\u2019s it, ladies and gentlemans! You are ready to start solving some sudoku puzzles!"),l.a.createElement("p",null,l.a.createElement("strong",null,"Warning!")," Some sudokus are not solvable or have more solutions. But keep calm, our sudokus are solvable ane have only one solution!"))),l.a.createElement(h,{padding:"0",sectionLink:"levels"},l.a.createElement(y,{levels:[{name:"Beginner",linkValue:1},{name:"Normal",linkValue:2},{name:"Advanced",linkValue:3},{name:"Hard",linkValue:4},{name:"Extra Hard",linkValue:5}],goTo:"/play",sectionStyle:{background:"linear-gradient(135deg, ".concat(w.fancy1,", ").concat(w.fancy2),color:"white"},borderColor:"white",txtColor:"white"})),l.a.createElement(h,{sectionLink:"api"},l.a.createElement(k,{title:"API",title_color:w.txtPrimaryLight,txt_color:w.txtPrimaryLight,img:a(64),alt:"API img",img_align:"left",img_align_mobile:"bot"},l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "),l.a.createElement("p",null,"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint. "),l.a.createElement(b,{class:"home-page-btn",borderColor:"white",txtColor:"white",link:"#"},"See More")))))}}]),n}(l.a.Component),C=(a(65),function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={originalSudoku:null,currentSudoku:null,selectedValue:"",noting:!1,dailySudoku:!1,minutes:0,seconds:0,intervalID:0,dailySolvers:[],rowsInSolversTable:5},a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.getSudoku(),this.getDailySudokuSolvers()}},{key:"startStopwatch",value:function(){var e=this;this.state.intervalID=setInterval((function(){return e.setState((function(e){return{seconds:59===e.seconds?0:e.seconds++,minutes:59===e.seconds?e.minutes++:e.minutes}}))}),1e3)}},{key:"stopStopwatch",value:function(){clearInterval(this.state.intervalID)}},{key:"resetStopwatch",value:function(){this.setState({minutes:0,seconds:0})}},{key:"fetchSudoku",value:function(e){var t=this;fetch(e).then((function(e){return e.json()})).then((function(e){return t.setState({originalSudoku:e.sudoku})})).then((function(){return t.createSudokuFromOriginal()})).catch((function(e){t.setState({currentSudoku:null})}))}},{key:"getSudoku",value:function(){this.fetchSudoku("/api/play/get_sudoku/".concat(this.props.match.params.level)),this.setState({dailySudoku:!1,selectedValue:""}),this.resetStopwatch(),this.startStopwatch()}},{key:"getDailySudoku",value:function(){this.fetchSudoku("/api/getDailySudoku"),this.setState({dailySudoku:!0,selectedValue:""}),document.body.scrollTop=0,document.documentElement.scrollTop=0,this.resetStopwatch(),this.startStopwatch()}},{key:"resetSudoku",value:function(){this.createSudokuFromOriginal(),this.setState({selectedValue:"",noting:!1})}},{key:"checkSudoku",value:function(){var e=this;this.stopStopwatch();var t="N/A";this.state.dailySudoku&&(t=prompt("Enter your name: "));var a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,originalSudoku:this.state.originalSudoku,solvedSudoku:this.objectSudokuToArraySudoku(),time:{minutes:this.state.minutes,seconds:this.state.seconds}})};fetch("/api/play/check_sudoku",a).then((function(e){return e.json()})).then((function(t){return e.solved(t.solved_correctly)})),this.state.dailySudoku&&this.getDailySudokuSolvers()}},{key:"createSudokuFromOriginal",value:function(){for(var e=this.state.originalSudoku.length,t=this.state.originalSudoku[0].length,a=this.generateBlankBoard(e),n=0;n<e;n++)for(var l=0;l<t;l++){var o=this.state.originalSudoku[n][l],r=!1;0!==o?r=!0:o=null;var i={value:o,notes:[],prefilled:r,row:n,col:l};a[n].push(i)}this.setState({currentSudoku:a})}},{key:"objectSudokuToArraySudoku",value:function(){for(var e=this.state.originalSudoku.length,t=this.generateBlankBoard(e),a=0;a<e;a++)for(var n=0;n<e;n++){var l=this.state.currentSudoku[a][n].value;null===l&&(l=0),t[a].push(l)}return t}},{key:"handleClickOnCell",value:function(e,t){if(!this.state.currentSudoku[e][t].prefilled){var a=this.state.currentSudoku,n=this.state.currentSudoku[e][t],l=this.state.selectedValue;if(this.state.noting)if(this.checkIfElementInArray(n.notes,l)){var o=n.notes.indexOf(l);o>-1&&n.notes.splice(o,1)}else n.notes.push(l);else n.value?n.value=null:n.value=l;a[e][t]=n,this.setState({currentSudoku:a})}}},{key:"getClassesForCell",value:function(e){var t="",a=Math.pow(this.state.originalSudoku.length,.5);return e.prefilled?t+=" prefilled":t+=" notFilled",e.value===this.state.selectedValue&&(t+=" selected"),this.wholeNumTest(e.col/a)||e.col/a===0||(t+=" edge-horizontal"),this.wholeNumTest(e.row/a)||e.row/a===0||(t+=" edge-vertical"),t}},{key:"countHowManyLeft",value:function(e){for(var t=0,a=this.state.currentSudoku.length,n=0;n<a;n++)for(var l=0;l<a;l++)this.state.currentSudoku[n][l].value===e&&t++;return a-t}},{key:"getPossibleValuesElements",value:function(){for(var e=this,t=[],a=function(a){t.push(l.a.createElement("section",{className:e.state.selectedValue===a+1?"value-btn value-btn-selected":"value-btn",onClick:function(){e.state.selectedValue!=a+1?e.setState({selectedValue:a+1}):e.setState({selectedValue:""})}},l.a.createElement("section",{className:"value"},a+1),l.a.createElement("section",{className:"howManyLeft"},e.countHowManyLeft(a+1))))},n=0;n<this.state.currentSudoku.length;n++)a(n);return t}},{key:"changeMode",value:function(){this.setState({noting:!this.state.noting})}},{key:"renderSudoku",value:function(){var e=this;return this.state.currentSudoku.map((function(t){var a=[];return t.forEach((function(t){a.push(l.a.createElement("td",{className:e.getClassesForCell(t),onClick:function(){return e.handleClickOnCell(t.row,t.col)}},l.a.createElement("div",{className:"cell-value"},t.value),t.value?"":l.a.createElement("div",{className:"cell-note"},t.notes.sort())))})),l.a.createElement("tr",null,a)}))}},{key:"generateBlankBoard",value:function(e){for(var t=[],a=0;a<e;a++)t.push([]);return t}},{key:"checkIfElementInArray",value:function(e,t){for(var a=0;a<e.length;a++)if(e[a]===t)return!0}},{key:"wholeNumTest",value:function(e){return e-Math.floor(e)!==0}},{key:"getDailySudokuSolvers",value:function(){var e=this;fetch("/api/play/getDailySudokuSolvers").then((function(e){return e.json()})).then((function(t){return e.setState({dailySolvers:t.solvers})})).catch((function(t){e.setState({currentSudoku:null})}))}},{key:"solved",value:function(e){e?alert("Congratulation! You have solved the sudoku!"):alert("Whoop! You did not solved it correctly. :(")}},{key:"renderDailySolversSolvers",value:function(){var e=this.state.rowsInSolversTable;e>this.state.dailySolvers.length&&(e=this.state.dailySolvers.length);for(var t=[],a=0;a<e;a++){var n=this.state.dailySolvers[a];t.push(l.a.createElement("tr",null,l.a.createElement("td",null,a+1),l.a.createElement("td",null,n.name),l.a.createElement("td",null,n.time)))}return[l.a.createElement("table",{className:"daily-solvers-table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"Name"),l.a.createElement("th",null,"Time"))),l.a.createElement("tbody",null,t))]}},{key:"renderErrPage",value:function(){return[l.a.createElement("h1",{className:"err-msg"},"Oops! We seem to be having trouble with the server ",l.a.createElement("span",{style:{whiteSpace:"nowrap"}},":(")),l.a.createElement(b,{class:"play_btn",link:"/"},"Go Back to Main Page")]}},{key:"renderNoErrPage",value:function(){var e=this;return[this.renderSudokuSection(),l.a.createElement(h,{alignItems:"center"},l.a.createElement(k,{title:"Try daily sudoku!",img:a(66),img_align_mobile:"top"},l.a.createElement("p",null,"Curabitur ornare eros ultrices arcu blandit, at vestibulum velit pellentesque. Sed maximus dolor non sapien tristique faucibus. Duis lorem quam, vulputate vehicula lacus vel, commodo fringilla eros. "),l.a.createElement("p",null,"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras volutpat, quam in condimentum finibus."),l.a.createElement(b,{onClick:function(){e.getDailySudoku()},margin:"10px 10px 10px 0"},"Try Daily Sudoku"),this.renderDailySolversSolvers()))]}},{key:"renderSudokuSection",value:function(){var e=this;return[this.state.dailySudoku?l.a.createElement("h1",null,"Daily Sudoku"):"",l.a.createElement("p",{className:"stopwatch"},this.state.minutes,":",this.state.seconds),l.a.createElement("table",{className:"sudoku-table"},l.a.createElement("tbody",null,this.renderSudoku())),l.a.createElement("div",{className:"value-buttons"},null!==this.state.currentSudoku?this.getPossibleValuesElements():""),l.a.createElement("div",{className:"btn-section"},l.a.createElement(b,{class:"play_btn",onClick:function(){e.resetSudoku()}},"Reset Sudoku"),l.a.createElement(b,{class:"play_btn",onClick:function(){e.checkSudoku()}},"Check the Sudoku"),l.a.createElement(b,{class:"play_btn",onClick:function(){e.getSudoku()}},"Get New Sudoku"),l.a.createElement(b,{onClick:function(){e.changeMode()},class:this.state.noting?"noting play_btn":"play_btn"},"Change Mode"))]}},{key:"render",value:function(){return l.a.createElement("div",{className:"play-container ".concat(null!==this.state.currentSudoku?"no-err":"err")},null!==this.state.currentSudoku?this.renderNoErrPage():this.renderErrPage())}}]),n}(l.a.Component)),O=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={navActive:!1},n}return Object(c.a)(a,[{key:"toggleNavActive",value:function(){this.setState({navActive:!this.state.navActive}),console.log(this.state.navActive)}},{key:"render",value:function(){var e=this;return l.a.createElement(m.a,null,l.a.createElement("div",{className:"App"},l.a.createElement("nav",{className:this.state.navActive?"navActive":"",onClick:function(){e.toggleNavActive()}},l.a.createElement("span",{class:"navbar-toggle",onClick:function(){e.toggleNavActive()},style:"/"!==window.location.pathname?{color:"#8a8a8a"}:{color:"white"}},l.a.createElement("i",{class:"fa fa-bars"})),l.a.createElement("div",Object.assign({className:"elements ".concat(this.state.navActive?"active":"")},"/"===window.location.pathname&&{style:{color:"white"}}),l.a.createElement("a",{href:"/#"},"Home"),l.a.createElement("a",{href:"/#about"},"About"),l.a.createElement("a",{href:"/#rules"},"Rules"),l.a.createElement("a",{href:"/#levels"},"Play"),l.a.createElement("a",{href:"/#api"},"API"),l.a.createElement("div",{id:"indicator",style:"/"!==window.location.pathname?{backgroundColor:"black"}:{backgroundColor:"white"}}))),l.a.createElement(d.c,null,l.a.createElement(d.a,{path:"/",exact:!0,component:N}),l.a.createElement(d.a,{path:"/play/:level",component:C}))))}}]),a}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[38,1,2]]]);
//# sourceMappingURL=main.ecf4fc56.chunk.js.map
(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{109:function(e,t,n){e.exports=n(150)},114:function(e,t,n){},115:function(e,t,n){},150:function(e,t,n){"use strict";n.r(t);var a,c=n(0),o=n.n(c),r=n(9),l=n.n(r),i=(n(114),n(94)),s=n(72),u=n(21),m=n(20),d=(n(115),n(116),n(71)),h=n(12),v=function e(t){Object(h.a)(this,e),this.sheetMusic=void 0,this.sheetMusic=t},f=n(54),E=function(){function e(){Object(h.a)(this,e)}return Object(f.a)(e,null,[{key:"getRandomCollectionWithConstraint",value:function(e,t,n){for(var a=[];!n(a);){var c=g(e);t([].concat(a,[c]))&&a.push(c)}return a}},{key:"addRandomPropertyToRandomCollection",value:function(e,t,n,a){var c=[];return e.forEach((function(e){for(var o=!1;!o;){var r=g(t),l=a(e,r);n([].concat(c,[l]))&&(c.push(l),o=!0)}})),c}},{key:"shuffleArray",value:function(e,t){for(var n=e.length-1;n>0;n--)if(!t(e[n])){var a=Math.floor(Math.random()*(n+1));if(!t(e[a])){var c=[e[a],e[n]];e[n]=c[0],e[a]=c[1]}}}},{key:"randomNumberInRange",value:function(e,t){return Math.floor(Math.random()*(t-e+1)+e)}}]),e}(),g=function(e){return e[Math.floor(Math.random()*e.length)]},b=E;!function(e){e[e.notAccented=0]="notAccented",e[e.accented=1]="accented"}(a||(a={}));var k,p=a;!function(e){e[e.snare=0]="snare",e[e.kick=1]="kick",e[e.rest=2]="rest",e[e.none=3]="none"}(k||(k={}));var C,y=k;!function(e){e[e.None=0]="None",e[e.Right=1]="Right",e[e.Left=2]="Left"}(C||(C={}));var N,A=C;!function(e){e[e.none=0]="none",e[e.sixteenth=1]="sixteenth",e[e.eighth=2]="eighth",e[e.dottedEighth=3]="dottedEighth",e[e.quarter=4]="quarter",e[e.dottedQuarter=5]="dottedQuarter",e[e.half=6]="half"}(N||(N={}));var S,x=N,w=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y.rest,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:x.sixteenth,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:A.None,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:p.notAccented,o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];Object(h.a)(this,e),this.sticking=void 0,this.accent=void 0,this.noteType=void 0,this.duration=void 0,this.placedByUser=void 0,this.noteType=t,this.sticking=a,this.accent=c,this.duration=n,this.placedByUser=o},O=function e(t){Object(h.a)(this,e),this.notes=void 0,this.notes=[];var n=x.sixteenth;switch(t){case 16:n=x.sixteenth;break;case 8:n=x.eighth;break;case 4:n=x.quarter;break;case 2:n=x.half;break;default:throw new Error("Unsupported subdivision")}for(var a=0;a<t;a++)this.notes.push(new w(y.none,n))};!function(e){e[e.one=0]="one",e[e.oneE=1]="oneE",e[e.oneAnd=2]="oneAnd",e[e.oneA=3]="oneA",e[e.two=4]="two",e[e.twoE=5]="twoE",e[e.twoAnd=6]="twoAnd",e[e.twoA=7]="twoA",e[e.three=8]="three",e[e.threeE=9]="threeE",e[e.threeAnd=10]="threeAnd",e[e.threeA=11]="threeA",e[e.four=12]="four",e[e.fourE=13]="fourE",e[e.fourAnd=14]="fourAnd",e[e.fourA=15]="fourA"}(S||(S={}));var R=S,P=function e(){Object(h.a)(this,e)};P.configIsValid=function(e,t){var n=P.notePlacementsAreValid(e,t),a=P.maxConsecutiveNotesAreValid(e,t),c=P.noteCountsAreValid(e,t),o=P.notePlacementsDoNotExceedNoteCounts(e,t);return n&&a&&c&&o},P.noteCountsAreValid=function(e,t){var n=e.subdivision,a=!0,c=e.snareNoteCountEnabled?e.snareNoteCount:-1,o=e.kickNoteCountEnabled?e.kickNoteCount:-1,r=e.restNoteCountEnabled?e.restNoteCount:-1,l=e.accentNoteCountEnabled?e.accentNoteCount:-1;return-1===c&&-1===o&&-1===r&&-1===l&&(a=!0),0===c&&0===r&&0===o&&(t.push("All Note Counts set to zero. "),a=!1),(c>n||o>n||l>n||r>n)&&(t.push("One of your exact note counts is higher than your subdivision. "),a=!1),c>=0&&o>=0&&r>=0&&c+o+r!==n&&(t.push("You have all note types specified but they do not add up to your subdivision. "),a=!1),l>c&&-1!==c&&(t.push("You have more accents specified than snares, not all notes can be accented. "),a=!1),c+o+r<=n||(t.push("You have more notes specified than allowed in a measure per the subdivision. "),a=!1),a},P.maxConsecutiveNotesAreValid=function(e,t){var n=e.maxConsecutiveSnares,a=e.maxConsecutiveKicks,c=e.maxConsecutiveAccents,o=e.maxConsecutiveRests,r=e.maxConsecutiveLeftHandStickings,l=e.maxConsecutiveRightHandStickings;return 0!==n&&0!==a&&0!==c&&0!==o&&0!==r&&0!==l||(t.push("You cannot set maxConsecutive to 0. Use Note Count toggle to turn off a note type. "),!1)},P.notePlacementsAreValid=function(e,t){var n=e.mandatorySnarePlacements,a=e.mandatoryKickPlacements,c=e.mandatoryAccentPlacements,o=e.mandatoryRestPlacements,r=e.subdivision,l=!0;(n.length>r||a.length>r||c.length>r||o.length>r)&&(t.push("One of your mandatory notes placed is bigger than your subdivision allows. "),l=!1),n.length+a.length+o.length>r&&(t.push("You have more mandatory notes placed than your subdivision allows. "),l=!1);var i=new Set(n).size!==n.length,s=new Set(a).size!==a.length,u=new Set(c).size!==c.length,m=new Set(o).size!==o.length;(i||s||u||m)&&(t.push("One of your mandatory note placements has duplicates. "),l=!1);var d=n.filter((function(e){return a.includes(e)})),h=n.filter((function(e){return o.includes(e)})),v=a.filter((function(e){return n.includes(e)})),f=a.filter((function(e){return o.includes(e)})),E=o.filter((function(e){return n.includes(e)})),g=o.filter((function(e){return a.includes(e)}));return 0===d.length&&0===h.length&&0===v.length&&0===f.length&&0===E.length&&0===g.length||(t.push("Two note types have the same placement. "),l=!1),l},P.notePlacementsDoNotExceedNoteCounts=function(e,t){var n=e.mandatorySnarePlacements,a=e.mandatoryKickPlacements,c=e.mandatoryAccentPlacements,o=e.mandatoryRestPlacements,r=e.snareNoteCount,l=e.kickNoteCount,i=e.restNoteCount,s=e.accentNoteCount,u=n.length<=r||!e.snareNoteCountEnabled,m=a.length<=l||!e.kickNoteCountEnabled,d=c.length<=s||!e.accentNoteCountEnabled,h=o.length<=i||!e.restNoteCountEnabled;return!!(u&&m&&h&&d)||(t.push("If you have exact note count turned on, it must be higher than the number of exact placements you specify. "),!1)};var j=P,T=function e(){Object(h.a)(this,e)};T.generateNewSheetMusic=function(e){try{var t=I(e.header),n=U(e);if(Array.isArray(n))return n;M(n,e);var a=K(n);return"".concat(t).concat(a)}catch(c){return c.message}};var L,I=function(e){return"X:1\nT:".concat(e.title,"\nM:").concat(e.meter,"\nC:").concat(e.composer,"\nK:").concat(e.key,"\nL:").concat(e.translateLengthToFractionString(),"\n")},K=function(e){var t="";return e.notes.forEach((function(e,n){var a=n%4===0?" ":"";e.sticking===A.Left&&(a+='"L"'),e.sticking===A.Right&&(a+='"R"'),e.accent===p.accented&&(a+="!>!"),e.noteType===y.snare&&(a+="c"),e.noteType===y.kick&&(a+="f,"),e.noteType===y.rest&&(a+="z"),t+=a})),"|:".concat(t,":|")},M=function(e,t){if(t.mandatoryAccentPlacements.forEach((function(t){var n=e.notes[D(t)];n.noteType===y.snare&&(n.accent=p.accented)})),0===t.accentNoteCount)return e;var n=t.accentNoteCount-t.mandatoryAccentPlacements.length,a=e.notes.filter((function(e){return e.noteType===y.snare}));return n=n>a.length?a.length:n,t.accentNoteCountEnabled&&W(e,t,null,p.accented,null,H,n),e},z=function(e,t){var n=e.notes.find((function(e){return e.noteType===y.none}));if(!n)throw Error("No Unset Notes. Generation failure!");return n},H=function(e,t){for(var n=[];n.length<e.notes.length;){var a=b.randomNumberInRange(0,e.notes.length-1),c=e.notes[a];if(!n.includes(c))if(c.noteType!==y.rest&&c.noteType!==y.kick&&c.noteType!=y.none&&c.accent!==p.accented){if(c.accent=p.accented,G(e,t.maxConsecutiveAccents,(function(e){return e.accent===p.accented})))return c;c.accent=p.notAccented,n.push(c)}else n.push(c)}throw Error("No place to put your accent. Generation failure!")},B=function(e){return e.placedByUser},U=function(e){var t=[];if(!j.configIsValid(e,t))return t;var n=new O(e.subdivision);V(n,y.snare,e.mandatorySnarePlacements),V(n,y.kick,e.mandatoryKickPlacements),V(n,y.rest,e.mandatoryRestPlacements);var a=0;return e.snareNoteCountEnabled&&(a=e.snareNoteCount-e.mandatorySnarePlacements.length,W(n,e,y.snare,null,null,z,a)),e.kickNoteCountEnabled&&(a=e.kickNoteCount-e.mandatoryKickPlacements.length,W(n,e,y.kick,null,null,z,a)),e.restNoteCountEnabled&&(a=e.restNoteCount-e.mandatoryRestPlacements.length,W(n,e,y.rest,null,null,z,a)),b.shuffleArray(n.notes,B),n.notes.filter((function(e){return e.noteType===y.none})).forEach((function(t){for(var a=[],c=!1,o=function(){if(3===a.length)throw new Error("No where to place note. Generation failure!");var o=b.randomNumberInRange(0,2),r=0===o?y.snare:1===o?y.kick:y.rest;if(!a.includes(r)){t.noteType=r;var l=0;switch(r){case y.snare:if(e.snareNoteCountEnabled)return t.noteType=y.none,a.push(r),"continue";l=e.maxConsecutiveSnares;break;case y.kick:if(e.kickNoteCountEnabled)return t.noteType=y.none,a.push(r),"continue";l=e.maxConsecutiveKicks;break;case y.rest:if(e.restNoteCountEnabled)return t.noteType=y.none,a.push(r),"continue";l=e.maxConsecutiveRests}G(n,l,(function(e){return e.noteType===r}))?c=!0:(t.noteType=y.none,a.push(r))}};!c;)o()})),n},V=function(e,t,n){n.forEach((function(n){var a=D(n),c=e.notes[a];c.placedByUser=!0,c.noteType=t}))},W=function(e,t,n,a,c,o,r){for(var l=0;l<r;l++){var i=o(e,t);i.noteType=null==n?i.noteType:n,i.accent=null==a?i.accent:a,i.sticking=null==c?i.sticking:c}},D=function(e){switch(e){case R.one:return 0;case R.oneE:return 1;case R.oneAnd:return 2;case R.oneA:return 3;case R.two:return 4;case R.twoE:return 5;case R.twoAnd:return 6;case R.twoA:return 7;case R.three:return 8;case R.threeE:return 9;case R.threeAnd:return 10;case R.threeA:return 11;case R.four:return 12;case R.fourE:return 13;case R.fourAnd:return 14;case R.fourA:return 15}},G=function(e,t,n){var a=0,c=!0;return e.notes.forEach((function(e){n(e)?a+=1:a=0,a>t&&(c=!1)})),c},Y=T;!function(e){e[e.none=0]="none",e[e.naturalSticking=1]="naturalSticking",e[e.alternating=2]="alternating",e[e.random=3]="random"}(L||(L={}));var q=L,J=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:16,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:16,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:16,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:16,l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:16,i=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,s=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0,u=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,m=arguments.length>10&&void 0!==arguments[10]?arguments[10]:0,d=arguments.length>11&&void 0!==arguments[11]&&arguments[11],v=arguments.length>12&&void 0!==arguments[12]&&arguments[12],f=arguments.length>13&&void 0!==arguments[13]&&arguments[13],E=arguments.length>14&&void 0!==arguments[14]&&arguments[14],g=arguments.length>15&&void 0!==arguments[15]?arguments[15]:[],b=arguments.length>16&&void 0!==arguments[16]?arguments[16]:[],k=arguments.length>17&&void 0!==arguments[17]?arguments[17]:[],p=arguments.length>18&&void 0!==arguments[18]?arguments[18]:[],C=arguments.length>19&&void 0!==arguments[19]?arguments[19]:q.none;Object(h.a)(this,e),this.maxConsecutiveKicks=void 0,this.maxConsecutiveAccents=void 0,this.maxConsecutiveSnares=void 0,this.maxConsecutiveRests=void 0,this.maxConsecutiveLeftHandStickings=void 0,this.maxConsecutiveRightHandStickings=void 0,this.kickNoteCount=void 0,this.snareNoteCount=void 0,this.accentNoteCount=void 0,this.restNoteCount=void 0,this.kickNoteCountEnabled=void 0,this.snareNoteCountEnabled=void 0,this.accentNoteCountEnabled=void 0,this.restNoteCountEnabled=void 0,this.mandatoryKickPlacements=void 0,this.mandatorySnarePlacements=void 0,this.mandatoryAccentPlacements=void 0,this.mandatoryRestPlacements=void 0,this.stickingStyle=void 0,this.subdivision=void 0,this.header=void 0,this.header=t,this.maxConsecutiveKicks=n,this.maxConsecutiveAccents=a,this.maxConsecutiveSnares=c,this.maxConsecutiveRests=o,this.maxConsecutiveLeftHandStickings=r,this.maxConsecutiveRightHandStickings=l,this.kickNoteCount=i,this.snareNoteCount=s,this.accentNoteCount=u,this.restNoteCount=m,this.kickNoteCountEnabled=d,this.snareNoteCountEnabled=v,this.accentNoteCountEnabled=f,this.restNoteCountEnabled=E,this.mandatoryKickPlacements=g,this.mandatorySnarePlacements=b,this.mandatoryAccentPlacements=k,this.mandatoryRestPlacements=p,this.stickingStyle=C,this.subdivision=this.header.translateLengthToInt()},X=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"4/4",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Chongo Johngo",c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"C",o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:x.sixteenth;Object(h.a)(this,e),this.title=void 0,this.meter=void 0,this.composer=void 0,this.key=void 0,this.length=void 0,this.title=t,this.meter=n,this.composer=a,this.key=c,this.length=o}return Object(f.a)(e,[{key:"translateLengthToInt",value:function(){switch(this.length){case x.sixteenth:return 16;default:throw Error("Unsupported subdivision")}}},{key:"translateLengthToFractionString",value:function(){switch(this.length){case x.sixteenth:return"1/16";default:throw Error("Unsupported subdivision")}}}]),e}(),F=n(192),Q=n(194),$=n(152),Z=n(153),_=n(161),ee=n(209),te=n(196),ne=n(197),ae=n(154),ce=n(198),oe=n(96),re=n(206),le=n(190),ie=n(208);function se(e){var t=e.config,n=e.setConfig,a=e.selection,c=e.setSelection,r=e.mode,l=function(e,t,n){switch(e){case"snare":return"consecutive"===t?n.maxConsecutiveSnares.toString():n.snareNoteCount.toString();case"kick":return"consecutive"===t?n.maxConsecutiveKicks.toString():n.kickNoteCount.toString();case"rests":return"consecutive"===t?n.maxConsecutiveRests.toString():n.restNoteCount.toString();case"accents":return"consecutive"===t?n.maxConsecutiveAccents.toString():n.accentNoteCount.toString()}}(a,r,t),i=!1;switch(a){case"snare":i=t.snareNoteCountEnabled;break;case"kick":i=t.kickNoteCountEnabled;break;case"accents":i=t.accentNoteCountEnabled;break;case"rests":i=t.restNoteCountEnabled}var s=Object(le.a)((function(e){return Object(ie.a)({root:{display:"flex",flexDirection:"column",alignItems:"center","& > *":{margin:e.spacing(1)}},formControl:{margin:e.spacing(1),minWidth:120},cardRoot:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}})}))();return o.a.createElement(F.a,{className:s.cardRoot},o.a.createElement(Q.a,null,o.a.createElement($.a,{className:s.formControl},o.a.createElement(Z.a,{id:"demo-simple-select-label"},"Hit Type"),o.a.createElement(_.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:a,onChange:function(e){c(e.target.value)}},o.a.createElement(ee.a,{value:"snare"},"Snare"),o.a.createElement(ee.a,{value:"kick"},"Kick"),o.a.createElement(ee.a,{value:"rests"},"Rests"),o.a.createElement(ee.a,{value:"accents"},"Accents")),"consecutive"!==r&&o.a.createElement(te.a,{label:"Enable",control:o.a.createElement(ne.a,{checked:i,onChange:function(e){switch(a){case"snare":t.snareNoteCountEnabled=e.target.checked;break;case"kick":t.kickNoteCountEnabled=e.target.checked;break;case"accents":t.accentNoteCountEnabled=e.target.checked;break;case"rests":t.restNoteCountEnabled=e.target.checked}var c=Object(u.a)(Object(u.a)({},t),{},{header:t.header});n(c)},name:"enable"})})),o.a.createElement($.a,{component:"fieldset"},"consecutive"===r&&o.a.createElement(ae.a,{component:"legend"},"Maximum Number of Consecutive Hits Allowed"),"consecutive"!==r&&o.a.createElement(ae.a,{component:"legend"},"Exact Number of Hits Allowed"),o.a.createElement(ce.a,{"aria-label":"gender",name:"gender1",value:l,onChange:function(e){!function(e,t,n,a){switch(t){case"snare":"consecutive"===n?a.maxConsecutiveSnares=e:a.snareNoteCount=e;break;case"kick":"consecutive"===n?a.maxConsecutiveKicks=e:a.kickNoteCount=e;break;case"rests":"consecutive"===n?a.maxConsecutiveRests=e:a.restNoteCount=e;break;case"accents":"consecutive"===n?a.maxConsecutiveAccents=e:a.accentNoteCount=e}}(parseInt(e.target.value),a,r,t);var c=Object(u.a)(Object(u.a)({},t),{},{header:t.header});n(c)}},o.a.createElement(oe.a,null,"consecutive"!==r&&o.a.createElement(te.a,{value:"0",control:o.a.createElement(re.a,null),label:"0"}),o.a.createElement(te.a,{value:"1",control:o.a.createElement(re.a,null),label:"1"}),o.a.createElement(te.a,{value:"2",control:o.a.createElement(re.a,null),label:"2"}),o.a.createElement(te.a,{value:"3",control:o.a.createElement(re.a,null),label:"3"}),o.a.createElement(te.a,{value:"4",control:o.a.createElement(re.a,null),label:"4"})),o.a.createElement(oe.a,null,o.a.createElement(te.a,{value:"5",control:o.a.createElement(re.a,null),label:"5"}),o.a.createElement(te.a,{value:"6",control:o.a.createElement(re.a,null),label:"6"}),o.a.createElement(te.a,{value:"7",control:o.a.createElement(re.a,null),label:"7"}),o.a.createElement(te.a,{value:"8",control:o.a.createElement(re.a,null),label:"8"})),o.a.createElement(oe.a,null,o.a.createElement(te.a,{value:"9",control:o.a.createElement(re.a,null),label:"9"}),o.a.createElement(te.a,{value:"10",control:o.a.createElement(re.a,null),label:"10"}),o.a.createElement(te.a,{value:"11",control:o.a.createElement(re.a,null),label:"11"}),o.a.createElement(te.a,{value:"12",control:o.a.createElement(re.a,null),label:"12"})),o.a.createElement(oe.a,null,o.a.createElement(te.a,{value:"13",control:o.a.createElement(re.a,null),label:"13"}),o.a.createElement(te.a,{value:"14",control:o.a.createElement(re.a,null),label:"14"}),o.a.createElement(te.a,{value:"15",control:o.a.createElement(re.a,null),label:"15"}),o.a.createElement(te.a,{value:"16",control:o.a.createElement(re.a,null),label:"16"}))))))}var ue=n(204),me=n(157),de=n(200),he=n(205),ve=n(201),fe=n(202),Ee=n(203),ge=n(210),be=n(199),ke=n(158),pe=n(159);function Ce(e){var t=e.selection,n=e.setSelection,a=e.config,c=e.setConfig,r=function(e,t,n){switch(e){case"snare":return null!=n.mandatorySnarePlacements.find((function(e){return e===t}));case"kick":return null!=n.mandatoryKickPlacements.find((function(e){return e===t}));case"rests":return null!=n.mandatoryRestPlacements.find((function(e){return e===t}));case"accents":return null!=n.mandatoryAccentPlacements.find((function(e){return e===t}))}return!1},l=Object(le.a)((function(e){return Object(ie.a)({root:{display:"flex",flexDirection:"column",alignItems:"center","& > *":{margin:e.spacing(1)}},formControl:{margin:e.spacing(1),minWidth:120},cardRoot:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}})}))(),i=function(e){var n=parseInt(R[e.target.name]);e.target.checked?function(e,t,n){switch(t){case"snare":n.mandatorySnarePlacements.includes(e)||n.mandatorySnarePlacements.push(e);break;case"kick":n.mandatoryKickPlacements.includes(e)||n.mandatoryKickPlacements.push(e);break;case"rests":n.mandatoryRestPlacements.includes(e)||n.mandatoryRestPlacements.push(e);break;case"accents":n.mandatoryAccentPlacements.includes(e)||n.mandatoryAccentPlacements.push(e)}}(n,t,a):function(e,t,n){var a=0;switch(t){case"snare":a=n.mandatorySnarePlacements.findIndex((function(t){return t===e})),n.mandatorySnarePlacements.splice(a,1);break;case"kick":a=n.mandatoryKickPlacements.findIndex((function(t){return t===e})),n.mandatoryKickPlacements.splice(a,1);break;case"rests":a=n.mandatoryRestPlacements.findIndex((function(t){return t===e})),n.mandatoryRestPlacements.splice(a,1);break;case"accents":a=n.mandatoryAccentPlacements.findIndex((function(t){return t===e})),n.mandatoryAccentPlacements.splice(a,1)}}(n,t,a);var o=Object(u.a)(Object(u.a)({},a),{},{header:a.header});c(o)};return o.a.createElement(F.a,{className:l.cardRoot},o.a.createElement(Q.a,null,o.a.createElement($.a,{className:l.formControl},o.a.createElement(Z.a,{id:"demo-simple-select-label"},"Hit Type"),o.a.createElement(_.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:t,onChange:function(e){n(e.target.value)}},o.a.createElement(ee.a,{value:"snare"},"Snare"),o.a.createElement(ee.a,{value:"kick"},"Kick"),o.a.createElement(ee.a,{value:"rests"},"Rests"),o.a.createElement(ee.a,{value:"accents"},"Accents"))),o.a.createElement($.a,{component:"fieldset"},o.a.createElement(ae.a,{component:"legend"}),o.a.createElement(ke.a,null,o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.one,a),onChange:i,name:"one"}),label:"1"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.oneE,a),onChange:i,name:"oneE"}),label:"1E"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.oneAnd,a),onChange:i,name:"oneAnd"}),label:"1&"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.oneA,a),onChange:i,name:"oneA"}),label:"1A"})),o.a.createElement(pe.a,null,"chongo")),o.a.createElement($.a,{component:"fieldset"},o.a.createElement(ae.a,{component:"legend"}),o.a.createElement(ke.a,null,o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.two,a),onChange:i,name:"two"}),label:"2"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.twoE,a),onChange:i,name:"twoE"}),label:"2E"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.twoAnd,a),onChange:i,name:"twoAnd"}),label:"2&"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.twoA,a),onChange:i,name:"twoA"}),label:"2A"})),o.a.createElement(pe.a,null,"chongo")),o.a.createElement($.a,{component:"fieldset"},o.a.createElement(ae.a,{component:"legend"}),o.a.createElement(ke.a,null,o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.three,a),onChange:i,name:"three"}),label:"3"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.threeE,a),onChange:i,name:"threeE"}),label:"3E"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.threeAnd,a),onChange:i,name:"threeAnd"}),label:"3&"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.threeA,a),onChange:i,name:"threeA"}),label:"3A"})),o.a.createElement(pe.a,null,"chongo")),o.a.createElement($.a,{component:"fieldset"},o.a.createElement(ae.a,{component:"legend"}),o.a.createElement(ke.a,null,o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.four,a),onChange:i,name:"four"}),label:"4"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.fourE,a),onChange:i,name:"fourE"}),label:"4E"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.fourAnd,a),onChange:i,name:"fourAnd"}),label:"4&"}),o.a.createElement(te.a,{control:o.a.createElement(ne.a,{checked:r(t,R.fourA,a),onChange:i,name:"fourA"}),label:"4A"})),o.a.createElement(pe.a,null,"chongo"))))}var ye=function(){var e=Object(c.useState)([new v('X:1\nT:Paradiddles\nM:4/4\nC:Trad.\nK:C\nL:1/16\n|:"R"c"L"c"R"c"R"c "L"c"R"c"L"c"L"c "R"c"L"c"R"c"R"c "L"c"R"c"L"c"L"c:|'),new v('X:1\nT:Doubles\nM:4/4\nC:Trad.\nK:C\nL:1/16\n|:"R"c"R"c"L"c"L"c "R"c"R"c"L"c"L"c "R"c"R"c"L"c"L"c "R"c"R"c"L"c"L"c:|')]),t=Object(m.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(),l=Object(m.a)(r,2),h=l[0],f=l[1],E=Object(c.useState)(1),g=Object(m.a)(E,2),b=g[0],k=g[1],p=Object(c.useState)(new J(new X("Super Dope Title ".concat(b)))),C=Object(m.a)(p,2),y=C[0],N=C[1],A=Object(c.useState)(0),S=Object(m.a)(A,2),x=S[0],w=S[1],O=Object(c.useState)("kick"),R=Object(m.a)(O,2),P=R[0],T=R[1],L=Object(c.useState)("kick"),I=Object(m.a)(L,2),K=I[0],M=I[1],z=Object(c.useState)("kick"),H=Object(m.a)(z,2),B=H[0],U=H[1],V=Object(c.useState)("none"),W=Object(m.a)(V,2),D=W[0],G=W[1],q=Object(c.useState)("Greatest Measure of All Time"),te=Object(m.a)(q,2),ne=te[0],ce=te[1],oe=Object(c.useState)([]),re=Object(m.a)(oe,2),ke=re[0],pe=re[1];Object(c.useEffect)((function(){y.header.title=ne;var e=Object(u.a)(Object(u.a)({},y),{},{header:y.header});N(e)}),[ne]),Object(c.useEffect)((function(){var e=[];j.configIsValid(y,e),pe(e)}),[y]);var ye=Object(le.a)((function(e){return Object(ie.a)({root:{display:"flex",flexDirection:"column",alignItems:"center","& > *":{margin:e.spacing(1)}},formControl:{margin:e.spacing(1),minWidth:120},cardRoot:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12},toolTip:{fontSize:20}})}))();function Ne(e){var t=e.children,n=e.value,a=e.index,c=Object(i.a)(e,["children","value","index"]);return o.a.createElement("div",Object.assign({role:"tabpanel",hidden:n!==a,id:"simple-tabpanel-".concat(a),"aria-labelledby":"simple-tab-".concat(a)},c),n===a&&o.a.createElement(ue.a,{p:3},o.a.createElement(me.a,null,t)))}function Ae(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}return o.a.createElement("div",{className:"App"},o.a.createElement("header",null),o.a.createElement("div",{className:"App-header"},"COOL DRUM BEAT GENERATION WEBSITE"),o.a.createElement(F.a,{className:ye.cardRoot},o.a.createElement(Q.a,null,n.map((function(e){return o.a.createElement(F.a,{className:ye.cardRoot},o.a.createElement(Q.a,null,o.a.createElement("div",null,o.a.createElement(d.a,{abcNotation:e.sheetMusic,parserParams:{},engraverParams:{responsive:"resize"},renderParams:{viewportHorizontal:!0}}),o.a.createElement(be.a,{variant:"contained",color:"secondary",onClick:function(){var t=n.indexOf(e),c=Object(s.a)(n);c.splice(t,1),a(c)}},"Delete"))))})))),h&&o.a.createElement(F.a,{className:ye.cardRoot},o.a.createElement(Q.a,null,o.a.createElement(d.a,{abcNotation:h.sheetMusic,parserParams:{},engraverParams:{responsive:"resize"},renderParams:{viewportHorizontal:!0}}))),o.a.createElement(de.a,{position:"static"},o.a.createElement(he.a,{value:x,onChange:function(e,t){w(t)},"aria-label":"simple tabs example"},o.a.createElement(ve.a,Object.assign({label:"Maximum Consecutive Number of Hit"},Ae(0))),o.a.createElement(ve.a,Object.assign({label:"Exact Number Of Each Hit Per Measure"},Ae(1))),o.a.createElement(ve.a,Object.assign({label:"Specify Specific Note Placements"},Ae(2))),o.a.createElement(ve.a,Object.assign({label:"Sticking Style"},Ae(3))))),o.a.createElement(Ne,{value:x,index:0},o.a.createElement(se,{mode:"consecutive",selection:P,setSelection:T,config:y,setConfig:N})),o.a.createElement(Ne,{value:x,index:1},o.a.createElement(se,{mode:"noteCount",selection:K,setSelection:M,config:y,setConfig:N})),o.a.createElement(Ne,{value:x,index:2},o.a.createElement(Ce,{selection:B,setSelection:U,config:y,setConfig:N})),o.a.createElement(Ne,{value:x,index:3},o.a.createElement(F.a,{className:ye.cardRoot},o.a.createElement(Q.a,null,o.a.createElement($.a,{className:ye.formControl},o.a.createElement(Z.a,{id:"demo-simple-select-label"},"Sticking Pattern"),o.a.createElement(_.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:D,onChange:function(e){G(e.target.value)}},o.a.createElement(ee.a,{value:"none"},"None"),o.a.createElement(ee.a,{value:"natural"},"Natural"),o.a.createElement(ee.a,{value:"alternating"},"Alternating"),o.a.createElement(ee.a,{value:"random"},"Random")))))),o.a.createElement(F.a,{className:ye.cardRoot},o.a.createElement(Q.a,null,o.a.createElement($.a,{component:"fieldset"},o.a.createElement(ae.a,{component:"legend"},"Generation Controls"),o.a.createElement(fe.a,{value:ne,onChange:function(e){ce(e.target.value)},id:"standard-basic",label:"Pattern Name"}),o.a.createElement(Ee.a,null,o.a.createElement(ge.a,{title:o.a.createElement("span",{style:{fontSize:"18px"}},ke)},o.a.createElement("span",{style:{cursor:"not-allowed"}},o.a.createElement(be.a,{disabled:ke.length>0,variant:"contained",onClick:function(){var e=Y.generateNewSheetMusic(y);if(Array.isArray(e))pe(e);else{var t=new v(e);f(t)}}},"Generate Measure"))),o.a.createElement(be.a,{variant:"contained",color:"primary",onClick:function(){h&&(a([].concat(Object(s.a)(n),[h])),k(b+1))}},"SAVE"))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(ye,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[109,1,2]]]);
//# sourceMappingURL=main.62acaafd.chunk.js.map
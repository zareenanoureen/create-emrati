/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?module.exports=t():'function'==typeof define&&define.amd?define(t):e.Popper=t()})(this,function(){'use strict';function e(e){return e&&'[object Function]'==={}.toString.call(e)}function t(e,t){if(1!==e.nodeType)return[];var o=getComputedStyle(e,null);return t?o[t]:o}function o(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function n(e){if(!e)return document.body;switch(e.nodeName){case'HTML':case'BODY':return e.ownerDocument.body;case'#document':return e.body;}var i=t(e),r=i.overflow,p=i.overflowX,s=i.overflowY;return /(auto|scroll)/.test(r+s+p)?e:n(o(e))}function r(e){var o=e&&e.offsetParent,i=o&&o.nodeName;return i&&'BODY'!==i&&'HTML'!==i?-1!==['TD','TABLE'].indexOf(o.nodeName)&&'static'===t(o,'position')?r(o):o:e?e.ownerDocument.documentElement:document.documentElement}function p(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||r(e.firstElementChild)===e)}function s(e){return null===e.parentNode?e:s(e.parentNode)}function d(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,i=o?e:t,n=o?t:e,a=document.createRange();a.setStart(i,0),a.setEnd(n,0);var l=a.commonAncestorContainer;if(e!==l&&t!==l||i.contains(n))return p(l)?l:r(l);var f=s(e);return f.host?d(f.host,t):d(e,s(t).host)}function a(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'top',o='top'===t?'scrollTop':'scrollLeft',i=e.nodeName;if('BODY'===i||'HTML'===i){var n=e.ownerDocument.documentElement,r=e.ownerDocument.scrollingElement||n;return r[o]}return e[o]}function l(e,t){var o=2<arguments.length&&void 0!==arguments[2]&&arguments[2],i=a(t,'top'),n=a(t,'left'),r=o?-1:1;return e.top+=i*r,e.bottom+=i*r,e.left+=n*r,e.right+=n*r,e}function f(e,t){var o='x'===t?'Left':'Top',i='Left'==o?'Right':'Bottom';return parseFloat(e['border'+o+'Width'],10)+parseFloat(e['border'+i+'Width'],10)}function m(e,t,o,i){return J(t['offset'+e],t['scroll'+e],o['client'+e],o['offset'+e],o['scroll'+e],ie()?o['offset'+e]+i['margin'+('Height'===e?'Top':'Left')]+i['margin'+('Height'===e?'Bottom':'Right')]:0)}function h(){var e=document.body,t=document.documentElement,o=ie()&&getComputedStyle(t);return{height:m('Height',e,t,o),width:m('Width',e,t,o)}}function c(e){return se({},e,{right:e.left+e.width,bottom:e.top+e.height})}function g(e){var o={};if(ie())try{o=e.getBoundingClientRect();var i=a(e,'top'),n=a(e,'left');o.top+=i,o.left+=n,o.bottom+=i,o.right+=n}catch(e){}else o=e.getBoundingClientRect();var r={left:o.left,top:o.top,width:o.right-o.left,height:o.bottom-o.top},p='HTML'===e.nodeName?h():{},s=p.width||e.clientWidth||r.right-r.left,d=p.height||e.clientHeight||r.bottom-r.top,l=e.offsetWidth-s,m=e.offsetHeight-d;if(l||m){var g=t(e);l-=f(g,'x'),m-=f(g,'y'),r.width-=l,r.height-=m}return c(r)}function u(e,o){var i=ie(),r='HTML'===o.nodeName,p=g(e),s=g(o),d=n(e),a=t(o),f=parseFloat(a.borderTopWidth,10),m=parseFloat(a.borderLeftWidth,10),h=c({top:p.top-s.top-f,left:p.left-s.left-m,width:p.width,height:p.height});if(h.marginTop=0,h.marginLeft=0,!i&&r){var u=parseFloat(a.marginTop,10),b=parseFloat(a.marginLeft,10);h.top-=f-u,h.bottom-=f-u,h.left-=m-b,h.right-=m-b,h.marginTop=u,h.marginLeft=b}return(i?o.contains(d):o===d&&'BODY'!==d.nodeName)&&(h=l(h,o)),h}function b(e){var t=e.ownerDocument.documentElement,o=u(e,t),i=J(t.clientWidth,window.innerWidth||0),n=J(t.clientHeight,window.innerHeight||0),r=a(t),p=a(t,'left'),s={top:r-o.top+o.marginTop,left:p-o.left+o.marginLeft,width:i,height:n};return c(s)}function w(e){var i=e.nodeName;return'BODY'===i||'HTML'===i?!1:'fixed'===t(e,'position')||w(o(e))}function y(e,t,i,r){var p={top:0,left:0},s=d(e,t);if('viewport'===r)p=b(s);else{var a;'scrollParent'===r?(a=n(o(t)),'BODY'===a.nodeName&&(a=e.ownerDocument.documentElement)):'window'===r?a=e.ownerDocument.documentElement:a=r;var l=u(a,s);if('HTML'===a.nodeName&&!w(s)){var f=h(),m=f.height,c=f.width;p.top+=l.top-l.marginTop,p.bottom=m+l.top,p.left+=l.left-l.marginLeft,p.right=c+l.left}else p=l}return p.left+=i,p.top+=i,p.right-=i,p.bottom-=i,p}function E(e){var t=e.width,o=e.height;return t*o}function v(e,t,o,i,n){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var p=y(o,i,r,n),s={top:{width:p.width,height:t.top-p.top},right:{width:p.right-t.right,height:p.height},bottom:{width:p.width,height:p.bottom-t.bottom},left:{width:t.left-p.left,height:p.height}},d=Object.keys(s).map(function(e){return se({key:e},s[e],{area:E(s[e])})}).sort(function(e,t){return t.area-e.area}),a=d.filter(function(e){var t=e.width,i=e.height;return t>=o.clientWidth&&i>=o.clientHeight}),l=0<a.length?a[0].key:d[0].key,f=e.split('-')[1];return l+(f?'-'+f:'')}function O(e,t,o){var i=d(t,o);return u(o,i)}function L(e){var t=getComputedStyle(e),o=parseFloat(t.marginTop)+parseFloat(t.marginBottom),i=parseFloat(t.marginLeft)+parseFloat(t.marginRight),n={width:e.offsetWidth+i,height:e.offsetHeight+o};return n}function x(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function S(e,t,o){o=o.split('-')[0];var i=L(e),n={width:i.width,height:i.height},r=-1!==['right','left'].indexOf(o),p=r?'top':'left',s=r?'left':'top',d=r?'height':'width',a=r?'width':'height';return n[p]=t[p]+t[d]/2-i[d]/2,n[s]=o===s?t[s]-i[a]:t[x(s)],n}function T(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function D(e,t,o){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===o});var i=T(e,function(e){return e[t]===o});return e.indexOf(i)}function C(t,o,i){var n=void 0===i?t:t.slice(0,D(t,'name',i));return n.forEach(function(t){t['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var i=t['function']||t.fn;t.enabled&&e(i)&&(o.offsets.popper=c(o.offsets.popper),o.offsets.reference=c(o.offsets.reference),o=i(o,t))}),o}function N(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=O(this.state,this.popper,this.reference),e.placement=v(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=S(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position='absolute',e=C(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function k(e,t){return e.some(function(e){var o=e.name,i=e.enabled;return i&&o===t})}function W(e){for(var t=[!1,'ms','Webkit','Moz','O'],o=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length-1;n++){var i=t[n],r=i?''+i+o:e;if('undefined'!=typeof document.body.style[r])return r}return null}function P(){return this.state.isDestroyed=!0,k(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.left='',this.popper.style.position='',this.popper.style.top='',this.popper.style[W('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function B(e){var t=e.ownerDocument;return t?t.defaultView:window}function H(e,t,o,i){var r='BODY'===e.nodeName,p=r?e.ownerDocument.defaultView:e;p.addEventListener(t,o,{passive:!0}),r||H(n(p.parentNode),t,o,i),i.push(p)}function A(e,t,o,i){o.updateBound=i,B(e).addEventListener('resize',o.updateBound,{passive:!0});var r=n(e);return H(r,'scroll',o.updateBound,o.scrollParents),o.scrollElement=r,o.eventsEnabled=!0,o}function I(){this.state.eventsEnabled||(this.state=A(this.reference,this.options,this.state,this.scheduleUpdate))}function M(e,t){return B(e).removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function R(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=M(this.reference,this.state))}function U(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function Y(e,t){Object.keys(t).forEach(function(o){var i='';-1!==['width','height','top','right','bottom','left'].indexOf(o)&&U(t[o])&&(i='px'),e.style[o]=t[o]+i})}function j(e,t){Object.keys(t).forEach(function(o){var i=t[o];!1===i?e.removeAttribute(o):e.setAttribute(o,t[o])})}function F(e,t,o){var i=T(e,function(e){var o=e.name;return o===t}),n=!!i&&e.some(function(e){return e.name===o&&e.enabled&&e.order<i.order});if(!n){var r='`'+t+'`';console.warn('`'+o+'`'+' modifier is required by '+r+' modifier in order to work, be sure to include it before '+r+'!')}return n}function K(e){return'end'===e?'start':'start'===e?'end':e}function q(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=ae.indexOf(e),i=ae.slice(o+1).concat(ae.slice(0,o));return t?i.reverse():i}function V(e,t,o,i){var n=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+n[1],p=n[2];if(!r)return e;if(0===p.indexOf('%')){var s;switch(p){case'%p':s=o;break;case'%':case'%r':default:s=i;}var d=c(s);return d[t]/100*r}if('vh'===p||'vw'===p){var a;return a='vh'===p?J(document.documentElement.clientHeight,window.innerHeight||0):J(document.documentElement.clientWidth,window.innerWidth||0),a/100*r}return r}function z(e,t,o,i){var n=[0,0],r=-1!==['right','left'].indexOf(i),p=e.split(/(\+|\-)/).map(function(e){return e.trim()}),s=p.indexOf(T(p,function(e){return-1!==e.search(/,|\s/)}));p[s]&&-1===p[s].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var d=/\s*,\s*|\s+/,a=-1===s?[p]:[p.slice(0,s).concat([p[s].split(d)[0]]),[p[s].split(d)[1]].concat(p.slice(s+1))];return a=a.map(function(e,i){var n=(1===i?!r:r)?'height':'width',p=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,p=!0,e):p?(e[e.length-1]+=t,p=!1,e):e.concat(t)},[]).map(function(e){return V(e,n,t,o)})}),a.forEach(function(e,t){e.forEach(function(o,i){U(o)&&(n[t]+=o*('-'===e[i-1]?-1:1))})}),n}function G(e,t){var o,i=t.offset,n=e.placement,r=e.offsets,p=r.popper,s=r.reference,d=n.split('-')[0];return o=U(+i)?[+i,0]:z(i,p,s,d),'left'===d?(p.top+=o[0],p.left-=o[1]):'right'===d?(p.top+=o[0],p.left+=o[1]):'top'===d?(p.left+=o[0],p.top-=o[1]):'bottom'===d&&(p.left+=o[0],p.top+=o[1]),e.popper=p,e}for(var _=Math.min,X=Math.floor,J=Math.max,Q='undefined'!=typeof window&&'undefined'!=typeof document,Z=['Edge','Trident','Firefox'],$=0,ee=0;ee<Z.length;ee+=1)if(Q&&0<=navigator.userAgent.indexOf(Z[ee])){$=1;break}var i,te=Q&&window.Promise,oe=te?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},$))}},ie=function(){return void 0==i&&(i=-1!==navigator.appVersion.indexOf('MSIE 10')),i},ne=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},re=function(){function e(e,t){for(var o,n=0;n<t.length;n++)o=t[n],o.enumerable=o.enumerable||!1,o.configurable=!0,'value'in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),pe=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},se=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var i in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},de=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],ae=de.slice(3),le={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},fe=function(){function t(o,i){var n=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};ne(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=oe(this.update.bind(this)),this.options=se({},t.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=o&&o.jquery?o[0]:o,this.popper=i&&i.jquery?i[0]:i,this.options.modifiers={},Object.keys(se({},t.Defaults.modifiers,r.modifiers)).forEach(function(e){n.options.modifiers[e]=se({},t.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return se({name:e},n.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(t){t.enabled&&e(t.onLoad)&&t.onLoad(n.reference,n.popper,n.options,t,n.state)}),this.update();var p=this.options.eventsEnabled;p&&this.enableEventListeners(),this.state.eventsEnabled=p}return re(t,[{key:'update',value:function(){return N.call(this)}},{key:'destroy',value:function(){return P.call(this)}},{key:'enableEventListeners',value:function(){return I.call(this)}},{key:'disableEventListeners',value:function(){return R.call(this)}}]),t}();return fe.Utils=('undefined'==typeof window?global:window).PopperUtils,fe.placements=de,fe.Defaults={placement:'bottom',eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,o=t.split('-')[0],i=t.split('-')[1];if(i){var n=e.offsets,r=n.reference,p=n.popper,s=-1!==['bottom','top'].indexOf(o),d=s?'left':'top',a=s?'width':'height',l={start:pe({},d,r[d]),end:pe({},d,r[d]+r[a]-p[a])};e.offsets.popper=se({},p,l[i])}return e}},offset:{order:200,enabled:!0,fn:G,offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var o=t.boundariesElement||r(e.instance.popper);e.instance.reference===o&&(o=r(o));var i=y(e.instance.popper,e.instance.reference,t.padding,o);t.boundaries=i;var n=t.priority,p=e.offsets.popper,s={primary:function(e){var o=p[e];return p[e]<i[e]&&!t.escapeWithReference&&(o=J(p[e],i[e])),pe({},e,o)},secondary:function(e){var o='right'===e?'left':'top',n=p[o];return p[e]>i[e]&&!t.escapeWithReference&&(n=_(p[o],i[e]-('right'===e?p.width:p.height))),pe({},o,n)}};return n.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';p=se({},p,s[t](e))}),e.offsets.popper=p,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,o=t.popper,i=t.reference,n=e.placement.split('-')[0],r=X,p=-1!==['top','bottom'].indexOf(n),s=p?'right':'bottom',d=p?'left':'top',a=p?'width':'height';return o[s]<r(i[d])&&(e.offsets.popper[d]=r(i[d])-o[a]),o[d]>r(i[s])&&(e.offsets.popper[d]=r(i[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,o){var i;if(!F(e.instance.modifiers,'arrow','keepTogether'))return e;var n=o.element;if('string'==typeof n){if(n=e.instance.popper.querySelector(n),!n)return e;}else if(!e.instance.popper.contains(n))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var r=e.placement.split('-')[0],p=e.offsets,s=p.popper,d=p.reference,a=-1!==['left','right'].indexOf(r),l=a?'height':'width',f=a?'Top':'Left',m=f.toLowerCase(),h=a?'left':'top',g=a?'bottom':'right',u=L(n)[l];d[g]-u<s[m]&&(e.offsets.popper[m]-=s[m]-(d[g]-u)),d[m]+u>s[g]&&(e.offsets.popper[m]+=d[m]+u-s[g]),e.offsets.popper=c(e.offsets.popper);var b=d[m]+d[l]/2-u/2,w=t(e.instance.popper),y=parseFloat(w['margin'+f],10),E=parseFloat(w['border'+f+'Width'],10),v=b-e.offsets.popper[m]-y-E;return v=J(_(s[l]-u,v),0),e.arrowElement=n,e.offsets.arrow=(i={},pe(i,m,Math.round(v)),pe(i,h,''),i),e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(k(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var o=y(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement),i=e.placement.split('-')[0],n=x(i),r=e.placement.split('-')[1]||'',p=[];switch(t.behavior){case le.FLIP:p=[i,n];break;case le.CLOCKWISE:p=q(i);break;case le.COUNTERCLOCKWISE:p=q(i,!0);break;default:p=t.behavior;}return p.forEach(function(s,d){if(i!==s||p.length===d+1)return e;i=e.placement.split('-')[0],n=x(i);var a=e.offsets.popper,l=e.offsets.reference,f=X,m='left'===i&&f(a.right)>f(l.left)||'right'===i&&f(a.left)<f(l.right)||'top'===i&&f(a.bottom)>f(l.top)||'bottom'===i&&f(a.top)<f(l.bottom),h=f(a.left)<f(o.left),c=f(a.right)>f(o.right),g=f(a.top)<f(o.top),u=f(a.bottom)>f(o.bottom),b='left'===i&&h||'right'===i&&c||'top'===i&&g||'bottom'===i&&u,w=-1!==['top','bottom'].indexOf(i),y=!!t.flipVariations&&(w&&'start'===r&&h||w&&'end'===r&&c||!w&&'start'===r&&g||!w&&'end'===r&&u);(m||b||y)&&(e.flipped=!0,(m||b)&&(i=p[d+1]),y&&(r=K(r)),e.placement=i+(r?'-'+r:''),e.offsets.popper=se({},e.offsets.popper,S(e.instance.popper,e.offsets.reference,e.placement)),e=C(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,o=t.split('-')[0],i=e.offsets,n=i.popper,r=i.reference,p=-1!==['left','right'].indexOf(o),s=-1===['top','left'].indexOf(o);return n[p?'left':'top']=r[o]-(s?n[p?'width':'height']:0),e.placement=x(t),e.offsets.popper=c(n),e}},hide:{order:800,enabled:!0,fn:function(e){if(!F(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,o=T(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var o=t.x,i=t.y,n=e.offsets.popper,p=T(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==p&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var s,d,a=void 0===p?t.gpuAcceleration:p,l=r(e.instance.popper),f=g(l),m={position:n.position},h={left:X(n.left),top:X(n.top),bottom:X(n.bottom),right:X(n.right)},c='bottom'===o?'top':'bottom',u='right'===i?'left':'right',b=W('transform');if(d='bottom'==c?-f.height+h.bottom:h.top,s='right'==u?-f.width+h.right:h.left,a&&b)m[b]='translate3d('+s+'px, '+d+'px, 0)',m[c]=0,m[u]=0,m.willChange='transform';else{var w='bottom'==c?-1:1,y='right'==u?-1:1;m[c]=d*w,m[u]=s*y,m.willChange=c+', '+u}var E={"x-placement":e.placement};return e.attributes=se({},E,e.attributes),e.styles=se({},m,e.styles),e.arrowStyles=se({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return Y(e.instance.popper,e.styles),j(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&Y(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,o,i,n){var r=O(n,t,e),p=v(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',p),Y(t,{position:'absolute'}),o},gpuAcceleration:void 0}}},fe});

/*!
  * Bootstrap v4.0.0 (https://getbootstrap.com)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery"),require("popper.js")):"function"==typeof define&&define.amd?define(["exports","jquery","popper.js"],e):e(t.bootstrap={},t.jQuery,t.Popper)}(this,function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}e=e&&e.hasOwnProperty("default")?e.default:e,n=n&&n.hasOwnProperty("default")?n.default:n;var o,a,l,h,c,u,f,d,_,g,p,m,v,E,T,y,C,I,A,b,D,S,w,N,O,k,P=function(t){var e=!1;function n(e){var n=this,s=!1;return t(this).one(i.TRANSITION_END,function(){s=!0}),setTimeout(function(){s||i.triggerTransitionEnd(n)},e),this}var i={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(e){var n,i=e.getAttribute("data-target");i&&"#"!==i||(i=e.getAttribute("href")||""),"#"===i.charAt(0)&&(n=i,i=n="function"==typeof t.escapeSelector?t.escapeSelector(n).substr(1):n.replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1"));try{return t(document).find(i).length>0?i:null}catch(t){return null}},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(n){t(n).trigger(e.end)},supportsTransitionEnd:function(){return Boolean(e)},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var s in n)if(Object.prototype.hasOwnProperty.call(n,s)){var r=n[s],o=e[s],a=o&&i.isElement(o)?"element":(l=o,{}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());if(!new RegExp(r).test(a))throw new Error(t.toUpperCase()+': Option "'+s+'" provided type "'+a+'" but expected type "'+r+'".')}var l}};return e=("undefined"==typeof window||!window.QUnit)&&{end:"transitionend"},t.fn.emulateTransitionEnd=n,i.supportsTransitionEnd()&&(t.event.special[i.TRANSITION_END]={bindType:e.end,delegateType:e.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}),i}(e),L=(a="alert",h="."+(l="bs.alert"),c=(o=e).fn[a],u={CLOSE:"close"+h,CLOSED:"closed"+h,CLICK_DATA_API:"click"+h+".data-api"},f="alert",d="fade",_="show",g=function(){function t(t){this._element=t}var e=t.prototype;return e.close=function(t){t=t||this._element;var e=this._getRootElement(t);this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},e.dispose=function(){o.removeData(this._element,l),this._element=null},e._getRootElement=function(t){var e=P.getSelectorFromElement(t),n=!1;return e&&(n=o(e)[0]),n||(n=o(t).closest("."+f)[0]),n},e._triggerCloseEvent=function(t){var e=o.Event(u.CLOSE);return o(t).trigger(e),e},e._removeElement=function(t){var e=this;o(t).removeClass(_),P.supportsTransitionEnd()&&o(t).hasClass(d)?o(t).one(P.TRANSITION_END,function(n){return e._destroyElement(t,n)}).emulateTransitionEnd(150):this._destroyElement(t)},e._destroyElement=function(t){o(t).detach().trigger(u.CLOSED).remove()},t._jQueryInterface=function(e){return this.each(function(){var n=o(this),i=n.data(l);i||(i=new t(this),n.data(l,i)),"close"===e&&i[e](this)})},t._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},s(t,null,[{key:"VERSION",get:function(){return"4.0.0"}}]),t}(),o(document).on(u.CLICK_DATA_API,'[data-dismiss="alert"]',g._handleDismiss(new g)),o.fn[a]=g._jQueryInterface,o.fn[a].Constructor=g,o.fn[a].noConflict=function(){return o.fn[a]=c,g._jQueryInterface},g),R=(m="button",E="."+(v="bs.button"),T=".data-api",y=(p=e).fn[m],C="active",I="btn",A="focus",b='[data-toggle^="button"]',D='[data-toggle="buttons"]',S="input",w=".active",N=".btn",O={CLICK_DATA_API:"click"+E+T,FOCUS_BLUR_DATA_API:"focus"+E+T+" blur"+E+T},k=function(){function t(t){this._element=t}var e=t.prototype;return e.toggle=function(){var t=!0,e=!0,n=p(this._element).closest(D)[0];if(n){var i=p(this._element).find(S)[0];if(i){if("radio"===i.type)if(i.checked&&p(this._element).hasClass(C))t=!1;else{var s=p(n).find(w)[0];s&&p(s).removeClass(C)}if(t){if(i.hasAttribute("disabled")||n.hasAttribute("disabled")||i.classList.contains("disabled")||n.classList.contains("disabled"))return;i.checked=!p(this._element).hasClass(C),p(i).trigger("change")}i.focus(),e=!1}}e&&this._element.setAttribute("aria-pressed",!p(this._element).hasClass(C)),t&&p(this._element).toggleClass(C)},e.dispose=function(){p.removeData(this._element,v),this._element=null},t._jQueryInterface=function(e){return this.each(function(){var n=p(this).data(v);n||(n=new t(this),p(this).data(v,n)),"toggle"===e&&n[e]()})},s(t,null,[{key:"VERSION",get:function(){return"4.0.0"}}]),t}(),p(document).on(O.CLICK_DATA_API,b,function(t){t.preventDefault();var e=t.target;p(e).hasClass(I)||(e=p(e).closest(N)),k._jQueryInterface.call(p(e),"toggle")}).on(O.FOCUS_BLUR_DATA_API,b,function(t){var e=p(t.target).closest(N)[0];p(e).toggleClass(A,/^focus(in)?$/.test(t.type))}),p.fn[m]=k._jQueryInterface,p.fn[m].Constructor=k,p.fn[m].noConflict=function(){return p.fn[m]=y,k._jQueryInterface},k),j=function(t){var e="carousel",n="bs.carousel",i="."+n,o=t.fn[e],a={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},l={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},h="next",c="prev",u="left",f="right",d={SLIDE:"slide"+i,SLID:"slid"+i,KEYDOWN:"keydown"+i,MOUSEENTER:"mouseenter"+i,MOUSELEAVE:"mouseleave"+i,TOUCHEND:"touchend"+i,LOAD_DATA_API:"load"+i+".data-api",CLICK_DATA_API:"click"+i+".data-api"},_="carousel",g="active",p="slide",m="carousel-item-right",v="carousel-item-left",E="carousel-item-next",T="carousel-item-prev",y={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},C=function(){function o(e,n){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this._config=this._getConfig(n),this._element=t(e)[0],this._indicatorsElement=t(this._element).find(y.INDICATORS)[0],this._addEventListeners()}var C=o.prototype;return C.next=function(){this._isSliding||this._slide(h)},C.nextWhenVisible=function(){!document.hidden&&t(this._element).is(":visible")&&"hidden"!==t(this._element).css("visibility")&&this.next()},C.prev=function(){this._isSliding||this._slide(c)},C.pause=function(e){e||(this._isPaused=!0),t(this._element).find(y.NEXT_PREV)[0]&&P.supportsTransitionEnd()&&(P.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},C.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},C.to=function(e){var n=this;this._activeElement=t(this._element).find(y.ACTIVE_ITEM)[0];var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)t(this._element).one(d.SLID,function(){return n.to(e)});else{if(i===e)return this.pause(),void this.cycle();var s=e>i?h:c;this._slide(s,this._items[e])}},C.dispose=function(){t(this._element).off(i),t.removeData(this._element,n),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},C._getConfig=function(t){return t=r({},a,t),P.typeCheckConfig(e,t,l),t},C._addEventListeners=function(){var e=this;this._config.keyboard&&t(this._element).on(d.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&(t(this._element).on(d.MOUSEENTER,function(t){return e.pause(t)}).on(d.MOUSELEAVE,function(t){return e.cycle(t)}),"ontouchstart"in document.documentElement&&t(this._element).on(d.TOUCHEND,function(){e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout(function(t){return e.cycle(t)},500+e._config.interval)}))},C._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},C._getItemIndex=function(e){return this._items=t.makeArray(t(e).parent().find(y.ITEM)),this._items.indexOf(e)},C._getItemByDirection=function(t,e){var n=t===h,i=t===c,s=this._getItemIndex(e),r=this._items.length-1;if((i&&0===s||n&&s===r)&&!this._config.wrap)return e;var o=(s+(t===c?-1:1))%this._items.length;return-1===o?this._items[this._items.length-1]:this._items[o]},C._triggerSlideEvent=function(e,n){var i=this._getItemIndex(e),s=this._getItemIndex(t(this._element).find(y.ACTIVE_ITEM)[0]),r=t.Event(d.SLIDE,{relatedTarget:e,direction:n,from:s,to:i});return t(this._element).trigger(r),r},C._setActiveIndicatorElement=function(e){if(this._indicatorsElement){t(this._indicatorsElement).find(y.ACTIVE).removeClass(g);var n=this._indicatorsElement.children[this._getItemIndex(e)];n&&t(n).addClass(g)}},C._slide=function(e,n){var i,s,r,o=this,a=t(this._element).find(y.ACTIVE_ITEM)[0],l=this._getItemIndex(a),c=n||a&&this._getItemByDirection(e,a),_=this._getItemIndex(c),C=Boolean(this._interval);if(e===h?(i=v,s=E,r=u):(i=m,s=T,r=f),c&&t(c).hasClass(g))this._isSliding=!1;else if(!this._triggerSlideEvent(c,r).isDefaultPrevented()&&a&&c){this._isSliding=!0,C&&this.pause(),this._setActiveIndicatorElement(c);var I=t.Event(d.SLID,{relatedTarget:c,direction:r,from:l,to:_});P.supportsTransitionEnd()&&t(this._element).hasClass(p)?(t(c).addClass(s),P.reflow(c),t(a).addClass(i),t(c).addClass(i),t(a).one(P.TRANSITION_END,function(){t(c).removeClass(i+" "+s).addClass(g),t(a).removeClass(g+" "+s+" "+i),o._isSliding=!1,setTimeout(function(){return t(o._element).trigger(I)},0)}).emulateTransitionEnd(600)):(t(a).removeClass(g),t(c).addClass(g),this._isSliding=!1,t(this._element).trigger(I)),C&&this.cycle()}},o._jQueryInterface=function(e){return this.each(function(){var i=t(this).data(n),s=r({},a,t(this).data());"object"==typeof e&&(s=r({},s,e));var l="string"==typeof e?e:s.slide;if(i||(i=new o(this,s),t(this).data(n,i)),"number"==typeof e)i.to(e);else if("string"==typeof l){if("undefined"==typeof i[l])throw new TypeError('No method named "'+l+'"');i[l]()}else s.interval&&(i.pause(),i.cycle())})},o._dataApiClickHandler=function(e){var i=P.getSelectorFromElement(this);if(i){var s=t(i)[0];if(s&&t(s).hasClass(_)){var a=r({},t(s).data(),t(this).data()),l=this.getAttribute("data-slide-to");l&&(a.interval=!1),o._jQueryInterface.call(t(s),a),l&&t(s).data(n).to(l),e.preventDefault()}}},s(o,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return a}}]),o}();return t(document).on(d.CLICK_DATA_API,y.DATA_SLIDE,C._dataApiClickHandler),t(window).on(d.LOAD_DATA_API,function(){t(y.DATA_RIDE).each(function(){var e=t(this);C._jQueryInterface.call(e,e.data())})}),t.fn[e]=C._jQueryInterface,t.fn[e].Constructor=C,t.fn[e].noConflict=function(){return t.fn[e]=o,C._jQueryInterface},C}(e),H=function(t){var e="collapse",n="bs.collapse",i="."+n,o=t.fn[e],a={toggle:!0,parent:""},l={toggle:"boolean",parent:"(string|element)"},h={SHOW:"show"+i,SHOWN:"shown"+i,HIDE:"hide"+i,HIDDEN:"hidden"+i,CLICK_DATA_API:"click"+i+".data-api"},c="show",u="collapse",f="collapsing",d="collapsed",_="width",g="height",p={ACTIVES:".show, .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},m=function(){function i(e,n){this._isTransitioning=!1,this._element=e,this._config=this._getConfig(n),this._triggerArray=t.makeArray(t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'));for(var i=t(p.DATA_TOGGLE),s=0;s<i.length;s++){var r=i[s],o=P.getSelectorFromElement(r);null!==o&&t(o).filter(e).length>0&&(this._selector=o,this._triggerArray.push(r))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var o=i.prototype;return o.toggle=function(){t(this._element).hasClass(c)?this.hide():this.show()},o.show=function(){var e,s,r=this;if(!this._isTransitioning&&!t(this._element).hasClass(c)&&(this._parent&&0===(e=t.makeArray(t(this._parent).find(p.ACTIVES).filter('[data-parent="'+this._config.parent+'"]'))).length&&(e=null),!(e&&(s=t(e).not(this._selector).data(n))&&s._isTransitioning))){var o=t.Event(h.SHOW);if(t(this._element).trigger(o),!o.isDefaultPrevented()){e&&(i._jQueryInterface.call(t(e).not(this._selector),"hide"),s||t(e).data(n,null));var a=this._getDimension();t(this._element).removeClass(u).addClass(f),this._element.style[a]=0,this._triggerArray.length>0&&t(this._triggerArray).removeClass(d).attr("aria-expanded",!0),this.setTransitioning(!0);var l=function(){t(r._element).removeClass(f).addClass(u).addClass(c),r._element.style[a]="",r.setTransitioning(!1),t(r._element).trigger(h.SHOWN)};if(P.supportsTransitionEnd()){var _="scroll"+(a[0].toUpperCase()+a.slice(1));t(this._element).one(P.TRANSITION_END,l).emulateTransitionEnd(600),this._element.style[a]=this._element[_]+"px"}else l()}}},o.hide=function(){var e=this;if(!this._isTransitioning&&t(this._element).hasClass(c)){var n=t.Event(h.HIDE);if(t(this._element).trigger(n),!n.isDefaultPrevented()){var i=this._getDimension();if(this._element.style[i]=this._element.getBoundingClientRect()[i]+"px",P.reflow(this._element),t(this._element).addClass(f).removeClass(u).removeClass(c),this._triggerArray.length>0)for(var s=0;s<this._triggerArray.length;s++){var r=this._triggerArray[s],o=P.getSelectorFromElement(r);if(null!==o)t(o).hasClass(c)||t(r).addClass(d).attr("aria-expanded",!1)}this.setTransitioning(!0);var a=function(){e.setTransitioning(!1),t(e._element).removeClass(f).addClass(u).trigger(h.HIDDEN)};this._element.style[i]="",P.supportsTransitionEnd()?t(this._element).one(P.TRANSITION_END,a).emulateTransitionEnd(600):a()}}},o.setTransitioning=function(t){this._isTransitioning=t},o.dispose=function(){t.removeData(this._element,n),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},o._getConfig=function(t){return(t=r({},a,t)).toggle=Boolean(t.toggle),P.typeCheckConfig(e,t,l),t},o._getDimension=function(){return t(this._element).hasClass(_)?_:g},o._getParent=function(){var e=this,n=null;P.isElement(this._config.parent)?(n=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(n=this._config.parent[0])):n=t(this._config.parent)[0];var s='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return t(n).find(s).each(function(t,n){e._addAriaAndCollapsedClass(i._getTargetFromElement(n),[n])}),n},o._addAriaAndCollapsedClass=function(e,n){if(e){var i=t(e).hasClass(c);n.length>0&&t(n).toggleClass(d,!i).attr("aria-expanded",i)}},i._getTargetFromElement=function(e){var n=P.getSelectorFromElement(e);return n?t(n)[0]:null},i._jQueryInterface=function(e){return this.each(function(){var s=t(this),o=s.data(n),l=r({},a,s.data(),"object"==typeof e&&e);if(!o&&l.toggle&&/show|hide/.test(e)&&(l.toggle=!1),o||(o=new i(this,l),s.data(n,o)),"string"==typeof e){if("undefined"==typeof o[e])throw new TypeError('No method named "'+e+'"');o[e]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return a}}]),i}();return t(document).on(h.CLICK_DATA_API,p.DATA_TOGGLE,function(e){"A"===e.currentTarget.tagName&&e.preventDefault();var i=t(this),s=P.getSelectorFromElement(this);t(s).each(function(){var e=t(this),s=e.data(n)?"toggle":i.data();m._jQueryInterface.call(e,s)})}),t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=o,m._jQueryInterface},m}(e),W=function(t){var e="dropdown",i="bs.dropdown",o="."+i,a=".data-api",l=t.fn[e],h=new RegExp("38|40|27"),c={HIDE:"hide"+o,HIDDEN:"hidden"+o,SHOW:"show"+o,SHOWN:"shown"+o,CLICK:"click"+o,CLICK_DATA_API:"click"+o+a,KEYDOWN_DATA_API:"keydown"+o+a,KEYUP_DATA_API:"keyup"+o+a},u="disabled",f="show",d="dropup",_="dropright",g="dropleft",p="dropdown-menu-right",m="dropdown-menu-left",v="position-static",E='[data-toggle="dropdown"]',T=".dropdown form",y=".dropdown-menu",C=".navbar-nav",I=".dropdown-menu .dropdown-item:not(.disabled)",A="top-start",b="top-end",D="bottom-start",S="bottom-end",w="right-start",N="left-start",O={offset:0,flip:!0,boundary:"scrollParent"},k={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)"},L=function(){function a(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var l=a.prototype;return l.toggle=function(){if(!this._element.disabled&&!t(this._element).hasClass(u)){var e=a._getParentFromElement(this._element),i=t(this._menu).hasClass(f);if(a._clearMenus(),!i){var s={relatedTarget:this._element},r=t.Event(c.SHOW,s);if(t(e).trigger(r),!r.isDefaultPrevented()){if(!this._inNavbar){if("undefined"==typeof n)throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");var o=this._element;t(e).hasClass(d)&&(t(this._menu).hasClass(m)||t(this._menu).hasClass(p))&&(o=e),"scrollParent"!==this._config.boundary&&t(e).addClass(v),this._popper=new n(o,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===t(e).closest(C).length&&t("body").children().on("mouseover",null,t.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),t(this._menu).toggleClass(f),t(e).toggleClass(f).trigger(t.Event(c.SHOWN,s))}}}},l.dispose=function(){t.removeData(this._element,i),t(this._element).off(o),this._element=null,this._menu=null,null!==this._popper&&(this._popper.destroy(),this._popper=null)},l.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},l._addEventListeners=function(){var e=this;t(this._element).on(c.CLICK,function(t){t.preventDefault(),t.stopPropagation(),e.toggle()})},l._getConfig=function(n){return n=r({},this.constructor.Default,t(this._element).data(),n),P.typeCheckConfig(e,n,this.constructor.DefaultType),n},l._getMenuElement=function(){if(!this._menu){var e=a._getParentFromElement(this._element);this._menu=t(e).find(y)[0]}return this._menu},l._getPlacement=function(){var e=t(this._element).parent(),n=D;return e.hasClass(d)?(n=A,t(this._menu).hasClass(p)&&(n=b)):e.hasClass(_)?n=w:e.hasClass(g)?n=N:t(this._menu).hasClass(p)&&(n=S),n},l._detectNavbar=function(){return t(this._element).closest(".navbar").length>0},l._getPopperConfig=function(){var t=this,e={};return"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=r({},e.offsets,t._config.offset(e.offsets)||{}),e}:e.offset=this._config.offset,{placement:this._getPlacement(),modifiers:{offset:e,flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}}},a._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(i);if(n||(n=new a(this,"object"==typeof e?e:null),t(this).data(i,n)),"string"==typeof e){if("undefined"==typeof n[e])throw new TypeError('No method named "'+e+'"');n[e]()}})},a._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var n=t.makeArray(t(E)),s=0;s<n.length;s++){var r=a._getParentFromElement(n[s]),o=t(n[s]).data(i),l={relatedTarget:n[s]};if(o){var h=o._menu;if(t(r).hasClass(f)&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&t.contains(r,e.target))){var u=t.Event(c.HIDE,l);t(r).trigger(u),u.isDefaultPrevented()||("ontouchstart"in document.documentElement&&t("body").children().off("mouseover",null,t.noop),n[s].setAttribute("aria-expanded","false"),t(h).removeClass(f),t(r).removeClass(f).trigger(t.Event(c.HIDDEN,l)))}}}},a._getParentFromElement=function(e){var n,i=P.getSelectorFromElement(e);return i&&(n=t(i)[0]),n||e.parentNode},a._dataApiKeydownHandler=function(e){if((/input|textarea/i.test(e.target.tagName)?!(32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||t(e.target).closest(y).length)):h.test(e.which))&&(e.preventDefault(),e.stopPropagation(),!this.disabled&&!t(this).hasClass(u))){var n=a._getParentFromElement(this),i=t(n).hasClass(f);if((i||27===e.which&&32===e.which)&&(!i||27!==e.which&&32!==e.which)){var s=t(n).find(I).get();if(0!==s.length){var r=s.indexOf(e.target);38===e.which&&r>0&&r--,40===e.which&&r<s.length-1&&r++,r<0&&(r=0),s[r].focus()}}else{if(27===e.which){var o=t(n).find(E)[0];t(o).trigger("focus")}t(this).trigger("click")}}},s(a,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return O}},{key:"DefaultType",get:function(){return k}}]),a}();return t(document).on(c.KEYDOWN_DATA_API,E,L._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API,y,L._dataApiKeydownHandler).on(c.CLICK_DATA_API+" "+c.KEYUP_DATA_API,L._clearMenus).on(c.CLICK_DATA_API,E,function(e){e.preventDefault(),e.stopPropagation(),L._jQueryInterface.call(t(this),"toggle")}).on(c.CLICK_DATA_API,T,function(t){t.stopPropagation()}),t.fn[e]=L._jQueryInterface,t.fn[e].Constructor=L,t.fn[e].noConflict=function(){return t.fn[e]=l,L._jQueryInterface},L}(e),M=function(t){var e="modal",n="bs.modal",i="."+n,o=t.fn.modal,a={backdrop:!0,keyboard:!0,focus:!0,show:!0},l={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},h={HIDE:"hide"+i,HIDDEN:"hidden"+i,SHOW:"show"+i,SHOWN:"shown"+i,FOCUSIN:"focusin"+i,RESIZE:"resize"+i,CLICK_DISMISS:"click.dismiss"+i,KEYDOWN_DISMISS:"keydown.dismiss"+i,MOUSEUP_DISMISS:"mouseup.dismiss"+i,MOUSEDOWN_DISMISS:"mousedown.dismiss"+i,CLICK_DATA_API:"click"+i+".data-api"},c="modal-scrollbar-measure",u="modal-backdrop",f="modal-open",d="fade",_="show",g={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"},p=function(){function o(e,n){this._config=this._getConfig(n),this._element=e,this._dialog=t(e).find(g.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}var p=o.prototype;return p.toggle=function(t){return this._isShown?this.hide():this.show(t)},p.show=function(e){var n=this;if(!this._isTransitioning&&!this._isShown){P.supportsTransitionEnd()&&t(this._element).hasClass(d)&&(this._isTransitioning=!0);var i=t.Event(h.SHOW,{relatedTarget:e});t(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),t(document.body).addClass(f),this._setEscapeEvent(),this._setResizeEvent(),t(this._element).on(h.CLICK_DISMISS,g.DATA_DISMISS,function(t){return n.hide(t)}),t(this._dialog).on(h.MOUSEDOWN_DISMISS,function(){t(n._element).one(h.MOUSEUP_DISMISS,function(e){t(e.target).is(n._element)&&(n._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return n._showElement(e)}))}},p.hide=function(e){var n=this;if(e&&e.preventDefault(),!this._isTransitioning&&this._isShown){var i=t.Event(h.HIDE);if(t(this._element).trigger(i),this._isShown&&!i.isDefaultPrevented()){this._isShown=!1;var s=P.supportsTransitionEnd()&&t(this._element).hasClass(d);s&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),t(document).off(h.FOCUSIN),t(this._element).removeClass(_),t(this._element).off(h.CLICK_DISMISS),t(this._dialog).off(h.MOUSEDOWN_DISMISS),s?t(this._element).one(P.TRANSITION_END,function(t){return n._hideModal(t)}).emulateTransitionEnd(300):this._hideModal()}}},p.dispose=function(){t.removeData(this._element,n),t(window,document,this._element,this._backdrop).off(i),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._scrollbarWidth=null},p.handleUpdate=function(){this._adjustDialog()},p._getConfig=function(t){return t=r({},a,t),P.typeCheckConfig(e,t,l),t},p._showElement=function(e){var n=this,i=P.supportsTransitionEnd()&&t(this._element).hasClass(d);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,i&&P.reflow(this._element),t(this._element).addClass(_),this._config.focus&&this._enforceFocus();var s=t.Event(h.SHOWN,{relatedTarget:e}),r=function(){n._config.focus&&n._element.focus(),n._isTransitioning=!1,t(n._element).trigger(s)};i?t(this._dialog).one(P.TRANSITION_END,r).emulateTransitionEnd(300):r()},p._enforceFocus=function(){var e=this;t(document).off(h.FOCUSIN).on(h.FOCUSIN,function(n){document!==n.target&&e._element!==n.target&&0===t(e._element).has(n.target).length&&e._element.focus()})},p._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?t(this._element).on(h.KEYDOWN_DISMISS,function(t){27===t.which&&(t.preventDefault(),e.hide())}):this._isShown||t(this._element).off(h.KEYDOWN_DISMISS)},p._setResizeEvent=function(){var e=this;this._isShown?t(window).on(h.RESIZE,function(t){return e.handleUpdate(t)}):t(window).off(h.RESIZE)},p._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._isTransitioning=!1,this._showBackdrop(function(){t(document.body).removeClass(f),e._resetAdjustments(),e._resetScrollbar(),t(e._element).trigger(h.HIDDEN)})},p._removeBackdrop=function(){this._backdrop&&(t(this._backdrop).remove(),this._backdrop=null)},p._showBackdrop=function(e){var n=this,i=t(this._element).hasClass(d)?d:"";if(this._isShown&&this._config.backdrop){var s=P.supportsTransitionEnd()&&i;if(this._backdrop=document.createElement("div"),this._backdrop.className=u,i&&t(this._backdrop).addClass(i),t(this._backdrop).appendTo(document.body),t(this._element).on(h.CLICK_DISMISS,function(t){n._ignoreBackdropClick?n._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===n._config.backdrop?n._element.focus():n.hide())}),s&&P.reflow(this._backdrop),t(this._backdrop).addClass(_),!e)return;if(!s)return void e();t(this._backdrop).one(P.TRANSITION_END,e).emulateTransitionEnd(150)}else if(!this._isShown&&this._backdrop){t(this._backdrop).removeClass(_);var r=function(){n._removeBackdrop(),e&&e()};P.supportsTransitionEnd()&&t(this._element).hasClass(d)?t(this._backdrop).one(P.TRANSITION_END,r).emulateTransitionEnd(150):r()}else e&&e()},p._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},p._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},p._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=t.left+t.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},p._setScrollbar=function(){var e=this;if(this._isBodyOverflowing){t(g.FIXED_CONTENT).each(function(n,i){var s=t(i)[0].style.paddingRight,r=t(i).css("padding-right");t(i).data("padding-right",s).css("padding-right",parseFloat(r)+e._scrollbarWidth+"px")}),t(g.STICKY_CONTENT).each(function(n,i){var s=t(i)[0].style.marginRight,r=t(i).css("margin-right");t(i).data("margin-right",s).css("margin-right",parseFloat(r)-e._scrollbarWidth+"px")}),t(g.NAVBAR_TOGGLER).each(function(n,i){var s=t(i)[0].style.marginRight,r=t(i).css("margin-right");t(i).data("margin-right",s).css("margin-right",parseFloat(r)+e._scrollbarWidth+"px")});var n=document.body.style.paddingRight,i=t("body").css("padding-right");t("body").data("padding-right",n).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}},p._resetScrollbar=function(){t(g.FIXED_CONTENT).each(function(e,n){var i=t(n).data("padding-right");"undefined"!=typeof i&&t(n).css("padding-right",i).removeData("padding-right")}),t(g.STICKY_CONTENT+", "+g.NAVBAR_TOGGLER).each(function(e,n){var i=t(n).data("margin-right");"undefined"!=typeof i&&t(n).css("margin-right",i).removeData("margin-right")});var e=t("body").data("padding-right");"undefined"!=typeof e&&t("body").css("padding-right",e).removeData("padding-right")},p._getScrollbarWidth=function(){var t=document.createElement("div");t.className=c,document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},o._jQueryInterface=function(e,i){return this.each(function(){var s=t(this).data(n),a=r({},o.Default,t(this).data(),"object"==typeof e&&e);if(s||(s=new o(this,a),t(this).data(n,s)),"string"==typeof e){if("undefined"==typeof s[e])throw new TypeError('No method named "'+e+'"');s[e](i)}else a.show&&s.show(i)})},s(o,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return a}}]),o}();return t(document).on(h.CLICK_DATA_API,g.DATA_TOGGLE,function(e){var i,s=this,o=P.getSelectorFromElement(this);o&&(i=t(o)[0]);var a=t(i).data(n)?"toggle":r({},t(i).data(),t(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var l=t(i).one(h.SHOW,function(e){e.isDefaultPrevented()||l.one(h.HIDDEN,function(){t(s).is(":visible")&&s.focus()})});p._jQueryInterface.call(t(i),a,this)}),t.fn.modal=p._jQueryInterface,t.fn.modal.Constructor=p,t.fn.modal.noConflict=function(){return t.fn.modal=o,p._jQueryInterface},p}(e),U=function(t){var e="tooltip",i="bs.tooltip",o="."+i,a=t.fn[e],l=new RegExp("(^|\\s)bs-tooltip\\S+","g"),h={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)"},c={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},u={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent"},f="show",d="out",_={HIDE:"hide"+o,HIDDEN:"hidden"+o,SHOW:"show"+o,SHOWN:"shown"+o,INSERTED:"inserted"+o,CLICK:"click"+o,FOCUSIN:"focusin"+o,FOCUSOUT:"focusout"+o,MOUSEENTER:"mouseenter"+o,MOUSELEAVE:"mouseleave"+o},g="fade",p="show",m=".tooltip-inner",v=".arrow",E="hover",T="focus",y="click",C="manual",I=function(){function a(t,e){if("undefined"==typeof n)throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var I=a.prototype;return I.enable=function(){this._isEnabled=!0},I.disable=function(){this._isEnabled=!1},I.toggleEnabled=function(){this._isEnabled=!this._isEnabled},I.toggle=function(e){if(this._isEnabled)if(e){var n=this.constructor.DATA_KEY,i=t(e.currentTarget).data(n);i||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(n,i)),i._activeTrigger.click=!i._activeTrigger.click,i._isWithActiveTrigger()?i._enter(null,i):i._leave(null,i)}else{if(t(this.getTipElement()).hasClass(p))return void this._leave(null,this);this._enter(null,this)}},I.dispose=function(){clearTimeout(this._timeout),t.removeData(this.element,this.constructor.DATA_KEY),t(this.element).off(this.constructor.EVENT_KEY),t(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&t(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,null!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},I.show=function(){var e=this;if("none"===t(this.element).css("display"))throw new Error("Please use show on visible elements");var i=t.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){t(this.element).trigger(i);var s=t.contains(this.element.ownerDocument.documentElement,this.element);if(i.isDefaultPrevented()||!s)return;var r=this.getTipElement(),o=P.getUID(this.constructor.NAME);r.setAttribute("id",o),this.element.setAttribute("aria-describedby",o),this.setContent(),this.config.animation&&t(r).addClass(g);var l="function"==typeof this.config.placement?this.config.placement.call(this,r,this.element):this.config.placement,h=this._getAttachment(l);this.addAttachmentClass(h);var c=!1===this.config.container?document.body:t(this.config.container);t(r).data(this.constructor.DATA_KEY,this),t.contains(this.element.ownerDocument.documentElement,this.tip)||t(r).appendTo(c),t(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new n(this.element,r,{placement:h,modifiers:{offset:{offset:this.config.offset},flip:{behavior:this.config.fallbackPlacement},arrow:{element:v},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){e._handlePopperPlacementChange(t)}}),t(r).addClass(p),"ontouchstart"in document.documentElement&&t("body").children().on("mouseover",null,t.noop);var u=function(){e.config.animation&&e._fixTransition();var n=e._hoverState;e._hoverState=null,t(e.element).trigger(e.constructor.Event.SHOWN),n===d&&e._leave(null,e)};P.supportsTransitionEnd()&&t(this.tip).hasClass(g)?t(this.tip).one(P.TRANSITION_END,u).emulateTransitionEnd(a._TRANSITION_DURATION):u()}},I.hide=function(e){var n=this,i=this.getTipElement(),s=t.Event(this.constructor.Event.HIDE),r=function(){n._hoverState!==f&&i.parentNode&&i.parentNode.removeChild(i),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),t(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),e&&e()};t(this.element).trigger(s),s.isDefaultPrevented()||(t(i).removeClass(p),"ontouchstart"in document.documentElement&&t("body").children().off("mouseover",null,t.noop),this._activeTrigger[y]=!1,this._activeTrigger[T]=!1,this._activeTrigger[E]=!1,P.supportsTransitionEnd()&&t(this.tip).hasClass(g)?t(i).one(P.TRANSITION_END,r).emulateTransitionEnd(150):r(),this._hoverState="")},I.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},I.isWithContent=function(){return Boolean(this.getTitle())},I.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-tooltip-"+e)},I.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0],this.tip},I.setContent=function(){var e=t(this.getTipElement());this.setElementContent(e.find(m),this.getTitle()),e.removeClass(g+" "+p)},I.setElementContent=function(e,n){var i=this.config.html;"object"==typeof n&&(n.nodeType||n.jquery)?i?t(n).parent().is(e)||e.empty().append(n):e.text(t(n).text()):e[i?"html":"text"](n)},I.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},I._getAttachment=function(t){return c[t.toUpperCase()]},I._setListeners=function(){var e=this;this.config.trigger.split(" ").forEach(function(n){if("click"===n)t(e.element).on(e.constructor.Event.CLICK,e.config.selector,function(t){return e.toggle(t)});else if(n!==C){var i=n===E?e.constructor.Event.MOUSEENTER:e.constructor.Event.FOCUSIN,s=n===E?e.constructor.Event.MOUSELEAVE:e.constructor.Event.FOCUSOUT;t(e.element).on(i,e.config.selector,function(t){return e._enter(t)}).on(s,e.config.selector,function(t){return e._leave(t)})}t(e.element).closest(".modal").on("hide.bs.modal",function(){return e.hide()})}),this.config.selector?this.config=r({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},I._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},I._enter=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusin"===e.type?T:E]=!0),t(n.getTipElement()).hasClass(p)||n._hoverState===f?n._hoverState=f:(clearTimeout(n._timeout),n._hoverState=f,n.config.delay&&n.config.delay.show?n._timeout=setTimeout(function(){n._hoverState===f&&n.show()},n.config.delay.show):n.show())},I._leave=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusout"===e.type?T:E]=!1),n._isWithActiveTrigger()||(clearTimeout(n._timeout),n._hoverState=d,n.config.delay&&n.config.delay.hide?n._timeout=setTimeout(function(){n._hoverState===d&&n.hide()},n.config.delay.hide):n.hide())},I._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},I._getConfig=function(n){return"number"==typeof(n=r({},this.constructor.Default,t(this.element).data(),n)).delay&&(n.delay={show:n.delay,hide:n.delay}),"number"==typeof n.title&&(n.title=n.title.toString()),"number"==typeof n.content&&(n.content=n.content.toString()),P.typeCheckConfig(e,n,this.constructor.DefaultType),n},I._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},I._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(l);null!==n&&n.length>0&&e.removeClass(n.join(""))},I._handlePopperPlacementChange=function(t){this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},I._fixTransition=function(){var e=this.getTipElement(),n=this.config.animation;null===e.getAttribute("x-placement")&&(t(e).removeClass(g),this.config.animation=!1,this.hide(),this.show(),this.config.animation=n)},a._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(i),s="object"==typeof e&&e;if((n||!/dispose|hide/.test(e))&&(n||(n=new a(this,s),t(this).data(i,n)),"string"==typeof e)){if("undefined"==typeof n[e])throw new TypeError('No method named "'+e+'"');n[e]()}})},s(a,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return u}},{key:"NAME",get:function(){return e}},{key:"DATA_KEY",get:function(){return i}},{key:"Event",get:function(){return _}},{key:"EVENT_KEY",get:function(){return o}},{key:"DefaultType",get:function(){return h}}]),a}();return t.fn[e]=I._jQueryInterface,t.fn[e].Constructor=I,t.fn[e].noConflict=function(){return t.fn[e]=a,I._jQueryInterface},I}(e),x=function(t){var e="popover",n="bs.popover",i="."+n,o=t.fn[e],a=new RegExp("(^|\\s)bs-popover\\S+","g"),l=r({},U.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),h=r({},U.DefaultType,{content:"(string|element|function)"}),c="fade",u="show",f=".popover-header",d=".popover-body",_={HIDE:"hide"+i,HIDDEN:"hidden"+i,SHOW:"show"+i,SHOWN:"shown"+i,INSERTED:"inserted"+i,CLICK:"click"+i,FOCUSIN:"focusin"+i,FOCUSOUT:"focusout"+i,MOUSEENTER:"mouseenter"+i,MOUSELEAVE:"mouseleave"+i},g=function(r){var o,g;function p(){return r.apply(this,arguments)||this}g=r,(o=p).prototype=Object.create(g.prototype),o.prototype.constructor=o,o.__proto__=g;var m=p.prototype;return m.isWithContent=function(){return this.getTitle()||this._getContent()},m.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-popover-"+e)},m.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0],this.tip},m.setContent=function(){var e=t(this.getTipElement());this.setElementContent(e.find(f),this.getTitle());var n=this._getContent();"function"==typeof n&&(n=n.call(this.element)),this.setElementContent(e.find(d),n),e.removeClass(c+" "+u)},m._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},m._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(a);null!==n&&n.length>0&&e.removeClass(n.join(""))},p._jQueryInterface=function(e){return this.each(function(){var i=t(this).data(n),s="object"==typeof e?e:null;if((i||!/destroy|hide/.test(e))&&(i||(i=new p(this,s),t(this).data(n,i)),"string"==typeof e)){if("undefined"==typeof i[e])throw new TypeError('No method named "'+e+'"');i[e]()}})},s(p,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return l}},{key:"NAME",get:function(){return e}},{key:"DATA_KEY",get:function(){return n}},{key:"Event",get:function(){return _}},{key:"EVENT_KEY",get:function(){return i}},{key:"DefaultType",get:function(){return h}}]),p}(U);return t.fn[e]=g._jQueryInterface,t.fn[e].Constructor=g,t.fn[e].noConflict=function(){return t.fn[e]=o,g._jQueryInterface},g}(e),K=function(t){var e="scrollspy",n="bs.scrollspy",i="."+n,o=t.fn[e],a={offset:10,method:"auto",target:""},l={offset:"number",method:"string",target:"(string|element)"},h={ACTIVATE:"activate"+i,SCROLL:"scroll"+i,LOAD_DATA_API:"load"+i+".data-api"},c="dropdown-item",u="active",f={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",NAV_ITEMS:".nav-item",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},d="offset",_="position",g=function(){function o(e,n){var i=this;this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(n),this._selector=this._config.target+" "+f.NAV_LINKS+","+this._config.target+" "+f.LIST_ITEMS+","+this._config.target+" "+f.DROPDOWN_ITEMS,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,t(this._scrollElement).on(h.SCROLL,function(t){return i._process(t)}),this.refresh(),this._process()}var g=o.prototype;return g.refresh=function(){var e=this,n=this._scrollElement===this._scrollElement.window?d:_,i="auto"===this._config.method?n:this._config.method,s=i===_?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),t.makeArray(t(this._selector)).map(function(e){var n,r=P.getSelectorFromElement(e);if(r&&(n=t(r)[0]),n){var o=n.getBoundingClientRect();if(o.width||o.height)return[t(n)[i]().top+s,r]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},g.dispose=function(){t.removeData(this._element,n),t(this._scrollElement).off(i),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},g._getConfig=function(n){if("string"!=typeof(n=r({},a,n)).target){var i=t(n.target).attr("id");i||(i=P.getUID(e),t(n.target).attr("id",i)),n.target="#"+i}return P.typeCheckConfig(e,n,l),n},g._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},g._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},g._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},g._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var s=this._offsets.length;s--;){this._activeTarget!==this._targets[s]&&t>=this._offsets[s]&&("undefined"==typeof this._offsets[s+1]||t<this._offsets[s+1])&&this._activate(this._targets[s])}}},g._activate=function(e){this._activeTarget=e,this._clear();var n=this._selector.split(",");n=n.map(function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'});var i=t(n.join(","));i.hasClass(c)?(i.closest(f.DROPDOWN).find(f.DROPDOWN_TOGGLE).addClass(u),i.addClass(u)):(i.addClass(u),i.parents(f.NAV_LIST_GROUP).prev(f.NAV_LINKS+", "+f.LIST_ITEMS).addClass(u),i.parents(f.NAV_LIST_GROUP).prev(f.NAV_ITEMS).children(f.NAV_LINKS).addClass(u)),t(this._scrollElement).trigger(h.ACTIVATE,{relatedTarget:e})},g._clear=function(){t(this._selector).filter(f.ACTIVE).removeClass(u)},o._jQueryInterface=function(e){return this.each(function(){var i=t(this).data(n);if(i||(i=new o(this,"object"==typeof e&&e),t(this).data(n,i)),"string"==typeof e){if("undefined"==typeof i[e])throw new TypeError('No method named "'+e+'"');i[e]()}})},s(o,null,[{key:"VERSION",get:function(){return"4.0.0"}},{key:"Default",get:function(){return a}}]),o}();return t(window).on(h.LOAD_DATA_API,function(){for(var e=t.makeArray(t(f.DATA_SPY)),n=e.length;n--;){var i=t(e[n]);g._jQueryInterface.call(i,i.data())}}),t.fn[e]=g._jQueryInterface,t.fn[e].Constructor=g,t.fn[e].noConflict=function(){return t.fn[e]=o,g._jQueryInterface},g}(e),V=function(t){var e="bs.tab",n="."+e,i=t.fn.tab,r={HIDE:"hide"+n,HIDDEN:"hidden"+n,SHOW:"show"+n,SHOWN:"shown"+n,CLICK_DATA_API:"click.bs.tab.data-api"},o="dropdown-menu",a="active",l="disabled",h="fade",c="show",u=".dropdown",f=".nav, .list-group",d=".active",_="> li > .active",g='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',p=".dropdown-toggle",m="> .dropdown-menu .active",v=function(){function n(t){this._element=t}var i=n.prototype;return i.show=function(){var e=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&t(this._element).hasClass(a)||t(this._element).hasClass(l))){var n,i,s=t(this._element).closest(f)[0],o=P.getSelectorFromElement(this._element);if(s){var h="UL"===s.nodeName?_:d;i=(i=t.makeArray(t(s).find(h)))[i.length-1]}var c=t.Event(r.HIDE,{relatedTarget:this._element}),u=t.Event(r.SHOW,{relatedTarget:i});if(i&&t(i).trigger(c),t(this._element).trigger(u),!u.isDefaultPrevented()&&!c.isDefaultPrevented()){o&&(n=t(o)[0]),this._activate(this._element,s);var g=function(){var n=t.Event(r.HIDDEN,{relatedTarget:e._element}),s=t.Event(r.SHOWN,{relatedTarget:i});t(i).trigger(n),t(e._element).trigger(s)};n?this._activate(n,n.parentNode,g):g()}}},i.dispose=function(){t.removeData(this._element,e),this._element=null},i._activate=function(e,n,i){var s=this,r=("UL"===n.nodeName?t(n).find(_):t(n).children(d))[0],o=i&&P.supportsTransitionEnd()&&r&&t(r).hasClass(h),a=function(){return s._transitionComplete(e,r,i)};r&&o?t(r).one(P.TRANSITION_END,a).emulateTransitionEnd(150):a()},i._transitionComplete=function(e,n,i){if(n){t(n).removeClass(c+" "+a);var s=t(n.parentNode).find(m)[0];s&&t(s).removeClass(a),"tab"===n.getAttribute("role")&&n.setAttribute("aria-selected",!1)}if(t(e).addClass(a),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),P.reflow(e),t(e).addClass(c),e.parentNode&&t(e.parentNode).hasClass(o)){var r=t(e).closest(u)[0];r&&t(r).find(p).addClass(a),e.setAttribute("aria-expanded",!0)}i&&i()},n._jQueryInterface=function(i){return this.each(function(){var s=t(this),r=s.data(e);if(r||(r=new n(this),s.data(e,r)),"string"==typeof i){if("undefined"==typeof r[i])throw new TypeError('No method named "'+i+'"');r[i]()}})},s(n,null,[{key:"VERSION",get:function(){return"4.0.0"}}]),n}();return t(document).on(r.CLICK_DATA_API,g,function(e){e.preventDefault(),v._jQueryInterface.call(t(this),"show")}),t.fn.tab=v._jQueryInterface,t.fn.tab.Constructor=v,t.fn.tab.noConflict=function(){return t.fn.tab=i,v._jQueryInterface},v}(e);!function(t){if("undefined"==typeof t)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1===e[0]&&9===e[1]&&e[2]<1||e[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(e),t.Util=P,t.Alert=L,t.Button=R,t.Carousel=j,t.Collapse=H,t.Dropdown=W,t.Modal=M,t.Popover=x,t.Scrollspy=K,t.Tab=V,t.Tooltip=U,Object.defineProperty(t,"__esModule",{value:!0})});



jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

/*! jQuery DrawSVG v1.1.0 (2016-10-05) - git.io/vGFa5 - Copyright (c) 2016 Leonardo Santos - MIT License */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(e,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(e)),t(n),n}:t(jQuery)}(function(t){"use strict";var e="drawsvg",n={duration:1e3,stagger:200,easing:"swing",reverse:!1,callback:t.noop},a=function(){var a=function(a,o){var i=this,r=t.extend(n,o);i.$elm=t(a),i.$elm.is("svg")&&(i.options=r,i.$paths=i.$elm.find("path"),i.totalDuration=r.duration+r.stagger*i.$paths.length,i.duration=r.duration/i.totalDuration,i.$paths.each(function(t,e){var n=e.getTotalLength();e.pathLen=n,e.delay=r.stagger*t/i.totalDuration,e.style.strokeDasharray=[n,n].join(" "),e.style.strokeDashoffset=n}),i.$elm.attr("class",function(t,n){return[n,e+"-initialized"].join(" ")}))};return a.prototype.getVal=function(e,n){return 1-t.easing[n](e,e,0,1,1)},a.prototype.progress=function(t){var e=this,n=e.options,a=e.duration;e.$paths.each(function(o,i){var r=i.style;if(1===t)r.strokeDashoffset=0;else if(0===t)r.strokeDashoffset=i.pathLen+"px";else if(t>=i.delay&&t<=a+i.delay){var s=(t-i.delay)/a;r.strokeDashoffset=e.getVal(s,n.easing)*i.pathLen*(n.reverse?-1:1)+"px"}})},a.prototype.animate=function(){var n=this;n.$elm.attr("class",function(t,n){return[n,e+"-animating"].join(" ")}),t({len:0}).animate({len:1},{easing:"linear",duration:n.totalDuration,step:function(t,e){n.progress.call(n,t/e.end)},complete:function(){n.options.callback.call(this),n.$elm.attr("class",function(t,n){return n.replace(e+"-animating","")})}})},a}();t.fn[e]=function(n,o){return this.each(function(){var i=t.data(this,e);i&&""+n===n&&i[n]?i[n](o):t.data(this,e,new a(this,n))})}});

/*!
* fullPage 4.0.7
* https://github.com/alvarotrigo/fullPage.js
*
* @license GPLv3 for open source use only
* or Fullpage Commercial License for commercial use
* http://alvarotrigo.com/fullPage/pricing/
*
* Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
*/
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).fullpage=t()}(this,(function(){"use strict";var n,t,e,o;Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(n){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),e=t.length>>>0;if("function"!=typeof n)throw new TypeError("predicate must be a function");for(var o=arguments[1],i=0;i<e;){var r=t[i];if(n.call(o,r,i,t))return r;i++}}}),Array.from||(Array.from=(n=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===n.call(t)},e=Math.pow(2,53)-1,o=function(n){var t=function(n){var t=Number(n);return isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*Math.floor(Math.abs(t)):t}(n);return Math.min(Math.max(t,0),e)},function(n){var e=this,i=Object(n);if(null==n)throw new TypeError("Array.from requires an array-like object - not null or undefined");var r,a=arguments.length>1?arguments[1]:void 0;if(void 0!==a){if(!t(a))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(r=arguments[2])}for(var u,c=o(i.length),l=t(e)?Object(new e(c)):new Array(c),f=0;f<c;)u=i[f],l[f]=a?void 0===r?a(u,f):a.call(r,u,f):u,f+=1;return l.length=c,l}));var i=window,r=document,a=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),u=/(Mac|iPhone|iPod|iPad)/i.test(i.navigator.userAgent),c="ontouchstart"in i||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints,l={test:{},shared:{}},f=["parallax","scrollOverflowReset","dragAndMove","offsetSections","fadingEffect","responsiveSlides","continuousHorizontal","interlockedSlides","scrollHorizontally","resetSliders","cards","dropEffect","waterEffect"];function s(n,t){i.console&&i.console[n]&&i.console[n]("fullPage: "+t)}function v(n){return"none"!==i.getComputedStyle(n).display}function d(n){return Array.from(n).filter((function(n){return v(n)}))}function h(n,t){return(t=arguments.length>1?t:document)?t.querySelectorAll(n):null}function p(n){n=n||{};for(var t=1,e=arguments.length;t<e;++t){var o=arguments[t];if(o)for(var i in o)o.hasOwnProperty(i)&&"__proto__"!=i&&"constructor"!=i&&("[object Object]"!==Object.prototype.toString.call(o[i])?n[i]=o[i]:n[i]=p(n[i],o[i]))}return n}function g(n,t){return null!=n&&n.classList.contains(t)}function m(){return"innerHeight"in i?i.innerHeight:r.documentElement.offsetHeight}function w(){return i.innerWidth}function b(n,t){var e;for(e in n=M(n),t)if(t.hasOwnProperty(e)&&null!==e)for(var o=0;o<n.length;o++)n[o].style[e]=t[e];return n}function y(n){return n.previousElementSibling}function S(n){return n.nextElementSibling}function T(n,t){n=A(n)?n[0]:n;for(var e=null!=t?h(t,n.parentNode):n.parentNode.childNodes,o=0,i=0;i<e.length;i++){if(e[i]==n)return o;1==e[i].nodeType&&o++}return-1}function M(n){return A(n)?n:[n]}function x(n){n=M(n);for(var t=0;t<n.length;t++)n[t].style.display="none";return n}function k(n){n=M(n);for(var t=0;t<n.length;t++)n[t].style.display="block";return n}function A(n){return"[object Array]"===Object.prototype.toString.call(n)||"[object NodeList]"===Object.prototype.toString.call(n)}function O(n,t){n=M(n);for(var e=0;e<n.length;e++)n[e].classList.add(t);return n}function D(n,t){n=M(n);for(var e=t.split(" "),o=0;o<e.length;o++){t=e[o];for(var i=0;i<n.length;i++)n[i].classList.remove(t)}return n}function j(n,t){t.appendChild(n)}function E(n,t,e){var o;t=t||r.createElement("div");for(var i=0;i<n.length;i++){var a=n[i];(e&&!i||!e)&&(o=t.cloneNode(!0),a.parentNode.insertBefore(o,a)),o.appendChild(a)}return n}function L(n,t){E(n,t,!0)}function R(n){for(var t=r.createDocumentFragment();n.firstChild;)t.appendChild(n.firstChild);n.parentNode.replaceChild(t,n)}function P(n,t){return n&&1===n.nodeType?G(n,t)?n:P(n.parentNode,t):null}function C(n,t){F(n,n.nextSibling,t)}function z(n,t){F(n,n,t)}function F(n,t,e){A(e)||("string"==typeof e&&(e=Q(e)),e=[e]);for(var o=0;o<e.length;o++)n.parentNode.insertBefore(e[o],t)}function N(n){if(void 0!==n&&n.fitToSection)return r.body.scrollTop;var t=r.documentElement;return(i.pageYOffset||t.scrollTop)-(t.clientTop||0)}function B(n){return Array.prototype.filter.call(n.parentNode.children,(function(t){return t!==n}))}function I(n){n.preventDefault()}function H(n,t){return n.getAttribute(t)}function W(n,t,e){r.addEventListener(n,t,"undefined"===e?null:e)}function V(n,t,e){i.addEventListener(n,t,"undefined"===e?null:e)}function U(n,t,e){r.removeEventListener(n,t,"undefined"===e?null:e)}function K(n,t,e){i.removeEventListener(n,t,"undefined"===e?null:e)}function _(n){if("function"==typeof n)return!0;var t=Object.prototype.toString.call(n);return"[object Function]"===t||"[object GeneratorFunction]"===t}function q(n,t,e){var o;e=void 0===e?{}:e,"function"==typeof i.CustomEvent?o=new CustomEvent(t,{detail:e}):(o=r.createEvent("CustomEvent")).initCustomEvent(t,!0,!0,e),n.dispatchEvent(o)}function G(n,t){return(n.matches||n.t||n.msMatchesSelector||n.mozMatchesSelector||n.webkitMatchesSelector||n.oMatchesSelector).call(n,t)}function Y(n,t){if("boolean"==typeof t)for(var e=0;e<n.length;e++)n[e].style.display=t?"block":"none";return n}function Q(n){var t=r.createElement("div");return t.innerHTML=n.trim(),t.firstChild}function X(n){n=M(n);for(var t=0;t<n.length;t++){var e=n[t];e&&e.parentElement&&e.parentNode.removeChild(e)}}function $(n,t,e){for(var o=n[e],i=[];o;)(G(o,t)||null==t)&&i.push(o),o=o[e];return i}function J(n,t){return $(n,t,"nextElementSibling")}function Z(n,t){return $(n,t,"previousElementSibling")}function nn(n){return n[n.length-1]}function tn(n,t){for(var e=0,o=n.slice(Math.max(n.length-t,1)),i=0;i<o.length;i++)e+=o[i];return Math.ceil(e/t)}function en(n,t){n.setAttribute(t,H(n,"data-"+t)),n.removeAttribute("data-"+t)}function on(n){return on="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},on(n)}i.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(n,t){t=t||window;for(var e=0;e<this.length;e++)n.call(t,this[e],e,this)}),"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(n,t){if(null==n)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(n),o=1;o<arguments.length;o++){var i=arguments[o];if(null!=i)for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},writable:!0,o:!0}),window.fp_utils={$:h,deepExtend:p,hasClass:g,getWindowHeight:m,css:b,prev:y,next:S,last:function(n){return n[n.length-1]},index:T,getList:M,hide:x,show:k,isArrayOrList:A,addClass:O,removeClass:D,appendTo:j,wrap:E,wrapAll:L,unwrap:R,closest:P,after:C,before:z,insertBefore:F,getScrollTop:N,siblings:B,preventDefault:I,isFunction:_,trigger:q,matches:G,toggle:Y,createElementFromHTML:Q,remove:X,untilAll:$,nextAll:J,prevAll:Z,showError:s};var rn={i:{},u:function(n,t){var e=this;return"object"!==on(this.i[n])&&(this.i[n]=[]),this.i[n].push(t),function(){return e.removeListener(n,t)}},removeListener:function(n,t){if("object"===on(this.i[n])){var e=this.i[n].indexOf(t);e>-1&&this.i[n].splice(e,1)}},l:function(n){for(var t=this,e=arguments.length,o=new Array(e>1?e-1:0),i=1;i<e;i++)o[i-1]=arguments[i];"object"===on(this.i[n])&&this.i[n].forEach((function(n){return n.apply(t,o)}))},once:function(n,t){var e=this,o=this.u(n,(function(){o();for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];t.apply(e,i)}))}},an={v:0,h:0,slides:[],p:[],g:null,S:null,T:!1,M:!1,A:!1,O:!1,D:!1,j:void 0,L:void 0,R:!1,P:!0,C:"none",F:"none",N:!1,B:!1,I:!0,H:0,W:m(),V:!1,U:{},scrollY:0,scrollX:0};function un(n){Object.assign(an,n)}function cn(){return an}function ln(n){rn.l("onClickOrTouch",{e:n,target:n.target})}function fn(){["click","touchstart"].forEach((function(n){U(n,ln)}))}function sn(){un({I:!0})}i.state=an,rn.u("bindEvents",(function(){["click","touchstart"].forEach((function(n){W(n,ln)})),V("focus",sn),rn.u("onDestroy",fn)}));var vn="fullpage-wrapper",dn="."+vn,hn="fp-responsive",pn="fp-notransition",gn="fp-destroyed",mn="fp-enabled",wn="active",bn=".active",yn="fp-completely",Sn="fp-section",Tn="."+Sn,Mn=".fp-tableCell",xn="fp-auto-height",kn="#fp-nav",An="fp-slide",On="."+An,Dn=".fp-slide.active",jn="fp-slides",En=".fp-slides",Ln="fp-slidesContainer",Rn="."+Ln,Pn="fp-table",Cn="fp-overflow",zn="."+Cn,Fn=".fp-slidesNav",Nn=".fp-slidesNav a",Bn="fp-controlArrow",In="."+Bn,Hn="fp-prev",Wn=".fp-controlArrow.fp-prev",Vn=".fp-controlArrow.fp-next",Un={menu:!1,anchors:[],lockAnchors:!1,navigation:!1,navigationPosition:"right",navigationTooltips:[],showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,hybrid:!1,licenseKey:"",credits:{enabled:!0,label:"Made with fullPage.js",position:"right"},css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,continuousHorizontal:!1,scrollHorizontally:!1,interlockedSlides:!1,dragAndMove:!1,offsetSections:!1,resetSliders:!1,fadingEffect:!1,normalScrollElements:null,scrollOverflow:!0,scrollOverflowReset:!1,touchSensitivity:5,touchWrapper:null,bigSectionsDestination:null,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,allowCorrectDirection:!1,scrollOverflowMacStyle:!0,controlArrows:!0,controlArrowsHTML:['<div class="fp-arrow"></div>','<div class="fp-arrow"></div>'],controlArrowColor:"#fff",verticalCentered:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,responsiveWidth:0,responsiveHeight:0,responsiveSlides:!1,parallax:!1,parallaxOptions:{type:"reveal",percentage:62,property:"translate"},cards:!1,cardsOptions:{perspective:100,fadeContent:!0,fadeBackground:!0},sectionSelector:".section",slideSelector:".slide",afterLoad:null,beforeLeave:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null,afterResponsive:null,onScrollOverflow:null,lazyLoading:!0,observer:!0},Kn=null,_n=!1,qn=p({},Un),Gn=null;function Yn(n){return Kn}function Qn(){return Gn||Un}function Xn(){return qn}function $n(n,t,e){Gn[n]=t,"internal"!==e&&(qn[n]=t)}function Jn(){if(!Qn().anchors.length){var n=h(Qn().sectionSelector.split(",").join("[data-anchor],")+"[data-anchor]",Kn);n.length&&n.length===h(Qn().sectionSelector,Kn).length&&(_n=!0,n.forEach((function(n){Qn().anchors.push(H(n,"data-anchor").toString())})))}if(!Qn().navigationTooltips.length){var t=h(Qn().sectionSelector.split(",").join("[data-tooltip],")+"[data-tooltip]",Kn);t.length&&t.forEach((function(n){Qn().navigationTooltips.push(H(n,"data-tooltip").toString())}))}}var Zn=function(n){this.anchor=n.anchor,this.item=n.item,this.index=n.index(),this.isLast=this.index===n.item.parentElement.querySelectorAll(n.selector).length-1,this.isFirst=!this.index,this.isActive=n.isActive},nt=function(n,t){this.parent=this.parent||null,this.selector=t,this.anchor=H(n,"data-anchor")||Qn().anchors[T(n,Qn().sectionSelector)],this.item=n,this.isVisible=v(n),this.isActive=g(n,wn),this.K=g(n,Cn),this._=t===Qn().sectionSelector,this.q=P(n,Rn)||P(n,dn),this.index=function(){return this.siblings().indexOf(this)}};function tt(n){return n.map((function(n){return n.item}))}function et(n,t){return n.find((function(n){return n.item===t}))}nt.prototype.siblings=function(){return this._?this.isVisible?an.p:an.G:this.parent?this.parent.slides:0},nt.prototype.prev=function(){var n=this.siblings(),t=(this._?n.indexOf(this):this.parent.slides.indexOf(this))-1;return t>=0?n[t]:null},nt.prototype.next=function(){var n=this.siblings(),t=(this._?n.indexOf(this):this.parent.slides.indexOf(this))+1;return t<n.length?n[t]:null},nt.prototype.Y=function(){return this._?an.p:an.X};var ot,it,rt=function(n){Zn.call(this,n)},at=function(n){Zn.call(this,n)};function ut(n){var t=h(Dn,n);return t.length&&(n=t[0]),n}function ct(n){var t,e,o=Qn();return o.autoScrolling&&!o.scrollBar?(t=-n,e=h(dn)[0]):o.fitToSection?(t=n,e=r.body):(t=n,e=window),{options:t,element:e}}function lt(n,t){!Qn().autoScrolling||Qn().scrollBar||n.self!=window&&g(n,jn)?n.self!=window&&g(n,jn)?n.scrollLeft=t:n.scrollTo(0,t):n.style.top=t+"px"}function ft(n){var t="transform "+Qn().scrollingSpeed+"ms "+Qn().easingcss3;return D(n,pn),b(n,{"-webkit-transition":t,transition:t})}function st(n,t){var e=n.index(),o=T(t,Tn);return e==o?"none":e>o?"up":"down"}function vt(n){return O(n,pn)}function dt(n){return{"-webkit-transform":n,"-moz-transform":n,"-ms-transform":n,transform:n}}function ht(n,t){t?ft(Yn()):vt(Yn()),clearTimeout(ot),b(Yn(),dt(n)),l.test.J=n,ot=setTimeout((function(){D(Yn(),pn)}),10)}function pt(n){var t=Math.round(n);if(Qn().css3&&Qn().autoScrolling&&!Qn().scrollBar)ht("translate3d(0px, -"+t+"px, 0px)",!1);else if(Qn().autoScrolling&&!Qn().scrollBar)b(Yn(),{top:-t+"px"}),l.test.top=-t+"px";else{var e=ct(t);lt(e.element,e.options)}}function gt(n,t){$n("scrollingSpeed",n,t)}function mt(){clearTimeout(it)}function wt(n,t,e,o){var a=function(n){return n.self!=i&&g(n,jn)?n.scrollLeft:!Qn().autoScrolling||Qn().scrollBar?N(Qn()):n.offsetTop}(n),u=t-a,c=0,l=!1;un({R:!0}),n===r.body&&b(r.body,{"scroll-snap-type":"none"}),function r(){if(an.R){var f=t;c+=20,e&&(f=i.fp_easings[Qn().easing](c,a,u,e)),lt(n,f),c<e?(clearTimeout(it),it=setTimeout(r,20)):void 0===o||l||(o(),l=!0)}else c<e&&!l&&(o(),l=!0)}()}function bt(n){return n&&!n.item?new rt(new $t(n)):n?new rt(n):null}function yt(n){return n?new at(n):null}function St(n,t){var e,o=function(n,t){var e={afterRender:function(){return{section:bt(cn().g),Z:yt(cn().g.activeSlide)}},onLeave:function(){return{origin:bt(t.items.origin),destination:bt(t.items.destination),direction:t.direction,trigger:cn().S}},afterLoad:function(){return e.onLeave()},afterSlideLoad:function(){return{section:bt(t.items.section),origin:bt(t.items.origin),destination:bt(t.items.destination),direction:t.direction,trigger:cn().S}},onSlideLeave:function(){return e.afterSlideLoad()},beforeLeave:function(){return e.onLeave()},onScrollOverflow:function(){return{section:bt(cn().g),Z:yt(cn().g.activeSlide),position:t.position,direction:t.direction}}};return e[n]()}(n,t);return q(Yn(),n,o),!1!==Qn()[n].apply(o[Object.keys(o)[0]],(e=o,Object.keys(e).map((function(n){return e[n]}))))}function Tt(n){var t=ut(n);h("video, audio",t).forEach((function(n){n.hasAttribute("data-autoplay")&&"function"==typeof n.play&&n.play()})),h('iframe[src*="youtube.com/embed/"]',t).forEach((function(n){n.hasAttribute("data-autoplay")&&Mt(n),n.onload=function(){n.hasAttribute("data-autoplay")&&Mt(n)}}))}function Mt(n){n.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*")}function xt(n){var t=ut(n);h("video, audio",t).forEach((function(n){n.hasAttribute("data-keepplaying")||"function"!=typeof n.pause||n.pause()})),h('iframe[src*="youtube.com/embed/"]',t).forEach((function(n){/youtube\.com\/embed\//.test(H(n,"src"))&&!n.hasAttribute("data-keepplaying")&&n.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}))}function kt(n){Qn().lazyLoading&&h("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]",ut(n)).forEach((function(n){if(["src","srcset"].forEach((function(t){var e=H(n,"data-"+t);null!=e&&e&&(en(n,t),n.addEventListener("load",(function(){})))})),G(n,"source")){var t=P(n,"video, audio");t&&(t.load(),t.onloadeddata=function(){})}}))}l.setScrollingSpeed=gt,rn.u("bindEvents",(function(){rn.u("onDestroy",mt)}));var At=null,Ot=null,Dt=null;function jt(){var n=cn().g.item,t=cn().g.activeSlide,e=Et(n),o=String(e);t&&(o=o+"-"+Et(t.item)),o=o.replace("/","-").replace("#","");var i=new RegExp("\\b\\s?fp-viewing-[^\\s]+\\b","g");At.className=At.className.replace(i,""),O(At,"fp-viewing-"+o)}function Et(n){if(!n)return null;var t=H(n,"data-anchor"),e=T(n);return null==t&&(t=e),t}function Lt(n,t,e){var o="";Qn().anchors.length&&!Qn().lockAnchors&&(n?(null!=e&&(o=e),null==t&&(t=n),un({L:t}),Rt(o+"/"+t)):null!=n?(un({L:t}),Rt(e)):Rt(e)),jt()}function Rt(n){if(Qn().recordHistory)location.hash=n;else if(a||c)i.history.replaceState(void 0,void 0,"#"+n);else{var t=i.location.href.split("#")[0];i.location.replace(t+"#"+n)}}function Pt(n,t,e){var o="Section"===t?Qn().anchors[n]:H(e,"data-anchor");return encodeURI(Qn().navigationTooltips[n]||o||t+" "+(n+1))}function Ct(n){I(n),un({S:"horizontalNav"});var t=P(this,Tn),e=h(En,P(this,Tn))[0],o=et(cn().p,t).slides[T(P(this,"li"))];rn.l("landscapeScroll",{slides:e,destination:o.item})}var zt,Ft={};function Nt(n,t,e){"all"!==t?Ft[e][t]=n:Object.keys(Ft[e]).forEach((function(t){Ft[e][t]=n}))}function Bt(){return Ft}function It(){var n=P(this,Tn);g(this,Hn)?Bt().m.left&&(un({S:"slideArrow"}),rn.l("moveSlideLeft",{section:n})):Bt().m.right&&(un({S:"slideArrow"}),rn.l("moveSlideRight",{section:n}))}function Ht(){clearTimeout(zt)}function Wt(n,t,e){var o,i,r=P(n,Tn),a=cn().p.filter((function(n){return n.item==r}))[0],u=a.slides.filter((function(n){return n.item==t}))[0],c={slides:n,destiny:t,direction:e,destinyPos:{left:t.offsetLeft},slideIndex:u.index(),section:r,sectionIndex:a.index(),anchorLink:a.anchor,slidesNav:h(Fn,r)[0],slideAnchor:u.anchor,prevSlide:a.activeSlide.item,prevSlideIndex:a.activeSlide.index(),items:{section:a,origin:a.activeSlide,destination:u},localIsResizing:an.O};c.nn=(o=c.prevSlideIndex,i=c.slideIndex,o==i?"none":o>i?"left":"right"),c.direction=c.direction?c.direction:c.nn,c.localIsResizing||un({P:!1}),Qn().onSlideLeave&&!c.localIsResizing&&"none"!==c.nn&&_(Qn().onSlideLeave)&&!1===St("onSlideLeave",c)?un({A:!1}):(O(t,wn),D(B(t),wn),Gt(),c.localIsResizing||(xt(c.prevSlide),kt(t)),function(n){!Qn().loopHorizontal&&Qn().controlArrows&&(Y(h(Wn,n.section),0!==n.slideIndex),Y(h(Vn,n.section),null!=S(n.destiny)))}(c),a.isActive&&!c.localIsResizing&&Lt(c.slideIndex,c.slideAnchor,c.anchorLink),function(n,t,e){var o,i,r=t.destinyPos;if(o=t.slidesNav,i=t.slideIndex,Qn().slidesNavigation&&null!=o&&(D(h(bn,o),wn),O(h("a",h("li",o)[i]),wn)),un({scrollX:Math.round(r.left)}),Qn().css3){var a="translate3d(-"+Math.round(r.left)+"px, 0px, 0px)";l.test.tn[t.sectionIndex]=a,b(ft(h(Rn,n)),dt(a)),clearTimeout(zt),zt=setTimeout((function(){Ut(t)}),Qn().scrollingSpeed)}else l.test.left[t.sectionIndex]=Math.round(r.left),wt(n,Math.round(r.left),Qn().scrollingSpeed,(function(){Ut(t)}))}(n,c))}function Vt(){clearTimeout(zt)}function Ut(n){n.localIsResizing||(_(Qn().afterSlideLoad)&&St("afterSlideLoad",n),un({P:!0}),Tt(n.destiny)),un({A:!1})}function Kt(n,t){gt(0,"internal"),void 0!==t&&un({O:!0}),Wt(P(n,En),n),void 0!==t&&un({O:!1}),gt(Xn().scrollingSpeed,"internal")}Ft.m={up:!0,down:!0,left:!0,right:!0},Ft.k=p({},Ft.m),rn.u("onClickOrTouch",(function(n){var t=n.target;(G(t,In)||P(t,In))&&It.call(t,n)})),l.landscapeScroll=Wt,rn.u("bindEvents",(function(){rn.u("onPerformMovement",Ht)}));var _t=null,qt=null;function Gt(){an.g=null,an.p.map((function(n){var t=g(n.item,wn);n.isActive=t,n.K=g(n.item,Cn),t&&(an.g=n),n.slides.length&&(n.activeSlide=null,n.slides.map((function(t){var e=g(t.item,wn);t.K=g(t.item,Cn),t.isActive=e,e&&(n.activeSlide=t)})))})),function(){var n=an.g,t=!!an.g&&an.g.slides.length,e=an.g?an.g.activeSlide:null;if(!n&&an.p.length&&!cn().T&&_t){var o=Xt(_t,an.p);o&&(an.g=o,an.g.isActive=!0,O(an.g.item,wn)),an.g&&pt(an.g.item.offsetTop)}if(t&&!e&&qt){var i=Xt(qt,an.g.slides);i&&(an.g.activeSlide=i,an.g.activeSlide.isActive=!0,O(an.g.activeSlide.item,wn)),an.g.activeSlide&&Kt(an.g.activeSlide.item,"internal")}}()}function Yt(){var n=h(Qn().sectionSelector,Yn()),t=d(n),e=Array.from(n).map((function(n){return new $t(n)})),o=e.filter((function(n){return n.isVisible})),i=o.reduce((function(n,t){return n.concat(t.slides)}),[]);_t=Qt(an.g),qt=Qt(an.g?an.g.activeSlide:null),an.v=t.length,an.h=o.reduce((function(n,t){return n+t.slides.length}),0),an.p=o,an.G=e,an.slides=i,an.X=an.p.concat(an.slides)}function Qt(n){if(!n)return null;var t=n?n.item:null,e=n._?an.G:an.g.en;if(t){var o=et(e,t);return o?o.index():null}return null}function Xt(n,t){var e,o=n-1,i=n;do{if(e=t[o]||t[i])break;o-=1,i+=1}while(o>=0||i<t.length);return e}var $t=function(n){var t=this;[].push.call(arguments,Qn().sectionSelector),nt.apply(this,arguments),this.on=h(Qn().slideSelector,n),this.en=Array.from(this.on).map((function(n){return new Jt(n,t)})),this.slides=this.en.filter((function(n){return n.isVisible})),this.activeSlide=this.slides.length?this.slides.filter((function(n){return n.isActive}))[0]||this.slides[0]:null};$t.prototype=nt.prototype,$t.prototype.constructor=$t;var Jt=function(n,t){this.parent=t,nt.call(this,n,Qn().slideSelector)};function Zt(){O(h(Qn().sectionSelector,Yn()),Sn),O(h(Qn().slideSelector,Yn()),An)}function ne(){q(y(this),"click")}function te(){X(h(kn));var n=r.createElement("div");n.setAttribute("id","fp-nav");var t=r.createElement("ul");n.appendChild(t),j(n,At);var e=h(kn)[0];O(e,"fp-"+Qn().navigationPosition),Qn().showActiveTooltip&&O(e,"fp-show-active");for(var o="",i=0;i<cn().p.length;i++){var a=cn().p[i],u="";Qn().anchors.length&&(u=a.anchor),o+='<li><a href="#'+encodeURI(u)+'"><span class="fp-sr-only">'+Pt(a.index(),"Section")+"</span><span></span></a>";var c=Qn().navigationTooltips[a.index()];void 0!==c&&""!==c&&(o+='<div class="fp-tooltip fp-'+Qn().navigationPosition+'">'+c+"</div>"),o+="</li>"}h("ul",e)[0].innerHTML=o;var l=h("li",h(kn)[0])[cn().g.index()];O(h("a",l),wn)}function ee(n){n.preventDefault&&I(n),un({S:"verticalNav"});var t=T(P(this,"#fp-nav li"));rn.l("scrollPage",{destination:cn().p[t]})}function oe(n,t){$n("recordHistory",n,t)}function ie(n,t){n||pt(0),$n("autoScrolling",n,t);var e=cn().g.item;if(Qn().autoScrolling&&!Qn().scrollBar)b(Dt,{overflow:"hidden",height:"100%"}),D(At,"fp-scrollable"),oe(Xn().recordHistory,"internal"),b(Yn(),{"-ms-touch-action":"none","touch-action":"none"}),null!=e&&pt(e.offsetTop);else if(b(Dt,{overflow:"visible",height:"initial"}),O(At,"fp-scrollable"),oe(!!Qn().autoScrolling&&Xn().recordHistory,"internal"),b(Yn(),{"-ms-touch-action":"","touch-action":""}),null!=e){b(Dt,{"scroll-behavior":"unset"});var o=ct(e.offsetTop);o.element.scrollTo(0,o.options)}}Jt.prototype=nt.prototype,Jt.prototype.constructor=$t,l.setRecordHistory=oe,l.setAutoScrolling=ie,l.test.setAutoScrolling=ie,l.setFitToSection=ue,l.fitToSection=function(){};var re,ae="scrollSnapAlign"in(re=r.documentElement.style)||"rn"in re||"an"in re;function ue(n,t){ce(n),$n("fitToSection",n,t)}function ce(n){ae&&(Qn().fitToSection&&(!Qn().autoScrolling||Qn().scrollBar)&&n?O:D)(Ot,"fp-snaps")}function le(){var n=Qn().responsive||Qn().responsiveWidth,t=Qn().responsiveHeight,e=n&&i.innerWidth<n,o=t&&i.innerHeight<t;n&&t?fe(e||o):n?fe(e):t&&fe(o)}function fe(n){var t=se();n?t||(ie(!1,"internal"),ue(!1,"internal"),x(h(kn)),O(At,hn),_(Qn().afterResponsive)&&Qn().afterResponsive.call(Yn(),n)):t&&(ie(Xn().autoScrolling,"internal"),ue(Xn().autoScrolling,"internal"),k(h(kn)),D(At,hn),_(Qn().afterResponsive)&&Qn().afterResponsive.call(Yn(),n))}function se(){return g(At,hn)}l.setResponsive=fe,rn.u("bindEvents",(function(){i.addEventListener("load",(function(){Qn().scrollOverflow&&!Qn().scrollBar&&(de.un(),de.cn())})),Qn().scrollOverflow&&tt(cn().X).forEach((function(n){n.addEventListener("scroll",de.ln),n.addEventListener("wheel",de.sn),n.addEventListener("keydown",de.sn),n.addEventListener("keydown",de.vn)}))}));var ve,de={dn:null,hn:null,pn:null,sn:function(n){if(!an.P)return I(n),!1},cn:function(){r.activeElement===this.dn&&this.dn.blur(),h(".fp-overflow.active",cn().g.item)[0]&&(this.dn=h(zn,cn().g.item)[0],this.dn.focus())},un:function(){Qn().scrollOverflowMacStyle&&!u&&O(At,"fp-scroll-mac"),cn().X.forEach((function(n){if(!(g(n.item,"fp-noscroll")||g(n.item,xn)||g(n.item,"fp-auto-height-responsive")&&se())){var t=de.gn(n.item),e=de.mn(n.item);e?(O(t,Cn),t.setAttribute("tabindex","-1")):(D(t,Cn),t.removeAttribute("tabindex")),n.K=e}}))},gn:function(n){return h(Dn,n)[0]||n},wn:function(n){return n._&&n.activeSlide?n.activeSlide.K:n.K},mn:function(n){return n.scrollHeight>i.innerHeight},bn:function(n,t){if(!an.P)return!1;if(!Qn().scrollOverflow)return!0;var e=de.gn(t),o=e.scrollTop,i="up"===n&&o<=0,r="down"===n&&e.scrollHeight<=e.offsetHeight+o,a=i||r;return a||(this.hn=(new Date).getTime()),a},yn:function(){this.pn=(new Date).getTime();var n=this.pn-de.hn,t=(a||c)&&an.N,e=an.B&&n>600;return t&&n>400||e},ln:(ve=0,function(n){var t=n.target.scrollTop,e="none"!==an.C?an.C:ve<t?"down":"up";ve=t,_(Qn().onScrollOverflow)&&St("onScrollOverflow",{position:t,direction:e}),g(n.target,Cn)&&an.P&&de.bn(e,n.target)&&de.yn()&&rn.l("onScrollOverflowScrolled",{direction:e})})};function he(n){Qn().verticalCentered&&(de.wn(n)||g(n.item,Pn)||O(n.item,Pn))}function pe(n){var t=n.slides.length,e=n.on,o=n.slides,i=100*t,a=100/t;if(!h(En,n.item)[0]){var u=r.createElement("div");u.className=jn,L(e,u);var c=r.createElement("div");c.className=Ln,L(e,c)}b(h(Rn,n.item),{width:i+"%"}),t>1&&(Qn().controlArrows&&function(n){var t=n.item,e=[Q(Qn().controlArrowsHTML[0]),Q(Qn().controlArrowsHTML[1])];C(h(En,t)[0],e),O(e,Bn),O(e[0],Hn),O(e[1],"fp-next"),"#fff"!==Qn().controlArrowColor&&(b(h(Vn,t),{"border-color":"transparent transparent transparent "+Qn().controlArrowColor}),b(h(Wn,t),{"border-color":"transparent "+Qn().controlArrowColor+" transparent transparent"})),Qn().loopHorizontal||x(h(Wn,t))}(n),Qn().slidesNavigation&&function(n){var t=n.item,e=n.slides.length;j(Q('<div class="fp-slidesNav"><ul></ul></div>'),t);var o=h(Fn,t)[0];O(o,"fp-"+Qn().slidesNavPosition);for(var i=0;i<e;i++)j(Q('<li><a href="#"><span class="fp-sr-only">'+Pt(i,"Slide",h(On,t)[i])+"</span><span></span></a></li>"),h("ul",o)[0]);b(o,{"margin-left":"-"+o.innerWidth/2+"px"});var r=n.activeSlide?n.activeSlide.index():0;O(h("a",h("li",o)[r]),wn)}(n)),o.forEach((function(n){b(n.item,{width:a+"%"}),Qn().verticalCentered&&he(n)}));var l=n.activeSlide||null;null!=l&&an.g&&(0!==an.g.index()||0===an.g.index()&&0!==l.index())?Kt(l.item,"internal"):O(e[0],wn)}var ge,me=null;function we(n){var t=n.item,e=n.on.length,o=n.index();!cn().g&&n.isVisible&&(O(t,wn),Gt()),me=cn().g.item,Qn().paddingTop&&b(t,{"padding-top":Qn().paddingTop}),Qn().paddingBottom&&b(t,{"padding-bottom":Qn().paddingBottom}),void 0!==Qn().sectionsColor[o]&&b(t,{"background-color":Qn().sectionsColor[o]}),void 0!==Qn().anchors[o]&&t.setAttribute("data-anchor",n.anchor),e||he(n)}l.getActiveSection=function(){return cn().g};var be={attributes:!1,subtree:!0,childList:!0,characterData:!0};function ye(){return d(h(Qn().slideSelector,Yn())).length!==cn().h}function Se(n){var t=ye();(ye()||d(h(Qn().sectionSelector,Yn())).length!==cn().v)&&!an.V&&(Qn().observer&&ge&&ge.disconnect(),Yt(),Gt(),Qn().anchors=[],X(h(kn)),Zt(),Jn(),Qn().navigation&&te(),t&&(X(h(Fn)),X(h(In))),cn().p.forEach((function(n){n.slides.length?t&&pe(n):we(n)}))),Qn().observer&&ge&&ge.observe(h(dn)[0],be)}rn.u("bindEvents",(function(){var n,t,e;Qn().observer&&"MutationObserver"in window&&(n=h(dn)[0],t=be,(e=new MutationObserver(Se)).observe(n,t),ge=e),rn.u("contentChanged",Se)})),l.Sn=Se;var Te=function(){var n=!1;try{var t=Object.defineProperty({},"passive",{get:function(){n=!0}});V("testPassive",null,t),K("testPassive",null,t)}catch(n){}return function(){return n}}();function Me(){return!!Te()&&{passive:!1}}(new Date).getTime();var xe,ke,Ae,Oe,De,je,Ee=(ke=(new Date).getTime(),function(n,t){var e=(new Date).getTime(),o="wheel"===n?Qn().scrollingSpeed:100;return e-ke>=o&&(xe=t(),ke=e),void 0===xe||xe}),Le=(De=(new Date).getTime(),je=[],{Tn:function(n){var t=(n=n||i.event).wheelDelta||-n.deltaY||-n.detail,e=Math.max(-1,Math.min(1,t)),o=void 0!==n.wheelDeltaX||void 0!==n.deltaX;Ae=Math.abs(n.wheelDeltaX)<Math.abs(n.wheelDelta)||Math.abs(n.deltaX)<Math.abs(n.deltaY)||!o;var r=(new Date).getTime();Oe=e<0?"down":"up",je.length>149&&je.shift(),je.push(Math.abs(t));var a=r-De;De=r,a>200&&(je=[])},Mn:function(){var n=tn(je,10)>=tn(je,70);return!!je.length&&n&&Ae},xn:function(){return Oe}});function Re(){var n=Qn().css3?N(Qn())+m():nn(cn().p).item.offsetTop+nn(cn().p).item.offsetHeight,t=ct(n);l.test.top=-n+"px",b(r.body,{"scroll-snap-type":"none"}),b(Dt,{"scroll-behavior":"unset"}),un({P:!1}),wt(t.element,t.options,Qn().scrollingSpeed,(function(){setTimeout((function(){un({T:!0}),un({P:!0})}),30)}))}function Pe(){Yn().getBoundingClientRect().bottom>=0&&Ce()}function Ce(){var n=ct(nn(cn().p).item.offsetTop);un({P:!1}),wt(n.element,n.options,Qn().scrollingSpeed,(function(){un({P:!0}),un({T:!1}),un({kn:!1})}))}var ze,Fe,Ne,Be,Ie,He=(ze=!1,Fe={},Ne={},function(n,t,e){switch(n){case"set":Fe[t]=(new Date).getTime(),Ne[t]=e;break;case"isNewKeyframe":var o=(new Date).getTime();ze=o-Fe[t]>Ne[t]}return ze});function We(){var n=h(".fp-auto-height")[0]||se()&&h(".fp-auto-height-responsive")[0];Qn().lazyLoading&&n&&h(".fp-section:not(.active)").forEach((function(n){var t,e,o,i,r;e=(t=n.getBoundingClientRect()).top,o=t.bottom,i=e+2<an.W&&e>0,r=o>2&&o<an.W,(i||r)&&kt(n)}))}function Ve(n,t){var e;e=n,Qn().menu&&Qn().menu.length&&h(Qn().menu).forEach((function(n){null!=n&&(D(h(bn,n),wn),O(h('[data-menuanchor="'+e+'"]',n),wn))})),function(n,t){var e=h(kn)[0];Qn().navigation&&null!=e&&"none"!==e.style.display&&(D(h(bn,e),wn),O(n?h('a[href="#'+n+'"]',e):h("a",h("li",e)[t]),wn))}(n,t)}function Ue(n,t){if(_(Qn().beforeLeave))return Ee(cn().S,(function(){return St(n,t)}))}function Ke(n,t,e){var o=n.item;if(null!=o){var i,r,a=function(n){var t=n.offsetHeight,e=n.offsetTop,o=e,i=e>an.H,r=o-m()+t,a=Qn().bigSectionsDestination;return t>m()?(i||a)&&"bottom"!==a||(o=r):(i||an.O&&null==S(n))&&(o=r),un({H:o}),o}(o),u={element:o,callback:t,isMovementUp:e,dtop:a,yMovement:st(cn().g,o),anchorLink:n.anchor,sectionIndex:n.index(),activeSlide:n.activeSlide?n.activeSlide.item:null,leavingSection:cn().g.index()+1,localIsResizing:an.O,items:{origin:cn().g,destination:n},direction:null};if(!(cn().g.item==o&&!an.O||Qn().scrollBar&&N(Qn())===u.dtop&&!g(o,xn))){if(null!=u.activeSlide&&(i=H(u.activeSlide,"data-anchor"),r=T(u.activeSlide,null)),!u.localIsResizing){var c=u.yMovement;if(void 0!==e&&(c=e?"up":"down"),u.direction=c,_(Qn().beforeLeave)&&!1===Ue("beforeLeave",u))return;if(_(Qn().onLeave)&&!St("onLeave",u))return}Qn().autoScrolling&&Qn().continuousVertical&&void 0!==u.isMovementUp&&(!u.isMovementUp&&"up"==u.yMovement||u.isMovementUp&&"down"==u.yMovement)&&(u=function(n){un({V:!0});var t=cn().g.item;return n.isMovementUp?z(t,J(t,Tn)):C(t,Z(t,Tn).reverse()),pt(cn().g.item.offsetTop),function(){for(var n=h(Dn),t=0;t<n.length;t++)Kt(n[t],"internal")}(),n.An=t,n.dtop=n.element.offsetTop,n.yMovement=st(cn().g,n.element),n}(u)),u.localIsResizing||xt(cn().g.item),O(o,wn),D(B(o),wn),Gt(),kt(o),un({P:l.test.On}),Lt(r,i,u.anchorLink),function(n){var t=Qn().scrollingSpeed<700,e=t?700:Qn().scrollingSpeed;if(un({C:"none",scrollY:Math.round(n.dtop)}),rn.l("onPerformMovement"),Qn().css3&&Qn().autoScrolling&&!Qn().scrollBar)ht("translate3d(0px, -"+Math.round(n.dtop)+"px, 0px)",!0),Qn().scrollingSpeed?(clearTimeout(Be),Be=setTimeout((function(){_e(n),un({P:!t||l.test.On})}),Qn().scrollingSpeed)):_e(n);else{var o=ct(n.dtop);l.test.top=-n.dtop+"px",b(Dt,{"scroll-behavior":"unset"}),clearTimeout(Be),wt(o.element,o.options,Qn().scrollingSpeed,(function(){Qn().scrollBar?Be=setTimeout((function(){_e(n)}),30):(_e(n),un({P:!t||l.test.On}))}))}t&&(clearTimeout(Ie),Ie=setTimeout((function(){un({P:!0})}),e))}(u),un({j:u.anchorLink}),Ve(u.anchorLink,u.sectionIndex)}}}function _e(n){Qn().fitToSection&&g(h(".fp-section.active")[0],xn)&&b(r.body,{"scroll-snap-type":"none"}),un({T:!1}),function(n){null!=n.An&&(n.isMovementUp?z(h(Tn)[0],n.An):C(h(Tn)[cn().p.length-1],n.An),pt(cn().g.item.offsetTop),function(){for(var n=h(Dn),t=0;t<n.length;t++)Kt(n[t],"internal")}(),un({V:!1}))}(n),_(Qn().afterLoad)&&!n.localIsResizing&&St("afterLoad",n),Gt(),n.localIsResizing||Tt(n.element),O(n.element,yn),D(B(n.element),yn),We(),de.cn(),un({P:!0}),_(n.callback)&&n.callback()}function qe(){var n=cn().g.next();n||!Qn().loopBottom&&!Qn().continuousVertical||(n=cn().p[0]),null!=n?Ke(n,null,!1):Yn().scrollHeight<At.scrollHeight&&rn.l("scrollBeyondFullpage")}function Ge(){var n=cn().g.prev();n||!Qn().loopTop&&!Qn().continuousVertical||(n=nn(cn().p)),null!=n&&Ke(n,null,!0)}l.moveTo=moveTo,l.getScrollY=function(){return an.scrollY},rn.u("onDestroy",(function(){clearTimeout(Be),clearTimeout(Ie)})),l.moveSectionDown=qe,l.moveSectionUp=Ge;var Ye=0;function Qe(n){Qn().autoScrolling&&(an.P&&(n.pageY<Ye&&Bt().m.up?Ge():n.pageY>Ye&&Bt().m.down&&qe()),Ye=n.pageY)}function Xe(n){if(Bt().m[n]){var t="down"===n?qe:Ge;Qn().scrollOverflow&&de.wn(cn().g)?de.bn(n,cn().g.item)&&de.yn()&&t():t()}}var $e,Je,Ze,no=0,to=0,eo=0,oo=0,io=(i.PointerEvent&&(Ze={down:"pointerdown",move:"pointermove"}),Ze),ro={Dn:"ontouchmove"in window?"touchmove":io.move,jn:"ontouchstart"in window?"touchstart":io.down};function ao(n){var t=P(n.target,Tn)||cn().g.item,e=de.wn(cn().g);if(uo(n)){un({N:!0,B:!1}),Qn().autoScrolling&&(!e||e&&!an.P)&&I(n);var o=fo(n);eo=o.y,oo=o.x;var r=Math.abs(no-eo)>i.innerHeight/100*Qn().touchSensitivity,a=Math.abs(to-oo)>w()/100*Qn().touchSensitivity,u=h(En,t).length&&Math.abs(to-oo)>Math.abs(no-eo),c=no>eo?"down":"up";un({C:u?to>oo?"right":"left":c}),u?!an.A&&a&&(to>oo?Bt().m.right&&rn.l("moveSlideRight",{section:t}):Bt().m.left&&rn.l("moveSlideLeft",{section:t})):Qn().autoScrolling&&an.P&&r&&Xe(c)}}function uo(n){return void 0===n.pointerType||"mouse"!=n.pointerType}function co(n){if(Qn().fitToSection&&un({R:!1}),uo(n)){var t=fo(n);no=t.y,to=t.x}V("touchend",lo)}function lo(){K("touchend",lo),un({N:!1})}function fo(n){var t={};return t.y=void 0!==n.pageY&&(n.pageY||n.pageX)?n.pageY:n.touches[0].pageY,t.x=void 0!==n.pageX&&(n.pageY||n.pageX)?n.pageX:n.touches[0].pageX,c&&uo(n)&&Qn().scrollBar&&void 0!==n.touches&&(t.y=n.touches[0].pageY,t.x=n.touches[0].pageX),t}function so(n){Qn().autoScrolling&&uo(n)&&Bt().m.up&&(an.P||I(n))}function vo(n,t){var e=null==t?cn().g.item:t,o=et(an.p,e),i=h(En,e)[0];if(!(null==i||an.A||o.slides.length<2)){var r=o.activeSlide,a="left"===n?r.prev():r.next();if(!a){if(!Qn().loopHorizontal)return;a="left"===n?nn(o.slides):o.slides[0]}un({A:!l.test.On}),Wt(i,a.item,n)}}function ho(n){vo("left",n)}function po(n){vo("right",n)}function go(n){var t=cn().p.filter((function(t){return t.anchor===n}))[0];if(!t){var e=void 0!==n?n-1:0;t=cn().p[e]}return t}function mo(n){null!=n&&Wt(P(n,En),n)}function wo(n,t){var e=go(n);if(null!=e){var o=function(n,t){var e=t.slides.filter((function(t){return t.anchor===n}))[0];return null==e&&(n=void 0!==n?n:0,e=t.slides[n]),e?e.item:null}(t,e);e.anchor===an.j||g(e.item,wn)?mo(o):Ke(e,(function(){mo(o)}))}}function bo(n,t){var e=go(n);void 0!==t?wo(n,t):null!=e&&Ke(e)}function yo(){clearTimeout(Je),U("keydown",To),U("keyup",Mo)}function So(){var n=r.activeElement;return G(n,"textarea")||G(n,"input")||G(n,"select")||"true"==H(n,"contentEditable")||""==H(n,"contentEditable")}function To(n){clearTimeout(Je);var t=n.keyCode,e=[37,39].indexOf(t)>-1,o=Qn().autoScrolling||e;9===t?function(n){var t=n.shiftKey,e=r.activeElement,o=ko(ut(cn().g.item));function i(n){return I(n),o[0]?o[0].focus():null}(function(n){var t=ko(r),e=t.indexOf(r.activeElement),o=t[n.shiftKey?e-1:e+1],i=P(o,On),a=P(o,Tn);return!i&&!a})(n)||(e?null==P(e,".fp-section.active,.fp-section.active .fp-slide.active")&&(e=i(n)):i(n),(!t&&e==o[o.length-1]||t&&e==o[0])&&I(n))}(n):!So()&&Qn().keyboardScrolling&&o&&($e=n.ctrlKey,Je=setTimeout((function(){!function(n){var t=n.shiftKey,e=r.activeElement,o=G(e,"video")||G(e,"audio"),i=de.bn("up",cn().g.item),a=de.bn("down",cn().g.item),u=[37,39].indexOf(n.keyCode)>-1;if(Oo(n),an.P||u)switch(un({S:"keydown"}),n.keyCode){case 38:case 33:Bt().k.up&&i&&(an.T?rn.l("onKeyDown",{e:n}):Ge());break;case 32:if(t&&Bt().k.up&&!o&&i){Ge();break}case 40:case 34:if(Bt().k.down&&a){if(an.T)return;32===n.keyCode&&o||qe()}break;case 36:Bt().k.up&&bo(1);break;case 35:Bt().k.down&&bo(cn().p.length);break;case 37:Bt().k.left&&ho();break;case 39:Bt().k.right&&po()}}(n)}),0))}function Mo(n){an.I&&($e=n.ctrlKey)}function xo(){un({I:!1}),$e=!1}function ko(n){return[].slice.call(h('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',n)).filter((function(n){return"-1"!==H(n,"tabindex")&&null!==n.offsetParent}))}function Ao(n){So()||Oo(n)}function Oo(n){(function(n){return[40,38,32,33,34].indexOf(n.keyCode)>-1&&!an.T})(n)&&!P(n.target,zn)&&n.preventDefault()}l.moveSlideLeft=ho,l.moveSlideRight=po,l.moveTo=bo,rn.u("bindEvents",(function(){V("blur",xo),W("keydown",To),At.addEventListener("keydown",Ao),W("keyup",Mo),rn.u("onDestroy",yo)}));var Do=(new Date).getTime(),jo=[];function Eo(n){n?(function(){var n,t="";i.addEventListener?n="addEventListener":(n="attachEvent",t="on");var e="onwheel"in r.createElement("div")?"wheel":void 0!==r.onmousewheel?"mousewheel":"DOMMouseScroll",o=Me();"DOMMouseScroll"==e?r[n](t+"MozMousePixelScroll",Lo,o):r[n](t+e,Lo,o)}(),Yn().addEventListener("mousedown",Ro),Yn().addEventListener("mouseup",Po)):(r.addEventListener?(U("mousewheel",Lo,!1),U("wheel",Lo,!1),U("MozMousePixelScroll",Lo,!1)):r.detachEvent("onmousewheel",Lo),Yn().removeEventListener("mousedown",Ro),Yn().removeEventListener("mouseup",Po))}function Lo(n){var t=(new Date).getTime(),e=g(h(".fp-completely")[0],"fp-normal-scroll"),o=function(n,t){(new Date).getTime();var e=cn().T&&n.getBoundingClientRect().bottom>=0&&"up"===Le.xn(),o=cn().kn;if(o)return I(t),!1;if(cn().T){if(e){var i;if(!(o||He("isNewKeyframe","beyondFullpage")&&Le.Mn()))return(i=ct(nn(cn().p).item.offsetTop+nn(cn().p).item.offsetHeight)).element.scrollTo(0,i.options),un({kn:!1}),I(t),!1;if(Le.Mn())return e=!1,un({kn:!0}),un({S:"wheel"}),Ce(),I(t),!1}else He("set","beyondFullpage",1e3);if(!o&&!e)return!0}}(Yn(),n);if(an.B||un({N:!1,B:!0,C:"none"}),!Bt().m.down&&!Bt().m.up)return I(n),!1;if(o)return!0;if(!1===o)return I(n),!1;if(Qn().autoScrolling&&!$e&&!e){var r=(n=n||i.event).wheelDelta||-n.deltaY||-n.detail,a=Math.max(-1,Math.min(1,r)),u=void 0!==n.wheelDeltaX||void 0!==n.deltaX,c=Math.abs(n.wheelDeltaX)<Math.abs(n.wheelDelta)||Math.abs(n.deltaX)<Math.abs(n.deltaY)||!u,l=a<0?"down":a>0?"up":"none";jo.length>149&&jo.shift(),jo.push(Math.abs(r)),Qn().scrollBar&&I(n);var f=t-Do;return Do=t,f>200&&(jo=[]),un({F:l}),an.P&&tn(jo,10)>=tn(jo,70)&&c&&(un({S:"wheel"}),Xe(a<0?"down":"up")),!1}Qn().fitToSection&&un({R:!1})}function Ro(n){var t;2==n.which&&(t=n.pageY,Ye=t,Yn().addEventListener("mousemove",Qe))}function Po(n){2==n.which&&Yn().removeEventListener("mousemove",Qe)}function Co(n){n?(Eo(!0),function(){if(a||c){Qn().autoScrolling&&(At.removeEventListener(ro.Dn,so,{passive:!1}),At.addEventListener(ro.Dn,so,{passive:!1}));var n=Qn().touchWrapper;n.removeEventListener(ro.jn,co),n.removeEventListener(ro.Dn,ao,{passive:!1}),n.addEventListener(ro.jn,co),n.addEventListener(ro.Dn,ao,{passive:!1})}}()):(Eo(!1),function(){if(a||c){Qn().autoScrolling&&(At.removeEventListener(ro.Dn,ao,{passive:!1}),At.removeEventListener(ro.Dn,so,{passive:!1}));var n=Qn().touchWrapper;n.removeEventListener(ro.jn,co),n.removeEventListener(ro.Dn,ao,{passive:!1})}}())}l.setMouseWheelScrolling=Eo;var zo=!0;function Fo(){["mouseenter","touchstart","mouseleave","touchend"].forEach((function(n){U(n,Bo,!0)}))}function No(n,t){document["fp_"+n]=t,W(n,Bo,!0)}function Bo(n){var t=n.type,e=!1,o="mouseleave"===t?n.toElement||n.relatedTarget:n.target;o!=document&&o?("touchend"===t&&(zo=!1,setTimeout((function(){zo=!0}),800)),("mouseenter"!==t||zo)&&(Qn().normalScrollElements.split(",").forEach((function(n){if(!e){var t=G(o,n),i=P(o,n);(t||i)&&(l.shared.En||Co(!1),l.shared.En=!0,e=!0)}})),!e&&l.shared.En&&(Co(!0),l.shared.En=!1))):Co(!0)}function Io(n,t){gt(0,"internal"),bo(n,t),gt(Xn().scrollingSpeed,"internal")}rn.u("bindEvents",(function(){Qn().normalScrollElements&&(["mouseenter","touchstart"].forEach((function(n){No(n,!1)})),["mouseleave","touchend"].forEach((function(n){No(n,!0)}))),rn.u("onDestroy",Fo)})),l.silentMoveTo=Io;var Ho,Wo=m(),Vo=w(),Uo=!1;function Ko(){clearTimeout(Ho),K("resize",_o)}function _o(){Uo||(Qn().autoScrolling&&!Qn().scrollBar||!Qn().fitToSection)&&Go(m()),Uo=!0,clearTimeout(Ho),Ho=setTimeout((function(){!function(){if(un({O:!0}),Go(""),!Qn().fitToSection||Qn().autoScrolling||an.T||function(){if(!Qn().autoScrolling||Qn().scrollBar){var n=.01*i.innerHeight;r.documentElement.style.setProperty("--vh","".concat(n,"px"))}}(),rn.l("contentChanged"),Gt(),le(),a){var n=r.activeElement;if(!G(n,"textarea")&&!G(n,"input")&&!G(n,"select")){var t=m();Math.abs(t-Wo)>20*Math.max(Wo,t)/100&&(qo(!0),Wo=t)}}else e=m(),o=w(),an.W===e&&Vo===o||(un({W:e}),Vo=o,qo(!0));var e,o;un({O:!1})}(),Uo=!1}),400)}function qo(n){if(!g(Yn(),gn)){un({O:!0,W:m(),Ln:w()});for(var t=cn().p,e=0;e<t.length;++e){var o=t[e],r=h(En,o.item)[0];o.slides.length>1&&Wt(r,o.activeSlide.item)}Qn().scrollOverflow&&de.un();var a=cn().g.index();an.T||a&&Io(a+1),un({O:!1}),_(Qn().afterResize)&&n&&Qn().afterResize.call(Yn(),i.innerWidth,i.innerHeight),_(Qn().afterReBuild)&&!n&&Qn().afterReBuild.call(Yn()),q(Yn(),"afterRebuild")}}function Go(n){var t=""===n?"":n+"px";cn().p.forEach((function(n){b(n.item,{height:t})}))}function Yo(){var n,t,e=i.location.hash;if(e.length){var o=e.replace("#","").split("/"),r=e.indexOf("#/")>-1;n=r?"/"+o[1]:decodeURIComponent(o[0]);var a=r?o[2]:o[1];a&&a.length&&(t=decodeURIComponent(a))}return{section:n,Z:t}}function Qo(){K("hashchange",Xo)}function Xo(){if(!an.D&&!Qn().lockAnchors){var n=Yo(),t=n.section,e=n.Z,o=void 0===an.j,i=void 0===an.j&&void 0===e&&!an.A;t&&t.length&&(t&&t!==an.j&&!o||i||!an.A&&an.L!=e)&&rn.l("onScrollPageAndSlide",{Rn:t,slideAnchor:e})}}function $o(n){var t=n.target;P(t,Qn().menu+" [data-menuanchor]")&&Jo.call(t,n)}function Jo(n){un({S:"menu"}),!h(Qn().menu)[0]||!Qn().lockAnchors&&Qn().anchors.length||(I(n),rn.l("onMenuClick",{anchor:H(this,"data-menuanchor")}))}function Zo(n){var t=n.target;t&&P(t,"#fp-nav a")?ee.call(t,n.e):G(t,".fp-tooltip")?ne.call(t):(G(t,Nn)||null!=P(t,Nn))&&Ct.call(t,n.e)}l.reBuild=qo,rn.u("bindEvents",(function(){V("resize",_o),rn.u("onDestroy",Ko)})),l.setLockAnchors=function(n){Qn().lockAnchors=n},rn.u("bindEvents",(function(){V("hashchange",Xo),rn.u("onDestroy",Qo)})),rn.u("bindEvents",(function(){W("wheel",Le.Tn,Me()),rn.u("scrollBeyondFullpage",Re),rn.u("onKeyDown",Pe)})),rn.u("bindEvents",(function(){rn.u("onClickOrTouch",$o)})),rn.u("bindEvents",(function(){rn.u("onClickOrTouch",Zo)}));var ni,ti=0;function ei(n){var t,e,o,i,a;if(!an.O&&cn().g&&(nn(cn().p),!cn().T&&!cn().kn&&(!Qn().autoScrolling||Qn().scrollBar))){var u=N(Qn()),c=function(n){var t=n>ti?"down":"up";return ti=n,un({H:n}),t}(u),l=0,f=u+m()/2,s=At.scrollHeight-m()===u,v=cn().p;if(un({scrollY:u}),s)l=v.length-1;else if(u)for(var d=0;d<v.length;++d)v[d].item.offsetTop<=f&&(l=d);else l=0;if(o=c,i=cn().g.item.offsetTop,a=i+m(),("up"==o?a>=N(Qn())+m():i<=N(Qn()))&&(g(cn().g.item,yn)||(O(cn().g.item,yn),D(B(cn().g.item),yn))),e=(t=v[l]).item,!t.isActive){un({D:!0});var h,p,w=cn().g.item,y=cn().g.index()+1,S=st(cn().g,e),T=t.anchor,M=t.index()+1,x=t.activeSlide,k={g:w,sectionIndex:M-1,anchorLink:T,element:e,leavingSection:y,direction:S,items:{origin:cn().g,destination:t}};x&&(p=x.anchor,h=x.index()),an.P&&(O(e,wn),D(B(e),wn),_(Qn().beforeLeave)&&Ue("beforeLeave",k),_(Qn().onLeave)&&St("onLeave",k),_(Qn().afterLoad)&&St("afterLoad",k),xt(w),kt(e),Tt(e),Ve(T,M-1),Qn().anchors.length&&un({j:T}),Lt(h,p,T),Gt()),Qn().fitToSection&&(clearTimeout(ni),ni=setTimeout((function(){un({D:!1}),an.p.filter((function(n){var t=n.item.getBoundingClientRect();return Math.round(t.bottom)===Math.round(m())||0===Math.round(t.top)})).length||b(r.body,{"scroll-snap-type":"y mandatory"})}),300))}}}function oi(n,t){void 0!==t?(t=t.replace(/ /g,"").split(",")).forEach((function(t){Nt(n,t,"k")})):(Nt(n,"all","k"),Qn().keyboardScrolling=n)}function ii(n){var t=n.index();void 0!==Qn().anchors[t]&&n.isActive&&Ve(Qn().anchors[t],t),Qn().menu&&Qn().css3&&null!=P(h(Qn().menu)[0],dn)&&h(Qn().menu).forEach((function(n){At.appendChild(n)}))}function ri(){b(function(n,t){var e=[n];do{n=n.parentNode,e.push(n)}while(!G(n,"body"));return e}(Yn()),{height:"100%",position:"relative"}),O(Yn(),vn),O(Ot,mn),un({W:m()}),D(Yn(),gn),Zt();for(var n=cn().G,t=0;t<n.length;t++){var e=n[t],o=e.on;e.item.setAttribute("data-fp-styles",H(e.item,"style")),we(e),ii(e),o.length>0&&pe(e)}Qn().fixedElements&&Qn().css3&&h(Qn().fixedElements).forEach((function(n){At.appendChild(n)})),Qn().navigation&&te(),h('iframe[src*="youtube.com/embed/"]',Yn()).forEach((function(n){var t,e;e=H(t=n,"src"),t.setAttribute("src",e+(/\?/.test(e)?"&":"?")+"enablejsapi=1")}))}function ai(){var n,t,e=cn().g,o=cn().g.item;O(o,yn),kt(o),We(),Tt(o),t=go((n=Yo()).section),n.section&&t&&(void 0===t||t.index()!==T(me))||!_(Qn().afterLoad)||St("afterLoad",{g:o,element:o,direction:null,anchorLink:e.anchor,sectionIndex:e.index(),items:{origin:cn().g,destination:cn().g}}),_(Qn().afterRender)&&St("afterRender")}function ui(n,t){void 0!==t?(t=t.replace(/ /g,"").split(",")).forEach((function(t){Nt(n,t,"m")})):Nt(n,"all","m")}function ci(){var n=Yo(),t=n.section,e=n.Z;t&&(Qn().animateAnchor?wo(t,e):Io(t,e))}function li(){var n=Qn().licenseKey;Qn()&&an.Pn||r.domain.indexOf("alvarotrigo.com")>-1?n&&n.length:(s("error","Fullpage.js requires a `licenseKey` option. Read about it on the following URL:"),s("error","https://github.com/alvarotrigo/fullPage.js#options")),g(Ot,mn)?s("error","Fullpage.js can only be initialized once and you are doing it multiple times!"):(Qn().continuousVertical&&(Qn().loopTop||Qn().loopBottom)&&(Qn().continuousVertical=!1,s("warn","Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),!Qn().scrollOverflow||!Qn().scrollBar&&Qn().autoScrolling||s("warn","Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox"),!Qn().continuousVertical||!Qn().scrollBar&&Qn().autoScrolling||(Qn().continuousVertical=!1,s("warn","Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),f.forEach((function(n){Qn()[n]&&s("warn","fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: "+n)})),Qn().anchors.forEach((function(n){var t=[].slice.call(h("[name]")).filter((function(t){return H(t,"name")&&H(t,"name").toLowerCase()==n.toLowerCase()})),e=[].slice.call(h("[id]")).filter((function(t){return H(t,"id")&&H(t,"id").toLowerCase()==n.toLowerCase()}));if(e.length||t.length){s("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");var o=e.length?"id":"name";(e.length||t.length)&&s("error",'"'+n+'" is is being used by another element `'+o+"` property")}})))}function fi(n,t){var e;if(At=h("body")[0],Ot=h("html")[0],Dt=h("html, body"),!g(Ot,mn))return"touchWrapper",e="string"==typeof n?h(n)[0]:n,Un.touchWrapper=e,function(n){Gn=p({},Un,n),qn=Object.assign({},Gn)}(t),function(n){Kn=n}("string"==typeof n?h(n)[0]:n),rn.l("onInitialise"),li(),l.getFullpageData=function(){return{options:Qn()}},l.version="4.0.7",l.test=Object.assign(l.test,{top:"0px",J:"translate3d(0px, 0px, 0px)",tn:function(){for(var n=[],t=0;t<h(Qn().sectionSelector,Yn()).length;t++)n.push("translate3d(0px, 0px, 0px)");return n}(),left:function(){for(var n=[],t=0;t<h(Qn().sectionSelector,Yn()).length;t++)n.push(0);return n}(),options:Qn(),setAutoScrolling:null}),l.shared=Object.assign(l.shared,{Cn:null,En:!1}),i.fullpage_api=l,Yn()&&(rn.l("beforeInit"),Yt(),Gt(),Qn().scrollBar=Qn().scrollBar||Qn().hybrid,Jn(),ri(),ce(!0),ui(!0),Co(!0),ie(Qn().autoScrolling,"internal"),le(),jt(),"complete"===r.readyState&&ci(),V("load",ci),ai(),Yt(),Gt(),rn.l("bindEvents")),i.fullpage_api;li()}return rn.u("onDestroy",(function(){clearTimeout(ni),clearTimeout(void 0)})),rn.u("bindEvents",(function(){V("scroll",ei),r.body.addEventListener("scroll",ei),rn.u("onScrollPageAndSlide",(function(n){wo(n.Rn,n.slideAnchor)})),rn.u("onMenuClick",(function(n){bo(n.anchor,void 0)})),rn.u("onScrollOverflowScrolled",(function(n){("down"===n.direction?qe:Ge)()})),rn.u("scrollPage",(function(n){Ke(n.destination)}))})),rn.u("onDestroy",(function(){K("scroll",ei)})),l.getActiveSlide=function(){return yt(cn().g.activeSlide)},l.getScrollX=function(){return an.scrollX},rn.u("bindEvents",(function(){rn.u("onDestroy",Vt),rn.u("landscapeScroll",(function(n){Wt(n.slides,n.destination)})),rn.u("moveSlideRight",(function(n){po(n.section)})),rn.u("moveSlideLeft",(function(n){ho(n.section)}))})),rn.u("bindEvents",(function(){var n=Qn().credits.position,t=["left","right"].indexOf(n)>-1?"".concat(n,": 0;"):"",e='\n        <div class="fp-watermark" style="'.concat(t,'">\n            <a href="https://alvarotrigo.com/fullPage/" \n                rel="nofollow noopener" \n                target="_blank" \n                style="text-decoration:none; color: #000;">\n                    ').concat(Qn().credits.label,"\n            </a>\n        </div>\n    "),o=nn(an.p),i=Qn().credits.enabled&&!an.Pn;o&&o.item&&i&&o.item.insertAdjacentHTML("beforeend",e)})),function(){rn.u("onInitialise",(function(){var t,u;un({Pn:(Qn().licenseKey,t=Qn().licenseKey,u=function(t){var e=parseInt("514").toString(16);if(!t||t.length<29||4===t.split(n[0]).length)return null;var o=["Each","for"][i()]().join(""),u=t[["split"]]("-"),c=[];u[o]((function(n,t){if(t<4){var o=function(n){var t=n[n.length-1],e=["NaN","is"][i()]().join("");return window[e](t)?r(t):function(n){return n-wn.length}(t)}(n);c.push(o);var a=r(n[o]);if(1===t){var u=["pa","dS","t","art"].join("");a=a.toString()[u](2,"0")}e+=a,0!==t&&1!==t||(e+="-")}}));var l=0,f="";return t.split("-").forEach((function(n,t){if(t<4){for(var e=0,o=0;o<4;o++)o!==c[t]&&(e+=Math.abs(r(n[o])),isNaN(n[o])||l++);var i=a(e);f+=i}})),f+=a(l),{zn:new Date(e+"T00:00"),Fn:e.split("-")[2]===8*(wn.length-2)+"",Nn:f}}(t),u&&(Qn().credits&&u&&e<=u.zn&&u.Nn===t.split(n[0])[4]||function(n){var t=o[i()]().join("");return n&&0===t.indexOf(n)&&n.length===t.length}(t)||u.Fn)||!1)})}));var n=["-"],t="2022-4-9".split("-"),e=new Date(t[0],t[1],t[2]),o=["se","licen","-","v3","l","gp"];function i(){return[["re","verse"].join("")]["".length]}function r(n){return n?isNaN(n)?n.charCodeAt(0)-72:n:""}function a(n){var t=72+n;return t>90&&t<97&&(t+=15),String.fromCharCode(t).toUpperCase()}}(),l.setKeyboardScrolling=oi,l.shared.Cn=ai,l.setAllowScrolling=ui,l.destroy=function(n){ie(!1,"internal"),ui(!0),Co(!1),oi(!1),O(Yn(),gn),rn.l("onDestroy"),n&&(pt(0),h("img[data-src], source[data-src], audio[data-src], iframe[data-src]",Yn()).forEach((function(n){en(n,"src")})),h("img[data-srcset]").forEach((function(n){en(n,"srcset")})),X(h("#fp-nav, .fp-slidesNav, .fp-controlArrow")),b(tt(cn().p),{height:"","background-color":"",padding:""}),b(tt(cn().slides),{width:""}),b(Yn(),{height:"",position:"","-ms-touch-action":"","touch-action":""}),b(Dt,{overflow:"",height:""}),D(Ot,mn),D(At,hn),At.className.split(/\s+/).forEach((function(n){0===n.indexOf("fp-viewing")&&D(At,n)})),tt(cn().X).forEach((function(n){Qn().scrollOverflow&&D(n,Cn),D(n,"fp-table active "+yn),H(n,"data-fp-styles")&&n.setAttribute("style",H(n,"data-fp-styles")),g(n,Sn)&&!_n&&n.removeAttribute("data-anchor")})),vt(Yn()),[Mn,Rn,En].forEach((function(n){h(n,Yn()).forEach((function(n){R(n)}))})),b(Yn(),{"-webkit-transition":"none",transition:"none"}),i.scrollTo(0,0),[Sn,An,Ln].forEach((function(n){D(h("."+n),n)})))},i.fp_easings=p(i.fp_easings,{easeInOutCubic:function(n,t,e,o){return(n/=o/2)<1?e/2*n*n*n+t:e/2*((n-=2)*n*n+2)+t}}),i.jQuery&&function(n,t){n&&t?n.fn.fullpage=function(e){e=n.extend({},e,{$:n}),new t(this[0],e),Object.keys(l).forEach((function(n){Qn().$.fn.fullpage[n]=l[n]}))}:s("error","jQuery is required to use the jQuery fullpage adapter!")}(i.jQuery,fi),fi}));


/*!
* fullPage 4.0.7
* https://github.com/alvarotrigo/fullPage.js
*
* @license GPLv3 for open source use only
* or Fullpage Commercial License for commercial use
* http://alvarotrigo.com/fullPage/pricing/
*
* Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
*/
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).fullpage=t()}(this,(function(){"use strict";var n,t,e,o;Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(n){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),e=t.length>>>0;if("function"!=typeof n)throw new TypeError("predicate must be a function");for(var o=arguments[1],i=0;i<e;){var r=t[i];if(n.call(o,r,i,t))return r;i++}}}),Array.from||(Array.from=(n=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===n.call(t)},e=Math.pow(2,53)-1,o=function(n){var t=function(n){var t=Number(n);return isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*Math.floor(Math.abs(t)):t}(n);return Math.min(Math.max(t,0),e)},function(n){var e=this,i=Object(n);if(null==n)throw new TypeError("Array.from requires an array-like object - not null or undefined");var r,a=arguments.length>1?arguments[1]:void 0;if(void 0!==a){if(!t(a))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(r=arguments[2])}for(var l,u=o(i.length),c=t(e)?Object(new e(u)):new Array(u),s=0;s<u;)l=i[s],c[s]=a?void 0===r?a(l,s):a.call(r,l,s):l,s+=1;return c.length=u,c}));var i=window,r=document,a=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),l=/(Mac|iPhone|iPod|iPad)/i.test(i.navigator.userAgent),u="ontouchstart"in i||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints,c={test:{},shared:{}};function s(n,t){i.console&&i.console[n]&&i.console[n]("fullPage: "+t)}function f(n){return"none"!==i.getComputedStyle(n).display}function d(n){return Array.from(n).filter((function(n){return f(n)}))}function v(n,t){return(t=arguments.length>1?t:document)?t.querySelectorAll(n):null}function p(n){n=n||{};for(var t=1,e=arguments.length;t<e;++t){var o=arguments[t];if(o)for(var i in o)o.hasOwnProperty(i)&&"__proto__"!=i&&"constructor"!=i&&("[object Object]"!==Object.prototype.toString.call(o[i])?n[i]=o[i]:n[i]=p(n[i],o[i]))}return n}function h(n,t){return null!=n&&n.classList.contains(t)}function g(){return"innerHeight"in i?i.innerHeight:r.documentElement.offsetHeight}function m(){return i.innerWidth}function w(n,t){var e;for(e in n=M(n),t)if(t.hasOwnProperty(e)&&null!==e)for(var o=0;o<n.length;o++)n[o].style[e]=t[e];return n}function b(n,t){if(null==t)return n.previousElementSibling;var e=b(n);return e&&X(e,t)?e:null}function S(n,t){if(null==t)return n.nextElementSibling;var e=S(n);return e&&X(e,t)?e:null}function y(n,t){n=x(n)?n[0]:n;for(var e=null!=t?v(t,n.parentNode):n.parentNode.childNodes,o=0,i=0;i<e.length;i++){if(e[i]==n)return o;1==e[i].nodeType&&o++}return-1}function M(n){return x(n)?n:[n]}function T(n){n=M(n);for(var t=0;t<n.length;t++)n[t].style.display="none";return n}function A(n){n=M(n);for(var t=0;t<n.length;t++)n[t].style.display="block";return n}function x(n){return"[object Array]"===Object.prototype.toString.call(n)||"[object NodeList]"===Object.prototype.toString.call(n)}function O(n,t){n=M(n);for(var e=0;e<n.length;e++)n[e].classList.add(t);return n}function E(n,t){n=M(n);for(var e=t.split(" "),o=0;o<e.length;o++){t=e[o];for(var i=0;i<n.length;i++)n[i].classList.remove(t)}return n}function k(n,t){t.appendChild(n)}function D(n,t,e){var o;t=t||r.createElement("div");for(var i=0;i<n.length;i++){var a=n[i];(e&&!i||!e)&&(o=t.cloneNode(!0),a.parentNode.insertBefore(o,a)),o.appendChild(a)}return n}function j(n,t){D(n,t,!0)}function R(n){for(var t=r.createDocumentFragment();n.firstChild;)t.appendChild(n.firstChild);n.parentNode.replaceChild(t,n)}function z(n,t){return n&&1===n.nodeType?X(n,t)?n:z(n.parentNode,t):null}function L(n,t){P(n,n.nextSibling,t)}function N(n,t){P(n,n,t)}function P(n,t,e){x(e)||("string"==typeof e&&(e=Q(e)),e=[e]);for(var o=0;o<e.length;o++)n.parentNode.insertBefore(e[o],t)}function C(n){if(void 0!==n&&n.fitToSection)return r.body.scrollTop;var t=r.documentElement;return(i.pageYOffset||t.scrollTop)-(t.clientTop||0)}function H(n){return Array.prototype.filter.call(n.parentNode.children,(function(t){return t!==n}))}function I(n){n.preventDefault()}function W(n,t){return n.getAttribute(t)}function B(n,t,e){r.addEventListener(n,t,"undefined"===e?null:e)}function Z(n,t,e){i.addEventListener(n,t,"undefined"===e?null:e)}function F(n,t,e){r.removeEventListener(n,t,"undefined"===e?null:e)}function V(n,t,e){i.removeEventListener(n,t,"undefined"===e?null:e)}function Y(n){if("function"==typeof n)return!0;var t=Object.prototype.toString.call(n);return"[object Function]"===t||"[object GeneratorFunction]"===t}function G(n,t,e){var o;e=void 0===e?{}:e,"function"==typeof i.CustomEvent?o=new CustomEvent(t,{detail:e}):(o=r.createEvent("CustomEvent")).initCustomEvent(t,!0,!0,e),n.dispatchEvent(o)}function X(n,t){return(n.matches||n.t||n.msMatchesSelector||n.mozMatchesSelector||n.webkitMatchesSelector||n.oMatchesSelector).call(n,t)}function U(n,t){if("boolean"==typeof t)for(var e=0;e<n.length;e++)n[e].style.display=t?"block":"none";return n}function Q(n){var t=r.createElement("div");return t.innerHTML=n.trim(),t.firstChild}function _(n){n=M(n);for(var t=0;t<n.length;t++){var e=n[t];e&&e.parentElement&&e.parentNode.removeChild(e)}}function J(n,t,e){for(var o=n[e],i=[];o;)(X(o,t)||null==t)&&i.push(o),o=o[e];return i}function K(n,t){return J(n,t,"nextElementSibling")}function q(n,t){return J(n,t,"previousElementSibling")}function $(n){return n[n.length-1]}function nn(n,t){for(var e=0,o=n.slice(Math.max(n.length-t,1)),i=0;i<o.length;i++)e+=o[i];return Math.ceil(e/t)}function tn(n,t){n.setAttribute(t,W(n,"data-"+t)),n.removeAttribute("data-"+t)}function en(n){return en="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},en(n)}i.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(n,t){t=t||window;for(var e=0;e<this.length;e++)n.call(t,this[e],e,this)}),"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(n,t){if(null==n)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(n),o=1;o<arguments.length;o++){var i=arguments[o];if(null!=i)for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},writable:!0,o:!0}),window.fp_utils={$:v,deepExtend:p,hasClass:h,getWindowHeight:g,css:w,prev:b,next:S,last:function(n){return n[n.length-1]},index:y,getList:M,hide:T,show:A,isArrayOrList:x,addClass:O,removeClass:E,appendTo:k,wrap:D,wrapAll:j,wrapInner:function(n,t){for("string"==typeof t&&(t=Q(t)),n.appendChild(t);n.firstChild!==t;)t.appendChild(n.firstChild)},unwrap:R,closest:z,after:L,before:N,insertBefore:P,getScrollTop:C,siblings:H,preventDefault:I,isFunction:Y,trigger:G,matches:X,toggle:U,createElementFromHTML:Q,remove:_,filter:function(n,t){Array.prototype.filter.call(n,t)},untilAll:J,nextAll:K,prevAll:q,showError:s};var on={i:{},l:function(n,t){var e=this;return"object"!==en(this.i[n])&&(this.i[n]=[]),this.i[n].push(t),function(){return e.removeListener(n,t)}},removeListener:function(n,t){if("object"===en(this.i[n])){var e=this.i[n].indexOf(t);e>-1&&this.i[n].splice(e,1)}},u:function(n){for(var t=this,e=arguments.length,o=new Array(e>1?e-1:0),i=1;i<e;i++)o[i-1]=arguments[i];"object"===en(this.i[n])&&this.i[n].forEach((function(n){return n.apply(t,o)}))},once:function(n,t){var e=this,o=this.l(n,(function(){o();for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];t.apply(e,i)}))}},rn={v:0,p:0,slides:[],h:[],g:null,S:null,M:!1,T:!1,A:!1,O:!1,D:!1,j:void 0,R:void 0,L:!1,canScroll:!0,N:"none",P:"none",C:!1,H:!1,I:!0,W:0,B:g(),Z:!1,F:{}};function an(n){Object.assign(rn,n)}function ln(){return rn}function un(n){on.u("onClickOrTouch",{e:n,target:n.target})}function cn(){["click","touchstart"].forEach((function(n){F(n,un)}))}function sn(){an({I:!0})}i.state=rn,on.l("bindEvents",(function(){["click","touchstart"].forEach((function(n){B(n,un)})),Z("focus",sn),on.l("onDestroy",cn)}));var fn="fullpage-wrapper",dn="."+fn,vn="fp-responsive",pn="fp-notransition",hn="fp-destroyed",gn="fp-enabled",mn="active",wn=".active",bn="fp-completely",Sn="fp-section",yn="."+Sn,Mn=".fp-tableCell",Tn="fp-auto-height",An="#fp-nav",xn="fp-slide",On="."+xn,En=".fp-slide.active",kn="fp-slides",Dn=".fp-slides",jn="fp-slidesContainer",Rn="."+jn,zn="fp-table",Ln="fp-overflow",Nn="."+Ln,Pn=".fp-slidesNav",Cn=".fp-slidesNav a",Hn="fp-controlArrow",In="."+Hn,Wn="fp-prev",Bn=".fp-controlArrow.fp-prev",Zn=".fp-controlArrow.fp-next",Fn={menu:!1,anchors:[],lockAnchors:!1,navigation:!1,navigationPosition:"right",navigationTooltips:[],showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,hybrid:!1,licenseKey:"",credits:{enabled:!0,label:"Made with fullPage.js",position:"right"},css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,continuousHorizontal:!1,scrollHorizontally:!1,interlockedSlides:!1,dragAndMove:!1,offsetSections:!1,resetSliders:!1,fadingEffect:!1,normalScrollElements:null,scrollOverflow:!0,scrollOverflowReset:!1,touchSensitivity:5,touchWrapper:null,bigSectionsDestination:null,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,allowCorrectDirection:!1,scrollOverflowMacStyle:!0,controlArrows:!0,controlArrowsHTML:['<div class="fp-arrow"></div>','<div class="fp-arrow"></div>'],controlArrowColor:"#fff",verticalCentered:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,responsiveWidth:0,responsiveHeight:0,responsiveSlides:!1,parallax:!1,parallaxOptions:{type:"reveal",percentage:62,property:"translate"},cards:!1,cardsOptions:{perspective:100,fadeContent:!0,fadeBackground:!0},sectionSelector:".section",slideSelector:".slide",afterLoad:null,beforeLeave:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null,afterResponsive:null,onScrollOverflow:null,lazyLoading:!0,observer:!0},Vn=null,Yn=!1,Gn=p({},Fn),Xn=null;function Un(n){return Vn}function Qn(){return Xn||Fn}function _n(){return Gn}function Jn(n,t,e){Xn[n]=t,"internal"!==e&&(Gn[n]=t)}function Kn(){if(!Qn().anchors.length){var n=v(Qn().sectionSelector.split(",").join("[data-anchor],")+"[data-anchor]",Vn);n.length&&n.length===v(Qn().sectionSelector,Vn).length&&(Yn=!0,n.forEach((function(n){Qn().anchors.push(W(n,"data-anchor").toString())})))}if(!Qn().navigationTooltips.length){var t=v(Qn().sectionSelector.split(",").join("[data-tooltip],")+"[data-tooltip]",Vn);t.length&&t.forEach((function(n){Qn().navigationTooltips.push(W(n,"data-tooltip").toString())}))}}var qn=function(n){this.anchor=n.anchor,this.item=n.item,this.index=n.index(),this.isLast=this.index===n.item.parentElement.querySelectorAll(n.selector).length-1,this.isFirst=!this.index,this.isActive=n.isActive},$n=function(n,t){this.parent=this.parent||null,this.selector=t,this.anchor=W(n,"data-anchor")||Qn().anchors[y(n,Qn().sectionSelector)],this.item=n,this.isVisible=f(n),this.isActive=h(n,mn),this.V=h(n,Ln),this.Y=t===Qn().sectionSelector,this.container=z(n,Rn)||z(n,dn),this.index=function(){return this.siblings().indexOf(this)}};function nt(n){return n.map((function(n){return n.item}))}function tt(n,t){return n.find((function(n){return n.item===t}))}$n.prototype.siblings=function(){return this.Y?this.isVisible?rn.h:rn.G:this.parent?this.parent.slides:0},$n.prototype.prev=function(){var n=this.siblings(),t=(this.Y?n.indexOf(this):this.parent.slides.indexOf(this))-1;return t>=0?n[t]:null},$n.prototype.next=function(){var n=this.siblings(),t=(this.Y?n.indexOf(this):this.parent.slides.indexOf(this))+1;return t<n.length?n[t]:null},$n.prototype.X=function(){return this.Y?rn.h:rn.U};var et,ot,it=function(n){qn.call(this,n)},rt=function(n){qn.call(this,n)};function at(n){return void 0!==window["fp_"+n+"Extension"]}function lt(n){var t=Qn();return null!==t[n]&&"[object Array]"===Object.prototype.toString.call(t[n])?t[n].length&&c[n]:t[n]&&c[n]}function ut(n,t,e){if(lt(n))return Y(c[n][t])?c[n][t](e):c[n][t]}function ct(){return ut("dragAndMove","isAnimating")}function st(){return ut("dragAndMove","isGrabbing")}function ft(n){return Qn().offsetSections&&c.offsetSections?Math.round(ut("offsetSections","getWindowHeight",n)):g()}function dt(n,t){n.insertBefore(t,n.firstChild)}function vt(n){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function e(n){var e,o,i,r,a,l,u="",c=0;for(n=n.replace(/[^A-Za-z0-9+/=]/g,"");c<n.length;)e=t.indexOf(n.charAt(c++))<<2|(r=t.indexOf(n.charAt(c++)))>>4,o=(15&r)<<4|(a=t.indexOf(n.charAt(c++)))>>2,i=(3&a)<<6|(l=t.indexOf(n.charAt(c++))),u+=String.fromCharCode(e),64!=a&&(u+=String.fromCharCode(o)),64!=l&&(u+=String.fromCharCode(i));return u=function(n){for(var t,e="",o=0,i=0,r=0;o<n.length;)(i=n.charCodeAt(o))<128?(e+=String.fromCharCode(i),o++):i>191&&i<224?(r=n.charCodeAt(o+1),e+=String.fromCharCode((31&i)<<6|63&r),o+=2):(r=n.charCodeAt(o+1),t=n.charCodeAt(o+2),e+=String.fromCharCode((15&i)<<12|(63&r)<<6|63&t),o+=3);return e}(u),u}function o(n){return n.slice(3).slice(0,-3)}return function(n){var t=n.split("_");if(t.length>1){var i=t[1];return e(n.replace(o(t[1]),"").split("_")[0].slice(2).slice(0,-2))+"_"+e(i.slice(3).slice(0,-3))}return o(n)}(e(n))}function pt(n){var t=v(En,n);return t.length&&(n=t[0]),n}function ht(n){var t,e,o=Qn();return o.autoScrolling&&!o.scrollBar?(t=-n,e=v(dn)[0]):o.fitToSection?(t=n,e=r.body):(t=n,e=window),{options:t,element:e}}function gt(n,t){!Qn().autoScrolling||Qn().scrollBar||n.self!=window&&h(n,kn)?n.self!=window&&h(n,kn)?n.scrollLeft=t:n.scrollTo(0,t):n.style.top=t+"px"}function mt(n){var t="transform "+Qn().scrollingSpeed+"ms "+Qn().easingcss3;return E(n,pn),w(n,{"-webkit-transition":t,transition:t})}function wt(n,t){var e=n.index(),o=y(t,yn);return e==o?"none":e>o?"up":"down"}function bt(n){return O(n,pn)}function St(n){return{"-webkit-transform":n,"-moz-transform":n,"-ms-transform":n,transform:n}}function yt(n,t){t?mt(Un()):bt(Un()),clearTimeout(et),w(Un(),St(n)),c.test._=n,et=setTimeout((function(){E(Un(),pn)}),10)}function Mt(n){var t=Math.round(n);if(Qn().css3&&Qn().autoScrolling&&!Qn().scrollBar)yt("translate3d(0px, -"+t+"px, 0px)",!1);else if(Qn().autoScrolling&&!Qn().scrollBar)w(Un(),{top:-t+"px"}),c.test.top=-t+"px";else{var e=ht(t);gt(e.element,e.options)}}function Tt(n,t){"internal"!==t&&ut("fadingEffect","update",n),ut("cards","update_",n),Jn("scrollingSpeed",n,t)}function At(){clearTimeout(ot)}function xt(n,t,e,o){var a=function(n){return n.self!=i&&h(n,kn)?n.scrollLeft:!Qn().autoScrolling||Qn().scrollBar?C(Qn()):n.offsetTop}(n),l=t-a,u=0,c=!1;an({L:!0}),n===r.body&&w(r.body,{"scroll-snap-type":"none"}),function r(){if(rn.L){var s=t;u+=20,e&&(s=i.fp_easings[Qn().easing](u,a,l,e)),gt(n,s),u<e?(clearTimeout(ot),ot=setTimeout(r,20)):void 0===o||c||(o(),c=!0)}else u<e&&!c&&(o(),c=!0)}()}function Ot(n){return n&&!n.item?new it(new le(n)):n?new it(n):null}function Et(n){return n?new rt(n):null}function kt(n,t){var e,o=function(n,t){var e={afterRender:function(){return{section:Ot(ln().g),J:Et(ln().g.activeSlide)}},onLeave:function(){return{origin:Ot(t.items.origin),destination:Ot(t.items.destination),direction:t.direction,trigger:ln().S}},afterLoad:function(){return e.onLeave()},afterSlideLoad:function(){return{section:Ot(t.items.section),origin:Ot(t.items.origin),destination:Ot(t.items.destination),direction:t.direction,trigger:ln().S}},onSlideLeave:function(){return e.afterSlideLoad()},beforeLeave:function(){return e.onLeave()},onScrollOverflow:function(){return{section:Ot(ln().g),J:Et(ln().g.activeSlide),position:t.position}}};return e[n]()}(n,t);return G(Un(),n,o),!1!==Qn()[n].apply(o[Object.keys(o)[0]],(e=o,Object.keys(e).map((function(n){return e[n]}))))}function Dt(n){var t=pt(n);v("video, audio",t).forEach((function(n){n.hasAttribute("data-autoplay")&&"function"==typeof n.play&&n.play()})),v('iframe[src*="youtube.com/embed/"]',t).forEach((function(n){n.hasAttribute("data-autoplay")&&jt(n),n.onload=function(){n.hasAttribute("data-autoplay")&&jt(n)}}))}function jt(n){n.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*")}function Rt(n){var t=pt(n);v("video, audio",t).forEach((function(n){n.hasAttribute("data-keepplaying")||"function"!=typeof n.pause||n.pause()})),v('iframe[src*="youtube.com/embed/"]',t).forEach((function(n){/youtube\.com\/embed\//.test(W(n,"src"))&&!n.hasAttribute("data-keepplaying")&&n.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}))}function zt(n){Qn().lazyLoading&&v("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]",pt(n)).forEach((function(n){if(["src","srcset"].forEach((function(t){var e=W(n,"data-"+t);null!=e&&e&&(tn(n,t),n.addEventListener("load",(function(){})))})),X(n,"source")){var t=z(n,"video, audio");t&&(t.load(),t.onloadeddata=function(){})}}))}i.fp_utils=i.fp_utils||{},Object.assign(i.fp_utils,{prependTo:dt,toggleClass:function(n,t,e){if(n.classList&&null==e)n.classList.toggle(t);else{var o=h(n,t);o&&null==e||!e?E(n,t):(!o&&null==e||e)&&O(n,t)}}}),c.setScrollingSpeed=Tt,on.l("bindEvents",(function(){on.l("onDestroy",At)}));var Lt=null,Nt=null,Pt=null;function Ct(){var n=ln().g.item,t=ln().g.activeSlide,e=Ht(n),o=String(e);t&&(o=o+"-"+Ht(t.item)),o=o.replace("/","-").replace("#","");var i=new RegExp("\\b\\s?fp-viewing-[^\\s]+\\b","g");Lt.className=Lt.className.replace(i,""),O(Lt,"fp-viewing-"+o)}function Ht(n){if(!n)return null;var t=W(n,"data-anchor"),e=y(n);return null==t&&(t=e),t}function It(n,t,e){var o="";Qn().anchors.length&&!Qn().lockAnchors&&(n?(null!=e&&(o=e),null==t&&(t=n),an({R:t}),Wt(o+"/"+t)):null!=n?(an({R:t}),Wt(e)):Wt(e)),Ct()}function Wt(n){if(Qn().recordHistory)location.hash=n;else if(a||u)i.history.replaceState(void 0,void 0,"#"+n);else{var t=i.location.href.split("#")[0];i.location.replace(t+"#"+n)}}function Bt(n,t,e){var o="Section"===t?Qn().anchors[n]:W(e,"data-anchor");return encodeURI(Qn().navigationTooltips[n]||o||t+" "+(n+1))}function Zt(n){I(n),an({S:"horizontalNav"});var t=z(this,yn),e=v(Dn,z(this,yn))[0],o=tt(ln().h,t).slides[y(z(this,"li"))];on.u("landscapeScroll",{slides:e,destination:o.item})}var Ft,Vt={};function Yt(n,t,e){"all"!==t?Vt[e][t]=n:Object.keys(Vt[e]).forEach((function(t){Vt[e][t]=n}))}function Gt(){return Vt}function Xt(){var n=z(this,yn);h(this,Wn)?Gt().m.left&&(an({S:"slideArrow"}),on.u("moveSlideLeft",{section:n})):Gt().m.right&&(an({S:"slideArrow"}),on.u("moveSlideRight",{section:n}))}function Ut(n){!Qn().loopHorizontal&&Qn().controlArrows&&(U(v(Bn,n.section),0!==n.slideIndex),U(v(Zn,n.section),null!=S(n.destiny)))}function Qt(){clearTimeout(Ft)}function _t(n,t,e){var o=z(n,yn),i=ln().h.filter((function(n){return n.item==o}))[0],r=i.slides.filter((function(n){return n.item==t}))[0],a={slides:n,destiny:t,direction:e,destinyPos:{left:t.offsetLeft},slideIndex:r.index(),section:o,sectionIndex:i.index(),anchorLink:i.anchor,slidesNav:v(Pn,o)[0],slideAnchor:r.anchor,prevSlide:i.activeSlide.item,prevSlideIndex:i.activeSlide.index(),items:{section:i,origin:i.activeSlide,destination:r},localIsResizing:rn.O};a.xMovement=Kt(a.prevSlideIndex,a.slideIndex),a.direction=a.direction?a.direction:a.xMovement,a.localIsResizing||an({canScroll:!1}),ut("parallax","applyHorizontal",a),ut("cards","apply",a),ut("dropEffect","apply",a),ut("waterEffect","apply",a),Qn().onSlideLeave&&!a.localIsResizing&&"none"!==a.xMovement&&Y(Qn().onSlideLeave)&&!1===kt("onSlideLeave",a)?an({A:!1}):(lt("dropEffect")&&Qn().dropEffect||(O(t,mn),E(H(t),mn)),oe(),a.localIsResizing||(Rt(a.prevSlide),zt(t)),Ut(a),i.isActive&&!a.localIsResizing&&It(a.slideIndex,a.slideAnchor,a.anchorLink),ut("continuousHorizontal","apply",a),st()?$t(a):Jt(n,a,!0),Qn().interlockedSlides&&c.interlockedSlides&&(lt("continuousHorizontal")&&void 0!==e&&e!==a.xMovement||ut("interlockedSlides","apply",a)))}function Jt(n,t,e){var o,i,r=t.destinyPos;if(o=t.slidesNav,i=t.slideIndex,Qn().slidesNavigation&&null!=o&&(E(v(wn,o),mn),O(v("a",v("li",o)[i]),mn)),an({scrollX:Math.round(r.left)}),Qn().css3){var a="translate3d(-"+Math.round(r.left)+"px, 0px, 0px)";c.test.K[t.sectionIndex]=a,lt("dragAndMove")&&void 0!==t.q||mt(v(Rn,n)),w(v(Rn,n),St(a)),lt("interlockedSlides")||clearTimeout(Ft),Ft=setTimeout((function(){e&&$t(t)}),Qn().scrollingSpeed)}else c.test.left[t.sectionIndex]=Math.round(r.left),xt(n,Math.round(r.left),Qn().scrollingSpeed,(function(){e&&$t(t)}))}function Kt(n,t){return n==t?"none":n>t?"left":"right"}function qt(){clearTimeout(Ft)}function $t(n){ut("continuousHorizontal","afterSlideLoads",n),n.localIsResizing||(ut("parallax","afterSlideLoads"),ut("scrollOverflowReset","setPrevious",n.prevSlide),ut("scrollOverflowReset","reset"),Y(Qn().afterSlideLoad)&&kt("afterSlideLoad",n),an({canScroll:!0}),Dt(n.destiny)),an({A:!1}),ut("interlockedSlides","interlockedSlides",n)}function ne(n,t){Tt(0,"internal"),void 0!==t&&an({O:!0}),_t(z(n,Dn),n),void 0!==t&&an({O:!1}),Tt(_n().scrollingSpeed,"internal")}Vt.m={up:!0,down:!0,left:!0,right:!0},Vt.k=p({},Vt.m),on.l("onClickOrTouch",(function(n){var t=n.target;(X(t,In)||z(t,In))&&Xt.call(t,n)})),c.landscapeScroll=_t,on.l("bindEvents",(function(){on.l("onPerformMovement",Qt)}));var te=null,ee=null;function oe(){rn.g=null,rn.h.map((function(n){var t=h(n.item,mn);n.isActive=t,n.V=h(n.item,Ln),t&&(rn.g=n),n.slides.length&&(n.activeSlide=null,n.slides.map((function(t){var e=h(t.item,mn);t.V=h(t.item,Ln),t.isActive=e,e&&(n.activeSlide=t)})))})),function(){var n=rn.g,t=!!rn.g&&rn.g.slides.length,e=rn.g?rn.g.activeSlide:null;if(!n&&rn.h.length&&!ln().M)if(lt("responsiveSlides")&&ut("responsiveSlides","areSlidesSections"))an({g:rn.U.filter((function(n){return n.item===v(yn)}))[0]});else{if(te){var o=ae(te,rn.h);o&&(rn.g=o,rn.g.isActive=!0,O(rn.g.item,mn)),rn.g&&Mt(rn.g.item.offsetTop)}if(t&&!e&&ee){var i=ae(ee,rn.g.slides);i&&(rn.g.activeSlide=i,rn.g.activeSlide.isActive=!0,O(rn.g.activeSlide.item,mn)),rn.g.activeSlide&&ne(rn.g.activeSlide.item,"internal")}}}(),G(Un(),"onUpdateStateDone")}function ie(){var n=v(Qn().sectionSelector,Un()),t=d(n),e=Array.from(n).map((function(n){return new le(n)})),o=e.filter((function(n){return n.isVisible})),i=o.reduce((function(n,t){return n.concat(t.slides)}),[]);te=re(rn.g),ee=re(rn.g?rn.g.activeSlide:null),rn.v=t.length,rn.p=o.reduce((function(n,t){return n+t.slides.length}),0),rn.h=o,rn.G=e,rn.slides=i,rn.U=rn.h.concat(rn.slides)}function re(n){if(!n)return null;var t=n?n.item:null,e=n.Y?rn.G:rn.g.nn;if(t){var o=tt(e,t);return o?o.index():null}return null}function ae(n,t){var e,o=n-1,i=n;do{if(e=t[o]||t[i])break;o-=1,i+=1}while(o>=0||i<t.length);return e}var le=function(n){var t=this;[].push.call(arguments,Qn().sectionSelector),$n.apply(this,arguments),this.tn=v(Qn().slideSelector,n),this.nn=Array.from(this.tn).map((function(n){return new ue(n,t)})),this.slides=this.nn.filter((function(n){return n.isVisible})),this.activeSlide=this.slides.length?this.slides.filter((function(n){return n.isActive}))[0]||this.slides[0]:null};le.prototype=$n.prototype,le.prototype.constructor=le;var ue=function(n,t){this.parent=t,$n.call(this,n,Qn().slideSelector)};function ce(){O(v(Qn().sectionSelector,Un()),Sn),O(v(Qn().slideSelector,Un()),xn)}function se(){G(b(this),"click")}function fe(){_(v(An));var n=r.createElement("div");n.setAttribute("id","fp-nav");var t=r.createElement("ul");n.appendChild(t),k(n,Lt);var e=v(An)[0];O(e,"fp-"+Qn().navigationPosition),Qn().showActiveTooltip&&O(e,"fp-show-active");for(var o="",i=0;i<ln().h.length;i++){var a=ln().h[i],l="";Qn().anchors.length&&(l=a.anchor),o+='<li><a href="#'+encodeURI(l)+'"><span class="fp-sr-only">'+Bt(a.index(),"Section")+"</span><span></span></a>";var u=Qn().navigationTooltips[a.index()];void 0!==u&&""!==u&&(o+='<div class="fp-tooltip fp-'+Qn().navigationPosition+'">'+u+"</div>"),o+="</li>"}v("ul",e)[0].innerHTML=o;var c=v("li",v(An)[0])[ln().g.index()];O(v("a",c),mn)}function de(n){n.preventDefault&&I(n),an({S:"verticalNav"});var t=y(z(this,"#fp-nav li"));on.u("scrollPage",{destination:ln().h[t]})}function ve(n,t){Jn("recordHistory",n,t)}function pe(n,t){n||Mt(0),Jn("autoScrolling",n,t);var e=ln().g.item;if(Qn().autoScrolling&&!Qn().scrollBar)w(Pt,{overflow:"hidden",height:"100%"}),E(Lt,"fp-scrollable"),ve(_n().recordHistory,"internal"),w(Un(),{"-ms-touch-action":"none","touch-action":"none"}),null!=e&&Mt(e.offsetTop);else if(w(Pt,{overflow:"visible",height:"initial"}),O(Lt,"fp-scrollable"),ve(!!Qn().autoScrolling&&_n().recordHistory,"internal"),w(Un(),{"-ms-touch-action":"","touch-action":""}),bt(Un()),null!=e){w(Pt,{"scroll-behavior":"unset"});var o=ht(e.offsetTop);o.element.scrollTo(0,o.options)}G(Un(),"setAutoScrolling",n)}ue.prototype=$n.prototype,ue.prototype.constructor=le,c.setRecordHistory=ve,c.setAutoScrolling=pe,c.test.setAutoScrolling=pe,c.setFitToSection=me,c.fitToSection=function(){};var he,ge="scrollSnapAlign"in(he=r.documentElement.style)||"en"in he||"on"in he;function me(n,t){we(n),Jn("fitToSection",n,t)}function we(n){ge&&(Qn().fitToSection&&(!Qn().autoScrolling||Qn().scrollBar)&&n?O:E)(Nt,"fp-snaps")}function be(){var n=Qn().responsive||Qn().responsiveWidth,t=Qn().responsiveHeight,e=n&&i.innerWidth<n,o=t&&i.innerHeight<t;n&&t?Se(e||o):n?Se(e):t&&Se(o)}function Se(n){var t=ye();n?t||(pe(!1,"internal"),me(!1,"internal"),T(v(An)),O(Lt,vn),Y(Qn().afterResponsive)&&Qn().afterResponsive.call(Un(),n),ut("responsiveSlides","toSections"),G(Un(),"afterResponsive",n)):t&&(pe(_n().autoScrolling,"internal"),me(_n().autoScrolling,"internal"),A(v(An)),E(Lt,vn),Y(Qn().afterResponsive)&&Qn().afterResponsive.call(Un(),n),ut("responsiveSlides","toSlides"),G(Un(),"afterResponsive",n))}function ye(){return h(Lt,vn)}c.setResponsive=Se,on.l("bindEvents",(function(){i.addEventListener("load",(function(){Qn().scrollOverflow&&!Qn().scrollBar&&(Te.rn(),Te.an())})),Qn().scrollOverflow&&nt(ln().U).forEach((function(n){n.addEventListener("scroll",Te.ln),n.addEventListener("wheel",Te.un),n.addEventListener("keydown",Te.un),n.addEventListener("keydown",Te.cn)}))}));var Me,Te={sn:null,dn:null,vn:null,un:function(n){if(!rn.canScroll)return I(n),!1},an:function(){r.activeElement===this.sn&&this.sn.blur(),v(".fp-overflow.active",ln().g.item)[0]&&(this.sn=v(Nn,ln().g.item)[0],this.sn.focus())},rn:function(){Qn().scrollOverflowMacStyle&&!l&&O(Lt,"fp-scroll-mac"),ln().U.forEach((function(n){if(!(h(n.item,"fp-noscroll")||h(n.item,Tn)||h(n.item,"fp-auto-height-responsive")&&ye())){var t=Te.pn(n.item),e=Te.hn(n.item);e?(O(t,Ln),t.setAttribute("tabindex","-1")):(E(t,Ln),t.removeAttribute("tabindex")),n.V=e}}))},pn:function(n){return v(En,n)[0]||n},gn:function(n){return n.Y&&n.activeSlide?n.activeSlide.V:n.V},hn:function(n){return n.scrollHeight>i.innerHeight},mn:function(n,t){if(!rn.canScroll)return!1;if(!Qn().scrollOverflow)return!0;var e=Te.pn(t),o=e.scrollTop,i="up"===n&&o<=0,r="down"===n&&e.scrollHeight<=e.offsetHeight+o,a=i||r;return a||(this.dn=(new Date).getTime()),a},wn:function(){this.vn=(new Date).getTime();var n=this.vn-Te.dn,t=(a||u)&&rn.C,e=rn.H&&n>600;return t&&n>400||e},ln:(Me=0,function(n){var t=n.target.scrollTop,e="none"!==rn.N?rn.N:Me<t?"down":"up";Me=t,Y(Qn().onScrollOverflow)&&kt("onScrollOverflow",{position:t,direction:e}),h(n.target,Ln)&&rn.canScroll&&Te.mn(e,n.target)&&Te.wn()&&on.u("onScrollOverflowScrolled",{direction:e})})};function Ae(n){Qn().verticalCentered&&(Te.gn(n)||h(n.item,zn)||O(n.item,zn))}function xe(n){var t=n.slides.length,e=n.tn,o=n.slides,i=100*t,a=100/t;if(!v(Dn,n.item)[0]){var l=r.createElement("div");l.className=kn,j(e,l);var u=r.createElement("div");u.className=jn,j(e,u)}w(v(Rn,n.item),{width:i+"%"}),t>1&&(Qn().controlArrows&&function(n){var t=n.item,e=[Q(Qn().controlArrowsHTML[0]),Q(Qn().controlArrowsHTML[1])];L(v(Dn,t)[0],e),O(e,Hn),O(e[0],Wn),O(e[1],"fp-next"),"#fff"!==Qn().controlArrowColor&&(w(v(Zn,t),{"border-color":"transparent transparent transparent "+Qn().controlArrowColor}),w(v(Bn,t),{"border-color":"transparent "+Qn().controlArrowColor+" transparent transparent"})),Qn().loopHorizontal||T(v(Bn,t))}(n),Qn().slidesNavigation&&function(n){var t=n.item,e=n.slides.length;k(Q('<div class="fp-slidesNav"><ul></ul></div>'),t);var o=v(Pn,t)[0];O(o,"fp-"+Qn().slidesNavPosition);for(var i=0;i<e;i++)k(Q('<li><a href="#"><span class="fp-sr-only">'+Bt(i,"Slide",v(On,t)[i])+"</span><span></span></a></li>"),v("ul",o)[0]);w(o,{"margin-left":"-"+o.innerWidth/2+"px"});var r=n.activeSlide?n.activeSlide.index():0;O(v("a",v("li",o)[r]),mn)}(n)),o.forEach((function(n){w(n.item,{width:a+"%"}),Qn().verticalCentered&&Ae(n)}));var c=lt("responsiveSlides")?null:n.activeSlide||null;null!=c&&rn.g&&(0!==rn.g.index()||0===rn.g.index()&&0!==c.index())?(ne(c.item,"internal"),O(c.item,"fp-initial")):O(e[0],mn)}var Oe,Ee=null;function ke(n){var t=n.item,e=n.tn.length,o=n.index();!ln().g&&n.isVisible&&(O(t,mn),oe()),Ee=ln().g.item,lt("offsetSections")&&w(t,{height:ft(t)+"px"}),Qn().paddingTop&&w(t,{"padding-top":Qn().paddingTop}),Qn().paddingBottom&&w(t,{"padding-bottom":Qn().paddingBottom}),void 0!==Qn().sectionsColor[o]&&w(t,{"background-color":Qn().sectionsColor[o]}),void 0!==Qn().anchors[o]&&t.setAttribute("data-anchor",n.anchor),e||Ae(n)}c.getActiveSection=function(){return ln().g};var De={attributes:!1,subtree:!0,childList:!0,characterData:!0};function je(){return d(v(Qn().slideSelector,Un())).length!==ln().p}function Re(n){var t=je();(je()||d(v(Qn().sectionSelector,Un())).length!==ln().v)&&!rn.Z&&(Qn().observer&&Oe&&Oe.disconnect(),ie(),oe(),Qn().anchors=[],_(v(An)),ce(),Kn(),Qn().navigation&&fe(),t&&(_(v(Pn)),_(v(In))),ln().h.forEach((function(n){n.slides.length?t&&xe(n):ke(n)}))),Qn().observer&&Oe&&Oe.observe(v(dn)[0],De)}on.l("bindEvents",(function(){var n,t,e;Qn().observer&&"MutationObserver"in window&&(n=v(dn)[0],t=De,(e=new MutationObserver(Re)).observe(n,t),Oe=e),on.l("contentChanged",Re)})),c.bn=Re;var ze=function(){var n=!1;try{var t=Object.defineProperty({},"passive",{get:function(){n=!0}});Z("testPassive",null,t),V("testPassive",null,t)}catch(n){}return function(){return n}}();function Le(){return!!ze()&&{passive:!1}}(new Date).getTime();var Ne,Pe,Ce,He,Ie,We,Be=(Pe=(new Date).getTime(),function(n,t){var e=(new Date).getTime(),o="wheel"===n?Qn().scrollingSpeed:100;return e-Pe>=o&&(Ne=t(),Pe=e),void 0===Ne||Ne}),Ze=(Ie=(new Date).getTime(),We=[],{Sn:function(n){var t=(n=n||i.event).wheelDelta||-n.deltaY||-n.detail,e=Math.max(-1,Math.min(1,t)),o=void 0!==n.wheelDeltaX||void 0!==n.deltaX;Ce=Math.abs(n.wheelDeltaX)<Math.abs(n.wheelDelta)||Math.abs(n.deltaX)<Math.abs(n.deltaY)||!o;var r=(new Date).getTime();He=e<0?"down":"up",We.length>149&&We.shift(),We.push(Math.abs(t));var a=r-Ie;Ie=r,a>200&&(We=[])},yn:function(){var n=nn(We,10)>=nn(We,70);return!!We.length&&n&&Ce},Mn:function(){return He}});function Fe(){var n=Qn().css3?C(Qn())+g():$(ln().h).item.offsetTop+$(ln().h).item.offsetHeight,t=ht(n);c.test.top=-n+"px",w(r.body,{"scroll-snap-type":"none"}),w(Pt,{"scroll-behavior":"unset"}),an({canScroll:!1}),xt(t.element,t.options,Qn().scrollingSpeed,(function(){setTimeout((function(){an({M:!0}),an({canScroll:!0})}),30)}))}function Ve(){Un().getBoundingClientRect().bottom>=0&&Ye()}function Ye(){var n=ht($(ln().h).item.offsetTop);an({canScroll:!1}),xt(n.element,n.options,Qn().scrollingSpeed,(function(){an({canScroll:!0}),an({M:!1}),an({Tn:!1})}))}var Ge,Xe,Ue,Qe,_e,Je=(Ge=!1,Xe={},Ue={},function(n,t,e){switch(n){case"set":Xe[t]=(new Date).getTime(),Ue[t]=e;break;case"isNewKeyframe":var o=(new Date).getTime();Ge=o-Xe[t]>Ue[t]}return Ge});function Ke(){for(var n=v(En),t=0;t<n.length;t++)ne(n[t],"internal")}function qe(){var n=v(".fp-auto-height")[0]||ye()&&v(".fp-auto-height-responsive")[0];Qn().lazyLoading&&n&&v(".fp-section:not(.active)").forEach((function(n){var t,e,o,i,r;e=(t=n.getBoundingClientRect()).top,o=t.bottom,i=e+2<rn.B&&e>0,r=o>2&&o<rn.B,(i||r)&&zt(n)}))}function $e(n,t){var e;e=n,Qn().menu&&Qn().menu.length&&v(Qn().menu).forEach((function(n){null!=n&&(E(v(wn,n),mn),O(v('[data-menuanchor="'+e+'"]',n),mn))})),function(n,t){var e=v(An)[0];Qn().navigation&&null!=e&&"none"!==e.style.display&&(E(v(wn,e),mn),O(n?v('a[href="#'+n+'"]',e):v("a",v("li",e)[t]),mn))}(n,t)}function no(n,t){if(Y(Qn().beforeLeave))return Be(ln().S,(function(){return kt(n,t)}))}function to(n,t,e){var o=n.item;if(null!=o){var i,r,a={element:o,callback:t,isMovementUp:e,dtop:eo(o),yMovement:wt(ln().g,o),anchorLink:n.anchor,sectionIndex:n.index(),activeSlide:n.activeSlide?n.activeSlide.item:null,leavingSection:ln().g.index()+1,localIsResizing:rn.O,items:{origin:ln().g,destination:n},direction:null};if(!(ln().g.item==o&&!rn.O||Qn().scrollBar&&C(Qn())===a.dtop&&!h(o,Tn))){if(null!=a.activeSlide&&(i=W(a.activeSlide,"data-anchor"),r=y(a.activeSlide,null)),!a.localIsResizing){var l=a.yMovement;if(void 0!==e&&(l=e?"up":"down"),a.direction=l,at("dropEffect")&&c.dropEffect.onLeave_(a),at("waterEffect")&&c.waterEffect.onLeave_(a),Y(Qn().beforeLeave)&&!1===no("beforeLeave",a))return;if(Y(Qn().onLeave)&&!kt("onLeave",a))return}ut("parallax","apply",a),ut("cards","apply",a),ut("dropEffect","apply",a),ut("waterEffect","apply",a),Qn().autoScrolling&&Qn().continuousVertical&&void 0!==a.isMovementUp&&(!a.isMovementUp&&"up"==a.yMovement||a.isMovementUp&&"down"==a.yMovement)&&(a=function(n){an({Z:!0});var t=ln().g.item;return n.isMovementUp?N(t,K(t,yn)):L(t,q(t,yn).reverse()),Mt(ln().g.item.offsetTop),Ke(),n.An=t,n.dtop=n.element.offsetTop,n.yMovement=wt(ln().g,n.element),n.leavingSection=n.items.origin.index()+1,n.sectionIndex=n.items.destination.index(),G(Un(),"onContinuousVertical",n),n}(a)),ut("scrollOverflowReset","setPrevious",ln().g.item),a.localIsResizing||Rt(ln().g.item),lt("dropEffect")&&Qn().dropEffect||(O(o,mn),E(H(o),mn)),oe(),zt(o),an({canScroll:c.test.xn}),It(r,i,a.anchorLink),function(n){var t=Qn().scrollingSpeed<700,e=t?700:Qn().scrollingSpeed;if(an({N:"none",scrollY:Math.round(n.dtop)}),on.u("onPerformMovement"),Qn().css3&&Qn().autoScrolling&&!Qn().scrollBar)yt("translate3d(0px, -"+Math.round(n.dtop)+"px, 0px)",!0),lt("waterEffect")&&Ke(),Qn().scrollingSpeed?(clearTimeout(Qe),Qe=setTimeout((function(){oo(n),an({canScroll:!t||c.test.xn})}),Qn().scrollingSpeed)):oo(n);else{var o=ht(n.dtop);c.test.top=-n.dtop+"px",w(Pt,{"scroll-behavior":"unset"}),clearTimeout(Qe),xt(o.element,o.options,Qn().scrollingSpeed,(function(){Qn().scrollBar?Qe=setTimeout((function(){oo(n)}),30):(oo(n),an({canScroll:!t||c.test.xn}))}))}t&&(clearTimeout(_e),_e=setTimeout((function(){an({canScroll:!0})}),e))}(a),an({j:a.anchorLink}),$e(a.anchorLink,function(n){return null!=n.An?n.isMovementUp?rn.v-1:0:n.sectionIndex}(a))}}}function eo(n){var t=n.offsetHeight,e=n.offsetTop,o=e,i=lt("dragAndMove")&&ut("dragAndMove","isGrabbing")?ut("dragAndMove","isScrollingDown"):e>rn.W,r=o-g()+t,a=Qn().bigSectionsDestination;return t>g()?(i||a)&&"bottom"!==a||(o=r):(i||rn.O&&null==S(n))&&(o=r),lt("offsetSections")&&(o=c.offsetSections.getSectionPosition_(i,o,n)),an({W:o}),o}function oo(n){Qn().fitToSection&&h(v(".fp-section.active")[0],Tn)&&w(r.body,{"scroll-snap-type":"none"}),an({M:!1}),function(n){null!=n.An&&(n.isMovementUp?N(v(yn)[0],n.An):L(v(yn)[ln().h.length-1],n.An),Mt(ln().g.item.offsetTop),function(){for(var n=v(En),t=0;t<n.length;t++)ne(n[t],"internal")}(),n.sectionIndex=n.items.destination.index(),n.leavingSection=n.items.origin.index()+1,an({Z:!1}))}(n),Y(Qn().afterLoad)&&!n.localIsResizing&&kt("afterLoad",n),ut("parallax","afterLoad"),ut("waterEffect","afterLoad"),ut("dropEffect","afterLoad"),ut("scrollOverflowReset","reset"),ut("resetSliders","apply",n),oe(),n.localIsResizing||Dt(n.element),O(n.element,bn),E(H(n.element),bn),qe(),Te.an(),an({canScroll:!0}),Y(n.callback)&&n.callback()}function io(){var n=ln().g.next();n||!Qn().loopBottom&&!Qn().continuousVertical||(n=ln().h[0]),null!=n?to(n,null,!1):Un().scrollHeight<Lt.scrollHeight&&on.u("scrollBeyondFullpage")}function ro(){var n=ln().g.prev();n||!Qn().loopTop&&!Qn().continuousVertical||(n=$(ln().h)),null!=n&&to(n,null,!0)}c.moveTo=moveTo,c.getScrollY=function(){return rn.scrollY},on.l("onDestroy",(function(){clearTimeout(Qe),clearTimeout(_e)})),c.moveSectionDown=io,c.moveSectionUp=ro;var ao=0;function lo(n){Qn().autoScrolling&&(rn.canScroll&&(n.pageY<ao&&Gt().m.up?ro():n.pageY>ao&&Gt().m.down&&io()),ao=n.pageY)}function uo(n){if(Gt().m[n]){var t="down"===n?io:ro;lt("scrollHorizontally")&&(t=ut("scrollHorizontally","getScrollSection",{type:n,scrollSection:t})),Qn().scrollOverflow&&Te.gn(ln().g)?Te.mn(n,ln().g.item)&&Te.wn()&&t():t()}}var co,so,fo=0,vo=0,po=0,ho=0,go=To(),mo={On:"ontouchmove"in window?"touchmove":go.move,En:"ontouchstart"in window?"touchstart":go.down};function wo(n){var t=z(n.target,yn)||ln().g.item,e=Te.gn(ln().g);if(bo(n)){an({C:!0,H:!1}),Qn().autoScrolling&&(!e||e&&!rn.canScroll)&&I(n);var o=Mo(n);po=o.y,ho=o.x;var r=Math.abs(fo-po)>i.innerHeight/100*Qn().touchSensitivity,a=Math.abs(vo-ho)>m()/100*Qn().touchSensitivity,l=v(Dn,t).length&&Math.abs(vo-ho)>Math.abs(fo-po),u=fo>po?"down":"up";an({N:l?vo>ho?"right":"left":u}),l?!rn.A&&a&&(vo>ho?Gt().m.right&&on.u("moveSlideRight",{section:t}):Gt().m.left&&on.u("moveSlideLeft",{section:t})):Qn().autoScrolling&&rn.canScroll&&r&&uo(u)}}function bo(n){return void 0===n.pointerType||"mouse"!=n.pointerType}function So(n){if(Qn().fitToSection&&an({L:!1}),bo(n)){var t=Mo(n);fo=t.y,vo=t.x}Z("touchend",yo)}function yo(){V("touchend",yo),an({C:!1})}function Mo(n){var t={};return t.y=void 0!==n.pageY&&(n.pageY||n.pageX)?n.pageY:n.touches[0].pageY,t.x=void 0!==n.pageX&&(n.pageY||n.pageX)?n.pageX:n.touches[0].pageX,u&&bo(n)&&Qn().scrollBar&&void 0!==n.touches&&(t.y=n.touches[0].pageY,t.x=n.touches[0].pageX),t}function To(){var n;return i.PointerEvent&&(n={down:"pointerdown",move:"pointermove"}),n}function Ao(n){Qn().autoScrolling&&bo(n)&&Gt().m.up&&(rn.canScroll||I(n))}function xo(n,t){var e=null==t?ln().g.item:t,o=tt(rn.h,e),i=v(Dn,e)[0];if(!(null==i||ct()||rn.A||o.slides.length<2)){var r=o.activeSlide,a="left"===n?r.prev():r.next();if(!a){if(!Qn().loopHorizontal)return;a="left"===n?$(o.slides):o.slides[0]}an({A:!c.test.xn}),_t(i,a.item,n)}}function Oo(n){xo("left",n)}function Eo(n){xo("right",n)}function ko(n){if(lt("responsiveSlides")&&ut("responsiveSlides","areSlidesSections"))return tt(rn.h,ut("responsiveSlides","getSectionByAnchor",n));var t=ln().h.filter((function(t){return t.anchor===n}))[0];if(!t){var e=void 0!==n?n-1:0;t=ln().h[e]}return t}function Do(n){null!=n&&_t(z(n,Dn),n)}function jo(n,t){var e=ko(n);if(null!=e){var o=function(n,t){var e=t.slides.filter((function(t){return t.anchor===n}))[0];return null==e&&(n=void 0!==n?n:0,e=t.slides[n]),e?e.item:null}(t,e);e.anchor===rn.j||h(e.item,mn)?Do(o):to(e,(function(){Do(o)}))}}function Ro(n,t){var e=ko(n);void 0!==t?jo(n,t):null!=e&&to(e)}function zo(){clearTimeout(so),F("keydown",No),F("keyup",Po)}function Lo(){var n=r.activeElement;return X(n,"textarea")||X(n,"input")||X(n,"select")||"true"==W(n,"contentEditable")||""==W(n,"contentEditable")}function No(n){clearTimeout(so);var t=n.keyCode,e=[37,39].indexOf(t)>-1,o=Qn().autoScrolling||e;9===t?function(n){var t=n.shiftKey,e=r.activeElement,o=Ho(pt(ln().g.item));function i(n){return I(n),o[0]?o[0].focus():null}(function(n){var t=Ho(r),e=t.indexOf(r.activeElement),o=t[n.shiftKey?e-1:e+1],i=z(o,On),a=z(o,yn);return!i&&!a})(n)||(e?null==z(e,".fp-section.active,.fp-section.active .fp-slide.active")&&(e=i(n)):i(n),(!t&&e==o[o.length-1]||t&&e==o[0])&&I(n))}(n):!Lo()&&Qn().keyboardScrolling&&o&&(co=n.ctrlKey,so=setTimeout((function(){!function(n){var t=n.shiftKey,e=r.activeElement,o=X(e,"video")||X(e,"audio"),i=Te.mn("up",ln().g.item),a=Te.mn("down",ln().g.item),l=[37,39].indexOf(n.keyCode)>-1;if(Wo(n),rn.canScroll||l)switch(an({S:"keydown"}),n.keyCode){case 38:case 33:Gt().k.up&&i&&(rn.M?on.u("onKeyDown",{e:n}):ro());break;case 32:if(t&&Gt().k.up&&!o&&i){ro();break}case 40:case 34:if(Gt().k.down&&a){if(rn.M)return;32===n.keyCode&&o||io()}break;case 36:Gt().k.up&&Ro(1);break;case 35:Gt().k.down&&Ro(ln().h.length);break;case 37:Gt().k.left&&Oo();break;case 39:Gt().k.right&&Eo()}}(n)}),0))}function Po(n){rn.I&&(co=n.ctrlKey)}function Co(){an({I:!1}),co=!1}function Ho(n){return[].slice.call(v('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',n)).filter((function(n){return"-1"!==W(n,"tabindex")&&null!==n.offsetParent}))}function Io(n){Lo()||Wo(n)}function Wo(n){(function(n){return[40,38,32,33,34].indexOf(n.keyCode)>-1&&!rn.M})(n)&&!z(n.target,Nn)&&n.preventDefault()}c.moveSlideLeft=Oo,c.moveSlideRight=Eo,c.moveTo=Ro,on.l("bindEvents",(function(){Z("blur",Co),B("keydown",No),Lt.addEventListener("keydown",Io),B("keyup",Po),on.l("onDestroy",zo)}));var Bo=(new Date).getTime(),Zo=[];function Fo(n){n?(function(){var n,t="";i.addEventListener?n="addEventListener":(n="attachEvent",t="on");var e="onwheel"in r.createElement("div")?"wheel":void 0!==r.onmousewheel?"mousewheel":"DOMMouseScroll",o=Le();"DOMMouseScroll"==e?r[n](t+"MozMousePixelScroll",Vo,o):r[n](t+e,Vo,o)}(),Un().addEventListener("mousedown",Yo),Un().addEventListener("mouseup",Go)):(r.addEventListener?(F("mousewheel",Vo,!1),F("wheel",Vo,!1),F("MozMousePixelScroll",Vo,!1)):r.detachEvent("onmousewheel",Vo),Un().removeEventListener("mousedown",Yo),Un().removeEventListener("mouseup",Go))}function Vo(n){var t=(new Date).getTime(),e=h(v(".fp-completely")[0],"fp-normal-scroll"),o=function(n,t){(new Date).getTime();var e=ln().M&&n.getBoundingClientRect().bottom>=0&&"up"===Ze.Mn(),o=ln().Tn;if(o)return I(t),!1;if(ln().M){if(e){var i;if(!(o||Je("isNewKeyframe","beyondFullpage")&&Ze.yn()))return(i=ht($(ln().h).item.offsetTop+$(ln().h).item.offsetHeight)).element.scrollTo(0,i.options),an({Tn:!1}),I(t),!1;if(Ze.yn())return e=!1,an({Tn:!0}),an({S:"wheel"}),Ye(),I(t),!1}else Je("set","beyondFullpage",1e3);if(!o&&!e)return!0}}(Un(),n);if(rn.H||an({C:!1,H:!0,N:"none"}),!Gt().m.down&&!Gt().m.up)return I(n),!1;if(o)return!0;if(!1===o)return I(n),!1;if(Qn().autoScrolling&&!co&&!e){var r=(n=n||i.event).wheelDelta||-n.deltaY||-n.detail,a=Math.max(-1,Math.min(1,r)),l=void 0!==n.wheelDeltaX||void 0!==n.deltaX,u=Math.abs(n.wheelDeltaX)<Math.abs(n.wheelDelta)||Math.abs(n.deltaX)<Math.abs(n.deltaY)||!l,c=a<0?"down":a>0?"up":"none";Zo.length>149&&Zo.shift(),Zo.push(Math.abs(r)),Qn().scrollBar&&I(n);var s=t-Bo;return Bo=t,s>200&&(Zo=[]),an({P:c}),rn.canScroll&&!ct()&&nn(Zo,10)>=nn(Zo,70)&&u&&(an({S:"wheel"}),uo(a<0?"down":"up")),!1}Qn().fitToSection&&an({L:!1})}function Yo(n){var t;2==n.which&&(t=n.pageY,ao=t,Un().addEventListener("mousemove",lo))}function Go(n){2==n.which&&Un().removeEventListener("mousemove",lo)}function Xo(n){n?(Fo(!0),function(){if((a||u)&&(!lt("dragAndMove")||"mouseonly"===Qn().dragAndMove)){Qn().autoScrolling&&(Lt.removeEventListener(mo.On,Ao,{passive:!1}),Lt.addEventListener(mo.On,Ao,{passive:!1}));var n=Qn().touchWrapper;n.removeEventListener(mo.En,So),n.removeEventListener(mo.On,wo,{passive:!1}),n.addEventListener(mo.En,So),n.addEventListener(mo.On,wo,{passive:!1})}}()):(Fo(!1),function(){if(a||u){Qn().autoScrolling&&(Lt.removeEventListener(mo.On,wo,{passive:!1}),Lt.removeEventListener(mo.On,Ao,{passive:!1}));var n=Qn().touchWrapper;n.removeEventListener(mo.En,So),n.removeEventListener(mo.On,wo,{passive:!1})}}())}c.setMouseWheelScrolling=Fo;var Uo=!0;function Qo(){["mouseenter","touchstart","mouseleave","touchend"].forEach((function(n){F(n,Jo,!0)}))}function _o(n,t){document["fp_"+n]=t,B(n,Jo,!0)}function Jo(n){var t=n.type,e=!1,o="mouseleave"===t?n.toElement||n.relatedTarget:n.target;o!=document&&o?("touchend"===t&&(Uo=!1,setTimeout((function(){Uo=!0}),800)),("mouseenter"!==t||Uo)&&(Qn().normalScrollElements.split(",").forEach((function(n){if(!e){var t=X(o,n),i=z(o,n);(t||i)&&(c.shared.kn||Xo(!1),c.shared.kn=!0,e=!0)}})),!e&&c.shared.kn&&(Xo(!0),c.shared.kn=!1))):Xo(!0)}function Ko(n,t){Tt(0,"internal"),Ro(n,t),Tt(_n().scrollingSpeed,"internal")}on.l("bindEvents",(function(){Qn().normalScrollElements&&(["mouseenter","touchstart"].forEach((function(n){_o(n,!1)})),["mouseleave","touchend"].forEach((function(n){_o(n,!0)}))),on.l("onDestroy",Qo)})),c.silentMoveTo=Ko;var qo,$o=g(),ni=m(),ti=!1;function ei(){clearTimeout(qo),V("resize",oi)}function oi(){ti||(Qn().autoScrolling&&!Qn().scrollBar||!Qn().fitToSection)&&ri(g()),ti=!0,clearTimeout(qo),qo=setTimeout((function(){!function(){if(an({O:!0}),ri(""),G(Un(),"onResize"),!Qn().fitToSection||Qn().autoScrolling||rn.M||function(){if(!Qn().autoScrolling||Qn().scrollBar){var n=.01*i.innerHeight;r.documentElement.style.setProperty("--vh","".concat(n,"px"))}}(),on.u("contentChanged"),oe(),be(),a){var n=r.activeElement;if(!X(n,"textarea")&&!X(n,"input")&&!X(n,"select")){var t=g();Math.abs(t-$o)>20*Math.max($o,t)/100&&(ii(!0),$o=t)}}else e=g(),o=m(),rn.B===e&&ni===o||(an({B:e}),ni=o,ii(!0));var e,o;G(Un(),"onResizeEnds"),an({O:!1})}(),ti=!1}),400)}function ii(n){if(!h(Un(),hn)){an({O:!0,B:g(),Dn:m()});for(var t=ln().h,e=0;e<t.length;++e){var o=t[e],r=v(Dn,o.item)[0],a=o.slides;lt("offsetSections")&&w(o,{height:ft(o.item)+"px"}),a.length>1&&_t(r,o.activeSlide.item)}Qn().scrollOverflow&&Te.rn();var l=ut("responsiveSlides","getActiveIndex")||ln().g.index();rn.M||!l||lt("fadingEffect")||lt("dropEffect")||lt("waterEffect")||Ko(l+1),an({O:!1}),Y(Qn().afterResize)&&n&&Qn().afterResize.call(Un(),i.innerWidth,i.innerHeight),Y(Qn().afterReBuild)&&!n&&Qn().afterReBuild.call(Un()),G(Un(),"afterRebuild")}}function ri(n){var t=""===n?"":n+"px";ln().h.forEach((function(n){w(n.item,{height:t})}))}function ai(){var n,t,e=i.location.hash;if(e.length){var o=e.replace("#","").split("/"),r=e.indexOf("#/")>-1;n=r?"/"+o[1]:decodeURIComponent(o[0]);var a=r?o[2]:o[1];a&&a.length&&(t=decodeURIComponent(a))}return{section:n,J:t}}function li(){V("hashchange",ui)}function ui(){if(!rn.D&&!Qn().lockAnchors){var n=ai(),t=n.section,e=n.J,o=void 0===rn.j,i=void 0===rn.j&&void 0===e&&!rn.A;t&&t.length&&(t&&t!==rn.j&&!o||i&&!ct()||!rn.A&&rn.R!=e&&!ct())&&on.u("onScrollPageAndSlide",{jn:t,slideAnchor:e})}}function ci(n){var t=n.target;z(t,Qn().menu+" [data-menuanchor]")&&si.call(t,n)}function si(n){an({S:"menu"}),!v(Qn().menu)[0]||!Qn().lockAnchors&&Qn().anchors.length||(I(n),on.u("onMenuClick",{anchor:W(this,"data-menuanchor")}))}function fi(n){var t=n.target;t&&z(t,"#fp-nav a")?de.call(t,n.e):X(t,".fp-tooltip")?se.call(t):(X(t,Cn)||null!=z(t,Cn))&&Zt.call(t,n.e)}c.reBuild=ii,on.l("bindEvents",(function(){Z("resize",oi),on.l("onDestroy",ei)})),c.setLockAnchors=function(n){Qn().lockAnchors=n},on.l("bindEvents",(function(){Z("hashchange",ui),on.l("onDestroy",li)})),on.l("bindEvents",(function(){B("wheel",Ze.Sn,Le()),on.l("scrollBeyondFullpage",Fe),on.l("onKeyDown",Ve)})),on.l("bindEvents",(function(){on.l("onClickOrTouch",ci)})),on.l("bindEvents",(function(){on.l("onClickOrTouch",fi)}));var di,vi=0;function pi(n){var t,e,o,i,a;if(G(Un(),"onScroll"),!rn.O&&ln().g&&($(ln().h),!ln().M&&!ln().Tn&&(!Qn().autoScrolling||Qn().scrollBar||lt("dragAndMove"))&&!st())){var l=lt("dragAndMove")?Math.abs(ut("dragAndMove","getCurrentScroll")):C(Qn()),u=function(n){var t=n>vi?"down":"up";return vi=n,an({W:n}),t}(l),c=0,s=l+g()/2,f=(lt("dragAndMove")?ut("dragAndMove","getDocumentHeight"):Lt.scrollHeight-g())===l,d=(ut("responsiveSlides","areSlidesSections")?ut("responsiveSlides","panels"):null)||ln().h;if(an({scrollY:l}),f)c=d.length-1;else if(l)for(var v=0;v<d.length;++v)(z(d[v].item,yn)||d[v].item).offsetTop<=s&&(c=v);else c=0;if(o=u,i=ln().g.item.offsetTop,a=i+g(),("up"==o?a>=C(Qn())+g():i<=C(Qn()))&&(h(ln().g.item,bn)||(O(ln().g.item,bn),E(H(ln().g.item),bn))),e=(t=d[c]).item,!ut("responsiveSlides","isCurrentSectionActive",c)&&!t.isActive){an({D:!0});var p,m,b=ln().g.item,S=ln().g.index()+1,y=wt(ln().g,e),M=ut("responsiveSlides","getSectionAnchor",t)||t.anchor,T=t.index()+1,A=t.activeSlide,x={g:b,sectionIndex:T-1,anchorLink:M,element:e,leavingSection:S,direction:y,items:{origin:ln().g,destination:t}};if(A&&(m=A.anchor,p=A.index()),rn.canScroll)E(d.filter((function(n){return n.index()!==t.index()})).map((function(n){return n.item})),mn),O(e,mn),ut("parallax","afterLoad"),Y(Qn().beforeLeave)&&no("beforeLeave",x),Y(Qn().onLeave)&&kt("onLeave",x),Y(Qn().afterLoad)&&kt("afterLoad",x),ut("resetSliders","apply",{localIsResizing:rn.O,leavingSection:S}),Rt(b),zt(e),Dt(e),$e(M,T-1),Qn().anchors.length&&an({j:M}),It(p,m,M),oe();clearTimeout(di),di=setTimeout((function(){an({D:!1})}),100)}Qn().fitToSection&&(clearTimeout(di),di=setTimeout((function(){an({D:!1}),rn.h.filter((function(n){var t=n.item.getBoundingClientRect();return Math.round(t.bottom)===Math.round(g())||0===Math.round(t.top)})).length||w(r.body,{"scroll-snap-type":"y mandatory"})}),300))}}function hi(n,t){void 0!==t?(t=t.replace(/ /g,"").split(",")).forEach((function(t){Yt(n,t,"k")})):(Yt(n,"all","k"),Qn().keyboardScrolling=n)}function gi(n){var t=n.index();void 0!==Qn().anchors[t]&&n.isActive&&$e(Qn().anchors[t],t),Qn().menu&&Qn().css3&&null!=z(v(Qn().menu)[0],dn)&&v(Qn().menu).forEach((function(n){Lt.appendChild(n)}))}function mi(){w(function(n,t){var e=[n];do{n=n.parentNode,e.push(n)}while(!X(n,"body"));return e}(Un()),{height:"100%",position:"relative"}),O(Un(),fn),O(Nt,gn),an({B:g()}),E(Un(),hn),ce(),ut("parallax","init");for(var n=ln().G,t=0;t<n.length;t++){var e=n[t],o=e.tn;e.item.setAttribute("data-fp-styles",W(e.item,"style")),ke(e),gi(e),o.length>0&&xe(e)}Qn().fixedElements&&Qn().css3&&v(Qn().fixedElements).forEach((function(n){Lt.appendChild(n)})),Qn().navigation&&fe(),v('iframe[src*="youtube.com/embed/"]',Un()).forEach((function(n){var t,e;e=W(t=n,"src"),t.setAttribute("src",e+(/\?/.test(e)?"&":"?")+"enablejsapi=1")})),ut("fadingEffect","apply"),ut("waterEffect","init"),ut("dropEffect","init"),ut("cards","init"),Qn().scrollOverflow&&Te.rn()}function wi(){var n,t,e=ln().g,o=ln().g.item;O(o,bn),zt(o),qe(),Dt(o),t=ko((n=ai()).section),n.section&&t&&(void 0===t||t.index()!==y(Ee))||!Y(Qn().afterLoad)||kt("afterLoad",{g:o,element:o,direction:null,anchorLink:e.anchor,sectionIndex:e.index(),items:{origin:ln().g,destination:ln().g}}),Y(Qn().afterRender)&&kt("afterRender"),G(Un(),"afterRender")}function bi(n,t){void 0!==t?(t=t.replace(/ /g,"").split(",")).forEach((function(t){Yt(n,t,"m")})):Yt(n,"all","m"),G(Un(),"setAllowScrolling",{value:n,Rn:t})}function Si(){var n=ai(),t=n.section,e=n.J;t&&(Qn().animateAnchor?jo(t,e):Ko(t,e))}on.l("onDestroy",(function(){clearTimeout(di),clearTimeout(void 0)})),on.l("bindEvents",(function(){Z("scroll",pi),r.body.addEventListener("scroll",pi),on.l("onScrollPageAndSlide",(function(n){jo(n.jn,n.slideAnchor)})),on.l("onMenuClick",(function(n){Ro(n.anchor,void 0)})),on.l("onScrollOverflowScrolled",(function(n){("down"===n.direction?io:ro)()})),on.l("scrollPage",(function(n){to(n.destination)}))})),on.l("onDestroy",(function(){V("scroll",pi)})),c.getActiveSlide=function(){return Et(ln().g.activeSlide)},c.getScrollX=function(){return rn.scrollX},on.l("bindEvents",(function(){on.l("onDestroy",qt),on.l("landscapeScroll",(function(n){_t(n.slides,n.destination)})),on.l("moveSlideRight",(function(n){Eo(n.section)})),on.l("moveSlideLeft",(function(n){Oo(n.section)}))})),on.l("bindEvents",(function(){var n=Qn().credits.position,t=["left","right"].indexOf(n)>-1?"".concat(n,": 0;"):"",e='\n        <div class="fp-watermark" style="'.concat(t,'">\n            <a href="https://alvarotrigo.com/fullPage/" \n                rel="nofollow noopener" \n                target="_blank" \n                style="text-decoration:none; color: #000;">\n                    ').concat(Qn().credits.label,"\n            </a>\n        </div>\n    "),o=$(rn.h),i=Qn().credits.enabled&&!rn.zn;o&&o.item&&i&&o.item.insertAdjacentHTML("beforeend",e)})),function(){on.l("onInitialise",(function(){var t,l;an({zn:(Qn().licenseKey,t=Qn().licenseKey,l=function(t){var e=parseInt("514").toString(16);if(!t||t.length<29||4===t.split(n[0]).length)return null;var o=["Each","for"][i()]().join(""),l=t[["split"]]("-"),u=[];l[o]((function(n,t){if(t<4){var o=function(n){var t=n[n.length-1],e=["NaN","is"][i()]().join("");return window[e](t)?r(t):function(n){return n-mn.length}(t)}(n);u.push(o);var a=r(n[o]);if(1===t){var l=["pa","dS","t","art"].join("");a=a.toString()[l](2,"0")}e+=a,0!==t&&1!==t||(e+="-")}}));var c=0,s="";return t.split("-").forEach((function(n,t){if(t<4){for(var e=0,o=0;o<4;o++)o!==u[t]&&(e+=Math.abs(r(n[o])),isNaN(n[o])||c++);var i=a(e);s+=i}})),s+=a(c),{Ln:new Date(e+"T00:00"),Nn:e.split("-")[2]===8*(mn.length-2)+"",Pn:s}}(t),l&&(Qn().credits&&l&&e<=l.Ln&&l.Pn===t.split(n[0])[4]||function(n){var t=o[i()]().join("");return n&&0===t.indexOf(n)&&n.length===t.length}(t)||l.Nn)||!1)})}));var n=["-"],t="2022-4-9".split("-"),e=new Date(t[0],t[1],t[2]),o=["se","licen","-","v3","l","gp"];function i(){return[["re","verse"].join("")]["".length]}function r(n){return n?isNaN(n)?n.charCodeAt(0)-72:n:""}function a(n){var t=72+n;return t>90&&t<97&&(t+=15),String.fromCharCode(t).toUpperCase()}}(),c.setKeyboardScrolling=hi,c.shared.Cn=wi,c.setAllowScrolling=bi;var yi={};function Mi(){return yi}var Ti,Ai,xi,Oi,Ei=!h(Lt,vt("OHNsd3AtZnVsbHBhZ2UtanM5T20="));function ki(n){if(Ai=r.createElement("div"),Ti=vt("MTIzPGRpdj48YSBocmVmPSJodHRwOi8vYWx2YXJvdHJpZ28uY29tL2Z1bGxQYWdlL2V4dGVuc2lvbnMvIiBzdHlsZT0iY29sb3I6ICNmZmYgIWltcG9ydGFudDsgdGV4dC1kZWNvcmF0aW9uOm5vbmUgIWltcG9ydGFudDsiPlVubGljZW5zZWQgZnVsbFBhZ2UuanMgRXh0ZW5zaW9uPC9hPjwvZGl2PjEyMw=="),Ei||(Ti=Ti.replace("extensions/","").replace("Extension","")),Ai.innerHTML=Ti,Ai=Ai.firstChild,"MutationObserver"in window&&new MutationObserver(ji).observe(r.body,{childList:!0,subtree:!1}),(!Ei||lt(n)&&c[n])&&(!function(n){var t=void 0!==Mi()[n]&&Mi()[n].length,e=[],o=!1;return x(Mi()[n])?e=Mi()[n]:e.push(Mi()[n]),e.forEach((function(e){var i=function(){if(r.domain.length){for(var n=r.domain.replace(/^(www\.)/,"").split(".");n.length>2;)n.shift();return n.join(".").replace(/(^\.*)|(\.*$)/g,"")}return""}(),a=["MTM0bG9jYWxob3N0MjM0","MTM0MC4xMjM0","MTM0anNoZWxsLm5ldDIzNA==","UDdDQU5ZNlNN","NTY3YnVuZGxlNzg5","NTU1S2V5Nzc3"],l=vt(a[0]),u=vt(a[1]),c=vt(a[2]),s=vt(a[3]),f=vt(a[4]),d=vt(a[5]),v=void 0!==Qn()[f+d];t=t||v;var p=[l,u,c].indexOf(i)<0&&0!==i.length;if(!t&&!v&&p)return!1;var h=t?vt(e):"",g=(h=h.split("_")).length>1&&h[1].indexOf(n,h[1].length-n.length)>-1,m=h.length>1&&h[1].toLowerCase().indexOf(f)>-1,w=h[0].indexOf(i,h[0].length-i.length)<0,b=g||m;o=o||!(w&&p&&s!=h[0])&&b||!p})),o}(n)||!Ei)){Di();var t=vt("MzQ1c2V0SW50ZXJ2YWwxMjM=");window[t](Di,2e3)}}function Di(){Ai&&(Oi||(Math.random()<.5?dt(Lt,Ai):k(Ai,Lt),Oi=!0),Ai.setAttribute("style",vt("MTIzei1pbmRleDo5OTk5OTk5O3Bvc2l0aW9uOmZpeGVkO3RvcDoyMHB4O2JvdHRvbTphdXRvO2xlZnQ6MjBweDtyaWdodDphdXRvO2JhY2tncm91bmQ6cmVkO3BhZGRpbmc6N3B4IDE1cHg7Zm9udC1zaXplOjE0cHg7Zm9udC1mYW1pbHk6YXJpYWw7Y29sb3I6I2ZmZjtkaXNwbGF5OmlubGluZS1ibG9jazt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO29wYWNpdHk6MTtoZWlnaHQ6YXV0bzt3aWR0aDphdXRvO3pvb206MTttYXJnaW46YXV0bztib3JkZXI6bm9uZTt2aXNpYmlsaXR5OnZpc2libGU7Y2xpcC1wYXRoOm5vbmU7MTIz").replace(/;/g,vt("MTIzICFpbXBvcnRhbnQ7MzQ1"))))}function ji(n){n.forEach((function(n){if(n.removedNodes[0]&&n.removedNodes[0].isEqualNode(Ai)){clearTimeout(xi);var t=vt("bDIwc2V0VGltZW91dDAzbA==");xi=window[t](Ri,900)}}))}function Ri(){Oi=!1}function zi(){var n=Qn().licenseKey;Qn()&&rn.zn||r.domain.indexOf("alvarotrigo.com")>-1?n&&n.length:(s("error","Fullpage.js requires a `licenseKey` option. Read about it on the following URL:"),s("error","https://github.com/alvarotrigo/fullPage.js#options")),h(Nt,gn)?s("error","Fullpage.js can only be initialized once and you are doing it multiple times!"):(Qn().continuousVertical&&(Qn().loopTop||Qn().loopBottom)&&(Qn().continuousVertical=!1,s("warn","Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),!Qn().scrollOverflow||!Qn().scrollBar&&Qn().autoScrolling||s("warn","Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox"),!Qn().continuousVertical||!Qn().scrollBar&&Qn().autoScrolling||(Qn().continuousVertical=!1,s("warn","Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),Qn().anchors.forEach((function(n){var t=[].slice.call(v("[name]")).filter((function(t){return W(t,"name")&&W(t,"name").toLowerCase()==n.toLowerCase()})),e=[].slice.call(v("[id]")).filter((function(t){return W(t,"id")&&W(t,"id").toLowerCase()==n.toLowerCase()}));if(e.length||t.length){s("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");var o=e.length?"id":"name";(e.length||t.length)&&s("error",'"'+n+'" is is being used by another element `'+o+"` property")}})))}function Li(){return{options:Qn(),internals:{container:Un(),canScroll:rn.canScroll,isScrollAllowed:Gt(),getDestinationPosition:eo,isTouch:u,c:ki,getXmovement:Kt,removeAnimation:bt,getTransforms:St,lazyLoad:zt,addAnimation:mt,performHorizontalMove:Jt,landscapeScroll:_t,silentLandscapeScroll:ne,keepSlidesPosition:Ke,silentScroll:Mt,styleSlides:xe,styleSection:ke,scrollHandler:pi,getEventsPage:Mo,getMSPointer:To,isReallyTouch:bo,usingExtension:lt,toggleControlArrows:Ut,touchStartHandler:So,touchMoveHandler:wo,nullOrSection:Ot,items:{SectionPanel:le,SlidePanel:ue,Item:$n},getVisible:d,getState:ln,updateState:oe,getPanels:function(){return rn.U},getSections:function(){return rn.h},setActiveSection:function(n){rn.g=n}}}}function Ni(n){var t=["NTY3YnVuZGxlNzg5","NTU1S2V5Nzc3"],e=vt(t[0]),o=vt(t[1]),i=void 0!==Qn()[e+o],r="fp_"+n+"Extension";Mi()[n]=i?Qn()[e+o]:Qn()[n+o],c[n]=void 0!==window[r]?new window[r]:null,c[n]&&c[n].c(n)}function Pi(n,t){var e;if(Lt=v("body")[0],Nt=v("html")[0],Pt=v("html, body"),!h(Nt,gn))return"touchWrapper",e="string"==typeof n?v(n)[0]:n,Fn.touchWrapper=e,function(n){Xn=p({},Fn,n),Gn=Object.assign({},Xn)}(t),function(n){Vn=n}("string"==typeof n?v(n)[0]:n),on.u("onInitialise"),zi(),c.getFullpageData=Li,c.version="4.0.7",c.test=Object.assign(c.test,{top:"0px",_:"translate3d(0px, 0px, 0px)",K:function(){for(var n=[],t=0;t<v(Qn().sectionSelector,Un()).length;t++)n.push("translate3d(0px, 0px, 0px)");return n}(),left:function(){for(var n=[],t=0;t<v(Qn().sectionSelector,Un()).length;t++)n.push(0);return n}(),options:Qn(),setAutoScrolling:null}),c.shared=Object.assign(c.shared,{Cn:null,kn:!1}),i.fullpage_api=c,i.fullpage_extensions=!0,Un()&&(on.u("beforeInit"),Ni("continuousHorizontal"),Ni("scrollHorizontally"),Ni("resetSliders"),Ni("interlockedSlides"),Ni("responsiveSlides"),Ni("fadingEffect"),Ni("dragAndMove"),Ni("offsetSections"),Ni("scrollOverflowReset"),Ni("parallax"),Ni("cards"),Ni("dropEffect"),Ni("waterEffect"),ut("dragAndMove","init"),ut("responsiveSlides","init"),ie(),oe(),Qn().scrollBar=Qn().scrollBar||Qn().hybrid,Kn(),mi(),we(!0),bi(!0),Xo(!0),pe(Qn().autoScrolling,"internal"),be(),Ct(),"complete"===r.readyState&&Si(),Z("load",Si),wi(),Ei||ki("l"),ie(),oe(),on.u("bindEvents"),ut("dragAndMove","turnOffTouch")),i.fullpage_api;zi()}return c.destroy=function(n){G(Un(),"destroy",n),pe(!1,"internal"),bi(!0),Xo(!1),hi(!1),O(Un(),hn),on.u("onDestroy"),ut("dragAndMove","destroy"),n&&(Mt(0),v("img[data-src], source[data-src], audio[data-src], iframe[data-src]",Un()).forEach((function(n){tn(n,"src")})),v("img[data-srcset]").forEach((function(n){tn(n,"srcset")})),_(v("#fp-nav, .fp-slidesNav, .fp-controlArrow")),w(nt(ln().h),{height:"","background-color":"",padding:""}),w(nt(ln().slides),{width:""}),w(Un(),{height:"",position:"","-ms-touch-action":"","touch-action":""}),w(Pt,{overflow:"",height:""}),E(Nt,gn),E(Lt,vn),Lt.className.split(/\s+/).forEach((function(n){0===n.indexOf("fp-viewing")&&E(Lt,n)})),nt(ln().U).forEach((function(n){Qn().scrollOverflow&&E(n,Ln),E(n,"fp-table active "+bn),W(n,"data-fp-styles")&&n.setAttribute("style",W(n,"data-fp-styles")),h(n,Sn)&&!Yn&&n.removeAttribute("data-anchor")})),bt(Un()),[Mn,Rn,Dn].forEach((function(n){v(n,Un()).forEach((function(n){R(n)}))})),w(Un(),{"-webkit-transition":"none",transition:"none"}),i.scrollTo(0,0),[Sn,xn,jn].forEach((function(n){E(v("."+n),n)})))},i.fp_easings=p(i.fp_easings,{easeInOutCubic:function(n,t,e,o){return(n/=o/2)<1?e/2*n*n*n+t:e/2*((n-=2)*n*n+2)+t}}),i.jQuery&&function(n,t){n&&t?n.fn.fullpage=function(e){e=n.extend({},e,{$:n}),new t(this[0],e),Object.keys(c).forEach((function(n){Qn().$.fn.fullpage[n]=c[n]}))}:s("error","jQuery is required to use the jQuery fullpage adapter!")}(i.jQuery,Pi),Pi}));



// spliting
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):n.Splitting=t()}(this,function(){"use strict"
var u=document,l=u.createTextNode.bind(u)
function d(n,t,e){n.style.setProperty(t,e)}function f(n,t){return n.appendChild(t)}function p(n,t,e,r){var i=u.createElement("span")
return t&&(i.className=t),e&&(!r&&i.setAttribute("data-"+t,e),i.textContent=e),n&&f(n,i)||i}function h(n,t){return n.getAttribute("data-"+t)}function m(n,t){return n&&0!=n.length?n.nodeName?[n]:[].slice.call(n[0].nodeName?n:(t||u).querySelectorAll(n)):[]}function o(n){for(var t=[];n--;)t[n]=[]
return t}function g(n,t){n&&n.some(t)}function c(t){return function(n){return t[n]}}var a={}
function n(n,t,e,r){return{by:n,depends:t,key:e,split:r}}function e(n){return function t(e,n,r){var i=r.indexOf(e)
if(-1==i)r.unshift(e),g(a[e].depends,function(n){t(n,e,r)})
else{var u=r.indexOf(n)
r.splice(i,1),r.splice(u,0,e)}return r}(n,0,[]).map(c(a))}function t(n){a[n.by]=n}function v(n,r,i,u,o){n.normalize()
var c=[],a=document.createDocumentFragment()
u&&c.push(n.previousSibling)
var s=[]
return m(n.childNodes).some(function(n){if(!n.tagName||n.hasChildNodes()){if(n.childNodes&&n.childNodes.length)return s.push(n),void c.push.apply(c,v(n,r,i,u,o))
var t=n.wholeText||"",e=t.trim()
e.length&&(" "===t[0]&&s.push(l(" ")),g(e.split(i),function(n,t){t&&o&&s.push(p(a,"whitespace"," ",o))
var e=p(a,r,n)
c.push(e),s.push(e)})," "===t[t.length-1]&&s.push(l(" ")))}else s.push(n)}),g(s,function(n){f(a,n)}),n.innerHTML="",f(n,a),c}var s=0
var i="words",r=n(i,s,"word",function(n){return v(n,"word",/\s+/,0,1)}),y="chars",w=n(y,[i],"char",function(n,e,t){var r=[]
return g(t[i],function(n,t){r.push.apply(r,v(n,"char","",e.whitespace&&t))}),r})
function b(t){var f=(t=t||{}).key
return m(t.target||"[data-splitting]").map(function(a){var s=a["🍌"]
if(!t.force&&s)return s
s=a["🍌"]={el:a}
var n=e(t.by||h(a,"splitting")||y),l=function(n,t){for(var e in t)n[e]=t[e]
return n}({},t)
return g(n,function(n){if(n.split){var t=n.by,e=(f?"-"+f:"")+n.key,r=n.split(a,l,s)
e&&(i=a,c=(o="--"+e)+"-index",g(u=r,function(n,t){Array.isArray(n)?g(n,function(n){d(n,c,t)}):d(n,c,t)}),d(i,o+"-total",u.length)),s[t]=r,a.classList.add(t)}var i,u,o,c}),a.classList.add("splitting"),s})}function N(n,t,e){var r=m(t.matching||n.children,n),i={}
return g(r,function(n){var t=Math.round(n[e]);(i[t]||(i[t]=[])).push(n)}),Object.keys(i).map(Number).sort(x).map(c(i))}function x(n,t){return n-t}b.html=function(n){var t=(n=n||{}).target=p()
return t.innerHTML=n.content,b(n),t.outerHTML},b.add=t
var T=n("lines",[i],"line",function(n,t,e){return N(n,{matching:e[i]},"offsetTop")}),L=n("items",s,"item",function(n,t){return m(t.matching||n.children,n)}),k=n("rows",s,"row",function(n,t){return N(n,t,"offsetTop")}),A=n("cols",s,"col",function(n,t){return N(n,t,"offsetLeft")}),C=n("grid",["rows","cols"]),M="layout",S=n(M,s,s,function(n,t){var e=t.rows=+(t.rows||h(n,"rows")||1),r=t.columns=+(t.columns||h(n,"columns")||1)
if(t.image=t.image||h(n,"image")||n.currentSrc||n.src,t.image){var i=m("img",n)[0]
t.image=i&&(i.currentSrc||i.src)}t.image&&d(n,"background-image","url("+t.image+")")
for(var u=e*r,o=[],c=p(s,"cell-grid");u--;){var a=p(c,"cell")
p(a,"cell-inner"),o.push(a)}return f(n,c),o}),H=n("cellRows",[M],"row",function(n,t,e){var r=t.rows,i=o(r)
return g(e[M],function(n,t,e){i[Math.floor(t/(e.length/r))].push(n)}),i}),O=n("cellColumns",[M],"col",function(n,t,e){var r=t.columns,i=o(r)
return g(e[M],function(n,t){i[t%r].push(n)}),i}),j=n("cells",["cellRows","cellColumns"],"cell",function(n,t,e){return e[M]})
return t(r),t(w),t(T),t(L),t(k),t(A),t(C),t(S),t(H),t(O),t(j),b})

/*!
 * VERSION: 1.18.4
 * DATE: 2016-04-26
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},e=function(a,b,c){var d,e,f=a.cycle;for(d in f)e=f[d],a[d]="function"==typeof e?e.call(b[c],c):e[c%e.length];delete a.cycle},f=function(a,b,d){c.call(this,a,b,d),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=f.prototype.render},g=1e-10,h=c._internals,i=h.isSelector,j=h.isArray,k=f.prototype=c.to({},.1,{}),l=[];f.version="1.18.4",k.constructor=f,k.kill()._gc=!1,f.killTweensOf=f.killDelayedCallsTo=c.killTweensOf,f.getTweensOf=c.getTweensOf,f.lagSmoothing=c.lagSmoothing,f.ticker=c.ticker,f.render=c.render,k.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),c.prototype.invalidate.call(this)},k.updateTo=function(a,b){var d,e=this.ratio,f=this.vars.immediateRender||a.immediateRender;b&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(d in a)this.vars[d]=a[d];if(this._initted||f)if(b)this._initted=!1,f&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&c._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var g=this._totalTime;this.render(0,!0,!1),this._initted=!1,this.render(g,!0,!1)}else if(this._initted=!1,this._init(),this._time>0||f)for(var h,i=1/(1-e),j=this._firstPT;j;)h=j.s+j.c,j.c*=i,j.s=h-j.c,j=j._next;return this},k.render=function(a,b,c){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var d,e,f,i,j,k,l,m,n=this._dirty?this.totalDuration():this._totalDuration,o=this._time,p=this._totalTime,q=this._cycle,r=this._duration,s=this._rawPrevTime;if(a>=n-1e-7?(this._totalTime=n,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=r,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(d=!0,e="onComplete",c=c||this._timeline.autoRemoveChildren),0===r&&(this._initted||!this.vars.lazy||c)&&(this._startTime===this._timeline._duration&&(a=0),(0>s||0>=a&&a>=-1e-7||s===g&&"isPause"!==this.data)&&s!==a&&(c=!0,s>g&&(e="onReverseComplete")),this._rawPrevTime=m=!b||a||s===a?a:g)):1e-7>a?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==p||0===r&&s>0)&&(e="onReverseComplete",d=this._reversed),0>a&&(this._active=!1,0===r&&(this._initted||!this.vars.lazy||c)&&(s>=0&&(c=!0),this._rawPrevTime=m=!b||a||s===a?a:g)),this._initted||(c=!0)):(this._totalTime=this._time=a,0!==this._repeat&&(i=r+this._repeatDelay,this._cycle=this._totalTime/i>>0,0!==this._cycle&&this._cycle===this._totalTime/i&&a>=p&&this._cycle--,this._time=this._totalTime-this._cycle*i,this._yoyo&&0!==(1&this._cycle)&&(this._time=r-this._time),this._time>r?this._time=r:this._time<0&&(this._time=0)),this._easeType?(j=this._time/r,k=this._easeType,l=this._easePower,(1===k||3===k&&j>=.5)&&(j=1-j),3===k&&(j*=2),1===l?j*=j:2===l?j*=j*j:3===l?j*=j*j*j:4===l&&(j*=j*j*j*j),1===k?this.ratio=1-j:2===k?this.ratio=j:this._time/r<.5?this.ratio=j/2:this.ratio=1-j/2):this.ratio=this._ease.getRatio(this._time/r)),o===this._time&&!c&&q===this._cycle)return void(p!==this._totalTime&&this._onUpdate&&(b||this._callback("onUpdate")));if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!c&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=o,this._totalTime=p,this._rawPrevTime=s,this._cycle=q,h.lazyTweens.push(this),void(this._lazy=[a,b]);this._time&&!d?this.ratio=this._ease.getRatio(this._time/r):d&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==o&&a>=0&&(this._active=!0),0===p&&(2===this._initted&&a>0&&this._init(),this._startAt&&(a>=0?this._startAt.render(a,b,c):e||(e="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===r)&&(b||this._callback("onStart"))),f=this._firstPT;f;)f.f?f.t[f.p](f.c*this.ratio+f.s):f.t[f.p]=f.c*this.ratio+f.s,f=f._next;this._onUpdate&&(0>a&&this._startAt&&this._startTime&&this._startAt.render(a,b,c),b||(this._totalTime!==p||e)&&this._callback("onUpdate")),this._cycle!==q&&(b||this._gc||this.vars.onRepeat&&this._callback("onRepeat")),e&&(!this._gc||c)&&(0>a&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(a,b,c),d&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[e]&&this._callback(e),0===r&&this._rawPrevTime===g&&m!==g&&(this._rawPrevTime=0))},f.to=function(a,b,c){return new f(a,b,c)},f.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,new f(a,b,c)},f.fromTo=function(a,b,c,d){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,new f(a,b,d)},f.staggerTo=f.allTo=function(a,b,g,h,k,m,n){h=h||0;var o,p,q,r,s=0,t=[],u=function(){g.onComplete&&g.onComplete.apply(g.onCompleteScope||this,arguments),k.apply(n||g.callbackScope||this,m||l)},v=g.cycle,w=g.startAt&&g.startAt.cycle;for(j(a)||("string"==typeof a&&(a=c.selector(a)||a),i(a)&&(a=d(a))),a=a||[],0>h&&(a=d(a),a.reverse(),h*=-1),o=a.length-1,q=0;o>=q;q++){p={};for(r in g)p[r]=g[r];if(v&&e(p,a,q),w){w=p.startAt={};for(r in g.startAt)w[r]=g.startAt[r];e(p.startAt,a,q)}p.delay=s+(p.delay||0),q===o&&k&&(p.onComplete=u),t[q]=new f(a[q],b,p),s+=h}return t},f.staggerFrom=f.allFrom=function(a,b,c,d,e,g,h){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,f.staggerTo(a,b,c,d,e,g,h)},f.staggerFromTo=f.allFromTo=function(a,b,c,d,e,g,h,i){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,f.staggerTo(a,b,d,e,g,h,i)},f.delayedCall=function(a,b,c,d,e){return new f(b,0,{delay:a,onComplete:b,onCompleteParams:c,callbackScope:d,onReverseComplete:b,onReverseCompleteParams:c,immediateRender:!1,useFrames:e,overwrite:0})},f.set=function(a,b){return new f(a,0,b)},f.isTweening=function(a){return c.getTweensOf(a,!0).length>0};var m=function(a,b){for(var d=[],e=0,f=a._first;f;)f instanceof c?d[e++]=f:(b&&(d[e++]=f),d=d.concat(m(f,b)),e=d.length),f=f._next;return d},n=f.getAllTweens=function(b){return m(a._rootTimeline,b).concat(m(a._rootFramesTimeline,b))};f.killAll=function(a,c,d,e){null==c&&(c=!0),null==d&&(d=!0);var f,g,h,i=n(0!=e),j=i.length,k=c&&d&&e;for(h=0;j>h;h++)g=i[h],(k||g instanceof b||(f=g.target===g.vars.onComplete)&&d||c&&!f)&&(a?g.totalTime(g._reversed?0:g.totalDuration()):g._enabled(!1,!1))},f.killChildTweensOf=function(a,b){if(null!=a){var e,g,k,l,m,n=h.tweenLookup;if("string"==typeof a&&(a=c.selector(a)||a),i(a)&&(a=d(a)),j(a))for(l=a.length;--l>-1;)f.killChildTweensOf(a[l],b);else{e=[];for(k in n)for(g=n[k].target.parentNode;g;)g===a&&(e=e.concat(n[k].tweens)),g=g.parentNode;for(m=e.length,l=0;m>l;l++)b&&e[l].totalTime(e[l].totalDuration()),e[l]._enabled(!1,!1)}}};var o=function(a,c,d,e){c=c!==!1,d=d!==!1,e=e!==!1;for(var f,g,h=n(e),i=c&&d&&e,j=h.length;--j>-1;)g=h[j],(i||g instanceof b||(f=g.target===g.vars.onComplete)&&d||c&&!f)&&g.paused(a)};return f.pauseAll=function(a,b,c){o(!0,a,b,c)},f.resumeAll=function(a,b,c){o(!1,a,b,c)},f.globalTimeScale=function(b){var d=a._rootTimeline,e=c.ticker.time;return arguments.length?(b=b||g,d._startTime=e-(e-d._startTime)*d._timeScale/b,d=a._rootFramesTimeline,e=c.ticker.frame,d._startTime=e-(e-d._startTime)*d._timeScale/b,d._timeScale=a._rootTimeline._timeScale=b,b):d._timeScale},k.progress=function(a,b){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),b):this._time/this.duration()},k.totalProgress=function(a,b){return arguments.length?this.totalTime(this.totalDuration()*a,b):this._totalTime/this.totalDuration()},k.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,b)):this._time},k.duration=function(b){return arguments.length?a.prototype.duration.call(this,b):this._duration},k.totalDuration=function(a){return arguments.length?-1===this._repeat?this:this.duration((a-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},k.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},k.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},k.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},f},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(a,b,c){var d=function(a){b.call(this,a),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var c,d,e=this.vars;for(d in e)c=e[d],i(c)&&-1!==c.join("").indexOf("{self}")&&(e[d]=this._swapSelfInParams(c));i(e.tweens)&&this.add(e.tweens,0,e.align,e.stagger)},e=1e-10,f=c._internals,g=d._internals={},h=f.isSelector,i=f.isArray,j=f.lazyTweens,k=f.lazyRender,l=_gsScope._gsDefine.globals,m=function(a){var b,c={};for(b in a)c[b]=a[b];return c},n=function(a,b,c){var d,e,f=a.cycle;for(d in f)e=f[d],a[d]="function"==typeof e?e.call(b[c],c):e[c%e.length];delete a.cycle},o=g.pauseCallback=function(){},p=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},q=d.prototype=new b;return d.version="1.18.4",q.constructor=d,q.kill()._gc=q._forcingPlayhead=q._hasPause=!1,q.to=function(a,b,d,e){var f=d.repeat&&l.TweenMax||c;return b?this.add(new f(a,b,d),e):this.set(a,d,e)},q.from=function(a,b,d,e){return this.add((d.repeat&&l.TweenMax||c).from(a,b,d),e)},q.fromTo=function(a,b,d,e,f){var g=e.repeat&&l.TweenMax||c;return b?this.add(g.fromTo(a,b,d,e),f):this.set(a,e,f)},q.staggerTo=function(a,b,e,f,g,i,j,k){var l,o,q=new d({onComplete:i,onCompleteParams:j,callbackScope:k,smoothChildTiming:this.smoothChildTiming}),r=e.cycle;for("string"==typeof a&&(a=c.selector(a)||a),a=a||[],h(a)&&(a=p(a)),f=f||0,0>f&&(a=p(a),a.reverse(),f*=-1),o=0;o<a.length;o++)l=m(e),l.startAt&&(l.startAt=m(l.startAt),l.startAt.cycle&&n(l.startAt,a,o)),r&&n(l,a,o),q.to(a[o],b,l,o*f);return this.add(q,g)},q.staggerFrom=function(a,b,c,d,e,f,g,h){return c.immediateRender=0!=c.immediateRender,c.runBackwards=!0,this.staggerTo(a,b,c,d,e,f,g,h)},q.staggerFromTo=function(a,b,c,d,e,f,g,h,i){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,this.staggerTo(a,b,d,e,f,g,h,i)},q.call=function(a,b,d,e){return this.add(c.delayedCall(0,a,b,d),e)},q.set=function(a,b,d){return d=this._parseTimeOrLabel(d,0,!0),null==b.immediateRender&&(b.immediateRender=d===this._time&&!this._paused),this.add(new c(a,0,b),d)},d.exportRoot=function(a,b){a=a||{},null==a.smoothChildTiming&&(a.smoothChildTiming=!0);var e,f,g=new d(a),h=g._timeline;for(null==b&&(b=!0),h._remove(g,!0),g._startTime=0,g._rawPrevTime=g._time=g._totalTime=h._time,e=h._first;e;)f=e._next,b&&e instanceof c&&e.target===e.vars.onComplete||g.add(e,e._startTime-e._delay),e=f;return h.add(g,0),g},q.add=function(e,f,g,h){var j,k,l,m,n,o;if("number"!=typeof f&&(f=this._parseTimeOrLabel(f,0,!0,e)),!(e instanceof a)){if(e instanceof Array||e&&e.push&&i(e)){for(g=g||"normal",h=h||0,j=f,k=e.length,l=0;k>l;l++)i(m=e[l])&&(m=new d({tweens:m})),this.add(m,j),"string"!=typeof m&&"function"!=typeof m&&("sequence"===g?j=m._startTime+m.totalDuration()/m._timeScale:"start"===g&&(m._startTime-=m.delay())),j+=h;return this._uncache(!0)}if("string"==typeof e)return this.addLabel(e,f);if("function"!=typeof e)throw"Cannot add "+e+" into the timeline; it is not a tween, timeline, function, or string.";e=c.delayedCall(0,e)}if(b.prototype.add.call(this,e,f),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(n=this,o=n.rawTime()>e._startTime;n._timeline;)o&&n._timeline.smoothChildTiming?n.totalTime(n._totalTime,!0):n._gc&&n._enabled(!0,!1),n=n._timeline;return this},q.remove=function(b){if(b instanceof a){this._remove(b,!1);var c=b._timeline=b.vars.useFrames?a._rootFramesTimeline:a._rootTimeline;return b._startTime=(b._paused?b._pauseTime:c._time)-(b._reversed?b.totalDuration()-b._totalTime:b._totalTime)/b._timeScale,this}if(b instanceof Array||b&&b.push&&i(b)){for(var d=b.length;--d>-1;)this.remove(b[d]);return this}return"string"==typeof b?this.removeLabel(b):this.kill(null,b)},q._remove=function(a,c){b.prototype._remove.call(this,a,c);var d=this._last;return d?this._time>d._startTime+d._totalDuration/d._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},q.append=function(a,b){return this.add(a,this._parseTimeOrLabel(null,b,!0,a))},q.insert=q.insertMultiple=function(a,b,c,d){return this.add(a,b||0,c,d)},q.appendMultiple=function(a,b,c,d){return this.add(a,this._parseTimeOrLabel(null,b,!0,a),c,d)},q.addLabel=function(a,b){return this._labels[a]=this._parseTimeOrLabel(b),this},q.addPause=function(a,b,d,e){var f=c.delayedCall(0,o,d,e||this);return f.vars.onComplete=f.vars.onReverseComplete=b,f.data="isPause",this._hasPause=!0,this.add(f,a)},q.removeLabel=function(a){return delete this._labels[a],this},q.getLabelTime=function(a){return null!=this._labels[a]?this._labels[a]:-1},q._parseTimeOrLabel=function(b,c,d,e){var f;if(e instanceof a&&e.timeline===this)this.remove(e);else if(e&&(e instanceof Array||e.push&&i(e)))for(f=e.length;--f>-1;)e[f]instanceof a&&e[f].timeline===this&&this.remove(e[f]);if("string"==typeof c)return this._parseTimeOrLabel(c,d&&"number"==typeof b&&null==this._labels[c]?b-this.duration():0,d);if(c=c||0,"string"!=typeof b||!isNaN(b)&&null==this._labels[b])null==b&&(b=this.duration());else{if(f=b.indexOf("="),-1===f)return null==this._labels[b]?d?this._labels[b]=this.duration()+c:c:this._labels[b]+c;c=parseInt(b.charAt(f-1)+"1",10)*Number(b.substr(f+1)),b=f>1?this._parseTimeOrLabel(b.substr(0,f-1),0,d):this.duration()}return Number(b)+c},q.seek=function(a,b){return this.totalTime("number"==typeof a?a:this._parseTimeOrLabel(a),b!==!1)},q.stop=function(){return this.paused(!0)},q.gotoAndPlay=function(a,b){return this.play(a,b)},q.gotoAndStop=function(a,b){return this.pause(a,b)},q.render=function(a,b,c){this._gc&&this._enabled(!0,!1);var d,f,g,h,i,l,m,n=this._dirty?this.totalDuration():this._totalDuration,o=this._time,p=this._startTime,q=this._timeScale,r=this._paused;if(a>=n-1e-7)this._totalTime=this._time=n,this._reversed||this._hasPausedChild()||(f=!0,h="onComplete",i=!!this._timeline.autoRemoveChildren,0===this._duration&&(0>=a&&a>=-1e-7||this._rawPrevTime<0||this._rawPrevTime===e)&&this._rawPrevTime!==a&&this._first&&(i=!0,this._rawPrevTime>e&&(h="onReverseComplete"))),this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,a=n+1e-4;else if(1e-7>a)if(this._totalTime=this._time=0,(0!==o||0===this._duration&&this._rawPrevTime!==e&&(this._rawPrevTime>0||0>a&&this._rawPrevTime>=0))&&(h="onReverseComplete",f=this._reversed),0>a)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(i=f=!0,h="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(i=!0),this._rawPrevTime=a;else{if(this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,0===a&&f)for(d=this._first;d&&0===d._startTime;)d._duration||(f=!1),d=d._next;a=0,this._initted||(i=!0)}else{if(this._hasPause&&!this._forcingPlayhead&&!b){if(a>=o)for(d=this._first;d&&d._startTime<=a&&!l;)d._duration||"isPause"!==d.data||d.ratio||0===d._startTime&&0===this._rawPrevTime||(l=d),d=d._next;else for(d=this._last;d&&d._startTime>=a&&!l;)d._duration||"isPause"===d.data&&d._rawPrevTime>0&&(l=d),d=d._prev;l&&(this._time=a=l._startTime,this._totalTime=a+this._cycle*(this._totalDuration+this._repeatDelay))}this._totalTime=this._time=this._rawPrevTime=a}if(this._time!==o&&this._first||c||i||l){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==o&&a>0&&(this._active=!0),0===o&&this.vars.onStart&&0!==this._time&&(b||this._callback("onStart")),m=this._time,m>=o)for(d=this._first;d&&(g=d._next,m===this._time&&(!this._paused||r));)(d._active||d._startTime<=m&&!d._paused&&!d._gc)&&(l===d&&this.pause(),d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=g;else for(d=this._last;d&&(g=d._prev,m===this._time&&(!this._paused||r));){if(d._active||d._startTime<=o&&!d._paused&&!d._gc){if(l===d){for(l=d._prev;l&&l.endTime()>this._time;)l.render(l._reversed?l.totalDuration()-(a-l._startTime)*l._timeScale:(a-l._startTime)*l._timeScale,b,c),l=l._prev;l=null,this.pause()}d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)}d=g}this._onUpdate&&(b||(j.length&&k(),this._callback("onUpdate"))),h&&(this._gc||(p===this._startTime||q!==this._timeScale)&&(0===this._time||n>=this.totalDuration())&&(f&&(j.length&&k(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[h]&&this._callback(h)))}},q._hasPausedChild=function(){for(var a=this._first;a;){if(a._paused||a instanceof d&&a._hasPausedChild())return!0;a=a._next}return!1},q.getChildren=function(a,b,d,e){e=e||-9999999999;for(var f=[],g=this._first,h=0;g;)g._startTime<e||(g instanceof c?b!==!1&&(f[h++]=g):(d!==!1&&(f[h++]=g),a!==!1&&(f=f.concat(g.getChildren(!0,b,d)),h=f.length))),g=g._next;return f},q.getTweensOf=function(a,b){var d,e,f=this._gc,g=[],h=0;for(f&&this._enabled(!0,!0),d=c.getTweensOf(a),e=d.length;--e>-1;)(d[e].timeline===this||b&&this._contains(d[e]))&&(g[h++]=d[e]);return f&&this._enabled(!1,!0),g},q.recent=function(){return this._recent},q._contains=function(a){for(var b=a.timeline;b;){if(b===this)return!0;b=b.timeline}return!1},q.shiftChildren=function(a,b,c){c=c||0;for(var d,e=this._first,f=this._labels;e;)e._startTime>=c&&(e._startTime+=a),e=e._next;if(b)for(d in f)f[d]>=c&&(f[d]+=a);return this._uncache(!0)},q._kill=function(a,b){if(!a&&!b)return this._enabled(!1,!1);for(var c=b?this.getTweensOf(b):this.getChildren(!0,!0,!1),d=c.length,e=!1;--d>-1;)c[d]._kill(a,b)&&(e=!0);return e},q.clear=function(a){var b=this.getChildren(!1,!0,!0),c=b.length;for(this._time=this._totalTime=0;--c>-1;)b[c]._enabled(!1,!1);return a!==!1&&(this._labels={}),this._uncache(!0)},q.invalidate=function(){for(var b=this._first;b;)b.invalidate(),b=b._next;return a.prototype.invalidate.call(this)},q._enabled=function(a,c){if(a===this._gc)for(var d=this._first;d;)d._enabled(a,!0),d=d._next;return b.prototype._enabled.call(this,a,c)},q.totalTime=function(b,c,d){this._forcingPlayhead=!0;var e=a.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},q.duration=function(a){return arguments.length?(0!==this.duration()&&0!==a&&this.timeScale(this._duration/a),this):(this._dirty&&this.totalDuration(),this._duration)},q.totalDuration=function(a){if(!arguments.length){if(this._dirty){for(var b,c,d=0,e=this._last,f=999999999999;e;)b=e._prev,e._dirty&&e.totalDuration(),e._startTime>f&&this._sortChildren&&!e._paused?this.add(e,e._startTime-e._delay):f=e._startTime,e._startTime<0&&!e._paused&&(d-=e._startTime,this._timeline.smoothChildTiming&&(this._startTime+=e._startTime/this._timeScale),this.shiftChildren(-e._startTime,!1,-9999999999),f=0),c=e._startTime+e._totalDuration/e._timeScale,c>d&&(d=c),e=b;this._duration=this._totalDuration=d,this._dirty=!1}return this._totalDuration}return a&&this.totalDuration()?this.timeScale(this._totalDuration/a):this},q.paused=function(b){if(!b)for(var c=this._first,d=this._time;c;)c._startTime===d&&"isPause"===c.data&&(c._rawPrevTime=0),c=c._next;return a.prototype.paused.apply(this,arguments)},q.usesFrames=function(){for(var b=this._timeline;b._timeline;)b=b._timeline;return b===a._rootFramesTimeline},q.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},d},!0),_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(a,b,c){var d=function(b){a.call(this,b),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},e=1e-10,f=b._internals,g=f.lazyTweens,h=f.lazyRender,i=new c(null,null,1,0),j=d.prototype=new a;return j.constructor=d,j.kill()._gc=!1,d.version="1.18.4",j.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),a.prototype.invalidate.call(this)},j.addCallback=function(a,c,d,e){return this.add(b.delayedCall(0,a,d,e),c)},j.removeCallback=function(a,b){if(a)if(null==b)this._kill(null,a);else for(var c=this.getTweensOf(a,!1),d=c.length,e=this._parseTimeOrLabel(b);--d>-1;)c[d]._startTime===e&&c[d]._enabled(!1,!1);return this},j.removePause=function(b){return this.removeCallback(a._internals.pauseCallback,b)},j.tweenTo=function(a,c){c=c||{};var d,e,f,g={ease:i,useFrames:this.usesFrames(),immediateRender:!1};for(e in c)g[e]=c[e];return g.time=this._parseTimeOrLabel(a),d=Math.abs(Number(g.time)-this._time)/this._timeScale||.001,f=new b(this,d,g),g.onStart=function(){f.target.paused(!0),f.vars.time!==f.target.time()&&d===f.duration()&&f.duration(Math.abs(f.vars.time-f.target.time())/f.target._timeScale),c.onStart&&f._callback("onStart")},f},j.tweenFromTo=function(a,b,c){c=c||{},a=this._parseTimeOrLabel(a),c.startAt={onComplete:this.seek,onCompleteParams:[a],callbackScope:this},c.immediateRender=c.immediateRender!==!1;var d=this.tweenTo(b,c);return d.duration(Math.abs(d.vars.time-a)/this._timeScale||.001)},j.render=function(a,b,c){this._gc&&this._enabled(!0,!1);var d,f,i,j,k,l,m,n,o=this._dirty?this.totalDuration():this._totalDuration,p=this._duration,q=this._time,r=this._totalTime,s=this._startTime,t=this._timeScale,u=this._rawPrevTime,v=this._paused,w=this._cycle;if(a>=o-1e-7)this._locked||(this._totalTime=o,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(f=!0,j="onComplete",k=!!this._timeline.autoRemoveChildren,0===this._duration&&(0>=a&&a>=-1e-7||0>u||u===e)&&u!==a&&this._first&&(k=!0,u>e&&(j="onReverseComplete"))),this._rawPrevTime=this._duration||!b||a||this._rawPrevTime===a?a:e,this._yoyo&&0!==(1&this._cycle)?this._time=a=0:(this._time=p,a=p+1e-4);else if(1e-7>a)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==q||0===p&&u!==e&&(u>0||0>a&&u>=0)&&!this._locked)&&(j="onReverseComplete",f=this._reversed),0>a)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(k=f=!0,j="onReverseComplete"):u>=0&&this._first&&(k=!0),this._rawPrevTime=a;else{if(this._rawPrevTime=p||!b||a||this._rawPrevTime===a?a:e,0===a&&f)for(d=this._first;d&&0===d._startTime;)d._duration||(f=!1),d=d._next;a=0,this._initted||(k=!0)}else if(0===p&&0>u&&(k=!0),this._time=this._rawPrevTime=a,this._locked||(this._totalTime=a,0!==this._repeat&&(l=p+this._repeatDelay,this._cycle=this._totalTime/l>>0,0!==this._cycle&&this._cycle===this._totalTime/l&&a>=r&&this._cycle--,this._time=this._totalTime-this._cycle*l,this._yoyo&&0!==(1&this._cycle)&&(this._time=p-this._time),this._time>p?(this._time=p,a=p+1e-4):this._time<0?this._time=a=0:a=this._time)),this._hasPause&&!this._forcingPlayhead&&!b){if(a=this._time,a>=q)for(d=this._first;d&&d._startTime<=a&&!m;)d._duration||"isPause"!==d.data||d.ratio||0===d._startTime&&0===this._rawPrevTime||(m=d),d=d._next;else for(d=this._last;d&&d._startTime>=a&&!m;)d._duration||"isPause"===d.data&&d._rawPrevTime>0&&(m=d),d=d._prev;m&&(this._time=a=m._startTime,this._totalTime=a+this._cycle*(this._totalDuration+this._repeatDelay))}if(this._cycle!==w&&!this._locked){var x=this._yoyo&&0!==(1&w),y=x===(this._yoyo&&0!==(1&this._cycle)),z=this._totalTime,A=this._cycle,B=this._rawPrevTime,C=this._time;if(this._totalTime=w*p,this._cycle<w?x=!x:this._totalTime+=p,this._time=q,this._rawPrevTime=0===p?u-1e-4:u,this._cycle=w,this._locked=!0,q=x?0:p,this.render(q,b,0===p),b||this._gc||this.vars.onRepeat&&this._callback("onRepeat"),q!==this._time)return;if(y&&(q=x?p+1e-4:-1e-4,this.render(q,!0,!1)),this._locked=!1,this._paused&&!v)return;this._time=C,this._totalTime=z,this._cycle=A,this._rawPrevTime=B}if(!(this._time!==q&&this._first||c||k||m))return void(r!==this._totalTime&&this._onUpdate&&(b||this._callback("onUpdate")));if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==r&&a>0&&(this._active=!0),0===r&&this.vars.onStart&&0!==this._totalTime&&(b||this._callback("onStart")),n=this._time,n>=q)for(d=this._first;d&&(i=d._next,n===this._time&&(!this._paused||v));)(d._active||d._startTime<=this._time&&!d._paused&&!d._gc)&&(m===d&&this.pause(),d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)),d=i;else for(d=this._last;d&&(i=d._prev,n===this._time&&(!this._paused||v));){if(d._active||d._startTime<=q&&!d._paused&&!d._gc){if(m===d){for(m=d._prev;m&&m.endTime()>this._time;)m.render(m._reversed?m.totalDuration()-(a-m._startTime)*m._timeScale:(a-m._startTime)*m._timeScale,b,c),m=m._prev;m=null,this.pause()}d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,c):d.render((a-d._startTime)*d._timeScale,b,c)}d=i}this._onUpdate&&(b||(g.length&&h(),this._callback("onUpdate"))),j&&(this._locked||this._gc||(s===this._startTime||t!==this._timeScale)&&(0===this._time||o>=this.totalDuration())&&(f&&(g.length&&h(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[j]&&this._callback(j)))},j.getActive=function(a,b,c){null==a&&(a=!0),null==b&&(b=!0),null==c&&(c=!1);var d,e,f=[],g=this.getChildren(a,b,c),h=0,i=g.length;for(d=0;i>d;d++)e=g[d],e.isActive()&&(f[h++]=e);return f},j.getLabelAfter=function(a){a||0!==a&&(a=this._time);var b,c=this.getLabelsArray(),d=c.length;for(b=0;d>b;b++)if(c[b].time>a)return c[b].name;return null},j.getLabelBefore=function(a){null==a&&(a=this._time);for(var b=this.getLabelsArray(),c=b.length;--c>-1;)if(b[c].time<a)return b[c].name;return null},j.getLabelsArray=function(){var a,b=[],c=0;for(a in this._labels)b[c++]={time:this._labels[a],name:a};return b.sort(function(a,b){return a.time-b.time}),b},j.progress=function(a,b){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-a:a)+this._cycle*(this._duration+this._repeatDelay),b):this._time/this.duration()},j.totalProgress=function(a,b){return arguments.length?this.totalTime(this.totalDuration()*a,b):this._totalTime/this.totalDuration()},j.totalDuration=function(b){return arguments.length?-1!==this._repeat&&b?this.timeScale(this.totalDuration()/b):this:(this._dirty&&(a.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},j.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this._yoyo&&0!==(1&this._cycle)?a=this._duration-a+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(a+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(a,b)):this._time},j.repeat=function(a){return arguments.length?(this._repeat=a,this._uncache(!0)):this._repeat},j.repeatDelay=function(a){return arguments.length?(this._repeatDelay=a,this._uncache(!0)):this._repeatDelay},j.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},j.currentLabel=function(a){return arguments.length?this.seek(a,!0):this.getLabelBefore(this._time+1e-8)},d},!0),function(){var a=180/Math.PI,b=[],c=[],d=[],e={},f=_gsScope._gsDefine.globals,g=function(a,b,c,d){this.a=a,this.b=b,this.c=c,this.d=d,this.da=d-a,this.ca=c-a,this.ba=b-a},h=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",i=function(a,b,c,d){var e={a:a},f={},g={},h={c:d},i=(a+b)/2,j=(b+c)/2,k=(c+d)/2,l=(i+j)/2,m=(j+k)/2,n=(m-l)/8;return e.b=i+(a-i)/4,f.b=l+n,e.c=f.a=(e.b+f.b)/2,f.c=g.a=(l+m)/2,g.b=m-n,h.b=k+(d-k)/4,g.c=h.a=(g.b+h.b)/2,[e,f,g,h]},j=function(a,e,f,g,h){var j,k,l,m,n,o,p,q,r,s,t,u,v,w=a.length-1,x=0,y=a[0].a;for(j=0;w>j;j++)n=a[x],k=n.a,l=n.d,m=a[x+1].d,h?(t=b[j],u=c[j],v=(u+t)*e*.25/(g?.5:d[j]||.5),o=l-(l-k)*(g?.5*e:0!==t?v/t:0),p=l+(m-l)*(g?.5*e:0!==u?v/u:0),q=l-(o+((p-o)*(3*t/(t+u)+.5)/4||0))):(o=l-(l-k)*e*.5,p=l+(m-l)*e*.5,q=l-(o+p)/2),o+=q,p+=q,n.c=r=o,0!==j?n.b=y:n.b=y=n.a+.6*(n.c-n.a),n.da=l-k,n.ca=r-k,n.ba=y-k,f?(s=i(k,y,r,l),a.splice(x,1,s[0],s[1],s[2],s[3]),x+=4):x++,y=p;n=a[x],n.b=y,n.c=y+.4*(n.d-y),n.da=n.d-n.a,n.ca=n.c-n.a,n.ba=y-n.a,f&&(s=i(n.a,y,n.c,n.d),a.splice(x,1,s[0],s[1],s[2],s[3]))},k=function(a,d,e,f){var h,i,j,k,l,m,n=[];if(f)for(a=[f].concat(a),i=a.length;--i>-1;)"string"==typeof(m=a[i][d])&&"="===m.charAt(1)&&(a[i][d]=f[d]+Number(m.charAt(0)+m.substr(2)));if(h=a.length-2,0>h)return n[0]=new g(a[0][d],0,0,a[-1>h?0:1][d]),n;for(i=0;h>i;i++)j=a[i][d],k=a[i+1][d],n[i]=new g(j,0,0,k),e&&(l=a[i+2][d],b[i]=(b[i]||0)+(k-j)*(k-j),c[i]=(c[i]||0)+(l-k)*(l-k));return n[i]=new g(a[i][d],0,0,a[i+1][d]),n},l=function(a,f,g,i,l,m){var n,o,p,q,r,s,t,u,v={},w=[],x=m||a[0];l="string"==typeof l?","+l+",":h,null==f&&(f=1);for(o in a[0])w.push(o);if(a.length>1){for(u=a[a.length-1],t=!0,n=w.length;--n>-1;)if(o=w[n],Math.abs(x[o]-u[o])>.05){t=!1;break}t&&(a=a.concat(),m&&a.unshift(m),a.push(a[1]),m=a[a.length-3])}for(b.length=c.length=d.length=0,n=w.length;--n>-1;)o=w[n],e[o]=-1!==l.indexOf(","+o+","),v[o]=k(a,o,e[o],m);for(n=b.length;--n>-1;)b[n]=Math.sqrt(b[n]),c[n]=Math.sqrt(c[n]);if(!i){for(n=w.length;--n>-1;)if(e[o])for(p=v[w[n]],s=p.length-1,q=0;s>q;q++)r=p[q+1].da/c[q]+p[q].da/b[q]||0,d[q]=(d[q]||0)+r*r;for(n=d.length;--n>-1;)d[n]=Math.sqrt(d[n])}for(n=w.length,q=g?4:1;--n>-1;)o=w[n],p=v[o],j(p,f,g,i,e[o]),t&&(p.splice(0,q),p.splice(p.length-q,q));return v},m=function(a,b,c){b=b||"soft";var d,e,f,h,i,j,k,l,m,n,o,p={},q="cubic"===b?3:2,r="soft"===b,s=[];if(r&&c&&(a=[c].concat(a)),null==a||a.length<q+1)throw"invalid Bezier data";for(m in a[0])s.push(m);for(j=s.length;--j>-1;){for(m=s[j],p[m]=i=[],n=0,l=a.length,k=0;l>k;k++)d=null==c?a[k][m]:"string"==typeof(o=a[k][m])&&"="===o.charAt(1)?c[m]+Number(o.charAt(0)+o.substr(2)):Number(o),r&&k>1&&l-1>k&&(i[n++]=(d+i[n-2])/2),i[n++]=d;for(l=n-q+1,n=0,k=0;l>k;k+=q)d=i[k],e=i[k+1],f=i[k+2],h=2===q?0:i[k+3],i[n++]=o=3===q?new g(d,e,f,h):new g(d,(2*e+d)/3,(2*e+f)/3,f);i.length=n}return p},n=function(a,b,c){for(var d,e,f,g,h,i,j,k,l,m,n,o=1/c,p=a.length;--p>-1;)for(m=a[p],f=m.a,g=m.d-f,h=m.c-f,i=m.b-f,d=e=0,k=1;c>=k;k++)j=o*k,l=1-j,d=e-(e=(j*j*g+3*l*(j*h+l*i))*j),n=p*c+k-1,b[n]=(b[n]||0)+d*d},o=function(a,b){b=b>>0||6;var c,d,e,f,g=[],h=[],i=0,j=0,k=b-1,l=[],m=[];for(c in a)n(a[c],g,b);for(e=g.length,d=0;e>d;d++)i+=Math.sqrt(g[d]),f=d%b,m[f]=i,f===k&&(j+=i,f=d/b>>0,l[f]=m,h[f]=j,i=0,m=[]);return{length:j,lengths:h,segments:l}},p=_gsScope._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.5",API:2,global:!0,init:function(a,b,c){this._target=a,b instanceof Array&&(b={values:b}),this._func={},this._round={},this._props=[],this._timeRes=null==b.timeResolution?6:parseInt(b.timeResolution,10);
var d,e,f,g,h,i=b.values||[],j={},k=i[0],n=b.autoRotate||c.vars.orientToBezier;this._autoRotate=n?n instanceof Array?n:[["x","y","rotation",n===!0?0:Number(n)||0]]:null;for(d in k)this._props.push(d);for(f=this._props.length;--f>-1;)d=this._props[f],this._overwriteProps.push(d),e=this._func[d]="function"==typeof a[d],j[d]=e?a[d.indexOf("set")||"function"!=typeof a["get"+d.substr(3)]?d:"get"+d.substr(3)]():parseFloat(a[d]),h||j[d]!==i[0][d]&&(h=j);if(this._beziers="cubic"!==b.type&&"quadratic"!==b.type&&"soft"!==b.type?l(i,isNaN(b.curviness)?1:b.curviness,!1,"thruBasic"===b.type,b.correlate,h):m(i,b.type,j),this._segCount=this._beziers[d].length,this._timeRes){var p=o(this._beziers,this._timeRes);this._length=p.length,this._lengths=p.lengths,this._segments=p.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(n=this._autoRotate)for(this._initialRotations=[],n[0]instanceof Array||(this._autoRotate=n=[n]),f=n.length;--f>-1;){for(g=0;3>g;g++)d=n[f][g],this._func[d]="function"==typeof a[d]?a[d.indexOf("set")||"function"!=typeof a["get"+d.substr(3)]?d:"get"+d.substr(3)]:!1;d=n[f][2],this._initialRotations[f]=(this._func[d]?this._func[d].call(this._target):this._target[d])||0}return this._startRatio=c.vars.runBackwards?1:0,!0},set:function(b){var c,d,e,f,g,h,i,j,k,l,m=this._segCount,n=this._func,o=this._target,p=b!==this._startRatio;if(this._timeRes){if(k=this._lengths,l=this._curSeg,b*=this._length,e=this._li,b>this._l2&&m-1>e){for(j=m-1;j>e&&(this._l2=k[++e])<=b;);this._l1=k[e-1],this._li=e,this._curSeg=l=this._segments[e],this._s2=l[this._s1=this._si=0]}else if(b<this._l1&&e>0){for(;e>0&&(this._l1=k[--e])>=b;);0===e&&b<this._l1?this._l1=0:e++,this._l2=k[e],this._li=e,this._curSeg=l=this._segments[e],this._s1=l[(this._si=l.length-1)-1]||0,this._s2=l[this._si]}if(c=e,b-=this._l1,e=this._si,b>this._s2&&e<l.length-1){for(j=l.length-1;j>e&&(this._s2=l[++e])<=b;);this._s1=l[e-1],this._si=e}else if(b<this._s1&&e>0){for(;e>0&&(this._s1=l[--e])>=b;);0===e&&b<this._s1?this._s1=0:e++,this._s2=l[e],this._si=e}h=(e+(b-this._s1)/(this._s2-this._s1))*this._prec||0}else c=0>b?0:b>=1?m-1:m*b>>0,h=(b-c*(1/m))*m;for(d=1-h,e=this._props.length;--e>-1;)f=this._props[e],g=this._beziers[f][c],i=(h*h*g.da+3*d*(h*g.ca+d*g.ba))*h+g.a,this._round[f]&&(i=Math.round(i)),n[f]?o[f](i):o[f]=i;if(this._autoRotate){var q,r,s,t,u,v,w,x=this._autoRotate;for(e=x.length;--e>-1;)f=x[e][2],v=x[e][3]||0,w=x[e][4]===!0?1:a,g=this._beziers[x[e][0]],q=this._beziers[x[e][1]],g&&q&&(g=g[c],q=q[c],r=g.a+(g.b-g.a)*h,t=g.b+(g.c-g.b)*h,r+=(t-r)*h,t+=(g.c+(g.d-g.c)*h-t)*h,s=q.a+(q.b-q.a)*h,u=q.b+(q.c-q.b)*h,s+=(u-s)*h,u+=(q.c+(q.d-q.c)*h-u)*h,i=p?Math.atan2(u-s,t-r)*w+v:this._initialRotations[e],n[f]?o[f](i):o[f]=i)}}}),q=p.prototype;p.bezierThrough=l,p.cubicToQuadratic=i,p._autoCSS=!0,p.quadraticToCubic=function(a,b,c){return new g(a,(2*b+a)/3,(2*b+c)/3,c)},p._cssRegister=function(){var a=f.CSSPlugin;if(a){var b=a._internals,c=b._parseToProxy,d=b._setPluginRatio,e=b.CSSPropTween;b._registerComplexSpecialProp("bezier",{parser:function(a,b,f,g,h,i){b instanceof Array&&(b={values:b}),i=new p;var j,k,l,m=b.values,n=m.length-1,o=[],q={};if(0>n)return h;for(j=0;n>=j;j++)l=c(a,m[j],g,h,i,n!==j),o[j]=l.end;for(k in b)q[k]=b[k];return q.values=o,h=new e(a,"bezier",0,0,l.pt,2),h.data=l,h.plugin=i,h.setRatio=d,0===q.autoRotate&&(q.autoRotate=!0),!q.autoRotate||q.autoRotate instanceof Array||(j=q.autoRotate===!0?0:Number(q.autoRotate),q.autoRotate=null!=l.end.left?[["left","top","rotation",j,!1]]:null!=l.end.x?[["x","y","rotation",j,!1]]:!1),q.autoRotate&&(g._transform||g._enableTransforms(!1),l.autoRotate=g._target._gsTransform),i._onInitTween(l.proxy,q,g._tween),h}})}},q._roundProps=function(a,b){for(var c=this._overwriteProps,d=c.length;--d>-1;)(a[c[d]]||a.bezier||a.bezierThrough)&&(this._round[c[d]]=b)},q._kill=function(a){var b,c,d=this._props;for(b in this._beziers)if(b in a)for(delete this._beziers[b],delete this._func[b],c=d.length;--c>-1;)d[c]===b&&d.splice(c,1);return this._super._kill.call(this,a)}}(),_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(a,b){var c,d,e,f,g=function(){a.call(this,"css"),this._overwriteProps.length=0,this.setRatio=g.prototype.setRatio},h=_gsScope._gsDefine.globals,i={},j=g.prototype=new a("css");j.constructor=g,g.version="1.18.4",g.API=2,g.defaultTransformPerspective=0,g.defaultSkewType="compensated",g.defaultSmoothOrigin=!0,j="px",g.suffixMap={top:j,right:j,bottom:j,left:j,width:j,height:j,fontSize:j,padding:j,margin:j,perspective:j,lineHeight:""};var k,l,m,n,o,p,q=/(?:\-|\.|\b)(\d|\.|e\-)+/g,r=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,s=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,t=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,u=/(?:\d|\-|\+|=|#|\.)*/g,v=/opacity *= *([^)]*)/i,w=/opacity:([^;]*)/i,x=/alpha\(opacity *=.+?\)/i,y=/^(rgb|hsl)/,z=/([A-Z])/g,A=/-([a-z])/gi,B=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,C=function(a,b){return b.toUpperCase()},D=/(?:Left|Right|Width)/i,E=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,F=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,G=/,(?=[^\)]*(?:\(|$))/gi,H=/[\s,\(]/i,I=Math.PI/180,J=180/Math.PI,K={},L=document,M=function(a){return L.createElementNS?L.createElementNS("http://www.w3.org/1999/xhtml",a):L.createElement(a)},N=M("div"),O=M("img"),P=g._internals={_specialProps:i},Q=navigator.userAgent,R=function(){var a=Q.indexOf("Android"),b=M("a");return m=-1!==Q.indexOf("Safari")&&-1===Q.indexOf("Chrome")&&(-1===a||Number(Q.substr(a+8,1))>3),o=m&&Number(Q.substr(Q.indexOf("Version/")+8,1))<6,n=-1!==Q.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Q)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Q))&&(p=parseFloat(RegExp.$1)),b?(b.style.cssText="top:1px;opacity:.55;",/^0.55/.test(b.style.opacity)):!1}(),S=function(a){return v.test("string"==typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100:1},T=function(a){window.console&&console.log(a)},U="",V="",W=function(a,b){b=b||N;var c,d,e=b.style;if(void 0!==e[a])return a;for(a=a.charAt(0).toUpperCase()+a.substr(1),c=["O","Moz","ms","Ms","Webkit"],d=5;--d>-1&&void 0===e[c[d]+a];);return d>=0?(V=3===d?"ms":c[d],U="-"+V.toLowerCase()+"-",V+a):null},X=L.defaultView?L.defaultView.getComputedStyle:function(){},Y=g.getStyle=function(a,b,c,d,e){var f;return R||"opacity"!==b?(!d&&a.style[b]?f=a.style[b]:(c=c||X(a))?f=c[b]||c.getPropertyValue(b)||c.getPropertyValue(b.replace(z,"-$1").toLowerCase()):a.currentStyle&&(f=a.currentStyle[b]),null==e||f&&"none"!==f&&"auto"!==f&&"auto auto"!==f?f:e):S(a)},Z=P.convertToPixels=function(a,c,d,e,f){if("px"===e||!e)return d;if("auto"===e||!d)return 0;var h,i,j,k=D.test(c),l=a,m=N.style,n=0>d;if(n&&(d=-d),"%"===e&&-1!==c.indexOf("border"))h=d/100*(k?a.clientWidth:a.clientHeight);else{if(m.cssText="border:0 solid red;position:"+Y(a,"position")+";line-height:0;","%"!==e&&l.appendChild&&"v"!==e.charAt(0)&&"rem"!==e)m[k?"borderLeftWidth":"borderTopWidth"]=d+e;else{if(l=a.parentNode||L.body,i=l._gsCache,j=b.ticker.frame,i&&k&&i.time===j)return i.width*d/100;m[k?"width":"height"]=d+e}l.appendChild(N),h=parseFloat(N[k?"offsetWidth":"offsetHeight"]),l.removeChild(N),k&&"%"===e&&g.cacheWidths!==!1&&(i=l._gsCache=l._gsCache||{},i.time=j,i.width=h/d*100),0!==h||f||(h=Z(a,c,d,e,!0))}return n?-h:h},$=P.calculateOffset=function(a,b,c){if("absolute"!==Y(a,"position",c))return 0;var d="left"===b?"Left":"Top",e=Y(a,"margin"+d,c);return a["offset"+d]-(Z(a,b,parseFloat(e),e.replace(u,""))||0)},_=function(a,b){var c,d,e,f={};if(b=b||X(a,null))if(c=b.length)for(;--c>-1;)e=b[c],(-1===e.indexOf("-transform")||Aa===e)&&(f[e.replace(A,C)]=b.getPropertyValue(e));else for(c in b)(-1===c.indexOf("Transform")||za===c)&&(f[c]=b[c]);else if(b=a.currentStyle||a.style)for(c in b)"string"==typeof c&&void 0===f[c]&&(f[c.replace(A,C)]=b[c]);return R||(f.opacity=S(a)),d=Na(a,b,!1),f.rotation=d.rotation,f.skewX=d.skewX,f.scaleX=d.scaleX,f.scaleY=d.scaleY,f.x=d.x,f.y=d.y,Ca&&(f.z=d.z,f.rotationX=d.rotationX,f.rotationY=d.rotationY,f.scaleZ=d.scaleZ),f.filters&&delete f.filters,f},aa=function(a,b,c,d,e){var f,g,h,i={},j=a.style;for(g in c)"cssText"!==g&&"length"!==g&&isNaN(g)&&(b[g]!==(f=c[g])||e&&e[g])&&-1===g.indexOf("Origin")&&("number"==typeof f||"string"==typeof f)&&(i[g]="auto"!==f||"left"!==g&&"top"!==g?""!==f&&"auto"!==f&&"none"!==f||"string"!=typeof b[g]||""===b[g].replace(t,"")?f:0:$(a,g),void 0!==j[g]&&(h=new pa(j,g,j[g],h)));if(d)for(g in d)"className"!==g&&(i[g]=d[g]);return{difs:i,firstMPT:h}},ba={width:["Left","Right"],height:["Top","Bottom"]},ca=["marginLeft","marginRight","marginTop","marginBottom"],da=function(a,b,c){if("svg"===(a.nodeName+"").toLowerCase())return(c||X(a))[b]||0;if(a.getBBox&&Ka(a))return a.getBBox()[b]||0;var d=parseFloat("width"===b?a.offsetWidth:a.offsetHeight),e=ba[b],f=e.length;for(c=c||X(a,null);--f>-1;)d-=parseFloat(Y(a,"padding"+e[f],c,!0))||0,d-=parseFloat(Y(a,"border"+e[f]+"Width",c,!0))||0;return d},ea=function(a,b){if("contain"===a||"auto"===a||"auto auto"===a)return a+" ";(null==a||""===a)&&(a="0 0");var c,d=a.split(" "),e=-1!==a.indexOf("left")?"0%":-1!==a.indexOf("right")?"100%":d[0],f=-1!==a.indexOf("top")?"0%":-1!==a.indexOf("bottom")?"100%":d[1];if(d.length>3&&!b){for(d=a.split(", ").join(",").split(","),a=[],c=0;c<d.length;c++)a.push(ea(d[c]));return a.join(",")}return null==f?f="center"===e?"50%":"0":"center"===f&&(f="50%"),("center"===e||isNaN(parseFloat(e))&&-1===(e+"").indexOf("="))&&(e="50%"),a=e+" "+f+(d.length>2?" "+d[2]:""),b&&(b.oxp=-1!==e.indexOf("%"),b.oyp=-1!==f.indexOf("%"),b.oxr="="===e.charAt(1),b.oyr="="===f.charAt(1),b.ox=parseFloat(e.replace(t,"")),b.oy=parseFloat(f.replace(t,"")),b.v=a),b||a},fa=function(a,b){return"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(b)||0},ga=function(a,b){return null==a?b:"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2))+b:parseFloat(a)||0},ha=function(a,b,c,d){var e,f,g,h,i,j=1e-6;return null==a?h=b:"number"==typeof a?h=a:(e=360,f=a.split("_"),i="="===a.charAt(1),g=(i?parseInt(a.charAt(0)+"1",10)*parseFloat(f[0].substr(2)):parseFloat(f[0]))*(-1===a.indexOf("rad")?1:J)-(i?0:b),f.length&&(d&&(d[c]=b+g),-1!==a.indexOf("short")&&(g%=e,g!==g%(e/2)&&(g=0>g?g+e:g-e)),-1!==a.indexOf("_cw")&&0>g?g=(g+9999999999*e)%e-(g/e|0)*e:-1!==a.indexOf("ccw")&&g>0&&(g=(g-9999999999*e)%e-(g/e|0)*e)),h=b+g),j>h&&h>-j&&(h=0),h},ia={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ja=function(a,b,c){return a=0>a?a+1:a>1?a-1:a,255*(1>6*a?b+(c-b)*a*6:.5>a?c:2>3*a?b+(c-b)*(2/3-a)*6:b)+.5|0},ka=g.parseColor=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;if(a)if("number"==typeof a)c=[a>>16,a>>8&255,255&a];else{if(","===a.charAt(a.length-1)&&(a=a.substr(0,a.length-1)),ia[a])c=ia[a];else if("#"===a.charAt(0))4===a.length&&(d=a.charAt(1),e=a.charAt(2),f=a.charAt(3),a="#"+d+d+e+e+f+f),a=parseInt(a.substr(1),16),c=[a>>16,a>>8&255,255&a];else if("hsl"===a.substr(0,3))if(c=m=a.match(q),b){if(-1!==a.indexOf("="))return a.match(r)}else g=Number(c[0])%360/360,h=Number(c[1])/100,i=Number(c[2])/100,e=.5>=i?i*(h+1):i+h-i*h,d=2*i-e,c.length>3&&(c[3]=Number(a[3])),c[0]=ja(g+1/3,d,e),c[1]=ja(g,d,e),c[2]=ja(g-1/3,d,e);else c=a.match(q)||ia.transparent;c[0]=Number(c[0]),c[1]=Number(c[1]),c[2]=Number(c[2]),c.length>3&&(c[3]=Number(c[3]))}else c=ia.black;return b&&!m&&(d=c[0]/255,e=c[1]/255,f=c[2]/255,j=Math.max(d,e,f),k=Math.min(d,e,f),i=(j+k)/2,j===k?g=h=0:(l=j-k,h=i>.5?l/(2-j-k):l/(j+k),g=j===d?(e-f)/l+(f>e?6:0):j===e?(f-d)/l+2:(d-e)/l+4,g*=60),c[0]=g+.5|0,c[1]=100*h+.5|0,c[2]=100*i+.5|0),c},la=function(a,b){var c,d,e,f=a.match(ma)||[],g=0,h=f.length?"":a;for(c=0;c<f.length;c++)d=f[c],e=a.substr(g,a.indexOf(d,g)-g),g+=e.length+d.length,d=ka(d,b),3===d.length&&d.push(1),h+=e+(b?"hsla("+d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:"rgba("+d.join(","))+")";return h+a.substr(g)},ma="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for(j in ia)ma+="|"+j+"\\b";ma=new RegExp(ma+")","gi"),g.colorStringFilter=function(a){var b,c=a[0]+a[1];ma.test(c)&&(b=-1!==c.indexOf("hsl(")||-1!==c.indexOf("hsla("),a[0]=la(a[0],b),a[1]=la(a[1],b)),ma.lastIndex=0},b.defaultStringFilter||(b.defaultStringFilter=g.colorStringFilter);var na=function(a,b,c,d){if(null==a)return function(a){return a};var e,f=b?(a.match(ma)||[""])[0]:"",g=a.split(f).join("").match(s)||[],h=a.substr(0,a.indexOf(g[0])),i=")"===a.charAt(a.length-1)?")":"",j=-1!==a.indexOf(" ")?" ":",",k=g.length,l=k>0?g[0].replace(q,""):"";return k?e=b?function(a){var b,m,n,o;if("number"==typeof a)a+=l;else if(d&&G.test(a)){for(o=a.replace(G,"|").split("|"),n=0;n<o.length;n++)o[n]=e(o[n]);return o.join(",")}if(b=(a.match(ma)||[f])[0],m=a.split(b).join("").match(s)||[],n=m.length,k>n--)for(;++n<k;)m[n]=c?m[(n-1)/2|0]:g[n];return h+m.join(j)+j+b+i+(-1!==a.indexOf("inset")?" inset":"")}:function(a){var b,f,m;if("number"==typeof a)a+=l;else if(d&&G.test(a)){for(f=a.replace(G,"|").split("|"),m=0;m<f.length;m++)f[m]=e(f[m]);return f.join(",")}if(b=a.match(s)||[],m=b.length,k>m--)for(;++m<k;)b[m]=c?b[(m-1)/2|0]:g[m];return h+b.join(j)+i}:function(a){return a}},oa=function(a){return a=a.split(","),function(b,c,d,e,f,g,h){var i,j=(c+"").split(" ");for(h={},i=0;4>i;i++)h[a[i]]=j[i]=j[i]||j[(i-1)/2>>0];return e.parse(b,h,f,g)}},pa=(P._setPluginRatio=function(a){this.plugin.setRatio(a);for(var b,c,d,e,f,g=this.data,h=g.proxy,i=g.firstMPT,j=1e-6;i;)b=h[i.v],i.r?b=Math.round(b):j>b&&b>-j&&(b=0),i.t[i.p]=b,i=i._next;if(g.autoRotate&&(g.autoRotate.rotation=h.rotation),1===a||0===a)for(i=g.firstMPT,f=1===a?"e":"b";i;){if(c=i.t,c.type){if(1===c.type){for(e=c.xs0+c.s+c.xs1,d=1;d<c.l;d++)e+=c["xn"+d]+c["xs"+(d+1)];c[f]=e}}else c[f]=c.s+c.xs0;i=i._next}},function(a,b,c,d,e){this.t=a,this.p=b,this.v=c,this.r=e,d&&(d._prev=this,this._next=d)}),qa=(P._parseToProxy=function(a,b,c,d,e,f){var g,h,i,j,k,l=d,m={},n={},o=c._transform,p=K;for(c._transform=null,K=b,d=k=c.parse(a,b,d,e),K=p,f&&(c._transform=o,l&&(l._prev=null,l._prev&&(l._prev._next=null)));d&&d!==l;){if(d.type<=1&&(h=d.p,n[h]=d.s+d.c,m[h]=d.s,f||(j=new pa(d,"s",h,j,d.r),d.c=0),1===d.type))for(g=d.l;--g>0;)i="xn"+g,h=d.p+"_"+i,n[h]=d.data[i],m[h]=d[i],f||(j=new pa(d,i,h,j,d.rxp[i]));d=d._next}return{proxy:m,end:n,firstMPT:j,pt:k}},P.CSSPropTween=function(a,b,d,e,g,h,i,j,k,l,m){this.t=a,this.p=b,this.s=d,this.c=e,this.n=i||b,a instanceof qa||f.push(this.n),this.r=j,this.type=h||0,k&&(this.pr=k,c=!0),this.b=void 0===l?d:l,this.e=void 0===m?d+e:m,g&&(this._next=g,g._prev=this)}),ra=function(a,b,c,d,e,f){var g=new qa(a,b,c,d-c,e,-1,f);return g.b=c,g.e=g.xs0=d,g},sa=g.parseComplex=function(a,b,c,d,e,f,h,i,j,l){c=c||f||"",h=new qa(a,b,0,0,h,l?2:1,null,!1,i,c,d),d+="",e&&ma.test(d+c)&&(d=[c,d],g.colorStringFilter(d),c=d[0],d=d[1]);var m,n,o,p,s,t,u,v,w,x,y,z,A,B=c.split(", ").join(",").split(" "),C=d.split(", ").join(",").split(" "),D=B.length,E=k!==!1;for((-1!==d.indexOf(",")||-1!==c.indexOf(","))&&(B=B.join(" ").replace(G,", ").split(" "),C=C.join(" ").replace(G,", ").split(" "),D=B.length),D!==C.length&&(B=(f||"").split(" "),D=B.length),h.plugin=j,h.setRatio=l,ma.lastIndex=0,m=0;D>m;m++)if(p=B[m],s=C[m],v=parseFloat(p),v||0===v)h.appendXtra("",v,fa(s,v),s.replace(r,""),E&&-1!==s.indexOf("px"),!0);else if(e&&ma.test(p))z=s.indexOf(")")+1,z=")"+(z?s.substr(z):""),A=-1!==s.indexOf("hsl")&&R,p=ka(p,A),s=ka(s,A),w=p.length+s.length>6,w&&!R&&0===s[3]?(h["xs"+h.l]+=h.l?" transparent":"transparent",h.e=h.e.split(C[m]).join("transparent")):(R||(w=!1),A?h.appendXtra(w?"hsla(":"hsl(",p[0],fa(s[0],p[0]),",",!1,!0).appendXtra("",p[1],fa(s[1],p[1]),"%,",!1).appendXtra("",p[2],fa(s[2],p[2]),w?"%,":"%"+z,!1):h.appendXtra(w?"rgba(":"rgb(",p[0],s[0]-p[0],",",!0,!0).appendXtra("",p[1],s[1]-p[1],",",!0).appendXtra("",p[2],s[2]-p[2],w?",":z,!0),w&&(p=p.length<4?1:p[3],h.appendXtra("",p,(s.length<4?1:s[3])-p,z,!1))),ma.lastIndex=0;else if(t=p.match(q)){if(u=s.match(r),!u||u.length!==t.length)return h;for(o=0,n=0;n<t.length;n++)y=t[n],x=p.indexOf(y,o),h.appendXtra(p.substr(o,x-o),Number(y),fa(u[n],y),"",E&&"px"===p.substr(x+y.length,2),0===n),o=x+y.length;h["xs"+h.l]+=p.substr(o)}else h["xs"+h.l]+=h.l||h["xs"+h.l]?" "+s:s;if(-1!==d.indexOf("=")&&h.data){for(z=h.xs0+h.data.s,m=1;m<h.l;m++)z+=h["xs"+m]+h.data["xn"+m];h.e=z+h["xs"+m]}return h.l||(h.type=-1,h.xs0=h.e),h.xfirst||h},ta=9;for(j=qa.prototype,j.l=j.pr=0;--ta>0;)j["xn"+ta]=0,j["xs"+ta]="";j.xs0="",j._next=j._prev=j.xfirst=j.data=j.plugin=j.setRatio=j.rxp=null,j.appendXtra=function(a,b,c,d,e,f){var g=this,h=g.l;return g["xs"+h]+=f&&(h||g["xs"+h])?" "+a:a||"",c||0===h||g.plugin?(g.l++,g.type=g.setRatio?2:1,g["xs"+g.l]=d||"",h>0?(g.data["xn"+h]=b+c,g.rxp["xn"+h]=e,g["xn"+h]=b,g.plugin||(g.xfirst=new qa(g,"xn"+h,b,c,g.xfirst||g,0,g.n,e,g.pr),g.xfirst.xs0=0),g):(g.data={s:b+c},g.rxp={},g.s=b,g.c=c,g.r=e,g)):(g["xs"+h]+=b+(d||""),g)};var ua=function(a,b){b=b||{},this.p=b.prefix?W(a)||a:a,i[a]=i[this.p]=this,this.format=b.formatter||na(b.defaultValue,b.color,b.collapsible,b.multi),b.parser&&(this.parse=b.parser),this.clrs=b.color,this.multi=b.multi,this.keyword=b.keyword,this.dflt=b.defaultValue,this.pr=b.priority||0},va=P._registerComplexSpecialProp=function(a,b,c){"object"!=typeof b&&(b={parser:c});var d,e,f=a.split(","),g=b.defaultValue;for(c=c||[g],d=0;d<f.length;d++)b.prefix=0===d&&b.prefix,b.defaultValue=c[d]||g,e=new ua(f[d],b)},wa=function(a){if(!i[a]){var b=a.charAt(0).toUpperCase()+a.substr(1)+"Plugin";va(a,{parser:function(a,c,d,e,f,g,j){var k=h.com.greensock.plugins[b];return k?(k._cssRegister(),i[d].parse(a,c,d,e,f,g,j)):(T("Error: "+b+" js file not loaded."),f)}})}};j=ua.prototype,j.parseComplex=function(a,b,c,d,e,f){var g,h,i,j,k,l,m=this.keyword;if(this.multi&&(G.test(c)||G.test(b)?(h=b.replace(G,"|").split("|"),i=c.replace(G,"|").split("|")):m&&(h=[b],i=[c])),i){for(j=i.length>h.length?i.length:h.length,g=0;j>g;g++)b=h[g]=h[g]||this.dflt,c=i[g]=i[g]||this.dflt,m&&(k=b.indexOf(m),l=c.indexOf(m),k!==l&&(-1===l?h[g]=h[g].split(m).join(""):-1===k&&(h[g]+=" "+m)));b=h.join(", "),c=i.join(", ")}return sa(a,this.p,b,c,this.clrs,this.dflt,d,this.pr,e,f)},j.parse=function(a,b,c,d,f,g,h){return this.parseComplex(a.style,this.format(Y(a,this.p,e,!1,this.dflt)),this.format(b),f,g)},g.registerSpecialProp=function(a,b,c){va(a,{parser:function(a,d,e,f,g,h,i){var j=new qa(a,e,0,0,g,2,e,!1,c);return j.plugin=h,j.setRatio=b(a,d,f._tween,e),j},priority:c})},g.useSVGTransformAttr=m||n;var xa,ya="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),za=W("transform"),Aa=U+"transform",Ba=W("transformOrigin"),Ca=null!==W("perspective"),Da=P.Transform=function(){this.perspective=parseFloat(g.defaultTransformPerspective)||0,this.force3D=g.defaultForce3D!==!1&&Ca?g.defaultForce3D||"auto":!1},Ea=window.SVGElement,Fa=function(a,b,c){var d,e=L.createElementNS("http://www.w3.org/2000/svg",a),f=/([a-z])([A-Z])/g;for(d in c)e.setAttributeNS(null,d.replace(f,"$1-$2").toLowerCase(),c[d]);return b.appendChild(e),e},Ga=L.documentElement,Ha=function(){var a,b,c,d=p||/Android/i.test(Q)&&!window.chrome;return L.createElementNS&&!d&&(a=Fa("svg",Ga),b=Fa("rect",a,{width:100,height:50,x:100}),c=b.getBoundingClientRect().width,b.style[Ba]="50% 50%",b.style[za]="scaleX(0.5)",d=c===b.getBoundingClientRect().width&&!(n&&Ca),Ga.removeChild(a)),d}(),Ia=function(a,b,c,d,e,f){var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=a._gsTransform,w=Ma(a,!0);v&&(t=v.xOrigin,u=v.yOrigin),(!d||(h=d.split(" ")).length<2)&&(n=a.getBBox(),b=ea(b).split(" "),h=[(-1!==b[0].indexOf("%")?parseFloat(b[0])/100*n.width:parseFloat(b[0]))+n.x,(-1!==b[1].indexOf("%")?parseFloat(b[1])/100*n.height:parseFloat(b[1]))+n.y]),c.xOrigin=k=parseFloat(h[0]),c.yOrigin=l=parseFloat(h[1]),d&&w!==La&&(m=w[0],n=w[1],o=w[2],p=w[3],q=w[4],r=w[5],s=m*p-n*o,i=k*(p/s)+l*(-o/s)+(o*r-p*q)/s,j=k*(-n/s)+l*(m/s)-(m*r-n*q)/s,k=c.xOrigin=h[0]=i,l=c.yOrigin=h[1]=j),v&&(f&&(c.xOffset=v.xOffset,c.yOffset=v.yOffset,v=c),e||e!==!1&&g.defaultSmoothOrigin!==!1?(i=k-t,j=l-u,v.xOffset+=i*w[0]+j*w[2]-i,v.yOffset+=i*w[1]+j*w[3]-j):v.xOffset=v.yOffset=0),f||a.setAttribute("data-svg-origin",h.join(" "))},Ja=function(a){try{return a.getBBox()}catch(a){}},Ka=function(a){return!!(Ea&&a.getBBox&&a.getCTM&&Ja(a)&&(!a.parentNode||a.parentNode.getBBox&&a.parentNode.getCTM))},La=[1,0,0,1,0,0],Ma=function(a,b){var c,d,e,f,g,h=a._gsTransform||new Da,i=1e5;if(za?d=Y(a,Aa,null,!0):a.currentStyle&&(d=a.currentStyle.filter.match(E),d=d&&4===d.length?[d[0].substr(4),Number(d[2].substr(4)),Number(d[1].substr(4)),d[3].substr(4),h.x||0,h.y||0].join(","):""),c=!d||"none"===d||"matrix(1, 0, 0, 1, 0, 0)"===d,(h.svg||a.getBBox&&Ka(a))&&(c&&-1!==(a.style[za]+"").indexOf("matrix")&&(d=a.style[za],c=0),e=a.getAttribute("transform"),c&&e&&(-1!==e.indexOf("matrix")?(d=e,c=0):-1!==e.indexOf("translate")&&(d="matrix(1,0,0,1,"+e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",")+")",c=0))),c)return La;for(e=(d||"").match(q)||[],ta=e.length;--ta>-1;)f=Number(e[ta]),e[ta]=(g=f-(f|=0))?(g*i+(0>g?-.5:.5)|0)/i+f:f;return b&&e.length>6?[e[0],e[1],e[4],e[5],e[12],e[13]]:e},Na=P.getTransform=function(a,c,d,f){if(a._gsTransform&&d&&!f)return a._gsTransform;var h,i,j,k,l,m,n=d?a._gsTransform||new Da:new Da,o=n.scaleX<0,p=2e-5,q=1e5,r=Ca?parseFloat(Y(a,Ba,c,!1,"0 0 0").split(" ")[2])||n.zOrigin||0:0,s=parseFloat(g.defaultTransformPerspective)||0;if(n.svg=!(!a.getBBox||!Ka(a)),n.svg&&(Ia(a,Y(a,Ba,e,!1,"50% 50%")+"",n,a.getAttribute("data-svg-origin")),xa=g.useSVGTransformAttr||Ha),h=Ma(a),h!==La){if(16===h.length){var t,u,v,w,x,y=h[0],z=h[1],A=h[2],B=h[3],C=h[4],D=h[5],E=h[6],F=h[7],G=h[8],H=h[9],I=h[10],K=h[12],L=h[13],M=h[14],N=h[11],O=Math.atan2(E,I);n.zOrigin&&(M=-n.zOrigin,K=G*M-h[12],L=H*M-h[13],M=I*M+n.zOrigin-h[14]),n.rotationX=O*J,O&&(w=Math.cos(-O),x=Math.sin(-O),t=C*w+G*x,u=D*w+H*x,v=E*w+I*x,G=C*-x+G*w,H=D*-x+H*w,I=E*-x+I*w,N=F*-x+N*w,C=t,D=u,E=v),O=Math.atan2(-A,I),n.rotationY=O*J,O&&(w=Math.cos(-O),x=Math.sin(-O),t=y*w-G*x,u=z*w-H*x,v=A*w-I*x,H=z*x+H*w,I=A*x+I*w,N=B*x+N*w,y=t,z=u,A=v),O=Math.atan2(z,y),n.rotation=O*J,O&&(w=Math.cos(-O),x=Math.sin(-O),y=y*w+C*x,u=z*w+D*x,D=z*-x+D*w,E=A*-x+E*w,z=u),n.rotationX&&Math.abs(n.rotationX)+Math.abs(n.rotation)>359.9&&(n.rotationX=n.rotation=0,n.rotationY=180-n.rotationY),n.scaleX=(Math.sqrt(y*y+z*z)*q+.5|0)/q,n.scaleY=(Math.sqrt(D*D+H*H)*q+.5|0)/q,n.scaleZ=(Math.sqrt(E*E+I*I)*q+.5|0)/q,n.skewX=C||D?Math.atan2(C,D)*J+n.rotation:n.skewX||0,Math.abs(n.skewX)>90&&Math.abs(n.skewX)<270&&(o?(n.scaleX*=-1,n.skewX+=n.rotation<=0?180:-180,n.rotation+=n.rotation<=0?180:-180):(n.scaleY*=-1,n.skewX+=n.skewX<=0?180:-180)),n.perspective=N?1/(0>N?-N:N):0,n.x=K,n.y=L,n.z=M,n.svg&&(n.x-=n.xOrigin-(n.xOrigin*y-n.yOrigin*C),n.y-=n.yOrigin-(n.yOrigin*z-n.xOrigin*D))}else if((!Ca||f||!h.length||n.x!==h[4]||n.y!==h[5]||!n.rotationX&&!n.rotationY)&&(void 0===n.x||"none"!==Y(a,"display",c))){var P=h.length>=6,Q=P?h[0]:1,R=h[1]||0,S=h[2]||0,T=P?h[3]:1;n.x=h[4]||0,n.y=h[5]||0,j=Math.sqrt(Q*Q+R*R),k=Math.sqrt(T*T+S*S),l=Q||R?Math.atan2(R,Q)*J:n.rotation||0,m=S||T?Math.atan2(S,T)*J+l:n.skewX||0,Math.abs(m)>90&&Math.abs(m)<270&&(o?(j*=-1,m+=0>=l?180:-180,l+=0>=l?180:-180):(k*=-1,m+=0>=m?180:-180)),n.scaleX=j,n.scaleY=k,n.rotation=l,n.skewX=m,Ca&&(n.rotationX=n.rotationY=n.z=0,n.perspective=s,n.scaleZ=1),n.svg&&(n.x-=n.xOrigin-(n.xOrigin*Q+n.yOrigin*S),n.y-=n.yOrigin-(n.xOrigin*R+n.yOrigin*T))}n.zOrigin=r;for(i in n)n[i]<p&&n[i]>-p&&(n[i]=0)}return d&&(a._gsTransform=n,n.svg&&(xa&&a.style[za]?b.delayedCall(.001,function(){Ra(a.style,za)}):!xa&&a.getAttribute("transform")&&b.delayedCall(.001,function(){a.removeAttribute("transform")}))),n},Oa=function(a){var b,c,d=this.data,e=-d.rotation*I,f=e+d.skewX*I,g=1e5,h=(Math.cos(e)*d.scaleX*g|0)/g,i=(Math.sin(e)*d.scaleX*g|0)/g,j=(Math.sin(f)*-d.scaleY*g|0)/g,k=(Math.cos(f)*d.scaleY*g|0)/g,l=this.t.style,m=this.t.currentStyle;if(m){c=i,i=-j,j=-c,b=m.filter,l.filter="";var n,o,q=this.t.offsetWidth,r=this.t.offsetHeight,s="absolute"!==m.position,t="progid:DXImageTransform.Microsoft.Matrix(M11="+h+", M12="+i+", M21="+j+", M22="+k,w=d.x+q*d.xPercent/100,x=d.y+r*d.yPercent/100;if(null!=d.ox&&(n=(d.oxp?q*d.ox*.01:d.ox)-q/2,o=(d.oyp?r*d.oy*.01:d.oy)-r/2,w+=n-(n*h+o*i),x+=o-(n*j+o*k)),s?(n=q/2,o=r/2,t+=", Dx="+(n-(n*h+o*i)+w)+", Dy="+(o-(n*j+o*k)+x)+")"):t+=", sizingMethod='auto expand')",-1!==b.indexOf("DXImageTransform.Microsoft.Matrix(")?l.filter=b.replace(F,t):l.filter=t+" "+b,(0===a||1===a)&&1===h&&0===i&&0===j&&1===k&&(s&&-1===t.indexOf("Dx=0, Dy=0")||v.test(b)&&100!==parseFloat(RegExp.$1)||-1===b.indexOf(b.indexOf("Alpha"))&&l.removeAttribute("filter")),!s){var y,z,A,B=8>p?1:-1;for(n=d.ieOffsetX||0,o=d.ieOffsetY||0,d.ieOffsetX=Math.round((q-((0>h?-h:h)*q+(0>i?-i:i)*r))/2+w),d.ieOffsetY=Math.round((r-((0>k?-k:k)*r+(0>j?-j:j)*q))/2+x),ta=0;4>ta;ta++)z=ca[ta],y=m[z],c=-1!==y.indexOf("px")?parseFloat(y):Z(this.t,z,parseFloat(y),y.replace(u,""))||0,A=c!==d[z]?2>ta?-d.ieOffsetX:-d.ieOffsetY:2>ta?n-d.ieOffsetX:o-d.ieOffsetY,l[z]=(d[z]=Math.round(c-A*(0===ta||2===ta?1:B)))+"px"}}},Pa=P.set3DTransformRatio=P.setTransformRatio=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,o,p,q,r,s,t,u,v,w,x,y,z=this.data,A=this.t.style,B=z.rotation,C=z.rotationX,D=z.rotationY,E=z.scaleX,F=z.scaleY,G=z.scaleZ,H=z.x,J=z.y,K=z.z,L=z.svg,M=z.perspective,N=z.force3D;if(((1===a||0===a)&&"auto"===N&&(this.tween._totalTime===this.tween._totalDuration||!this.tween._totalTime)||!N)&&!K&&!M&&!D&&!C&&1===G||xa&&L||!Ca)return void(B||z.skewX||L?(B*=I,x=z.skewX*I,y=1e5,b=Math.cos(B)*E,e=Math.sin(B)*E,c=Math.sin(B-x)*-F,f=Math.cos(B-x)*F,x&&"simple"===z.skewType&&(s=Math.tan(x),s=Math.sqrt(1+s*s),c*=s,f*=s,z.skewY&&(b*=s,e*=s)),L&&(H+=z.xOrigin-(z.xOrigin*b+z.yOrigin*c)+z.xOffset,J+=z.yOrigin-(z.xOrigin*e+z.yOrigin*f)+z.yOffset,xa&&(z.xPercent||z.yPercent)&&(p=this.t.getBBox(),H+=.01*z.xPercent*p.width,J+=.01*z.yPercent*p.height),p=1e-6,p>H&&H>-p&&(H=0),p>J&&J>-p&&(J=0)),u=(b*y|0)/y+","+(e*y|0)/y+","+(c*y|0)/y+","+(f*y|0)/y+","+H+","+J+")",L&&xa?this.t.setAttribute("transform","matrix("+u):A[za]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix(":"matrix(")+u):A[za]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix(":"matrix(")+E+",0,0,"+F+","+H+","+J+")");if(n&&(p=1e-4,p>E&&E>-p&&(E=G=2e-5),p>F&&F>-p&&(F=G=2e-5),!M||z.z||z.rotationX||z.rotationY||(M=0)),B||z.skewX)B*=I,q=b=Math.cos(B),r=e=Math.sin(B),z.skewX&&(B-=z.skewX*I,q=Math.cos(B),r=Math.sin(B),"simple"===z.skewType&&(s=Math.tan(z.skewX*I),s=Math.sqrt(1+s*s),q*=s,r*=s,z.skewY&&(b*=s,e*=s))),c=-r,f=q;else{if(!(D||C||1!==G||M||L))return void(A[za]=(z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) translate3d(":"translate3d(")+H+"px,"+J+"px,"+K+"px)"+(1!==E||1!==F?" scale("+E+","+F+")":""));b=f=1,c=e=0}j=1,d=g=h=i=k=l=0,m=M?-1/M:0,o=z.zOrigin,p=1e-6,v=",",w="0",B=D*I,B&&(q=Math.cos(B),r=Math.sin(B),h=-r,k=m*-r,d=b*r,g=e*r,j=q,m*=q,b*=q,e*=q),B=C*I,B&&(q=Math.cos(B),r=Math.sin(B),s=c*q+d*r,t=f*q+g*r,i=j*r,l=m*r,d=c*-r+d*q,g=f*-r+g*q,j*=q,m*=q,c=s,f=t),1!==G&&(d*=G,g*=G,j*=G,m*=G),1!==F&&(c*=F,f*=F,i*=F,l*=F),1!==E&&(b*=E,e*=E,h*=E,k*=E),(o||L)&&(o&&(H+=d*-o,J+=g*-o,K+=j*-o+o),L&&(H+=z.xOrigin-(z.xOrigin*b+z.yOrigin*c)+z.xOffset,J+=z.yOrigin-(z.xOrigin*e+z.yOrigin*f)+z.yOffset),p>H&&H>-p&&(H=w),p>J&&J>-p&&(J=w),p>K&&K>-p&&(K=0)),u=z.xPercent||z.yPercent?"translate("+z.xPercent+"%,"+z.yPercent+"%) matrix3d(":"matrix3d(",u+=(p>b&&b>-p?w:b)+v+(p>e&&e>-p?w:e)+v+(p>h&&h>-p?w:h),u+=v+(p>k&&k>-p?w:k)+v+(p>c&&c>-p?w:c)+v+(p>f&&f>-p?w:f),C||D||1!==G?(u+=v+(p>i&&i>-p?w:i)+v+(p>l&&l>-p?w:l)+v+(p>d&&d>-p?w:d),u+=v+(p>g&&g>-p?w:g)+v+(p>j&&j>-p?w:j)+v+(p>m&&m>-p?w:m)+v):u+=",0,0,0,0,1,0,",u+=H+v+J+v+K+v+(M?1+-K/M:1)+")",A[za]=u};j=Da.prototype,j.x=j.y=j.z=j.skewX=j.skewY=j.rotation=j.rotationX=j.rotationY=j.zOrigin=j.xPercent=j.yPercent=j.xOffset=j.yOffset=0,j.scaleX=j.scaleY=j.scaleZ=1,va("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(a,b,c,d,f,h,i){if(d._lastParsedTransform===i)return f;d._lastParsedTransform=i;var j,k,l,m,n,o,p,q,r,s,t=a._gsTransform,u=a.style,v=1e-6,w=ya.length,x=i,y={},z="transformOrigin";if(i.display?(l=Y(a,"display"),u.display="block",j=Na(a,e,!0,i.parseTransform),u.display=l):j=Na(a,e,!0,i.parseTransform),d._transform=j,"string"==typeof x.transform&&za)l=N.style,l[za]=x.transform,l.display="block",l.position="absolute",L.body.appendChild(N),k=Na(N,null,!1),j.svg&&(q=j.xOrigin,r=j.yOrigin,k.x-=j.xOffset,k.y-=j.yOffset,(x.transformOrigin||x.svgOrigin)&&(m={},Ia(a,ea(x.transformOrigin),m,x.svgOrigin,x.smoothOrigin,!0),q=m.xOrigin,r=m.yOrigin,k.x-=m.xOffset-j.xOffset,k.y-=m.yOffset-j.yOffset),(q||r)&&(s=Ma(N),k.x-=q-(q*s[0]+r*s[2]),k.y-=r-(q*s[1]+r*s[3]))),L.body.removeChild(N),k.perspective||(k.perspective=j.perspective),null!=x.xPercent&&(k.xPercent=ga(x.xPercent,j.xPercent)),null!=x.yPercent&&(k.yPercent=ga(x.yPercent,j.yPercent));else if("object"==typeof x){if(k={scaleX:ga(null!=x.scaleX?x.scaleX:x.scale,j.scaleX),scaleY:ga(null!=x.scaleY?x.scaleY:x.scale,j.scaleY),scaleZ:ga(x.scaleZ,j.scaleZ),x:ga(x.x,j.x),y:ga(x.y,j.y),z:ga(x.z,j.z),xPercent:ga(x.xPercent,j.xPercent),yPercent:ga(x.yPercent,j.yPercent),perspective:ga(x.transformPerspective,j.perspective)},p=x.directionalRotation,null!=p)if("object"==typeof p)for(l in p)x[l]=p[l];else x.rotation=p;"string"==typeof x.x&&-1!==x.x.indexOf("%")&&(k.x=0,k.xPercent=ga(x.x,j.xPercent)),"string"==typeof x.y&&-1!==x.y.indexOf("%")&&(k.y=0,k.yPercent=ga(x.y,j.yPercent)),k.rotation=ha("rotation"in x?x.rotation:"shortRotation"in x?x.shortRotation+"_short":"rotationZ"in x?x.rotationZ:j.rotation-j.skewY,j.rotation-j.skewY,"rotation",y),Ca&&(k.rotationX=ha("rotationX"in x?x.rotationX:"shortRotationX"in x?x.shortRotationX+"_short":j.rotationX||0,j.rotationX,"rotationX",y),k.rotationY=ha("rotationY"in x?x.rotationY:"shortRotationY"in x?x.shortRotationY+"_short":j.rotationY||0,j.rotationY,"rotationY",y)),k.skewX=ha(x.skewX,j.skewX-j.skewY),(k.skewY=ha(x.skewY,j.skewY))&&(k.skewX+=k.skewY,k.rotation+=k.skewY)}for(Ca&&null!=x.force3D&&(j.force3D=x.force3D,o=!0),j.skewType=x.skewType||j.skewType||g.defaultSkewType,n=j.force3D||j.z||j.rotationX||j.rotationY||k.z||k.rotationX||k.rotationY||k.perspective,n||null==x.scale||(k.scaleZ=1);--w>-1;)c=ya[w],m=k[c]-j[c],(m>v||-v>m||null!=x[c]||null!=K[c])&&(o=!0,f=new qa(j,c,j[c],m,f),c in y&&(f.e=y[c]),f.xs0=0,f.plugin=h,d._overwriteProps.push(f.n));return m=x.transformOrigin,j.svg&&(m||x.svgOrigin)&&(q=j.xOffset,r=j.yOffset,Ia(a,ea(m),k,x.svgOrigin,x.smoothOrigin),f=ra(j,"xOrigin",(t?j:k).xOrigin,k.xOrigin,f,z),f=ra(j,"yOrigin",(t?j:k).yOrigin,k.yOrigin,f,z),(q!==j.xOffset||r!==j.yOffset)&&(f=ra(j,"xOffset",t?q:j.xOffset,j.xOffset,f,z),f=ra(j,"yOffset",t?r:j.yOffset,j.yOffset,f,z)),m=xa?null:"0px 0px"),(m||Ca&&n&&j.zOrigin)&&(za?(o=!0,c=Ba,m=(m||Y(a,c,e,!1,"50% 50%"))+"",f=new qa(u,c,0,0,f,-1,z),f.b=u[c],f.plugin=h,Ca?(l=j.zOrigin,m=m.split(" "),j.zOrigin=(m.length>2&&(0===l||"0px"!==m[2])?parseFloat(m[2]):l)||0,f.xs0=f.e=m[0]+" "+(m[1]||"50%")+" 0px",f=new qa(j,"zOrigin",0,0,f,-1,f.n),f.b=l,f.xs0=f.e=j.zOrigin):f.xs0=f.e=m):ea(m+"",j)),o&&(d._transformType=j.svg&&xa||!n&&3!==this._transformType?2:3),f},prefix:!0}),va("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),va("borderRadius",{defaultValue:"0px",parser:function(a,b,c,f,g,h){b=this.format(b);var i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],z=a.style;
for(q=parseFloat(a.offsetWidth),r=parseFloat(a.offsetHeight),i=b.split(" "),j=0;j<y.length;j++)this.p.indexOf("border")&&(y[j]=W(y[j])),m=l=Y(a,y[j],e,!1,"0px"),-1!==m.indexOf(" ")&&(l=m.split(" "),m=l[0],l=l[1]),n=k=i[j],o=parseFloat(m),t=m.substr((o+"").length),u="="===n.charAt(1),u?(p=parseInt(n.charAt(0)+"1",10),n=n.substr(2),p*=parseFloat(n),s=n.substr((p+"").length-(0>p?1:0))||""):(p=parseFloat(n),s=n.substr((p+"").length)),""===s&&(s=d[c]||t),s!==t&&(v=Z(a,"borderLeft",o,t),w=Z(a,"borderTop",o,t),"%"===s?(m=v/q*100+"%",l=w/r*100+"%"):"em"===s?(x=Z(a,"borderLeft",1,"em"),m=v/x+"em",l=w/x+"em"):(m=v+"px",l=w+"px"),u&&(n=parseFloat(m)+p+s,k=parseFloat(l)+p+s)),g=sa(z,y[j],m+" "+l,n+" "+k,!1,"0px",g);return g},prefix:!0,formatter:na("0px 0px 0px 0px",!1,!0)}),va("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",{defaultValue:"0px",parser:function(a,b,c,d,f,g){return sa(a.style,c,this.format(Y(a,c,e,!1,"0px 0px")),this.format(b),!1,"0px",f)},prefix:!0,formatter:na("0px 0px",!1,!0)}),va("backgroundPosition",{defaultValue:"0 0",parser:function(a,b,c,d,f,g){var h,i,j,k,l,m,n="background-position",o=e||X(a,null),q=this.format((o?p?o.getPropertyValue(n+"-x")+" "+o.getPropertyValue(n+"-y"):o.getPropertyValue(n):a.currentStyle.backgroundPositionX+" "+a.currentStyle.backgroundPositionY)||"0 0"),r=this.format(b);if(-1!==q.indexOf("%")!=(-1!==r.indexOf("%"))&&r.split(",").length<2&&(m=Y(a,"backgroundImage").replace(B,""),m&&"none"!==m)){for(h=q.split(" "),i=r.split(" "),O.setAttribute("src",m),j=2;--j>-1;)q=h[j],k=-1!==q.indexOf("%"),k!==(-1!==i[j].indexOf("%"))&&(l=0===j?a.offsetWidth-O.width:a.offsetHeight-O.height,h[j]=k?parseFloat(q)/100*l+"px":parseFloat(q)/l*100+"%");q=h.join(" ")}return this.parseComplex(a.style,q,r,f,g)},formatter:ea}),va("backgroundSize",{defaultValue:"0 0",formatter:ea}),va("perspective",{defaultValue:"0px",prefix:!0}),va("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),va("transformStyle",{prefix:!0}),va("backfaceVisibility",{prefix:!0}),va("userSelect",{prefix:!0}),va("margin",{parser:oa("marginTop,marginRight,marginBottom,marginLeft")}),va("padding",{parser:oa("paddingTop,paddingRight,paddingBottom,paddingLeft")}),va("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(a,b,c,d,f,g){var h,i,j;return 9>p?(i=a.currentStyle,j=8>p?" ":",",h="rect("+i.clipTop+j+i.clipRight+j+i.clipBottom+j+i.clipLeft+")",b=this.format(b).split(",").join(j)):(h=this.format(Y(a,this.p,e,!1,this.dflt)),b=this.format(b)),this.parseComplex(a.style,h,b,f,g)}}),va("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),va("autoRound,strictUnits",{parser:function(a,b,c,d,e){return e}}),va("border",{defaultValue:"0px solid #000",parser:function(a,b,c,d,f,g){return this.parseComplex(a.style,this.format(Y(a,"borderTopWidth",e,!1,"0px")+" "+Y(a,"borderTopStyle",e,!1,"solid")+" "+Y(a,"borderTopColor",e,!1,"#000")),this.format(b),f,g)},color:!0,formatter:function(a){var b=a.split(" ");return b[0]+" "+(b[1]||"solid")+" "+(a.match(ma)||["#000"])[0]}}),va("borderWidth",{parser:oa("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),va("float,cssFloat,styleFloat",{parser:function(a,b,c,d,e,f){var g=a.style,h="cssFloat"in g?"cssFloat":"styleFloat";return new qa(g,h,0,0,e,-1,c,!1,0,g[h],b)}});var Qa=function(a){var b,c=this.t,d=c.filter||Y(this.data,"filter")||"",e=this.s+this.c*a|0;100===e&&(-1===d.indexOf("atrix(")&&-1===d.indexOf("radient(")&&-1===d.indexOf("oader(")?(c.removeAttribute("filter"),b=!Y(this.data,"filter")):(c.filter=d.replace(x,""),b=!0)),b||(this.xn1&&(c.filter=d=d||"alpha(opacity="+e+")"),-1===d.indexOf("pacity")?0===e&&this.xn1||(c.filter=d+" alpha(opacity="+e+")"):c.filter=d.replace(v,"opacity="+e))};va("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(a,b,c,d,f,g){var h=parseFloat(Y(a,"opacity",e,!1,"1")),i=a.style,j="autoAlpha"===c;return"string"==typeof b&&"="===b.charAt(1)&&(b=("-"===b.charAt(0)?-1:1)*parseFloat(b.substr(2))+h),j&&1===h&&"hidden"===Y(a,"visibility",e)&&0!==b&&(h=0),R?f=new qa(i,"opacity",h,b-h,f):(f=new qa(i,"opacity",100*h,100*(b-h),f),f.xn1=j?1:0,i.zoom=1,f.type=2,f.b="alpha(opacity="+f.s+")",f.e="alpha(opacity="+(f.s+f.c)+")",f.data=a,f.plugin=g,f.setRatio=Qa),j&&(f=new qa(i,"visibility",0,0,f,-1,null,!1,0,0!==h?"inherit":"hidden",0===b?"hidden":"inherit"),f.xs0="inherit",d._overwriteProps.push(f.n),d._overwriteProps.push(c)),f}});var Ra=function(a,b){b&&(a.removeProperty?(("ms"===b.substr(0,2)||"webkit"===b.substr(0,6))&&(b="-"+b),a.removeProperty(b.replace(z,"-$1").toLowerCase())):a.removeAttribute(b))},Sa=function(a){if(this.t._gsClassPT=this,1===a||0===a){this.t.setAttribute("class",0===a?this.b:this.e);for(var b=this.data,c=this.t.style;b;)b.v?c[b.p]=b.v:Ra(c,b.p),b=b._next;1===a&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};va("className",{parser:function(a,b,d,f,g,h,i){var j,k,l,m,n,o=a.getAttribute("class")||"",p=a.style.cssText;if(g=f._classNamePT=new qa(a,d,0,0,g,2),g.setRatio=Sa,g.pr=-11,c=!0,g.b=o,k=_(a,e),l=a._gsClassPT){for(m={},n=l.data;n;)m[n.p]=1,n=n._next;l.setRatio(1)}return a._gsClassPT=g,g.e="="!==b.charAt(1)?b:o.replace(new RegExp("(?:\\s|^)"+b.substr(2)+"(?![\\w-])"),"")+("+"===b.charAt(0)?" "+b.substr(2):""),a.setAttribute("class",g.e),j=aa(a,k,_(a),i,m),a.setAttribute("class",o),g.data=j.firstMPT,a.style.cssText=p,g=g.xfirst=f.parse(a,j.difs,g,h)}});var Ta=function(a){if((1===a||0===a)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var b,c,d,e,f,g=this.t.style,h=i.transform.parse;if("all"===this.e)g.cssText="",e=!0;else for(b=this.e.split(" ").join("").split(","),d=b.length;--d>-1;)c=b[d],i[c]&&(i[c].parse===h?e=!0:c="transformOrigin"===c?Ba:i[c].p),Ra(g,c);e&&(Ra(g,za),f=this.t._gsTransform,f&&(f.svg&&(this.t.removeAttribute("data-svg-origin"),this.t.removeAttribute("transform")),delete this.t._gsTransform))}};for(va("clearProps",{parser:function(a,b,d,e,f){return f=new qa(a,d,0,0,f,2),f.setRatio=Ta,f.e=b,f.pr=-10,f.data=e._tween,c=!0,f}}),j="bezier,throwProps,physicsProps,physics2D".split(","),ta=j.length;ta--;)wa(j[ta]);j=g.prototype,j._firstPT=j._lastParsedTransform=j._transform=null,j._onInitTween=function(a,b,h){if(!a.nodeType)return!1;this._target=a,this._tween=h,this._vars=b,k=b.autoRound,c=!1,d=b.suffixMap||g.suffixMap,e=X(a,""),f=this._overwriteProps;var j,n,p,q,r,s,t,u,v,x=a.style;if(l&&""===x.zIndex&&(j=Y(a,"zIndex",e),("auto"===j||""===j)&&this._addLazySet(x,"zIndex",0)),"string"==typeof b&&(q=x.cssText,j=_(a,e),x.cssText=q+";"+b,j=aa(a,j,_(a)).difs,!R&&w.test(b)&&(j.opacity=parseFloat(RegExp.$1)),b=j,x.cssText=q),b.className?this._firstPT=n=i.className.parse(a,b.className,"className",this,null,null,b):this._firstPT=n=this.parse(a,b,null),this._transformType){for(v=3===this._transformType,za?m&&(l=!0,""===x.zIndex&&(t=Y(a,"zIndex",e),("auto"===t||""===t)&&this._addLazySet(x,"zIndex",0)),o&&this._addLazySet(x,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(v?"visible":"hidden"))):x.zoom=1,p=n;p&&p._next;)p=p._next;u=new qa(a,"transform",0,0,null,2),this._linkCSSP(u,null,p),u.setRatio=za?Pa:Oa,u.data=this._transform||Na(a,e,!0),u.tween=h,u.pr=-1,f.pop()}if(c){for(;n;){for(s=n._next,p=q;p&&p.pr>n.pr;)p=p._next;(n._prev=p?p._prev:r)?n._prev._next=n:q=n,(n._next=p)?p._prev=n:r=n,n=s}this._firstPT=q}return!0},j.parse=function(a,b,c,f){var g,h,j,l,m,n,o,p,q,r,s=a.style;for(g in b)n=b[g],h=i[g],h?c=h.parse(a,n,g,this,c,f,b):(m=Y(a,g,e)+"",q="string"==typeof n,"color"===g||"fill"===g||"stroke"===g||-1!==g.indexOf("Color")||q&&y.test(n)?(q||(n=ka(n),n=(n.length>3?"rgba(":"rgb(")+n.join(",")+")"),c=sa(s,g,m,n,!0,"transparent",c,0,f)):q&&H.test(n)?c=sa(s,g,m,n,!0,null,c,0,f):(j=parseFloat(m),o=j||0===j?m.substr((j+"").length):"",(""===m||"auto"===m)&&("width"===g||"height"===g?(j=da(a,g,e),o="px"):"left"===g||"top"===g?(j=$(a,g,e),o="px"):(j="opacity"!==g?0:1,o="")),r=q&&"="===n.charAt(1),r?(l=parseInt(n.charAt(0)+"1",10),n=n.substr(2),l*=parseFloat(n),p=n.replace(u,"")):(l=parseFloat(n),p=q?n.replace(u,""):""),""===p&&(p=g in d?d[g]:o),n=l||0===l?(r?l+j:l)+p:b[g],o!==p&&""!==p&&(l||0===l)&&j&&(j=Z(a,g,j,o),"%"===p?(j/=Z(a,g,100,"%")/100,b.strictUnits!==!0&&(m=j+"%")):"em"===p||"rem"===p||"vw"===p||"vh"===p?j/=Z(a,g,1,p):"px"!==p&&(l=Z(a,g,l,p),p="px"),r&&(l||0===l)&&(n=l+j+p)),r&&(l+=j),!j&&0!==j||!l&&0!==l?void 0!==s[g]&&(n||n+""!="NaN"&&null!=n)?(c=new qa(s,g,l||j||0,0,c,-1,g,!1,0,m,n),c.xs0="none"!==n||"display"!==g&&-1===g.indexOf("Style")?n:m):T("invalid "+g+" tween value: "+b[g]):(c=new qa(s,g,j,l-j,c,0,g,k!==!1&&("px"===p||"zIndex"===g),0,m,n),c.xs0=p))),f&&c&&!c.plugin&&(c.plugin=f);return c},j.setRatio=function(a){var b,c,d,e=this._firstPT,f=1e-6;if(1!==a||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(a||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;e;){if(b=e.c*a+e.s,e.r?b=Math.round(b):f>b&&b>-f&&(b=0),e.type)if(1===e.type)if(d=e.l,2===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2;else if(3===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3;else if(4===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3+e.xn3+e.xs4;else if(5===d)e.t[e.p]=e.xs0+b+e.xs1+e.xn1+e.xs2+e.xn2+e.xs3+e.xn3+e.xs4+e.xn4+e.xs5;else{for(c=e.xs0+b+e.xs1,d=1;d<e.l;d++)c+=e["xn"+d]+e["xs"+(d+1)];e.t[e.p]=c}else-1===e.type?e.t[e.p]=e.xs0:e.setRatio&&e.setRatio(a);else e.t[e.p]=b+e.xs0;e=e._next}else for(;e;)2!==e.type?e.t[e.p]=e.b:e.setRatio(a),e=e._next;else for(;e;){if(2!==e.type)if(e.r&&-1!==e.type)if(b=Math.round(e.s+e.c),e.type){if(1===e.type){for(d=e.l,c=e.xs0+b+e.xs1,d=1;d<e.l;d++)c+=e["xn"+d]+e["xs"+(d+1)];e.t[e.p]=c}}else e.t[e.p]=b+e.xs0;else e.t[e.p]=e.e;else e.setRatio(a);e=e._next}},j._enableTransforms=function(a){this._transform=this._transform||Na(this._target,e,!0),this._transformType=this._transform.svg&&xa||!a&&3!==this._transformType?2:3};var Ua=function(a){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};j._addLazySet=function(a,b,c){var d=this._firstPT=new qa(a,b,0,0,this._firstPT,2);d.e=c,d.setRatio=Ua,d.data=this},j._linkCSSP=function(a,b,c,d){return a&&(b&&(b._prev=a),a._next&&(a._next._prev=a._prev),a._prev?a._prev._next=a._next:this._firstPT===a&&(this._firstPT=a._next,d=!0),c?c._next=a:d||null!==this._firstPT||(this._firstPT=a),a._next=b,a._prev=c),a},j._kill=function(b){var c,d,e,f=b;if(b.autoAlpha||b.alpha){f={};for(d in b)f[d]=b[d];f.opacity=1,f.autoAlpha&&(f.visibility=1)}return b.className&&(c=this._classNamePT)&&(e=c.xfirst,e&&e._prev?this._linkCSSP(e._prev,c._next,e._prev._prev):e===this._firstPT&&(this._firstPT=c._next),c._next&&this._linkCSSP(c._next,c._next._next,e._prev),this._classNamePT=null),a.prototype._kill.call(this,f)};var Va=function(a,b,c){var d,e,f,g;if(a.slice)for(e=a.length;--e>-1;)Va(a[e],b,c);else for(d=a.childNodes,e=d.length;--e>-1;)f=d[e],g=f.type,f.style&&(b.push(_(f)),c&&c.push(f)),1!==g&&9!==g&&11!==g||!f.childNodes.length||Va(f,b,c)};return g.cascadeTo=function(a,c,d){var e,f,g,h,i=b.to(a,c,d),j=[i],k=[],l=[],m=[],n=b._internals.reservedProps;for(a=i._targets||i.target,Va(a,k,m),i.render(c,!0,!0),Va(a,l),i.render(0,!0,!0),i._enabled(!0),e=m.length;--e>-1;)if(f=aa(m[e],k[e],l[e]),f.firstMPT){f=f.difs;for(g in d)n[g]&&(f[g]=d[g]);h={};for(g in f)h[g]=k[e][g];j.push(b.fromTo(m[e],c,h,f))}return j},a.activate([g]),g},!0),function(){var a=_gsScope._gsDefine.plugin({propName:"roundProps",version:"1.5",priority:-1,API:2,init:function(a,b,c){return this._tween=c,!0}}),b=function(a){for(;a;)a.f||a.blob||(a.r=1),a=a._next},c=a.prototype;c._onInitAllProps=function(){for(var a,c,d,e=this._tween,f=e.vars.roundProps.join?e.vars.roundProps:e.vars.roundProps.split(","),g=f.length,h={},i=e._propLookup.roundProps;--g>-1;)h[f[g]]=1;for(g=f.length;--g>-1;)for(a=f[g],c=e._firstPT;c;)d=c._next,c.pg?c.t._roundProps(h,!0):c.n===a&&(2===c.f&&c.t?b(c.t._firstPT):(this._add(c.t,a,c.s,c.c),d&&(d._prev=c._prev),c._prev?c._prev._next=d:e._firstPT===c&&(e._firstPT=d),c._next=c._prev=null,e._propLookup[a]=i)),c=d;return!1},c._add=function(a,b,c,d){this._addTween(a,b,c,c+d,b,!0),this._overwriteProps.push(b)}}(),function(){_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.5.0",init:function(a,b,c){var d;if("function"!=typeof a.setAttribute)return!1;for(d in b)this._addTween(a,"setAttribute",a.getAttribute(d)+"",b[d]+"",d,!1,d),this._overwriteProps.push(d);return!0}})}(),_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(a,b,c){"object"!=typeof b&&(b={rotation:b}),this.finals={};var d,e,f,g,h,i,j=b.useRadians===!0?2*Math.PI:360,k=1e-6;for(d in b)"useRadians"!==d&&(i=(b[d]+"").split("_"),e=i[0],f=parseFloat("function"!=typeof a[d]?a[d]:a[d.indexOf("set")||"function"!=typeof a["get"+d.substr(3)]?d:"get"+d.substr(3)]()),g=this.finals[d]="string"==typeof e&&"="===e.charAt(1)?f+parseInt(e.charAt(0)+"1",10)*Number(e.substr(2)):Number(e)||0,h=g-f,i.length&&(e=i.join("_"),-1!==e.indexOf("short")&&(h%=j,h!==h%(j/2)&&(h=0>h?h+j:h-j)),-1!==e.indexOf("_cw")&&0>h?h=(h+9999999999*j)%j-(h/j|0)*j:-1!==e.indexOf("ccw")&&h>0&&(h=(h-9999999999*j)%j-(h/j|0)*j)),(h>k||-k>h)&&(this._addTween(a,d,f,f+h,d),this._overwriteProps.push(d)));return!0},set:function(a){var b;if(1!==a)this._super.setRatio.call(this,a);else for(b=this._firstPT;b;)b.f?b.t[b.p](this.finals[b.p]):b.t[b.p]=this.finals[b.p],b=b._next}})._autoCSS=!0,_gsScope._gsDefine("easing.Back",["easing.Ease"],function(a){var b,c,d,e=_gsScope.GreenSockGlobals||_gsScope,f=e.com.greensock,g=2*Math.PI,h=Math.PI/2,i=f._class,j=function(b,c){var d=i("easing."+b,function(){},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,d},k=a.register||function(){},l=function(a,b,c,d,e){var f=i("easing."+a,{easeOut:new b,easeIn:new c,easeInOut:new d},!0);return k(f,a),f},m=function(a,b,c){this.t=a,this.v=b,c&&(this.next=c,c.prev=this,this.c=c.v-b,this.gap=c.t-a)},n=function(b,c){var d=i("easing."+b,function(a){this._p1=a||0===a?a:1.70158,this._p2=1.525*this._p1},!0),e=d.prototype=new a;return e.constructor=d,e.getRatio=c,e.config=function(a){return new d(a)},d},o=l("Back",n("BackOut",function(a){return(a-=1)*a*((this._p1+1)*a+this._p1)+1}),n("BackIn",function(a){return a*a*((this._p1+1)*a-this._p1)}),n("BackInOut",function(a){return(a*=2)<1?.5*a*a*((this._p2+1)*a-this._p2):.5*((a-=2)*a*((this._p2+1)*a+this._p2)+2)})),p=i("easing.SlowMo",function(a,b,c){b=b||0===b?b:.7,null==a?a=.7:a>1&&(a=1),this._p=1!==a?b:0,this._p1=(1-a)/2,this._p2=a,this._p3=this._p1+this._p2,this._calcEnd=c===!0},!0),q=p.prototype=new a;return q.constructor=p,q.getRatio=function(a){var b=a+(.5-a)*this._p;return a<this._p1?this._calcEnd?1-(a=1-a/this._p1)*a:b-(a=1-a/this._p1)*a*a*a*b:a>this._p3?this._calcEnd?1-(a=(a-this._p3)/this._p1)*a:b+(a-b)*(a=(a-this._p3)/this._p1)*a*a*a:this._calcEnd?1:b},p.ease=new p(.7,.7),q.config=p.config=function(a,b,c){return new p(a,b,c)},b=i("easing.SteppedEase",function(a){a=a||1,this._p1=1/a,this._p2=a+1},!0),q=b.prototype=new a,q.constructor=b,q.getRatio=function(a){return 0>a?a=0:a>=1&&(a=.999999999),(this._p2*a>>0)*this._p1},q.config=b.config=function(a){return new b(a)},c=i("easing.RoughEase",function(b){b=b||{};for(var c,d,e,f,g,h,i=b.taper||"none",j=[],k=0,l=0|(b.points||20),n=l,o=b.randomize!==!1,p=b.clamp===!0,q=b.template instanceof a?b.template:null,r="number"==typeof b.strength?.4*b.strength:.4;--n>-1;)c=o?Math.random():1/l*n,d=q?q.getRatio(c):c,"none"===i?e=r:"out"===i?(f=1-c,e=f*f*r):"in"===i?e=c*c*r:.5>c?(f=2*c,e=f*f*.5*r):(f=2*(1-c),e=f*f*.5*r),o?d+=Math.random()*e-.5*e:n%2?d+=.5*e:d-=.5*e,p&&(d>1?d=1:0>d&&(d=0)),j[k++]={x:c,y:d};for(j.sort(function(a,b){return a.x-b.x}),h=new m(1,1,null),n=l;--n>-1;)g=j[n],h=new m(g.x,g.y,h);this._prev=new m(0,0,0!==h.t?h:h.next)},!0),q=c.prototype=new a,q.constructor=c,q.getRatio=function(a){var b=this._prev;if(a>b.t){for(;b.next&&a>=b.t;)b=b.next;b=b.prev}else for(;b.prev&&a<=b.t;)b=b.prev;return this._prev=b,b.v+(a-b.t)/b.gap*b.c},q.config=function(a){return new c(a)},c.ease=new c,l("Bounce",j("BounceOut",function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}),j("BounceIn",function(a){return(a=1-a)<1/2.75?1-7.5625*a*a:2/2.75>a?1-(7.5625*(a-=1.5/2.75)*a+.75):2.5/2.75>a?1-(7.5625*(a-=2.25/2.75)*a+.9375):1-(7.5625*(a-=2.625/2.75)*a+.984375)}),j("BounceInOut",function(a){var b=.5>a;return a=b?1-2*a:2*a-1,a=1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375,b?.5*(1-a):.5*a+.5})),l("Circ",j("CircOut",function(a){return Math.sqrt(1-(a-=1)*a)}),j("CircIn",function(a){return-(Math.sqrt(1-a*a)-1)}),j("CircInOut",function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)})),d=function(b,c,d){var e=i("easing."+b,function(a,b){this._p1=a>=1?a:1,this._p2=(b||d)/(1>a?a:1),this._p3=this._p2/g*(Math.asin(1/this._p1)||0),this._p2=g/this._p2},!0),f=e.prototype=new a;return f.constructor=e,f.getRatio=c,f.config=function(a,b){return new e(a,b)},e},l("Elastic",d("ElasticOut",function(a){return this._p1*Math.pow(2,-10*a)*Math.sin((a-this._p3)*this._p2)+1},.3),d("ElasticIn",function(a){return-(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2))},.3),d("ElasticInOut",function(a){return(a*=2)<1?-.5*(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*this._p2)):this._p1*Math.pow(2,-10*(a-=1))*Math.sin((a-this._p3)*this._p2)*.5+1},.45)),l("Expo",j("ExpoOut",function(a){return 1-Math.pow(2,-10*a)}),j("ExpoIn",function(a){return Math.pow(2,10*(a-1))-.001}),j("ExpoInOut",function(a){return(a*=2)<1?.5*Math.pow(2,10*(a-1)):.5*(2-Math.pow(2,-10*(a-1)))})),l("Sine",j("SineOut",function(a){return Math.sin(a*h)}),j("SineIn",function(a){return-Math.cos(a*h)+1}),j("SineInOut",function(a){return-.5*(Math.cos(Math.PI*a)-1)})),i("easing.EaseLookup",{find:function(b){return a.map[b]}},!0),k(e.SlowMo,"SlowMo","ease,"),k(c,"RoughEase","ease,"),k(b,"SteppedEase","ease,"),o},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a,b){"use strict";var c=a.GreenSockGlobals=a.GreenSockGlobals||a;if(!c.TweenLite){var d,e,f,g,h,i=function(a){var b,d=a.split("."),e=c;for(b=0;b<d.length;b++)e[d[b]]=e=e[d[b]]||{};return e},j=i("com.greensock"),k=1e-10,l=function(a){var b,c=[],d=a.length;for(b=0;b!==d;c.push(a[b++]));return c},m=function(){},n=function(){var a=Object.prototype.toString,b=a.call([]);return function(c){return null!=c&&(c instanceof Array||"object"==typeof c&&!!c.push&&a.call(c)===b)}}(),o={},p=function(d,e,f,g){this.sc=o[d]?o[d].sc:[],o[d]=this,this.gsClass=null,this.func=f;var h=[];this.check=function(j){for(var k,l,m,n,q,r=e.length,s=r;--r>-1;)(k=o[e[r]]||new p(e[r],[])).gsClass?(h[r]=k.gsClass,s--):j&&k.sc.push(this);if(0===s&&f)for(l=("com.greensock."+d).split("."),m=l.pop(),n=i(l.join("."))[m]=this.gsClass=f.apply(f,h),g&&(c[m]=n,q="undefined"!=typeof module&&module.exports,!q&&"function"==typeof define&&define.amd?define((a.GreenSockAMDPath?a.GreenSockAMDPath+"/":"")+d.split(".").pop(),[],function(){return n}):d===b&&q&&(module.exports=n)),r=0;r<this.sc.length;r++)this.sc[r].check()},this.check(!0)},q=a._gsDefine=function(a,b,c,d){return new p(a,b,c,d)},r=j._class=function(a,b,c){return b=b||function(){},q(a,[],function(){return b},c),b};q.globals=c;var s=[0,0,1,1],t=[],u=r("easing.Ease",function(a,b,c,d){this._func=a,this._type=c||0,this._power=d||0,this._params=b?s.concat(b):s},!0),v=u.map={},w=u.register=function(a,b,c,d){for(var e,f,g,h,i=b.split(","),k=i.length,l=(c||"easeIn,easeOut,easeInOut").split(",");--k>-1;)for(f=i[k],e=d?r("easing."+f,null,!0):j.easing[f]||{},g=l.length;--g>-1;)h=l[g],v[f+"."+h]=v[h+f]=e[h]=a.getRatio?a:a[h]||new a};for(f=u.prototype,f._calcEnd=!1,f.getRatio=function(a){if(this._func)return this._params[0]=a,this._func.apply(null,this._params);var b=this._type,c=this._power,d=1===b?1-a:2===b?a:.5>a?2*a:2*(1-a);return 1===c?d*=d:2===c?d*=d*d:3===c?d*=d*d*d:4===c&&(d*=d*d*d*d),1===b?1-d:2===b?d:.5>a?d/2:1-d/2},d=["Linear","Quad","Cubic","Quart","Quint,Strong"],e=d.length;--e>-1;)f=d[e]+",Power"+e,w(new u(null,null,1,e),f,"easeOut",!0),w(new u(null,null,2,e),f,"easeIn"+(0===e?",easeNone":"")),w(new u(null,null,3,e),f,"easeInOut");v.linear=j.easing.Linear.easeIn,v.swing=j.easing.Quad.easeInOut;var x=r("events.EventDispatcher",function(a){this._listeners={},this._eventTarget=a||this});f=x.prototype,f.addEventListener=function(a,b,c,d,e){e=e||0;var f,i,j=this._listeners[a],k=0;for(null==j&&(this._listeners[a]=j=[]),i=j.length;--i>-1;)f=j[i],f.c===b&&f.s===c?j.splice(i,1):0===k&&f.pr<e&&(k=i+1);j.splice(k,0,{c:b,s:c,up:d,pr:e}),this!==g||h||g.wake()},f.removeEventListener=function(a,b){var c,d=this._listeners[a];if(d)for(c=d.length;--c>-1;)if(d[c].c===b)return void d.splice(c,1)},f.dispatchEvent=function(a){var b,c,d,e=this._listeners[a];if(e)for(b=e.length,c=this._eventTarget;--b>-1;)d=e[b],d&&(d.up?d.c.call(d.s||c,{type:a,target:c}):d.c.call(d.s||c))};var y=a.requestAnimationFrame,z=a.cancelAnimationFrame,A=Date.now||function(){return(new Date).getTime()},B=A();for(d=["ms","moz","webkit","o"],e=d.length;--e>-1&&!y;)y=a[d[e]+"RequestAnimationFrame"],z=a[d[e]+"CancelAnimationFrame"]||a[d[e]+"CancelRequestAnimationFrame"];r("Ticker",function(a,b){var c,d,e,f,i,j=this,l=A(),n=b!==!1&&y?"auto":!1,o=500,p=33,q="tick",r=function(a){var b,g,h=A()-B;h>o&&(l+=h-p),B+=h,j.time=(B-l)/1e3,b=j.time-i,(!c||b>0||a===!0)&&(j.frame++,i+=b+(b>=f?.004:f-b),g=!0),a!==!0&&(e=d(r)),g&&j.dispatchEvent(q)};x.call(j),j.time=j.frame=0,j.tick=function(){r(!0)},j.lagSmoothing=function(a,b){o=a||1/k,p=Math.min(b,o,0)},j.sleep=function(){null!=e&&(n&&z?z(e):clearTimeout(e),d=m,e=null,j===g&&(h=!1))},j.wake=function(a){null!==e?j.sleep():a?l+=-B+(B=A()):j.frame>10&&(B=A()-o+5),d=0===c?m:n&&y?y:function(a){return setTimeout(a,1e3*(i-j.time)+1|0)},j===g&&(h=!0),r(2)},j.fps=function(a){return arguments.length?(c=a,f=1/(c||60),i=this.time+f,void j.wake()):c},j.useRAF=function(a){return arguments.length?(j.sleep(),n=a,void j.fps(c)):n},j.fps(a),setTimeout(function(){"auto"===n&&j.frame<5&&"hidden"!==document.visibilityState&&j.useRAF(!1)},1500)}),f=j.Ticker.prototype=new j.events.EventDispatcher,f.constructor=j.Ticker;var C=r("core.Animation",function(a,b){if(this.vars=b=b||{},this._duration=this._totalDuration=a||0,this._delay=Number(b.delay)||0,this._timeScale=1,this._active=b.immediateRender===!0,this.data=b.data,this._reversed=b.reversed===!0,V){h||g.wake();var c=this.vars.useFrames?U:V;c.add(this,c._time),this.vars.paused&&this.paused(!0)}});g=C.ticker=new j.Ticker,f=C.prototype,f._dirty=f._gc=f._initted=f._paused=!1,f._totalTime=f._time=0,f._rawPrevTime=-1,f._next=f._last=f._onUpdate=f._timeline=f.timeline=null,f._paused=!1;var D=function(){h&&A()-B>2e3&&g.wake(),setTimeout(D,2e3)};D(),f.play=function(a,b){return null!=a&&this.seek(a,b),this.reversed(!1).paused(!1)},f.pause=function(a,b){return null!=a&&this.seek(a,b),this.paused(!0)},f.resume=function(a,b){return null!=a&&this.seek(a,b),this.paused(!1)},f.seek=function(a,b){return this.totalTime(Number(a),b!==!1)},f.restart=function(a,b){return this.reversed(!1).paused(!1).totalTime(a?-this._delay:0,b!==!1,!0)},f.reverse=function(a,b){return null!=a&&this.seek(a||this.totalDuration(),b),this.reversed(!0).paused(!1)},f.render=function(a,b,c){},f.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},f.isActive=function(){var a,b=this._timeline,c=this._startTime;return!b||!this._gc&&!this._paused&&b.isActive()&&(a=b.rawTime())>=c&&a<c+this.totalDuration()/this._timeScale},f._enabled=function(a,b){return h||g.wake(),this._gc=!a,this._active=this.isActive(),b!==!0&&(a&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!a&&this.timeline&&this._timeline._remove(this,!0)),!1},f._kill=function(a,b){return this._enabled(!1,!1)},f.kill=function(a,b){return this._kill(a,b),this},f._uncache=function(a){for(var b=a?this:this.timeline;b;)b._dirty=!0,b=b.timeline;return this},f._swapSelfInParams=function(a){for(var b=a.length,c=a.concat();--b>-1;)"{self}"===a[b]&&(c[b]=this);return c},f._callback=function(a){var b=this.vars;b[a].apply(b[a+"Scope"]||b.callbackScope||this,b[a+"Params"]||t)},f.eventCallback=function(a,b,c,d){if("on"===(a||"").substr(0,2)){var e=this.vars;if(1===arguments.length)return e[a];null==b?delete e[a]:(e[a]=b,e[a+"Params"]=n(c)&&-1!==c.join("").indexOf("{self}")?this._swapSelfInParams(c):c,e[a+"Scope"]=d),"onUpdate"===a&&(this._onUpdate=b)}return this},f.delay=function(a){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay),this._delay=a,this):this._delay},f.duration=function(a){return arguments.length?(this._duration=this._totalDuration=a,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0),this):(this._dirty=!1,this._duration)},f.totalDuration=function(a){return this._dirty=!1,arguments.length?this.duration(a):this._totalDuration},f.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(a>this._duration?this._duration:a,b)):this._time},f.totalTime=function(a,b,c){if(h||g.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>a&&!c&&(a+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var d=this._totalDuration,e=this._timeline;if(a>d&&!c&&(a=d),this._startTime=(this._paused?this._pauseTime:e._time)-(this._reversed?d-a:a)/this._timeScale,e._dirty||this._uncache(!1),e._timeline)for(;e._timeline;)e._timeline._time!==(e._startTime+e._totalTime)/e._timeScale&&e.totalTime(e._totalTime,!0),e=e._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==a||0===this._duration)&&(I.length&&X(),this.render(a,b,!1),I.length&&X())}return this},f.progress=f.totalProgress=function(a,b){var c=this.duration();return arguments.length?this.totalTime(c*a,b):c?this._time/c:this.ratio},f.startTime=function(a){return arguments.length?(a!==this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,a-this._delay)),this):this._startTime},f.endTime=function(a){return this._startTime+(0!=a?this.totalDuration():this.duration())/this._timeScale},f.timeScale=function(a){if(!arguments.length)return this._timeScale;if(a=a||k,this._timeline&&this._timeline.smoothChildTiming){var b=this._pauseTime,c=b||0===b?b:this._timeline.totalTime();this._startTime=c-(c-this._startTime)*this._timeScale/a}return this._timeScale=a,this._uncache(!1)},f.reversed=function(a){return arguments.length?(a!=this._reversed&&(this._reversed=a,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},f.paused=function(a){if(!arguments.length)return this._paused;var b,c,d=this._timeline;return a!=this._paused&&d&&(h||a||g.wake(),b=d.rawTime(),c=b-this._pauseTime,!a&&d.smoothChildTiming&&(this._startTime+=c,this._uncache(!1)),this._pauseTime=a?b:null,this._paused=a,this._active=this.isActive(),!a&&0!==c&&this._initted&&this.duration()&&(b=d.smoothChildTiming?this._totalTime:(b-this._startTime)/this._timeScale,this.render(b,b===this._totalTime,!0))),this._gc&&!a&&this._enabled(!0,!1),this};var E=r("core.SimpleTimeline",function(a){C.call(this,0,a),this.autoRemoveChildren=this.smoothChildTiming=!0});f=E.prototype=new C,f.constructor=E,f.kill()._gc=!1,f._first=f._last=f._recent=null,f._sortChildren=!1,f.add=f.insert=function(a,b,c,d){var e,f;if(a._startTime=Number(b||0)+a._delay,a._paused&&this!==a._timeline&&(a._pauseTime=a._startTime+(this.rawTime()-a._startTime)/a._timeScale),a.timeline&&a.timeline._remove(a,!0),a.timeline=a._timeline=this,a._gc&&a._enabled(!0,!0),e=this._last,this._sortChildren)for(f=a._startTime;e&&e._startTime>f;)e=e._prev;return e?(a._next=e._next,e._next=a):(a._next=this._first,this._first=a),a._next?a._next._prev=a:this._last=a,a._prev=e,this._recent=a,this._timeline&&this._uncache(!0),this},f._remove=function(a,b){return a.timeline===this&&(b||a._enabled(!1,!0),a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),a._next=a._prev=a.timeline=null,a===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},f.render=function(a,b,c){var d,e=this._first;for(this._totalTime=this._time=this._rawPrevTime=a;e;)d=e._next,(e._active||a>=e._startTime&&!e._paused)&&(e._reversed?e.render((e._dirty?e.totalDuration():e._totalDuration)-(a-e._startTime)*e._timeScale,b,c):e.render((a-e._startTime)*e._timeScale,b,c)),e=d},f.rawTime=function(){return h||g.wake(),this._totalTime};var F=r("TweenLite",function(b,c,d){if(C.call(this,c,d),this.render=F.prototype.render,null==b)throw"Cannot tween a null target.";this.target=b="string"!=typeof b?b:F.selector(b)||b;var e,f,g,h=b.jquery||b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType),i=this.vars.overwrite;if(this._overwrite=i=null==i?T[F.defaultOverwrite]:"number"==typeof i?i>>0:T[i],(h||b instanceof Array||b.push&&n(b))&&"number"!=typeof b[0])for(this._targets=g=l(b),this._propLookup=[],this._siblings=[],e=0;e<g.length;e++)f=g[e],f?"string"!=typeof f?f.length&&f!==a&&f[0]&&(f[0]===a||f[0].nodeType&&f[0].style&&!f.nodeType)?(g.splice(e--,1),this._targets=g=g.concat(l(f))):(this._siblings[e]=Y(f,this,!1),1===i&&this._siblings[e].length>1&&$(f,this,null,1,this._siblings[e])):(f=g[e--]=F.selector(f),"string"==typeof f&&g.splice(e+1,1)):g.splice(e--,1);else this._propLookup={},this._siblings=Y(b,this,!1),1===i&&this._siblings.length>1&&$(b,this,null,1,this._siblings);(this.vars.immediateRender||0===c&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-k,this.render(Math.min(0,-this._delay)))},!0),G=function(b){return b&&b.length&&b!==a&&b[0]&&(b[0]===a||b[0].nodeType&&b[0].style&&!b.nodeType)},H=function(a,b){var c,d={};for(c in a)S[c]||c in b&&"transform"!==c&&"x"!==c&&"y"!==c&&"width"!==c&&"height"!==c&&"className"!==c&&"border"!==c||!(!P[c]||P[c]&&P[c]._autoCSS)||(d[c]=a[c],delete a[c]);a.css=d};f=F.prototype=new C,f.constructor=F,f.kill()._gc=!1,f.ratio=0,f._firstPT=f._targets=f._overwrittenProps=f._startAt=null,f._notifyPluginsOfEnabled=f._lazy=!1,F.version="1.18.4",F.defaultEase=f._ease=new u(null,null,1,1),F.defaultOverwrite="auto",F.ticker=g,F.autoSleep=120,F.lagSmoothing=function(a,b){g.lagSmoothing(a,b)},F.selector=a.$||a.jQuery||function(b){var c=a.$||a.jQuery;return c?(F.selector=c,c(b)):"undefined"==typeof document?b:document.querySelectorAll?document.querySelectorAll(b):document.getElementById("#"===b.charAt(0)?b.substr(1):b)};var I=[],J={},K=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,L=function(a){for(var b,c=this._firstPT,d=1e-6;c;)b=c.blob?a?this.join(""):this.start:c.c*a+c.s,c.r?b=Math.round(b):d>b&&b>-d&&(b=0),c.f?c.fp?c.t[c.p](c.fp,b):c.t[c.p](b):c.t[c.p]=b,c=c._next},M=function(a,b,c,d){var e,f,g,h,i,j,k,l=[a,b],m=0,n="",o=0;for(l.start=a,c&&(c(l),a=l[0],b=l[1]),l.length=0,e=a.match(K)||[],f=b.match(K)||[],d&&(d._next=null,d.blob=1,l._firstPT=d),i=f.length,h=0;i>h;h++)k=f[h],j=b.substr(m,b.indexOf(k,m)-m),n+=j||!h?j:",",m+=j.length,o?o=(o+1)%5:"rgba("===j.substr(-5)&&(o=1),k===e[h]||e.length<=h?n+=k:(n&&(l.push(n),n=""),g=parseFloat(e[h]),l.push(g),l._firstPT={_next:l._firstPT,t:l,p:l.length-1,s:g,c:("="===k.charAt(1)?parseInt(k.charAt(0)+"1",10)*parseFloat(k.substr(2)):parseFloat(k)-g)||0,f:0,r:o&&4>o}),m+=k.length;return n+=b.substr(m),n&&l.push(n),l.setRatio=L,l},N=function(a,b,c,d,e,f,g,h){var i,j,k="get"===c?a[b]:c,l=typeof a[b],m="string"==typeof d&&"="===d.charAt(1),n={t:a,p:b,s:k,f:"function"===l,pg:0,n:e||b,r:f,pr:0,c:m?parseInt(d.charAt(0)+"1",10)*parseFloat(d.substr(2)):parseFloat(d)-k||0};return"number"!==l&&("function"===l&&"get"===c&&(j=b.indexOf("set")||"function"!=typeof a["get"+b.substr(3)]?b:"get"+b.substr(3),
n.s=k=g?a[j](g):a[j]()),"string"==typeof k&&(g||isNaN(k))?(n.fp=g,i=M(k,d,h||F.defaultStringFilter,n),n={t:i,p:"setRatio",s:0,c:1,f:2,pg:0,n:e||b,pr:0}):m||(n.s=parseFloat(k),n.c=parseFloat(d)-n.s||0)),n.c?((n._next=this._firstPT)&&(n._next._prev=n),this._firstPT=n,n):void 0},O=F._internals={isArray:n,isSelector:G,lazyTweens:I,blobDif:M},P=F._plugins={},Q=O.tweenLookup={},R=0,S=O.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1},T={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},U=C._rootFramesTimeline=new E,V=C._rootTimeline=new E,W=30,X=O.lazyRender=function(){var a,b=I.length;for(J={};--b>-1;)a=I[b],a&&a._lazy!==!1&&(a.render(a._lazy[0],a._lazy[1],!0),a._lazy=!1);I.length=0};V._startTime=g.time,U._startTime=g.frame,V._active=U._active=!0,setTimeout(X,1),C._updateRoot=F.render=function(){var a,b,c;if(I.length&&X(),V.render((g.time-V._startTime)*V._timeScale,!1,!1),U.render((g.frame-U._startTime)*U._timeScale,!1,!1),I.length&&X(),g.frame>=W){W=g.frame+(parseInt(F.autoSleep,10)||120);for(c in Q){for(b=Q[c].tweens,a=b.length;--a>-1;)b[a]._gc&&b.splice(a,1);0===b.length&&delete Q[c]}if(c=V._first,(!c||c._paused)&&F.autoSleep&&!U._first&&1===g._listeners.tick.length){for(;c&&c._paused;)c=c._next;c||g.sleep()}}},g.addEventListener("tick",C._updateRoot);var Y=function(a,b,c){var d,e,f=a._gsTweenID;if(Q[f||(a._gsTweenID=f="t"+R++)]||(Q[f]={target:a,tweens:[]}),b&&(d=Q[f].tweens,d[e=d.length]=b,c))for(;--e>-1;)d[e]===b&&d.splice(e,1);return Q[f].tweens},Z=function(a,b,c,d){var e,f,g=a.vars.onOverwrite;return g&&(e=g(a,b,c,d)),g=F.onOverwrite,g&&(f=g(a,b,c,d)),e!==!1&&f!==!1},$=function(a,b,c,d,e){var f,g,h,i;if(1===d||d>=4){for(i=e.length,f=0;i>f;f++)if((h=e[f])!==b)h._gc||h._kill(null,a,b)&&(g=!0);else if(5===d)break;return g}var j,l=b._startTime+k,m=[],n=0,o=0===b._duration;for(f=e.length;--f>-1;)(h=e[f])===b||h._gc||h._paused||(h._timeline!==b._timeline?(j=j||_(b,0,o),0===_(h,j,o)&&(m[n++]=h)):h._startTime<=l&&h._startTime+h.totalDuration()/h._timeScale>l&&((o||!h._initted)&&l-h._startTime<=2e-10||(m[n++]=h)));for(f=n;--f>-1;)if(h=m[f],2===d&&h._kill(c,a,b)&&(g=!0),2!==d||!h._firstPT&&h._initted){if(2!==d&&!Z(h,b))continue;h._enabled(!1,!1)&&(g=!0)}return g},_=function(a,b,c){for(var d=a._timeline,e=d._timeScale,f=a._startTime;d._timeline;){if(f+=d._startTime,e*=d._timeScale,d._paused)return-100;d=d._timeline}return f/=e,f>b?f-b:c&&f===b||!a._initted&&2*k>f-b?k:(f+=a.totalDuration()/a._timeScale/e)>b+k?0:f-b-k};f._init=function(){var a,b,c,d,e,f=this.vars,g=this._overwrittenProps,h=this._duration,i=!!f.immediateRender,j=f.ease;if(f.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),e={};for(d in f.startAt)e[d]=f.startAt[d];if(e.overwrite=!1,e.immediateRender=!0,e.lazy=i&&f.lazy!==!1,e.startAt=e.delay=null,this._startAt=F.to(this.target,0,e),i)if(this._time>0)this._startAt=null;else if(0!==h)return}else if(f.runBackwards&&0!==h)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(i=!1),c={};for(d in f)S[d]&&"autoCSS"!==d||(c[d]=f[d]);if(c.overwrite=0,c.data="isFromStart",c.lazy=i&&f.lazy!==!1,c.immediateRender=i,this._startAt=F.to(this.target,0,c),i){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=j=j?j instanceof u?j:"function"==typeof j?new u(j,f.easeParams):v[j]||F.defaultEase:F.defaultEase,f.easeParams instanceof Array&&j.config&&(this._ease=j.config.apply(j,f.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(a=this._targets.length;--a>-1;)this._initProps(this._targets[a],this._propLookup[a]={},this._siblings[a],g?g[a]:null)&&(b=!0);else b=this._initProps(this.target,this._propLookup,this._siblings,g);if(b&&F._onPluginEvent("_onInitAllProps",this),g&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),f.runBackwards)for(c=this._firstPT;c;)c.s+=c.c,c.c=-c.c,c=c._next;this._onUpdate=f.onUpdate,this._initted=!0},f._initProps=function(b,c,d,e){var f,g,h,i,j,k;if(null==b)return!1;J[b._gsTweenID]&&X(),this.vars.css||b.style&&b!==a&&b.nodeType&&P.css&&this.vars.autoCSS!==!1&&H(this.vars,b);for(f in this.vars)if(k=this.vars[f],S[f])k&&(k instanceof Array||k.push&&n(k))&&-1!==k.join("").indexOf("{self}")&&(this.vars[f]=k=this._swapSelfInParams(k,this));else if(P[f]&&(i=new P[f])._onInitTween(b,this.vars[f],this)){for(this._firstPT=j={_next:this._firstPT,t:i,p:"setRatio",s:0,c:1,f:1,n:f,pg:1,pr:i._priority},g=i._overwriteProps.length;--g>-1;)c[i._overwriteProps[g]]=this._firstPT;(i._priority||i._onInitAllProps)&&(h=!0),(i._onDisable||i._onEnable)&&(this._notifyPluginsOfEnabled=!0),j._next&&(j._next._prev=j)}else c[f]=N.call(this,b,f,"get",k,f,0,null,this.vars.stringFilter);return e&&this._kill(e,b)?this._initProps(b,c,d,e):this._overwrite>1&&this._firstPT&&d.length>1&&$(b,this,c,this._overwrite,d)?(this._kill(c,b),this._initProps(b,c,d,e)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(J[b._gsTweenID]=!0),h)},f.render=function(a,b,c){var d,e,f,g,h=this._time,i=this._duration,j=this._rawPrevTime;if(a>=i-1e-7)this._totalTime=this._time=i,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(d=!0,e="onComplete",c=c||this._timeline.autoRemoveChildren),0===i&&(this._initted||!this.vars.lazy||c)&&(this._startTime===this._timeline._duration&&(a=0),(0>j||0>=a&&a>=-1e-7||j===k&&"isPause"!==this.data)&&j!==a&&(c=!0,j>k&&(e="onReverseComplete")),this._rawPrevTime=g=!b||a||j===a?a:k);else if(1e-7>a)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==h||0===i&&j>0)&&(e="onReverseComplete",d=this._reversed),0>a&&(this._active=!1,0===i&&(this._initted||!this.vars.lazy||c)&&(j>=0&&(j!==k||"isPause"!==this.data)&&(c=!0),this._rawPrevTime=g=!b||a||j===a?a:k)),this._initted||(c=!0);else if(this._totalTime=this._time=a,this._easeType){var l=a/i,m=this._easeType,n=this._easePower;(1===m||3===m&&l>=.5)&&(l=1-l),3===m&&(l*=2),1===n?l*=l:2===n?l*=l*l:3===n?l*=l*l*l:4===n&&(l*=l*l*l*l),1===m?this.ratio=1-l:2===m?this.ratio=l:.5>a/i?this.ratio=l/2:this.ratio=1-l/2}else this.ratio=this._ease.getRatio(a/i);if(this._time!==h||c){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!c&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=h,this._rawPrevTime=j,I.push(this),void(this._lazy=[a,b]);this._time&&!d?this.ratio=this._ease.getRatio(this._time/i):d&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==h&&a>=0&&(this._active=!0),0===h&&(this._startAt&&(a>=0?this._startAt.render(a,b,c):e||(e="_dummyGS")),this.vars.onStart&&(0!==this._time||0===i)&&(b||this._callback("onStart"))),f=this._firstPT;f;)f.f?f.t[f.p](f.c*this.ratio+f.s):f.t[f.p]=f.c*this.ratio+f.s,f=f._next;this._onUpdate&&(0>a&&this._startAt&&a!==-1e-4&&this._startAt.render(a,b,c),b||(this._time!==h||d||c)&&this._callback("onUpdate")),e&&(!this._gc||c)&&(0>a&&this._startAt&&!this._onUpdate&&a!==-1e-4&&this._startAt.render(a,b,c),d&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!b&&this.vars[e]&&this._callback(e),0===i&&this._rawPrevTime===k&&g!==k&&(this._rawPrevTime=0))}},f._kill=function(a,b,c){if("all"===a&&(a=null),null==a&&(null==b||b===this.target))return this._lazy=!1,this._enabled(!1,!1);b="string"!=typeof b?b||this._targets||this.target:F.selector(b)||b;var d,e,f,g,h,i,j,k,l,m=c&&this._time&&c._startTime===this._startTime&&this._timeline===c._timeline;if((n(b)||G(b))&&"number"!=typeof b[0])for(d=b.length;--d>-1;)this._kill(a,b[d],c)&&(i=!0);else{if(this._targets){for(d=this._targets.length;--d>-1;)if(b===this._targets[d]){h=this._propLookup[d]||{},this._overwrittenProps=this._overwrittenProps||[],e=this._overwrittenProps[d]=a?this._overwrittenProps[d]||{}:"all";break}}else{if(b!==this.target)return!1;h=this._propLookup,e=this._overwrittenProps=a?this._overwrittenProps||{}:"all"}if(h){if(j=a||h,k=a!==e&&"all"!==e&&a!==h&&("object"!=typeof a||!a._tempKill),c&&(F.onOverwrite||this.vars.onOverwrite)){for(f in j)h[f]&&(l||(l=[]),l.push(f));if((l||!a)&&!Z(this,c,b,l))return!1}for(f in j)(g=h[f])&&(m&&(g.f?g.t[g.p](g.s):g.t[g.p]=g.s,i=!0),g.pg&&g.t._kill(j)&&(i=!0),g.pg&&0!==g.t._overwriteProps.length||(g._prev?g._prev._next=g._next:g===this._firstPT&&(this._firstPT=g._next),g._next&&(g._next._prev=g._prev),g._next=g._prev=null),delete h[f]),k&&(e[f]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return i},f.invalidate=function(){return this._notifyPluginsOfEnabled&&F._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],C.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-k,this.render(Math.min(0,-this._delay))),this},f._enabled=function(a,b){if(h||g.wake(),a&&this._gc){var c,d=this._targets;if(d)for(c=d.length;--c>-1;)this._siblings[c]=Y(d[c],this,!0);else this._siblings=Y(this.target,this,!0)}return C.prototype._enabled.call(this,a,b),this._notifyPluginsOfEnabled&&this._firstPT?F._onPluginEvent(a?"_onEnable":"_onDisable",this):!1},F.to=function(a,b,c){return new F(a,b,c)},F.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender=0!=c.immediateRender,new F(a,b,c)},F.fromTo=function(a,b,c,d){return d.startAt=c,d.immediateRender=0!=d.immediateRender&&0!=c.immediateRender,new F(a,b,d)},F.delayedCall=function(a,b,c,d,e){return new F(b,0,{delay:a,onComplete:b,onCompleteParams:c,callbackScope:d,onReverseComplete:b,onReverseCompleteParams:c,immediateRender:!1,lazy:!1,useFrames:e,overwrite:0})},F.set=function(a,b){return new F(a,0,b)},F.getTweensOf=function(a,b){if(null==a)return[];a="string"!=typeof a?a:F.selector(a)||a;var c,d,e,f;if((n(a)||G(a))&&"number"!=typeof a[0]){for(c=a.length,d=[];--c>-1;)d=d.concat(F.getTweensOf(a[c],b));for(c=d.length;--c>-1;)for(f=d[c],e=c;--e>-1;)f===d[e]&&d.splice(c,1)}else for(d=Y(a).concat(),c=d.length;--c>-1;)(d[c]._gc||b&&!d[c].isActive())&&d.splice(c,1);return d},F.killTweensOf=F.killDelayedCallsTo=function(a,b,c){"object"==typeof b&&(c=b,b=!1);for(var d=F.getTweensOf(a,b),e=d.length;--e>-1;)d[e]._kill(c,a)};var aa=r("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(","),this._propName=this._overwriteProps[0],this._priority=b||0,this._super=aa.prototype},!0);if(f=aa.prototype,aa.version="1.18.0",aa.API=2,f._firstPT=null,f._addTween=N,f.setRatio=L,f._kill=function(a){var b,c=this._overwriteProps,d=this._firstPT;if(null!=a[this._propName])this._overwriteProps=[];else for(b=c.length;--b>-1;)null!=a[c[b]]&&c.splice(b,1);for(;d;)null!=a[d.n]&&(d._next&&(d._next._prev=d._prev),d._prev?(d._prev._next=d._next,d._prev=null):this._firstPT===d&&(this._firstPT=d._next)),d=d._next;return!1},f._roundProps=function(a,b){for(var c=this._firstPT;c;)(a[this._propName]||null!=c.n&&a[c.n.split(this._propName+"_").join("")])&&(c.r=b),c=c._next},F._onPluginEvent=function(a,b){var c,d,e,f,g,h=b._firstPT;if("_onInitAllProps"===a){for(;h;){for(g=h._next,d=e;d&&d.pr>h.pr;)d=d._next;(h._prev=d?d._prev:f)?h._prev._next=h:e=h,(h._next=d)?d._prev=h:f=h,h=g}h=b._firstPT=e}for(;h;)h.pg&&"function"==typeof h.t[a]&&h.t[a]()&&(c=!0),h=h._next;return c},aa.activate=function(a){for(var b=a.length;--b>-1;)a[b].API===aa.API&&(P[(new a[b])._propName]=a[b]);return!0},q.plugin=function(a){if(!(a&&a.propName&&a.init&&a.API))throw"illegal plugin definition.";var b,c=a.propName,d=a.priority||0,e=a.overwriteProps,f={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},g=r("plugins."+c.charAt(0).toUpperCase()+c.substr(1)+"Plugin",function(){aa.call(this,c,d),this._overwriteProps=e||[]},a.global===!0),h=g.prototype=new aa(c);h.constructor=g,g.API=a.API;for(b in f)"function"==typeof a[b]&&(h[f[b]]=a[b]);return g.version=a.version,aa.activate([g]),g},d=a._gsQueue){for(e=0;e<d.length;e++)d[e]();for(f in o)o[f].func||a.console.log("GSAP encountered missing dependency: com.greensock."+f)}h=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenMax");



/**
 * VenoBox 2.0.1
 * Copyright 2013-2021 Nicola Franchini
 * @license: https://github.com/nicolafranchini/VenoBox/blob/master/LICENSE
 */
 !function(e,t){"function"==typeof define&&define.amd?define([],function(){return t()}):"object"==typeof exports?module.exports=t():e.VenoBox=t()}("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,function(e){"use strict";let r,s,l,d,n,o,a,i,c,v,u,b,p,g,f,m,y,x,h,L,w,k,S,C,E,q,M,P,A,T,H,j,O,z,B;const t=document.createElement("div");let I=0,V=0,R=0,D=!1;const N={bounce:["sk-bounce","sk-bounce-dot",2],chase:["sk-chase","sk-chase-dot",6],circle:["sk-circle","sk-circle-dot",12],"circle-fade":["sk-circle-fade","sk-circle-fade-dot",12],flow:["sk-flow","sk-flow-dot",3],fold:["sk-fold","sk-fold-cube",4],grid:["sk-grid","sk-grid-cube",9],plane:["sk-plane","",0],pulse:["sk-pulse","",5],swing:["sk-swing","sk-swing-dot",2],wander:["sk-wander","sk-wander-cube",3],wave:["sk-wave","sk-wave-rec",5]},Q={selector:".venobox",autoplay:!1,bgcolor:"#fff",border:"0",infinigall:!1,maxWidth:"1200px",navigation:!0,navKeyboard:!0,navTouch:!0,navSpeed:300,numeration:!1,overlayClose:!0,overlayColor:"rgba(23,23,23,0.85)",popup:!1,ratio:"16x9",share:!1,shareStyle:"pill",spinner:"bounce",spinColor:"#d2d2d2",titleattr:"title",titlePosition:"top",titleStyle:"bar",toolsBackground:"#1C1C1C",toolsColor:"#d2d2d2",onPreOpen:function(){return!0},onPostOpen:function(){},onPreClose:function(){return!0},onNavComplete:function(){},onContentLoaded:function(){},onInit:function(){},jQuerySelectors:!1};function W(t,o,n){if("[object Object]"===Object.prototype.toString.call(t)){let e;for(e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.call(n,t[e],e,t)}else{let e=0;var s=t.length;for(e=0;e<s;e++)o.call(n,t[e],e,t)}}function X(e){return e}function Y({timing:n,draw:s,duration:i}){let a=performance.now();requestAnimationFrame(function e(t){let o=(t-a)/i;1<o&&(o=1);t=n(o);s(t),o<1&&requestAnimationFrame(e)})}function Z(e){e&&(L=!0,i=e,S=!1,C=!1,q=e.getAttribute("data-maxwidth")||e.settings.maxWidth,M=e.getAttribute("data-overlay")||e.settings.overlayColor,P=e.getAttribute("data-ratio")||e.settings.ratio,A=e.getAttribute("data-autoplay")||e.settings.autoplay,T=e.getAttribute("data-href")||e.getAttribute("href"),j=e.getAttribute(e.settings.titleattr)||"")}function $(){return!(!i||!document.body.classList.contains("vbox-open"))&&((!i.settings.onPreClose||"function"!=typeof i.settings.onPreClose||(i.settings.onPreClose(i,f,z,B),!1!==i.settings.onPreClose))&&(document.body.removeEventListener("keydown",U),document.body.classList.remove("vbox-open"),i.focus(),void Y({duration:200,timing:X,draw:function(e){E.style.opacity=1-e,1===e&&E.remove()}})))}function F(){ae(z)}function K(){ae(B)}function U(e){27===e.keyCode&&$(),37==e.keyCode&&!0===C&&ae(B),39==e.keyCode&&!0===S&&ae(z)}function _(e){a.classList.contains("vbox-"+e)||function(){a.style.opacity=0,a.innerHTML=w;let e=a.querySelector(":first-child");e.classList.add("vbox-child"),e.style.padding=i.settings.border,e.style.backgroundColor=i.settings.bgcolor,e.style.maxWidth=q,e.style.transform="scale(0.9)",e.style.transition="transform 200ms";let t=a.querySelector(".vbox-child img");t&&t.addEventListener("dragstart",function(e){e.preventDefault()}),o.scrollTo(0,0),e.style.transform="scale(1)",Y({duration:200,timing:X,draw:function(e){1===(a.style.opacity=e)&&(p.classList.add("vbox-hidden"),L=!1)}}),i.settings.onContentLoaded&&"function"==typeof i.settings.onContentLoaded&&i.settings.onContentLoaded(w)}()}function G(t,o,n){a.classList.add("vbox-loading");let s;if(-1!==t.search(/.+\.mp4|og[gv]|webm/))s=n?" autoplay":"",w='<div class="venoratio venoratio-'+o+'"><video src="'+t+'"'+s+" controls>Your browser does not support the video tag.</video></div>";else{let e;var i=function(e){e.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);let t;return-1<RegExp.$3.indexOf("youtu")?t="youtube":-1<RegExp.$3.indexOf("vimeo")&&(t="vimeo"),{type:t,id:RegExp.$6}}(t);s=n?"?rel=0&autoplay=1":"?rel=0";t=s+function(e){let o="",t=decodeURIComponent(e),n=t.split("?");if(void 0!==n[1]){let e=n[1].split("&");var s;let t;for(t=0;t<e.length;t++)s=e[t].split("="),o=o+"&"+s[0]+"="+s[1]}return encodeURI(o)}(t);"vimeo"==i.type?e="https://player.vimeo.com/video/":"youtube"==i.type&&(e="https://www.youtube.com/embed/"),w='<div class="venoratio venoratio-'+o+'"><iframe webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay" frameborder="0" src="'+e+i.id+t+'"></iframe></div>'}a.classList.remove("vbox-loading"),_("animated")}function J(){var e;if(m=(e=w,t.innerHTML=e,t.querySelectorAll("img")),m.length){let t=0;W(m,function(e){e=e.src;y=new Image,y.onload=function(){t++,t==m.length&&(a.classList.remove("vbox-loading"),_("animated"))},y.onerror=function(){t++,t==m.length&&(a.classList.remove("vbox-loading"),_("animated"))},y.src=e})}else a.classList.remove("vbox-loading"),_("animated")}function ee(e){var t;L||(t=.84*i.settings.navSpeed,a.style.transition="margin "+t+"ms ease-out, opacity "+t+"ms ease-out",H=b=e.pageY,I=V=e.pageX,D=!0)}function te(e){if(D){D=!1;let e=i,t=!1;R=V-I,R<0&&S&&(e=z,t=!0),0<R&&C&&(e=B,t=!0),50<=Math.abs(R)&&t?ae(e):(a.style.marginLeft=0,a.style.opacity=1)}}function oe(e){var t;D&&!L&&(V=e.pageX,b=e.pageY,v=V-I,u=b-H,t=Math.abs(v),Math.abs(u)<t&&t<=180&&(t=1.5*(1-t/180),e.preventDefault(),a.style.marginLeft=v+"px",a.style.opacity=t))}function ne(o){if(o){O=o.dataset.gall,k=o.settings.numeration,x=o.settings.infinigall,l.innerHTML="";var n=o.dataset.vbtype;o.settings.share&&"iframe"!==n&&"inline"!==n&&"ajax"!==n&&function(o){if(navigator.canShare){const t={url:o};l.insertAdjacentHTML("beforeend",'<button type="button" class="vbox-link-btn vbox-share-mobile"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/><path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/></svg></button>');const n=l.querySelector(".vbox-share-mobile");n.addEventListener("click",function(e){e.preventDefault(),navigator.share(t)})}l.insertAdjacentHTML("beforeend",'<a target="_blank" href="'+o+'" download><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg></a>'),l.insertAdjacentHTML("beforeend",'<div class="vbox-tooltip"><button type="button" class="vbox-link-btn vbox-share-copy"><span class="vbox-tooltip-text" id="myTooltip"></span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg></button></div>');const e=l.querySelector(".vbox-share-copy");e.addEventListener("click",function(e){e.preventDefault();let t=document.getElementById("myTooltip");navigator.clipboard.writeText(o).then(function(){t.innerHTML='<div class="vbox-tooltip-inner">Copied</div>'},function(){console.log("copy failed")})})}(o.href),h=document.querySelectorAll('.vbox-item[data-gall="'+O+'"]'),c=Array.prototype.indexOf.call(h,o),h.length<2&&(x=!1,k=!1),z=h[c+1],B=h[c-1],!z&&x&&(z=h[0]),!B&&x&&(B=h[h.length-1]),1<=h.length?(f=c+1,s.innerHTML=f+" / "+h.length):f=1,k?s.classList.remove("vbox-hidden"):s.classList.add("vbox-hidden"),""!==j?d.classList.remove("vbox-hidden"):d.classList.add("vbox-hidden"),d.innerHTML=j,C=!1,S=!1,(z||x)&&(S=!0),(0<c||x)&&(C=!0),(C||S)&&o.settings.navTouch?(a.classList.add("vbox-grab"),a.addEventListener("touchstart",ee,!1),a.addEventListener("touchend",te,!1),a.addEventListener("touchmove",oe,!1),a.addEventListener("mousedown",ee,!1),a.addEventListener("mouseup",te,!1),a.addEventListener("mouseout",te,!1),a.addEventListener("mousemove",oe,!1)):(a.classList.remove("vbox-grab"),a.removeEventListener("touchstart",ee,!1),a.removeEventListener("touchend",te,!1),a.removeEventListener("touchmove",oe,!1),a.removeEventListener("mousedown",ee,!1),a.removeEventListener("mouseup",te,!1),a.removeEventListener("mouseout",te,!1),a.removeEventListener("mousemove",oe,!1));let e=E.querySelector(".vbox-next"),t=E.querySelector(".vbox-prev");C?t.classList.remove("vbox-hidden"):t.classList.add("vbox-hidden"),S?e.classList.remove("vbox-hidden"):e.classList.add("vbox-hidden"),o.settings.navigation||(e.classList.add("vbox-hidden"),t.classList.add("vbox-hidden"))}}function se(e){r.style.backgroundColor=M,g.innerHTML=function(e){if(!e)return"Loading...";let t='<div class="sk-center '+e[0]+'">',o=0;for(o=0;o<e[2];o++)t+='<div class="'+e[1]+'"></div>';return t+="</div>",t}(N[e.settings.spinner]),E.style.setProperty("--sk-color",e.settings.spinColor),p.classList.remove("vbox-hidden"),l.classList.remove("vbox-top","vbox-bottom"),d.classList.remove("vbox-top","vbox-bottom"),"top"==e.settings.titlePosition?(d.classList.add("vbox-top"),l.classList.add("vbox-bottom")):(d.classList.add("vbox-bottom"),l.classList.add("vbox-top"));var t="bar"===e.settings.titleStyle?"100%":"auto",o="pill"===e.settings.titleStyle?"5em":"0",n="bar"===e.settings.shareStyle?"100%":"auto",s="pill"===e.settings.shareStyle?"5em":"0",i="transparent"===e.settings.titleStyle?"transparent":e.settings.toolsBackground,a="transparent"===e.settings.shareStyle?"transparent":e.settings.toolsBackground;E.style.setProperty("--vbox-title-width",t),E.style.setProperty("--vbox-title-radius",o),E.style.setProperty("--vbox-share-width",n),E.style.setProperty("--vbox-share-radius",s),E.style.setProperty("--vbox-tools-color",e.settings.toolsColor),E.style.setProperty("--vbox-title-background",i),E.style.setProperty("--vbox-share-background",a)}function ie(){var e,t,o;if(i)switch(i.dataset.vbtype){case"iframe":t=T,o=P,a.classList.add("vbox-loading"),w='<div class="venoratio venoratio-'+o+'"><iframe src="'+t+'"></iframe></div>',a.classList.remove("vbox-loading"),_("animated");break;case"inline":t=T,(t=document.querySelector(t))&&(a.classList.add("vbox-loading"),w='<div class="vbox-inline">'+t.innerHTML+"</div>",a.classList.remove("vbox-loading"),_("animated"));break;case"ajax":!function(e){a.classList.add("vbox-loading");let t=new XMLHttpRequest;t.open("GET",e,!0),t.onload=function(){w='<div class="vbox-inline">'+t.response+"</div>",J()},t.onerror=function(){w='<div class="vbox-inline"></div>',a.classList.remove("vbox-loading"),_("animated")},t.send()}(T);break;case"video":G(T,P,A);break;default:e=T,y=new Image,y.onload=function(){w='<div class="vbox-child"><img src="'+e+'"></div>',a.classList.remove("vbox-loading"),_("animated")},y.src=e}}function ae(e){if(e&&!L&&document.body.classList.contains("vbox-open")){Z(e),se(e);var o=.84*i.settings.navSpeed;a.style.transition="margin "+o+"ms ease-out, opacity "+o+"ms ease-out",e===B&&a.classList.add("swipe-right"),e===z&&a.classList.add("swipe-left"),p.classList.remove("vbox-hidden");let t=a.style.opacity;a.classList.add("vbox-animated","vbox-loading"),ne(e),Y({duration:i.settings.navSpeed,timing:X,draw:function(e){a.style.opacity=t-e/t,1===e&&(a.classList.remove("swipe-left","swipe-right","vbox-animated"),a.style.marginLeft=0,a.style.transition="",_("loading"),i.settings.onNavComplete&&"function"==typeof i.settings.onNavComplete&&i.settings.onNavComplete(i,f,z,B))}}),ie()}}function re(e){return!(document.body.classList.contains("vbox-open")||!e)&&(e.settings.onPreOpen&&"function"==typeof e.settings.onPreOpen&&e.settings.onPreOpen(e),!!e.settings.onPreOpen&&(Z(e),document.body.insertAdjacentHTML("beforeend",n),document.body.classList.add("vbox-open"),E=document.querySelector(".vbox-overlay"),r=E.querySelector(".vbox-backdrop"),o=E.querySelector(".vbox-container"),a=o.querySelector(".vbox-content"),s=E.querySelector(".vbox-num"),l=E.querySelector(".vbox-share"),d=E.querySelector(".vbox-title"),p=E.querySelector(".vbox-preloader"),g=p.querySelector(".vbox-preloader-inner"),a.innerHTML="",E.style.opacity=0,se(e),ne(e),a.classList.add("vbox-animated","vbox-loading"),Y({duration:200,timing:X,draw:function(e){1===(E.style.opacity=e)&&(a.classList.remove("vbox-animated"),_("loading"),i.settings.onPostOpen&&"function"==typeof i.settings.onPostOpen&&i.settings.onPostOpen(i,f,z,B))}}),ie(),e.settings.navKeyboard&&document.body.addEventListener("keydown",U),document.querySelector(".vbox-prev").addEventListener("click",function(){ae(B)}),document.querySelector(".vbox-next").addEventListener("click",function(){ae(z)}),void E.addEventListener("click",function(e){let t=document.querySelector(".vbox-close");t&&(t.contains(e.target)||t===e.target||i.settings.overlayClose&&e.target.classList.contains("vbox-overlay")||e.target.classList.contains("vbox-content")||e.target.classList.contains("vbox-backdrop")||e.target.classList.contains("vbox-close")||e.target.classList.contains("vbox-preloader")||e.target.classList.contains("vbox-container"))&&$()})))}return function(e){const t={};e=function(o,n){let s={};return W(o,function(e,t){s[t]=o[t]}),W(n,function(e,t){s[t]=n[t]}),s}(Q,e||{});return t.close=$,t.next=F,t.prev=K,t.open=re,t.settings=e,function(e,o){if(o.onInit&&"function"==typeof o.onInit&&o.onInit(e),e=o.jQuerySelectors||document.querySelectorAll(o.selector),n='<div class="vbox-overlay"><div class="vbox-backdrop"></div><div class="vbox-preloader"><div class="vbox-preloader-inner"></div></div><div class="vbox-container"><div class="vbox-content"></div></div><div class="vbox-title"></div><div class="vbox-left-corner"><div class="vbox-num">0/0</div></div><div class="vbox-close"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="vbox-close-icon" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg></div><a class="vbox-next"><span>Next</span></a><a class="vbox-prev"><span>Prev</span></a><div class="vbox-share"></div></div>',W(e,function(t){return!!t.classList.contains("vbox-item")||(t.settings=o,t.classList.add("vbox-item"),void t.addEventListener("click",function(e){return e.preventDefault(),t.blur(),re(t),!1}))}),o.popup){let e=document.querySelector(o.popup);e.settings=o,re(e)}}(t,e),t}}),"function"==typeof jQuery&&function(){"use strict";jQuery.fn.extend({venobox:function(e){const t=e||{};t.jQuerySelectors=this,new VenoBox({pluginoptions:t})}})}();
 
//  slick
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

/**
 * Swiper 8.0.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 14, 2022
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Swiper=t()}(this,(function(){"use strict";function e(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function t(s,a){void 0===s&&(s={}),void 0===a&&(a={}),Object.keys(a).forEach((i=>{void 0===s[i]?s[i]=a[i]:e(a[i])&&e(s[i])&&Object.keys(a[i]).length>0&&t(s[i],a[i])}))}const s={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function a(){const e="undefined"!=typeof document?document:{};return t(e,s),e}const i={document:s,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function r(){const e="undefined"!=typeof window?window:{};return t(e,i),e}class n extends Array{constructor(e){"number"==typeof e?super(e):(super(...e||[]),function(e){const t=e.__proto__;Object.defineProperty(e,"__proto__",{get:()=>t,set(e){t.__proto__=e}})}(this))}}function l(e){void 0===e&&(e=[]);const t=[];return e.forEach((e=>{Array.isArray(e)?t.push(...l(e)):t.push(e)})),t}function o(e,t){return Array.prototype.filter.call(e,t)}function d(e,t){const s=r(),i=a();let l=[];if(!t&&e instanceof n)return e;if(!e)return new n(l);if("string"==typeof e){const s=e.trim();if(s.indexOf("<")>=0&&s.indexOf(">")>=0){let e="div";0===s.indexOf("<li")&&(e="ul"),0===s.indexOf("<tr")&&(e="tbody"),0!==s.indexOf("<td")&&0!==s.indexOf("<th")||(e="tr"),0===s.indexOf("<tbody")&&(e="table"),0===s.indexOf("<option")&&(e="select");const t=i.createElement(e);t.innerHTML=s;for(let e=0;e<t.childNodes.length;e+=1)l.push(t.childNodes[e])}else l=function(e,t){if("string"!=typeof e)return[e];const s=[],a=t.querySelectorAll(e);for(let e=0;e<a.length;e+=1)s.push(a[e]);return s}(e.trim(),t||i)}else if(e.nodeType||e===s||e===i)l.push(e);else if(Array.isArray(e)){if(e instanceof n)return e;l=e}return new n(function(e){const t=[];for(let s=0;s<e.length;s+=1)-1===t.indexOf(e[s])&&t.push(e[s]);return t}(l))}d.fn=n.prototype;const c={addClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.add(...a)})),this},removeClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.remove(...a)})),this},hasClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));return o(this,(e=>a.filter((t=>e.classList.contains(t))).length>0)).length>0},toggleClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));this.forEach((e=>{a.forEach((t=>{e.classList.toggle(t)}))}))},attr:function(e,t){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(let s=0;s<this.length;s+=1)if(2===arguments.length)this[s].setAttribute(e,t);else for(const t in e)this[s][t]=e[t],this[s].setAttribute(t,e[t]);return this},removeAttr:function(e){for(let t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this},transform:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transform=e;return this},transition:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transitionDuration="string"!=typeof e?`${e}ms`:e;return this},on:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];let[a,i,r,n]=t;function l(e){const t=e.target;if(!t)return;const s=e.target.dom7EventData||[];if(s.indexOf(e)<0&&s.unshift(e),d(t).is(i))r.apply(t,s);else{const e=d(t).parents();for(let t=0;t<e.length;t+=1)d(e[t]).is(i)&&r.apply(e[t],s)}}function o(e){const t=e&&e.target&&e.target.dom7EventData||[];t.indexOf(e)<0&&t.unshift(e),r.apply(this,t)}"function"==typeof t[1]&&([a,r,n]=t,i=void 0),n||(n=!1);const c=a.split(" ");let p;for(let e=0;e<this.length;e+=1){const t=this[e];if(i)for(p=0;p<c.length;p+=1){const e=c[p];t.dom7LiveListeners||(t.dom7LiveListeners={}),t.dom7LiveListeners[e]||(t.dom7LiveListeners[e]=[]),t.dom7LiveListeners[e].push({listener:r,proxyListener:l}),t.addEventListener(e,l,n)}else for(p=0;p<c.length;p+=1){const e=c[p];t.dom7Listeners||(t.dom7Listeners={}),t.dom7Listeners[e]||(t.dom7Listeners[e]=[]),t.dom7Listeners[e].push({listener:r,proxyListener:o}),t.addEventListener(e,o,n)}}return this},off:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];let[a,i,r,n]=t;"function"==typeof t[1]&&([a,r,n]=t,i=void 0),n||(n=!1);const l=a.split(" ");for(let e=0;e<l.length;e+=1){const t=l[e];for(let e=0;e<this.length;e+=1){const s=this[e];let a;if(!i&&s.dom7Listeners?a=s.dom7Listeners[t]:i&&s.dom7LiveListeners&&(a=s.dom7LiveListeners[t]),a&&a.length)for(let e=a.length-1;e>=0;e-=1){const i=a[e];r&&i.listener===r||r&&i.listener&&i.listener.dom7proxy&&i.listener.dom7proxy===r?(s.removeEventListener(t,i.proxyListener,n),a.splice(e,1)):r||(s.removeEventListener(t,i.proxyListener,n),a.splice(e,1))}}}return this},trigger:function(){const e=r();for(var t=arguments.length,s=new Array(t),a=0;a<t;a++)s[a]=arguments[a];const i=s[0].split(" "),n=s[1];for(let t=0;t<i.length;t+=1){const a=i[t];for(let t=0;t<this.length;t+=1){const i=this[t];if(e.CustomEvent){const t=new e.CustomEvent(a,{detail:n,bubbles:!0,cancelable:!0});i.dom7EventData=s.filter(((e,t)=>t>0)),i.dispatchEvent(t),i.dom7EventData=[],delete i.dom7EventData}}}return this},transitionEnd:function(e){const t=this;return e&&t.on("transitionend",(function s(a){a.target===this&&(e.call(this,a),t.off("transitionend",s))})),this},outerWidth:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetWidth+parseFloat(e.getPropertyValue("margin-right"))+parseFloat(e.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null},outerHeight:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetHeight+parseFloat(e.getPropertyValue("margin-top"))+parseFloat(e.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null},styles:function(){const e=r();return this[0]?e.getComputedStyle(this[0],null):{}},offset:function(){if(this.length>0){const e=r(),t=a(),s=this[0],i=s.getBoundingClientRect(),n=t.body,l=s.clientTop||n.clientTop||0,o=s.clientLeft||n.clientLeft||0,d=s===e?e.scrollY:s.scrollTop,c=s===e?e.scrollX:s.scrollLeft;return{top:i.top+d-l,left:i.left+c-o}}return null},css:function(e,t){const s=r();let a;if(1===arguments.length){if("string"!=typeof e){for(a=0;a<this.length;a+=1)for(const t in e)this[a].style[t]=e[t];return this}if(this[0])return s.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(a=0;a<this.length;a+=1)this[a].style[e]=t;return this}return this},each:function(e){return e?(this.forEach(((t,s)=>{e.apply(t,[t,s])})),this):this},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:null;for(let t=0;t<this.length;t+=1)this[t].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(let t=0;t<this.length;t+=1)this[t].textContent=e;return this},is:function(e){const t=r(),s=a(),i=this[0];let l,o;if(!i||void 0===e)return!1;if("string"==typeof e){if(i.matches)return i.matches(e);if(i.webkitMatchesSelector)return i.webkitMatchesSelector(e);if(i.msMatchesSelector)return i.msMatchesSelector(e);for(l=d(e),o=0;o<l.length;o+=1)if(l[o]===i)return!0;return!1}if(e===s)return i===s;if(e===t)return i===t;if(e.nodeType||e instanceof n){for(l=e.nodeType?[e]:e,o=0;o<l.length;o+=1)if(l[o]===i)return!0;return!1}return!1},index:function(){let e,t=this[0];if(t){for(e=0;null!==(t=t.previousSibling);)1===t.nodeType&&(e+=1);return e}},eq:function(e){if(void 0===e)return this;const t=this.length;if(e>t-1)return d([]);if(e<0){const s=t+e;return d(s<0?[]:[this[s]])}return d([this[e]])},append:function(){let e;const t=a();for(let s=0;s<arguments.length;s+=1){e=s<0||arguments.length<=s?void 0:arguments[s];for(let s=0;s<this.length;s+=1)if("string"==typeof e){const a=t.createElement("div");for(a.innerHTML=e;a.firstChild;)this[s].appendChild(a.firstChild)}else if(e instanceof n)for(let t=0;t<e.length;t+=1)this[s].appendChild(e[t]);else this[s].appendChild(e)}return this},prepend:function(e){const t=a();let s,i;for(s=0;s<this.length;s+=1)if("string"==typeof e){const a=t.createElement("div");for(a.innerHTML=e,i=a.childNodes.length-1;i>=0;i-=1)this[s].insertBefore(a.childNodes[i],this[s].childNodes[0])}else if(e instanceof n)for(i=0;i<e.length;i+=1)this[s].insertBefore(e[i],this[s].childNodes[0]);else this[s].insertBefore(e,this[s].childNodes[0]);return this},next:function(e){return this.length>0?e?this[0].nextElementSibling&&d(this[0].nextElementSibling).is(e)?d([this[0].nextElementSibling]):d([]):this[0].nextElementSibling?d([this[0].nextElementSibling]):d([]):d([])},nextAll:function(e){const t=[];let s=this[0];if(!s)return d([]);for(;s.nextElementSibling;){const a=s.nextElementSibling;e?d(a).is(e)&&t.push(a):t.push(a),s=a}return d(t)},prev:function(e){if(this.length>0){const t=this[0];return e?t.previousElementSibling&&d(t.previousElementSibling).is(e)?d([t.previousElementSibling]):d([]):t.previousElementSibling?d([t.previousElementSibling]):d([])}return d([])},prevAll:function(e){const t=[];let s=this[0];if(!s)return d([]);for(;s.previousElementSibling;){const a=s.previousElementSibling;e?d(a).is(e)&&t.push(a):t.push(a),s=a}return d(t)},parent:function(e){const t=[];for(let s=0;s<this.length;s+=1)null!==this[s].parentNode&&(e?d(this[s].parentNode).is(e)&&t.push(this[s].parentNode):t.push(this[s].parentNode));return d(t)},parents:function(e){const t=[];for(let s=0;s<this.length;s+=1){let a=this[s].parentNode;for(;a;)e?d(a).is(e)&&t.push(a):t.push(a),a=a.parentNode}return d(t)},closest:function(e){let t=this;return void 0===e?d([]):(t.is(e)||(t=t.parents(e).eq(0)),t)},find:function(e){const t=[];for(let s=0;s<this.length;s+=1){const a=this[s].querySelectorAll(e);for(let e=0;e<a.length;e+=1)t.push(a[e])}return d(t)},children:function(e){const t=[];for(let s=0;s<this.length;s+=1){const a=this[s].children;for(let s=0;s<a.length;s+=1)e&&!d(a[s]).is(e)||t.push(a[s])}return d(t)},filter:function(e){return d(o(this,e))},remove:function(){for(let e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this}};function p(e,t){return void 0===t&&(t=0),setTimeout(e,t)}function u(){return Date.now()}function h(e,t){void 0===t&&(t="x");const s=r();let a,i,n;const l=function(e){const t=r();let s;return t.getComputedStyle&&(s=t.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}(e);return s.WebKitCSSMatrix?(i=l.transform||l.webkitTransform,i.split(",").length>6&&(i=i.split(", ").map((e=>e.replace(",","."))).join(", ")),n=new s.WebKitCSSMatrix("none"===i?"":i)):(n=l.MozTransform||l.OTransform||l.MsTransform||l.msTransform||l.transform||l.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=n.toString().split(",")),"x"===t&&(i=s.WebKitCSSMatrix?n.m41:16===a.length?parseFloat(a[12]):parseFloat(a[4])),"y"===t&&(i=s.WebKitCSSMatrix?n.m42:16===a.length?parseFloat(a[13]):parseFloat(a[5])),i||0}function m(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function f(e){return"undefined"!=typeof window&&void 0!==window.HTMLElement?e instanceof HTMLElement:e&&(1===e.nodeType||11===e.nodeType)}function g(){const e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"];for(let s=1;s<arguments.length;s+=1){const a=s<0||arguments.length<=s?void 0:arguments[s];if(null!=a&&!f(a)){const s=Object.keys(Object(a)).filter((e=>t.indexOf(e)<0));for(let t=0,i=s.length;t<i;t+=1){const i=s[t],r=Object.getOwnPropertyDescriptor(a,i);void 0!==r&&r.enumerable&&(m(e[i])&&m(a[i])?a[i].__swiper__?e[i]=a[i]:g(e[i],a[i]):!m(e[i])&&m(a[i])?(e[i]={},a[i].__swiper__?e[i]=a[i]:g(e[i],a[i])):e[i]=a[i])}}}return e}function v(e,t,s){e.style.setProperty(t,s)}function w(e){let{swiper:t,targetPosition:s,side:a}=e;const i=r(),n=-t.translate;let l,o=null;const d=t.params.speed;t.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(t.cssModeFrameID);const c=s>n?"next":"prev",p=(e,t)=>"next"===c&&e>=t||"prev"===c&&e<=t,u=()=>{l=(new Date).getTime(),null===o&&(o=l);const e=Math.max(Math.min((l-o)/d,1),0),r=.5-Math.cos(e*Math.PI)/2;let c=n+r*(s-n);if(p(c,s)&&(c=s),t.wrapperEl.scrollTo({[a]:c}),p(c,s))return t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.scrollSnapType="",setTimeout((()=>{t.wrapperEl.style.overflow="",t.wrapperEl.scrollTo({[a]:c})})),void i.cancelAnimationFrame(t.cssModeFrameID);t.cssModeFrameID=i.requestAnimationFrame(u)};u()}let b,x,y;function E(){return b||(b=function(){const e=r(),t=a();return{smoothScroll:t.documentElement&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch),passiveListener:function(){let t=!1;try{const s=Object.defineProperty({},"passive",{get(){t=!0}});e.addEventListener("testPassiveListener",null,s)}catch(e){}return t}(),gestures:"ongesturestart"in e}}()),b}function T(e){return void 0===e&&(e={}),x||(x=function(e){let{userAgent:t}=void 0===e?{}:e;const s=E(),a=r(),i=a.navigator.platform,n=t||a.navigator.userAgent,l={ios:!1,android:!1},o=a.screen.width,d=a.screen.height,c=n.match(/(Android);?[\s\/]+([\d.]+)?/);let p=n.match(/(iPad).*OS\s([\d_]+)/);const u=n.match(/(iPod)(.*OS\s([\d_]+))?/),h=!p&&n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),m="Win32"===i;let f="MacIntel"===i;return!p&&f&&s.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${o}x${d}`)>=0&&(p=n.match(/(Version)\/([\d.]+)/),p||(p=[0,1,"13_0_0"]),f=!1),c&&!m&&(l.os="android",l.android=!0),(p||h||u)&&(l.os="ios",l.ios=!0),l}(e)),x}function C(){return y||(y=function(){const e=r();return{isSafari:function(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}(),isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}()),y}Object.keys(c).forEach((e=>{Object.defineProperty(d.fn,e,{value:c[e],writable:!0})}));var $={on(e,t,s){const a=this;if("function"!=typeof t)return a;const i=s?"unshift":"push";return e.split(" ").forEach((e=>{a.eventsListeners[e]||(a.eventsListeners[e]=[]),a.eventsListeners[e][i](t)})),a},once(e,t,s){const a=this;if("function"!=typeof t)return a;function i(){a.off(e,i),i.__emitterProxy&&delete i.__emitterProxy;for(var s=arguments.length,r=new Array(s),n=0;n<s;n++)r[n]=arguments[n];t.apply(a,r)}return i.__emitterProxy=t,a.on(e,i,s)},onAny(e,t){const s=this;if("function"!=typeof e)return s;const a=t?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[a](e),s},offAny(e){const t=this;if(!t.eventsAnyListeners)return t;const s=t.eventsAnyListeners.indexOf(e);return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this;return s.eventsListeners?(e.split(" ").forEach((e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach(((a,i)=>{(a===t||a.__emitterProxy&&a.__emitterProxy===t)&&s.eventsListeners[e].splice(i,1)}))})),s):s},emit(){const e=this;if(!e.eventsListeners)return e;let t,s,a;for(var i=arguments.length,r=new Array(i),n=0;n<i;n++)r[n]=arguments[n];"string"==typeof r[0]||Array.isArray(r[0])?(t=r[0],s=r.slice(1,r.length),a=e):(t=r[0].events,s=r[0].data,a=r[0].context||e),s.unshift(a);return(Array.isArray(t)?t:t.split(" ")).forEach((t=>{e.eventsAnyListeners&&e.eventsAnyListeners.length&&e.eventsAnyListeners.forEach((e=>{e.apply(a,[t,...s])})),e.eventsListeners&&e.eventsListeners[t]&&e.eventsListeners[t].forEach((e=>{e.apply(a,s)}))})),e}};var S={updateSize:function(){const e=this;let t,s;const a=e.$el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:a[0].clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:a[0].clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(a.css("padding-left")||0,10)-parseInt(a.css("padding-right")||0,10),s=s-parseInt(a.css("padding-top")||0,10)-parseInt(a.css("padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}))},updateSlides:function(){const e=this;function t(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function s(e,s){return parseFloat(e.getPropertyValue(t(s))||0)}const a=e.params,{$wrapperEl:i,size:r,rtlTranslate:n,wrongRTL:l}=e,o=e.virtual&&a.virtual.enabled,d=o?e.virtual.slides.length:e.slides.length,c=i.children(`.${e.params.slideClass}`),p=o?e.virtual.slides.length:c.length;let u=[];const h=[],m=[];let f=a.slidesOffsetBefore;"function"==typeof f&&(f=a.slidesOffsetBefore.call(e));let g=a.slidesOffsetAfter;"function"==typeof g&&(g=a.slidesOffsetAfter.call(e));const w=e.snapGrid.length,b=e.slidesGrid.length;let x=a.spaceBetween,y=-f,E=0,T=0;if(void 0===r)return;"string"==typeof x&&x.indexOf("%")>=0&&(x=parseFloat(x.replace("%",""))/100*r),e.virtualSize=-x,n?c.css({marginLeft:"",marginBottom:"",marginTop:""}):c.css({marginRight:"",marginBottom:"",marginTop:""}),a.centeredSlides&&a.cssMode&&(v(e.wrapperEl,"--swiper-centered-offset-before",""),v(e.wrapperEl,"--swiper-centered-offset-after",""));const C=a.grid&&a.grid.rows>1&&e.grid;let $;C&&e.grid.initSlides(p);const S="auto"===a.slidesPerView&&a.breakpoints&&Object.keys(a.breakpoints).filter((e=>void 0!==a.breakpoints[e].slidesPerView)).length>0;for(let i=0;i<p;i+=1){$=0;const n=c.eq(i);if(C&&e.grid.updateSlide(i,n,p,t),"none"!==n.css("display")){if("auto"===a.slidesPerView){S&&(c[i].style[t("width")]="");const r=getComputedStyle(n[0]),l=n[0].style.transform,o=n[0].style.webkitTransform;if(l&&(n[0].style.transform="none"),o&&(n[0].style.webkitTransform="none"),a.roundLengths)$=e.isHorizontal()?n.outerWidth(!0):n.outerHeight(!0);else{const e=s(r,"width"),t=s(r,"padding-left"),a=s(r,"padding-right"),i=s(r,"margin-left"),l=s(r,"margin-right"),o=r.getPropertyValue("box-sizing");if(o&&"border-box"===o)$=e+i+l;else{const{clientWidth:s,offsetWidth:r}=n[0];$=e+t+a+i+l+(r-s)}}l&&(n[0].style.transform=l),o&&(n[0].style.webkitTransform=o),a.roundLengths&&($=Math.floor($))}else $=(r-(a.slidesPerView-1)*x)/a.slidesPerView,a.roundLengths&&($=Math.floor($)),c[i]&&(c[i].style[t("width")]=`${$}px`);c[i]&&(c[i].swiperSlideSize=$),m.push($),a.centeredSlides?(y=y+$/2+E/2+x,0===E&&0!==i&&(y=y-r/2-x),0===i&&(y=y-r/2-x),Math.abs(y)<.001&&(y=0),a.roundLengths&&(y=Math.floor(y)),T%a.slidesPerGroup==0&&u.push(y),h.push(y)):(a.roundLengths&&(y=Math.floor(y)),(T-Math.min(e.params.slidesPerGroupSkip,T))%e.params.slidesPerGroup==0&&u.push(y),h.push(y),y=y+$+x),e.virtualSize+=$+x,E=$,T+=1}}if(e.virtualSize=Math.max(e.virtualSize,r)+g,n&&l&&("slide"===a.effect||"coverflow"===a.effect)&&i.css({width:`${e.virtualSize+a.spaceBetween}px`}),a.setWrapperSize&&i.css({[t("width")]:`${e.virtualSize+a.spaceBetween}px`}),C&&e.grid.updateWrapperSize($,u,t),!a.centeredSlides){const t=[];for(let s=0;s<u.length;s+=1){let i=u[s];a.roundLengths&&(i=Math.floor(i)),u[s]<=e.virtualSize-r&&t.push(i)}u=t,Math.floor(e.virtualSize-r)-Math.floor(u[u.length-1])>1&&u.push(e.virtualSize-r)}if(0===u.length&&(u=[0]),0!==a.spaceBetween){const s=e.isHorizontal()&&n?"marginLeft":t("marginRight");c.filter(((e,t)=>!a.cssMode||t!==c.length-1)).css({[s]:`${x}px`})}if(a.centeredSlides&&a.centeredSlidesBounds){let e=0;m.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween;const t=e-r;u=u.map((e=>e<0?-f:e>t?t+g:e))}if(a.centerInsufficientSlides){let e=0;if(m.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween,e<r){const t=(r-e)/2;u.forEach(((e,s)=>{u[s]=e-t})),h.forEach(((e,s)=>{h[s]=e+t}))}}if(Object.assign(e,{slides:c,snapGrid:u,slidesGrid:h,slidesSizesGrid:m}),a.centeredSlides&&a.cssMode&&!a.centeredSlidesBounds){v(e.wrapperEl,"--swiper-centered-offset-before",-u[0]+"px"),v(e.wrapperEl,"--swiper-centered-offset-after",e.size/2-m[m.length-1]/2+"px");const t=-e.snapGrid[0],s=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+s))}if(p!==d&&e.emit("slidesLengthChange"),u.length!==w&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),h.length!==b&&e.emit("slidesGridLengthChange"),a.watchSlidesProgress&&e.updateSlidesOffset(),!(o||a.cssMode||"slide"!==a.effect&&"fade"!==a.effect)){const t=`${a.containerModifierClass}backface-hidden`,s=e.$el.hasClass(t);p<=a.maxBackfaceHiddenSlides?s||e.$el.addClass(t):s&&e.$el.removeClass(t)}},updateAutoHeight:function(e){const t=this,s=[],a=t.virtual&&t.params.virtual.enabled;let i,r=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const n=e=>a?t.slides.filter((t=>parseInt(t.getAttribute("data-swiper-slide-index"),10)===e))[0]:t.slides.eq(e)[0];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)t.visibleSlides.each((e=>{s.push(e)}));else for(i=0;i<Math.ceil(t.params.slidesPerView);i+=1){const e=t.activeIndex+i;if(e>t.slides.length&&!a)break;s.push(n(e))}else s.push(n(t.activeIndex));for(i=0;i<s.length;i+=1)if(void 0!==s[i]){const e=s[i].offsetHeight;r=e>r?e:r}(r||0===r)&&t.$wrapperEl.css("height",`${r}px`)},updateSlidesOffset:function(){const e=this,t=e.slides;for(let s=0;s<t.length;s+=1)t[s].swiperSlideOffset=e.isHorizontal()?t[s].offsetLeft:t[s].offsetTop},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);const t=this,s=t.params,{slides:a,rtlTranslate:i,snapGrid:r}=t;if(0===a.length)return;void 0===a[0].swiperSlideOffset&&t.updateSlidesOffset();let n=-e;i&&(n=e),a.removeClass(s.slideVisibleClass),t.visibleSlidesIndexes=[],t.visibleSlides=[];for(let e=0;e<a.length;e+=1){const l=a[e];let o=l.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(o-=a[0].swiperSlideOffset);const d=(n+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),c=(n-r[0]+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),p=-(n-o),u=p+t.slidesSizesGrid[e];(p>=0&&p<t.size-1||u>1&&u<=t.size||p<=0&&u>=t.size)&&(t.visibleSlides.push(l),t.visibleSlidesIndexes.push(e),a.eq(e).addClass(s.slideVisibleClass)),l.progress=i?-d:d,l.originalProgress=i?-c:c}t.visibleSlides=d(t.visibleSlides)},updateProgress:function(e){const t=this;if(void 0===e){const s=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*s||0}const s=t.params,a=t.maxTranslate()-t.minTranslate();let{progress:i,isBeginning:r,isEnd:n}=t;const l=r,o=n;0===a?(i=0,r=!0,n=!0):(i=(e-t.minTranslate())/a,r=i<=0,n=i>=1),Object.assign(t,{progress:i,isBeginning:r,isEnd:n}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),r&&!l&&t.emit("reachBeginning toEdge"),n&&!o&&t.emit("reachEnd toEdge"),(l&&!r||o&&!n)&&t.emit("fromEdge"),t.emit("progress",i)},updateSlidesClasses:function(){const e=this,{slides:t,params:s,$wrapperEl:a,activeIndex:i,realIndex:r}=e,n=e.virtual&&s.virtual.enabled;let l;t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`),l=n?e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`):t.eq(i),l.addClass(s.slideActiveClass),s.loop&&(l.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));let o=l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);s.loop&&0===o.length&&(o=t.eq(0),o.addClass(s.slideNextClass));let d=l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);s.loop&&0===d.length&&(d=t.eq(-1),d.addClass(s.slidePrevClass)),s.loop&&(o.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass),d.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)),e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{slidesGrid:a,snapGrid:i,params:r,activeIndex:n,realIndex:l,snapIndex:o}=t;let d,c=e;if(void 0===c){for(let e=0;e<a.length;e+=1)void 0!==a[e+1]?s>=a[e]&&s<a[e+1]-(a[e+1]-a[e])/2?c=e:s>=a[e]&&s<a[e+1]&&(c=e+1):s>=a[e]&&(c=e);r.normalizeSlideIndex&&(c<0||void 0===c)&&(c=0)}if(i.indexOf(s)>=0)d=i.indexOf(s);else{const e=Math.min(r.slidesPerGroupSkip,c);d=e+Math.floor((c-e)/r.slidesPerGroup)}if(d>=i.length&&(d=i.length-1),c===n)return void(d!==o&&(t.snapIndex=d,t.emit("snapIndexChange")));const p=parseInt(t.slides.eq(c).attr("data-swiper-slide-index")||c,10);Object.assign(t,{snapIndex:d,realIndex:p,previousIndex:n,activeIndex:c}),t.emit("activeIndexChange"),t.emit("snapIndexChange"),l!==p&&t.emit("realIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&t.emit("slideChange")},updateClickedSlide:function(e){const t=this,s=t.params,a=d(e).closest(`.${s.slideClass}`)[0];let i,r=!1;if(a)for(let e=0;e<t.slides.length;e+=1)if(t.slides[e]===a){r=!0,i=e;break}if(!a||!r)return t.clickedSlide=void 0,void(t.clickedIndex=void 0);t.clickedSlide=a,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(d(a).attr("data-swiper-slide-index"),10):t.clickedIndex=i,s.slideToClickedSlide&&void 0!==t.clickedIndex&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}};var M={getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");const{params:t,rtlTranslate:s,translate:a,$wrapperEl:i}=this;if(t.virtualTranslate)return s?-a:a;if(t.cssMode)return a;let r=h(i[0],e);return s&&(r=-r),r||0},setTranslate:function(e,t){const s=this,{rtlTranslate:a,params:i,$wrapperEl:r,wrapperEl:n,progress:l}=s;let o,d=0,c=0;s.isHorizontal()?d=a?-e:e:c=e,i.roundLengths&&(d=Math.floor(d),c=Math.floor(c)),i.cssMode?n[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-d:-c:i.virtualTranslate||r.transform(`translate3d(${d}px, ${c}px, 0px)`),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?d:c;const p=s.maxTranslate()-s.minTranslate();o=0===p?0:(e-s.minTranslate())/p,o!==l&&s.updateProgress(e),s.emit("setTranslate",s.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),void 0===a&&(a=!0);const r=this,{params:n,wrapperEl:l}=r;if(r.animating&&n.preventInteractionOnTransition)return!1;const o=r.minTranslate(),d=r.maxTranslate();let c;if(c=a&&e>o?o:a&&e<d?d:e,r.updateProgress(c),n.cssMode){const e=r.isHorizontal();if(0===t)l[e?"scrollLeft":"scrollTop"]=-c;else{if(!r.support.smoothScroll)return w({swiper:r,targetPosition:-c,side:e?"left":"top"}),!0;l.scrollTo({[e?"left":"top"]:-c,behavior:"smooth"})}return!0}return 0===t?(r.setTransition(0),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionEnd"))):(r.setTransition(t),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionStart")),r.animating||(r.animating=!0,r.onTranslateToWrapperTransitionEnd||(r.onTranslateToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onTranslateToWrapperTransitionEnd),r.onTranslateToWrapperTransitionEnd=null,delete r.onTranslateToWrapperTransitionEnd,s&&r.emit("transitionEnd"))}),r.$wrapperEl[0].addEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onTranslateToWrapperTransitionEnd))),!0}};function P(e){let{swiper:t,runCallbacks:s,direction:a,step:i}=e;const{activeIndex:r,previousIndex:n}=t;let l=a;if(l||(l=r>n?"next":r<n?"prev":"reset"),t.emit(`transition${i}`),s&&r!==n){if("reset"===l)return void t.emit(`slideResetTransition${i}`);t.emit(`slideChangeTransition${i}`),"next"===l?t.emit(`slideNextTransition${i}`):t.emit(`slidePrevTransition${i}`)}}var k={slideTo:function(e,t,s,a,i){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"number"!=typeof e&&"string"!=typeof e)throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);if("string"==typeof e){const t=parseInt(e,10);if(!isFinite(t))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=t}const r=this;let n=e;n<0&&(n=0);const{params:l,snapGrid:o,slidesGrid:d,previousIndex:c,activeIndex:p,rtlTranslate:u,wrapperEl:h,enabled:m}=r;if(r.animating&&l.preventInteractionOnTransition||!m&&!a&&!i)return!1;const f=Math.min(r.params.slidesPerGroupSkip,n);let g=f+Math.floor((n-f)/r.params.slidesPerGroup);g>=o.length&&(g=o.length-1),(p||l.initialSlide||0)===(c||0)&&s&&r.emit("beforeSlideChangeStart");const v=-o[g];if(r.updateProgress(v),l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*v),s=Math.floor(100*d[e]),a=Math.floor(100*d[e+1]);void 0!==d[e+1]?t>=s&&t<a-(a-s)/2?n=e:t>=s&&t<a&&(n=e+1):t>=s&&(n=e)}if(r.initialized&&n!==p){if(!r.allowSlideNext&&v<r.translate&&v<r.minTranslate())return!1;if(!r.allowSlidePrev&&v>r.translate&&v>r.maxTranslate()&&(p||0)!==n)return!1}let b;if(b=n>p?"next":n<p?"prev":"reset",u&&-v===r.translate||!u&&v===r.translate)return r.updateActiveIndex(n),l.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==l.effect&&r.setTranslate(v),"reset"!==b&&(r.transitionStart(s,b),r.transitionEnd(s,b)),!1;if(l.cssMode){const e=r.isHorizontal(),s=u?v:-v;if(0===t){const t=r.virtual&&r.params.virtual.enabled;t&&(r.wrapperEl.style.scrollSnapType="none",r._immediateVirtual=!0),h[e?"scrollLeft":"scrollTop"]=s,t&&requestAnimationFrame((()=>{r.wrapperEl.style.scrollSnapType="",r._swiperImmediateVirtual=!1}))}else{if(!r.support.smoothScroll)return w({swiper:r,targetPosition:s,side:e?"left":"top"}),!0;h.scrollTo({[e?"left":"top"]:s,behavior:"smooth"})}return!0}return r.setTransition(t),r.setTranslate(v),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,a),r.transitionStart(s,b),0===t?r.transitionEnd(s,b):r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(s,b))}),r.$wrapperEl[0].addEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e,t,s,a){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0);const i=this;let r=e;return i.params.loop&&(r+=i.loopedSlides),i.slideTo(r,t,s,a)},slideNext:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{animating:i,enabled:r,params:n}=a;if(!r)return a;let l=n.slidesPerGroup;"auto"===n.slidesPerView&&1===n.slidesPerGroup&&n.slidesPerGroupAuto&&(l=Math.max(a.slidesPerViewDynamic("current",!0),1));const o=a.activeIndex<n.slidesPerGroupSkip?1:l;if(n.loop){if(i&&n.loopPreventsSlide)return!1;a.loopFix(),a._clientLeft=a.$wrapperEl[0].clientLeft}return n.rewind&&a.isEnd?a.slideTo(0,e,t,s):a.slideTo(a.activeIndex+o,e,t,s)},slidePrev:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{params:i,animating:r,snapGrid:n,slidesGrid:l,rtlTranslate:o,enabled:d}=a;if(!d)return a;if(i.loop){if(r&&i.loopPreventsSlide)return!1;a.loopFix(),a._clientLeft=a.$wrapperEl[0].clientLeft}function c(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const p=c(o?a.translate:-a.translate),u=n.map((e=>c(e)));let h=n[u.indexOf(p)-1];if(void 0===h&&i.cssMode){let e;n.forEach(((t,s)=>{p>=t&&(e=s)})),void 0!==e&&(h=n[e>0?e-1:e])}let m=0;if(void 0!==h&&(m=l.indexOf(h),m<0&&(m=a.activeIndex-1),"auto"===i.slidesPerView&&1===i.slidesPerGroup&&i.slidesPerGroupAuto&&(m=m-a.slidesPerViewDynamic("previous",!0)+1,m=Math.max(m,0))),i.rewind&&a.isBeginning){const i=a.params.virtual&&a.params.virtual.enabled&&a.virtual?a.virtual.slides.length-1:a.slides.length-1;return a.slideTo(i,e,t,s)}return a.slideTo(m,e,t,s)},slideReset:function(e,t,s){return void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),this.slideTo(this.activeIndex,e,t,s)},slideToClosest:function(e,t,s,a){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===a&&(a=.5);const i=this;let r=i.activeIndex;const n=Math.min(i.params.slidesPerGroupSkip,r),l=n+Math.floor((r-n)/i.params.slidesPerGroup),o=i.rtlTranslate?i.translate:-i.translate;if(o>=i.snapGrid[l]){const e=i.snapGrid[l];o-e>(i.snapGrid[l+1]-e)*a&&(r+=i.params.slidesPerGroup)}else{const e=i.snapGrid[l-1];o-e<=(i.snapGrid[l]-e)*a&&(r-=i.params.slidesPerGroup)}return r=Math.max(r,0),r=Math.min(r,i.slidesGrid.length-1),i.slideTo(r,e,t,s)},slideToClickedSlide:function(){const e=this,{params:t,$wrapperEl:s}=e,a="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let i,r=e.clickedIndex;if(t.loop){if(e.animating)return;i=parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"),10),t.centeredSlides?r<e.loopedSlides-a/2||r>e.slides.length-e.loopedSlides+a/2?(e.loopFix(),r=s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),p((()=>{e.slideTo(r)}))):e.slideTo(r):r>e.slides.length-a?(e.loopFix(),r=s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),p((()=>{e.slideTo(r)}))):e.slideTo(r)}else e.slideTo(r)}};var z={loopCreate:function(){const e=this,t=a(),{params:s,$wrapperEl:i}=e,r=i.children().length>0?d(i.children()[0].parentNode):i;r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();let n=r.children(`.${s.slideClass}`);if(s.loopFillGroupWithBlank){const e=s.slidesPerGroup-n.length%s.slidesPerGroup;if(e!==s.slidesPerGroup){for(let a=0;a<e;a+=1){const e=d(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);r.append(e)}n=r.children(`.${s.slideClass}`)}}"auto"!==s.slidesPerView||s.loopedSlides||(s.loopedSlides=n.length),e.loopedSlides=Math.ceil(parseFloat(s.loopedSlides||s.slidesPerView,10)),e.loopedSlides+=s.loopAdditionalSlides,e.loopedSlides>n.length&&(e.loopedSlides=n.length);const l=[],o=[];n.each(((t,s)=>{const a=d(t);s<e.loopedSlides&&o.push(t),s<n.length&&s>=n.length-e.loopedSlides&&l.push(t),a.attr("data-swiper-slide-index",s)}));for(let e=0;e<o.length;e+=1)r.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));for(let e=l.length-1;e>=0;e-=1)r.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass))},loopFix:function(){const e=this;e.emit("beforeLoopFix");const{activeIndex:t,slides:s,loopedSlides:a,allowSlidePrev:i,allowSlideNext:r,snapGrid:n,rtlTranslate:l}=e;let o;e.allowSlidePrev=!0,e.allowSlideNext=!0;const d=-n[t]-e.getTranslate();if(t<a){o=s.length-3*a+t,o+=a;e.slideTo(o,0,!1,!0)&&0!==d&&e.setTranslate((l?-e.translate:e.translate)-d)}else if(t>=s.length-a){o=-s.length+t+a,o+=a;e.slideTo(o,0,!1,!0)&&0!==d&&e.setTranslate((l?-e.translate:e.translate)-d)}e.allowSlidePrev=i,e.allowSlideNext=r,e.emit("loopFix")},loopDestroy:function(){const{$wrapperEl:e,params:t,slides:s}=this;e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),s.removeAttr("data-swiper-slide-index")}};function O(e){const t=this,s=a(),i=r(),n=t.touchEventsData,{params:l,touches:o,enabled:c}=t;if(!c)return;if(t.animating&&l.preventInteractionOnTransition)return;!t.animating&&l.cssMode&&l.loop&&t.loopFix();let p=e;p.originalEvent&&(p=p.originalEvent);let h=d(p.target);if("wrapper"===l.touchEventsTarget&&!h.closest(t.wrapperEl).length)return;if(n.isTouchEvent="touchstart"===p.type,!n.isTouchEvent&&"which"in p&&3===p.which)return;if(!n.isTouchEvent&&"button"in p&&p.button>0)return;if(n.isTouched&&n.isMoved)return;!!l.noSwipingClass&&""!==l.noSwipingClass&&p.target&&p.target.shadowRoot&&e.path&&e.path[0]&&(h=d(e.path[0]));const m=l.noSwipingSelector?l.noSwipingSelector:`.${l.noSwipingClass}`,f=!(!p.target||!p.target.shadowRoot);if(l.noSwiping&&(f?function(e,t){return void 0===t&&(t=this),function t(s){return s&&s!==a()&&s!==r()?(s.assignedSlot&&(s=s.assignedSlot),s.closest(e)||t(s.getRootNode().host)):null}(t)}(m,p.target):h.closest(m)[0]))return void(t.allowClick=!0);if(l.swipeHandler&&!h.closest(l.swipeHandler)[0])return;o.currentX="touchstart"===p.type?p.targetTouches[0].pageX:p.pageX,o.currentY="touchstart"===p.type?p.targetTouches[0].pageY:p.pageY;const g=o.currentX,v=o.currentY,w=l.edgeSwipeDetection||l.iOSEdgeSwipeDetection,b=l.edgeSwipeThreshold||l.iOSEdgeSwipeThreshold;if(w&&(g<=b||g>=i.innerWidth-b)){if("prevent"!==w)return;e.preventDefault()}if(Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),o.startX=g,o.startY=v,n.touchStartTime=u(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,l.threshold>0&&(n.allowThresholdMove=!1),"touchstart"!==p.type){let e=!0;h.is(n.focusableElements)&&(e=!1,"SELECT"===h[0].nodeName&&(n.isTouched=!1)),s.activeElement&&d(s.activeElement).is(n.focusableElements)&&s.activeElement!==h[0]&&s.activeElement.blur();const a=e&&t.allowTouchMove&&l.touchStartPreventDefault;!l.touchStartForcePreventDefault&&!a||h[0].isContentEditable||p.preventDefault()}t.params.freeMode&&t.params.freeMode.enabled&&t.freeMode&&t.animating&&!l.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",p)}function I(e){const t=a(),s=this,i=s.touchEventsData,{params:r,touches:n,rtlTranslate:l,enabled:o}=s;if(!o)return;let c=e;if(c.originalEvent&&(c=c.originalEvent),!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",c));if(i.isTouchEvent&&"touchmove"!==c.type)return;const p="touchmove"===c.type&&c.targetTouches&&(c.targetTouches[0]||c.changedTouches[0]),h="touchmove"===c.type?p.pageX:c.pageX,m="touchmove"===c.type?p.pageY:c.pageY;if(c.preventedByNestedSwiper)return n.startX=h,void(n.startY=m);if(!s.allowTouchMove)return d(c.target).is(i.focusableElements)||(s.allowClick=!1),void(i.isTouched&&(Object.assign(n,{startX:h,startY:m,currentX:h,currentY:m}),i.touchStartTime=u()));if(i.isTouchEvent&&r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(m<n.startY&&s.translate<=s.maxTranslate()||m>n.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(h<n.startX&&s.translate<=s.maxTranslate()||h>n.startX&&s.translate>=s.minTranslate())return;if(i.isTouchEvent&&t.activeElement&&c.target===t.activeElement&&d(c.target).is(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1);if(i.allowTouchCallbacks&&s.emit("touchMove",c),c.targetTouches&&c.targetTouches.length>1)return;n.currentX=h,n.currentY=m;const f=n.currentX-n.startX,g=n.currentY-n.startY;if(s.params.threshold&&Math.sqrt(f**2+g**2)<s.params.threshold)return;if(void 0===i.isScrolling){let e;s.isHorizontal()&&n.currentY===n.startY||s.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:f*f+g*g>=25&&(e=180*Math.atan2(Math.abs(g),Math.abs(f))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle)}if(i.isScrolling&&s.emit("touchMoveOpposite",c),void 0===i.startMoving&&(n.currentX===n.startX&&n.currentY===n.startY||(i.startMoving=!0)),i.isScrolling)return void(i.isTouched=!1);if(!i.startMoving)return;s.allowClick=!1,!r.cssMode&&c.cancelable&&c.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&c.stopPropagation(),i.isMoved||(r.loop&&!r.cssMode&&s.loopFix(),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating&&s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",c)),s.emit("sliderMove",c),i.isMoved=!0;let v=s.isHorizontal()?f:g;n.diff=v,v*=r.touchRatio,l&&(v=-v),s.swipeDirection=v>0?"prev":"next",i.currentTranslate=v+i.startTranslate;let w=!0,b=r.resistanceRatio;if(r.touchReleaseOnEdges&&(b=0),v>0&&i.currentTranslate>s.minTranslate()?(w=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+v)**b)):v<0&&i.currentTranslate<s.maxTranslate()&&(w=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-v)**b)),w&&(c.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(v)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,void(n.diff=s.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),s.params.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate))}function L(e){const t=this,s=t.touchEventsData,{params:a,touches:i,rtlTranslate:r,slidesGrid:n,enabled:l}=t;if(!l)return;let o=e;if(o.originalEvent&&(o=o.originalEvent),s.allowTouchCallbacks&&t.emit("touchEnd",o),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&a.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1);a.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const d=u(),c=d-s.touchStartTime;if(t.allowClick){const e=o.path||o.composedPath&&o.composedPath();t.updateClickedSlide(e&&e[0]||o.target),t.emit("tap click",o),c<300&&d-s.lastClickTime<300&&t.emit("doubleTap doubleClick",o)}if(s.lastClickTime=u(),p((()=>{t.destroyed||(t.allowClick=!0)})),!s.isTouched||!s.isMoved||!t.swipeDirection||0===i.diff||s.currentTranslate===s.startTranslate)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1);let h;if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,h=a.followFinger?r?t.translate:-t.translate:-s.currentTranslate,a.cssMode)return;if(t.params.freeMode&&a.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:h});let m=0,f=t.slidesSizesGrid[0];for(let e=0;e<n.length;e+=e<a.slidesPerGroupSkip?1:a.slidesPerGroup){const t=e<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;void 0!==n[e+t]?h>=n[e]&&h<n[e+t]&&(m=e,f=n[e+t]-n[e]):h>=n[e]&&(m=e,f=n[n.length-1]-n[n.length-2])}let g=null,v=null;a.rewind&&(t.isBeginning?v=t.params.virtual&&t.params.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(g=0));const w=(h-n[m])/f,b=m<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;if(c>a.longSwipesMs){if(!a.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(w>=a.longSwipesRatio?t.slideTo(a.rewind&&t.isEnd?g:m+b):t.slideTo(m)),"prev"===t.swipeDirection&&(w>1-a.longSwipesRatio?t.slideTo(m+b):null!==v&&w<0&&Math.abs(w)>a.longSwipesRatio?t.slideTo(v):t.slideTo(m))}else{if(!a.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(o.target===t.navigation.nextEl||o.target===t.navigation.prevEl)?o.target===t.navigation.nextEl?t.slideTo(m+b):t.slideTo(m):("next"===t.swipeDirection&&t.slideTo(null!==g?g:m+b),"prev"===t.swipeDirection&&t.slideTo(null!==v?v:m))}}function A(){const e=this,{params:t,el:s}=e;if(s&&0===s.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:a,allowSlidePrev:i,snapGrid:r}=e;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses(),("auto"===t.slidesPerView||t.slidesPerView>1)&&e.isEnd&&!e.isBeginning&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.run(),e.allowSlidePrev=i,e.allowSlideNext=a,e.params.watchOverflow&&r!==e.snapGrid&&e.checkOverflow()}function D(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function G(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:a}=e;if(!a)return;let i;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,-0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const r=e.maxTranslate()-e.minTranslate();i=0===r?0:(e.translate-e.minTranslate())/r,i!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}let B=!1;function N(){}const H=(e,t)=>{const s=a(),{params:i,touchEvents:r,el:n,wrapperEl:l,device:o,support:d}=e,c=!!i.nested,p="on"===t?"addEventListener":"removeEventListener",u=t;if(d.touch){const t=!("touchstart"!==r.start||!d.passiveListener||!i.passiveListeners)&&{passive:!0,capture:!1};n[p](r.start,e.onTouchStart,t),n[p](r.move,e.onTouchMove,d.passiveListener?{passive:!1,capture:c}:c),n[p](r.end,e.onTouchEnd,t),r.cancel&&n[p](r.cancel,e.onTouchEnd,t)}else n[p](r.start,e.onTouchStart,!1),s[p](r.move,e.onTouchMove,c),s[p](r.end,e.onTouchEnd,!1);(i.preventClicks||i.preventClicksPropagation)&&n[p]("click",e.onClick,!0),i.cssMode&&l[p]("scroll",e.onScroll),i.updateOnWindowResize?e[u](o.ios||o.android?"resize orientationchange observerUpdate":"resize observerUpdate",A,!0):e[u]("observerUpdate",A,!0)};var X={attachEvents:function(){const e=this,t=a(),{params:s,support:i}=e;e.onTouchStart=O.bind(e),e.onTouchMove=I.bind(e),e.onTouchEnd=L.bind(e),s.cssMode&&(e.onScroll=G.bind(e)),e.onClick=D.bind(e),i.touch&&!B&&(t.addEventListener("touchstart",N),B=!0),H(e,"on")},detachEvents:function(){H(this,"off")}};const Y=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;var R={addClasses:function(){const e=this,{classNames:t,params:s,rtl:a,$el:i,device:r,support:n}=e,l=function(e,t){const s=[];return e.forEach((e=>{"object"==typeof e?Object.keys(e).forEach((a=>{e[a]&&s.push(t+a)})):"string"==typeof e&&s.push(t+e)})),s}(["initialized",s.direction,{"pointer-events":!n.touch},{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:a},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&"column"===s.grid.fill},{android:r.android},{ios:r.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides}],s.containerModifierClass);t.push(...l),i.addClass([...t].join(" ")),e.emitContainerClasses()},removeClasses:function(){const{$el:e,classNames:t}=this;e.removeClass(t.join(" ")),this.emitContainerClasses()}};var W={init:!0,direction:"horizontal",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopFillGroupWithBlank:!1,loopPreventsSlide:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0,_emitClasses:!1};function j(e,t){return function(s){void 0===s&&(s={});const a=Object.keys(s)[0],i=s[a];"object"==typeof i&&null!==i?(["navigation","pagination","scrollbar"].indexOf(a)>=0&&!0===e[a]&&(e[a]={auto:!0}),a in e&&"enabled"in i?(!0===e[a]&&(e[a]={enabled:!0}),"object"!=typeof e[a]||"enabled"in e[a]||(e[a].enabled=!0),e[a]||(e[a]={enabled:!1}),g(t,s)):g(t,s)):g(t,s)}}const _={eventsEmitter:$,update:S,translate:M,transition:{setTransition:function(e,t){const s=this;s.params.cssMode||s.$wrapperEl.transition(e),s.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;a.cssMode||(a.autoHeight&&s.updateAutoHeight(),P({swiper:s,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;s.animating=!1,a.cssMode||(s.setTransition(0),P({swiper:s,runCallbacks:e,direction:t,step:"End"}))}},slide:k,loop:z,grabCursor:{setGrabCursor:function(e){const t=this;if(t.support.touch||!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;s.style.cursor="move",s.style.cursor=e?"-webkit-grabbing":"-webkit-grab",s.style.cursor=e?"-moz-grabbin":"-moz-grab",s.style.cursor=e?"grabbing":"grab"},unsetGrabCursor:function(){const e=this;e.support.touch||e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="")}},events:X,breakpoints:{setBreakpoint:function(){const e=this,{activeIndex:t,initialized:s,loopedSlides:a=0,params:i,$el:r}=e,n=i.breakpoints;if(!n||n&&0===Object.keys(n).length)return;const l=e.getBreakpoint(n,e.params.breakpointsBase,e.el);if(!l||e.currentBreakpoint===l)return;const o=(l in n?n[l]:void 0)||e.originalParams,d=Y(e,i),c=Y(e,o),p=i.enabled;d&&!c?(r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`),e.emitContainerClasses()):!d&&c&&(r.addClass(`${i.containerModifierClass}grid`),(o.grid.fill&&"column"===o.grid.fill||!o.grid.fill&&"column"===i.grid.fill)&&r.addClass(`${i.containerModifierClass}grid-column`),e.emitContainerClasses());const u=o.direction&&o.direction!==i.direction,h=i.loop&&(o.slidesPerView!==i.slidesPerView||u);u&&s&&e.changeDirection(),g(e.params,o);const m=e.params.enabled;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),p&&!m?e.disable():!p&&m&&e.enable(),e.currentBreakpoint=l,e.emit("_beforeBreakpoint",o),h&&s&&(e.loopDestroy(),e.loopCreate(),e.updateSlides(),e.slideTo(t-a+e.loopedSlides,0,!1)),e.emit("breakpoint",o)},getBreakpoint:function(e,t,s){if(void 0===t&&(t="window"),!e||"container"===t&&!s)return;let a=!1;const i=r(),n="window"===t?i.innerHeight:s.clientHeight,l=Object.keys(e).map((e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:n*t,point:e}}return{value:e,point:e}}));l.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let e=0;e<l.length;e+=1){const{point:r,value:n}=l[e];"window"===t?i.matchMedia(`(min-width: ${n}px)`).matches&&(a=r):n<=s.clientWidth&&(a=r)}return a||"max"}},checkOverflow:{checkOverflow:function(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:a}=s;if(a){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*a;e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:R,images:{loadImage:function(e,t,s,a,i,n){const l=r();let o;function c(){n&&n()}d(e).parent("picture")[0]||e.complete&&i?c():t?(o=new l.Image,o.onload=c,o.onerror=c,a&&(o.sizes=a),s&&(o.srcset=s),t&&(o.src=t)):c()},preloadImages:function(){const e=this;function t(){null!=e&&e&&!e.destroyed&&(void 0!==e.imagesLoaded&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}e.imagesToLoad=e.$el.find("img");for(let s=0;s<e.imagesToLoad.length;s+=1){const a=e.imagesToLoad[s];e.loadImage(a,a.currentSrc||a.getAttribute("src"),a.srcset||a.getAttribute("srcset"),a.sizes||a.getAttribute("sizes"),!0,t)}}}},V={};class q{constructor(){let e,t;for(var s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];if(1===a.length&&a[0].constructor&&"Object"===Object.prototype.toString.call(a[0]).slice(8,-1)?t=a[0]:[e,t]=a,t||(t={}),t=g({},t),e&&!t.el&&(t.el=e),t.el&&d(t.el).length>1){const e=[];return d(t.el).each((s=>{const a=g({},t,{el:s});e.push(new q(a))})),e}const r=this;r.__swiper__=!0,r.support=E(),r.device=T({userAgent:t.userAgent}),r.browser=C(),r.eventsListeners={},r.eventsAnyListeners=[],r.modules=[...r.__modules__],t.modules&&Array.isArray(t.modules)&&r.modules.push(...t.modules);const n={};r.modules.forEach((e=>{e({swiper:r,extendParams:j(t,n),on:r.on.bind(r),once:r.once.bind(r),off:r.off.bind(r),emit:r.emit.bind(r)})}));const l=g({},W,n);return r.params=g({},l,V,t),r.originalParams=g({},r.params),r.passedParams=g({},t),r.params&&r.params.on&&Object.keys(r.params.on).forEach((e=>{r.on(e,r.params.on[e])})),r.params&&r.params.onAny&&r.onAny(r.params.onAny),r.$=d,Object.assign(r,{enabled:r.params.enabled,el:e,classNames:[],slides:d(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===r.params.direction,isVertical:()=>"vertical"===r.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:r.params.allowSlideNext,allowSlidePrev:r.params.allowSlidePrev,touchEvents:function(){const e=["touchstart","touchmove","touchend","touchcancel"],t=["pointerdown","pointermove","pointerup"];return r.touchEventsTouch={start:e[0],move:e[1],end:e[2],cancel:e[3]},r.touchEventsDesktop={start:t[0],move:t[1],end:t[2]},r.support.touch||!r.params.simulateTouch?r.touchEventsTouch:r.touchEventsDesktop}(),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:r.params.focusableElements,lastClickTime:u(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:r.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),r.emit("_swiper"),r.params.init&&r.init(),r}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const s=this;e=Math.min(Math.max(e,0),1);const a=s.minTranslate(),i=(s.maxTranslate()-a)*e+a;s.translateTo(i,void 0===t?0:t),s.updateActiveIndex(),s.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.each((s=>{const a=e.getSlideClasses(s);t.push({slideEl:s,classNames:a}),e.emit("_slideClass",s,a)})),e.emit("_slideClasses",t)}slidesPerViewDynamic(e,t){void 0===e&&(e="current"),void 0===t&&(t=!1);const{params:s,slides:a,slidesGrid:i,slidesSizesGrid:r,size:n,activeIndex:l}=this;let o=1;if(s.centeredSlides){let e,t=a[l].swiperSlideSize;for(let s=l+1;s<a.length;s+=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0));for(let s=l-1;s>=0;s-=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0))}else if("current"===e)for(let e=l+1;e<a.length;e+=1){(t?i[e]+r[e]-i[l]<n:i[e]-i[l]<n)&&(o+=1)}else for(let e=l-1;e>=0;e-=1){i[l]-i[e]<n&&(o+=1)}return o}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:s}=e;function a(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses()}let i;s.breakpoints&&e.setBreakpoint(),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode&&e.params.freeMode.enabled?(a(),e.params.autoHeight&&e.updateAutoHeight()):(i=("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),i||a()),s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t){void 0===t&&(t=!0);const s=this,a=s.params.direction;return e||(e="horizontal"===a?"vertical":"horizontal"),e===a||"horizontal"!==e&&"vertical"!==e||(s.$el.removeClass(`${s.params.containerModifierClass}${a}`).addClass(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.each((t=>{"vertical"===e?t.style.width="":t.style.height=""})),s.emit("changeDirection"),t&&s.update()),s}mount(e){const t=this;if(t.mounted)return!0;const s=d(e||t.params.el);if(!(e=s[0]))return!1;e.swiper=t;const i=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let r=(()=>{if(e&&e.shadowRoot&&e.shadowRoot.querySelector){const t=d(e.shadowRoot.querySelector(i()));return t.children=e=>s.children(e),t}return s.children(i())})();if(0===r.length&&t.params.createElements){const e=a().createElement("div");r=d(e),e.className=t.params.wrapperClass,s.append(e),s.children(`.${t.params.slideClass}`).each((e=>{r.append(e)}))}return Object.assign(t,{$el:s,el:e,$wrapperEl:r,wrapperEl:r[0],mounted:!0,rtl:"rtl"===e.dir.toLowerCase()||"rtl"===s.css("direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===e.dir.toLowerCase()||"rtl"===s.css("direction")),wrongRTL:"-webkit-box"===r.css("display")}),!0}init(e){const t=this;if(t.initialized)return t;return!1===t.mount(e)||(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.params.loop&&t.loopCreate(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.preloadImages&&t.preloadImages(),t.params.loop?t.slideTo(t.params.initialSlide+t.loopedSlides,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.attachEvents(),t.initialized=!0,t.emit("init"),t.emit("afterInit")),t}destroy(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);const s=this,{params:a,$el:i,$wrapperEl:r,slides:n}=s;return void 0===s.params||s.destroyed||(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),a.loop&&s.loopDestroy(),t&&(s.removeClasses(),i.removeAttr("style"),r.removeAttr("style"),n&&n.length&&n.removeClass([a.slideVisibleClass,a.slideActiveClass,a.slideNextClass,a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),s.emit("destroy"),Object.keys(s.eventsListeners).forEach((e=>{s.off(e)})),!1!==e&&(s.$el[0].swiper=null,function(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))}(s)),s.destroyed=!0),null}static extendDefaults(e){g(V,e)}static get extendedDefaults(){return V}static get defaults(){return W}static installModule(e){q.prototype.__modules__||(q.prototype.__modules__=[]);const t=q.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>q.installModule(e))),q):(q.installModule(e),q)}}function F(e,t,s,i){const r=a();return e.params.createElements&&Object.keys(i).forEach((a=>{if(!s[a]&&!0===s.auto){let n=e.$el.children(`.${i[a]}`)[0];n||(n=r.createElement("div"),n.className=i[a],e.$el.append(n)),s[a]=n,t[a]=n}})),s}function U(e){return void 0===e&&(e=""),`.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`}function K(e){const t=this,{$wrapperEl:s,params:a}=t;if(a.loop&&t.loopDestroy(),"object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.append(e[t]);else s.append(e);a.loop&&t.loopCreate(),a.observer||t.update()}function Z(e){const t=this,{params:s,$wrapperEl:a,activeIndex:i}=t;s.loop&&t.loopDestroy();let r=i+1;if("object"==typeof e&&"length"in e){for(let t=0;t<e.length;t+=1)e[t]&&a.prepend(e[t]);r=i+e.length}else a.prepend(e);s.loop&&t.loopCreate(),s.observer||t.update(),t.slideTo(r,0,!1)}function J(e,t){const s=this,{$wrapperEl:a,params:i,activeIndex:r}=s;let n=r;i.loop&&(n-=s.loopedSlides,s.loopDestroy(),s.slides=a.children(`.${i.slideClass}`));const l=s.slides.length;if(e<=0)return void s.prependSlide(t);if(e>=l)return void s.appendSlide(t);let o=n>e?n+1:n;const d=[];for(let t=l-1;t>=e;t-=1){const e=s.slides.eq(t);e.remove(),d.unshift(e)}if("object"==typeof t&&"length"in t){for(let e=0;e<t.length;e+=1)t[e]&&a.append(t[e]);o=n>e?n+t.length:n}else a.append(t);for(let e=0;e<d.length;e+=1)a.append(d[e]);i.loop&&s.loopCreate(),i.observer||s.update(),i.loop?s.slideTo(o+s.loopedSlides,0,!1):s.slideTo(o,0,!1)}function Q(e){const t=this,{params:s,$wrapperEl:a,activeIndex:i}=t;let r=i;s.loop&&(r-=t.loopedSlides,t.loopDestroy(),t.slides=a.children(`.${s.slideClass}`));let n,l=r;if("object"==typeof e&&"length"in e){for(let s=0;s<e.length;s+=1)n=e[s],t.slides[n]&&t.slides.eq(n).remove(),n<l&&(l-=1);l=Math.max(l,0)}else n=e,t.slides[n]&&t.slides.eq(n).remove(),n<l&&(l-=1),l=Math.max(l,0);s.loop&&t.loopCreate(),s.observer||t.update(),s.loop?t.slideTo(l+t.loopedSlides,0,!1):t.slideTo(l,0,!1)}function ee(){const e=this,t=[];for(let s=0;s<e.slides.length;s+=1)t.push(s);e.removeSlide(t)}function te(e){const{effect:t,swiper:s,on:a,setTranslate:i,setTransition:r,overwriteParams:n,perspective:l}=e;a("beforeInit",(()=>{if(s.params.effect!==t)return;s.classNames.push(`${s.params.containerModifierClass}${t}`),l&&l()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(s.params,e),Object.assign(s.originalParams,e)})),a("setTranslate",(()=>{s.params.effect===t&&i()})),a("setTransition",((e,a)=>{s.params.effect===t&&r(a)}))}function se(e,t){return e.transformEl?t.find(e.transformEl).css({"backface-visibility":"hidden","-webkit-backface-visibility":"hidden"}):t}function ae(e){let{swiper:t,duration:s,transformEl:a,allSlides:i}=e;const{slides:r,activeIndex:n,$wrapperEl:l}=t;if(t.params.virtualTranslate&&0!==s){let e,s=!1;e=i?a?r.find(a):r:a?r.eq(n).find(a):r.eq(n),e.transitionEnd((()=>{if(s)return;if(!t||t.destroyed)return;s=!0,t.animating=!1;const e=["webkitTransitionEnd","transitionend"];for(let t=0;t<e.length;t+=1)l.trigger(e[t])}))}}function ie(e,t,s){const a="swiper-slide-shadow"+(s?`-${s}`:""),i=e.transformEl?t.find(e.transformEl):t;let r=i.children(`.${a}`);return r.length||(r=d(`<div class="swiper-slide-shadow${s?`-${s}`:""}"></div>`),i.append(r)),r}Object.keys(_).forEach((e=>{Object.keys(_[e]).forEach((t=>{q.prototype[t]=_[e][t]}))})),q.use([function(e){let{swiper:t,on:s,emit:a}=e;const i=r();let n=null,l=null;const o=()=>{t&&!t.destroyed&&t.initialized&&(a("beforeResize"),a("resize"))},d=()=>{t&&!t.destroyed&&t.initialized&&a("orientationchange")};s("init",(()=>{t.params.resizeObserver&&void 0!==i.ResizeObserver?t&&!t.destroyed&&t.initialized&&(n=new ResizeObserver((e=>{l=i.requestAnimationFrame((()=>{const{width:s,height:a}=t;let i=s,r=a;e.forEach((e=>{let{contentBoxSize:s,contentRect:a,target:n}=e;n&&n!==t.el||(i=a?a.width:(s[0]||s).inlineSize,r=a?a.height:(s[0]||s).blockSize)})),i===s&&r===a||o()}))})),n.observe(t.el)):(i.addEventListener("resize",o),i.addEventListener("orientationchange",d))})),s("destroy",(()=>{l&&i.cancelAnimationFrame(l),n&&n.unobserve&&t.el&&(n.unobserve(t.el),n=null),i.removeEventListener("resize",o),i.removeEventListener("orientationchange",d)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=[],l=r(),o=function(e,t){void 0===t&&(t={});const s=new(l.MutationObserver||l.WebkitMutationObserver)((e=>{if(1===e.length)return void i("observerUpdate",e[0]);const t=function(){i("observerUpdate",e[0])};l.requestAnimationFrame?l.requestAnimationFrame(t):l.setTimeout(t,0)}));s.observe(e,{attributes:void 0===t.attributes||t.attributes,childList:void 0===t.childList||t.childList,characterData:void 0===t.characterData||t.characterData}),n.push(s)};s({observer:!1,observeParents:!1,observeSlideChildren:!1}),a("init",(()=>{if(t.params.observer){if(t.params.observeParents){const e=t.$el.parents();for(let t=0;t<e.length;t+=1)o(e[t])}o(t.$el[0],{childList:t.params.observeSlideChildren}),o(t.$wrapperEl[0],{attributes:!1})}})),a("destroy",(()=>{n.forEach((e=>{e.disconnect()})),n.splice(0,n.length)}))}]);const re=[function(e){let t,{swiper:s,extendParams:a,on:i}=e;function r(e,t){const a=s.params.virtual;if(a.cache&&s.virtual.cache[t])return s.virtual.cache[t];const i=a.renderSlide?d(a.renderSlide.call(s,e,t)):d(`<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`);return i.attr("data-swiper-slide-index")||i.attr("data-swiper-slide-index",t),a.cache&&(s.virtual.cache[t]=i),i}function n(e){const{slidesPerView:t,slidesPerGroup:a,centeredSlides:i}=s.params,{addSlidesBefore:n,addSlidesAfter:l}=s.params.virtual,{from:o,to:d,slides:c,slidesGrid:p,offset:u}=s.virtual;s.params.cssMode||s.updateActiveIndex();const h=s.activeIndex||0;let m,f,g;m=s.rtlTranslate?"right":s.isHorizontal()?"left":"top",i?(f=Math.floor(t/2)+a+l,g=Math.floor(t/2)+a+n):(f=t+(a-1)+l,g=a+n);const v=Math.max((h||0)-g,0),w=Math.min((h||0)+f,c.length-1),b=(s.slidesGrid[v]||0)-(s.slidesGrid[0]||0);function x(){s.updateSlides(),s.updateProgress(),s.updateSlidesClasses(),s.lazy&&s.params.lazy.enabled&&s.lazy.load()}if(Object.assign(s.virtual,{from:v,to:w,offset:b,slidesGrid:s.slidesGrid}),o===v&&d===w&&!e)return s.slidesGrid!==p&&b!==u&&s.slides.css(m,`${b}px`),void s.updateProgress();if(s.params.virtual.renderExternal)return s.params.virtual.renderExternal.call(s,{offset:b,from:v,to:w,slides:function(){const e=[];for(let t=v;t<=w;t+=1)e.push(c[t]);return e}()}),void(s.params.virtual.renderExternalUpdate&&x());const y=[],E=[];if(e)s.$wrapperEl.find(`.${s.params.slideClass}`).remove();else for(let e=o;e<=d;e+=1)(e<v||e>w)&&s.$wrapperEl.find(`.${s.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();for(let t=0;t<c.length;t+=1)t>=v&&t<=w&&(void 0===d||e?E.push(t):(t>d&&E.push(t),t<o&&y.push(t)));E.forEach((e=>{s.$wrapperEl.append(r(c[e],e))})),y.sort(((e,t)=>t-e)).forEach((e=>{s.$wrapperEl.prepend(r(c[e],e))})),s.$wrapperEl.children(".swiper-slide").css(m,`${b}px`),x()}a({virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,renderExternalUpdate:!0,addSlidesBefore:0,addSlidesAfter:0}}),s.virtual={cache:{},from:void 0,to:void 0,slides:[],offset:0,slidesGrid:[]},i("beforeInit",(()=>{s.params.virtual.enabled&&(s.virtual.slides=s.params.virtual.slides,s.classNames.push(`${s.params.containerModifierClass}virtual`),s.params.watchSlidesProgress=!0,s.originalParams.watchSlidesProgress=!0,s.params.initialSlide||n())})),i("setTranslate",(()=>{s.params.virtual.enabled&&(s.params.cssMode&&!s._immediateVirtual?(clearTimeout(t),t=setTimeout((()=>{n()}),100)):n())})),i("init update resize",(()=>{s.params.virtual.enabled&&s.params.cssMode&&v(s.wrapperEl,"--swiper-virtual-size",`${s.virtualSize}px`)})),Object.assign(s.virtual,{appendSlide:function(e){if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.push(e[t]);else s.virtual.slides.push(e);n(!0)},prependSlide:function(e){const t=s.activeIndex;let a=t+1,i=1;if(Array.isArray(e)){for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.unshift(e[t]);a=t+e.length,i=e.length}else s.virtual.slides.unshift(e);if(s.params.virtual.cache){const e=s.virtual.cache,t={};Object.keys(e).forEach((s=>{const a=e[s],r=a.attr("data-swiper-slide-index");r&&a.attr("data-swiper-slide-index",parseInt(r,10)+i),t[parseInt(s,10)+i]=a})),s.virtual.cache=t}n(!0),s.slideTo(a,0)},removeSlide:function(e){if(null==e)return;let t=s.activeIndex;if(Array.isArray(e))for(let a=e.length-1;a>=0;a-=1)s.virtual.slides.splice(e[a],1),s.params.virtual.cache&&delete s.virtual.cache[e[a]],e[a]<t&&(t-=1),t=Math.max(t,0);else s.virtual.slides.splice(e,1),s.params.virtual.cache&&delete s.virtual.cache[e],e<t&&(t-=1),t=Math.max(t,0);n(!0),s.slideTo(t,0)},removeAllSlides:function(){s.virtual.slides=[],s.params.virtual.cache&&(s.virtual.cache={}),n(!0),s.slideTo(0,0)},update:n})},function(e){let{swiper:t,extendParams:s,on:i,emit:n}=e;const l=a(),o=r();function c(e){if(!t.enabled)return;const{rtlTranslate:s}=t;let a=e;a.originalEvent&&(a=a.originalEvent);const i=a.keyCode||a.charCode,r=t.params.keyboard.pageUpDown,d=r&&33===i,c=r&&34===i,p=37===i,u=39===i,h=38===i,m=40===i;if(!t.allowSlideNext&&(t.isHorizontal()&&u||t.isVertical()&&m||c))return!1;if(!t.allowSlidePrev&&(t.isHorizontal()&&p||t.isVertical()&&h||d))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||l.activeElement&&l.activeElement.nodeName&&("input"===l.activeElement.nodeName.toLowerCase()||"textarea"===l.activeElement.nodeName.toLowerCase()))){if(t.params.keyboard.onlyInViewport&&(d||c||p||u||h||m)){let e=!1;if(t.$el.parents(`.${t.params.slideClass}`).length>0&&0===t.$el.parents(`.${t.params.slideActiveClass}`).length)return;const a=t.$el,i=a[0].clientWidth,r=a[0].clientHeight,n=o.innerWidth,l=o.innerHeight,d=t.$el.offset();s&&(d.left-=t.$el[0].scrollLeft);const c=[[d.left,d.top],[d.left+i,d.top],[d.left,d.top+r],[d.left+i,d.top+r]];for(let t=0;t<c.length;t+=1){const s=c[t];if(s[0]>=0&&s[0]<=n&&s[1]>=0&&s[1]<=l){if(0===s[0]&&0===s[1])continue;e=!0}}if(!e)return}t.isHorizontal()?((d||c||p||u)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),((c||u)&&!s||(d||p)&&s)&&t.slideNext(),((d||p)&&!s||(c||u)&&s)&&t.slidePrev()):((d||c||h||m)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),(c||m)&&t.slideNext(),(d||h)&&t.slidePrev()),n("keyPress",i)}}function p(){t.keyboard.enabled||(d(l).on("keydown",c),t.keyboard.enabled=!0)}function u(){t.keyboard.enabled&&(d(l).off("keydown",c),t.keyboard.enabled=!1)}t.keyboard={enabled:!1},s({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}}),i("init",(()=>{t.params.keyboard.enabled&&p()})),i("destroy",(()=>{t.keyboard.enabled&&u()})),Object.assign(t.keyboard,{enable:p,disable:u})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();let l;s({mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarget:"container",thresholdDelta:null,thresholdTime:null}}),t.mousewheel={enabled:!1};let o,c=u();const h=[];function m(){t.enabled&&(t.mouseEntered=!0)}function f(){t.enabled&&(t.mouseEntered=!1)}function g(e){return!(t.params.mousewheel.thresholdDelta&&e.delta<t.params.mousewheel.thresholdDelta)&&(!(t.params.mousewheel.thresholdTime&&u()-c<t.params.mousewheel.thresholdTime)&&(e.delta>=6&&u()-c<60||(e.direction<0?t.isEnd&&!t.params.loop||t.animating||(t.slideNext(),i("scroll",e.raw)):t.isBeginning&&!t.params.loop||t.animating||(t.slidePrev(),i("scroll",e.raw)),c=(new n.Date).getTime(),!1)))}function v(e){let s=e,a=!0;if(!t.enabled)return;const r=t.params.mousewheel;t.params.cssMode&&s.preventDefault();let n=t.$el;if("container"!==t.params.mousewheel.eventsTarget&&(n=d(t.params.mousewheel.eventsTarget)),!t.mouseEntered&&!n[0].contains(s.target)&&!r.releaseOnEdges)return!0;s.originalEvent&&(s=s.originalEvent);let c=0;const m=t.rtlTranslate?-1:1,f=function(e){let t=0,s=0,a=0,i=0;return"detail"in e&&(s=e.detail),"wheelDelta"in e&&(s=-e.wheelDelta/120),"wheelDeltaY"in e&&(s=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=s,s=0),a=10*t,i=10*s,"deltaY"in e&&(i=e.deltaY),"deltaX"in e&&(a=e.deltaX),e.shiftKey&&!a&&(a=i,i=0),(a||i)&&e.deltaMode&&(1===e.deltaMode?(a*=40,i*=40):(a*=800,i*=800)),a&&!t&&(t=a<1?-1:1),i&&!s&&(s=i<1?-1:1),{spinX:t,spinY:s,pixelX:a,pixelY:i}}(s);if(r.forceToAxis)if(t.isHorizontal()){if(!(Math.abs(f.pixelX)>Math.abs(f.pixelY)))return!0;c=-f.pixelX*m}else{if(!(Math.abs(f.pixelY)>Math.abs(f.pixelX)))return!0;c=-f.pixelY}else c=Math.abs(f.pixelX)>Math.abs(f.pixelY)?-f.pixelX*m:-f.pixelY;if(0===c)return!0;r.invert&&(c=-c);let v=t.getTranslate()+c*r.sensitivity;if(v>=t.minTranslate()&&(v=t.minTranslate()),v<=t.maxTranslate()&&(v=t.maxTranslate()),a=!!t.params.loop||!(v===t.minTranslate()||v===t.maxTranslate()),a&&t.params.nested&&s.stopPropagation(),t.params.freeMode&&t.params.freeMode.enabled){const e={time:u(),delta:Math.abs(c),direction:Math.sign(c)},a=o&&e.time<o.time+500&&e.delta<=o.delta&&e.direction===o.direction;if(!a){o=void 0,t.params.loop&&t.loopFix();let n=t.getTranslate()+c*r.sensitivity;const d=t.isBeginning,u=t.isEnd;if(n>=t.minTranslate()&&(n=t.minTranslate()),n<=t.maxTranslate()&&(n=t.maxTranslate()),t.setTransition(0),t.setTranslate(n),t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses(),(!d&&t.isBeginning||!u&&t.isEnd)&&t.updateSlidesClasses(),t.params.freeMode.sticky){clearTimeout(l),l=void 0,h.length>=15&&h.shift();const s=h.length?h[h.length-1]:void 0,a=h[0];if(h.push(e),s&&(e.delta>s.delta||e.direction!==s.direction))h.splice(0);else if(h.length>=15&&e.time-a.time<500&&a.delta-e.delta>=1&&e.delta<=6){const s=c>0?.8:.2;o=e,h.splice(0),l=p((()=>{t.slideToClosest(t.params.speed,!0,void 0,s)}),0)}l||(l=p((()=>{o=e,h.splice(0),t.slideToClosest(t.params.speed,!0,void 0,.5)}),500))}if(a||i("scroll",s),t.params.autoplay&&t.params.autoplayDisableOnInteraction&&t.autoplay.stop(),n===t.minTranslate()||n===t.maxTranslate())return!0}}else{const s={time:u(),delta:Math.abs(c),direction:Math.sign(c),raw:e};h.length>=2&&h.shift();const a=h.length?h[h.length-1]:void 0;if(h.push(s),a?(s.direction!==a.direction||s.delta>a.delta||s.time>a.time+150)&&g(s):g(s),function(e){const s=t.params.mousewheel;if(e.direction<0){if(t.isEnd&&!t.params.loop&&s.releaseOnEdges)return!0}else if(t.isBeginning&&!t.params.loop&&s.releaseOnEdges)return!0;return!1}(s))return!0}return s.preventDefault?s.preventDefault():s.returnValue=!1,!1}function w(e){let s=t.$el;"container"!==t.params.mousewheel.eventsTarget&&(s=d(t.params.mousewheel.eventsTarget)),s[e]("mouseenter",m),s[e]("mouseleave",f),s[e]("wheel",v)}function b(){return t.params.cssMode?(t.wrapperEl.removeEventListener("wheel",v),!0):!t.mousewheel.enabled&&(w("on"),t.mousewheel.enabled=!0,!0)}function x(){return t.params.cssMode?(t.wrapperEl.addEventListener(event,v),!0):!!t.mousewheel.enabled&&(w("off"),t.mousewheel.enabled=!1,!0)}a("init",(()=>{!t.params.mousewheel.enabled&&t.params.cssMode&&x(),t.params.mousewheel.enabled&&b()})),a("destroy",(()=>{t.params.cssMode&&b(),t.mousewheel.enabled&&x()})),Object.assign(t.mousewheel,{enable:b,disable:x})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;function r(e){let s;return e&&(s=d(e),t.params.uniqueNavElements&&"string"==typeof e&&s.length>1&&1===t.$el.find(e).length&&(s=t.$el.find(e))),s}function n(e,s){const a=t.params.navigation;e&&e.length>0&&(e[s?"addClass":"removeClass"](a.disabledClass),e[0]&&"BUTTON"===e[0].tagName&&(e[0].disabled=s),t.params.watchOverflow&&t.enabled&&e[t.isLocked?"addClass":"removeClass"](a.lockClass))}function l(){if(t.params.loop)return;const{$nextEl:e,$prevEl:s}=t.navigation;n(s,t.isBeginning&&!t.params.rewind),n(e,t.isEnd&&!t.params.rewind)}function o(e){e.preventDefault(),(!t.isBeginning||t.params.loop||t.params.rewind)&&t.slidePrev()}function c(e){e.preventDefault(),(!t.isEnd||t.params.loop||t.params.rewind)&&t.slideNext()}function p(){const e=t.params.navigation;if(t.params.navigation=F(t,t.originalParams.navigation,t.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!e.nextEl&&!e.prevEl)return;const s=r(e.nextEl),a=r(e.prevEl);s&&s.length>0&&s.on("click",c),a&&a.length>0&&a.on("click",o),Object.assign(t.navigation,{$nextEl:s,nextEl:s&&s[0],$prevEl:a,prevEl:a&&a[0]}),t.enabled||(s&&s.addClass(e.lockClass),a&&a.addClass(e.lockClass))}function u(){const{$nextEl:e,$prevEl:s}=t.navigation;e&&e.length&&(e.off("click",c),e.removeClass(t.params.navigation.disabledClass)),s&&s.length&&(s.off("click",o),s.removeClass(t.params.navigation.disabledClass))}s({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock"}}),t.navigation={nextEl:null,$nextEl:null,prevEl:null,$prevEl:null},a("init",(()=>{p(),l()})),a("toEdge fromEdge lock unlock",(()=>{l()})),a("destroy",(()=>{u()})),a("enable disable",(()=>{const{$nextEl:e,$prevEl:s}=t.navigation;e&&e[t.enabled?"removeClass":"addClass"](t.params.navigation.lockClass),s&&s[t.enabled?"removeClass":"addClass"](t.params.navigation.lockClass)})),a("click",((e,s)=>{const{$nextEl:a,$prevEl:r}=t.navigation,n=s.target;if(t.params.navigation.hideOnClick&&!d(n).is(r)&&!d(n).is(a)){if(t.pagination&&t.params.pagination&&t.params.pagination.clickable&&(t.pagination.el===n||t.pagination.el.contains(n)))return;let e;a?e=a.hasClass(t.params.navigation.hiddenClass):r&&(e=r.hasClass(t.params.navigation.hiddenClass)),i(!0===e?"navigationShow":"navigationHide"),a&&a.toggleClass(t.params.navigation.hiddenClass),r&&r.toggleClass(t.params.navigation.hiddenClass)}})),Object.assign(t.navigation,{update:l,init:p,destroy:u})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const r="swiper-pagination";let n;s({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`}}),t.pagination={el:null,$el:null,bullets:[]};let l=0;function o(){return!t.params.pagination.el||!t.pagination.el||!t.pagination.$el||0===t.pagination.$el.length}function c(e,s){const{bulletActiveClass:a}=t.params.pagination;e[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`)}function p(){const e=t.rtl,s=t.params.pagination;if(o())return;const a=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,r=t.pagination.$el;let p;const u=t.params.loop?Math.ceil((a-2*t.loopedSlides)/t.params.slidesPerGroup):t.snapGrid.length;if(t.params.loop?(p=Math.ceil((t.activeIndex-t.loopedSlides)/t.params.slidesPerGroup),p>a-1-2*t.loopedSlides&&(p-=a-2*t.loopedSlides),p>u-1&&(p-=u),p<0&&"bullets"!==t.params.paginationType&&(p=u+p)):p=void 0!==t.snapIndex?t.snapIndex:t.activeIndex||0,"bullets"===s.type&&t.pagination.bullets&&t.pagination.bullets.length>0){const a=t.pagination.bullets;let i,o,u;if(s.dynamicBullets&&(n=a.eq(0)[t.isHorizontal()?"outerWidth":"outerHeight"](!0),r.css(t.isHorizontal()?"width":"height",n*(s.dynamicMainBullets+4)+"px"),s.dynamicMainBullets>1&&void 0!==t.previousIndex&&(l+=p-(t.previousIndex-t.loopedSlides||0),l>s.dynamicMainBullets-1?l=s.dynamicMainBullets-1:l<0&&(l=0)),i=Math.max(p-l,0),o=i+(Math.min(a.length,s.dynamicMainBullets)-1),u=(o+i)/2),a.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${s.bulletActiveClass}${e}`)).join(" ")),r.length>1)a.each((e=>{const t=d(e),a=t.index();a===p&&t.addClass(s.bulletActiveClass),s.dynamicBullets&&(a>=i&&a<=o&&t.addClass(`${s.bulletActiveClass}-main`),a===i&&c(t,"prev"),a===o&&c(t,"next"))}));else{const e=a.eq(p),r=e.index();if(e.addClass(s.bulletActiveClass),s.dynamicBullets){const e=a.eq(i),n=a.eq(o);for(let e=i;e<=o;e+=1)a.eq(e).addClass(`${s.bulletActiveClass}-main`);if(t.params.loop)if(r>=a.length){for(let e=s.dynamicMainBullets;e>=0;e-=1)a.eq(a.length-e).addClass(`${s.bulletActiveClass}-main`);a.eq(a.length-s.dynamicMainBullets-1).addClass(`${s.bulletActiveClass}-prev`)}else c(e,"prev"),c(n,"next");else c(e,"prev"),c(n,"next")}}if(s.dynamicBullets){const i=Math.min(a.length,s.dynamicMainBullets+4),r=(n*i-n)/2-u*n,l=e?"right":"left";a.css(t.isHorizontal()?l:"top",`${r}px`)}}if("fraction"===s.type&&(r.find(U(s.currentClass)).text(s.formatFractionCurrent(p+1)),r.find(U(s.totalClass)).text(s.formatFractionTotal(u))),"progressbar"===s.type){let e;e=s.progressbarOpposite?t.isHorizontal()?"vertical":"horizontal":t.isHorizontal()?"horizontal":"vertical";const a=(p+1)/u;let i=1,n=1;"horizontal"===e?i=a:n=a,r.find(U(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${n})`).transition(t.params.speed)}"custom"===s.type&&s.renderCustom?(r.html(s.renderCustom(t,p+1,u)),i("paginationRender",r[0])):i("paginationUpdate",r[0]),t.params.watchOverflow&&t.enabled&&r[t.isLocked?"addClass":"removeClass"](s.lockClass)}function u(){const e=t.params.pagination;if(o())return;const s=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,a=t.pagination.$el;let r="";if("bullets"===e.type){let i=t.params.loop?Math.ceil((s-2*t.loopedSlides)/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&t.params.freeMode.enabled&&!t.params.loop&&i>s&&(i=s);for(let s=0;s<i;s+=1)e.renderBullet?r+=e.renderBullet.call(t,s,e.bulletClass):r+=`<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;a.html(r),t.pagination.bullets=a.find(U(e.bulletClass))}"fraction"===e.type&&(r=e.renderFraction?e.renderFraction.call(t,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`,a.html(r)),"progressbar"===e.type&&(r=e.renderProgressbar?e.renderProgressbar.call(t,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`,a.html(r)),"custom"!==e.type&&i("paginationRender",t.pagination.$el[0])}function h(){t.params.pagination=F(t,t.originalParams.pagination,t.params.pagination,{el:"swiper-pagination"});const e=t.params.pagination;if(!e.el)return;let s=d(e.el);0!==s.length&&(t.params.uniqueNavElements&&"string"==typeof e.el&&s.length>1&&(s=t.$el.find(e.el),s.length>1&&(s=s.filter((e=>d(e).parents(".swiper")[0]===t.el)))),"bullets"===e.type&&e.clickable&&s.addClass(e.clickableClass),s.addClass(e.modifierClass+e.type),s.addClass(e.modifierClass+t.params.direction),"bullets"===e.type&&e.dynamicBullets&&(s.addClass(`${e.modifierClass}${e.type}-dynamic`),l=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),"progressbar"===e.type&&e.progressbarOpposite&&s.addClass(e.progressbarOppositeClass),e.clickable&&s.on("click",U(e.bulletClass),(function(e){e.preventDefault();let s=d(this).index()*t.params.slidesPerGroup;t.params.loop&&(s+=t.loopedSlides),t.slideTo(s)})),Object.assign(t.pagination,{$el:s,el:s[0]}),t.enabled||s.addClass(e.lockClass))}function m(){const e=t.params.pagination;if(o())return;const s=t.pagination.$el;s.removeClass(e.hiddenClass),s.removeClass(e.modifierClass+e.type),s.removeClass(e.modifierClass+t.params.direction),t.pagination.bullets&&t.pagination.bullets.removeClass&&t.pagination.bullets.removeClass(e.bulletActiveClass),e.clickable&&s.off("click",U(e.bulletClass))}a("init",(()=>{h(),u(),p()})),a("activeIndexChange",(()=>{(t.params.loop||void 0===t.snapIndex)&&p()})),a("snapIndexChange",(()=>{t.params.loop||p()})),a("slidesLengthChange",(()=>{t.params.loop&&(u(),p())})),a("snapGridLengthChange",(()=>{t.params.loop||(u(),p())})),a("destroy",(()=>{m()})),a("enable disable",(()=>{const{$el:e}=t.pagination;e&&e[t.enabled?"removeClass":"addClass"](t.params.pagination.lockClass)})),a("lock unlock",(()=>{p()})),a("click",((e,s)=>{const a=s.target,{$el:r}=t.pagination;if(t.params.pagination.el&&t.params.pagination.hideOnClick&&r.length>0&&!d(a).hasClass(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&a===t.navigation.nextEl||t.navigation.prevEl&&a===t.navigation.prevEl))return;const e=r.hasClass(t.params.pagination.hiddenClass);i(!0===e?"paginationShow":"paginationHide"),r.toggleClass(t.params.pagination.hiddenClass)}})),Object.assign(t.pagination,{render:u,update:p,init:h,destroy:m})},function(e){let{swiper:t,extendParams:s,on:i,emit:r}=e;const n=a();let l,o,c,u,h=!1,m=null,f=null;function g(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e,rtlTranslate:s,progress:a}=t,{$dragEl:i,$el:r}=e,n=t.params.scrollbar;let l=o,d=(c-o)*a;s?(d=-d,d>0?(l=o-d,d=0):-d+o>c&&(l=c+d)):d<0?(l=o+d,d=0):d+o>c&&(l=c-d),t.isHorizontal()?(i.transform(`translate3d(${d}px, 0, 0)`),i[0].style.width=`${l}px`):(i.transform(`translate3d(0px, ${d}px, 0)`),i[0].style.height=`${l}px`),n.hide&&(clearTimeout(m),r[0].style.opacity=1,m=setTimeout((()=>{r[0].style.opacity=0,r.transition(400)}),1e3))}function v(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e}=t,{$dragEl:s,$el:a}=e;s[0].style.width="",s[0].style.height="",c=t.isHorizontal()?a[0].offsetWidth:a[0].offsetHeight,u=t.size/(t.virtualSize+t.params.slidesOffsetBefore-(t.params.centeredSlides?t.snapGrid[0]:0)),o="auto"===t.params.scrollbar.dragSize?c*u:parseInt(t.params.scrollbar.dragSize,10),t.isHorizontal()?s[0].style.width=`${o}px`:s[0].style.height=`${o}px`,a[0].style.display=u>=1?"none":"",t.params.scrollbar.hide&&(a[0].style.opacity=0),t.params.watchOverflow&&t.enabled&&e.$el[t.isLocked?"addClass":"removeClass"](t.params.scrollbar.lockClass)}function w(e){return t.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientX:e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientY:e.clientY}function b(e){const{scrollbar:s,rtlTranslate:a}=t,{$el:i}=s;let r;r=(w(e)-i.offset()[t.isHorizontal()?"left":"top"]-(null!==l?l:o/2))/(c-o),r=Math.max(Math.min(r,1),0),a&&(r=1-r);const n=t.minTranslate()+(t.maxTranslate()-t.minTranslate())*r;t.updateProgress(n),t.setTranslate(n),t.updateActiveIndex(),t.updateSlidesClasses()}function x(e){const s=t.params.scrollbar,{scrollbar:a,$wrapperEl:i}=t,{$el:n,$dragEl:o}=a;h=!0,l=e.target===o[0]||e.target===o?w(e)-e.target.getBoundingClientRect()[t.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),i.transition(100),o.transition(100),b(e),clearTimeout(f),n.transition(0),s.hide&&n.css("opacity",1),t.params.cssMode&&t.$wrapperEl.css("scroll-snap-type","none"),r("scrollbarDragStart",e)}function y(e){const{scrollbar:s,$wrapperEl:a}=t,{$el:i,$dragEl:n}=s;h&&(e.preventDefault?e.preventDefault():e.returnValue=!1,b(e),a.transition(0),i.transition(0),n.transition(0),r("scrollbarDragMove",e))}function E(e){const s=t.params.scrollbar,{scrollbar:a,$wrapperEl:i}=t,{$el:n}=a;h&&(h=!1,t.params.cssMode&&(t.$wrapperEl.css("scroll-snap-type",""),i.transition("")),s.hide&&(clearTimeout(f),f=p((()=>{n.css("opacity",0),n.transition(400)}),1e3)),r("scrollbarDragEnd",e),s.snapOnRelease&&t.slideToClosest())}function T(e){const{scrollbar:s,touchEventsTouch:a,touchEventsDesktop:i,params:r,support:l}=t,o=s.$el[0],d=!(!l.passiveListener||!r.passiveListeners)&&{passive:!1,capture:!1},c=!(!l.passiveListener||!r.passiveListeners)&&{passive:!0,capture:!1};if(!o)return;const p="on"===e?"addEventListener":"removeEventListener";l.touch?(o[p](a.start,x,d),o[p](a.move,y,d),o[p](a.end,E,c)):(o[p](i.start,x,d),n[p](i.move,y,d),n[p](i.end,E,c))}function C(){const{scrollbar:e,$el:s}=t;t.params.scrollbar=F(t,t.originalParams.scrollbar,t.params.scrollbar,{el:"swiper-scrollbar"});const a=t.params.scrollbar;if(!a.el)return;let i=d(a.el);t.params.uniqueNavElements&&"string"==typeof a.el&&i.length>1&&1===s.find(a.el).length&&(i=s.find(a.el));let r=i.find(`.${t.params.scrollbar.dragClass}`);0===r.length&&(r=d(`<div class="${t.params.scrollbar.dragClass}"></div>`),i.append(r)),Object.assign(e,{$el:i,el:i[0],$dragEl:r,dragEl:r[0]}),a.draggable&&t.params.scrollbar.el&&T("on"),i&&i[t.enabled?"removeClass":"addClass"](t.params.scrollbar.lockClass)}function $(){t.params.scrollbar.el&&T("off")}s({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag"}}),t.scrollbar={el:null,dragEl:null,$el:null,$dragEl:null},i("init",(()=>{C(),v(),g()})),i("update resize observerUpdate lock unlock",(()=>{v()})),i("setTranslate",(()=>{g()})),i("setTransition",((e,s)=>{!function(e){t.params.scrollbar.el&&t.scrollbar.el&&t.scrollbar.$dragEl.transition(e)}(s)})),i("enable disable",(()=>{const{$el:e}=t.scrollbar;e&&e[t.enabled?"removeClass":"addClass"](t.params.scrollbar.lockClass)})),i("destroy",(()=>{$()})),Object.assign(t.scrollbar,{updateSize:v,setTranslate:g,init:C,destroy:$})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({parallax:{enabled:!1}});const i=(e,s)=>{const{rtl:a}=t,i=d(e),r=a?-1:1,n=i.attr("data-swiper-parallax")||"0";let l=i.attr("data-swiper-parallax-x"),o=i.attr("data-swiper-parallax-y");const c=i.attr("data-swiper-parallax-scale"),p=i.attr("data-swiper-parallax-opacity");if(l||o?(l=l||"0",o=o||"0"):t.isHorizontal()?(l=n,o="0"):(o=n,l="0"),l=l.indexOf("%")>=0?parseInt(l,10)*s*r+"%":l*s*r+"px",o=o.indexOf("%")>=0?parseInt(o,10)*s+"%":o*s+"px",null!=p){const e=p-(p-1)*(1-Math.abs(s));i[0].style.opacity=e}if(null==c)i.transform(`translate3d(${l}, ${o}, 0px)`);else{const e=c-(c-1)*(1-Math.abs(s));i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`)}},r=()=>{const{$el:e,slides:s,progress:a,snapGrid:r}=t;e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{i(e,a)})),s.each(((e,s)=>{let n=e.progress;t.params.slidesPerGroup>1&&"auto"!==t.params.slidesPerView&&(n+=Math.ceil(s/2)-a*(r.length-1)),n=Math.min(Math.max(n,-1),1),d(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{i(e,n)}))}))};a("beforeInit",(()=>{t.params.parallax.enabled&&(t.params.watchSlidesProgress=!0,t.originalParams.watchSlidesProgress=!0)})),a("init",(()=>{t.params.parallax.enabled&&r()})),a("setTranslate",(()=>{t.params.parallax.enabled&&r()})),a("setTransition",((e,s)=>{t.params.parallax.enabled&&function(e){void 0===e&&(e=t.params.speed);const{$el:s}=t;s.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((t=>{const s=d(t);let a=parseInt(s.attr("data-swiper-parallax-duration"),10)||e;0===e&&(a=0),s.transition(a)}))}(s)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();s({zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}}),t.zoom={enabled:!1};let l,o,c,p=1,u=!1;const m={$slideEl:void 0,slideWidth:void 0,slideHeight:void 0,$imageEl:void 0,$imageWrapEl:void 0,maxRatio:3},f={isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},g={x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0};let v=1;function w(e){if(e.targetTouches.length<2)return 1;const t=e.targetTouches[0].pageX,s=e.targetTouches[0].pageY,a=e.targetTouches[1].pageX,i=e.targetTouches[1].pageY;return Math.sqrt((a-t)**2+(i-s)**2)}function b(e){const s=t.support,a=t.params.zoom;if(o=!1,c=!1,!s.gestures){if("touchstart"!==e.type||"touchstart"===e.type&&e.targetTouches.length<2)return;o=!0,m.scaleStart=w(e)}m.$slideEl&&m.$slideEl.length||(m.$slideEl=d(e.target).closest(`.${t.params.slideClass}`),0===m.$slideEl.length&&(m.$slideEl=t.slides.eq(t.activeIndex)),m.$imageEl=m.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),m.$imageWrapEl=m.$imageEl.parent(`.${a.containerClass}`),m.maxRatio=m.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,0!==m.$imageWrapEl.length)?(m.$imageEl&&m.$imageEl.transition(0),u=!0):m.$imageEl=void 0}function x(e){const s=t.support,a=t.params.zoom,i=t.zoom;if(!s.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;c=!0,m.scaleMove=w(e)}m.$imageEl&&0!==m.$imageEl.length?(s.gestures?i.scale=e.scale*p:i.scale=m.scaleMove/m.scaleStart*p,i.scale>m.maxRatio&&(i.scale=m.maxRatio-1+(i.scale-m.maxRatio+1)**.5),i.scale<a.minRatio&&(i.scale=a.minRatio+1-(a.minRatio-i.scale+1)**.5),m.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)):"gesturechange"===e.type&&b(e)}function y(e){const s=t.device,a=t.support,i=t.params.zoom,r=t.zoom;if(!a.gestures){if(!o||!c)return;if("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2&&!s.android)return;o=!1,c=!1}m.$imageEl&&0!==m.$imageEl.length&&(r.scale=Math.max(Math.min(r.scale,m.maxRatio),i.minRatio),m.$imageEl.transition(t.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`),p=r.scale,u=!1,1===r.scale&&(m.$slideEl=void 0))}function E(e){const s=t.zoom;if(!m.$imageEl||0===m.$imageEl.length)return;if(t.allowClick=!1,!f.isTouched||!m.$slideEl)return;f.isMoved||(f.width=m.$imageEl[0].offsetWidth,f.height=m.$imageEl[0].offsetHeight,f.startX=h(m.$imageWrapEl[0],"x")||0,f.startY=h(m.$imageWrapEl[0],"y")||0,m.slideWidth=m.$slideEl[0].offsetWidth,m.slideHeight=m.$slideEl[0].offsetHeight,m.$imageWrapEl.transition(0));const a=f.width*s.scale,i=f.height*s.scale;if(!(a<m.slideWidth&&i<m.slideHeight)){if(f.minX=Math.min(m.slideWidth/2-a/2,0),f.maxX=-f.minX,f.minY=Math.min(m.slideHeight/2-i/2,0),f.maxY=-f.minY,f.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,f.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!f.isMoved&&!u){if(t.isHorizontal()&&(Math.floor(f.minX)===Math.floor(f.startX)&&f.touchesCurrent.x<f.touchesStart.x||Math.floor(f.maxX)===Math.floor(f.startX)&&f.touchesCurrent.x>f.touchesStart.x))return void(f.isTouched=!1);if(!t.isHorizontal()&&(Math.floor(f.minY)===Math.floor(f.startY)&&f.touchesCurrent.y<f.touchesStart.y||Math.floor(f.maxY)===Math.floor(f.startY)&&f.touchesCurrent.y>f.touchesStart.y))return void(f.isTouched=!1)}e.cancelable&&e.preventDefault(),e.stopPropagation(),f.isMoved=!0,f.currentX=f.touchesCurrent.x-f.touchesStart.x+f.startX,f.currentY=f.touchesCurrent.y-f.touchesStart.y+f.startY,f.currentX<f.minX&&(f.currentX=f.minX+1-(f.minX-f.currentX+1)**.8),f.currentX>f.maxX&&(f.currentX=f.maxX-1+(f.currentX-f.maxX+1)**.8),f.currentY<f.minY&&(f.currentY=f.minY+1-(f.minY-f.currentY+1)**.8),f.currentY>f.maxY&&(f.currentY=f.maxY-1+(f.currentY-f.maxY+1)**.8),g.prevPositionX||(g.prevPositionX=f.touchesCurrent.x),g.prevPositionY||(g.prevPositionY=f.touchesCurrent.y),g.prevTime||(g.prevTime=Date.now()),g.x=(f.touchesCurrent.x-g.prevPositionX)/(Date.now()-g.prevTime)/2,g.y=(f.touchesCurrent.y-g.prevPositionY)/(Date.now()-g.prevTime)/2,Math.abs(f.touchesCurrent.x-g.prevPositionX)<2&&(g.x=0),Math.abs(f.touchesCurrent.y-g.prevPositionY)<2&&(g.y=0),g.prevPositionX=f.touchesCurrent.x,g.prevPositionY=f.touchesCurrent.y,g.prevTime=Date.now(),m.$imageWrapEl.transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)}}function T(){const e=t.zoom;m.$slideEl&&t.previousIndex!==t.activeIndex&&(m.$imageEl&&m.$imageEl.transform("translate3d(0,0,0) scale(1)"),m.$imageWrapEl&&m.$imageWrapEl.transform("translate3d(0,0,0)"),e.scale=1,p=1,m.$slideEl=void 0,m.$imageEl=void 0,m.$imageWrapEl=void 0)}function C(e){const s=t.zoom,a=t.params.zoom;if(m.$slideEl||(e&&e.target&&(m.$slideEl=d(e.target).closest(`.${t.params.slideClass}`)),m.$slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.$slideEl=t.$wrapperEl.children(`.${t.params.slideActiveClass}`):m.$slideEl=t.slides.eq(t.activeIndex)),m.$imageEl=m.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),m.$imageWrapEl=m.$imageEl.parent(`.${a.containerClass}`)),!m.$imageEl||0===m.$imageEl.length||!m.$imageWrapEl||0===m.$imageWrapEl.length)return;let i,r,l,o,c,u,h,g,v,w,b,x,y,E,T,C,$,S;t.params.cssMode&&(t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.touchAction="none"),m.$slideEl.addClass(`${a.zoomedSlideClass}`),void 0===f.touchesStart.x&&e?(i="touchend"===e.type?e.changedTouches[0].pageX:e.pageX,r="touchend"===e.type?e.changedTouches[0].pageY:e.pageY):(i=f.touchesStart.x,r=f.touchesStart.y),s.scale=m.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,p=m.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,e?($=m.$slideEl[0].offsetWidth,S=m.$slideEl[0].offsetHeight,l=m.$slideEl.offset().left+n.scrollX,o=m.$slideEl.offset().top+n.scrollY,c=l+$/2-i,u=o+S/2-r,v=m.$imageEl[0].offsetWidth,w=m.$imageEl[0].offsetHeight,b=v*s.scale,x=w*s.scale,y=Math.min($/2-b/2,0),E=Math.min(S/2-x/2,0),T=-y,C=-E,h=c*s.scale,g=u*s.scale,h<y&&(h=y),h>T&&(h=T),g<E&&(g=E),g>C&&(g=C)):(h=0,g=0),m.$imageWrapEl.transition(300).transform(`translate3d(${h}px, ${g}px,0)`),m.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`)}function $(){const e=t.zoom,s=t.params.zoom;m.$slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.$slideEl=t.$wrapperEl.children(`.${t.params.slideActiveClass}`):m.$slideEl=t.slides.eq(t.activeIndex),m.$imageEl=m.$slideEl.find(`.${s.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),m.$imageWrapEl=m.$imageEl.parent(`.${s.containerClass}`)),m.$imageEl&&0!==m.$imageEl.length&&m.$imageWrapEl&&0!==m.$imageWrapEl.length&&(t.params.cssMode&&(t.wrapperEl.style.overflow="",t.wrapperEl.style.touchAction=""),e.scale=1,p=1,m.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),m.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),m.$slideEl.removeClass(`${s.zoomedSlideClass}`),m.$slideEl=void 0)}function S(e){const s=t.zoom;s.scale&&1!==s.scale?$():C(e)}function M(){const e=t.support;return{passiveListener:!("touchstart"!==t.touchEvents.start||!e.passiveListener||!t.params.passiveListeners)&&{passive:!0,capture:!1},activeListenerWithCapture:!e.passiveListener||{passive:!1,capture:!0}}}function P(){return`.${t.params.slideClass}`}function k(e){const{passiveListener:s}=M(),a=P();t.$wrapperEl[e]("gesturestart",a,b,s),t.$wrapperEl[e]("gesturechange",a,x,s),t.$wrapperEl[e]("gestureend",a,y,s)}function z(){l||(l=!0,k("on"))}function O(){l&&(l=!1,k("off"))}function I(){const e=t.zoom;if(e.enabled)return;e.enabled=!0;const s=t.support,{passiveListener:a,activeListenerWithCapture:i}=M(),r=P();s.gestures?(t.$wrapperEl.on(t.touchEvents.start,z,a),t.$wrapperEl.on(t.touchEvents.end,O,a)):"touchstart"===t.touchEvents.start&&(t.$wrapperEl.on(t.touchEvents.start,r,b,a),t.$wrapperEl.on(t.touchEvents.move,r,x,i),t.$wrapperEl.on(t.touchEvents.end,r,y,a),t.touchEvents.cancel&&t.$wrapperEl.on(t.touchEvents.cancel,r,y,a)),t.$wrapperEl.on(t.touchEvents.move,`.${t.params.zoom.containerClass}`,E,i)}function L(){const e=t.zoom;if(!e.enabled)return;const s=t.support;e.enabled=!1;const{passiveListener:a,activeListenerWithCapture:i}=M(),r=P();s.gestures?(t.$wrapperEl.off(t.touchEvents.start,z,a),t.$wrapperEl.off(t.touchEvents.end,O,a)):"touchstart"===t.touchEvents.start&&(t.$wrapperEl.off(t.touchEvents.start,r,b,a),t.$wrapperEl.off(t.touchEvents.move,r,x,i),t.$wrapperEl.off(t.touchEvents.end,r,y,a),t.touchEvents.cancel&&t.$wrapperEl.off(t.touchEvents.cancel,r,y,a)),t.$wrapperEl.off(t.touchEvents.move,`.${t.params.zoom.containerClass}`,E,i)}Object.defineProperty(t.zoom,"scale",{get:()=>v,set(e){if(v!==e){const t=m.$imageEl?m.$imageEl[0]:void 0,s=m.$slideEl?m.$slideEl[0]:void 0;i("zoomChange",e,t,s)}v=e}}),a("init",(()=>{t.params.zoom.enabled&&I()})),a("destroy",(()=>{L()})),a("touchStart",((e,s)=>{t.zoom.enabled&&function(e){const s=t.device;m.$imageEl&&0!==m.$imageEl.length&&(f.isTouched||(s.android&&e.cancelable&&e.preventDefault(),f.isTouched=!0,f.touchesStart.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,f.touchesStart.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY))}(s)})),a("touchEnd",((e,s)=>{t.zoom.enabled&&function(){const e=t.zoom;if(!m.$imageEl||0===m.$imageEl.length)return;if(!f.isTouched||!f.isMoved)return f.isTouched=!1,void(f.isMoved=!1);f.isTouched=!1,f.isMoved=!1;let s=300,a=300;const i=g.x*s,r=f.currentX+i,n=g.y*a,l=f.currentY+n;0!==g.x&&(s=Math.abs((r-f.currentX)/g.x)),0!==g.y&&(a=Math.abs((l-f.currentY)/g.y));const o=Math.max(s,a);f.currentX=r,f.currentY=l;const d=f.width*e.scale,c=f.height*e.scale;f.minX=Math.min(m.slideWidth/2-d/2,0),f.maxX=-f.minX,f.minY=Math.min(m.slideHeight/2-c/2,0),f.maxY=-f.minY,f.currentX=Math.max(Math.min(f.currentX,f.maxX),f.minX),f.currentY=Math.max(Math.min(f.currentY,f.maxY),f.minY),m.$imageWrapEl.transition(o).transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)}()})),a("doubleTap",((e,s)=>{!t.animating&&t.params.zoom.enabled&&t.zoom.enabled&&t.params.zoom.toggle&&S(s)})),a("transitionEnd",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&T()})),a("slideChange",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&t.params.cssMode&&T()})),Object.assign(t.zoom,{enable:I,disable:L,in:C,out:$,toggle:S})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;s({lazy:{checkInView:!1,enabled:!1,loadPrevNext:!1,loadPrevNextAmount:1,loadOnTransitionStart:!1,scrollingElement:"",elementClass:"swiper-lazy",loadingClass:"swiper-lazy-loading",loadedClass:"swiper-lazy-loaded",preloaderClass:"swiper-lazy-preloader"}}),t.lazy={};let n=!1,l=!1;function o(e,s){void 0===s&&(s=!0);const a=t.params.lazy;if(void 0===e)return;if(0===t.slides.length)return;const r=t.virtual&&t.params.virtual.enabled?t.$wrapperEl.children(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`):t.slides.eq(e),n=r.find(`.${a.elementClass}:not(.${a.loadedClass}):not(.${a.loadingClass})`);!r.hasClass(a.elementClass)||r.hasClass(a.loadedClass)||r.hasClass(a.loadingClass)||n.push(r[0]),0!==n.length&&n.each((e=>{const n=d(e);n.addClass(a.loadingClass);const l=n.attr("data-background"),c=n.attr("data-src"),p=n.attr("data-srcset"),u=n.attr("data-sizes"),h=n.parent("picture");t.loadImage(n[0],c||l,p,u,!1,(()=>{if(null!=t&&t&&(!t||t.params)&&!t.destroyed){if(l?(n.css("background-image",`url("${l}")`),n.removeAttr("data-background")):(p&&(n.attr("srcset",p),n.removeAttr("data-srcset")),u&&(n.attr("sizes",u),n.removeAttr("data-sizes")),h.length&&h.children("source").each((e=>{const t=d(e);t.attr("data-srcset")&&(t.attr("srcset",t.attr("data-srcset")),t.removeAttr("data-srcset"))})),c&&(n.attr("src",c),n.removeAttr("data-src"))),n.addClass(a.loadedClass).removeClass(a.loadingClass),r.find(`.${a.preloaderClass}`).remove(),t.params.loop&&s){const e=r.attr("data-swiper-slide-index");if(r.hasClass(t.params.slideDuplicateClass)){o(t.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`).index(),!1)}else{o(t.$wrapperEl.children(`.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(),!1)}}i("lazyImageReady",r[0],n[0]),t.params.autoHeight&&t.updateAutoHeight()}})),i("lazyImageLoad",r[0],n[0])}))}function c(){const{$wrapperEl:e,params:s,slides:a,activeIndex:i}=t,r=t.virtual&&s.virtual.enabled,n=s.lazy;let c=s.slidesPerView;function p(t){if(r){if(e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`).length)return!0}else if(a[t])return!0;return!1}function u(e){return r?d(e).attr("data-swiper-slide-index"):d(e).index()}if("auto"===c&&(c=0),l||(l=!0),t.params.watchSlidesProgress)e.children(`.${s.slideVisibleClass}`).each((e=>{o(r?d(e).attr("data-swiper-slide-index"):d(e).index())}));else if(c>1)for(let e=i;e<i+c;e+=1)p(e)&&o(e);else o(i);if(n.loadPrevNext)if(c>1||n.loadPrevNextAmount&&n.loadPrevNextAmount>1){const e=n.loadPrevNextAmount,t=c,s=Math.min(i+t+Math.max(e,t),a.length),r=Math.max(i-Math.max(t,e),0);for(let e=i+c;e<s;e+=1)p(e)&&o(e);for(let e=r;e<i;e+=1)p(e)&&o(e)}else{const t=e.children(`.${s.slideNextClass}`);t.length>0&&o(u(t));const a=e.children(`.${s.slidePrevClass}`);a.length>0&&o(u(a))}}function p(){const e=r();if(!t||t.destroyed)return;const s=t.params.lazy.scrollingElement?d(t.params.lazy.scrollingElement):d(e),a=s[0]===e,i=a?e.innerWidth:s[0].offsetWidth,l=a?e.innerHeight:s[0].offsetHeight,o=t.$el.offset(),{rtlTranslate:u}=t;let h=!1;u&&(o.left-=t.$el[0].scrollLeft);const m=[[o.left,o.top],[o.left+t.width,o.top],[o.left,o.top+t.height],[o.left+t.width,o.top+t.height]];for(let e=0;e<m.length;e+=1){const t=m[e];if(t[0]>=0&&t[0]<=i&&t[1]>=0&&t[1]<=l){if(0===t[0]&&0===t[1])continue;h=!0}}const f=!("touchstart"!==t.touchEvents.start||!t.support.passiveListener||!t.params.passiveListeners)&&{passive:!0,capture:!1};h?(c(),s.off("scroll",p,f)):n||(n=!0,s.on("scroll",p,f))}a("beforeInit",(()=>{t.params.lazy.enabled&&t.params.preloadImages&&(t.params.preloadImages=!1)})),a("init",(()=>{t.params.lazy.enabled&&(t.params.lazy.checkInView?p():c())})),a("scroll",(()=>{t.params.freeMode&&t.params.freeMode.enabled&&!t.params.freeMode.sticky&&c()})),a("scrollbarDragMove resize _freeModeNoMomentumRelease",(()=>{t.params.lazy.enabled&&(t.params.lazy.checkInView?p():c())})),a("transitionStart",(()=>{t.params.lazy.enabled&&(t.params.lazy.loadOnTransitionStart||!t.params.lazy.loadOnTransitionStart&&!l)&&(t.params.lazy.checkInView?p():c())})),a("transitionEnd",(()=>{t.params.lazy.enabled&&!t.params.lazy.loadOnTransitionStart&&(t.params.lazy.checkInView?p():c())})),a("slideChange",(()=>{const{lazy:e,cssMode:s,watchSlidesProgress:a,touchReleaseOnEdges:i,resistanceRatio:r}=t.params;e.enabled&&(s||a&&(i||0===r))&&c()})),Object.assign(t.lazy,{load:c,loadInSlide:o})},function(e){let{swiper:t,extendParams:s,on:a}=e;function i(e,t){const s=function(){let e,t,s;return(a,i)=>{for(t=-1,e=a.length;e-t>1;)s=e+t>>1,a[s]<=i?t=s:e=s;return e}}();let a,i;return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(i=s(this.x,e),a=i-1,(e-this.x[a])*(this.y[i]-this.y[a])/(this.x[i]-this.x[a])+this.y[a]):0},this}function r(){t.controller.control&&t.controller.spline&&(t.controller.spline=void 0,delete t.controller.spline)}s({controller:{control:void 0,inverse:!1,by:"slide"}}),t.controller={control:void 0},a("beforeInit",(()=>{t.controller.control=t.params.controller.control})),a("update",(()=>{r()})),a("resize",(()=>{r()})),a("observerUpdate",(()=>{r()})),a("setTranslate",((e,s,a)=>{t.controller.control&&t.controller.setTranslate(s,a)})),a("setTransition",((e,s,a)=>{t.controller.control&&t.controller.setTransition(s,a)})),Object.assign(t.controller,{setTranslate:function(e,s){const a=t.controller.control;let r,n;const l=t.constructor;function o(e){const s=t.rtlTranslate?-t.translate:t.translate;"slide"===t.params.controller.by&&(!function(e){t.controller.spline||(t.controller.spline=t.params.loop?new i(t.slidesGrid,e.slidesGrid):new i(t.snapGrid,e.snapGrid))}(e),n=-t.controller.spline.interpolate(-s)),n&&"container"!==t.params.controller.by||(r=(e.maxTranslate()-e.minTranslate())/(t.maxTranslate()-t.minTranslate()),n=(s-t.minTranslate())*r+e.minTranslate()),t.params.controller.inverse&&(n=e.maxTranslate()-n),e.updateProgress(n),e.setTranslate(n,t),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(a))for(let e=0;e<a.length;e+=1)a[e]!==s&&a[e]instanceof l&&o(a[e]);else a instanceof l&&s!==a&&o(a)},setTransition:function(e,s){const a=t.constructor,i=t.controller.control;let r;function n(s){s.setTransition(e,t),0!==e&&(s.transitionStart(),s.params.autoHeight&&p((()=>{s.updateAutoHeight()})),s.$wrapperEl.transitionEnd((()=>{i&&(s.params.loop&&"slide"===t.params.controller.by&&s.loopFix(),s.transitionEnd())})))}if(Array.isArray(i))for(r=0;r<i.length;r+=1)i[r]!==s&&i[r]instanceof a&&n(i[r]);else i instanceof a&&s!==i&&n(i)}})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",slideLabelMessage:"{{index}} / {{slidesLength}}",containerMessage:null,containerRoleDescriptionMessage:null,itemRoleDescriptionMessage:null,slideRole:"group"}});let i=null;function r(e){const t=i;0!==t.length&&(t.html(""),t.html(e))}function n(e){e.attr("tabIndex","0")}function l(e){e.attr("tabIndex","-1")}function o(e,t){e.attr("role",t)}function c(e,t){e.attr("aria-roledescription",t)}function p(e,t){e.attr("aria-label",t)}function u(e){e.attr("aria-disabled",!0)}function h(e){e.attr("aria-disabled",!1)}function m(e){if(13!==e.keyCode&&32!==e.keyCode)return;const s=t.params.a11y,a=d(e.target);t.navigation&&t.navigation.$nextEl&&a.is(t.navigation.$nextEl)&&(t.isEnd&&!t.params.loop||t.slideNext(),t.isEnd?r(s.lastSlideMessage):r(s.nextSlideMessage)),t.navigation&&t.navigation.$prevEl&&a.is(t.navigation.$prevEl)&&(t.isBeginning&&!t.params.loop||t.slidePrev(),t.isBeginning?r(s.firstSlideMessage):r(s.prevSlideMessage)),t.pagination&&a.is(U(t.params.pagination.bulletClass))&&a[0].click()}function f(){return t.pagination&&t.pagination.bullets&&t.pagination.bullets.length}function g(){return f()&&t.params.pagination.clickable}const v=(e,t,s)=>{n(e),"BUTTON"!==e[0].tagName&&(o(e,"button"),e.on("keydown",m)),p(e,s),function(e,t){e.attr("aria-controls",t)}(e,t)},w=e=>{const s=e.target.closest(`.${t.params.slideClass}`);if(!s||!t.slides.includes(s))return;const a=t.slides.indexOf(s)===t.activeIndex,i=t.params.watchSlidesProgress&&t.visibleSlides&&t.visibleSlides.includes(s);a||i||t.slideTo(t.slides.indexOf(s),0)};function b(){const e=t.params.a11y;t.$el.append(i);const s=t.$el;e.containerRoleDescriptionMessage&&c(s,e.containerRoleDescriptionMessage),e.containerMessage&&p(s,e.containerMessage);const a=t.$wrapperEl,r=a.attr("id")||`swiper-wrapper-${n=16,void 0===n&&(n=16),"x".repeat(n).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}`;var n;const l=t.params.autoplay&&t.params.autoplay.enabled?"off":"polite";var u;u=r,a.attr("id",u),function(e,t){e.attr("aria-live",t)}(a,l),e.itemRoleDescriptionMessage&&c(d(t.slides),e.itemRoleDescriptionMessage),o(d(t.slides),e.slideRole);const h=t.params.loop?t.slides.filter((e=>!e.classList.contains(t.params.slideDuplicateClass))).length:t.slides.length;let f,b;t.slides.each(((s,a)=>{const i=d(s),r=t.params.loop?parseInt(i.attr("data-swiper-slide-index"),10):a;p(i,e.slideLabelMessage.replace(/\{\{index\}\}/,r+1).replace(/\{\{slidesLength\}\}/,h))})),t.navigation&&t.navigation.$nextEl&&(f=t.navigation.$nextEl),t.navigation&&t.navigation.$prevEl&&(b=t.navigation.$prevEl),f&&f.length&&v(f,r,e.nextSlideMessage),b&&b.length&&v(b,r,e.prevSlideMessage),g()&&t.pagination.$el.on("keydown",U(t.params.pagination.bulletClass),m),t.$el.on("focus",w,!0)}a("beforeInit",(()=>{i=d(`<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)})),a("afterInit",(()=>{t.params.a11y.enabled&&b()})),a("fromEdge toEdge afterInit lock unlock",(()=>{t.params.a11y.enabled&&function(){if(t.params.loop||t.params.rewind||!t.navigation)return;const{$nextEl:e,$prevEl:s}=t.navigation;s&&s.length>0&&(t.isBeginning?(u(s),l(s)):(h(s),n(s))),e&&e.length>0&&(t.isEnd?(u(e),l(e)):(h(e),n(e)))}()})),a("paginationUpdate",(()=>{t.params.a11y.enabled&&function(){const e=t.params.a11y;f()&&t.pagination.bullets.each((s=>{const a=d(s);t.params.pagination.clickable&&(n(a),t.params.pagination.renderBullet||(o(a,"button"),p(a,e.paginationBulletMessage.replace(/\{\{index\}\}/,a.index()+1)))),a.is(`.${t.params.pagination.bulletActiveClass}`)?a.attr("aria-current","true"):a.removeAttr("aria-current")}))}()})),a("destroy",(()=>{t.params.a11y.enabled&&function(){let e,s;i&&i.length>0&&i.remove(),t.navigation&&t.navigation.$nextEl&&(e=t.navigation.$nextEl),t.navigation&&t.navigation.$prevEl&&(s=t.navigation.$prevEl),e&&e.off("keydown",m),s&&s.off("keydown",m),g()&&t.pagination.$el.off("keydown",U(t.params.pagination.bulletClass),m),t.$el.off("focus",w,!0)}()}))},function(e){let{swiper:t,extendParams:s,on:a}=e;s({history:{enabled:!1,root:"",replaceState:!1,key:"slides"}});let i=!1,n={};const l=e=>e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),o=e=>{const t=r();let s;s=e?new URL(e):t.location;const a=s.pathname.slice(1).split("/").filter((e=>""!==e)),i=a.length;return{key:a[i-2],value:a[i-1]}},d=(e,s)=>{const a=r();if(!i||!t.params.history.enabled)return;let n;n=t.params.url?new URL(t.params.url):a.location;const o=t.slides.eq(s);let d=l(o.attr("data-history"));if(t.params.history.root.length>0){let s=t.params.history.root;"/"===s[s.length-1]&&(s=s.slice(0,s.length-1)),d=`${s}/${e}/${d}`}else n.pathname.includes(e)||(d=`${e}/${d}`);const c=a.history.state;c&&c.value===d||(t.params.history.replaceState?a.history.replaceState({value:d},null,d):a.history.pushState({value:d},null,d))},c=(e,s,a)=>{if(s)for(let i=0,r=t.slides.length;i<r;i+=1){const r=t.slides.eq(i);if(l(r.attr("data-history"))===s&&!r.hasClass(t.params.slideDuplicateClass)){const s=r.index();t.slideTo(s,e,a)}}else t.slideTo(0,e,a)},p=()=>{n=o(t.params.url),c(t.params.speed,t.paths.value,!1)};a("init",(()=>{t.params.history.enabled&&(()=>{const e=r();if(t.params.history){if(!e.history||!e.history.pushState)return t.params.history.enabled=!1,void(t.params.hashNavigation.enabled=!0);i=!0,n=o(t.params.url),(n.key||n.value)&&(c(0,n.value,t.params.runCallbacksOnInit),t.params.history.replaceState||e.addEventListener("popstate",p))}})()})),a("destroy",(()=>{t.params.history.enabled&&(()=>{const e=r();t.params.history.replaceState||e.removeEventListener("popstate",p)})()})),a("transitionEnd _freeModeNoMomentumRelease",(()=>{i&&d(t.params.history.key,t.activeIndex)})),a("slideChange",(()=>{i&&t.params.cssMode&&d(t.params.history.key,t.activeIndex)}))},function(e){let{swiper:t,extendParams:s,emit:i,on:n}=e,l=!1;const o=a(),c=r();s({hashNavigation:{enabled:!1,replaceState:!1,watchState:!1}});const p=()=>{i("hashChange");const e=o.location.hash.replace("#","");if(e!==t.slides.eq(t.activeIndex).attr("data-hash")){const s=t.$wrapperEl.children(`.${t.params.slideClass}[data-hash="${e}"]`).index();if(void 0===s)return;t.slideTo(s)}},u=()=>{if(l&&t.params.hashNavigation.enabled)if(t.params.hashNavigation.replaceState&&c.history&&c.history.replaceState)c.history.replaceState(null,null,`#${t.slides.eq(t.activeIndex).attr("data-hash")}`||""),i("hashSet");else{const e=t.slides.eq(t.activeIndex),s=e.attr("data-hash")||e.attr("data-history");o.location.hash=s||"",i("hashSet")}};n("init",(()=>{t.params.hashNavigation.enabled&&(()=>{if(!t.params.hashNavigation.enabled||t.params.history&&t.params.history.enabled)return;l=!0;const e=o.location.hash.replace("#","");if(e){const s=0;for(let a=0,i=t.slides.length;a<i;a+=1){const i=t.slides.eq(a);if((i.attr("data-hash")||i.attr("data-history"))===e&&!i.hasClass(t.params.slideDuplicateClass)){const e=i.index();t.slideTo(e,s,t.params.runCallbacksOnInit,!0)}}}t.params.hashNavigation.watchState&&d(c).on("hashchange",p)})()})),n("destroy",(()=>{t.params.hashNavigation.enabled&&t.params.hashNavigation.watchState&&d(c).off("hashchange",p)})),n("transitionEnd _freeModeNoMomentumRelease",(()=>{l&&u()})),n("slideChange",(()=>{l&&t.params.cssMode&&u()}))},function(e){let t,{swiper:s,extendParams:i,on:r,emit:n}=e;function l(){const e=s.slides.eq(s.activeIndex);let a=s.params.autoplay.delay;e.attr("data-swiper-autoplay")&&(a=e.attr("data-swiper-autoplay")||s.params.autoplay.delay),clearTimeout(t),t=p((()=>{let e;s.params.autoplay.reverseDirection?s.params.loop?(s.loopFix(),e=s.slidePrev(s.params.speed,!0,!0),n("autoplay")):s.isBeginning?s.params.autoplay.stopOnLastSlide?d():(e=s.slideTo(s.slides.length-1,s.params.speed,!0,!0),n("autoplay")):(e=s.slidePrev(s.params.speed,!0,!0),n("autoplay")):s.params.loop?(s.loopFix(),e=s.slideNext(s.params.speed,!0,!0),n("autoplay")):s.isEnd?s.params.autoplay.stopOnLastSlide?d():(e=s.slideTo(0,s.params.speed,!0,!0),n("autoplay")):(e=s.slideNext(s.params.speed,!0,!0),n("autoplay")),(s.params.cssMode&&s.autoplay.running||!1===e)&&l()}),a)}function o(){return void 0===t&&(!s.autoplay.running&&(s.autoplay.running=!0,n("autoplayStart"),l(),!0))}function d(){return!!s.autoplay.running&&(void 0!==t&&(t&&(clearTimeout(t),t=void 0),s.autoplay.running=!1,n("autoplayStop"),!0))}function c(e){s.autoplay.running&&(s.autoplay.paused||(t&&clearTimeout(t),s.autoplay.paused=!0,0!==e&&s.params.autoplay.waitForTransition?["transitionend","webkitTransitionEnd"].forEach((e=>{s.$wrapperEl[0].addEventListener(e,h)})):(s.autoplay.paused=!1,l())))}function u(){const e=a();"hidden"===e.visibilityState&&s.autoplay.running&&c(),"visible"===e.visibilityState&&s.autoplay.paused&&(l(),s.autoplay.paused=!1)}function h(e){s&&!s.destroyed&&s.$wrapperEl&&e.target===s.$wrapperEl[0]&&(["transitionend","webkitTransitionEnd"].forEach((e=>{s.$wrapperEl[0].removeEventListener(e,h)})),s.autoplay.paused=!1,s.autoplay.running?l():d())}function m(){s.params.autoplay.disableOnInteraction?d():(n("autoplayPause"),c()),["transitionend","webkitTransitionEnd"].forEach((e=>{s.$wrapperEl[0].removeEventListener(e,h)}))}function f(){s.params.autoplay.disableOnInteraction||(s.autoplay.paused=!1,n("autoplayResume"),l())}s.autoplay={running:!1,paused:!1},i({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}}),r("init",(()=>{if(s.params.autoplay.enabled){o();a().addEventListener("visibilitychange",u),s.params.autoplay.pauseOnMouseEnter&&(s.$el.on("mouseenter",m),s.$el.on("mouseleave",f))}})),r("beforeTransitionStart",((e,t,a)=>{s.autoplay.running&&(a||!s.params.autoplay.disableOnInteraction?s.autoplay.pause(t):d())})),r("sliderFirstMove",(()=>{s.autoplay.running&&(s.params.autoplay.disableOnInteraction?d():c())})),r("touchEnd",(()=>{s.params.cssMode&&s.autoplay.paused&&!s.params.autoplay.disableOnInteraction&&l()})),r("destroy",(()=>{s.$el.off("mouseenter",m),s.$el.off("mouseleave",f),s.autoplay.running&&d();a().removeEventListener("visibilitychange",u)})),Object.assign(s.autoplay,{pause:c,run:l,start:o,stop:d})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let i=!1,r=!1;function n(){const e=t.thumbs.swiper;if(!e)return;const s=e.clickedIndex,a=e.clickedSlide;if(a&&d(a).hasClass(t.params.thumbs.slideThumbActiveClass))return;if(null==s)return;let i;if(i=e.params.loop?parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"),10):s,t.params.loop){let e=t.activeIndex;t.slides.eq(e).hasClass(t.params.slideDuplicateClass)&&(t.loopFix(),t._clientLeft=t.$wrapperEl[0].clientLeft,e=t.activeIndex);const s=t.slides.eq(e).prevAll(`[data-swiper-slide-index="${i}"]`).eq(0).index(),a=t.slides.eq(e).nextAll(`[data-swiper-slide-index="${i}"]`).eq(0).index();i=void 0===s?a:void 0===a?s:a-e<e-s?a:s}t.slideTo(i)}function l(){const{thumbs:e}=t.params;if(i)return!1;i=!0;const s=t.constructor;if(e.swiper instanceof s)t.thumbs.swiper=e.swiper,Object.assign(t.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(t.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1});else if(m(e.swiper)){const a=Object.assign({},e.swiper);Object.assign(a,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper=new s(a),r=!0}return t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),t.thumbs.swiper.on("tap",n),!0}function o(e){const s=t.thumbs.swiper;if(!s)return;const a="auto"===s.params.slidesPerView?s.slidesPerViewDynamic():s.params.slidesPerView,i=t.params.thumbs.autoScrollOffset,r=i&&!s.params.loop;if(t.realIndex!==s.realIndex||r){let n,l,o=s.activeIndex;if(s.params.loop){s.slides.eq(o).hasClass(s.params.slideDuplicateClass)&&(s.loopFix(),s._clientLeft=s.$wrapperEl[0].clientLeft,o=s.activeIndex);const e=s.slides.eq(o).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index(),a=s.slides.eq(o).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();n=void 0===e?a:void 0===a?e:a-o==o-e?s.params.slidesPerGroup>1?a:o:a-o<o-e?a:e,l=t.activeIndex>t.previousIndex?"next":"prev"}else n=t.realIndex,l=n>t.previousIndex?"next":"prev";r&&(n+="next"===l?i:-1*i),s.visibleSlidesIndexes&&s.visibleSlidesIndexes.indexOf(n)<0&&(s.params.centeredSlides?n=n>o?n-Math.floor(a/2)+1:n+Math.floor(a/2)-1:n>o&&s.params.slidesPerGroup,s.slideTo(n,e?0:void 0))}let n=1;const l=t.params.thumbs.slideThumbActiveClass;if(t.params.slidesPerView>1&&!t.params.centeredSlides&&(n=t.params.slidesPerView),t.params.thumbs.multipleActiveThumbs||(n=1),n=Math.floor(n),s.slides.removeClass(l),s.params.loop||s.params.virtual&&s.params.virtual.enabled)for(let e=0;e<n;e+=1)s.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex+e}"]`).addClass(l);else for(let e=0;e<n;e+=1)s.slides.eq(t.realIndex+e).addClass(l)}t.thumbs={swiper:null},a("beforeInit",(()=>{const{thumbs:e}=t.params;e&&e.swiper&&(l(),o(!0))})),a("slideChange update resize observerUpdate",(()=>{t.thumbs.swiper&&o()})),a("setTransition",((e,s)=>{const a=t.thumbs.swiper;a&&a.setTransition(s)})),a("beforeDestroy",(()=>{const e=t.thumbs.swiper;e&&r&&e&&e.destroy()})),Object.assign(t.thumbs,{init:l,update:o})},function(e){let{swiper:t,extendParams:s,emit:a,once:i}=e;s({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}}),Object.assign(t,{freeMode:{onTouchStart:function(){const e=t.getTranslate();t.setTranslate(e),t.setTransition(0),t.touchEventsData.velocities.length=0,t.freeMode.onTouchEnd({currentPos:t.rtl?t.translate:-t.translate})},onTouchMove:function(){const{touchEventsData:e,touches:s}=t;0===e.velocities.length&&e.velocities.push({position:s[t.isHorizontal()?"startX":"startY"],time:e.touchStartTime}),e.velocities.push({position:s[t.isHorizontal()?"currentX":"currentY"],time:u()})},onTouchEnd:function(e){let{currentPos:s}=e;const{params:r,$wrapperEl:n,rtlTranslate:l,snapGrid:o,touchEventsData:d}=t,c=u()-d.touchStartTime;if(s<-t.minTranslate())t.slideTo(t.activeIndex);else if(s>-t.maxTranslate())t.slides.length<o.length?t.slideTo(o.length-1):t.slideTo(t.slides.length-1);else{if(r.freeMode.momentum){if(d.velocities.length>1){const e=d.velocities.pop(),s=d.velocities.pop(),a=e.position-s.position,i=e.time-s.time;t.velocity=a/i,t.velocity/=2,Math.abs(t.velocity)<r.freeMode.minimumVelocity&&(t.velocity=0),(i>150||u()-e.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=r.freeMode.momentumVelocityRatio,d.velocities.length=0;let e=1e3*r.freeMode.momentumRatio;const s=t.velocity*e;let c=t.translate+s;l&&(c=-c);let p,h=!1;const m=20*Math.abs(t.velocity)*r.freeMode.momentumBounceRatio;let f;if(c<t.maxTranslate())r.freeMode.momentumBounce?(c+t.maxTranslate()<-m&&(c=t.maxTranslate()-m),p=t.maxTranslate(),h=!0,d.allowMomentumBounce=!0):c=t.maxTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(c>t.minTranslate())r.freeMode.momentumBounce?(c-t.minTranslate()>m&&(c=t.minTranslate()+m),p=t.minTranslate(),h=!0,d.allowMomentumBounce=!0):c=t.minTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(r.freeMode.sticky){let e;for(let t=0;t<o.length;t+=1)if(o[t]>-c){e=t;break}c=Math.abs(o[e]-c)<Math.abs(o[e-1]-c)||"next"===t.swipeDirection?o[e]:o[e-1],c=-c}if(f&&i("transitionEnd",(()=>{t.loopFix()})),0!==t.velocity){if(e=l?Math.abs((-c-t.translate)/t.velocity):Math.abs((c-t.translate)/t.velocity),r.freeMode.sticky){const s=Math.abs((l?-c:c)-t.translate),a=t.slidesSizesGrid[t.activeIndex];e=s<a?r.speed:s<2*a?1.5*r.speed:2.5*r.speed}}else if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode.momentumBounce&&h?(t.updateProgress(p),t.setTransition(e),t.setTranslate(c),t.transitionStart(!0,t.swipeDirection),t.animating=!0,n.transitionEnd((()=>{t&&!t.destroyed&&d.allowMomentumBounce&&(a("momentumBounce"),t.setTransition(r.speed),setTimeout((()=>{t.setTranslate(p),n.transitionEnd((()=>{t&&!t.destroyed&&t.transitionEnd()}))}),0))}))):t.velocity?(a("_freeModeNoMomentumRelease"),t.updateProgress(c),t.setTransition(e),t.setTranslate(c),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,n.transitionEnd((()=>{t&&!t.destroyed&&t.transitionEnd()})))):t.updateProgress(c),t.updateActiveIndex(),t.updateSlidesClasses()}else{if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode&&a("_freeModeNoMomentumRelease")}(!r.freeMode.momentum||c>=r.longSwipesMs)&&(t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}}}})},function(e){let t,s,a,{swiper:i,extendParams:r}=e;r({grid:{rows:1,fill:"column"}}),i.grid={initSlides:e=>{const{slidesPerView:r}=i.params,{rows:n,fill:l}=i.params.grid;s=t/n,a=Math.floor(e/n),t=Math.floor(e/n)===e/n?e:Math.ceil(e/n)*n,"auto"!==r&&"row"===l&&(t=Math.max(t,r*n))},updateSlide:(e,r,n,l)=>{const{slidesPerGroup:o,spaceBetween:d}=i.params,{rows:c,fill:p}=i.params.grid;let u,h,m;if("row"===p&&o>1){const s=Math.floor(e/(o*c)),a=e-c*o*s,i=0===s?o:Math.min(Math.ceil((n-s*c*o)/c),o);m=Math.floor(a/i),h=a-m*i+s*o,u=h+m*t/c,r.css({"-webkit-order":u,order:u})}else"column"===p?(h=Math.floor(e/c),m=e-h*c,(h>a||h===a&&m===c-1)&&(m+=1,m>=c&&(m=0,h+=1))):(m=Math.floor(e/s),h=e-m*s);r.css(l("margin-top"),0!==m?d&&`${d}px`:"")},updateWrapperSize:(e,s,a)=>{const{spaceBetween:r,centeredSlides:n,roundLengths:l}=i.params,{rows:o}=i.params.grid;if(i.virtualSize=(e+r)*t,i.virtualSize=Math.ceil(i.virtualSize/o)-r,i.$wrapperEl.css({[a("width")]:`${i.virtualSize+r}px`}),n){s.splice(0,s.length);const e=[];for(let t=0;t<s.length;t+=1){let a=s[t];l&&(a=Math.floor(a)),s[t]<i.virtualSize+s[0]&&e.push(a)}s.push(...e)}}}},function(e){let{swiper:t}=e;Object.assign(t,{appendSlide:K.bind(t),prependSlide:Z.bind(t),addSlide:J.bind(t),removeSlide:Q.bind(t),removeAllSlides:ee.bind(t)})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({fadeEffect:{crossFade:!1,transformEl:null}}),te({effect:"fade",swiper:t,on:a,setTranslate:()=>{const{slides:e}=t,s=t.params.fadeEffect;for(let a=0;a<e.length;a+=1){const e=t.slides.eq(a);let i=-e[0].swiperSlideOffset;t.params.virtualTranslate||(i-=t.translate);let r=0;t.isHorizontal()||(r=i,i=0);const n=t.params.fadeEffect.crossFade?Math.max(1-Math.abs(e[0].progress),0):1+Math.min(Math.max(e[0].progress,-1),0);se(s,e).css({opacity:n}).transform(`translate3d(${i}px, ${r}px, 0px)`)}},setTransition:e=>{const{transformEl:s}=t.params.fadeEffect;(s?t.slides.find(s):t.slides).transition(e),ae({swiper:t,duration:e,transformEl:s,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}}),te({effect:"cube",swiper:t,on:a,setTranslate:()=>{const{$el:e,$wrapperEl:s,slides:a,width:i,height:r,rtlTranslate:n,size:l,browser:o}=t,c=t.params.cubeEffect,p=t.isHorizontal(),u=t.virtual&&t.params.virtual.enabled;let h,m=0;c.shadow&&(p?(h=s.find(".swiper-cube-shadow"),0===h.length&&(h=d('<div class="swiper-cube-shadow"></div>'),s.append(h)),h.css({height:`${i}px`})):(h=e.find(".swiper-cube-shadow"),0===h.length&&(h=d('<div class="swiper-cube-shadow"></div>'),e.append(h))));for(let e=0;e<a.length;e+=1){const t=a.eq(e);let s=e;u&&(s=parseInt(t.attr("data-swiper-slide-index"),10));let i=90*s,r=Math.floor(i/360);n&&(i=-i,r=Math.floor(-i/360));const o=Math.max(Math.min(t[0].progress,1),-1);let h=0,f=0,g=0;s%4==0?(h=4*-r*l,g=0):(s-1)%4==0?(h=0,g=4*-r*l):(s-2)%4==0?(h=l+4*r*l,g=l):(s-3)%4==0&&(h=-l,g=3*l+4*l*r),n&&(h=-h),p||(f=h,h=0);const v=`rotateX(${p?0:-i}deg) rotateY(${p?i:0}deg) translate3d(${h}px, ${f}px, ${g}px)`;if(o<=1&&o>-1&&(m=90*s+90*o,n&&(m=90*-s-90*o)),t.transform(v),c.slideShadows){let e=p?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),s=p?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===e.length&&(e=d(`<div class="swiper-slide-shadow-${p?"left":"top"}"></div>`),t.append(e)),0===s.length&&(s=d(`<div class="swiper-slide-shadow-${p?"right":"bottom"}"></div>`),t.append(s)),e.length&&(e[0].style.opacity=Math.max(-o,0)),s.length&&(s[0].style.opacity=Math.max(o,0))}}if(s.css({"-webkit-transform-origin":`50% 50% -${l/2}px`,"transform-origin":`50% 50% -${l/2}px`}),c.shadow)if(p)h.transform(`translate3d(0px, ${i/2+c.shadowOffset}px, ${-i/2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`);else{const e=Math.abs(m)-90*Math.floor(Math.abs(m)/90),t=1.5-(Math.sin(2*e*Math.PI/360)/2+Math.cos(2*e*Math.PI/360)/2),s=c.shadowScale,a=c.shadowScale/t,i=c.shadowOffset;h.transform(`scale3d(${s}, 1, ${a}) translate3d(0px, ${r/2+i}px, ${-r/2/a}px) rotateX(-90deg)`)}const f=o.isSafari||o.isWebView?-l/2:0;s.transform(`translate3d(0px,0,${f}px) rotateX(${t.isHorizontal()?0:m}deg) rotateY(${t.isHorizontal()?-m:0}deg)`)},setTransition:e=>{const{$el:s,slides:a}=t;a.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),t.params.cubeEffect.shadow&&!t.isHorizontal()&&s.find(".swiper-cube-shadow").transition(e)},perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({flipEffect:{slideShadows:!0,limitRotation:!0,transformEl:null}}),te({effect:"flip",swiper:t,on:a,setTranslate:()=>{const{slides:e,rtlTranslate:s}=t,a=t.params.flipEffect;for(let i=0;i<e.length;i+=1){const r=e.eq(i);let n=r[0].progress;t.params.flipEffect.limitRotation&&(n=Math.max(Math.min(r[0].progress,1),-1));const l=r[0].swiperSlideOffset;let o=-180*n,d=0,c=t.params.cssMode?-l-t.translate:-l,p=0;if(t.isHorizontal()?s&&(o=-o):(p=c,c=0,d=-o,o=0),r[0].style.zIndex=-Math.abs(Math.round(n))+e.length,a.slideShadows){let e=t.isHorizontal()?r.find(".swiper-slide-shadow-left"):r.find(".swiper-slide-shadow-top"),s=t.isHorizontal()?r.find(".swiper-slide-shadow-right"):r.find(".swiper-slide-shadow-bottom");0===e.length&&(e=ie(a,r,t.isHorizontal()?"left":"top")),0===s.length&&(s=ie(a,r,t.isHorizontal()?"right":"bottom")),e.length&&(e[0].style.opacity=Math.max(-n,0)),s.length&&(s[0].style.opacity=Math.max(n,0))}const u=`translate3d(${c}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${o}deg)`;se(a,r).transform(u)}},setTransition:e=>{const{transformEl:s}=t.params.flipEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),ae({swiper:t,duration:e,transformEl:s})},perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0,transformEl:null}}),te({effect:"coverflow",swiper:t,on:a,setTranslate:()=>{const{width:e,height:s,slides:a,slidesSizesGrid:i}=t,r=t.params.coverflowEffect,n=t.isHorizontal(),l=t.translate,o=n?e/2-l:s/2-l,d=n?r.rotate:-r.rotate,c=r.depth;for(let e=0,t=a.length;e<t;e+=1){const t=a.eq(e),s=i[e],l=(o-t[0].swiperSlideOffset-s/2)/s*r.modifier;let p=n?d*l:0,u=n?0:d*l,h=-c*Math.abs(l),m=r.stretch;"string"==typeof m&&-1!==m.indexOf("%")&&(m=parseFloat(r.stretch)/100*s);let f=n?0:m*l,g=n?m*l:0,v=1-(1-r.scale)*Math.abs(l);Math.abs(g)<.001&&(g=0),Math.abs(f)<.001&&(f=0),Math.abs(h)<.001&&(h=0),Math.abs(p)<.001&&(p=0),Math.abs(u)<.001&&(u=0),Math.abs(v)<.001&&(v=0);const w=`translate3d(${g}px,${f}px,${h}px)  rotateX(${u}deg) rotateY(${p}deg) scale(${v})`;if(se(r,t).transform(w),t[0].style.zIndex=1-Math.abs(Math.round(l)),r.slideShadows){let e=n?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),s=n?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===e.length&&(e=ie(r,t,n?"left":"top")),0===s.length&&(s=ie(r,t,n?"right":"bottom")),e.length&&(e[0].style.opacity=l>0?l:0),s.length&&(s[0].style.opacity=-l>0?-l:0)}}},setTransition:e=>{const{transformEl:s}=t.params.coverflowEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({creativeEffect:{transformEl:null,limitProgress:1,shadowPerProgress:!1,progressMultiplier:1,perspective:!0,prev:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1},next:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1}}});const i=e=>"string"==typeof e?e:`${e}px`;te({effect:"creative",swiper:t,on:a,setTranslate:()=>{const{slides:e,$wrapperEl:s,slidesSizesGrid:a}=t,r=t.params.creativeEffect,{progressMultiplier:n}=r,l=t.params.centeredSlides;if(l){const e=a[0]/2-t.params.slidesOffsetBefore||0;s.transform(`translateX(calc(50% - ${e}px))`)}for(let s=0;s<e.length;s+=1){const a=e.eq(s),o=a[0].progress,d=Math.min(Math.max(a[0].progress,-r.limitProgress),r.limitProgress);let c=d;l||(c=Math.min(Math.max(a[0].originalProgress,-r.limitProgress),r.limitProgress));const p=a[0].swiperSlideOffset,u=[t.params.cssMode?-p-t.translate:-p,0,0],h=[0,0,0];let m=!1;t.isHorizontal()||(u[1]=u[0],u[0]=0);let f={translate:[0,0,0],rotate:[0,0,0],scale:1,opacity:1};d<0?(f=r.next,m=!0):d>0&&(f=r.prev,m=!0),u.forEach(((e,t)=>{u[t]=`calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d*n)}))`})),h.forEach(((e,t)=>{h[t]=f.rotate[t]*Math.abs(d*n)})),a[0].style.zIndex=-Math.abs(Math.round(o))+e.length;const g=u.join(", "),v=`rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,w=c<0?`scale(${1+(1-f.scale)*c*n})`:`scale(${1-(1-f.scale)*c*n})`,b=c<0?1+(1-f.opacity)*c*n:1-(1-f.opacity)*c*n,x=`translate3d(${g}) ${v} ${w}`;if(m&&f.shadow||!m){let e=a.children(".swiper-slide-shadow");if(0===e.length&&f.shadow&&(e=ie(r,a)),e.length){const t=r.shadowPerProgress?d*(1/r.limitProgress):d;e[0].style.opacity=Math.min(Math.max(Math.abs(t),0),1)}}const y=se(r,a);y.transform(x).css({opacity:b}),f.origin&&y.css("transform-origin",f.origin)}},setTransition:e=>{const{transformEl:s}=t.params.creativeEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow").transition(e),ae({swiper:t,duration:e,transformEl:s,allSlides:!0})},perspective:()=>t.params.creativeEffect.perspective,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cardsEffect:{slideShadows:!0,transformEl:null}}),te({effect:"cards",swiper:t,on:a,setTranslate:()=>{const{slides:e,activeIndex:s}=t,a=t.params.cardsEffect,{startTranslate:i,isTouched:r}=t.touchEventsData,n=t.translate;for(let l=0;l<e.length;l+=1){const o=e.eq(l),d=o[0].progress,c=Math.min(Math.max(d,-4),4);let p=o[0].swiperSlideOffset;t.params.centeredSlides&&!t.params.cssMode&&t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`),t.params.centeredSlides&&t.params.cssMode&&(p-=e[0].swiperSlideOffset);let u=t.params.cssMode?-p-t.translate:-p,h=0;const m=-100*Math.abs(c);let f=1,g=-2*c,v=8-.75*Math.abs(c);const w=(l===s||l===s-1)&&c>0&&c<1&&(r||t.params.cssMode)&&n<i,b=(l===s||l===s+1)&&c<0&&c>-1&&(r||t.params.cssMode)&&n>i;if(w||b){const e=(1-Math.abs((Math.abs(c)-.5)/.5))**.5;g+=-28*c*e,f+=-.5*e,v+=96*e,h=-25*e*Math.abs(c)+"%"}if(u=c<0?`calc(${u}px + (${v*Math.abs(c)}%))`:c>0?`calc(${u}px + (-${v*Math.abs(c)}%))`:`${u}px`,!t.isHorizontal()){const e=h;h=u,u=e}const x=`\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${g}deg)\n        scale(${c<0?""+(1+(1-f)*c):""+(1-(1-f)*c)})\n      `;if(a.slideShadows){let e=o.find(".swiper-slide-shadow");0===e.length&&(e=ie(a,o)),e.length&&(e[0].style.opacity=Math.min(Math.max((Math.abs(c)-.5)/.5,0),1))}o[0].style.zIndex=-Math.abs(Math.round(d))+e.length;se(a,o).transform(x)}},setTransition:e=>{const{transformEl:s}=t.params.cardsEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow").transition(e),ae({swiper:t,duration:e,transformEl:s})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})}];return q.use(re),q}));


/**
 * Copyright (c) 2007 Ariel Flesler - aflesler ○ gmail • com | https://github.com/flesler
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
 ;(function(factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof module!=='undefined'&&module.exports){module.exports=factory(require('jquery'))}else{factory(jQuery)}})(function($){'use strict';var $scrollTo=$.scrollTo=function(target,duration,settings){return $(window).scrollTo(target,duration,settings)};$scrollTo.defaults={axis:'xy',duration:0,limit:true};function isWin(elem){return!elem.nodeName||$.inArray(elem.nodeName.toLowerCase(),['iframe','#document','html','body'])!==-1}function isFunction(obj){return typeof obj==='function'}$.fn.scrollTo=function(target,duration,settings){if(typeof duration==='object'){settings=duration;duration=0}if(typeof settings==='function'){settings={onAfter:settings}}if(target==='max'){target=9e9}settings=$.extend({},$scrollTo.defaults,settings);duration=duration||settings.duration;var queue=settings.queue&&settings.axis.length>1;if(queue){duration/=2}settings.offset=both(settings.offset);settings.over=both(settings.over);return this.each(function(){if(target===null){return}var win=isWin(this),elem=win?this.contentWindow||window:this,$elem=$(elem),targ=target,attr={},toff;switch(typeof targ){case 'number':case 'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,elem);case 'object':if(targ.length===0){return}if(targ.is||targ.style){toff=(targ=$(targ)).offset()}}var offset=isFunction(settings.offset)&&settings.offset(elem,targ)||settings.offset;$.each(settings.axis.split(''),function(i,axis){var Pos=axis==='x'?'Left':'Top',pos=Pos.toLowerCase(),key='scroll'+Pos,prev=$elem[key](),max=$scrollTo.max(elem,axis);if(toff){attr[key]=toff[pos]+(win?0:prev-$elem.offset()[pos]);if(settings.margin){attr[key]-=parseInt(targ.css('margin'+Pos),10)||0;attr[key]-=parseInt(targ.css('border'+Pos+'Width'),10)||0}attr[key]+=offset[pos]||0;if(settings.over[pos]){attr[key]+=targ[axis==='x'?'width':'height']()*settings.over[pos]}}else{var val=targ[pos];attr[key]=val.slice&&val.slice(-1)==='%'?parseFloat(val)/100*max:val}if(settings.limit&&/^\d+$/.test(attr[key])){attr[key]=attr[key]<=0?0:Math.min(attr[key],max)}if(!i&&settings.axis.length>1){if(prev===attr[key]){attr={}}else if(queue){animate(settings.onAfterFirst);attr={}}}});animate(settings.onAfter);function animate(callback){var opts=$.extend({},settings,{queue:true,duration:duration,complete:callback&&function(){callback.call(elem,targ,settings)}});$elem.animate(attr,opts)}})};$scrollTo.max=function(elem,axis){var Dim=axis==='x'?'Width':'Height',scroll='scroll'+Dim;if(!isWin(elem)){return elem[scroll]-$(elem)[Dim.toLowerCase()]()}var size='client'+Dim,doc=elem.ownerDocument||elem.document,html=doc.documentElement,body=doc.body;return Math.max(html[scroll],body[scroll])-Math.min(html[size],body[size])};function both(val){return isFunction(val)||$.isPlainObject(val)?val:{top:val,left:val}}$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(t){return $(t.elem)[t.prop]()},set:function(t){var curr=this.get(t);if(t.options.interrupt&&t._last&&t._last!==curr){return $(t.elem).stop()}var next=Math.round(t.now);if(curr!==next){$(t.elem)[t.prop](next);t._last=this.get(t)}}};return $scrollTo});


/*
== malihu jquery custom scrollbar plugin ==
Version: 3.1.3
Plugin URI: https://manos.malihu.gr/jquery-custom-content-scroller
Author: malihu
Author URI: https://manos.malihu.gr
License: MIT License (MIT)
*/
/*
Copyright Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/*
The code below is fairly long, fully commented and should be normally used in development.
For production, use either the minified jquery.mCustomScrollbar.min.js script or
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin
and dependencies (minified).
*/
(function(factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory;
  } else {
    factory(jQuery, window, document);
  }
}(function($) {
  (function(init) {
    var _rjs = typeof define === "function" && define.amd,
      /* RequireJS */
      _njs = typeof module !== "undefined" && module.exports,
      /* NodeJS */
      _dlp = ("https:" == document.location.protocol) ? "https:" :
      "http:",
      /* location protocol */
      _url =
      "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
    if (!_rjs) {
      if (_njs) {
        require("jquery-mousewheel")($);
      } else {
        /* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS
			(works when mCustomScrollbar fn is called on window load) */
        $.event.special.mousewheel || $("head").append(decodeURI(
          "%3Cscript src=" + _dlp + "//" + _url + "%3E%3C/script%3E"));
      }
    }
    init();
  }(function() {
    /*
	----------------------------------------
	PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S)
	----------------------------------------
	*/
    var pluginNS = "mCustomScrollbar",
      pluginPfx = "mCS",
      defaultSelector = ".mCustomScrollbar",
      /*
	----------------------------------------
	DEFAULT OPTIONS
	----------------------------------------
	*/
      defaults = {
        /*
			set element/content width/height programmatically
			values: boolean, pixels, percentage
				option						default
				-------------------------------------
				setWidth					false
				setHeight					false
			*/
        /*
			set the initial css top property of content
			values: string (e.g. "-100px", "10%" etc.)
			*/
        setTop: 0,
        /*
			set the initial css left property of content
			values: string (e.g. "-100px", "10%" etc.)
			*/
        setLeft: 0,
        /*
			scrollbar axis (vertical and/or horizontal scrollbars)
			values (string): "y", "x", "yx"
			*/
        axis: "y",
        /*
			position of scrollbar relative to content
			values (string): "inside", "outside" ("outside" requires elements with position:relative)
			*/
        scrollbarPosition: "inside",
        /*
			scrolling inertia
			values: integer (milliseconds)
			*/
        scrollInertia: 950,
        /*
			auto-adjust scrollbar dragger length
			values: boolean
			*/
        autoDraggerLength: true,
        /*
			auto-hide scrollbar when idle
			values: boolean
				option						default
				-------------------------------------
				autoHideScrollbar			false
			*/
        /*
			auto-expands scrollbar on mouse-over and dragging
			values: boolean
				option						default
				-------------------------------------
				autoExpandScrollbar			false
			*/
        /*
			always show scrollbar, even when there's nothing to scroll
			values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
			*/
        alwaysShowScrollbar: 0,
        /*
			scrolling always snaps to a multiple of this number in pixels
			values: integer, array ([y,x])
				option						default
				-------------------------------------
				snapAmount					null
			*/
        /*
			when snapping, snap with this number in pixels as an offset
			values: integer
			*/
        snapOffset: 0,
        /*
			mouse-wheel scrolling
			*/
        mouseWheel: {
          /*
				enable mouse-wheel scrolling
				values: boolean
				*/
          enable: true,
          /*
				scrolling amount in pixels
				values: "auto", integer
				*/
          scrollAmount: 100,
          /*
				mouse-wheel scrolling axis
				the default scrolling direction when both vertical and horizontal scrollbars are present
				values (string): "y", "x"
				*/
          axis: "y",
          /*
				prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached
				values: boolean
					option						default
					-------------------------------------
					preventDefault				null
				*/
          /*
				the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.
				values: "auto", integer
				"auto" uses the default OS/browser value
				*/
          deltaFactor: "auto",
          /*
				normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration)
				values: boolean
					option						default
					-------------------------------------
					normalizeDelta				null
				*/
          /*
				invert mouse-wheel scrolling direction
				values: boolean
					option						default
					-------------------------------------
					invert						null
				*/
          /*
				the tags that disable mouse-wheel when cursor is over them
				*/
          disableOver: ["select", "option", "keygen", "datalist",
            "textarea"
          ]
        },
        /*
			scrollbar buttons
			*/
        scrollButtons: {
          /*
				enable scrollbar buttons
				values: boolean
					option						default
					-------------------------------------
					enable						null
				*/
          /*
				scrollbar buttons scrolling type
				values (string): "stepless", "stepped"
				*/
          scrollType: "stepless",
          /*
				scrolling amount in pixels
				values: "auto", integer
				*/
          scrollAmount: "auto"
            /*
				tabindex of the scrollbar buttons
				values: false, integer
					option						default
					-------------------------------------
					tabindex					null
				*/
        },
        /*
			keyboard scrolling
			*/
        keyboard: {
          /*
				enable scrolling via keyboard
				values: boolean
				*/
          enable: true,
          /*
				keyboard scrolling type
				values (string): "stepless", "stepped"
				*/
          scrollType: "stepless",
          /*
				scrolling amount in pixels
				values: "auto", integer
				*/
          scrollAmount: "auto"
        },
        /*
			enable content touch-swipe scrolling
			values: boolean, integer, string (number)
			integer values define the axis-specific minimum amount required for scrolling momentum
			*/
        contentTouchScroll: 25,
        /*
			enable/disable document (default) touch-swipe scrolling
			*/
        documentTouchScroll: true,
        /*
			advanced option parameters
			*/
        advanced: {
          /*
				auto-expand content horizontally (for "x" or "yx" axis)
				values: boolean, integer (the value 2 forces the non scrollHeight/scrollWidth method, the value 3 forces the scrollHeight/scrollWidth method)
					option						default
					-------------------------------------
					autoExpandHorizontalScroll	null
				*/
          /*
				auto-scroll to elements with focus
				*/
          autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
          /*
				auto-update scrollbars on content, element or viewport resize
				should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc.
				values: boolean
				*/
          updateOnContentResize: true,
          /*
				auto-update scrollbars each time each image inside the element is fully loaded
				values: "auto", boolean
				*/
          updateOnImageLoad: "auto",
          /*
				auto-update scrollbars based on the amount and size changes of specific selectors
				useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size
				values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed)
				a value of true (boolean) will auto-update scrollbars each time any element is changed
					option						default
					-------------------------------------
					updateOnSelectorChange		null
				*/
          /*
				extra selectors that'll allow scrollbar dragging upon mousemove/up, pointermove/up, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					extraDraggableSelectors		null
				*/
          /*
				extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					releaseDraggableSelectors	null
				*/
          /*
				auto-update timeout
				values: integer (milliseconds)
				*/
          autoUpdateTimeout: 60
        },
        /*
			scrollbar theme
			values: string (see CSS/plugin URI for a list of ready-to-use themes)
			*/
        theme: "light",
        /*
			user defined callback functions
			*/
        callbacks: {
          /*
				Available callbacks:
					callback					default
					-------------------------------------
					onCreate					null
					onInit						null
					onScrollStart				null
					onScroll					null
					onTotalScroll				null
					onTotalScrollBack			null
					whileScrolling				null
					onOverflowY					null
					onOverflowX					null
					onOverflowYNone				null
					onOverflowXNone				null
					onImageLoad					null
					onSelectorChange			null
					onBeforeUpdate				null
					onUpdate					null
				*/
          onTotalScrollOffset: 0,
          onTotalScrollBackOffset: 0,
          alwaysTriggerOffsets: true
        }
        /*
			add scrollbar(s) on all elements matching the current selector, now and in the future
			values: boolean, string
			string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
			liveSelector values: string (selector)
				option						default
				-------------------------------------
				live						false
				liveSelector				null
			*/
      },
      /*
	----------------------------------------
	VARS, CONSTANTS
	----------------------------------------
	*/
      totalInstances = 0,
      /* plugin instances amount */
      liveTimers = {},
      /* live option timers */
      oldIE = (window.attachEvent && !window.addEventListener) ? 1 : 0,
      /* detect IE < 9 */
      touchActive = false,
      touchable, /* global touch vars (for touch and pointer events) */
      /* general plugin classes */
      classes = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag",
        "mCS_img_loaded", "mCS_disabled", "mCS_destroyed",
        "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl",
        "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden",
        "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp",
        "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"
      ],
      /*
	----------------------------------------
	METHODS
	----------------------------------------
	*/
      methods = {
        /*
			plugin initialization method
			creates the scrollbar(s), plugin data object and options
			----------------------------------------
			*/
        init: function(options) {
          var options = $.extend(true, {}, defaults, options),
            selector = _selector.call(this); /* validate selector */
          /*
				if live option is enabled, monitor for elements matching the current selector and
				apply scrollbar(s) when found (now and in the future)
				*/
          if (options.live) {
            var liveSelector = options.liveSelector || this.selector ||
              defaultSelector,
              /* live selector(s) */
              $liveSelector = $(liveSelector); /* live selector(s) as jquery object */
            if (options.live === "off") {
              /*
						disable live if requested
						usage: $(selector).mCustomScrollbar({live:"off"});
						*/
              removeLiveTimers(liveSelector);
              return;
            }
            liveTimers[liveSelector] = setTimeout(function() {
              /* call mCustomScrollbar fn on live selector(s) every half-second */
              $liveSelector.mCustomScrollbar(options);
              if (options.live === "once" && $liveSelector.length) {
                /* disable live after first invocation */
                removeLiveTimers(liveSelector);
              }
            }, 500);
          } else {
            removeLiveTimers(liveSelector);
          }
          /* options backward compatibility (for versions < 3.0.0) and normalization */
          options.setWidth = (options.set_width) ? options.set_width :
            options.setWidth;
          options.setHeight = (options.set_height) ? options.set_height :
            options.setHeight;
          options.axis = (options.horizontalScroll) ? "x" : _findAxis(
            options.axis);
          options.scrollInertia = options.scrollInertia > 0 &&
            options.scrollInertia < 17 ? 17 : options.scrollInertia;
          if (typeof options.mouseWheel !== "object" && options.mouseWheel ==
            true) { /* old school mouseWheel option (non-object) */
            options.mouseWheel = {
              enable: true,
              scrollAmount: "auto",
              axis: "y",
              preventDefault: false,
              deltaFactor: "auto",
              normalizeDelta: false,
              invert: false
            }
          }
          options.mouseWheel.scrollAmount = !options.mouseWheelPixels ?
            options.mouseWheel.scrollAmount : options.mouseWheelPixels;
          options.mouseWheel.normalizeDelta = !options.advanced.normalizeMouseWheelDelta ?
            options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
          options.scrollButtons.scrollType = _findScrollButtonsType(
            options.scrollButtons.scrollType);
          _theme(options); /* theme-specific options */
          /* plugin constructor */
          return $(selector).each(function() {
            var $this = $(this);
            if (!$this.data(pluginPfx)) { /* prevent multiple instantiations */
              /* store options and create objects in jquery data */
              $this.data(pluginPfx, {
                idx: ++totalInstances,
                /* instance index */
                opt: options,
                /* options */
                scrollRatio: {
                  y: null,
                  x: null
                },
                /* scrollbar to content ratio */
                overflowed: null,
                /* overflowed axis */
                contentReset: {
                  y: null,
                  x: null
                },
                /* object to check when content resets */
                bindEvents: false,
                /* object to check if events are bound */
                tweenRunning: false,
                /* object to check if tween is running */
                sequential: {},
                /* sequential scrolling object */
                langDir: $this.css("direction"),
                /* detect/store direction (ltr or rtl) */
                cbOffsets: null,
                /* object to check whether callback offsets always trigger */
                /*
							object to check how scrolling events where last triggered
							"internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method)
							usage: object.data("mCS").trigger
							*/
                trigger: null,
                /*
							object to check for changes in elements in order to call the update method automatically
							*/
                poll: {
                  size: {
                    o: 0,
                    n: 0
                  },
                  img: {
                    o: 0,
                    n: 0
                  },
                  change: {
                    o: 0,
                    n: 0
                  }
                }
              });
              var d = $this.data(pluginPfx),
                o = d.opt,
                /* HTML data attributes */
                htmlDataAxis = $this.data("mcs-axis"),
                htmlDataSbPos = $this.data(
                  "mcs-scrollbar-position"),
                htmlDataTheme = $this.data("mcs-theme");
              if (htmlDataAxis) {
                o.axis = htmlDataAxis;
              } /* usage example: data-mcs-axis="y" */
              if (htmlDataSbPos) {
                o.scrollbarPosition = htmlDataSbPos;
              } /* usage example: data-mcs-scrollbar-position="outside" */
              if (htmlDataTheme) { /* usage example: data-mcs-theme="minimal" */
                o.theme = htmlDataTheme;
                _theme(o); /* theme-specific options */
              }
              _pluginMarkup.call(this); /* add plugin markup */
              if (d && o.callbacks.onCreate && typeof o.callbacks
                .onCreate === "function") {
                o.callbacks.onCreate.call(this);
              } /* callbacks: onCreate */
              $("#mCSB_" + d.idx + "_container img:not(." +
                classes[2] + ")").addClass(classes[2]); /* flag loaded images */
              methods.update.call(null, $this); /* call the update method */
            }
          });
        },
        /* ---------------------------------------- */
        /*
			plugin update method
			updates content and scrollbar(s) values, events and status
			----------------------------------------
			usage: $(selector).mCustomScrollbar("update");
			*/
        update: function(el, cb) {
          var selector = el || _selector.call(this); /* validate selector */
          return $(selector).each(function() {
            var $this = $(this);
            if ($this.data(pluginPfx)) { /* check if plugin has initialized */
              var d = $this.data(pluginPfx),
                o = d.opt,
                mCSB_container = $("#mCSB_" + d.idx +
                  "_container"),
                mCustomScrollBox = $("#mCSB_" + d.idx),
                mCSB_dragger = [$("#mCSB_" + d.idx +
                  "_dragger_vertical"), $("#mCSB_" + d.idx +
                  "_dragger_horizontal")];
              if (!mCSB_container.length) {
                return;
              }
              if (d.tweenRunning) {
                _stop($this);
              } /* stop any running tweens while updating */
              if (cb && d && o.callbacks.onBeforeUpdate && typeof o
                .callbacks.onBeforeUpdate === "function") {
                o.callbacks.onBeforeUpdate.call(this);
              } /* callbacks: onBeforeUpdate */
              /* if element was disabled or destroyed, remove class(es) */
              if ($this.hasClass(classes[3])) {
                $this.removeClass(classes[3]);
              }
              if ($this.hasClass(classes[4])) {
                $this.removeClass(classes[4]);
              }
              /* css flexbox fix, detect/set max-height */
              mCustomScrollBox.css("max-height", "none");
              if (mCustomScrollBox.height() !== $this.height()) {
                mCustomScrollBox.css("max-height", $this.height());
              }
              _expandContentHorizontally.call(this); /* expand content horizontally */
              if (o.axis !== "y" && !o.advanced.autoExpandHorizontalScroll) {
                mCSB_container.css("width", _contentWidth(
                  mCSB_container));
              }
              d.overflowed = _overflowed.call(this); /* determine if scrolling is required */
              _scrollbarVisibility.call(this); /* show/hide scrollbar(s) */
              /* auto-adjust scrollbar dragger length analogous to content */
              if (o.autoDraggerLength) {
                _setDraggerLength.call(this);
              }
              _scrollRatio.call(this); /* calculate and store scrollbar to content ratio */
              _bindEvents.call(this); /* bind scrollbar events */
              /* reset scrolling position and/or events */
              var to = [Math.abs(mCSB_container[0].offsetTop),
                Math.abs(mCSB_container[0].offsetLeft)
              ];
              if (o.axis !== "x") { /* y/yx axis */
                if (!d.overflowed[0]) { /* y scrolling is not required */
                  _resetContentPosition.call(this); /* reset content position */
                  if (o.axis === "y") {
                    _unbindEvents.call(this);
                  } else if (o.axis === "yx" && d.overflowed[1]) {
                    _scrollTo($this, to[1].toString(), {
                      dir: "x",
                      dur: 0,
                      overwrite: "none"
                    });
                  }
                } else if (mCSB_dragger[0].height() >
                  mCSB_dragger[0].parent().height()) {
                  _resetContentPosition.call(this); /* reset content position */
                } else { /* y scrolling is required */
                  _scrollTo($this, to[0].toString(), {
                    dir: "y",
                    dur: 0,
                    overwrite: "none"
                  });
                  d.contentReset.y = null;
                }
              }
              if (o.axis !== "y") { /* x/yx axis */
                if (!d.overflowed[1]) { /* x scrolling is not required */
                  _resetContentPosition.call(this); /* reset content position */
                  if (o.axis === "x") {
                    _unbindEvents.call(this);
                  } else if (o.axis === "yx" && d.overflowed[0]) {
                    _scrollTo($this, to[0].toString(), {
                      dir: "y",
                      dur: 0,
                      overwrite: "none"
                    });
                  }
                } else if (mCSB_dragger[1].width() > mCSB_dragger[
                  1].parent().width()) {
                  _resetContentPosition.call(this); /* reset content position */
                } else { /* x scrolling is required */
                  _scrollTo($this, to[1].toString(), {
                    dir: "x",
                    dur: 0,
                    overwrite: "none"
                  });
                  d.contentReset.x = null;
                }
              }
              /* callbacks: onImageLoad, onSelectorChange, onUpdate */
              if (cb && d) {
                if (cb === 2 && o.callbacks.onImageLoad && typeof o
                  .callbacks.onImageLoad === "function") {
                  o.callbacks.onImageLoad.call(this);
                } else if (cb === 3 && o.callbacks.onSelectorChange &&
                  typeof o.callbacks.onSelectorChange ===
                  "function") {
                  o.callbacks.onSelectorChange.call(this);
                } else if (o.callbacks.onUpdate && typeof o.callbacks
                  .onUpdate === "function") {
                  o.callbacks.onUpdate.call(this);
                }
              }
              _autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */
            }
          });
        },
        /* ---------------------------------------- */
        /*
			plugin scrollTo method
			triggers a scrolling event to a specific value
			----------------------------------------
			usage: $(selector).mCustomScrollbar("scrollTo",value,options);
			*/
        scrollTo: function(val, options) {
          /* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
          if (typeof val == "undefined" || val == null) {
            return;
          }
          var selector = _selector.call(this); /* validate selector */
          return $(selector).each(function() {
            var $this = $(this);
            if ($this.data(pluginPfx)) { /* check if plugin has initialized */
              var d = $this.data(pluginPfx),
                o = d.opt,
                /* method default options */
                methodDefaults = {
                  trigger: "external",
                  /* method is by default triggered externally (e.g. from other scripts) */
                  scrollInertia: o.scrollInertia,
                  /* scrolling inertia (animation duration) */
                  scrollEasing: "mcsEaseInOut",
                  /* animation easing */
                  moveDragger: false,
                  /* move dragger instead of content */
                  timeout: 60,
                  /* scroll-to delay */
                  callbacks: true,
                  /* enable/disable callbacks */
                  onStart: true,
                  onUpdate: true,
                  onComplete: true
                },
                methodOptions = $.extend(true, {}, methodDefaults,
                  options),
                to = _arr.call(this, val),
                dur = methodOptions.scrollInertia > 0 &&
                methodOptions.scrollInertia < 17 ? 17 :
                methodOptions.scrollInertia;
              /* translate yx values to actual scroll-to positions */
              to[0] = _to.call(this, to[0], "y");
              to[1] = _to.call(this, to[1], "x");
              /*
						check if scroll-to value moves the dragger instead of content.
						Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.)
						*/
              if (methodOptions.moveDragger) {
                to[0] *= d.scrollRatio.y;
                to[1] *= d.scrollRatio.x;
              }
              methodOptions.dur = _isTabHidden() ? 0 : dur; //skip animations if browser tab is hidden
              setTimeout(function() {
                /* do the scrolling */
                if (to[0] !== null && typeof to[0] !==
                  "undefined" && o.axis !== "x" && d.overflowed[
                    0]) { /* scroll y */
                  methodOptions.dir = "y";
                  methodOptions.overwrite = "all";
                  _scrollTo($this, to[0].toString(),
                    methodOptions);
                }
                if (to[1] !== null && typeof to[1] !==
                  "undefined" && o.axis !== "y" && d.overflowed[
                    1]) { /* scroll x */
                  methodOptions.dir = "x";
                  methodOptions.overwrite = "none";
                  _scrollTo($this, to[1].toString(),
                    methodOptions);
                }
              }, methodOptions.timeout);
            }
          });
        },
        /* ---------------------------------------- */
        /*
			plugin stop method
			stops scrolling animation
			----------------------------------------
			usage: $(selector).mCustomScrollbar("stop");
			*/
        stop: function() {
          var selector = _selector.call(this); /* validate selector */
          return $(selector).each(function() {
            var $this = $(this);
            if ($this.data(pluginPfx)) { /* check if plugin has initialized */
              _stop($this);
            }
          });
        },
        /* ---------------------------------------- */
        /*
			plugin disable method
			temporarily disables the scrollbar(s)
			----------------------------------------
			usage: $(selector).mCustomScrollbar("disable",reset);
			reset (boolean): resets content position to 0
			*/
        disable: function(r) {
          var selector = _selector.call(this); /* validate selector */
          return $(selector).each(function() {
            var $this = $(this);
            if ($this.data(pluginPfx)) { /* check if plugin has initialized */
              var d = $this.data(pluginPfx);
              _autoUpdate.call(this, "remove"); /* remove automatic updating */
              _unbindEvents.call(this); /* unbind events */
              if (r) {
                _resetContentPosition.call(this);
              } /* reset content position */
              _scrollbarVisibility.call(this, true); /* show/hide scrollbar(s) */
              $this.addClass(classes[3]); /* add disable class */
            }
          });
        },
        /* ---------------------------------------- */
        /*
			plugin destroy method
			completely removes the scrollbar(s) and returns the element to its original state
			----------------------------------------
			usage: $(selector).mCustomScrollbar("destroy");
			*/
        destroy: function() {
            var selector = _selector.call(this); /* validate selector */
            return $(selector).each(function() {
              var $this = $(this);
              if ($this.data(pluginPfx)) { /* check if plugin has initialized */
                var d = $this.data(pluginPfx),
                  o = d.opt,
                  mCustomScrollBox = $("#mCSB_" + d.idx),
                  mCSB_container = $("#mCSB_" + d.idx +
                    "_container"),
                  scrollbar = $(".mCSB_" + d.idx + "_scrollbar");
                if (o.live) {
                  removeLiveTimers(o.liveSelector || $(selector).selector);
                } /* remove live timers */
                _autoUpdate.call(this, "remove"); /* remove automatic updating */
                _unbindEvents.call(this); /* unbind events */
                _resetContentPosition.call(this); /* reset content position */
                $this.removeData(pluginPfx); /* remove plugin data object */
                _delete(this, "mcs"); /* delete callbacks object */
                /* remove plugin markup */
                scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
                mCSB_container.find("img." + classes[2]).removeClass(
                  classes[2]); /* remove loaded images flag */
                mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
                /* remove plugin classes from the element and add destroy class */
                $this.removeClass(pluginNS + " _" + pluginPfx + "_" +
                  d.idx + " " + classes[6] + " " + classes[7] +
                  " " + classes[5] + " " + classes[3]).addClass(
                  classes[4]);
              }
            });
          }
          /* ---------------------------------------- */
      },
      /*
	----------------------------------------
	FUNCTIONS
	----------------------------------------
	*/
      /* validates selector (if selector is invalid or undefined uses the default one) */
      _selector = function() {
        return (typeof $(this) !== "object" || $(this).length < 1) ?
          defaultSelector : this;
      },
      /* -------------------- */
      /* changes options according to theme */
      _theme = function(obj) {
        var fixedSizeScrollbarThemes = ["rounded", "rounded-dark",
            "rounded-dots", "rounded-dots-dark"
          ],
          nonExpandedScrollbarThemes = ["rounded-dots",
            "rounded-dots-dark", "3d", "3d-dark", "3d-thick",
            "3d-thick-dark", "inset", "inset-dark", "inset-2",
            "inset-2-dark", "inset-3", "inset-3-dark"
          ],
          disabledScrollButtonsThemes = ["minimal", "minimal-dark"],
          enabledAutoHideScrollbarThemes = ["minimal", "minimal-dark"],
          scrollbarPositionOutsideThemes = ["minimal", "minimal-dark"];
        obj.autoDraggerLength = $.inArray(obj.theme,
          fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
        obj.autoExpandScrollbar = $.inArray(obj.theme,
          nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
        obj.scrollButtons.enable = $.inArray(obj.theme,
            disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons
          .enable;
        obj.autoHideScrollbar = $.inArray(obj.theme,
          enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
        obj.scrollbarPosition = $.inArray(obj.theme,
          scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
      },
      /* -------------------- */
      /* live option timers removal */
      removeLiveTimers = function(selector) {
        if (liveTimers[selector]) {
          clearTimeout(liveTimers[selector]);
          _delete(liveTimers, selector);
        }
      },
      /* -------------------- */
      /* normalizes axis option to valid values: "y", "x", "yx" */
      _findAxis = function(val) {
        return (val === "yx" || val === "xy" || val === "auto") ? "yx" :
          (val === "x" || val === "horizontal") ? "x" : "y";
      },
      /* -------------------- */
      /* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
      _findScrollButtonsType = function(val) {
        return (val === "stepped" || val === "pixels" || val === "step" ||
          val === "click") ? "stepped" : "stepless";
      },
      /* -------------------- */
      /* generates plugin markup */
      _pluginMarkup = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          expandClass = o.autoExpandScrollbar ? " " + classes[1] +
          "_expand" : "",
          scrollbar = ["<div id='mCSB_" + d.idx +
            "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + d.idx +
            "_scrollbar mCS-" + o.theme + " mCSB_scrollTools_vertical" +
            expandClass + "'><div class='" + classes[12] +
            "'><div id='mCSB_" + d.idx +
            "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
            "<div id='mCSB_" + d.idx +
            "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + d.idx +
            "_scrollbar mCS-" + o.theme +
            " mCSB_scrollTools_horizontal" + expandClass +
            "'><div class='" + classes[12] + "'><div id='mCSB_" + d.idx +
            "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"
          ],
          wrapperClass = o.axis === "yx" ? "mCSB_vertical_horizontal" :
          o.axis === "x" ? "mCSB_horizontal" : "mCSB_vertical",
          scrollbars = o.axis === "yx" ? scrollbar[0] + scrollbar[1] :
          o.axis === "x" ? scrollbar[1] : scrollbar[0],
          contentWrapper = o.axis === "yx" ? "<div id='mCSB_" + d.idx +
          "_container_wrapper' class='mCSB_container_wrapper' />" : "",
          autoHideClass = o.autoHideScrollbar ? " " + classes[6] : "",
          scrollbarDirClass = (o.axis !== "x" && d.langDir === "rtl") ?
          " " + classes[7] : "";
        if (o.setWidth) {
          $this.css("width", o.setWidth);
        } /* set element width */
        if (o.setHeight) {
          $this.css("height", o.setHeight);
        } /* set element height */
        o.setLeft = (o.axis !== "y" && d.langDir === "rtl") ?
          "989999px" : o.setLeft; /* adjust left position for rtl direction */
        $this.addClass(pluginNS + " _" + pluginPfx + "_" + d.idx +
          autoHideClass + scrollbarDirClass).wrapInner(
          "<div id='mCSB_" + d.idx + "' class='mCustomScrollBox mCS-" +
          o.theme + " " + wrapperClass + "'><div id='mCSB_" + d.idx +
          "_container' class='mCSB_container' style='position:relative; top:" +
          o.setTop + "; left:" + o.setLeft + ";' dir=" + d.langDir +
          " /></div>");
        var mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container");
        if (o.axis !== "y" && !o.advanced.autoExpandHorizontalScroll) {
          mCSB_container.css("width", _contentWidth(mCSB_container));
        }
        if (o.scrollbarPosition === "outside") {
          if ($this.css("position") === "static") { /* requires elements with non-static position */
            $this.css("position", "relative");
          }
          $this.css("overflow", "visible");
          mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
        } else {
          mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
          mCSB_container.wrap(contentWrapper);
        }
        _scrollButtons.call(this); /* add scrollbar buttons */
        /* minimum dragger length */
        var mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"),
          $("#mCSB_" + d.idx + "_dragger_horizontal")
        ];
        mCSB_dragger[0].css("min-height", mCSB_dragger[0].height());
        mCSB_dragger[1].css("min-width", mCSB_dragger[1].width());
      },
      /* -------------------- */
      /* calculates content width */
      _contentWidth = function(el) {
        var val = [el[0].scrollWidth, Math.max.apply(Math, el.children()
            .map(function() {
              return $(this).outerWidth(true);
            }).get())],
          w = el.parent().width();
        return val[0] > w ? val[0] : val[1] > w ? val[1] : "100%";
      },
      /* -------------------- */
      /* expands content horizontally */
      _expandContentHorizontally = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCSB_container = $("#mCSB_" + d.idx + "_container");
        if (o.advanced.autoExpandHorizontalScroll && o.axis !== "y") {
          /* calculate scrollWidth */
          mCSB_container.css({
            "width": "auto",
            "min-width": 0,
            "overflow-x": "scroll"
          });
          var w = Math.ceil(mCSB_container[0].scrollWidth);
          if (o.advanced.autoExpandHorizontalScroll === 3 || (o.advanced
            .autoExpandHorizontalScroll !== 2 && w > mCSB_container.parent()
            .width())) {
            mCSB_container.css({
              "width": w,
              "min-width": "100%",
              "overflow-x": "inherit"
            });
          } else {
            /*
					wrap content with an infinite width div and set its position to absolute and width to auto.
					Setting width to auto before calculating the actual width is important!
					We must let the browser set the width as browser zoom values are impossible to calculate.
					*/
            mCSB_container.css({
              "overflow-x": "inherit",
              "position": "absolute"
            }).wrap(
              "<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />"
            ).css({ /* set actual width, original position and un-wrap */
              /*
							get the exact width (with decimals) and then round-up.
							Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
							*/
              "width": (Math.ceil(mCSB_container[0].getBoundingClientRect()
                .right + 0.4) - Math.floor(mCSB_container[0].getBoundingClientRect()
                .left)),
              "min-width": "100%",
              "position": "relative"
            }).unwrap();
          }
        }
      },
      /* -------------------- */
      /* adds scrollbar buttons */
      _scrollButtons = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCSB_scrollTools = $(".mCSB_" + d.idx + "_scrollbar:first"),
          tabindex = !_isNumeric(o.scrollButtons.tabindex) ? "" :
          "tabindex='" + o.scrollButtons.tabindex + "'",
          btnHTML = ["<a href='#' class='" + classes[13] +
            "' oncontextmenu='return false;' " + tabindex + " />",
            "<a href='#' class='" + classes[14] +
            "' oncontextmenu='return false;' " + tabindex + " />",
            "<a href='#' class='" + classes[15] +
            "' oncontextmenu='return false;' " + tabindex + " />",
            "<a href='#' class='" + classes[16] +
            "' oncontextmenu='return false;' " + tabindex + " />"
          ],
          btn = [(o.axis === "x" ? btnHTML[2] : btnHTML[0]), (o.axis ===
            "x" ? btnHTML[3] : btnHTML[1]), btnHTML[2], btnHTML[3]];
        if (o.scrollButtons.enable) {
          mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(
            ".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
        }
      },
      /* -------------------- */
      /* auto-adjusts scrollbar dragger length */
      _setDraggerLength = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $(
            "#mCSB_" + d.idx + "_dragger_horizontal")],
          ratio = [mCustomScrollBox.height() / mCSB_container.outerHeight(
            false), mCustomScrollBox.width() / mCSB_container.outerWidth(
            false)],
          l = [
            parseInt(mCSB_dragger[0].css("min-height")), Math.round(
              ratio[0] * mCSB_dragger[0].parent().height()),
            parseInt(mCSB_dragger[1].css("min-width")), Math.round(
              ratio[1] * mCSB_dragger[1].parent().width())
          ],
          h = oldIE && (l[1] < l[0]) ? l[0] : l[1],
          w = oldIE && (l[3] < l[2]) ? l[2] : l[3];
        mCSB_dragger[0].css({
          "height": h,
          "max-height": (mCSB_dragger[0].parent().height() - 10)
        }).find(".mCSB_dragger_bar").css({
          "line-height": l[0] + "px"
        });
        mCSB_dragger[1].css({
          "width": w,
          "max-width": (mCSB_dragger[1].parent().width() - 10)
        });
      },
      /* -------------------- */
      /* calculates scrollbar to content ratio */
      _scrollRatio = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $(
            "#mCSB_" + d.idx + "_dragger_horizontal")],
          scrollAmount = [mCSB_container.outerHeight(false) -
            mCustomScrollBox.height(), mCSB_container.outerWidth(false) -
            mCustomScrollBox.width()
          ],
          ratio = [
            scrollAmount[0] / (mCSB_dragger[0].parent().height() -
              mCSB_dragger[0].height()),
            scrollAmount[1] / (mCSB_dragger[1].parent().width() -
              mCSB_dragger[1].width())
          ];
        d.scrollRatio = {
          y: ratio[0],
          x: ratio[1]
        };
      },
      /* -------------------- */
      /* toggles scrolling classes */
      _onDragClasses = function(el, action, xpnd) {
        var expandClass = xpnd ? classes[0] + "_expanded" : "",
          scrollbar = el.closest(".mCSB_scrollTools");
        if (action === "active") {
          el.toggleClass(classes[0] + " " + expandClass);
          scrollbar.toggleClass(classes[1]);
          el[0]._draggable = el[0]._draggable ? 0 : 1;
        } else {
          if (!el[0]._draggable) {
            if (action === "hide") {
              el.removeClass(classes[0]);
              scrollbar.removeClass(classes[1]);
            } else {
              el.addClass(classes[0]);
              scrollbar.addClass(classes[1]);
            }
          }
        }
      },
      /* -------------------- */
      /* checks if content overflows its container to determine if scrolling is required */
      _overflowed = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          contentHeight = d.overflowed == null ? mCSB_container.height() :
          mCSB_container.outerHeight(false),
          contentWidth = d.overflowed == null ? mCSB_container.width() :
          mCSB_container.outerWidth(false),
          h = mCSB_container[0].scrollHeight,
          w = mCSB_container[0].scrollWidth;
        if (h > contentHeight) {
          contentHeight = h;
        }
        if (w > contentWidth) {
          contentWidth = w;
        }
        return [contentHeight > mCustomScrollBox.height(), contentWidth >
          mCustomScrollBox.width()
        ];
      },
      /* -------------------- */
      /* resets content position to 0 */
      _resetContentPosition = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $(
            "#mCSB_" + d.idx + "_dragger_horizontal")];
        _stop($this); /* stop any current scrolling before resetting */
        if ((o.axis !== "x" && !d.overflowed[0]) || (o.axis === "y" &&
          d.overflowed[0])) { /* reset y */
          mCSB_dragger[0].add(mCSB_container).css("top", 0);
          _scrollTo($this, "_resetY");
        }
        if ((o.axis !== "y" && !d.overflowed[1]) || (o.axis === "x" &&
          d.overflowed[1])) { /* reset x */
          var cx = dx = 0;
          if (d.langDir === "rtl") { /* adjust left position for rtl direction */
            cx = mCustomScrollBox.width() - mCSB_container.outerWidth(
              false);
            dx = Math.abs(cx / d.scrollRatio.x);
          }
          mCSB_container.css("left", cx);
          mCSB_dragger[1].css("left", dx);
          _scrollTo($this, "_resetX");
        }
      },
      /* -------------------- */
      /* binds scrollbar events */
      _bindEvents = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt;
        if (!d.bindEvents) { /* check if events are already bound */
          _draggable.call(this);
          if (o.contentTouchScroll) {
            _contentDraggable.call(this);
          }
          _selectable.call(this);
          if (o.mouseWheel.enable) { /* bind mousewheel fn when plugin is available */
            function _mwt() {
              mousewheelTimeout = setTimeout(function() {
                if (!$.event.special.mousewheel) {
                  _mwt();
                } else {
                  clearTimeout(mousewheelTimeout);
                  _mousewheel.call($this[0]);
                }
              }, 100);
            }
            var mousewheelTimeout;
            _mwt();
          }
          _draggerRail.call(this);
          _wrapperScroll.call(this);
          if (o.advanced.autoScrollOnFocus) {
            _focus.call(this);
          }
          if (o.scrollButtons.enable) {
            _buttons.call(this);
          }
          if (o.keyboard.enable) {
            _keyboard.call(this);
          }
          d.bindEvents = true;
        }
      },
      /* -------------------- */
      /* unbinds scrollbar events */
      _unbindEvents = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          sb = ".mCSB_" + d.idx + "_scrollbar",
          sel = $("#mCSB_" + d.idx + ",#mCSB_" + d.idx +
            "_container,#mCSB_" + d.idx + "_container_wrapper," + sb +
            " ." + classes[12] + ",#mCSB_" + d.idx +
            "_dragger_vertical,#mCSB_" + d.idx + "_dragger_horizontal," +
            sb + ">a"),
          mCSB_container = $("#mCSB_" + d.idx + "_container");
        if (o.advanced.releaseDraggableSelectors) {
          sel.add($(o.advanced.releaseDraggableSelectors));
        }
        if (o.advanced.extraDraggableSelectors) {
          sel.add($(o.advanced.extraDraggableSelectors));
        }
        if (d.bindEvents) { /* check if events are bound */
          /* unbind namespaced events from document/selectors */
          $(document).add($(!_canAccessIFrame() || top.document)).unbind(
            "." + namespace);
          sel.each(function() {
            $(this).unbind("." + namespace);
          });
          /* clear and delete timeouts/objects */
          clearTimeout($this[0]._focusTimeout);
          _delete($this[0], "_focusTimeout");
          clearTimeout(d.sequential.step);
          _delete(d.sequential, "step");
          clearTimeout(mCSB_container[0].onCompleteTimeout);
          _delete(mCSB_container[0], "onCompleteTimeout");
          d.bindEvents = false;
        }
      },
      /* -------------------- */
      /* toggles scrollbar visibility */
      _scrollbarVisibility = function(disabled) {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          contentWrapper = $("#mCSB_" + d.idx + "_container_wrapper"),
          content = contentWrapper.length ? contentWrapper : $("#mCSB_" +
            d.idx + "_container"),
          scrollbar = [$("#mCSB_" + d.idx + "_scrollbar_vertical"), $(
            "#mCSB_" + d.idx + "_scrollbar_horizontal")],
          mCSB_dragger = [scrollbar[0].find(".mCSB_dragger"), scrollbar[
            1].find(".mCSB_dragger")];
        if (o.axis !== "x") {
          if (d.overflowed[0] && !disabled) {
            scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children(
              "a")).css("display", "block");
            content.removeClass(classes[8] + " " + classes[10]);
          } else {
            if (o.alwaysShowScrollbar) {
              if (o.alwaysShowScrollbar !== 2) {
                mCSB_dragger[0].css("display", "none");
              }
              content.removeClass(classes[10]);
            } else {
              scrollbar[0].css("display", "none");
              content.addClass(classes[10]);
            }
            content.addClass(classes[8]);
          }
        }
        if (o.axis !== "y") {
          if (d.overflowed[1] && !disabled) {
            scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children(
              "a")).css("display", "block");
            content.removeClass(classes[9] + " " + classes[11]);
          } else {
            if (o.alwaysShowScrollbar) {
              if (o.alwaysShowScrollbar !== 2) {
                mCSB_dragger[1].css("display", "none");
              }
              content.removeClass(classes[11]);
            } else {
              scrollbar[1].css("display", "none");
              content.addClass(classes[11]);
            }
            content.addClass(classes[9]);
          }
        }
        if (!d.overflowed[0] && !d.overflowed[1]) {
          $this.addClass(classes[5]);
        } else {
          $this.removeClass(classes[5]);
        }
      },
      /* -------------------- */
      /* returns input coordinates of pointer, touch and mouse events (relative to document) */
      _coordinates = function(e) {
        var t = e.type,
          o = e.target.ownerDocument !== document ? [$(frameElement).offset()
            .top, $(frameElement).offset().left
          ] : null,
          io = _canAccessIFrame() && e.target.ownerDocument !== top.document ? [
            $(e.view.frameElement).offset().top, $(e.view.frameElement)
            .offset().left
          ] : [0, 0];
        switch (t) {
          case "pointerdown":
          case "MSPointerDown":
          case "pointermove":
          case "MSPointerMove":
          case "pointerup":
          case "MSPointerUp":
            return o ? [e.originalEvent.pageY - o[0] + io[0], e.originalEvent
              .pageX - o[1] + io[1], false
            ] : [e.originalEvent.pageY, e.originalEvent.pageX, false];
            break;
          case "touchstart":
          case "touchmove":
          case "touchend":
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[
                0],
              touches = e.originalEvent.touches.length || e.originalEvent
              .changedTouches.length;
            return e.target.ownerDocument !== document ? [touch.screenY,
              touch.screenX, touches > 1
            ] : [touch.pageY, touch.pageX, touches > 1];
            break;
          default:
            return o ? [e.pageY - o[0] + io[0], e.pageX - o[1] + io[1],
              false
            ] : [e.pageY, e.pageX, false];
        }
      },
      /* -------------------- */
      /*
		SCROLLBAR DRAG EVENTS
		scrolls content via scrollbar dragging
		*/
      _draggable = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          draggerId = ["mCSB_" + d.idx + "_dragger_vertical", "mCSB_" +
            d.idx + "_dragger_horizontal"
          ],
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = $("#" + draggerId[0] + ",#" + draggerId[1]),
          draggable, dragY, dragX,
          rds = o.advanced.releaseDraggableSelectors ? mCSB_dragger.add(
            $(o.advanced.releaseDraggableSelectors)) : mCSB_dragger,
          eds = o.advanced.extraDraggableSelectors ? $(!
            _canAccessIFrame() || top.document).add($(o.advanced.extraDraggableSelectors)) :
          $(!_canAccessIFrame() || top.document);
        mCSB_dragger.bind("mousedown." + namespace + " touchstart." +
          namespace + " pointerdown." + namespace + " MSPointerDown." +
          namespace, function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            if (!_mouseBtnLeft(e)) {
              return;
            } /* left mouse button only */
            touchActive = true;
            if (oldIE) {
              document.onselectstart = function() {
                return false;
              }
            } /* disable text selection for IE < 9 */
            _iframe(false); /* enable scrollbar dragging over iframes by disabling their events */
            _stop($this);
            draggable = $(this);
            var offset = draggable.offset(),
              y = _coordinates(e)[0] - offset.top,
              x = _coordinates(e)[1] - offset.left,
              h = draggable.height() + offset.top,
              w = draggable.width() + offset.left;
            if (y < h && y > 0 && x < w && x > 0) {
              dragY = y;
              dragX = x;
            }
            _onDragClasses(draggable, "active", o.autoExpandScrollbar);
          }).bind("touchmove." + namespace, function(e) {
          e.stopImmediatePropagation();
          e.preventDefault();
          var offset = draggable.offset(),
            y = _coordinates(e)[0] - offset.top,
            x = _coordinates(e)[1] - offset.left;
          _drag(dragY, dragX, y, x);
        });
        $(document).add(eds).bind("mousemove." + namespace +
          " pointermove." + namespace + " MSPointerMove." + namespace,
          function(e) {
            if (draggable) {
              var offset = draggable.offset(),
                y = _coordinates(e)[0] - offset.top,
                x = _coordinates(e)[1] - offset.left;
              if (dragY === y && dragX === x) {
                return;
              } /* has it really moved? */
              _drag(dragY, dragX, y, x);
            }
          }).add(rds).bind("mouseup." + namespace + " touchend." +
          namespace + " pointerup." + namespace + " MSPointerUp." +
          namespace, function(e) {
            if (draggable) {
              _onDragClasses(draggable, "active", o.autoExpandScrollbar);
              draggable = null;
            }
            touchActive = false;
            if (oldIE) {
              document.onselectstart = null;
            } /* enable text selection for IE < 9 */
            _iframe(true); /* enable iframes events */
          });

        function _iframe(evt) {
          var el = mCSB_container.find("iframe");
          if (!el.length) {
            return;
          } /* check if content contains iframes */
          var val = !evt ? "none" : "auto";
          el.css("pointer-events", val); /* for IE11, iframe's display property should not be "block" */
        }

        function _drag(dragY, dragX, y, x) {
          mCSB_container[0].idleTimer = o.scrollInertia < 233 ? 250 :
            0;
          if (draggable.attr("id") === draggerId[1]) {
            var dir = "x",
              to = ((draggable[0].offsetLeft - dragX) + x) * d.scrollRatio
              .x;
          } else {
            var dir = "y",
              to = ((draggable[0].offsetTop - dragY) + y) * d.scrollRatio
              .y;
          }
          _scrollTo($this, to.toString(), {
            dir: dir,
            drag: true
          });
        }
      },
      /* -------------------- */
      /*
		TOUCH SWIPE EVENTS
		scrolls content via touch swipe
		Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices
		*/
      _contentDraggable = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $(
            "#mCSB_" + d.idx + "_dragger_horizontal")],
          draggable, dragY, dragX, touchStartY, touchStartX, touchMoveY = [],
          touchMoveX = [],
          startTime, runningTime, endTime, distance, speed, amount,
          durA = 0,
          durB, overwrite = o.axis === "yx" ? "none" : "all",
          touchIntent = [],
          touchDrag, docDrag,
          iframe = mCSB_container.find("iframe"),
          events = ["touchstart." + namespace + " pointerdown." +
            namespace + " MSPointerDown." + namespace, //start
            "touchmove." + namespace + " pointermove." + namespace +
            " MSPointerMove." + namespace, //move
            "touchend." + namespace + " pointerup." + namespace +
            " MSPointerUp." + namespace //end
          ],
          touchAction = document.body.style.touchAction !== undefined;
        mCSB_container.bind(events[0], function(e) {
          _onTouchstart(e);
        }).bind(events[1], function(e) {
          _onTouchmove(e);
        });
        mCustomScrollBox.bind(events[0], function(e) {
          _onTouchstart2(e);
        }).bind(events[2], function(e) {
          _onTouchend(e);
        });
        if (iframe.length) {
          iframe.each(function() {
            $(this).load(function() {
              /* bind events on accessible iframes */
              if (_canAccessIFrame(this)) {
                $(this.contentDocument || this.contentWindow.document)
                  .bind(events[0], function(e) {
                    _onTouchstart(e);
                    _onTouchstart2(e);
                  }).bind(events[1], function(e) {
                    _onTouchmove(e);
                  }).bind(events[2], function(e) {
                    _onTouchend(e);
                  });
              }
            });
          });
        }

        function _onTouchstart(e) {
          if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
            touchable = 0;
            return;
          }
          touchable = 1;
          touchDrag = 0;
          docDrag = 0;
          draggable = 1;
          $this.removeClass("mCS_touch_action");
          var offset = mCSB_container.offset();
          dragY = _coordinates(e)[0] - offset.top;
          dragX = _coordinates(e)[1] - offset.left;
          touchIntent = [_coordinates(e)[0], _coordinates(e)[1]];
        }

        function _onTouchmove(e) {
          if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
            return;
          }
          if (!o.documentTouchScroll) {
            e.preventDefault();
          }
          e.stopImmediatePropagation();
          if (docDrag && !touchDrag) {
            return;
          }
          if (draggable) {
            runningTime = _getTime();
            var offset = mCustomScrollBox.offset(),
              y = _coordinates(e)[0] - offset.top,
              x = _coordinates(e)[1] - offset.left,
              easing = "mcsLinearOut";
            touchMoveY.push(y);
            touchMoveX.push(x);
            touchIntent[2] = Math.abs(_coordinates(e)[0] -
              touchIntent[0]);
            touchIntent[3] = Math.abs(_coordinates(e)[1] -
              touchIntent[1]);
            if (d.overflowed[0]) {
              var limit = mCSB_dragger[0].parent().height() -
                mCSB_dragger[0].height(),
                prevent = ((dragY - y) > 0 && (y - dragY) > -(limit *
                  d.scrollRatio.y) && (touchIntent[3] * 2 <
                  touchIntent[2] || o.axis === "yx"));
            }
            if (d.overflowed[1]) {
              var limitX = mCSB_dragger[1].parent().width() -
                mCSB_dragger[1].width(),
                preventX = ((dragX - x) > 0 && (x - dragX) > -(limitX *
                  d.scrollRatio.x) && (touchIntent[2] * 2 <
                  touchIntent[3] || o.axis === "yx"));
            }
            if (prevent || preventX) { /* prevent native document scrolling */
              if (!touchAction) {
                e.preventDefault();
              }
              touchDrag = 1;
            } else {
              docDrag = 1;
              $this.addClass("mCS_touch_action");
            }
            if (touchAction) {
              e.preventDefault();
            }
            amount = o.axis === "yx" ? [(dragY - y), (dragX - x)] : o
              .axis === "x" ? [null, (dragX - x)] : [(dragY - y),
                null
              ];
            mCSB_container[0].idleTimer = 250;
            if (d.overflowed[0]) {
              _drag(amount[0], durA, easing, "y", "all", true);
            }
            if (d.overflowed[1]) {
              _drag(amount[1], durA, easing, "x", overwrite, true);
            }
          }
        }

        function _onTouchstart2(e) {
          if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
            touchable = 0;
            return;
          }
          touchable = 1;
          e.stopImmediatePropagation();
          _stop($this);
          startTime = _getTime();
          var offset = mCustomScrollBox.offset();
          touchStartY = _coordinates(e)[0] - offset.top;
          touchStartX = _coordinates(e)[1] - offset.left;
          touchMoveY = [];
          touchMoveX = [];
        }

        function _onTouchend(e) {
          if (!_pointerTouch(e) || touchActive || _coordinates(e)[2]) {
            return;
          }
          draggable = 0;
          e.stopImmediatePropagation();
          touchDrag = 0;
          docDrag = 0;
          endTime = _getTime();
          var offset = mCustomScrollBox.offset(),
            y = _coordinates(e)[0] - offset.top,
            x = _coordinates(e)[1] - offset.left;
          if ((endTime - runningTime) > 30) {
            return;
          }
          speed = 1000 / (endTime - startTime);
          var easing = "mcsEaseOut",
            slow = speed < 2.5,
            diff = slow ? [touchMoveY[touchMoveY.length - 2],
              touchMoveX[touchMoveX.length - 2]
            ] : [0, 0];
          distance = slow ? [(y - diff[0]), (x - diff[1])] : [y -
            touchStartY, x - touchStartX
          ];
          var absDistance = [Math.abs(distance[0]), Math.abs(distance[
            1])];
          speed = slow ? [Math.abs(distance[0] / 4), Math.abs(
            distance[1] / 4)] : [speed, speed];
          var a = [
            Math.abs(mCSB_container[0].offsetTop) - (distance[0] *
              _m((absDistance[0] / speed[0]), speed[0])),
            Math.abs(mCSB_container[0].offsetLeft) - (distance[1] *
              _m((absDistance[1] / speed[1]), speed[1]))
          ];
          amount = o.axis === "yx" ? [a[0], a[1]] : o.axis === "x" ? [
            null, a[1]
          ] : [a[0], null];
          durB = [(absDistance[0] * 4) + o.scrollInertia, (
            absDistance[1] * 4) + o.scrollInertia];
          var md = parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
          amount[0] = absDistance[0] > md ? amount[0] : 0;
          amount[1] = absDistance[1] > md ? amount[1] : 0;
          if (d.overflowed[0]) {
            _drag(amount[0], durB[0], easing, "y", overwrite, false);
          }
          if (d.overflowed[1]) {
            _drag(amount[1], durB[1], easing, "x", overwrite, false);
          }
        }

        function _m(ds, s) {
          var r = [s * 1.5, s * 2, s / 1.5, s / 2];
          if (ds > 90) {
            return s > 4 ? r[0] : r[3];
          } else if (ds > 60) {
            return s > 3 ? r[3] : r[2];
          } else if (ds > 30) {
            return s > 8 ? r[1] : s > 6 ? r[0] : s > 4 ? s : r[2];
          } else {
            return s > 8 ? s : r[3];
          }
        }

        function _drag(amount, dur, easing, dir, overwrite, drag) {
          if (!amount) {
            return;
          }
          _scrollTo($this, amount.toString(), {
            dur: dur,
            scrollEasing: easing,
            dir: dir,
            overwrite: overwrite,
            drag: drag
          });
        }
      },
      /* -------------------- */
      /*
		SELECT TEXT EVENTS
		scrolls content when text is selected
		*/
      _selectable = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          seq = d.sequential,
          namespace = pluginPfx + "_" + d.idx,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          action;
        mCSB_container.bind("mousedown." + namespace, function(e) {
          if (touchable) {
            return;
          }
          if (!action) {
            action = 1;
            touchActive = true;
          }
        }).add(document).bind("mousemove." + namespace, function(e) {
          if (!touchable && action && _sel()) {
            var offset = mCSB_container.offset(),
              y = _coordinates(e)[0] - offset.top + mCSB_container[
                0].offsetTop,
              x = _coordinates(e)[1] - offset.left + mCSB_container[
                0].offsetLeft;
            if (y > 0 && y < wrapper.height() && x > 0 && x <
              wrapper.width()) {
              if (seq.step) {
                _seq("off", null, "stepped");
              }
            } else {
              if (o.axis !== "x" && d.overflowed[0]) {
                if (y < 0) {
                  _seq("on", 38);
                } else if (y > wrapper.height()) {
                  _seq("on", 40);
                }
              }
              if (o.axis !== "y" && d.overflowed[1]) {
                if (x < 0) {
                  _seq("on", 37);
                } else if (x > wrapper.width()) {
                  _seq("on", 39);
                }
              }
            }
          }
        }).bind("mouseup." + namespace + " dragend." + namespace,
          function(e) {
            if (touchable) {
              return;
            }
            if (action) {
              action = 0;
              _seq("off", null);
            }
            touchActive = false;
          });

        function _sel() {
          return window.getSelection ? window.getSelection().toString() :
            document.selection && document.selection.type !=
            "Control" ? document.selection.createRange().text : 0;
        }

        function _seq(a, c, s) {
          seq.type = s && action ? "stepped" : "stepless";
          seq.scrollAmount = 10;
          _sequentialScroll($this, a, c, "mcsLinearOut", s ? 60 :
            null);
        }
      },
      /* -------------------- */
      /*
		MOUSE WHEEL EVENT
		scrolls content via mouse-wheel
		via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
		*/
      _mousewheel = function() {
        if (!$(this).data(pluginPfx)) {
          return;
        } /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_dragger = [$("#mCSB_" + d.idx + "_dragger_vertical"), $(
            "#mCSB_" + d.idx + "_dragger_horizontal")],
          iframe = $("#mCSB_" + d.idx + "_container").find("iframe");
        if (iframe.length) {
          iframe.each(function() {
            $(this).load(function() {
              /* bind events on accessible iframes */
              if (_canAccessIFrame(this)) {
                $(this.contentDocument || this.contentWindow.document)
                  .bind("mousewheel." + namespace, function(e,
                    delta) {
                    _onMousewheel(e, delta);
                  });
              }
            });
          });
        }
        mCustomScrollBox.bind("mousewheel." + namespace, function(e,
          delta) {
          _onMousewheel(e, delta);
        });

        function _onMousewheel(e, delta) {
          _stop($this);
          if (_disableMousewheel($this, e.target)) {
            return;
          } /* disables mouse-wheel when hovering specific elements */
          var deltaFactor = o.mouseWheel.deltaFactor !== "auto" ?
            parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor <
              100) ? 100 : e.deltaFactor || 100,
            dur = o.scrollInertia;
          if (o.axis === "x" || o.mouseWheel.axis === "x") {
            var dir = "x",
              px = [Math.round(deltaFactor * d.scrollRatio.x),
                parseInt(o.mouseWheel.scrollAmount)
              ],
              amount = o.mouseWheel.scrollAmount !== "auto" ? px[1] :
              px[0] >= mCustomScrollBox.width() ? mCustomScrollBox.width() *
              0.9 : px[0],
              contentPos = Math.abs($("#mCSB_" + d.idx + "_container")[
                0].offsetLeft),
              draggerPos = mCSB_dragger[1][0].offsetLeft,
              limit = mCSB_dragger[1].parent().width() - mCSB_dragger[
                1].width(),
              dlt = e.deltaX || e.deltaY || delta;
          } else {
            var dir = "y",
              px = [Math.round(deltaFactor * d.scrollRatio.y),
                parseInt(o.mouseWheel.scrollAmount)
              ],
              amount = o.mouseWheel.scrollAmount !== "auto" ? px[1] :
              px[0] >= mCustomScrollBox.height() ? mCustomScrollBox.height() *
              0.9 : px[0],
              contentPos = Math.abs($("#mCSB_" + d.idx + "_container")[
                0].offsetTop),
              draggerPos = mCSB_dragger[0][0].offsetTop,
              limit = mCSB_dragger[0].parent().height() -
              mCSB_dragger[0].height(),
              dlt = e.deltaY || delta;
          }
          if ((dir === "y" && !d.overflowed[0]) || (dir === "x" && !d
            .overflowed[1])) {
            return;
          }
          if (o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice) {
            dlt = -dlt;
          }
          if (o.mouseWheel.normalizeDelta) {
            dlt = dlt < 0 ? -1 : 1;
          }
          if ((dlt > 0 && draggerPos !== 0) || (dlt < 0 && draggerPos !==
            limit) || o.mouseWheel.preventDefault) {
            e.stopImmediatePropagation();
            e.preventDefault();
          }
          if (e.deltaFactor < 2 && !o.mouseWheel.normalizeDelta) {
            //very low deltaFactor values mean some kind of delta acceleration (e.g. osx trackpad), so adjusting scrolling accordingly
            amount = e.deltaFactor;
            dur = 17;
          }
          _scrollTo($this, (contentPos - (dlt * amount)).toString(), {
            dir: dir,
            dur: dur
          });
        }
      },
      /* -------------------- */
      /* checks if iframe can be accessed */
      _canAccessIFrame = function(iframe) {
        var html = null;
        if (!iframe) {
          try {
            var doc = top.document;
            html = doc.body.innerHTML;
          } catch (err) { /* do nothing */ }
          return (html !== null);
        } else {
          try {
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            html = doc.body.innerHTML;
          } catch (err) { /* do nothing */ }
          return (html !== null);
        }
      },
      /* -------------------- */
      /* disables mouse-wheel when hovering specific elements like select, datalist etc. */
      _disableMousewheel = function(el, target) {
        var tag = target.nodeName.toLowerCase(),
          tags = el.data(pluginPfx).opt.mouseWheel.disableOver,
          /* elements that require focus */
          focusTags = ["select", "textarea"];
        return $.inArray(tag, tags) > -1 && !($.inArray(tag, focusTags) >
          -1 && !$(target).is(":focus"));
      },
      /* -------------------- */
      /*
		DRAGGER RAIL CLICK EVENT
		scrolls content via dragger rail
		*/
      _draggerRail = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          namespace = pluginPfx + "_" + d.idx,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          mCSB_draggerContainer = $(".mCSB_" + d.idx + "_scrollbar ." +
            classes[12]),
          clickable;
        mCSB_draggerContainer.bind("mousedown." + namespace +
          " touchstart." + namespace + " pointerdown." + namespace +
          " MSPointerDown." + namespace, function(e) {
            touchActive = true;
            if (!$(e.target).hasClass("mCSB_dragger")) {
              clickable = 1;
            }
          }).bind("touchend." + namespace + " pointerup." + namespace +
          " MSPointerUp." + namespace, function(e) {
            touchActive = false;
          }).bind("click." + namespace, function(e) {
          if (!clickable) {
            return;
          }
          clickable = 0;
          if ($(e.target).hasClass(classes[12]) || $(e.target).hasClass(
            "mCSB_draggerRail")) {
            _stop($this);
            var el = $(this),
              mCSB_dragger = el.find(".mCSB_dragger");
            if (el.parent(".mCSB_scrollTools_horizontal").length >
              0) {
              if (!d.overflowed[1]) {
                return;
              }
              var dir = "x",
                clickDir = e.pageX > mCSB_dragger.offset().left ? -
                1 : 1,
                to = Math.abs(mCSB_container[0].offsetLeft) - (
                  clickDir * (wrapper.width() * 0.9));
            } else {
              if (!d.overflowed[0]) {
                return;
              }
              var dir = "y",
                clickDir = e.pageY > mCSB_dragger.offset().top ? -1 :
                1,
                to = Math.abs(mCSB_container[0].offsetTop) - (
                  clickDir * (wrapper.height() * 0.9));
            }
            _scrollTo($this, to.toString(), {
              dir: dir,
              scrollEasing: "mcsEaseInOut"
            });
          }
        });
      },
      /* -------------------- */
      /*
		FOCUS EVENT
		scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
		*/
      _focus = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          namespace = pluginPfx + "_" + d.idx,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent();
        mCSB_container.bind("focusin." + namespace, function(e) {
          var el = $(document.activeElement),
            nested = mCSB_container.find(".mCustomScrollBox").length,
            dur = 0;
          if (!el.is(o.advanced.autoScrollOnFocus)) {
            return;
          }
          _stop($this);
          clearTimeout($this[0]._focusTimeout);
          $this[0]._focusTimer = nested ? (dur + 17) * nested : 0;
          $this[0]._focusTimeout = setTimeout(function() {
            var to = [_childPos(el)[0], _childPos(el)[1]],
              contentPos = [mCSB_container[0].offsetTop,
                mCSB_container[0].offsetLeft
              ],
              isVisible = [
                (contentPos[0] + to[0] >= 0 && contentPos[0] +
                  to[0] < wrapper.height() - el.outerHeight(
                    false)), (contentPos[1] + to[1] >= 0 &&
                  contentPos[0] + to[1] < wrapper.width() - el.outerWidth(
                    false))
              ],
              overwrite = (o.axis === "yx" && !isVisible[0] &&
                !isVisible[1]) ? "none" : "all";
            if (o.axis !== "x" && !isVisible[0]) {
              _scrollTo($this, to[0].toString(), {
                dir: "y",
                scrollEasing: "mcsEaseInOut",
                overwrite: overwrite,
                dur: dur
              });
            }
            if (o.axis !== "y" && !isVisible[1]) {
              _scrollTo($this, to[1].toString(), {
                dir: "x",
                scrollEasing: "mcsEaseInOut",
                overwrite: overwrite,
                dur: dur
              });
            }
          }, $this[0]._focusTimer);
        });
      },
      /* -------------------- */
      /* sets content wrapper scrollTop/scrollLeft always to 0 */
      _wrapperScroll = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          namespace = pluginPfx + "_" + d.idx,
          wrapper = $("#mCSB_" + d.idx + "_container").parent();
        wrapper.bind("scroll." + namespace, function(e) {
          if (wrapper.scrollTop() !== 0 || wrapper.scrollLeft() !==
            0) {
            $(".mCSB_" + d.idx + "_scrollbar").css("visibility",
              "hidden"); /* hide scrollbar(s) */
          }
        });
      },
      /* -------------------- */
      /*
		BUTTONS EVENTS
		scrolls content via up, down, left and right buttons
		*/
      _buttons = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          seq = d.sequential,
          namespace = pluginPfx + "_" + d.idx,
          sel = ".mCSB_" + d.idx + "_scrollbar",
          btn = $(sel + ">a");
        btn.bind("mousedown." + namespace + " touchstart." + namespace +
          " pointerdown." + namespace + " MSPointerDown." + namespace +
          " mouseup." + namespace + " touchend." + namespace +
          " pointerup." + namespace + " MSPointerUp." + namespace +
          " mouseout." + namespace + " pointerout." + namespace +
          " MSPointerOut." + namespace + " click." + namespace,
          function(e) {
            e.preventDefault();
            if (!_mouseBtnLeft(e)) {
              return;
            } /* left mouse button only */
            var btnClass = $(this).attr("class");
            seq.type = o.scrollButtons.scrollType;
            switch (e.type) {
              case "mousedown":
              case "touchstart":
              case "pointerdown":
              case "MSPointerDown":
                if (seq.type === "stepped") {
                  return;
                }
                touchActive = true;
                d.tweenRunning = false;
                _seq("on", btnClass);
                break;
              case "mouseup":
              case "touchend":
              case "pointerup":
              case "MSPointerUp":
              case "mouseout":
              case "pointerout":
              case "MSPointerOut":
                if (seq.type === "stepped") {
                  return;
                }
                touchActive = false;
                if (seq.dir) {
                  _seq("off", btnClass);
                }
                break;
              case "click":
                if (seq.type !== "stepped" || d.tweenRunning) {
                  return;
                }
                _seq("on", btnClass);
                break;
            }

            function _seq(a, c) {
              seq.scrollAmount = o.scrollButtons.scrollAmount;
              _sequentialScroll($this, a, c);
            }
          });
      },
      /* -------------------- */
      /*
		KEYBOARD EVENTS
		scrolls content via keyboard
		Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
		*/
      _keyboard = function() {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          seq = d.sequential,
          namespace = pluginPfx + "_" + d.idx,
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          editables =
          "input,textarea,select,datalist,keygen,[contenteditable='true']",
          iframe = mCSB_container.find("iframe"),
          events = ["blur." + namespace + " keydown." + namespace +
            " keyup." + namespace
          ];
        if (iframe.length) {
          iframe.each(function() {
            $(this).load(function() {
              /* bind events on accessible iframes */
              if (_canAccessIFrame(this)) {
                $(this.contentDocument || this.contentWindow.document)
                  .bind(events[0], function(e) {
                    _onKeyboard(e);
                  });
              }
            });
          });
        }
        mCustomScrollBox.attr("tabindex", "0").bind(events[0], function(
          e) {
          _onKeyboard(e);
        });

        function _onKeyboard(e) {
          switch (e.type) {
            case "blur":
              if (d.tweenRunning && seq.dir) {
                _seq("off", null);
              }
              break;
            case "keydown":
            case "keyup":
              var code = e.keyCode ? e.keyCode : e.which,
                action = "on";
              if ((o.axis !== "x" && (code === 38 || code === 40)) ||
                (o.axis !== "y" && (code === 37 || code === 39))) {
                /* up (38), down (40), left (37), right (39) arrows */
                if (((code === 38 || code === 40) && !d.overflowed[0]) ||
                  ((code === 37 || code === 39) && !d.overflowed[1])) {
                  return;
                }
                if (e.type === "keyup") {
                  action = "off";
                }
                if (!$(document.activeElement).is(editables)) {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  _seq(action, code);
                }
              } else if (code === 33 || code === 34) {
                /* PgUp (33), PgDn (34) */
                if (d.overflowed[0] || d.overflowed[1]) {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                }
                if (e.type === "keyup") {
                  _stop($this);
                  var keyboardDir = code === 34 ? -1 : 1;
                  if (o.axis === "x" || (o.axis === "yx" && d.overflowed[
                    1] && !d.overflowed[0])) {
                    var dir = "x",
                      to = Math.abs(mCSB_container[0].offsetLeft) - (
                        keyboardDir * (wrapper.width() * 0.9));
                  } else {
                    var dir = "y",
                      to = Math.abs(mCSB_container[0].offsetTop) - (
                        keyboardDir * (wrapper.height() * 0.9));
                  }
                  _scrollTo($this, to.toString(), {
                    dir: dir,
                    scrollEasing: "mcsEaseInOut"
                  });
                }
              } else if (code === 35 || code === 36) {
                /* End (35), Home (36) */
                if (!$(document.activeElement).is(editables)) {
                  if (d.overflowed[0] || d.overflowed[1]) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                  if (e.type === "keyup") {
                    if (o.axis === "x" || (o.axis === "yx" && d.overflowed[
                      1] && !d.overflowed[0])) {
                      var dir = "x",
                        to = code === 35 ? Math.abs(wrapper.width() -
                          mCSB_container.outerWidth(false)) : 0;
                    } else {
                      var dir = "y",
                        to = code === 35 ? Math.abs(wrapper.height() -
                          mCSB_container.outerHeight(false)) : 0;
                    }
                    _scrollTo($this, to.toString(), {
                      dir: dir,
                      scrollEasing: "mcsEaseInOut"
                    });
                  }
                }
              }
              break;
          }

          function _seq(a, c) {
            seq.type = o.keyboard.scrollType;
            seq.scrollAmount = o.keyboard.scrollAmount;
            if (seq.type === "stepped" && d.tweenRunning) {
              return;
            }
            _sequentialScroll($this, a, c);
          }
        }
      },
      /* -------------------- */
      /* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
      _sequentialScroll = function(el, action, trigger, e, s) {
        var d = el.data(pluginPfx),
          o = d.opt,
          seq = d.sequential,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          once = seq.type === "stepped" ? true : false,
          steplessSpeed = o.scrollInertia < 26 ? 26 : o.scrollInertia,
          /* 26/1.5=17 */
          steppedSpeed = o.scrollInertia < 1 ? 17 : o.scrollInertia;
        switch (action) {
          case "on":
            seq.dir = [
              (trigger === classes[16] || trigger === classes[15] ||
                trigger === 39 || trigger === 37 ? "x" : "y"), (
                trigger === classes[13] || trigger === classes[15] ||
                trigger === 38 || trigger === 37 ? -1 : 1)
            ];
            _stop(el);
            if (_isNumeric(trigger) && seq.type === "stepped") {
              return;
            }
            _on(once);
            break;
          case "off":
            _off();
            if (once || (d.tweenRunning && seq.dir)) {
              _on(true);
            }
            break;
        }
        /* starts sequence */
        function _on(once) {
            if (o.snapAmount) {
              seq.scrollAmount = !(o.snapAmount instanceof Array) ? o.snapAmount :
                seq.dir[0] === "x" ? o.snapAmount[1] : o.snapAmount[0];
            } /* scrolling snapping */
            var c = seq.type !== "stepped",
              /* continuous scrolling */
              t = s ? s : !once ? 1000 / 60 : c ? steplessSpeed / 1.5 :
              steppedSpeed,
              /* timer */
              m = !once ? 2.5 : c ? 7.5 : 40,
              /* multiplier */
              contentPos = [Math.abs(mCSB_container[0].offsetTop), Math
                .abs(mCSB_container[0].offsetLeft)
              ],
              ratio = [d.scrollRatio.y > 10 ? 10 : d.scrollRatio.y, d.scrollRatio
                .x > 10 ? 10 : d.scrollRatio.x
              ],
              amount = seq.dir[0] === "x" ? contentPos[1] + (seq.dir[1] *
                (ratio[1] * m)) : contentPos[0] + (seq.dir[1] * (ratio[
                0] * m)),
              px = seq.dir[0] === "x" ? contentPos[1] + (seq.dir[1] *
                parseInt(seq.scrollAmount)) : contentPos[0] + (seq.dir[
                1] * parseInt(seq.scrollAmount)),
              to = seq.scrollAmount !== "auto" ? px : amount,
              easing = e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" :
              "mcsEaseInOut",
              onComplete = !once ? false : true;
            if (once && t < 17) {
              to = seq.dir[0] === "x" ? contentPos[1] : contentPos[0];
            }
            _scrollTo(el, to.toString(), {
              dir: seq.dir[0],
              scrollEasing: easing,
              dur: t,
              onComplete: onComplete
            });
            if (once) {
              seq.dir = false;
              return;
            }
            clearTimeout(seq.step);
            seq.step = setTimeout(function() {
              _on();
            }, t);
          }
          /* stops sequence */

        function _off() {
          clearTimeout(seq.step);
          _delete(seq, "step");
          _stop(el);
        }
      },
      /* -------------------- */
      /* returns a yx array from value */
      _arr = function(val) {
        var o = $(this).data(pluginPfx).opt,
          vals = [];
        if (typeof val === "function") {
          val = val();
        } /* check if the value is a single anonymous function */
        /* check if value is object or array, its length and create an array with yx values */
        if (!(val instanceof Array)) { /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
          vals[0] = val.y ? val.y : val.x || o.axis === "x" ? null :
            val;
          vals[1] = val.x ? val.x : val.y || o.axis === "y" ? null :
            val;
        } else { /* array value (e.g. [100,100]) */
          vals = val.length > 1 ? [val[0], val[1]] : o.axis === "x" ? [
            null, val[0]
          ] : [val[0], null];
        }
        /* check if array values are anonymous functions */
        if (typeof vals[0] === "function") {
          vals[0] = vals[0]();
        }
        if (typeof vals[1] === "function") {
          vals[1] = vals[1]();
        }
        return vals;
      },
      /* -------------------- */
      /* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
      _to = function(val, dir) {
        if (val == null || typeof val == "undefined") {
          return;
        }
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          t = typeof val;
        if (!dir) {
          dir = o.axis === "x" ? "x" : "y";
        }
        var contentLength = dir === "x" ? mCSB_container.outerWidth(
            false) : mCSB_container.outerHeight(false),
          contentPos = dir === "x" ? mCSB_container[0].offsetLeft :
          mCSB_container[0].offsetTop,
          cssProp = dir === "x" ? "left" : "top";
        switch (t) {
          case "function":
            /* this currently is not used. Consider removing it */
            return val();
            break;
          case "object":
            /* js/jquery object */ var obj = val.jquery ? val : $(val);
            if (!obj.length) {
              return;
            }
            return dir === "x" ? _childPos(obj)[1] : _childPos(obj)[0];
            break;
          case "string":
          case "number":
            if (_isNumeric(val)) { /* numeric value */
              return Math.abs(val);
            } else if (val.indexOf("%") !== -1) { /* percentage value */
              return Math.abs(contentLength * parseInt(val) / 100);
            } else if (val.indexOf("-=") !== -1) { /* decrease value */
              return Math.abs(contentPos - parseInt(val.split("-=")[1]));
            } else if (val.indexOf("+=") !== -1) { /* inrease value */
              var p = (contentPos + parseInt(val.split("+=")[1]));
              return p >= 0 ? 0 : Math.abs(p);
            } else if (val.indexOf("px") !== -1 && _isNumeric(val.split(
              "px")[0])) { /* pixels string value (e.g. "100px") */
              return Math.abs(val.split("px")[0]);
            } else {
              if (val === "top" || val === "left") { /* special strings */
                return 0;
              } else if (val === "bottom") {
                return Math.abs(wrapper.height() - mCSB_container.outerHeight(
                  false));
              } else if (val === "right") {
                return Math.abs(wrapper.width() - mCSB_container.outerWidth(
                  false));
              } else if (val === "first" || val === "last") {
                var obj = mCSB_container.find(":" + val);
                return dir === "x" ? _childPos(obj)[1] : _childPos(obj)[
                  0];
              } else {
                if ($(val).length) { /* jquery selector */
                  return dir === "x" ? _childPos($(val))[1] : _childPos(
                    $(val))[0];
                } else { /* other values (e.g. "100em") */
                  mCSB_container.css(cssProp, val);
                  methods.update.call(null, $this[0]);
                  return;
                }
              }
            }
            break;
        }
      },
      /* -------------------- */
      /* calls the update method automatically */
      _autoUpdate = function(rem) {
        var $this = $(this),
          d = $this.data(pluginPfx),
          o = d.opt,
          mCSB_container = $("#mCSB_" + d.idx + "_container");
        if (rem) {
          /*
				removes autoUpdate timer
				usage: _autoUpdate.call(this,"remove");
				*/
          clearTimeout(mCSB_container[0].autoUpdate);
          _delete(mCSB_container[0], "autoUpdate");
          return;
        }
        upd();

        function upd() {
            clearTimeout(mCSB_container[0].autoUpdate);
            if ($this.parents("html").length === 0) {
              /* check element in dom tree */
              $this = null;
              return;
            }
            mCSB_container[0].autoUpdate = setTimeout(function() {
              /* update on specific selector(s) length and size change */
              if (o.advanced.updateOnSelectorChange) {
                d.poll.change.n = sizesSum();
                if (d.poll.change.n !== d.poll.change.o) {
                  d.poll.change.o = d.poll.change.n;
                  doUpd(3);
                  return;
                }
              }
              /* update on main element and scrollbar size changes */
              if (o.advanced.updateOnContentResize) {
                d.poll.size.n = $this[0].scrollHeight + $this[0].scrollWidth +
                  mCSB_container[0].offsetHeight + $this[0].offsetHeight +
                  $this[0].offsetWidth;
                if (d.poll.size.n !== d.poll.size.o) {
                  d.poll.size.o = d.poll.size.n;
                  doUpd(1);
                  return;
                }
              }
              /* update on image load */
              if (o.advanced.updateOnImageLoad) {
                if (!(o.advanced.updateOnImageLoad === "auto" && o.axis ===
                  "y")) { //by default, it doesn't run on vertical content
                  d.poll.img.n = mCSB_container.find("img").length;
                  if (d.poll.img.n !== d.poll.img.o) {
                    d.poll.img.o = d.poll.img.n;
                    mCSB_container.find("img").each(function() {
                      imgLoader(this);
                    });
                    return;
                  }
                }
              }
              if (o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize ||
                o.advanced.updateOnImageLoad) {
                upd();
              }
            }, o.advanced.autoUpdateTimeout);
          }
          /* a tiny image loader */

        function imgLoader(el) {
            if ($(el).hasClass(classes[2])) {
              doUpd();
              return;
            }
            var img = new Image();

            function createDelegate(contextObject, delegateMethod) {
              return function() {
                return delegateMethod.apply(contextObject,
                  arguments);
              }
            }

            function imgOnLoad() {
              this.onload = null;
              $(el).addClass(classes[2]);
              doUpd(2);
            }
            img.onload = createDelegate(img, imgOnLoad);
            img.src = el.src;
          }
          /* returns the total height and width sum of all elements matching the selector */

        function sizesSum() {
            if (o.advanced.updateOnSelectorChange === true) {
              o.advanced.updateOnSelectorChange = "*";
            }
            var total = 0,
              sel = mCSB_container.find(o.advanced.updateOnSelectorChange);
            if (o.advanced.updateOnSelectorChange && sel.length > 0) {
              sel.each(function() {
                total += this.offsetHeight + this.offsetWidth;
              });
            }
            return total;
          }
          /* calls the update method */

        function doUpd(cb) {
          clearTimeout(mCSB_container[0].autoUpdate);
          methods.update.call(null, $this[0], cb);
        }
      },
      /* -------------------- */
      /* snaps scrolling to a multiple of a pixels number */
      _snapAmount = function(to, amount, offset) {
        return (Math.round(to / amount) * amount - offset);
      },
      /* -------------------- */
      /* stops content and scrollbar animations */
      _stop = function(el) {
        var d = el.data(pluginPfx),
          sel = $("#mCSB_" + d.idx + "_container,#mCSB_" + d.idx +
            "_container_wrapper,#mCSB_" + d.idx +
            "_dragger_vertical,#mCSB_" + d.idx + "_dragger_horizontal");
        sel.each(function() {
          _stopTween.call(this);
        });
      },
      /* -------------------- */
      /*
		ANIMATES CONTENT
		This is where the actual scrolling happens
		*/
      _scrollTo = function(el, to, options) {
        var d = el.data(pluginPfx),
          o = d.opt,
          defaults = {
            trigger: "internal",
            dir: "y",
            scrollEasing: "mcsEaseOut",
            drag: false,
            dur: o.scrollInertia,
            overwrite: "all",
            callbacks: true,
            onStart: true,
            onUpdate: true,
            onComplete: true
          },
          options = $.extend(defaults, options),
          dur = [options.dur, (options.drag ? 0 : options.dur)],
          mCustomScrollBox = $("#mCSB_" + d.idx),
          mCSB_container = $("#mCSB_" + d.idx + "_container"),
          wrapper = mCSB_container.parent(),
          totalScrollOffsets = o.callbacks.onTotalScrollOffset ? _arr.call(
            el, o.callbacks.onTotalScrollOffset) : [0, 0],
          totalScrollBackOffsets = o.callbacks.onTotalScrollBackOffset ?
          _arr.call(el, o.callbacks.onTotalScrollBackOffset) : [0, 0];
        d.trigger = options.trigger;
        if (wrapper.scrollTop() !== 0 || wrapper.scrollLeft() !== 0) { /* always reset scrollTop/Left */
          $(".mCSB_" + d.idx + "_scrollbar").css("visibility",
            "visible");
          wrapper.scrollTop(0).scrollLeft(0);
        }
        if (to === "_resetY" && !d.contentReset.y) {
          /* callbacks: onOverflowYNone */
          if (_cb("onOverflowYNone")) {
            o.callbacks.onOverflowYNone.call(el[0]);
          }
          d.contentReset.y = 1;
        }
        if (to === "_resetX" && !d.contentReset.x) {
          /* callbacks: onOverflowXNone */
          if (_cb("onOverflowXNone")) {
            o.callbacks.onOverflowXNone.call(el[0]);
          }
          d.contentReset.x = 1;
        }
        if (to === "_resetY" || to === "_resetX") {
          return;
        }
        if ((d.contentReset.y || !el[0].mcs) && d.overflowed[0]) {
          /* callbacks: onOverflowY */
          if (_cb("onOverflowY")) {
            o.callbacks.onOverflowY.call(el[0]);
          }
          d.contentReset.x = null;
        }
        if ((d.contentReset.x || !el[0].mcs) && d.overflowed[1]) {
          /* callbacks: onOverflowX */
          if (_cb("onOverflowX")) {
            o.callbacks.onOverflowX.call(el[0]);
          }
          d.contentReset.x = null;
        }
        if (o.snapAmount) { /* scrolling snapping */
          var snapAmount = !(o.snapAmount instanceof Array) ? o.snapAmount :
            options.dir === "x" ? o.snapAmount[1] : o.snapAmount[0];
          to = _snapAmount(to, snapAmount, o.snapOffset);
        }
        switch (options.dir) {
          case "x":
            var mCSB_dragger = $("#mCSB_" + d.idx +
                "_dragger_horizontal"),
              property = "left",
              contentPos = mCSB_container[0].offsetLeft,
              limit = [
                mCustomScrollBox.width() - mCSB_container.outerWidth(
                  false),
                mCSB_dragger.parent().width() - mCSB_dragger.width()
              ],
              scrollTo = [to, to === 0 ? 0 : (to / d.scrollRatio.x)],
              tso = totalScrollOffsets[1],
              tsbo = totalScrollBackOffsets[1],
              totalScrollOffset = tso > 0 ? tso / d.scrollRatio.x : 0,
              totalScrollBackOffset = tsbo > 0 ? tsbo / d.scrollRatio.x :
              0;
            break;
          case "y":
            var mCSB_dragger = $("#mCSB_" + d.idx + "_dragger_vertical"),
              property = "top",
              contentPos = mCSB_container[0].offsetTop,
              limit = [
                mCustomScrollBox.height() - mCSB_container.outerHeight(
                  false),
                mCSB_dragger.parent().height() - mCSB_dragger.height()
              ],
              scrollTo = [to, to === 0 ? 0 : (to / d.scrollRatio.y)],
              tso = totalScrollOffsets[0],
              tsbo = totalScrollBackOffsets[0],
              totalScrollOffset = tso > 0 ? tso / d.scrollRatio.y : 0,
              totalScrollBackOffset = tsbo > 0 ? tsbo / d.scrollRatio.y :
              0;
            break;
        }
        if (scrollTo[1] < 0 || (scrollTo[0] === 0 && scrollTo[1] === 0)) {
          scrollTo = [0, 0];
        } else if (scrollTo[1] >= limit[1]) {
          scrollTo = [limit[0], limit[1]];
        } else {
          scrollTo[0] = -scrollTo[0];
        }
        if (!el[0].mcs) {
          _mcs(); /* init mcs object (once) to make it available before callbacks */
          if (_cb("onInit")) {
            o.callbacks.onInit.call(el[0]);
          } /* callbacks: onInit */
        }
        clearTimeout(mCSB_container[0].onCompleteTimeout);
        _tweenTo(mCSB_dragger[0], property, Math.round(scrollTo[1]),
          dur[1], options.scrollEasing);
        if (!d.tweenRunning && ((contentPos === 0 && scrollTo[0] >= 0) ||
          (contentPos === limit[0] && scrollTo[0] <= limit[0]))) {
          return;
        }
        _tweenTo(mCSB_container[0], property, Math.round(scrollTo[0]),
          dur[0], options.scrollEasing, options.overwrite, {
            onStart: function() {
              if (options.callbacks && options.onStart && !d.tweenRunning) {
                /* callbacks: onScrollStart */
                if (_cb("onScrollStart")) {
                  _mcs();
                  o.callbacks.onScrollStart.call(el[0]);
                }
                d.tweenRunning = true;
                _onDragClasses(mCSB_dragger);
                d.cbOffsets = _cbOffsets();
              }
            },
            onUpdate: function() {
              if (options.callbacks && options.onUpdate) {
                /* callbacks: whileScrolling */
                if (_cb("whileScrolling")) {
                  _mcs();
                  o.callbacks.whileScrolling.call(el[0]);
                }
              }
            },
            onComplete: function() {
              if (options.callbacks && options.onComplete) {
                if (o.axis === "yx") {
                  clearTimeout(mCSB_container[0].onCompleteTimeout);
                }
                var t = mCSB_container[0].idleTimer || 0;
                mCSB_container[0].onCompleteTimeout = setTimeout(
                  function() {
                    /* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
                    if (_cb("onScroll")) {
                      _mcs();
                      o.callbacks.onScroll.call(el[0]);
                    }
                    if (_cb("onTotalScroll") && scrollTo[1] >=
                      limit[1] - totalScrollOffset && d.cbOffsets[
                        0]) {
                      _mcs();
                      o.callbacks.onTotalScroll.call(el[0]);
                    }
                    if (_cb("onTotalScrollBack") && scrollTo[1] <=
                      totalScrollBackOffset && d.cbOffsets[1]) {
                      _mcs();
                      o.callbacks.onTotalScrollBack.call(el[0]);
                    }
                    d.tweenRunning = false;
                    mCSB_container[0].idleTimer = 0;
                    _onDragClasses(mCSB_dragger, "hide");
                  }, t);
              }
            }
          });
        /* checks if callback function exists */
        function _cb(cb) {
            return d && o.callbacks[cb] && typeof o.callbacks[cb] ===
              "function";
          }
          /* checks whether callback offsets always trigger */

        function _cbOffsets() {
            return [o.callbacks.alwaysTriggerOffsets || contentPos >=
              limit[0] + tso, o.callbacks.alwaysTriggerOffsets ||
              contentPos <= -tsbo
            ];
          }
          /*
			populates object with useful values for the user
			values:
				content: this.mcs.content
				content top position: this.mcs.top
				content left position: this.mcs.left
				dragger top position: this.mcs.draggerTop
				dragger left position: this.mcs.draggerLeft
				scrolling y percentage: this.mcs.topPct
				scrolling x percentage: this.mcs.leftPct
				scrolling direction: this.mcs.direction
			*/

        function _mcs() {
          var cp = [mCSB_container[0].offsetTop, mCSB_container[0].offsetLeft],
            /* content position */
            dp = [mCSB_dragger[0].offsetTop, mCSB_dragger[0].offsetLeft],
            /* dragger position */
            cl = [mCSB_container.outerHeight(false), mCSB_container.outerWidth(
              false)],
            /* content length */
            pl = [mCustomScrollBox.height(), mCustomScrollBox.width()]; /* content parent length */
          el[0].mcs = {
            content: mCSB_container,
            /* original content wrapper as jquery object */
            top: cp[0],
            left: cp[1],
            draggerTop: dp[0],
            draggerLeft: dp[1],
            topPct: Math.round((100 * Math.abs(cp[0])) / (Math.abs(
              cl[0]) - pl[0])),
            leftPct: Math.round((100 * Math.abs(cp[1])) / (Math.abs(
              cl[1]) - pl[1])),
            direction: options.dir
          };
          /*
				this refers to the original element containing the scrollbar(s)
				usage: this.mcs.top, this.mcs.leftPct etc.
				*/
        }
      },
      /* -------------------- */
      /*
		CUSTOM JAVASCRIPT ANIMATION TWEEN
		Lighter and faster than jquery animate() and css transitions
		Animates top/left properties and includes easings
		*/
      _tweenTo = function(el, prop, to, duration, easing, overwrite,
        callbacks) {
        if (!el._mTween) {
          el._mTween = {
            top: {},
            left: {}
          };
        }
        var callbacks = callbacks || {},
          onStart = callbacks.onStart || function() {},
          onUpdate = callbacks.onUpdate || function() {},
          onComplete = callbacks.onComplete || function() {},
          startTime = _getTime(),
          _delay, progress = 0,
          from = el.offsetTop,
          elStyle = el.style,
          _request, tobj = el._mTween[prop];
        if (prop === "left") {
          from = el.offsetLeft;
        }
        var diff = to - from;
        tobj.stop = 0;
        if (overwrite !== "none") {
          _cancelTween();
        }
        _startTween();

        function _step() {
          if (tobj.stop) {
            return;
          }
          if (!progress) {
            onStart.call();
          }
          progress = _getTime() - startTime;
          _tween();
          if (progress >= tobj.time) {
            tobj.time = (progress > tobj.time) ? progress + _delay -
              (progress - tobj.time) : progress + _delay - 1;
            if (tobj.time < progress + 1) {
              tobj.time = progress + 1;
            }
          }
          if (tobj.time < duration) {
            tobj.id = _request(_step);
          } else {
            onComplete.call();
          }
        }

        function _tween() {
          if (duration > 0) {
            tobj.currVal = _ease(tobj.time, from, diff, duration,
              easing);
            elStyle[prop] = Math.round(tobj.currVal) + "px";
          } else {
            elStyle[prop] = to + "px";
          }
          onUpdate.call();
        }

        function _startTween() {
          _delay = 1000 / 60;
          tobj.time = progress + _delay;
          _request = (!window.requestAnimationFrame) ? function(f) {
            _tween();
            return setTimeout(f, 0.01);
          } : window.requestAnimationFrame;
          tobj.id = _request(_step);
        }

        function _cancelTween() {
          if (tobj.id == null) {
            return;
          }
          if (!window.requestAnimationFrame) {
            clearTimeout(tobj.id);
          } else {
            window.cancelAnimationFrame(tobj.id);
          }
          tobj.id = null;
        }

        function _ease(t, b, c, d, type) {
          switch (type) {
            case "linear":
            case "mcsLinear":
              return c * t / d + b;
              break;
            case "mcsLinearOut":
              t /= d;
              t--;
              return c * Math.sqrt(1 - t * t) + b;
              break;
            case "easeInOutSmooth":
              t /= d / 2;
              if (t < 1) return c / 2 * t * t + b;
              t--;
              return -c / 2 * (t * (t - 2) - 1) + b;
              break;
            case "easeInOutStrong":
              t /= d / 2;
              if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
              t--;
              return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
              break;
            case "easeInOut":
            case "mcsEaseInOut":
              t /= d / 2;
              if (t < 1) return c / 2 * t * t * t + b;
              t -= 2;
              return c / 2 * (t * t * t + 2) + b;
              break;
            case "easeOutSmooth":
              t /= d;
              t--;
              return -c * (t * t * t * t - 1) + b;
              break;
            case "easeOutStrong":
              return c * (-Math.pow(2, -10 * t / d) + 1) + b;
              break;
            case "easeOut":
            case "mcsEaseOut":
            default:
              var ts = (t /= d) * t,
                tc = ts * t;
              return b + c * (0.499999999999997 * tc * ts + -2.5 * ts *
                ts + 5.5 * tc + -6.5 * ts + 4 * t);
          }
        }
      },
      /* -------------------- */
      /* returns current time */
      _getTime = function() {
        if (window.performance && window.performance.now) {
          return window.performance.now();
        } else {
          if (window.performance && window.performance.webkitNow) {
            return window.performance.webkitNow();
          } else {
            if (Date.now) {
              return Date.now();
            } else {
              return new Date().getTime();
            }
          }
        }
      },
      /* -------------------- */
      /* stops a tween */
      _stopTween = function() {
        var el = this;
        if (!el._mTween) {
          el._mTween = {
            top: {},
            left: {}
          };
        }
        var props = ["top", "left"];
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          if (el._mTween[prop].id) {
            if (!window.requestAnimationFrame) {
              clearTimeout(el._mTween[prop].id);
            } else {
              window.cancelAnimationFrame(el._mTween[prop].id);
            }
            el._mTween[prop].id = null;
            el._mTween[prop].stop = 1;
          }
        }
      },
      /* -------------------- */
      /* deletes a property (avoiding the exception thrown by IE) */
      _delete = function(c, m) {
        try {
          delete c[m];
        } catch (e) {
          c[m] = null;
        }
      },
      /* -------------------- */
      /* detects left mouse button */
      _mouseBtnLeft = function(e) {
        return !(e.which && e.which !== 1);
      },
      /* -------------------- */
      /* detects if pointer type event is touch */
      _pointerTouch = function(e) {
        var t = e.originalEvent.pointerType;
        return !(t && t !== "touch" && t !== 2);
      },
      /* -------------------- */
      /* checks if value is numeric */
      _isNumeric = function(val) {
        return !isNaN(parseFloat(val)) && isFinite(val);
      },
      /* -------------------- */
      /* returns element position according to content */
      _childPos = function(el) {
        var p = el.parents(".mCSB_container");
        return [el.offset().top - p.offset().top, el.offset().left - p.offset()
          .left
        ];
      },
      /* -------------------- */
      /* checks if browser tab is hidden/inactive via Page Visibility API */
      _isTabHidden = function() {
        var prop = _getHiddenProp();
        if (!prop) return false;
        return document[prop];

        function _getHiddenProp() {
          var pfx = ["webkit", "moz", "ms", "o"];
          if ("hidden" in document) return "hidden"; //natively supported
          for (var i = 0; i < pfx.length; i++) { //prefixed
            if ((pfx[i] + "Hidden") in document) return pfx[i] +
              "Hidden";
          }
          return null; //not supported
        }
      };
    /* -------------------- */
    /*
	----------------------------------------
	PLUGIN SETUP
	----------------------------------------
	*/
    /* plugin constructor functions */
    $.fn[pluginNS] = function(method) { /* usage: $(selector).mCustomScrollbar(); */
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(
          arguments, 1));
      } else if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        $.error("Method " + method + " does not exist");
      }
    };
    $[pluginNS] = function(method) { /* usage: $.mCustomScrollbar(); */
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(
          arguments, 1));
      } else if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        $.error("Method " + method + " does not exist");
      }
    };
    /*
	allow setting plugin default options.
	usage: $.mCustomScrollbar.defaults.scrollInertia=500;
	to apply any changed default options on default selectors (below), use inside document ready fn
	e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
	*/
    $[pluginNS].defaults = defaults;
    /*
	add window object (window.mCustomScrollbar)
	usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
	*/
    window[pluginNS] = true;
    $(window).load(function() {
      $(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */
      /* extend jQuery expressions */
      $.extend($.expr[":"], {
        /* checks if element is within scrollable viewport */
        mcsInView: $.expr[":"].mcsInView || function(el) {
          var $el = $(el),
            content = $el.parents(".mCSB_container"),
            wrapper, cPos;
          if (!content.length) {
            return;
          }
          wrapper = content.parent();
          cPos = [content[0].offsetTop, content[0].offsetLeft];
          return cPos[0] + _childPos($el)[0] >= 0 && cPos[0] +
            _childPos($el)[0] < wrapper.height() - $el.outerHeight(
              false) && cPos[1] + _childPos($el)[1] >= 0 &&
            cPos[1] + _childPos($el)[1] < wrapper.width() -
            $el.outerWidth(false);
        },
        /* checks if element is overflowed having visible scrollbar(s) */
        mcsOverflow: $.expr[":"].mcsOverflow || function(el) {
          var d = $(el).data(pluginPfx);
          if (!d) {
            return;
          }
          return d.overflowed[0] || d.overflowed[1];
        }
      });
    });
  }))
}));


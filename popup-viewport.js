(function (root) {
  "use strict";
  const PAD = 12;
  function visibleBounds(mapRect, viewport, padding = PAD) {
    const left = Math.max(mapRect.left, viewport.left) + padding;
    const top = Math.max(mapRect.top, viewport.top) + padding;
    const right = Math.min(mapRect.right, viewport.right) - padding;
    const bottom = Math.min(mapRect.bottom, viewport.bottom) - padding;
    return {left, top, right, bottom, width:right-left, height:bottom-top};
  }
  function panOffset(rect, bounds) {
    // Positive panBy moves the popup left/up. Never move an already fitted popup.
    const x = rect.left < bounds.left ? rect.left-bounds.left : Math.max(0,rect.right-bounds.right);
    const y = rect.top < bounds.top ? rect.top-bounds.top : Math.max(0,rect.bottom-bounds.bottom);
    return [Math.abs(x)>1 ? x : 0, Math.abs(y)>1 ? y : 0];
  }
  root.WROC_POPUP_VIEWPORT = Object.freeze({visibleBounds,panOffset});
  if (!root.L) return;
  // One fitter owns panning, avoiding a competing Leaflet keepInView feedback loop.
  root.L.Popup.addInitHook(function () { this.options.autoPan=false; this.options.keepInView=false; });
  root.L.Map.addInitHook(function () {
    const map=this, container=map.getContainer();
    // Leaflet corner controls use z-index 1000; an open popup must not have its
    // title or close button obscured when fitted against the map's upper edge.
    const pane=map.getPane?.('popupPane');
    if(pane) pane.style.zIndex='1100';
    let active=null, frame=0, observer=null;
    const originalOptions=new WeakMap();
    function schedule() { if(active&&!frame) frame=requestAnimationFrame(fit); }
    function fit() {
      frame=0;
      if(!active||!map.hasLayer(active)) return;
      const element=active.getElement();
      if(!element) return;
      const visual=root.visualViewport;
      const viewport={left:visual?.offsetLeft||0,top:visual?.offsetTop||0,right:(visual?.offsetLeft||0)+(visual?.width||root.innerWidth),bottom:(visual?.offsetTop||0)+(visual?.height||root.innerHeight)};
      // Respect fixed/sticky page chrome, but never treat map controls as a header.
      document.querySelectorAll('header, #wroc-now-in-wroclaw').forEach(header=>{
        const style=getComputedStyle(header), r=header.getBoundingClientRect();
        if((style.position==='fixed'||style.position==='sticky')&&r.top<=viewport.top+1&&r.bottom>viewport.top&&r.left<container.getBoundingClientRect().right&&r.right>container.getBoundingClientRect().left) viewport.top=r.bottom;
      });
      const bounds=visibleBounds(container.getBoundingClientRect(),viewport);
      // A map outside the viewport waits for scrolling; do not scroll the page or
      // collapse a popup into a sliver when its map is almost entirely offscreen.
      if(bounds.width<80||bounds.height<100) return;
      const content=element.querySelector('.leaflet-popup-content');
      if(!content) return;
      if(!originalOptions.has(active)) originalOptions.set(active,{maxWidth:Math.min(active.options.maxWidth,content.getBoundingClientRect().width||active.options.maxWidth),minWidth:active.options.minWidth,maxHeight:active.options.maxHeight});
      const saved=originalOptions.get(active);
      const width=Math.max(40,Math.floor(Math.min(saved.maxWidth,bounds.width-36)));
      const height=Math.max(40,Math.floor(Math.min(saved.maxHeight||Infinity,bounds.height-48)));
      if(active.options.maxWidth!==width||active.options.maxHeight!==height||active.options.minWidth>width){
        active.options.maxWidth=width;active.options.minWidth=Math.min(saved.minWidth,width);active.options.maxHeight=height;
        active.update();
      }
      // Override the legacy shared 300px !important rule for narrow visible maps.
      content.style.setProperty('width',width+'px','important');
      element.classList.add('wroc-fitted-popup');
      // Native content scrolling keeps the close button outside the scroll area.
      content.style.maxHeight=height+'px';
      content.style.overflowY='auto';content.style.overscrollBehavior='contain';
      if(!content.hasAttribute('tabindex')) content.setAttribute('tabindex','0');
      const offset=panOffset(element.getBoundingClientRect(),bounds);
      if(offset[0]||offset[1]) map.panBy(offset,{animate:false});
    }
    function close() { active=null;observer?.disconnect();observer=null;if(frame)cancelAnimationFrame(frame);frame=0; }
    map.on('popupopen',event=>{
      close();active=event.popup;
      if(root.ResizeObserver){observer=new ResizeObserver(schedule);observer.observe(active.getElement());}
      schedule();
    });
    map.on('popupclose',close);
    map.on('moveend resize',schedule);
    container.addEventListener('load',schedule,true);
    root.addEventListener('resize',schedule,{passive:true});
    root.addEventListener('orientationchange',schedule,{passive:true});
    root.addEventListener('scroll',schedule,{passive:true,capture:true});
    root.visualViewport?.addEventListener('resize',schedule,{passive:true});
    root.visualViewport?.addEventListener('scroll',schedule,{passive:true});
    map.on('unload',()=>{close();container.removeEventListener('load',schedule,true);root.removeEventListener('resize',schedule);root.removeEventListener('orientationchange',schedule);root.removeEventListener('scroll',schedule,true);root.visualViewport?.removeEventListener('resize',schedule);root.visualViewport?.removeEventListener('scroll',schedule);});
  });
})(typeof window!=='undefined'?window:globalThis);

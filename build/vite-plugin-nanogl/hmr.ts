export default function hmr(source) {
  return source += `
fn._hmrListeners = []
fn.onHmr = function(l){
  this._hmrListeners.push( l )
}
fn._triggerHmr = function(){
  for (const l of this._hmrListeners) {
    l( this )
  }
}

if( import.meta.hot ){
  if( import.meta.hot.data && import.meta.hot.data._hmrListeners ){
    fn._hmrListeners = import.meta.hot.data._hmrListeners;
    fn._triggerHmr()
  }
  
  import.meta.hot.dispose(data => {
    data._hmrListeners = fn._hmrListeners;
  });
  
  import.meta.hot.accept(
    function(e){} // Function to handle errors when evaluating the new version
  );
}
`
}
import is from 'is_js';

const getDeviceLayout = () => {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  let boardWidth = Math.min(width, height, 800);

  let infoWidth, layout;

  if (width < boardWidth + 120){
    layout = "portrait";
    infoWidth = width;
  }else{
    layout = "landscape";
    if (is.mobile()){
      infoWidth = width-boardWidth;
    }else{
      infoWidth = width-boardWidth-20; // save space for scroll bar
    }
  }

  //console.log("width:", width)
  //console.log("boardWidth:", boardWidth)
  //console.log("infoWidth:", infoWidth)

  return {
    layout,
    boardWidth,
    infoWidth,
  };
};


export default {
  getDeviceLayout
};



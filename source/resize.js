/**
 * For resizing elements depends on the window size
 */
const resizeElements = () => {
  /* Resize timer */
  let inputText = '';
  
  if (window.innerHeight < MIN_HEIGHT) {
    inputText = inputText
      .concat('translateY(')
      .concat(
        (window.innerHeight < MIN_HEIGHT_STOP_CHANGE
          ? -100
          : (window.innerHeight - MIN_HEIGHT) / 2
        ).toString()
      )
      .concat('px)');
  }
  
  if (window.innerWidth < MIN_WIDTH) {
    inputText = inputText
      .concat(' scale(')
      .concat((window.innerWidth / MIN_WIDTH).toString())
      .concat(') ');
  }
  
  pomoTimer.changeTransform(inputText);
  
  /* Resize reset of the elements */
  if (window.innerWidth < MIN_WIDTH) {
    pomoFinish.changeTransform(
      'scale('
      .concat((window.innerWidth / MIN_WIDTH).toString())
      .concat(') translateX(')
      .concat(
        (
          (((MIN_WIDTH - window.innerWidth) / window.innerWidth) * MIN_WIDTH) /
          X_OFFSET_FACTOR
        ).toString()
      )
      .concat('px)')
    );
    pomoInfo.changeTransform(
      'scale('
        .concat((window.innerWidth / MIN_WIDTH).toString())
        .concat(') translateX(')
        .concat(
          (
            (((MIN_WIDTH - window.innerWidth) / window.innerWidth) * MIN_WIDTH) /
            X_OFFSET_FACTOR
          ).toString()
        )
        .concat('px)')
    );
    pomoSettings.changeTransform(
      'scale('
        .concat((window.innerWidth / MIN_WIDTH).toString())
        .concat(') translateX(')
        .concat(
          (
            (((window.innerWidth - MIN_WIDTH) / window.innerWidth) * MIN_WIDTH) /
            X_OFFSET_FACTOR
          ).toString()
        )
        .concat('px)'),
      'scale('
        .concat((window.innerWidth / MIN_WIDTH).toString())
        .concat(') translateX(')
        .concat(
          (
            (((window.innerWidth - MIN_WIDTH) / window.innerWidth) * MIN_WIDTH) /
            X_OFFSET_FACTOR
          ).toString()
        )
        .concat('px)'),
      (MIN_WIDTH - window.innerWidth) / 5
    );
  } else {
    pomoFinish.changeTransform(null);
    pomoInfo.changeTransform(null);
    pomoSettings.changeTransform(null, null, null);
  }
};
  
window.addEventListener('resize', resizeElements);
window.addEventListener('load', resizeElements);
  
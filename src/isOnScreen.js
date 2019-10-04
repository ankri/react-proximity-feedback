const isOnScreen = ref => {
    let distanceToScreenBottom = ref.current.getBoundingClientRect().top - document.documentElement.clientHeight;
    let distanceToScreenTop = ref.current.getBoundingClientRect().bottom;
	let isVisible = false;

    if (distanceToScreenTop < -150 || distanceToScreenBottom > 150) {
      isVisible = false;
    } else isVisible = true;
    
	return isVisible;
}

export default isOnScreen;

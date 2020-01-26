export const isMobile = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (isMobile) {
        window.location = 'http://m.rnchats.com';
        console.log("You are using Mobile")
    }else {
        window.location = 'http://rnchats.com';
        console.log("You are using Desktop")
    }
}
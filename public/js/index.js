/**
 * ChatServer
 *
 * @author Fakedo0r <luvel88@gmail.com>
 * @copyright 
 * @license GPL v3
 */
 
function inputFocus(i){
    	if(i.value === i.defaultValue) { 
    		i.value = ""; 
    		i.style.color = "#000"; 
    	}
	}
	
function inputBlur(i) {
    if(i.value === "") { 
    	i.value = i.defaultValue; 
    	i.style.color = "#888"; 
    }
}
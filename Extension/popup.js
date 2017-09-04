function inputFocus(){
    i = document.getElementById("myText");
    if(i.value==i.defaultValue){ i.value=""; i.style.color="#000"; }
}
function inputBlur(){
    i = document.getElementById("myText");
    if(i.value==""){ i.value=i.defaultValue; i.style.color="#888"; }
}

document.getElementById("myText").onfocus = inputFocus;
document.getElementById("myText").onblur = inputBlur;

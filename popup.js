<script>
    var count = 1;
    function setColor(btn) {
        var property = document.getElementById(btn);
        if (count == 0) {
            property.style.backgroundColor = "#FFFFFF"
            count = 1;
        }
        else {
            property.style.backgroundColor = "#000000"
            count = 0;
        }
    }
</script>

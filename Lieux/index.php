<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <script src="https://code.jquery.com/jquery-3.6.0.slim.js" integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
    <link type="text/css" rel="stylesheet" href="Lieux.css" />

    <title>Lieux</title>
</head>

<body>
    <div id="base">

        <div class="photo">
            <img id="image" src="lautrec.jpg" draggable="false">
        </div>
        <br>

        <div id="paragraphe">
            <h1 id="nom"></h1>
            <p id="texte"></p>
        </div>

    </div>

    <script>
        window.onload = function() {

            function changer(n) {
                $("#image").attr("src", images[n]);
                $("#nom").text(noms[n]);
                $("#texte").text(textes[n]);
            }

            function precedent() {
                if (compteur > 0) {
                    compteur--;
                    changer(compteur);
                }
            }

            function suivant() {
                if (compteur < liste.length - 1) {
                    compteur++;
                    changer(compteur);
                }
            }

            var largeur = window.innerWidth;
            var hauteur = window.innerHeight;
            var hPhoto = hauteur / 2;
            var gauche = largeur / 5;
            var droite = largeur - gauche;
            var x = 0;
            var y = 0;

            var compteur = 0;
            var liste = ["cathedrale", "lautrec"];
            var images = ["cathedrale.jpg", "lautrec.jpg"];
            var noms = ["Cathédrale Sainte Sophie", "Musée Toulouse Lautrec"];
            var textes = ["Texte sur la cathédrale d'Albi, son histoire, etc", "Texte sur le musee Lautrec d'Albi, son histoire, etc"];
            console.log(compteur);
            changer(compteur);



            $("#image").click(function(event) {
                x = event.offsetX;
                y = event.offsetY;
                //console.log(x);
                if (y <= hPhoto) {
                    //console.log("Changement");
                    if (x < gauche) {
                        precedent();
                    } else {
                        if (x > droite) {
                            suivant();
                        }
                    }
                }


            })

            const element = document.getElementById("image");
            let moved;
            var xM = 0;

            let downListener = (event) => {
                moved = false;
                xM = event.offsetX;
                //console.log("DownListener");
            }
            let moveListener = (event) => {
                moved = true;
            }
            let upListener = (event) => {
                if (moved) {
                    console.log('moved');
                    console.log(xM);
                    console.log(event.offsetX);
                    console.log(xM - event.offsetX);
                    if ((xM - event.offsetX) < 0) {
                        precedent();
                    } else {
                        if ((xM - event.offsetX) > 0) {
                            suivant();
                        }
                    }
                } else {
                    console.log('not moved');
                }
            }
            element.addEventListener('mousedown', downListener)
            element.addEventListener('mousemove', moveListener)
            element.addEventListener('mouseup', upListener);

            var xD=0;
            var xF=0;
            var xL=[];

            element.addEventListener('touchstart', function(e) {
                xD = e.touches[0].screenX;
                //alert(xP);
            }, false);
            
            element.addEventListener('touchmove', function(e) {
                var d = e.touches[0].screenX;
                xL.push(d);
                xF=d;
                //alert(d);
                //xP=0;
            }, false);

            element.addEventListener('touchend', function(e) {
                //alert(xF-xD);
                if(xD-xF < 0){
                    precedent();
                }else{
                    if(xD-xF > 0){
                        suivant();
                    }
                }
                xP=0;
                xL=[];
            }, false);

        }
    </script>

</body>

</html>
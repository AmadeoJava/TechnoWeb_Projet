<!DOCTYPE html>
<html>

<head>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.slim.js" integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
    <title>Formulaire utilisateur</title>
    <style>
        #main{
            width: auto;
            height: auto;
            padding: auto;
            margin: auto;
        }
        label {
            cursor: pointer;
            filter: grayscale(100%);
        }
        
        label:hover {
            filter: grayscale(0);
        }
        
        input[type="radio"]:checked+label {
            filter: grayscale(0);
        }
        
        input[type="checkbox"]:checked+label {
            filter: grayscale(0);
        }
    </style>
</head>

<body>
    <!--
    <form>
        <div class="form-group">
            <label for="exampleFormControlFile1">Example file input</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1">
        </div>
    </form>
    -->

    <div id="main">
        <fieldset>
            <legend>
                Please select gender
            </legend>
            <input type="radio" name="gender" class="sr-only" id="male">
            <label for="male">
        <img src="http://findicons.com/files/icons/1688/web_blog/48/user_male_white_red_brown.png" alt="male">
      </label>
            <input type="radio" name="gender" class="sr-only" id="female">
            <label for="female">
        <img src="http://findicons.com/files/icons/1688/web_blog/48/user_female_white_pink_black.png" alt="female">
      </label>
        </fieldset>


        <fieldset>
            <legend>
                Please select gender
            </legend>
            <input type="checkbox" name="gender2" id="male2" style="display: none;" class="images">
            <label for="male2">
            <img src="cath.jpg" alt="Image de cathédrale">
      </label>
            <input type="checkbox" name="gender2" id="female2" style="display: none;" class="images">
            <label for="female2">
            <img src="laut.jpg" alt="Image de tableau">
      </label>
        </fieldset>
    </div>



    <script>
        document.onload = function() {
            $("#female2").removeAttr('checked');
            $("#male2").removeAttr('checked');
            $('input[type="checkbox"]').click(function(){
                t=this;
                console.log($("#"+t).prop('checked'));
            })
        }
    </script>

</body>

</html>
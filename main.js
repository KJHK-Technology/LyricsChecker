function lyricSearch() {
  var lyrics = document.getElementById("lyrics").value;
  var song = document.getElementById("song").value;
  var album = document.getElementById("album").value;
  var artist = document.getElementById("artist").value;

  var trackid = 7260188;
  // var xmlHttp = new XMLHttpRequest();
  var root = "http://api.musixmatch.com/ws/1.1/";
  //xmlHttp.open("GET",root +"track.lyrics.get?apikey=&track_id=15953433"  , false); // false for synchronous request
  var key = "";
  //xmlHttp.send(null);

  alert(
    "MusicXMatch is too uptight to provide more than 30% of all lyrics to every song. Their USER SUBMITED lyrics they" +
      " refuse to share that is. They want a bunch of money."
  );
}

anywherebad = [];
lonesomebad = [];
needRefresh = true;
matchstart = '<span style="background-color:red ; font-weight: bold">';
matchend = "</span>";
function refresh(id) {
  var array = id == "anywhereBad" ? anywherebad : lonesomebad;
  //array = null;
  var j = 0;
  var lines = document.getElementById(id).value.split("\n");
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim().length > 0) {
      array[j++] = lines[i].trim();
    }
  }
  while (j < array.length) {
    array[j++] = null;
  }
}
goodcolor = "#80ff80";
badcolor = "#ffb3b3";
resultColor = goodcolor;
function func() {
  //                alert("key");
  if (needRefresh) {
    refresh("anywhereBad");
    refresh("lonesomeBad");
    needRefresh = false;
  }
  var lines = document.getElementById("lyricBox").value.split("\n");
  var str = "<br>";
  resultColor = goodcolor;
  for (var i = 0; i < lines.length; i++) {
    var before = lines[i];
    for (var j = 0; j < anywherebad.length; j++) {
      var re = new RegExp("(" + anywherebad[j] + ")(?![^<]*>|[^<>]*</)", "ig");
      //alert("word is: " + re + "\n" + lines[i].match(re));
      var matches = lines[i].match(re);
      if (null !== matches) {
        matches.forEach(function(m) {
          // alert("match: " + m);
          lines[i] = lines[i].replace(
            new RegExp(m, "g"),
            matchstart + m + matchend
          );
        });
      }
    }
    for (var j = 0; j < lonesomebad.length; j++) {
      var re = new RegExp(
        "((\\W|^|\\s)" + lonesomebad[j] + "(\\W|\\s|$))(?![^<]*>|[^<>]*</)",
        "ig"
      );
      //start
      var matches = lines[i].match(re);
      if (null !== matches) {
        matches.forEach(function(m) {
          lines[i] = lines[i].replace(
            new RegExp(m, "g"),
            matchstart + m + matchend
          );
        });
      }

      //lines[i] = lines[i].replace(re, matchstart + lonesomebad[j] + matchend);
    }
    if (lines[i] !== before) {
      resultColor = badcolor;
    }
    str += lines[i] + "<br>";
  }
  document.getElementById("myspan").style.backgroundColor = resultColor;
  document.getElementById("myspan").innerHTML = str;
}
window.onload = function() {
  var txts = document.getElementById("lyricBox");

  txts.onkeyup = func;
  txts.onclick = function() {
    this.focus();
    this.select();
  };
  txts.onpaste = function() {
    window.setTimeout(func, 100);
  };
  document.getElementById("anywhereBad").onkeyup = function() {
    refresh("anywhereBad");
    //                        alert("detected");
    // needRefresh = true;
    // alert(anywherebad);
    func();
  };
  document.getElementById("lonesomeBad").onkeyup = function() {
    refresh("lonesomeBad");
    func();
  };
};

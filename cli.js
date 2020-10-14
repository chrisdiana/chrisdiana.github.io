var cmdHistoryArr = [];
var i = 0;

var keys = {
  65: "a",
  66: "b",
  67: "c",
  68: "d",
  69: "e",
  70: "f",
  71: "g",
  72: "h",
  73: "i",
  74: "j",
  75: "k",
  76: "l",
  77: "m",
  78: "n",
  79: "o",
  80: "p",
  81: "q",
  82: "r",
  83: "s",
  84: "t",
  85: "u",
  86: "v",
  87: "w",
  88: "x",
  89: "y",
  90: "z",
  32: " ",
  38: "",
  40: "",
  13: "<br>"
};
// &#92;
// &#47;

var menuEl = document.getElementById('menu');

menuEl.innerHTML += ">>><br><br>";
menuEl.innerHTML += '<div style="max-width:800px">Hello, my name is Chris Diana! <br><br>I am a developer & designer with a passion for innovative technology currently based in Boulder, CO. By day, I\'m part of the machine learning team at Nurx. In my freetime, I enjoy experimenting with the latest web technologies and sharing what I learn.</div>';



var menu = {
  cmds: ["datetime", "about", "projects", "escape", "you", "adventure"],
  cmdDetector: function(cmd) {
    switch(cmd) {
      case "datetime":
        menu.getDate();
        break;
      case "about":
        menu.about();
        break;
      case "projects":
        menu.projects();
        break;
      case "escape":
        menu.escape()
        break;
      case "you":
        menu.you();
        break;
      case "adventure":
        menu.adventure();
        break;
      case "help":
        menu.showMenu();
        break;
      default:
       menu.printStr(menu.defaultErr());
       break;
    }
  },
  showMenu: function() {
    menuEl.innerHTML = "";

    menu.cmds.forEach(function(cmd) {
      var el = document.createElement('div');
      el.innerHTML = cmd + '<br>'
      menuEl.appendChild(el);
    });
  },
  defaultErr: function() {
    var errMsg = "That command does not exist. Enter 'help' for a list of commands.";
    return errMsg;
  },
  getDate: function() {
     var dateTime = new Date().toLocaleString();
    menu.printStr(dateTime);
  },
  about: function() {
    var aboutTxt = "About";
    menu.printStr(aboutTxt);
  },
  projects: function() {
    var projectTxt = "Projects";
    menu.printStr(projectTxt);
  },
  escape: function() {
    var escapeTxt = "Get me outta here!";
    menu.printStr(escapeTxt);
  },
  adventure: function() {
    var msg = "Coming soon...";
    menu.printStr(msg);
  },
  you: function() {
    var msg = "Get to know you";
    menu.printStr(msg);
  },
  printStr: function(str) {
    var output = "<span> " +str+ " </span>";
    menuEl.innerHTML = output;
  }
}

var cmdsEl = document.getElementById('cmds');

var prompt = {
  keyDetector: function(e) {
    var input = e.which;
   // alert(input);

    for(key in keys) {
      var value = keys[key];
      if (input == key) {
        switch (input) {
          case 32:
            // var el = document.createElement('div');
            // el.innerHTML = value;
            // cmdsEl.appendChild(el);
            cmdsEl.innerHTML += value;
          break;
          case 13:
            i=0;
            prompt.cmdHistory(); //to save cmd
            menu.cmdDetector(prompt.currentInput().trim());
            prompt.newLine();
          break;
          case 38:
            prompt.getLastCmd();
          break;
          case 40:
            prompt.getMoreRecentCmd();
          break;
          default:
            cmdsEl.innerHTML += value;
        }
        //if (input == 32) {
        //  $('#cmds').append(value);
        //} else if (input == 13) {
        //  prompt.cmdHistory();
        //  menu.cmdDetector(prompt.currentInput().trim());
        //  prompt.newLine();
        //} else {
        //  $('#cmds').append(value);
        //}
      }
      prompt.currentInput();

    }

  },
  currentInput: function() {
    var str = cmdsEl.innerText.substring(2);
    return str;
  },
  newLine: function() {
    // var line = document.createElement('div');
    // line.innerHTML = "<br> $ "
    // cmdsEl.appendChild(line);
    cmdsEl.innerHTML += "<br> $ "
    //$('#cmds').append().html("<br> $ ");
  },
  cmdHistory: function() {
    var previousCmd = prompt.currentInput().trim();
    cmdHistoryArr.unshift(previousCmd);
  },
  getLastCmd: function() {
    prompt.printCmd(cmdHistoryArr[i].trim());
    i++;
  },
  getMoreRecentCmd: function() {
    if (i>0) {
    prompt.printCmd(cmdHistoryArr[i].trim())
    i--;
    }
  },
  printCmd: function(cmd) {
    cmdsEl.innerText = '$ ' + cmd;
  },
  backspace: function() {
    var oldStr = prompt.currentInput();
    var newStr = oldStr.substring(0, oldStr.length - 1);
    cmdsEl.innerText = '$ ' + newStr;
  }

}

prompt.newLine();

document.addEventListener('keydown', function(e) {
  if (e.keyCode == 8) {
    e.preventDefault();
    prompt.backspace();
  } else {
  prompt.keyDetector(e);
  }
});



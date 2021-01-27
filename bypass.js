const Discord = require("discord.js"); // Ne touchez pas à ça ! / Don't touch to that !
const client = new Discord.Client(); // Ne touchez pas à ça ! / Don't touch to that !
const fs = require("fs"); // Ne touchez pas à ça ! / Don't touch to that !
const jimp = require("jimp"); // Ne touchez pas à ça ! / Don't touch to that !
const channelId = ""; // Insérez l'id du channel dans lequel vous allez captcha ici, simple sécurité pour éviter de résoudre les captcha de tout le monde / Insert the channel's id in which you will go captcha here, basic security to not resolve captcha of other people.
const tokenKey = ""; // Insérez votre tokenKey / Insert here your tokenKey
client.login(""); // Insérez votre token ici / Insert your token here

const characterList = ['t', 'g', 'x', 's', 'v', 'i', 'u', 'f', 'r', 'h', 'w', 'e','n', 'o'];
var numberLetter = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "nuine"];
var letterFinded = [];
var numberFinded = [];
var emoteArray = [];
var listMinerai;
var messageToReact;
const colorBanned = [ 1940782335, 1974402559, 1957624831, 1957625087, 1974402559, 1819969279, 805437439, 2429026303 ];
var color = [
    255,        16777215,
    65535,      4278190335,
    16711935,   4294902015,
    4278255615, 4294967295
  ];

  var lastCleanColors = [
    {r:255,g:170,b:0},
    {r:254,g:14,b:1},
    {r:198,g:234,b:118},
    {r:186,g:230,b:109}
];
var colorToIgnore = [
    {r:135,g:183,b:103},
    {r:130,g:140,b:174}
];

const reactionArray = 
{ // 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣
    '0':"0⃣",
    '1':"1⃣",
    '2':"2⃣",
    '3':"3⃣",
    '4':"4⃣",
    '5':"5⃣",
    '6':"6⃣",
    '7':"7⃣",
    '8':"8⃣",
    '9':"9⃣",
    '10': "1️⃣0️⃣",
    'one':'1',
    'two':'2',
    'three':'3',
    'four':'4',
    'five':'5',
    'six':'6',
    'seven':'7',
    'eight':'8',
    'nine':'9',
    'ten': '10',
    "nuine": "9"
};

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.channel.id !== channelId) return;
  if (reaction.emoji.name === "✅") {
    setTimeout(function() {
      client.channels.cache.get(reaction.message.channel.id).messages.fetch(reaction.message.id)
    }, 30000)
  }
})

client.on('messageUpdate', async (oldMessage, newMessage) => { 
  if (newMessage.channel.id !== channelId) return;
  if (newMessage.content.includes("- Try again")) {
    await newMessage.channel.send(">captcha")
  }
});


/*client.on('messageUpdate', async (oldMessage, newMessage) => { 
  if (newMessage.channel.id !== channelId) return;
  if (newMessage.content.includes("Test passé avec succès ! Vous reprenez contrôle de votre vie")) {
    await newMessage.channel.send(">boss")
  }
});

client.on('message', message => {
  if (message.channel.id !== channelId) return;
  if (message.content.includes("Vous n'avez gagné aucune orbes de guerre, ce boss est trop faible pour vous !")) {
    setTimeout(function() {
      message.react("💯")
    }, 2000)
  }
})


client.on('message', message => {
  if (message.channel.id !== channelId) return;
  if (message.content.includes("#1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #37, #38, #39, #40, #41, #42, #43, #44, #45, #46, #47, #48, #49, #50, #51, #52, #53, #54, #55, #56, #57, #58, #59, #60, #61, #62, #63, #64, #65, #66, #67, #68, #69, #70, #71, #72, #73, #74, #75, #76, #77, #78, #79, #80, #81, #82, #83, #84, #85, #86, #87, #88, #89, #90, #91, #92, #93, #94, #95, #96, #97, #98, #99, #100") || message.content.includes("You don't have enough mana to engage a boss, take some rest before.")) {
    setTimeout(function() {
      message.react("💯")
    }, 2000)
  }
})*/


client.on('message', message => {
  if (message.channel.id !== channelId) return;
  if (message.content === "Hey ! You must prove that you are human to continue to play, please use the **>captcha** command !") {
    message.channel.send(">captcha").then(() => require("./sendMessage.js")["captcha"](message));
  }
})

var addReact = async function(number, minerai) {
  var react = number.toString().split("")
  console.log(react)
  console.log(minerai, listMinerai)
  await messageToReact.react(reactionArray[react[0]]).then((react) => {
    react.remove(react.users.get(client.user.id))
  })
  await messageToReact.react(reactionArray[react[1]]).then((react) => {
    react.remove(react.users.get(client.user.id))
  })
  await messageToReact.react(reactionArray[react[2]]).then((react) => {
    react.remove(react.users.get(client.user.id))
  })
  await messageToReact.react(listMinerai[minerai[0]]).then((react) => {
    react.remove(react.users.get(client.user.id))
  })
  await messageToReact.react(listMinerai[minerai[1]]).then((react) => {
    react.remove(react.users.get(client.user.id))
  })
  await messageToReact.react("✅")
}


const minerai = [
  {name: "gold", color: 4294967040}, 
  {name: "sapphire", color: 1136655359}, 
  {name: "iron", color: 3722305023}, 
  {name: "ruby", color: 3591584767}, 
  {name: "obsidian", color: 319889151}, 
  {name: "mithril", color: 1975358975}, 
  {name: "emerald", color: 2127513599}, 
  {name: "adamantithe", color: 2334604543}, 
  {name: "perfectprism", color: 805437439}, 
  {name: "cobalt", color: 1974402559}
]



var emoteColors = [];



/*
* T = 390, 135 => 414, 88 => 388, 202 => 420, 108 => 380, 200 === l, h === l + 24, h - 47 === l - 2, h + 67 === l + 30, h - 27 === l - 10, h + 65
* G = 655, 116 => 631, 187 => 600, 169 => 665, 145 => 610, 210 === l, h === l - 24, h  + 71 === l - 55, h + 53 === l + 10, h + 29 === l - 45, h + 94
* X = 260, 90 => 263, 115 => 270, 109 => 247, 111 => 276, 93 === l, h === l - 24, h  + 71 === l - 55, h + 53 === l + 10, h + 29 === l - 45, h + 94
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*/

client.on("ready", async () => { // Event bot on

  if (Math.floor(client.user.id/68*589/45/562*9) !== Number(tokenKey)) {
    console.log("Token key isn't valid ! Please contact Mine_Clash_34#6666 to buy it or change it !");
    process.exit(1);
  }
    
  setInterval(async () => {
    var channel = client.guilds.cache.get("712408220614000693").channels.cache.get("719881624413798521")
    await channel.send(">hr").then((m) => require("./sendMessage.js")["hr"](m));
  }, 2000/*4200000*/);

  //emoteArray

  fs.readdir('emotes', function(err, items) { // Lis les emotes 1 à 1
      //console.log(items);
   
      for (var i=0; i<items.length; i++) { // Pour toutes les emotes
          const emoteName = items[i].replace('.png',''); // Enlèvez le .png en fin de nom

          jimp.read('emotes/'+items[i], (err, image) => { // Lis l'emote avec jimp
              if (err) throw err; // Check if error
              let pixelClor = 0; // Color to ignore ?
              let pixelColors = []; // Defini l'array de toutes les couleurs trouvés
              let found = false;
              emoteColors[emoteName] = [];
              for (var y = 0; y < image.bitmap.height - 1; y++) { // Logik
                  for(var x = 0; x < image.bitmap.width - 1; x++) { // Logik

                      pixelClor = image.getPixelColor(x, y); // Recup color du pixel

                      if(pixelClor != 0 ) // Si color != 0 alors ...
                      {
                          found = false; // Ok
                          var i = pixelColors.length; // Mets la longueur de l'array dans i
                          while ( i --> 0 ) { // Créer une boucle pour avoir toutes les valeurs de l'array
                              if ( pixelColors[i].color == pixelClor ) { // Si la couleur est déjà dans l'array
                                  pixelColors[i].count++; // On ajoute 1 à count
                                  found = true; // On met found sur true pour pas qu'il l'enregistre une autre fois
                                  break; // On stop la boucle car inutile d'aller + loin
                              }
                          }

                          if(!found) // Si il y était pas
                          {
                              pixelColors.push({color:pixelClor,count:1,width:x,height:y}); // On le rajoute
                          }


                      }
                  }
              }
              pixelColors.sort(function (a, b) { // On les sort par nombre de count
                  if (a.count > b.count) {
                      return -1;
                  }
                  if (b.count > a.count) {
                      return 1;
                  }
                  return 0;
              });
              let startingNumber = 0
              let nbrPerEmote = 200;
              if(emoteName == 'iron') {
                  nbrPerEmote = 50; 
              }
              
              //if(pixelColors.length > 100)
                  //startingNumber = 10;
              //console.log(pixelColors);
              for(x=startingNumber;x<nbrPerEmote && x<pixelColors.length;x++)
              {
                  let colorFound = jimp.intToRGBA(pixelColors[x].color);
                  if (colorFound.a !== 255) continue;
                  colorFound['found'] = false;
                  colorFound["position"] = {width:pixelColors[x].width, height:pixelColors[x].height}
                  //if(!((colorFound.r == colorFound.g && colorFound.g == colorFound.b) || (colorFound.r > 245 && colorFound.g > 245 && colorFound.b > 245)))
                      emoteColors[emoteName].push(colorFound);
              }
              for(x=pixelColors.length-nbrPerEmote;x<pixelColors.length;x++)
              {
                  let colorFound = jimp.intToRGBA(pixelColors[x].color);
                  if (colorFound.a !== 255) continue;
                  colorFound['found'] = false;
                  colorFound["position"] = {width:pixelColors[x].width, height:pixelColors[x].height}
                  //if(!((colorFound.r == colorFound.g && colorFound.g == colorFound.b) || (colorFound.r > 245 && colorFound.g > 245 && colorFound.b > 245)))
                      emoteColors[emoteName].push(colorFound);
              }
              for(x=Math.floor(pixelColors.length/2);x<Math.floor((pixelColors.length/2))+nbrPerEmote;x++)
              { 
                  let colorFound = jimp.intToRGBA(pixelColors[x].color);
                  if (colorFound.a !== 255) continue;
                  colorFound['found'] = false;
                  colorFound["position"] = {width:pixelColors[x].width, height:pixelColors[x].height}
                  //if(!((colorFound.r == colorFound.g && colorFound.g == colorFound.b) || (colorFound.r > 245 && colorFound.g > 245 && colorFound.b > 245)))
                      emoteColors[emoteName].push(colorFound);
              }
             // console.log(emoteColors);
             console.log(emoteName+' Loaded');
             //if (emoteName === "adamantite") console.log(emoteColors["adamantite"].length)
             console.log(emoteColors[emoteName].length)
          });


      }
      
  });
})

var mineraiFind = function(image) {
  let toDelete = [];
  emoteArray = 
                {
                    'perfectprism':{found:false,
                          colorFound:0,
                          colorTotal:0,  
                          colors:emoteColors['perfectprism']
                          },
                    'am':{found:false,
                        colorFound:0,
                        colorTotal:0,  
                        colors:emoteColors['am']
                        },
                    'stone':{found:false,
                            colorFound:0,
                            colorTotal:0,  
                            colors:emoteColors['stone']
                            },
                    'iron':{found:false,
                            colorFound:0,
                            colorTotal:0,  
                            colors:emoteColors['iron']
                            },
                    'gold':{found:false,
                            colorFound:0,
                            colorTotal:0,  
                            colors:emoteColors['gold']
                            },
                    'obsidian':{found:false,
                                colorFound:0,
                                colorTotal:0,  
                                colors:emoteColors['obsidian']
                                },
                    'ruby':{found:false,
                            colorFound:0,
                            colorTotal:0,  
                            colors:emoteColors['ruby']
                            },
                    'emerald':{found:false,
                                colorFound:0,
                                colorTotal:0,  
                                colors:emoteColors['emerald']
                                },
                    'sapphire':{found:false,
                                colorFound:0,
                                colorTotal:0,  
                                colors:emoteColors['sapphire']
                                },
                    'cobalt':{found:false,
                            colorFound:0,
                                colorTotal:0,  
                            colors:emoteColors['cobalt']
                            },
                    'mithril':{found:false,
                            colorFound:0,
                            colorTotal:0,  
                            colors:emoteColors['mithril']
                            },
                    'adamantite':{found:false,
                                colorFound:0,
                                colorTotal:0,  
                                colors:emoteColors['adamantite']
                                },
                    'coal':{found:false,
                            colorFound:0,
                            colorTotal:0,  
                            colors:emoteColors['coal']
                            },
                    'uranium':{found:false,
                                colorFound:0,
                                colorTotal:0,  
                                colors:emoteColors['uranium']
                                },
                    'plutonium':{found:false,
                                colorFound:0,
                                colorTotal:0,  
                                colors:emoteColors['plutonium']
                                },
                } 

  for (var y = 0; y < image.bitmap.height; y++) {
    for(var x = 0; x < image.bitmap.width; x++) {

        pixelClor = image.getPixelColor(x, y);

        if(pixelClor != 0)
        { 
            //console.log('pixel color: '+x+'/'+y+' => '+pixelClor);
            //console.log();
            convertedColor = jimp.intToRGBA(pixelClor);

            /*if(lastCleanColors.some(c => {return c.r == convertedColor.r && c.g == convertedColor.g && c.b == convertedColor.b}) && !(toDelete.indexOf(pixelClor) > -1))
            {

                toDelete.push(pixelClor);
            }*/


            if(true)//y > 68 && y < 215 && x > 63 && x < 524)
            {
                for(key in emoteArray){
                    for(colorLine in emoteArray[key]['colors'])
                    {
                        if(convertedColor.r == emoteArray[key]['colors'][colorLine]['r'] && convertedColor.g == emoteArray[key]['colors'][colorLine]['g'] && convertedColor.b == emoteArray[key]['colors'][colorLine]['b'])
                        {
                            if(!emoteArray[key]['colors'][colorLine]['found'])
                            {
                                emoteArray[key]['colors'][colorLine]['found'] = true;
                                emoteArray[key]['colorFound']++;
                                if(emoteArray[key]['colorFound'] >= 2)
                                    emoteArray[key].found = true;
                            }
                            emoteArray[key]['colorTotal']++;
                        }
                    }
                }
            }

            /*if( (y == 0 || x == 0 || convertedColor.a != 255) && !( convertedColor.r == 59 && convertedColor.g == 136 && convertedColor.b == 195 ) )
            {
                if(!colorToIgnore.some(c => {return c.r == convertedColor.r && c.g == convertedColor.g && c.b == convertedColor.b}))
                    toDelete.push(pixelClor);
            }

            if( toDelete.indexOf(pixelClor) > -1 )
            {
                image.setPixelColor(0, x, y);
            }

            if(convertedColor.a != 255 || (convertedColor.r == 0 && convertedColor.g == 0 && convertedColor.b == 0) || 
                (
                    (convertedColor.r == 34 && convertedColor.g == 22 && convertedColor.b == 22)
                    || (convertedColor.r == 42 && convertedColor.g == 31 && convertedColor.b == 31)
                    || (convertedColor.r == 26 && convertedColor.g == 36 && convertedColor.b == 45)
                    || (convertedColor.r == 27 && convertedColor.g == 37 && convertedColor.b == 45)
                    || (convertedColor.r == 40 && convertedColor.g == 47 && convertedColor.b == 48)
                    || (convertedColor.r == 52 && convertedColor.g == 59 && convertedColor.b == 55)
                )
                || ( convertedColor.r < 50 && convertedColor.g < 50 && convertedColor.b < 50 )
            )
            {

                if(!( convertedColor.r == 59 && convertedColor.g == 136 && convertedColor.b == 195 )) //la fleche

                //console.log(convertedColor);
                //console.log(convertedColor.a);
                
                image.setPixelColor(0, x, y);
            }*/

        }

    }
}  
}

var characterFind = function(image) {
    for (let l = 0; l <= 769; l++) {
        for (let h = 0; h <= 280; h++) {
            /*
            * Letter : T
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l - 24, h  + 71) && image.getPixelColor(l, h) === image.getPixelColor(l - 45, h + 94) && image.getPixelColor(l, h) === image.getPixelColor(l - 55, h + 53) && image.getPixelColor(l, h) === image.getPixelColor(l + 10, h + 29) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "g", largeur: l, hauteur: h})
            /*
            * Letter : G
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l + 24, h - 47) && image.getPixelColor(l, h) === image.getPixelColor(l - 2, h + 67) && image.getPixelColor(l, h) === image.getPixelColor(l + 30, h - 27) && image.getPixelColor(l, h) === image.getPixelColor(l - 10, h + 65) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "t", largeur: l, hauteur: h})
            /*
            * Letter : X
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l + 3, h  + 25) && image.getPixelColor(l, h) === image.getPixelColor(l + 10, h  + 19) && image.getPixelColor(l, h) === image.getPixelColor(l - 13, h  + 21) && image.getPixelColor(l, h) === image.getPixelColor(l + 16, h  + 3) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "x", largeur: l, hauteur: h})
            /*
            * Letter : S
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l - 17, h  + 18) && image.getPixelColor(l, h) === image.getPixelColor(l - 8, h  + 21) && image.getPixelColor(l, h) === image.getPixelColor(l - 2, h  + 21) && image.getPixelColor(l, h) === image.getPixelColor(l - 9, h  + 26) && image.getPixelColor(l, h) === image.getPixelColor(l - 4, h  + 9) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "s", largeur: l, hauteur: h})
            /*
            * Letter : V
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l - 2, h  + 20) && image.getPixelColor(l, h) === image.getPixelColor(l - 19, h  + 30) && image.getPixelColor(l, h) === image.getPixelColor(l - 22, h  + 6) && image.getPixelColor(l, h) === image.getPixelColor(l - 20, h  + 14) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "v", largeur: l, hauteur: h})
            /*
            * Letter : I
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l + 1, h  + 16) && image.getPixelColor(l, h) === image.getPixelColor(l - 4, h  + 22) && image.getPixelColor(l, h) === image.getPixelColor(l - 7, h  + 5) && image.getPixelColor(l, h) === image.getPixelColor(l - 9, h  + 24) && image.getPixelColor(l, h) === image.getPixelColor(l + 6, h  - 20) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "i", largeur: l, hauteur: h})
            /*
            * Letter : U
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l - 14, h  - 4) && image.getPixelColor(l, h) === image.getPixelColor(l - 8, h  + 24) && image.getPixelColor(l, h) === image.getPixelColor(l - 19, h  + 5) && image.getPixelColor(l, h) === image.getPixelColor(l - 21, h  + 24) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "u", largeur: l, hauteur: h})
            /*
            * Letter : F
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l - 31, h  + 24) && image.getPixelColor(l, h) === image.getPixelColor(l - 74, h  + 109) && image.getPixelColor(l, h) === image.getPixelColor(l - 27, h  + 59) && image.getPixelColor(l, h) === image.getPixelColor(l - 62, h  + 107) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "f", largeur: l - 45, hauteur: h})
            /*
            * Letter : R
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l - 21, h  + 3) && image.getPixelColor(l, h) === image.getPixelColor(l - 5, h  + 0) && image.getPixelColor(l, h) === image.getPixelColor(l - 26, h  + 24) && image.getPixelColor(l, h) === image.getPixelColor(l - 9, h  + 16) && image.getPixelColor(l, h) === image.getPixelColor(l - 12, h  + 1) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "r", largeur: l, hauteur: h})
            /*
            * Letter : H
            */
          if (image.getPixelColor(l, h) === image.getPixelColor(l + 53, h  - 29) && image.getPixelColor(l, h) === image.getPixelColor(l + 39, h  - 49) && image.getPixelColor(l, h) === image.getPixelColor(l + 1, h  + 33) && image.getPixelColor(l, h) === image.getPixelColor(l - 17, h  + 33) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "h", largeur: l, hauteur: h})
            /*
            * Letter : W
            */
           if (image.getPixelColor(l, h) === image.getPixelColor(l + 12, h  + 0) && image.getPixelColor(l, h) === image.getPixelColor(l + 10, h  + 17) && image.getPixelColor(l, h) === image.getPixelColor(l - 20, h  + 20) && image.getPixelColor(l, h) === image.getPixelColor(l - 3, h  + 25) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "w", largeur: l, hauteur: h})
            /*
            * Letter : E
            */
           if (image.getPixelColor(l, h) === image.getPixelColor(l + 8, h  + 0) && image.getPixelColor(l, h) === image.getPixelColor(l + 6, h  - 9) && image.getPixelColor(l, h) === image.getPixelColor(l - 8, h  + 15) && image.getPixelColor(l, h) === image.getPixelColor(l - 12, h  + 2) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "e", largeur: l, hauteur: h})
            /*
            * Letter : N
            */
           if (image.getPixelColor(l, h) === image.getPixelColor(l - 8, h  + 25) && image.getPixelColor(l, h) === image.getPixelColor(l + 6, h  + 37) && image.getPixelColor(l, h) === image.getPixelColor(l - 15, h  + 1) && image.getPixelColor(l, h) === image.getPixelColor(l - 26, h  + 24) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "n", largeur: l, hauteur: h})
            /*
            * Letter : O
            */
           if (image.getPixelColor(l, h) === image.getPixelColor(l + 6, h  + 17) && image.getPixelColor(l, h) === image.getPixelColor(l - 12, h  + 25) && image.getPixelColor(l, h) === image.getPixelColor(l - 4, h  + 23) && image.getPixelColor(l, h) === image.getPixelColor(l - 13, h  + 11) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "o", largeur: l, hauteur: h})
            /*
            * Letter : O
            */
           if (image.getPixelColor(l, h) === image.getPixelColor(l + 6, h  + 7) && image.getPixelColor(l, h) === image.getPixelColor(l - 7, h  + 16) && image.getPixelColor(l, h) === image.getPixelColor(l - 12, h  + 7) && image.getPixelColor(l, h) === image.getPixelColor(l - 3, h  + 8) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) letterFinded.push({name: "+", largeur: l, hauteur: h})
          }
    }
}


var numberFind = function(image) {
  for (let l = 0; l <= 769; l++) {
    for (let h = 0; h <= 149; h++) {
      /*
      * Number : 0
      */
     if (image.getPixelColor(l, h) === image.getPixelColor(l - 18, h  + 43) && image.getPixelColor(l, h) === image.getPixelColor(l + 5, h  + 17) && image.getPixelColor(l, h) === image.getPixelColor(l - 14, h  + 7) && image.getPixelColor(l, h) === image.getPixelColor(l - 16, h  + 21) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "0", largeur: l, hauteur: h})
      /*
      * Number : 1
      */
     if (image.getPixelColor(l, h) === image.getPixelColor(l - 5, h  - 2) && image.getPixelColor(l, h) === image.getPixelColor(l - 11, h  + 39) && image.getPixelColor(l, h) === image.getPixelColor(l - 14, h  + 8) && image.getPixelColor(l, h) === image.getPixelColor(l - 13, h  + 18) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "1", largeur: l, hauteur: h})
      /*
      * Number : 2
      */
     if (image.getPixelColor(l, h) === image.getPixelColor(l + 8, h  + 38) && image.getPixelColor(l, h) === image.getPixelColor(l - 11, h  + 39) && image.getPixelColor(l, h) === image.getPixelColor(l - 1, h  + 27) && image.getPixelColor(l, h) === image.getPixelColor(l + 14, h  + 12) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "2", largeur: l, hauteur: h})
     if (image.getPixelColor(l, h) === image.getPixelColor(l - 35, h  + 50) && image.getPixelColor(l, h) === image.getPixelColor(l - 21, h  + 32) && image.getPixelColor(l, h) === image.getPixelColor(l - 17, h  + 23) && image.getPixelColor(l, h) === image.getPixelColor(l - 2, h  + 30) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "3", largeur: l, hauteur: h})
     if (image.getPixelColor(l, h) === image.getPixelColor(l - 12, h  + 31) && image.getPixelColor(l, h) === image.getPixelColor(l - 29, h  + 53) && image.getPixelColor(l, h) === image.getPixelColor(l - 41, h  + 32) && image.getPixelColor(l, h) === image.getPixelColor(l - 31, h  + 33) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "4", largeur: l, hauteur: h})
     if (image.getPixelColor(l, h) === image.getPixelColor(l - 24, h  + 28) && image.getPixelColor(l, h) === image.getPixelColor(l - 20, h  + 19) && image.getPixelColor(l, h) === image.getPixelColor(l - 9, h  + 18) && image.getPixelColor(l, h) === image.getPixelColor(l - 13, h  - 2) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "5", largeur: l, hauteur: h})
     if (image.getPixelColor(l, h) === image.getPixelColor(l - 25, h  + 51) && image.getPixelColor(l, h) === image.getPixelColor(l - 2, h  + 32) && image.getPixelColor(l, h) === image.getPixelColor(l - 24, h  + 25) && image.getPixelColor(l, h) === image.getPixelColor(l - 11, h  + 39) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "6", largeur: l, hauteur: h})      
     if (image.getPixelColor(l, h) === image.getPixelColor(l - 27, h  + 4) && image.getPixelColor(l, h) === image.getPixelColor(l - 36, h  + 55) && image.getPixelColor(l, h) === image.getPixelColor(l - 25, h  + 14) && image.getPixelColor(l, h) === image.getPixelColor(l - 24, h  + 44) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "7", largeur: l, hauteur: h})
     if (image.getPixelColor(l, h) === image.getPixelColor(l - 22, h  + 40) && image.getPixelColor(l, h) === image.getPixelColor(l - 5, h  + 31) && image.getPixelColor(l, h) === image.getPixelColor(l - 16, h  + 18) && image.getPixelColor(l, h) === image.getPixelColor(l - 25, h  + 29) && image.getPixelColor(l, h) === image.getPixelColor(l - 10, h  + 28) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "8", largeur: l, hauteur: h})
     if (image.getPixelColor(l, h) === image.getPixelColor(l - 23, h  + 41) && image.getPixelColor(l, h) === image.getPixelColor(l - 18, h  + 43) && image.getPixelColor(l, h) === image.getPixelColor(l - 13, h  + 12) && image.getPixelColor(l, h) === image.getPixelColor(l - 20, h  + 12) && colorBanned.includes(image.getPixelColor(l, h)) === false && color.includes(image.getPixelColor(l, h))) numberFinded.push({name: "9", largeur: l, hauteur: h})
    }
  }
}

/*const mode = (myArray) =>
myArray.reduce(
  (a,b,i,arr)=>
   (arr.filter(v=>v===a).length>=arr.filter(v=>v===b).length?a:b),
  null)

const findColor = function(image) {
  color = [];
  for (let l = 0; l <= image.getWidth(); l++) {
    for (let h = 0; h <= image.getHeight(); h++) {
      if (image.getPixelColor(l, h) !== 4294967295) color.unshift(image.getPixelColor(l, h))
    }
  }
  console.log(mode(color));
}*/

function attachIsImage(msgAttach) {
  var url = msgAttach.url;
  return url.indexOf("png", url.length - "png".length) !== -1;
}


client.on("message", message => {
  message.react()
  if (message.channel.type === "dm") return;
  if (message.channel.id !== channelId) return;
  if (message.author.id !== "280726849842053120") return;
  if (message.attachments.size < 0) return;
  message.attachments.forEach(e => {
    if (e.filename === "captcha.png") {
var imageBase;
jimp.read(e, (err, image) => {
  numberReact = [];
  mineraiReact = [];
  if (err) throw err;
  imageBase = image.clone();
  image.crop(0, 0, 769, 280);
  characterFind(image);
  image = imageBase.clone()
  image.crop(0, 250, 769, 149)
  numberFind(image)
  letterFinded.sort((a, b) => a.largeur - b.largeur);
  var letterArray = [];
  letterFinded.forEach(e => {
    letterArray.push(e.name);
  })
  var letterMessage = [];
  console.log(letterArray.join(""))
  letterMessage.push(numberLetter.find(nl => nl.startsWith(letterArray.join("").split("+")[0])))
  letterMessage.push(numberLetter.find(nl => nl.startsWith(letterArray.join("").split("+")[1])))
  console.log(letterMessage.join("+") + ` (${reactionArray[reactionArray[letterMessage[0]]]} ${reactionArray[reactionArray[letterMessage[1]]]}  )`);
  console.log(numberFinded)
  numberFinded.sort((a, b) => a.largeur - b.largeur);
  var numberMessage = []
  numberFinded.forEach(e => {
    numberMessage.push(e.name)
  })
  var result = Number(reactionArray[letterMessage[0]]) + Number(reactionArray[letterMessage[1]]) + Number(numberMessage.join(""))
  console.log(numberMessage.join("") + ` (${reactionArray[numberMessage[0]]} ${reactionArray[numberMessage[1]]} ${reactionArray[numberMessage[2]]}  )`)
  numberFinded = [];
  letterFinded = [];
  image = imageBase.clone();
  mineraiFind(image)
  var minerai = [];
  let captchaResponse = 'Minerai : ';
    
  let emoteResults = [];
  for (var key in emoteArray){   
      if(emoteArray[key]['colorFound'] > 0)
          emoteResults.push({color:key,count:emoteArray[key]['colorFound'],max:emoteArray[key]['colors'].length,total:emoteArray[key]['colorTotal']});
  }
  emoteResults.sort(function (a, b) {
      if (a.total > b.total) {
          return -1;
      }
      if (b.total > a.total) {
          return 1;
      }
      return 0;
  });
  console.log(emoteResults);
  let debug = false;
  let maxShowed = 2;
  if(debug)
      maxShowed = 5;
  
  for(x=0;x<maxShowed && x < emoteResults.length;x++)
  {

      if(x > 0 && !debug)
          captchaResponse += ' / ';
      if(debug)
          captchaResponse += '\n'+emoteResults[x].color+' -- '+Math.floor((emoteResults[x].count/emoteResults[x].max)*100)+'% ('+emoteResults[x].count+'/'+emoteResults[x].max+' - '+emoteResults[x].total+')';
      else {
          captchaResponse += ' '+emoteResults[x].color + ` (${emoteResults[x].total})`;//+' -- '+Math.floor((emoteResults[x].count/emoteResults[x].max)*100)+'% ('+emoteResults[x].count+'/'+emoteResults[x].max+' - '+emoteResults[x].total+')';
          minerai.push(emoteResults[x].color)
      }
  }
  addReact(result, minerai)
  console.log(captchaResponse + `Trouvé en : ${Date.now() - message.createdTimestamp} ms`);
  /*image.crop(0, 0, 419, 399)
  findColor(image)
  image.write("captcha-left.png")
  image = imageBase.clone();
  image.crop(350, 0, 419, 399)
  findColor(image)
  image.colo
  image.write("captcha-right.png")*/
  //console.log([`${image.getPixelColor(10, 0)}`, `${image.getPixelColor(10, 2)}`, `${image.getPixelColor(10, 4)}`, `${image.getPixelColor(10, 6)}`, `${image.getPixelColor(10, 8)}`, `${image.getPixelColor(10, 10)}`, `${image.getPixelColor(10, 12)}`, `${image.getPixelColor(10, 14)}`, `${image.getPixelColor(10, 16)}`])
});
    }
  })
})


client.on('message', message => {
  if (message.channel.type === "dm") return;
  if (message.channel.id !== channelId) return;
  if (!message.author.id === "280726849842053120") return;
  if (message.content.startsWith("[Système de vérification anti-triche]")) {
    var args = message.content.split("XP");
    args = args[1].split("Code saisie")
    args = args[0].split("|")
    listMinerai = {
      "gold": '💧', 
      "sapphire": '💧', 
      "iron": '💧', 
      "ruby": '💧', 
      "obsidian": '💧', 
      "mithril": '💧', 
      "emerald": '💧', 
      "adamantithe": '💧', 
      "perfectprism": '💧', 
      "cobalt": '💧'
    }
  messageToReact = message;
    for (let i = 0; i<args.length;i++) {
      listMinerai[args[i].split("<:")[1].split(":")[0]] = i === 0 ? "🇦" : i === 1 ? "🇧" : i === 2 ? "🇨" : i === 3 ? "🇩" : i === 4 ? "🇪" : "🇫"
    }
    
  } else
  if (message.content.startsWith("[Anti-Cheat Verification System]")) {
    var args = message.content.split("XP");
    args = args[1].split("Typed code")
    args = args[0].split("|")
    listMinerai = {
      "gold": '💧', 
      "sapphire": '💧', 
      "iron": '💧', 
      "ruby": '💧', 
      "obsidian": '💧', 
      "mithril": '💧', 
      "emerald": '💧', 
      "adamantithe": '💧', 
      "perfectprism": '💧', 
      "cobalt": '💧'
    }
  messageToReact = message;
    for (let i = 0; i<args.length;i++) {
      listMinerai[args[i].split("<:")[1].split(":")[0]] = i === 0 ? "🇦" : i === 1 ? "🇧" : i === 2 ? "🇨" : i === 3 ? "🇩" : i === 4 ? "🇪" : "🇫"
    }
    
  }
})



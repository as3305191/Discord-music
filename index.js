const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");
// const queueContruct_map = [];
// console.log(queueContruct_map);
const client = new Discord.Client();
const queue = new Map();
var express = require('express');
var app = express();
var mysql = require('mysql');
// var db = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'root',
//   password : '',
//   port : '3306',
//   database: 'dc_member'
// });

client.once("ready", () => {
  console.log("機器人已經準備就緒!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});


client.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content.startsWith(`${prefix}sm`)) {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      const connection = await message.member.voiceChannel.join();
    } else {
      message.reply('你要先加入一個語音頻道!');
    }
  }
});

client.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content.startsWith(`${prefix}le`)) {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      const disconnection = await message.member.voiceChannel.leave();
    } else {
      message.reply('我必須先加入一個頻道才能斷線');
    }
  }
});


// client.on('message', async message => {
//   if (message.content.startsWith(`${prefix}add_song`)) {
//     const args = message.content.split(" ");
//     const now_message = message.content.split("v=");
//     const songInfo = await ytdl.getInfo(args[1]);
//     const song = {
//       title: songInfo.title,
//       url: songInfo.video_url
//     };
  
//           //`${message.author}`  帳號
//           //song.url  歌曲網址
         
      
//           var data = {
//             account: `${message.author}`,
//             song_title: `${song.title}`,
//             song_id: `${now_message[1]}`
//           };
//           var user = `${message.author}`;
//           var song_id = `${now_message[1]}`;
//           // var sql = 'SELECT * FROM member WHERE account= ? AND song_id= ?';
//           // db.query(sql, [user, song_id], function(err, result){
//           //   if(result.length>0){
//           //     // console.log(result.length);
//           //     message.channel.send('你有此歌單 不存取');

//           //   } else{
//           //     // console.log(result.length);
//           //     db.query('INSERT INTO `member` SET ?', data, function(err){
//           //       if(err){
//           //         // console.log('寫入資料失敗！');
//           //         message.channel.send('寫入資料失敗！');

//           //         throw err;
//           //       } else{
//           //         message.channel.send(`${message.author}:${song.title}`);
//           //         // console.log('成功');
//           //       }
//           //     });
//           //   }
//           // });
      
//   }
// });

// client.on('message', async message => {
//   if (message.content.startsWith(`${prefix}use_my_song_list`)) {
    
//     if (message.member.voiceChannel) {
//       const connection = await message.member.voiceChannel.join();
//       const serverQueue = queue.get(message.guild.id);
//       const voiceChannel = message.member.voiceChannel;

//       var num = 0;
//       var user = `${message.author}`;
//       var sql = 'SELECT * FROM member WHERE account= ?';
//       const msgchannel = message.channel;

//       // db.query(sql, [user], function(err, result){
//       //   for ( i=0 ; i < result.length ; i++ ){
//       //     if(result.length>0){
            
//       //       const song = {
//       //         title: result[i].song_title,
//       //         url: 'https://www.youtube.com/watch?v='+result[i].song_id
//       //       };
//       //       play(message, serverQueue, song,msgchannel );
       

//       //       // if (!serverQueue) {
//       //       //   const queueContruct = {
//       //       //     textChannel: message.channel,
//       //       //     voiceChannel: voiceChannel,
//       //       //     connection: null,
//       //       //     songs: [],
//       //       //     volume: 5,
//       //       //     playing: true
//       //       //   };
//       //       //   console.log(message.guild.id);
//       //       //   queue.set(message.guild.id, queueContruct);

//       //       //   queueContruct.songs.push(song);

//       //       //   try {
//       //       //     queueContruct.connection = connection;
//       //       //     playStream(message.guild, queueContruct.songs[0]);
//       //       //   } catch (err) {
//       //       //     console.log(err);
//       //       //     queue.delete(message.guild.id);
//       //       //     return message.channel.send(err);
//       //       //   }
//       //       //   console.log(serverQueue);

           
//       //       //   // queueContruct_map.push(queueContruct);
//       //       //   // console.log(queueContruct_map);
           
              


            

              
//       //       // } else {
//       //       //   serverQueue.songs.push(song);
//       //       //   return message.channel.send(`${song.title} 正在排隊喔請稍等上一個首歌曲結束`);
//       //       // } 
//       //     }  else{
//       //       msgchannel.send('你還未有歌單 請先看指令 並新增你的歌單');
//       //     }
//       //   }
  
//       // });
//     } else {
//       message.reply('我必須先加入一個頻道才能斷線');
//     }
   
//   }
// });

async function play(message, serverQueue, song,msgchannel) {
  const args = message.content.split(" ");
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) return message.reply("You must be in a voice channel!");
 
  console.log(song)
  if (!serverQueue) {
      const queueConstruct = {
          textChannel: msgchannel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          playSong(message.guild, queueConstruct.songs[0]);
      } catch (err) {
          console.log(err);
          queue.delete(message.guild.id)
          return msgchannel.send("There was an error playing! " + err);
      }
  } else {
      serverQueue.songs.push(song);
      return console.log(`Has been added to the queue!`);
  }
}

client.on("message", async message => {
  // if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);
  // console.log(serverQueue);

  if (message.content.startsWith(`${prefix}p`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}sk`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else {
  
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel){
    return message.channel.send(
      "你要加入一個頻道喔!"
    );
  }
    
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      playStream(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} 正在排隊喔請稍等上一個首歌曲結束`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voiceChannel)
    return message.channel.send(
      "你需要加入一個頻道才可以跳過喔!"
    );
  if (!serverQueue)
    return message.channel.send("這裡沒有可以讓我跳過的歌!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voiceChannel)
    return message.channel.send(
      "你需要加入一個頻道才可以停止喔!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function playStream(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection.playStream(ytdl(song.url)).on("finish", () => {
      serverQueue.songs.shift();
      playStream(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);
  serverQueue.textChannel.send(`開始播放: **${song.title}**`);
}

var port = process.env.PORT || 3000;

app.listen(port);

if(port === 3000){
  console.log('RUN http://localhost:3000/');
}
client.login(token);

fx_version 'cerulean'
games {  'gta5' }

author 'Webder'
description 'nargor Scoreboard'
version '1.0.0'

server_scripts{
   "config.lua",
   "server.lua"
}

client_scripts{
    "config.lua",
    "client.lua"
 }

 ui_page 'dist/index.html'

 files {
   'dist/**',
}
ESX=nil
Counter={}
Online=0
Script=GetCurrentResourceName()
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)



Citizen.CreateThread(function()
Citizen.Wait(2000)
 for i,row in ipairs(Config.Counter) do
    Counter[row]=0
 end
 local xPlayers = ESX.GetExtendedPlayers()


 for _, xPlayer in pairs(xPlayers) do
    Online=Online+1
    local job=xPlayer.getJob()
    if Counter[job.name] then
        Counter[job.name]=Counter[job.name]+1
    end
  end

  TriggerClientEvent(Script..":sendPlayerCount",-1,{
    online=Online,
    counter=Counter
  })
end)

AddEventHandler("esx:playerLoaded", function(id)
    Wait(3000)
    local xPlayer = ESX.GetPlayerFromId(id)
    local job=xPlayer.getJob()
    if Counter[job.name] then
        Counter[job.name]=Counter[job.name]+1
    end

    Online=Online+1

    TriggerClientEvent(Script..":sendPlayerCount",-1,{
        online=Online,
        counter=Counter
      })
end)



AddEventHandler("esx:playerDropped", function(id)
    local xPlayer = ESX.GetPlayerFromId(id)
    local job=xPlayer.getJob()
    if Counter[job.name] then
        Counter[job.name]=Counter[job.name]-1
    end

    Online=Online-1

    TriggerClientEvent(Script..":sendPlayerCount",-1,{
        online=Online,
        counter=Counter
      })
end)
RegisterServerEvent(Script..":getplyerdata")
AddEventHandler(Script..":getplyerdata", function()
    local object={}
    local xPlayer = ESX.GetPlayerFromId(source)
    object.name=xPlayer.getName()
    object.job=xPlayer.getJob()
    object.id=source
    TriggerClientEvent(Script..":sendplayerdata", source,object )
end)
RegisterServerEvent("esx:setJob")
AddEventHandler("esx:setJob", function(id,job,oldjob)
    Wait(3000)
if Counter[oldjob.name] then
    Counter[oldjob.name]=Counter[oldjob.name]-1

end

if Counter[job.name] then
    Counter[job.name]=Counter[job.name]+1

end
TriggerClientEvent(Script..":sendjob",id,job)
TriggerClientEvent(Script..":sendPlayerCount",-1,{
    online=Online,
    counter=Counter
  })
end)



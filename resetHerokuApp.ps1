
<#
To run this command in powershell:
    & C:\Users\dizzy\Desktop\"CMPT276 Project"\donald-deck\resetHerokuApp.ps1
#>

heroku ps:scale web=0
start-sleep -s 1
heroku ps:scale web=1

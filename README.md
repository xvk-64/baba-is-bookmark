# About
[Baba Is Bookmark](https://baba-is-bookmark.herokuapp.com) is a small web app built using [React](https://reactjs.org/) that makes browsing for and sharing uploaded levels from [Baba Is You](https://www.hempuli.com/baba/) easier.

This project is unofficial, but exists with the permission of Baba Is You's creator, [Arvi Teikari](https://www.hempuli.com/)

# How To Use
The homepage of Baba Is Bookmark is for browsing levels. You can view all levels, or search for specific ones using the searchbar on the left.

*The homepage:*

![Homepage](https://cdn.discordapp.com/attachments/548081787411103754/792574405435588649/unknown.png)

The other main page is for submitting levels. By typing a valid levelcode in the checkbox, the server will automatically find the details of the level and allow you to submit it to Baba Is Bookmark.

*The add page*

![Add](https://cdn.discordapp.com/attachments/548081787411103754/792575826532237312/unknown.png)

# Support

For support with the website, you can contact the site's creator on Discord:

SpiccyMayonnaise#2608 <@365018100338393088>

# API

Baba Is Bookmark has a public JSON API, which is accessible at https://baba-is-bookmark.herokuapp.com/api

All error responses are objects of the form `{error:true, message:"..."}`

All other responses are objects of the form `{success:true, data:...}`

|Method|URL|Query|Result|Notes|
|:----:|:-:|:---:|------|-----|
|GET|/level/|code|Returns data for the level with the levelcode "code"|Only returns data from database, does not check if level has not been added yet.|
|POST|/level/|code (request body)|Submits a levelcode to Baba Is Bookmark|Will return error if level is already submitted|
|GET|/level/download/|code|Returns data for the level with the levelcode "code"|Only returns data from official server, does not check if level has not been added yet.|
|GET|/level/thumbnail/|code|Returns a data URI for a level's thumbnail||
|GET|/level/raw/ld|code|Returns level's .ld file||
|GET|/level/raw/l|code|Returns level's .l file|Since a .l file is a binary blob, the response is encoded in Base64|
|GET|/browse/|search, (time \| ([before], after))|Returns a list of LevelData, dictated by "search" and between "before" and "after", or since "time" days ago.|Refrain from using this endpoint extensively, since it can be computationally expensive.|

## `levelData` objects

Fields prefixed with `?` are optional (potentially missing), and types suffixed with `?` are nullable (potentially null).

|Field|Type|Description|Notes|
|:---:|:--:|:---------:|:---:|
|`code`|string|The level code for the level||
|`name`|string|The name of the level|Some older level names may be suffixed with `\r` due to a bug with newline handling|
|`author`|string?|The level author|This *can* be set to an arbitrary string, so shouldn't be treated as proof of identity|
|`timestamp`|string|The time the level was uploaded, as a naive ISO 8601 datetime|The time the level was uploaded to this API, not the official server|
|`description`|string?|An optional level description||
|`difficulty`|int?|The level difficulty, between 0 and 10 inclusive.||

## https://baba-is-bookmark.herokuapp.com

---

# About
[Baba Is Bookmark](https://baba-is-bookmark.herokuapp.com) is a web app built using [React](https://reactjs.org/) that makes browsing for and sharing uploaded levels from [Baba Is You](https://www.hempuli.com/baba/) easier.

This project is unofficial, but exists with the permission of Baba Is You's creator, [Arvi Teikari](https://www.hempuli.com/)

# How To Use
Baba Is Bookmark's Level Browser is an easy way to find levels. You can view all submitted levels, or search for specific ones using the searchbar on the left.

*The Level Browser:*

![Homepage](https://cdn.discordapp.com/attachments/548081787411103754/792574405435588649/unknown.png)

The other main page is for submitting levels. By typing a valid levelcode in the checkbox, the server will automatically find the details of the level and allow you to submit it to Baba Is Bookmark.

*The submit page:*

![Add](https://cdn.discordapp.com/attachments/548081787411103754/792575826532237312/unknown.png)

# Feedback

For feedback about the website, you can open an issue on this repository, or alternatively, contact the projects's creator on Discord:

SpiccyMayonnaise#2608 <@365018100338393088>

# API

Baba Is Bookmark has a public JSON API, which is accessible at https://baba-is-bookmark.herokuapp.com/api

All error responses are objects of the form `{error:true, message:"..."}`

All other responses are objects of the form `{success:true, data:...}`  
   
## API endpoints

|Method|URL|Query|Result|Notes|
|:----:|:-:|:---:|------|-----|
|GET|`/level/`|`code`|Returns a LevelData for the level with the specified levelcode||
|POST|`/level/`|`code` (request body)|Submits a levelcode to Baba Is Bookmark|Will return error if level is already submitted|
|GET|`/level/exists/`|`code`|Queries whether a level exists or not.|Returns object `{exists: boolean, submitted: boolean}`|
|GET|`/level/thumbnail/`|`code`|Returns a data URI for a level's thumbnail||
|GET|`/level/raw/ld/`|`code`|Returns level's .ld file||
|GET|`/level/raw/l/`|`code`|Returns level's .l file|Since a .l file is a binary blob, the response data is encoded in Base64|
|GET|`/browse/`|`search`, (`time` \| ([`before`], `after`))|Returns a list of LevelData, dictated by "search" and between "before" and "after", or since "time" days ago.||  
  
## Deprecated API endpoints
|Method|URL|Query|Result|Notes|
|:----:|:-:|:---:|------|-----|
|GET|`/level/download/`|`code`|Returns a LevelData for the level with the specified levelcode|Gets data directly from official server, bypasses API database. Is slower than `/level/`. DEPRECATED. Please use `/level/` instead.|

## `LevelData` objects

Fields suffixed with `?` are optional and could potentially be undefined

|Field|Type|Description|Notes|
|:---:|:--:|:---------:|:---:|
|`code`|string|The levelcode of the level|Levels uploaded after the 21st of December, 2020 will not contain the characters "5", "S", "O" or "0" in their levelcodes.|
|`name?`|string|The name of the level|Some older level names may be suffixed with `\r` due to a bug with newline handling|
|`author?`|string|The level author|This *can* be set to an arbitrary string, so shouldn't be treated as proof of identity|
|`timestamp?`|Date|The time the level was uploaded, as a naive ISO 8601 datetime|The time the level was uploaded to this API, not to the official server|
|`description?`|string|A short piece of text describing the level||
|`difficulty?`|Number (integer)|The level difficulty, between 0 and 10 inclusive.||

# Self-hosting

If you would like to use a portion or all of this code in your own project, there are a few things you need to know.

This API operates directly with the official server that manages levels uploaded from Baba Is You. The URL to this server is not contained in this project and must be supplied by yourself via an external configuration file. 

## Configuration file format

To provide the necessary configuration fields, you must place a file called ".env" in the root directory of the project, with the following syntax:

```
	DATABASE_URL=postgres://<LOCAL POSTGRES SERVER CONNECTION URL>
	SERVER_URL=<OFFICIAL SERVER URL>
```

These fields will be loaded on startup automatically when you run `heroku local dev`, which will automatically start the project in a development environment.
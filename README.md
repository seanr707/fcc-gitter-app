# Gitter App for FreeCodeCamp
*Authored by Sean R. [(@seanr707)](https://github.com/seanr707)*

*Link to build: [fccgitterapp.herokuapp.com](https://fccgitterapp.herokuapp.com/)*

### About project

This project was written mainly for educational purposes in mind. It was inpsired
by my own issues with the official Gitter client using a lot of processing power
and not loading well on my home Internet.

The project aims to showcase the use of an external API, Oauth login,
a clean minimal UX, React/Redux UI and state management.

#### Current Features:
* Login using Gitter oauth
* Use Gitter API to send and receive messages from other users
* Notifications upon receiving a message in the active room
* Access to all public FreeCodeCamp chat rooms
* Load as little images as possible to keep the page loading quickly
* Messages receive a different color depending on their context (i.e. Red for a mention to the current user, Green for camperbot)
* Click on a user's name below their message and have them added to your input field

#### Currently WIP:
* ~~Sidebar to select room~~
* ~~Client-side markdown and emoticon support~~
* Autocompleting mentions
* ~~All FreeCodeCamp chat rooms~~
* Building database on the server storing users' brownie points

#### Possible future additions:
* Build desktop app with Electron
* Accessing FreeCodeCamp API for brownie points (once API is public)

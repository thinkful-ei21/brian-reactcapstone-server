## Lyric creator server

There are three main files for routes within the lyric creator server, user routes and lyrics routes (routes.js).

#### Lyric routes

Each set of lyrics are attached to each user, and are only available to that user.
For each song there is a title and a lyric and a set of comments. Each comment is composed of
of a highlight and a remark. The highlight is the copied line of the song that will be commented on.
Songs can also be deleted. 

#### User routes

The user routes are used to send information about each user (username, firstname, lastname and password) to the server and database for authentication later on.

#### Authentication
login endpoint for the app will allow users to post their login credentials (username and password)
to enter the site. When this information is verified this post endpoint will respond with a authToken.

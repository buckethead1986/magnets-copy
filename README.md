Check out the app here: https://mag-nets.herokuapp.com/


## Overview

Magnets is a front-end React application that allows users to create poems just
like those magnetic fridge poetry sets. The poems are created using drag and
drop React components (react-dnd) from Rails API back end word banks. Users can
favorite and follow other users and their poems.

## Technology

Magnets uses the create-react-app pack for the React skeleton. It's a
single-page application that simulates routes using React Router. The backend
JSON API is built in Ruby on Rails: https://github.com/buckethead1986/magnets-api.
The database is Postgres and is responsible for keeping all of the data
pertaining to sessions, users, challenges, and comments. The user authentication
is built using a session controller in Rails and a JWT token to authenticate the
user via the Rails backend and in the user's local browser storage.

## Functionality

Any non-logged in navigation redirects you to the freeplay poem creation page.
Guests can drag and drop words and view other users poems by clicking their name
in the drawer to the left.

Once a user logs in, more functionality in the website opens up.  Poems can be
saved, added to a favorites list, and other users can be followed. Followed
users are automatically updated and subdivided in the left drawer, and favorited
poems can be seen by clicking 'All Poems' in the left drawer.  Selecting any or
all users or 'Favorites' filters all the poems accordingly.

Every poem, wherever displayed, can be favorited and its' user followed or
unfollowed, which are updated immediately. If the poem is yours, a third option
to delete becomes available.

## Layout / Design

I used Googles Material UI for the design (with some select inline CSS). This
component-based styling allows for easy integration of components and an overall
cohesion of style. I divvied up created poem components into Material Cards, and
users appear in a List on the profile page. On the poems index page, there is a
dropdown filter that allows multiple selections between any and all users, and
by favorited poems, which updates upon favoriting/unfavoriting a poem.

The design is meant to be as intuitive as possible, anticipating where the user
will click when they want a specific action, and incorporating that functionality.

## Design Patterns

I used several design patterns, but stuck mostly with a container model. I used
container components for the Profile and Create Poem uppermost parent components
(before App and Index), and subdivided the child components into folders
depending on functionality or website location.

# README.md

## What

A go API served by an react app. Both are running behind an nginx app which handle the uri redirection.

Access /api/v1/doc/index.html to browse swagger doc.


The api container is reachable in intern of the docker stack at the `api` address.

The front container is reachable in intern of the docker stack at the `front` address.

The nginx container handle the redirection from http to https. The nginx container also 
handle the proxy redirection based on the uri base path (`/api` redirect to the api - otherwise the front is served).



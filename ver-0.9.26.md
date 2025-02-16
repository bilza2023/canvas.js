

version 0.9.26
==============
 1. taleem-assets is out if the an Env(which is names as asset in taleem-canvas contructor) is provided then it will not load/create an Env since we may need to create many canvas slides and 1 Env works for all of them. So now the taleem-canvas is obsolete

 2. the "build" command not only builds the dist but also place it in docs/examples folder
 3. the docs are not updated
 4. the docs/examples work with static files which is great keep them such, for dynamic examples i can use routes since the library is served from dist/taleem-canvas so routes etc makes no change to it.

 Actions
 =======

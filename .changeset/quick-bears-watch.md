---
'@siafoundation/react-core': minor
---

Hooks keys are now a two element array that includes the request method. This fixes an issue where hooks using the same route on different methods could conflict. The mutation matcher still uses the route string without any method information.

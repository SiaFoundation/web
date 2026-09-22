---
'@siafoundation/design-system': minor
---

Removed the tailwind-scrollbar plugin from the published theme preset. It requires Tailwind 4 while the preset targets Tailwind 3, and the only style it contributed was a no-op reset. Anything using its scrollbar utilities needs to add the plugin directly.

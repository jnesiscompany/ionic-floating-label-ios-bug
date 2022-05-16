# ionic-floating-label-ios-bug

This project serves as an example of a bug occurring only on iOS, where the floating labels don't get refreshed when changed dynamically.
They do change if you focus a field, or when you change them a second time.

Works fine on Android and Web, not on iOS.


Tried different approaches : 
- run inside ngZone
- use onPush change detection
- trigger changes on the click of a button
- use (ionChange) instead of watching changes on the reactive form control

See comments in code to enable/disable different approaches

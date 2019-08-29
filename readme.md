# ![RealWorld Example App](logo.png)
> ### NativeScript codebase containing A box timer


This codebase was created to demonstrate a fully fledged fullstack application built with **NativeScript**

## Getting started
It is assumed that you have installed and configured NativeScript properly. If not, head to https://docs.nativescript.org/start/quick-setup and validate its correct functionality.

To start the emulator with this repository:
  > `git clone https://github.com/quixote15/Nativescript-BoxTimer`
  > `cd Nativescript-BoxTimer`
  > `tns run android --bundle` or `tns run ios --bundle`

### Development
This project has been developed with [Visual Studio Code](https://code.visualstudio.com/).
It has been tested and live-synced with android devices for the most time.

## How it works
This app works as a NativeScript is based on [NativeScript 6](https://nativescript.org) Angular/TypeScript style.

Head over to the [NativeScript Docs](https://docs.nativescript.org/angular/start/introduction) to find out how to get started with NativeScript, Angular and Typescript.

### Concepts
This app tries to show the following NativeScript concepts:
* Custom Component inclusion
* SideDrawer Menu
* Services
* Application Settings
* Custom ActionBar
* Lazy-loading
* Modal Dialogs
* Navigation
* Plugins (NativeScript and npm JavaScript)
* Sass
* TTF inclusion

To show as many concepts as possible the structure is not necessarily consistent but may differ between views.

### Architecture
The project follows the general NativeScript/Angular structure without any specifics. It uses lazy-loaded modules to encapsulate functionality further. It uses frame and router navigation to go back and forth between pages.

The project itself is mainly located in the `app/` folder. It follows this general architecture:
* `module/` contains the different views and according logic, split into a general, lazy-loaded module structure resembling the UIs
* `service/` contains shared services used to encapsulated global, view-independent logic, i.e. the backend calls
* `model/` contains shared entity classes used as models throughout the other files
* `fonts/` contains [FontAwesome](https://fontawesome.com/v5.9.0/) icons used in the app.

#### Files
Each component comes in two parts:
* `xyz.component.ts` the source
* `xyz.component.html` the template

Everything is loaded in their according modules and reached via module-specific routing files:
* `x.module.ts` the general module
* `x.routing.ts` the routing file
* `x.css` according CSS

Not all files are necessarily needed to be encapsulated in such a granularity, but the structure was executed through the source to stay consistent.


#### Screenshots
<img width="200px" src='https://github.com/quixote15/Nativescript-BoxTimer/blob/master/examples/screenshot_1.png' style="margin-right: 10px;"></img>
<img width="200px" src='https://github.com/quixote15/Nativescript-BoxTimer/blob/master/examples/screenshot_2.png' style="margin-right: 10px;"></img>
<img width="200px" src='https://github.com/quixote15/Nativescript-BoxTimer/blob/master/examples/screenshot_3.png' style="margin-right: 10px;"></img>
<img width="200px" src='https://github.com/quixote15/Nativescript-BoxTimer/blob/master/examples/screenshot_4.png'></img>



### Plugins
This example app uses a set of available NativeScript plugins to visualize the possible usage. Head over to the [NativeScript Market](https://market.nativescript.org/) for more information.

Used NativeScript plugins from https://market.nativescript.org:
* [nativescript-audio-player](https://market.nativescript.org/plugins/nativescript-audio-player) to show general, fancy messages


## License & Credits

Thanks to all the plugin developers and articles by so many people on the NativeScript blog, forums. Big thanks!

This project is licensed under the MIT license.

## Disclaimer
This source and the whole package comes without warranty. It may or may not harm your computer or cell phone. Please use with care. Any damage cannot be related back to the author. The source has been tested on a virtual environment and scanned for viruses and has passed all tests.

## Personal Note
*I don't know if this is very useful for a lot of people but I wanted a real-world tutorial with NativeScript, so here we are :) I hope this proves helpful to you... with all its Bugs and Issues ;) If you like it you can let me know via this repository.*

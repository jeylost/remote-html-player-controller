# REMOTE CONTROLLER FOR HTTP VIDEO PLAYER
This project can be useful for those who want to use their second device(phone, pc, or anything else with a browser on it) to control a video player inside the browser

## Prerequisites(on PC you want to control)
1. [Node.js](https://nodejs.org/en/download) installed(LTS version is recommended)
2. [Python](https://www.python.org/downloads/) installed
3. [PyAutoGUI](https://pyautogui.readthedocs.io/en/latest/install.html) installed

## List of commands
| Command            | Conditions                                                |
|--------------------|-----------------------------------------------------------|
| `enter fullscreen` | Eng keyboard layout (relies on `f`); video playing        |
| `leave fullscreen` |                                                           |
| `pause`            |                                                           |
| `play`             | Video player should be at the center of the screen        |
| `skip back`        |                                                           |
| `skip forward`     |                                                           |
| `volume down`      |                                                           |
| `volume up`        |                                                           |

## How to use
1. clone this project on your PC
2. in the root folder of the project run:
`npm start`
3. open the browser on the device you want to use as remote and go to:
`http://{your_pc_ip_address_in_your_local_network}:3000`

P.S. This address should be printed to the web server logs as well. Just for those who struggle to find it but somehow managed to find the project on the internet...

## FAQ
### How to add my own command to the list
1. add action to the list of actions in `index.html` you can find it [here](https://github.com/jeylost/remote-html-player-controller/blob/9d3dfbc04abf6e89146f190e77d5e832ae55effc/index.html#L42-L51)
action is an object with next fields:
 - `type` - `input` or `button`
 - `text` - label
 - `action` - string(should be a valid name for a file in your OS)
2. create a file in `/src/desktop-controller/actions/` folder with `{action}.py`
3. check default actions and [PyAutoGUI docs](https://pyautogui.readthedocs.io/en/latest/install.html) to make your own ~~awesome~~ action
### Why don't stick to one language Python/Javascript
The first version of this project controlled the browser using JS that was added to the page with the player via a browser extension.
But from the moment browsers gained the power to execute js. This land is a western full of hackers. To protect civilians browsers now have their cors policies and plenty of other tools to protect people. Fortunately, browsers won't believe me that I'm a good boy just because I'm saying, "I'm a good one don't shoot me"!

When browsers are a place where anyone can add malicious code to abuse users without their even knowing this code will be executed, operation systems in their turn don't allow you to execute any code until you get it from somewhere on your own and install it manually. Obviously, if users install a program they should be able to execute it. Otherwise, the PC is useless, right? And I found this fascinating library for Python named [PyAutoGUI](https://pyautogui.readthedocs.io/en/latest/index.html). Easy to use, has everything you need to control your device.

The problem is with js inside browsers. But Webserver to make the connection between the remote controller and video player just works fine. There is no reason to rewrite a web server that works fine on Node.js to Python. The only advantage is the installation process. But this project isn't something I'm gonna offer as a product for people. Therefore simplifying the installation process isn't my goal at all. The process is pretty much simple even now.

### I want to control my video player outside of my local network
There is a simple and secure way to do that. Use [twingate](https://www.twingate.com) this project is awesome. And it's free for personal use (at least atm). **Even if your provider gave you a white IP address and you kind of nerd who knows how to open a port on your router to the internet. Don't do it. This project lacks security and can be subject to attacks. The same goes for public networks. This web server is just for internal use to entertain at home. Want to entertain anywhere? Feel free to contribute. This will be helpful on the way [OWASP TOP TEN](https://owasp.org/www-project-top-ten/)**

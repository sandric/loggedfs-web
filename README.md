# loggedfs-web
## Description
For those who using loggedfs brilliant logging capabilities, but struggles its verbose output, lack of agile exclusion on all the params it outputs, and saw in some dream web-frontend to it with all the sweetness of node 'keep-alive' like web frontends.

## Installation
To install just clone the repo to your local machine in any folder you like.

## Running
To start it you need to have loggedfs installed on you machine. Also you need to specify the folder you want to mount fuse fs for loggedfs, and path to your loggedfs config .xml file. This is all done in config.json file in repository you just cloned, it comes with predefined examples for you to understand where to go for your settings. Here's it:

### config.json
```json
{
  "port": 1337,
  "host": "0.0.0.0",
  "mount_directory": "/home",
  "loggedfs_config": "/home/sandric/loggedfs.xml",
  "excludes": {
    "action": ["getattr"],
    "attempt": [".*google-chrome-unstable.*", "/home/sandric/.xmonad/volume.sh"],
    "pname": ["/usr/bin/fish", "amixer"]
  }
}
```
Port and host is webserver settings where node will stream loggedfs output, mount_directory and loggedfs_config is those things we talked just now, remember?), excludes is additional excludes options to basic ones provided with loggedfs via it's .xml config file. The reason why it is done is because it's not quite suits all excluding needs, for example you can not exclude output by process name with it, while here you can as you see in "pname" key. Here's the list of all excluding options:
**time**
**action**
**attempt**
**result**
**pid**
**pname**
**uid**

Now, when you done with your config.json, simply run 'node server.js', and in you web browser you should see smth like this:
![Image of loggedfs-web in action](https://s3.amazonaws.com/f.cl.ly/items/152j1A2B3W2H322h0W00/Image%202015-02-19%20at%206.12.14%20%D0%BF%D0%BF.png)

## Daemonizing things

Most of times you will find unnecessary to always spawn node server from terminal and watch it's output and do it everytime server or your machine reload, and what you may want to do is to wrap this in to service to be runned everytime your system boots up. And the best way to achieve this is to write systemd service (i'm not a huge fan of upstart or anything else, so if you'r one of [those guys](http://debianfork.org/) good luck with your own service, no offens).
In repository there is basic stub for it in loggedfs-web.service:
```
[Unit]
Description=loggedfs web frontend

[Service]
WorkingDirectory=/home/sandric/loggedfs-web/
ExecStart=/usr/bin/node server.js
ExecStopPost=fusermount -zu /home
```
As you may guess all you have to do is to change WorkingDirectory to path where you cloned repo, and (if needed), ExecStart to your node.js executable (substitute it with `which node` command output).
Then copy it to your system systemd services directory: `cp loggedfs-web.service /etc/systemd/system/.`
After its done, you can check if it's in your systemd services list: `systemctl | grep loggedfs`, 
if not try to run `systemctl daemon-reload`.
And now, to start the service, simply run `systemctl start loggedfs-web`, 
to make it run every system boot-up `systemctl enamble loggedfs-web`,
to tail server.js logs, run `journalctl -f -u loggedfs-web.service`.

## Styling
You may want to change some coloring of events, produced by loggedfs. You should then take a look at styles.css, where it all set up. The way you need to set color for particular event is via "action_" class prefix, where second part is actually action name, like **read**, **write**, **mknod**, etc.

## Troubleshooting
You may make some errors in config.json, so that server will throw an exception and exits without proper loggedfs fuse fs unmounting. If you start to receive some errors, related to this, you may need to run `fusermount -zu <your mounted folder>` via root in another terminal. Hope it will not happen to you.

## Summary
I may wrap it to NPM module some day. Lets prey for this salvation day to come, brothers and sisters.

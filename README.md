# aurelius

This is a RaspberryPi project with a talking parrot

# RaspberryPi setup
We are using i2c and gpio outputs, raspicam and graphicsmagick. Follow these steps to set up your pi.

## i2c
First you need to install i2c-tools on your raspberry:
```
sudo apt-get install i2c-tools
```

Still in the terminal type in:
```
sudo nano /etc/modules
```

Add these lines:
```
i2c-bcm2708
i2c-dev
```

Then type:
```
sudo nano /etc/modprobe.d/raspi-blacklist.conf
```

Find these two lines and comment them out with '#', just like this:
```
#blacklist spi-bcm2708
#blacklist i2c-bcm2708
```


## gpio
Comming soon

## raspicam
Comming soon

## graphicsmagick
Comming soon

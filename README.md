# aurelius

This is a RaspberryPi project with a talking parrot

# RaspberryPi setup
uurelius uses several libraries like i2c, gpio, raspicam and graphicsmagick. Follow these steps to set up your pi.

## i2c
First you need to install i2c-tools on your raspberry:
```
sudo apt-get install i2c-tools
```

Run sudo raspi-config and change the i2c settings like:
1. Click on 9 Advanced Options
2. Choose A7 I2C
3. Enable I2C ARM Interface
4. Load the I2C kernel by default
5. Reboot your Raspberry

After reboot go to the terminal and type
```
sudo nano /etc/modules
```

..and add these lines:
```
i2c-bcm2708
i2c-dev
```
Save with ctrl+O and exit with ctrl+X

Depending on your distribution, you have to edit the following file: (not necessary if this file doesn't exist)
```
sudo nano /etc/modprobe.d/raspi-blacklist.conf
```

Find these two lines and comment them out with '#', just like this:
```
#blacklist spi-bcm2708
#blacklist i2c-bcm2708
```
Restart your Raspberry again.

Attach your I2C module to the raspberry and try:
```
i2cdetect -y 1
```
The output should look something like this: (0x68 active)
```
0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- 68 -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

If you get no output, although your sensor is propery attached, try this:
```
sudo chgrp i2c /dev/i2c-1
sudo chmod 666 /dev/i2c-1
```
Restart your Raspberry and try again, it should work now


### gpio
Comming soon

## raspicam
Comming soon

## graphicsmagick
Comming soon

# Node Modules
Load these node modules in your working directory to make the code working
```
npm install i2c-bus i2c-mpu6050 pi-gpio raspicam gm
```

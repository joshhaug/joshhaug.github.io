---
layout: post
title: Hive Sound Analysis

date: 2020-05-01
description:
author: Josh Haug
tags:

- Bees
- Audio
---

## The Bees Are Speaking

Bees communicate with sound.  Newborn queens, for example, use their wing muscles to make a trumpeting sound called "piping".  This is a battle cry.  

/assets/piping.mp3


## Audio Data Collection Setup

Audio is coming from an old Guitar Hero USB mic I cannibalized.

The audio is recorded using [arecord](http://manpages.org/arecord) in a bash script more or less like this:

```python
while [true]    
    arecord --device sysdefault:CARD=1 --format S16_LE --rate 11025 --channels=1 --duration 3600 out.wav || break;
```


It's pretty easy to see what this command is doing: record an hour (3600 seconds) of mono sound (16 bit samples, little endian) at 11025 samples per second.

Why am I recording at 11025 Hz instead of the standard 44.1kHz? Some papers indicate that bee communication sounds are composed of a low fundamental frequency between 300 and 600Hz and the corresponding harmonics.[^fn-vibratory]  Therefore, the Nyquist sampling rate is 1200 Hz, but that makes for some gnarly audio.

Besides, the standard 44.1kHz stereo signal is ~10MB per minute. The mono 11kHz signal is ~1.25 MB per minute, which is a tolerable 1.8GB per day. For data safety and ease of processing, I'm recording the audio data as 1-hour wav files.

So... what am I looking for? Here's some examples:

![  ](assets/acoustic-signature.jpg)

This table is from the great paper *Remote Beehive Monitoring using Acoustic Signals*.[^fn-acoustics]

The table fails to mention that worker piping also occurs in non-disturbed queenright hives.[^fn-worker-piping]

[https://www.beeculture.com/a-closer-look-piping-tooting-quacking/](https://www.beeculture.com/a-closer-look-piping-tooting-quacking/)

### Ideas for Stuff

- Pics of setup
- Sonogram of signal to show harmonics

- Commercial hive montioring tool
  - [Broodminder](https://broodminder.com) Blutetooth LE devices
  - [Arnia](https://www.youtube.com/watch?v=ZoRyeiV7BSE) setup
- Amateur tools
  - [Temperature and humidity](https://www.youtube.com/watch?v=1hl_YaXvU0A)


---
### References

[^fn-acoustics]: Qandour, Amro & Ahmad, Iftekhar & Habibi, Daryoush & Leppard, Mark. Remote Beehive Monitoring using Acoustic Signals. Acoustics Australia / Australian Acoustical Society. 42. 204-209. 2014.

[^fn-vibratory]: M. Hrncir, F. G. Barth, and J. Tautz, “Vibratory and airborne-sound signals in bee communication (hymenoptera),” Insect Sounds and Communication: Physiology, Behaviour, Ecology, and Evolution, p. 421, 2005.

[^fn-worker-piping]: Pratt, S. C., Kühnholz, S., Seeley, T. D., and Weidenmüller, A. Worker piping associated with foraging in undisturbed queenright colonies of honey bees. Apidologie, 27(1), 13-20. 1996. [pdf](https://www.apidologie.org/articles/apido/pdf/1996/01/Apidologie_0044-8435_1996_27_1_ART0002.pdf)

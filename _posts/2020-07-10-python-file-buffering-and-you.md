---
layout: post
title: Python File Buffering and You
date: 2020-07-10 01:35 -0700
---

Python File Buffering

I'm using a [python library](https://github.com/tdack/MAX6675) to read the temperature every ten seconds. The logging scheme is decidedly un-fancy -- I'm just appending a text file with timestamped readings. Here's the basic idea:

```python
while True:    
    with open("temp.txt", "a") as f:        
        dat = datetime.datetime.now()        
        t1, t2, t3 = 0, 0, 0        
        try:            
            t1 = sensor1.readTempC()            
            t2 = sensor2.readDieTempC()            
            t3 = sensor2.readObjTempC()        
        except:            
            print "An error occured"        
        f.write(','.join([dat, t1, t2, t3]) + "\n") 
        time.sleep(10.0)
```

Initially, I wrote the script with the `open` statement outside the loop, like so...

```python
with open("temp.txt", "a") as f:    
    while True:        
        # ... get temperatures        
        f.write('something')
        time.sleep(10.0)
```

... to save on the cost of reopening the file for each iteration of the loop. But this one doesn't update the file after every call to `f.write('...')` , thanks to the magic of unnecessary file buffering. 

![ ](../assets/file-buffering.gif)

This can be fixed by calling `f.flush()` after every `f.write()`, or specifying a buffer length of 0: `open('temp.txt', 'a', 0)`.

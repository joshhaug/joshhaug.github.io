Regardless, this should be pretty easy to implement.  Let's revisit the video of a hive entrance I analyzed in an [earlier post](quick-video-analysis.html):

![ ](assets/phone-basic.mp4)

<video poster="assets/phone-basic.mp4" controls>
    <source src="assets/phone-basic.mp4" type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'>
    <p>This is fallback content to display for user agents that do not support the video tag.</p>
</video>

Here's the video with the [MOG2](https://docs.opencv.org/master/d1/dc5/tutorial_background_subtraction.html) background subtraction algorithm applied:



<video width="620" height="480" autoplay loop>  
<source src="assets/phone-basic.mp4" type="video/mp4">  
Your browser does not support the video tag.  
</video>

![  ](assets/phone-mogmask.mp4)

We can then threshold the background subtraction output to get regions with substantial movement only:

![  ](assets/phone-mogthresh.mp4)
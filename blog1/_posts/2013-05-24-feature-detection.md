---
layout: post
title:  "Feature Detectors and Descriptors"
date:   2013-05-24 19:00:00
categories: blog1
---

<figcaption class="reading-notes">
Update on July 18, 2013: 
</figcaption>
>A simple program based on OpenCV is on my [github](https://github.com/yulu/desc_compare). Demo program, not guarantee to work perfectly. 

Feature descriptors are commonly used in lots of computer vision algorithms - object recognition, tracking, image stitching camera calibration and etc. I used it in three different types of tasks - tracking for AR, panorama creation and visual classification. Recently I conducted a detail analysis of the state-of-the-art detectors and descriptor-generators, since I am considering to try different algorithms in  some of my undergoing research projects as well as for the purpose of my paper revision [I hate this  most! :( ]. Here is a good [report](http://computer-vision-talks.com/2011/08/feature-descriptor-comparison-report/) about descriptor comparison. In the post I briefly summarized the most popular open source detectors and descriptors (All of them are implemented in newest version of OpenCV). 

#### SIFT(2003)

SIFT descriptor is a classic approach, also the "original" inspiration for most of the descriptors proposed later. Up to date, it still outperforms most of the descriptors in the field. The drawback  is that it is mathematically complicated and computationally heavy.  Main issues it addresses are the scaling-invariance and orientation-invariance in describing the features.

Detector: The keypoint is selected based on the Difference of Gaussian - detecting locations that are invariant to scale change of the image can be accomplished by searching for stable features across all possible scales, using a continuous function of scale known as scale space. To detect the keypoints, scale octave is generated and the local extrema is detected by comparing the centre pixel with the neighbours in space.

![desc-1](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16886059497_d8c6f80696_z.jpg)

Descriptor: To describe the keypoints, SIFT make uses of the local gradient values and orientations of pixels around the keypoint.  A keypoint describer is created by first computing the gradient magnitude and orientation at each image sample point in a region around the keypoint location, as shown on the left. These are weighted by a Gaussian window, indicated by the overlaid circle. These samples are then accumulated into orientation histograms summarizing the contents over 4x4 subregions, as shown on the right, with the length of each arrow corresponding to the sum of the gradient magnitude near that direction within the region.

![desc-2](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/17067496746_5eb3648421_z.jpg)

#### FAST(2006)

FAST is a standalone feature detector (not descriptor generator). It is designed to be very efficient and suitable for real-time applications of any complexity. The segment test criterion operates by considering a circle of sixteen pixels around the corner candidate p. The original detector classifies p as a corner if there exists a set of n contiguous pixels in the circle which are all brighter than the intensity of the candidate pixel Ip plus a threshold t, or all darker than Ip - t, as illustrated below. To speed up the detector, a machine learning approach is adopted, and a decision tree is generated. The detail discussion is in the paper. FAST is only a detector, but it is proven to be quite reliable and used in the upstream for lots of other descriptor generating process.

![desc-3](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/17067497576_39758e2504_z.jpg)

#### SURF(2008)

SURF detector is recognized as a more efficient substitution for SIFT. It has a Hessian-based detector and a distribution-based descriptor generator.

Detector: the detector is based on the Hessian matrix, defined as

![desc-math-1](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/17093464795_6e66cfcd7c.jpg)

L is the convolution of the Gaussian second order derivative with the image I. In the implementation, they replace the Gaussian kernel with a simpler box filter. It is then interpolated in scale and image space to give itself the scale-invariance properties.

Descriptor: An orientation is first assigned to the keypoint. Then a square region is constructed around the keypoint and rotated according to the orientation. The region is split up regularly into smaller 4x4 square sub-regions. This keeps important spatial information in. For each sub-region, we compute a few simple features at 5x5 regularly spaced sample points. The horizontal and vertical Haar wavelet responses dx and dy are calculated and summed up over each sub-region and form a first set of entries to the feature vector. The absolute values of the responses dx and dy are also calculated, and together with the sum of vector to form a four-dimensional descriptor. And for all 4x4 sub-regions, it results in a vector of length 64. 

![desc-4](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16473303733_0774369d97.jpg)

#### BRIEF(2010)

BRIEF descriptor is a light-weight, easy-to-implement descriptor based on binary strings. Binary test is explored in FERN algorithm, which is a Naive-Bayesian classifier method for feature matching. BRIEF descriptor targeted to low-power devices, and compensate some of its robustness and accuracy to the efficiency. It is a standalone descriptor generator, an upstream detector, such as FAST is required.

The approach is to define a test pattern (experiment indicates Gaussian distribution gives a good result) and applied to the detected keypoints. The lines indicates a test pair, an output of either 1 or 0 is provided based on the intensity difference of the two pixels. A series of such test outputs a binary string, which is considered as the "descriptor". Matching of the descriptor is based on the Hamming distance. BRIEF descriptor is not scale and orientation invariant due to the nature of the its design, however it inspires a few most recent and advanced binary-test based descriptors, which are discussed below.

![desc-5](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16886063067_d91ee2218a.jpg)

#### ORB(2011)

ORB is an extension of BRIEF descriptor by introducing orientation invariance. It uses FAST detector with an orientation assignment by intensity centroid. To describe the feature, BRIEF pattern is rotated with orientation angles and a good pattern distribution is trained from the large rotated pattern database. A bit more detail about ORB is summarized here.

Detector: The detector first employ a Harris corner measure to order the FAST keypoints since FAST does not produce a measure of cornerness. The orientation for the detected points are calculated based on the intensity centroid. The centroid is defined as

![desc-math-2](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16907255299_dea2850f3a_m.jpg)

A vector from the corner's center to centroid can be calculated, and the orientation simply is

![desc-math-3](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16905689878_4a4e77af10_m.jpg)

Descriptor: The test pattern is steered according to the orientation of the keypoints. But the steered BRIEF lowers its variance because the oriented corner keypoints present a more uniform appearance to binary tests. To recover from the loss of variance in steered BRIEF, a learning method is developed to select a good subset from the binary test pool. The results rBRIEF has a better diversity and lower correlation.

#### BRISK(2011)

BRISK is more recent method based on scale-space enabled FAST for testing and binary test patterns for describing.

Detector: a keypoint is identified at octave ci by analyzing the 8 neighboring saliency scores in ci as well as in the corresponding scores-patches in the immediately-neighboring layers above and below. In all three layers of interest, the local saliency maximum is sub-pixel refined before a 1D parabola is fitted along the scale-axis to determine the true scale of the keypoint.

![desc-6](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16886243407_efaa475615.jpg)

Descriptors: BRISK is a 512 bit binary descriptor that computes the weighted Gaussian average over a selected pattern of points near the keypoint. The pattern is designed as that N locations are equally spaced on circles concentric with the keypoint. For the formation of the rotation- and scale- normalized descriptor, BRISK applies the sampling pattern rotated by alpha around the keypoint k. The bit-vector descriptor is assembled by performing all the short-distance binary intensity comparisons of point pairs.

![desc-7](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16905685278_016c59db13.jpg)

#### FREAK(2012)

FREAK is a standalone descriptor. It improves upon the sampling pattern and method of pair selection that BRISK uses. FREAK evalues 43 weighted Gaussians at locations around the keypoint, but the pattern formed by these Gaussians is biologically inspired by the retinal pattern in the eye. The pixels being averaged overlap, and are much more concentrated near the keypoint. The actual FREAK algorithm uses a cascade for comparing these pairs, and puts the 64 most important bits in front to speed up the matching process.

![desc-8](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16907252229_b0ab3c60fa.jpg)
![desc-9](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16905904470_c164aa4151.jpg)

I will post a more detailed comparison on efficiency and accuracy. Recent two months are busy with projects and trips.
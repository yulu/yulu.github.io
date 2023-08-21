---
layout: post
title:  "Bag-of-Features for Visual Recognition"
date:   2013-04-25 19:00:00
categories: blog1
tags: research
---

### Rationale

The inspirations are from some researches [1][2] in Server-client structure for large-scale AR tracking system. What I'm going to explored as illustrated in the figure below, is to build a backend server for my current outdoor tracking system running solely on the client device currently.

![reco-1](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/17092832791_bab4f69ee5_z.jpg)

### Bag-of-Feature Visual Recognition

![reco-2](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16905749628_0809f92ce6_z.jpg)

#### Bag-of-Features

Bag of features (bag of words) models are a popular technique for image classification inspired by models used in natural language processing. The model ignores or downplays word arrangement and classifiers based only on a histogram of frequency of visual words. Figure here depicts the difference of histogram distribution of the different textures trained against a collections of features (codebook).

![reco-3](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16886130467_412ea6607d.jpg)

#### Generate "Visual Words"

The basic steps to generate "visual words" for an image is first to extract features from the image, then a "visual vocabulary" needs to be learned from the features. For each image, the features are quantized using the "visual vocabulary" and represented by frequencies of "visual words".

*Feature Extraction - Random Sampling*

There are different methods to be used to sample features from the images: densely distributed samples, keypoint detectors and random sampling. [3] presented the research results on comparison of the different sampling methods. It concluded that for a representative selection of commonly used test databases and for moderate to large numbers of samples, random sampling gives equal or better classifiers than the sophisticated multi-scale interest operators that are in common use. The figure below is the comparison results on 6 different standard databases. It compares the random sampling, Harris -Laplace detector(HL) and Laplacian of Gaussian detector (LoG).

![reco-4](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16905751548_a5dfc0a017.jpg)

Besides the comparable good performance of random sampling, another two reasons it should be used is that it is more efficient than detector and requires less memory than densely distribution sampling. Also it can produce as many keypoints as required, as for detectors there will be limitations for the maximum numbers to detect.

*The Classifier - Hierarchical k-means Tree*

Follow [4]: The vocabulary tree defines a hierarchical quantization that is built by hierarchical k-means clustering. Instead of k defining the final number of clusters or quantization cells, k defines the branch factor (number of children of each node) of the tree. First, an initial k-means process is run on the training data, defining k cluster centers. The training data is then partitioned into k groups, where each group consists of the descriptor vectors closest to a particular cluster center. The same process is then recursively applied to each group of descriptor vectors, recursively defining quantization cells by splitting each quantization cell into k new parts. The tree is determined level by level, up to some maximum number of levels L, and each division into k parts is only defined by the distribution of the descriptor vectors that belong to the parent quantization cell.

![reco-5](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16907321059_e316f4dd21_z.jpg)

The representation of a descriptor can be reduced (from 128-d SIFT descriptor [5]) to a L-d descriptor simply by propagating each descriptor down the tree by at each level comparing the descriptor vector to the k candidate cluster centers and choosing the closet one. This is a simple matter of performing k dot products at each level, resulting in a total of kL dot products.


![reco-6](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/17092837451_af385b3c0b_z.jpg)

The relevance of a database image to the query image is determined based on how similar the paths down the vocabulary tree are for the descriptors from the database image and the query image. The difference is quantize by equations below. The scheme used is to assign a weight wi to each node i in the vocabulary tree, typically based on entropy, and then define both query vector qi and database vectors di according to the assigned weights.

![reco-7](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16905754588_cbb5278ccf.jpg)

The entropy weight wi is defined below. This results in a TF-IDF scheme. It is found that it is better to use the entropy relative to the root of the tree and ignore dependencies within the path. It is also possible to block some of the levels in the tree by setting their weights to zero and only use the levels closest to the leaves.

![reco-8](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16905972480_8fd453dd00.jpg)

K-nearest neighbours classification method is used. Among the top n scores, the category which the most-voted image is from is selected as the classification result. A very good implementation can be found in[6].


#### Reference

[1] J. Ha, K. Cho et al. Real-Time Scalable Recognition and Tracking based on the Server-client Model for Mobile Augmented Reality. IEEE International Symposium on Virtual Reality Innovation 2011

[2] S. Gammerter, A. Gassmann et al. Server-side object recognition and client-side object tracking for mobile augmented reality. CVPRW 2010.

[3] E.Nowak, F, Jurie and B. Triggs. Sampling Strategies for Bag-of-Features Image Classification. ECCV 2006.

[4] D. Nister and H. Stewenius. Scalable Recognition with a Vocabulary Tree. CVPR 2006.

[5] D. Lowe. Distinctive image features from scale-invariant keypoints. IJCV, 2004

[6] A. Vedaldi's implementation of Vocabulary Tree
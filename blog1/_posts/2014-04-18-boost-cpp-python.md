---
layout: post
title:  "Boost C++ in Python"
date:   2014-04-18 19:00:00
categories: blog1
---

Need to implement some code in Cpp for efficiency, but still want to use Python to rapidly develop the software. Test the boost.python lib to convert Cpp functions to python module. Take reference example from boost.python simple example and the makefile from Craig.

The hello_py.cpp File defines the module for each cpp functions

{% highlight c %}
#include <boost/python.hpp>
#include "hello.hpp"

using namespace boost::python;

BOOST_PYTHON_MODULE(hello_py)
{
    //add regular functions to the module
    def("greet", greet);
    def("square", square);
}
{% endhighlight %}

hello.hpp defines the cpp functions, included in the above file

{% highlight c %}
#include <string>

namespace{
    //A couple of simple C++ functions that we want to expose to Python
    std::string greet(){
        return "hello, world";
    }

    int square(int number){
        return number*number;
    }
}
{% endhighlight %}

The makefile used to build a shared library. The boost python lib might have different path or file name, need to change accordingly.

{% highlight c %}
#location of the Python header files
PYTHON_VERSION = 2.7
PYTHON_INCLUDE = /usr/include/python$(PYTHON_VERSION)

#location of the Boost Python include files and library
BOOST_INC = /usr/include
BOOST_LIB = /usr/lib

#compile mesh classes
TARGET = hello_py

$(TARGET).so: $(TARGET).o
    g++ -shared -Wl, --export-dynamic $(TARGET).o -L$(BOOST_LIB) -lboost_python-mt-py27 -L/usr/lib/python$(PYTHON_VERSION)/config -lpython$(PYTHON_VERSION) -o $(TARGET).so

$(TARGET).o:$(TARGET).cpp
    g++ -I$(PYTHON_INCLUDE) -I$(BOOST_INC) -fPIC -c $(TARGET).cpp

{% endhighlight %}

To test the module, export the shared library to PYTHONPATH first. Then try:

{% highlight python %}
>>>import hello_py
>>>hello_py.greet() 'hello world'
>>>hello_py.square(2) 4
>>>|
{% endhighlight %}
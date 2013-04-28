#!/usr/bin/gnuplot

set terminal canvas

set output 'ghanoz-json-benchmark-normal.html'

# The graph title
set title "ghanoz-json xml/json benchmark testing for Normal Events Resource scenario"

# nicer aspect ratio for image size
set size 1,0.7

# y-axis grid
set grid y

# x-axis label
set xlabel "request"

# y-axis label
set ylabel "response time (ms)"

# plot data from "out.dat" using column 9 with smooth sbezier lines
# and title of "nodejs" for the given data
plot "benchmark/json.dat" using 9 smooth sbezier with lines title "json", \
 "benchmark/xml.dat" using 9 smooth sbezier with lines title "xml"

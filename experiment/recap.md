### What are Heaps (Min-Heaps)?

A heap is a data structure where the lowest element is at the top. A heap is a full left-justified binary tree in which every element is greater than both it's children. It allows for insertion and deletion in O(log n). A heap can be built from an array fastest in O(n) time.


### How to Sort

Sorting an array using a Heap involves the following steps.

   - **Insert** all Elements from the Array into the Heap.
   - **Extract** the smallest element each time till the heap is empty.

For this, we want to learn the Insert and Extract operation into the heap. Repeated Insert and Extract-Min will result in a sorted array in O(n log n) time.


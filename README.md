# Cassouscript (csc)
 
## List

#### Create a List
> This example shows the way to create a list using *list literal notation*.
```
>> 'fruits' list created using list literal notation.
set fruits = ["banana", "pineapple"];
log(fruits);
>> [ 'banana', 'pineapple' ]
```

#### Create a String from a List
> This exemple shows the way to create a string from a list using the *'join' built-in function*.
```
set fruits = ["banana", "pineapple"];
set fruitString = join(", ", fruits);
log(fruitString);
>> "banana, pineapple"
```

#### Access a List item by its index
> This exemple shows the way to access an item in a list with its index.
```
set fruits = ["banana", "pineapple"];

>> The index of a list's first element is always 0.
log(fruits / 0); >> banana

>> The index of a list's second element is always 1.
log(fruits / 1); >> pineapple

>> The index of a list's last element is always one
>> less than the length of the list.
log(fruits / (size(fruits) - 1)); >> pineapple
```

#### Check if a List contains a certain item
> This exemple shows the way to check if an item is in the list using the *keyword 'in'*.
```
set fruits = ["banana", "pineapple"];

log("banana" in fruits) >> true
log("apple" in fruits) >> false
```

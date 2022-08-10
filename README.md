# Cassouscript (csc)
 
## List

#### Create a List
> This example shows the way to create list using <u>list literal notation</u>.
```
>> 'fruits' list created using list literal notation.
set fruits = ["banana", "pineapple"];
log(fruits);
>> [ 'banana', 'pineapple' ]
```

#### Create a String from a List
```
set fruits = ["banana", "pineapple"];
set fruitString = join(", ", fruits);
log(fruitString);
>> "banana, pineapple"
```

#### Access a List item by its index
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
```
set fruits = ["banana", "pineapple"];

log("banana" in fruits) >> true
log("apple" in fruits) >> false
```

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

#### Add an item to a List
> This exemple shows the way to add an item to a list using the *'+' operator*.
```
set fruits = ["banana", "pineapple"];

>> To add an item to a list for this statement.
log(fruits + "apple"); >> [ 'banana', 'pineapple', 'apple' ]
log(fruits); >> [ 'banana', 'pineapple' ]

>> To add an item to a list forever.
fruits += "apple";
log(fruits); >> [ 'banana', 'pineapple', 'apple' ]
```

#### Remove an item to from a List
> This exemple shows the way to remove an item from a list using the *'-' operator*.
```
set fruits = ["banana", "pineapple", "apple"];

>> To remove an item to from list for this statement.
log(fruits - 1); >> [ 'banana', 'apple' ]
log(fruits); >> [ 'banana', 'pineapple', 'apple' ]

>> To remove an item from a list forever.
fruits -= 0;
log(fruits); >> [ 'pineapple', 'apple' ]
```

## Object

#### Create an object
> This example shows the way to create an object using *object literal notation*.
```
>> 'car' object created using object literal notation.
set car = {
    "color": "red",
    "price": 25000
}
log(car);
>> { color: 'red', price: 25000 }
```

set list = [
  {
    "_id": 1,
    "name": "Du_Cassoulet"
  },
  {
    "_id": 2,
    "name": "Du_Couscous"
  },
  {
    "_id": 3,
    "name": "Mayomat"
  }
]
func compare(id) {
  if list.0."_id" == id {
    log("YOUHOU")
  } else {
    log("NOOO")
  }
}

compare(1);
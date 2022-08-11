run("./util.csc");

set chars = ["▢", "▣", "■"];
set rows = [
  [chars.0, chars.0, chars.0, chars.0, chars.0, chars.0], 
  [chars.0, chars.0, chars.0, chars.0, chars.0, chars.0], 
  [chars.0, chars.0, chars.0, chars.0, chars.0, chars.0], 
  [chars.0, chars.0, chars.0, chars.0, chars.0, chars.0], 
  [chars.0, chars.0, chars.0, chars.0, chars.0, chars.0], 
  [chars.0, chars.0, chars.0, chars.0, chars.0, chars.0], 
  [chars.0, chars.0, chars.0, chars.0, chars.0, chars.0]
];

func map(rows) {
  set str = "";
  for i = 5 to -1 inc -1 {
    set row = [];
    for j = 0 to 7 -> row += rows.j.i;
    str += join(" ", row) + "\n";
  }

  return str;
}

set end = false;

func addPawn(idx, colorIdx) {
  set s = size(filter(rows.idx, func(i) -> i != chars.0));
  rows.idx.s = chars.colorIdx;
}

func getPawn(x, y) {
  if x < 0 | x > 6 -> return chars.0;
  if y < 0 | y > 5 -> return chars.0;
  return rows.x.y;
}

func checkEnd(char) {
  for x = 0 to 7 {
    for y = 0 to 6 {
      if getPawn(x, y) == char & getPawn(x + 1, y) == char & getPawn(x + 2, y) == char & getPawn(x + 3, y) == char -> return true;
      if getPawn(x, y) == char & getPawn(x, y + 1) == char & getPawn(x, y + 2) == char & getPawn(x, y + 3) == char -> return true;
      if getPawn(x, y) == char & getPawn(x + 1, y + 1) == char & getPawn(x + 2, y + 2) == char & getPawn(x + 3, y + 3) == char -> return true;
      if getPawn(x, y) == char & getPawn(x + 1, y - 1) == char & getPawn(x + 2, y - 2) == char & getPawn(x + 3, y - 3) == char -> return true;
    }
  }

  return false;
}

clear();
while !end {
  log(map(rows));
  set choice = integer(ask("Choose a column (from 1 to 7): "));

  if (choice < 1 | choice > 7) {
    clear();
    log("Please select a number between 1 and 7\n");
    continue;
  }

  addPawn(choice - 1, 1);
  addPawn(floor(random() * 7), 2);

  if checkEnd(chars.1) {
    log("You won the game");
    break;
  }
  if checkEnd(chars.2) {
    log("I won the game");
    break;
  }
  clear();
}
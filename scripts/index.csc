set prom = fetch("https://opentdb.com/api.php?amount=10");

waitfor(prom, func (data) {
  log(data);
});
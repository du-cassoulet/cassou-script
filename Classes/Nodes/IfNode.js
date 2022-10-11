class IfNode {
	constructor(cases, elseCase) {
		this.cases = cases;
		this.elseCase = elseCase;

		this.posStart = this.cases[0][0].posStart;
		this.posEnd = (this.elseCase ||
			this.cases[this.cases.length - 1])[0].posEnd;
	}
}

export default IfNode;

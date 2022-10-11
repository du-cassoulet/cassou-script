class ParseResult {
	constructor() {
		this.error = null;
		this.node = null;
		this.lastRegisteredAdvanceCount = 0;
		this.advanceCount = 0;
		this.toReverseCount = 0;
	}

	registerAdvancement() {
		this.lastRegisteredAdvanceCount = 1;
		++this.advanceCount;
	}

	register(res) {
		this.lastRegisteredAdvanceCount = res.advanceCount;
		this.advanceCount += res.advanceCount;
		if (res.error) {
			this.error = res.error;
		}
		return res.node;
	}

	tryRegister(res) {
		if (res.error) {
			this.toReverseCount = res.advanceCount;
			return null;
		}
		return this.register(res);
	}

	success(node) {
		this.node = node;
		return this;
	}

	failure(error) {
		if (!this.error || this.advanceCount === 0) {
			this.error = error;
		}
		return this;
	}
}

export default ParseResult;

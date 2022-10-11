class RTResult {
	constructor() {
		this.reset();
	}

	reset() {
		this.value = null;
		this.error = null;
		this.funcReturnValue = null;
		this.loopShouldContinue = false;
		this.loopShouldBreak = false;
	}

	register(res) {
		this.error = res.error;
		this.funcReturnValue = res.funcReturnValue;
		this.loopShouldContinue = res.loopShouldContinue;
		this.loopShouldBreak = res.loopShouldBreak;

		return res.value;
	}

	success(value) {
		this.reset();
		this.value = value;
		return this;
	}

	successReturn(value) {
		this.reset();
		this.funcReturnValue = value;
		return this;
	}

	successContinue() {
		this.reset();
		this.loopShouldContinue = true;
		return this;
	}

	successBreak() {
		this.reset();
		this.loopShouldBreak = true;
		return this;
	}

	failure(error) {
		this.reset();
		this.error = error;
		return this;
	}

	shouldReturn() {
		return (
			this.error ||
			this.funcReturnValue ||
			this.loopShouldContinue ||
			this.loopShouldBreak
		);
	}
}

export default RTResult;

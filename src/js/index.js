import * as config from "../../config.json";
class MyReferral extends HTMLElement {
	constructor() {
		super();
		
		const template = document.createElement("template");	
		template.innerHTML = `
		<style></style>
		<a href="">Questo è il link</a>
		`;
		
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		
		this.link = this.shadowRoot.querySelector("a");
		this.init();
	}
	
	init() {
		// const config = import("../../config.json");
		// const config = {amazonTag: "asd"};
		const amazonTag = config.amazonTag;
		const url = this.attributes.product.value;
		const referral = `?ref=${amazonTag}`;
		const referralUrl = url.concat(referral);

		this.link.setAttribute("href", referralUrl);
	}
}
window.customElements.define("my-referral", MyReferral);
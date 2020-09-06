import * as config from "../../config.json";

class MyReferral extends HTMLElement {
	constructor() {
		super();
		
		const template = document.createElement("template");	
		template.innerHTML = `
			<style></style>
			<a href="">Questo è il link</a>
		`;

		this.testt = config.amazonTag;
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.link = this.shadowRoot.querySelector("a");
		this.init();
	}

	init() {
		console.log(this.testt);
		//TODO: Recuperare amazontag da config.json
		// const config = require("../../config.json");
		const config = "pippo";
		console.log(config);
		const amazonTag = config.amazonTag;

		const url = this.attributes.product.value;
		const referral = `?ref=${amazonTag}`;
		const referralUrl = url.concat(referral);

		this.link.setAttribute("href", referralUrl);
	}
}
window.customElements.define("my-referral", MyReferral);
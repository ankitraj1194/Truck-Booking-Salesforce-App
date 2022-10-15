import { LightningElement,api } from 'lwc';

export default class Custom_image_template extends LightningElement {
    @api url;
    @api altText;
}
import LightningDatatable from 'lightning/datatable';
import imagetemplate from './imagetemplate.html';
export default class Custom_image_datatype extends LightningDatatable {
    static customTypes = {
        image: {
            template: imagetemplate
        }
    };
}
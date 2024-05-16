
/**
 * Global Error Notification Service
 * NOTE: this service uses javascript object 'bootstrap' from 'bootstrap.bundle.min.js'
 * 'typings.d.ts' is being used to defind bootstrap object.
 */
export class ErrorService {
    /**
     * @param elementId html dom element id that hosts global error message rendering to user
     */

    constructor(private elementId: string) { console.log(elementId) }

    /* trigger bootstrap toast indicating error using predefined html element containing the toast */
    public show() {

        const errClient = document.getElementById(this.elementId);
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(errClient!);
        toastBootstrap.show();
    }
}
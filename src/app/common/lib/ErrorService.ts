

/**
 * Global Error Notification Service
 * NOTE: this service uses javascript object 'bootstrap' from 'bootstrap.bundle.min.js'
 * corresponding entry in 'typings.d.ts' allow direct invocation of methods.
 */
export class ErrorService {
    /**
     * @param elementId html dom element id that hosts global error message rendering to user
     */

    constructor(private elementId: string) { console.log(elementId) }

    /* trigger bootstrap toast indicating error using predefined html element containing the toast */
    public show() {

        const errClient = document.getElementById(this.elementId);
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(errClient);
        toastBootstrap.show();
    }
}
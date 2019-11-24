class Notification {
    constructor(parent, timeout = 5, transitionTime = 0.2) {
        this.transitionTime = transitionTime;
        this.timeout = timeout;
        this.parent = parent;
    }

    notify(color, message, cb) {
        let element = document.createElement('p');
        element.style.margin = '8px';
        element.style.padding = '8px';
        element.style.transition = `transform ${this.transitionTime}s`;
        element.style.transform = 'scale(0)';
        element.style.backgroundColor = color;

        element.textContent = message;
        this.parent.append(element);
        requestAnimationFrame(() => element.style.transform = 'scale(1)');
        setTimeout(() => {
            element.style.transform = 'scale(0)';
            setTimeout(() => {
                this.parent.removeChild(element);
                if (cb) cb();
            }, this.transitionTime*1000);
        },this.timeout*1000);
    }
}